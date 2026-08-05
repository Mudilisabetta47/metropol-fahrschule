// Minimaler SMTP-Client (SMTPS/STARTTLS) für den eigenen Plesk-Mailserver,
// mit Rückfall auf den bestehenden Versandweg (Resend), falls SMTP nicht konfiguriert ist.
import { sendEmailWithRetry } from "./send-with-retry.ts";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export interface OutgoingMail {
  from: string;
  to: string;
  subject: string;
  html: string;
  text?: string;
  inReplyTo?: string;
  references?: string;
  messageId?: string;
  headers?: Record<string, string>;
}

function encodeHeaderValue(value: string): string {
  // RFC 2047 für Nicht-ASCII (Umlaute in Betreff/Namen)
  if (/^[\x20-\x7E]*$/.test(value)) return value;
  const bytes = encoder.encode(value);
  let b64 = "";
  for (let i = 0; i < bytes.length; i += 3) {
    b64 += btoa(String.fromCharCode(...bytes.subarray(i, i + 3)));
  }
  return `=?UTF-8?B?${btoa(String.fromCharCode(...bytes))}?=`;
}

function addressOnly(value: string): string {
  const m = value.match(/<([^>]+)>/);
  return (m ? m[1] : value).trim();
}

class SmtpSession {
  private conn: Deno.Conn;
  private buffer = "";

  constructor(conn: Deno.Conn) {
    this.conn = conn;
  }

  async read(): Promise<string> {
    const buf = new Uint8Array(8192);
    const deadline = Date.now() + 20_000;
    while (!/\r\n$/.test(this.buffer)) {
      if (Date.now() > deadline) throw new Error("SMTP: Timeout");
      const n = await this.conn.read(buf);
      if (n === null) break;
      this.buffer += decoder.decode(buf.subarray(0, n));
    }
    const out = this.buffer;
    this.buffer = "";
    return out;
  }

  async cmd(line: string, expect = /^[23]\d\d/): Promise<string> {
    await this.conn.write(encoder.encode(`${line}\r\n`));
    const res = await this.read();
    const last = res.trim().split(/\r?\n/).pop() ?? "";
    if (!expect.test(last)) throw new Error(`SMTP unerwartete Antwort auf "${line.split(" ")[0]}": ${last}`);
    return res;
  }

  async writeRaw(data: string): Promise<void> {
    await this.conn.write(encoder.encode(data));
  }

  upgrade(hostname: string): void {
    this.conn = Deno.startTls(this.conn as Deno.TcpConn, { hostname });
  }

  close(): void {
    try {
      this.conn.close();
    } catch {
      // ignore
    }
  }
}

function buildMime(mail: OutgoingMail, messageId: string): string {
  const lines = [
    `From: ${mail.from.replace(/^([^<]+)</, (_, n) => `${encodeHeaderValue(n.trim())} <`)}`,
    `To: ${mail.to}`,
    `Subject: ${encodeHeaderValue(mail.subject)}`,
    `Message-ID: ${messageId}`,
    `Date: ${new Date().toUTCString()}`,
    "MIME-Version: 1.0",
  ];
  if (mail.inReplyTo) lines.push(`In-Reply-To: ${mail.inReplyTo}`);
  if (mail.references) lines.push(`References: ${mail.references}`);
  for (const [k, v] of Object.entries(mail.headers ?? {})) lines.push(`${k}: ${v}`);

  const boundary = `----=_mp_${crypto.randomUUID()}`;
  lines.push(`Content-Type: multipart/alternative; boundary="${boundary}"`, "");
  const text = mail.text ?? mail.html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const body = [
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    text.replace(/\r?\n\./g, "\n.."),
    "",
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    mail.html.replace(/\r?\n\./g, "\n.."),
    "",
    `--${boundary}--`,
    "",
  ].join("\r\n");

  return `${lines.join("\r\n")}\r\n${body}`;
}

export interface SendOutcome {
  ok: boolean;
  transport: "smtp" | "resend";
  messageId?: string;
  error?: string;
}

/**
 * Versendet eine E-Mail. Bevorzugt den eigenen Plesk-SMTP-Server
 * (SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASSWORD); ohne Konfiguration wird Resend genutzt.
 */
export async function sendMail(mail: OutgoingMail, label = "mail"): Promise<SendOutcome> {
  const host = Deno.env.get("SMTP_HOST");
  const user = Deno.env.get("SMTP_USER");
  const pass = Deno.env.get("SMTP_PASSWORD");
  const port = Number(Deno.env.get("SMTP_PORT") ?? "465");
  const domain = addressOnly(mail.from).split("@")[1] ?? "fahrschule-metropol.de";
  const messageId = mail.messageId ?? `<${crypto.randomUUID()}@${domain}>`;

  if (host && user && pass) {
    let session: SmtpSession | null = null;
    try {
      const implicitTls = port === 465;
      const raw = implicitTls
        ? await Deno.connectTls({ hostname: host, port })
        : await Deno.connect({ hostname: host, port });
      session = new SmtpSession(raw);
      await session.read(); // Greeting
      await session.cmd(`EHLO ${domain}`);
      if (!implicitTls) {
        await session.cmd("STARTTLS", /^220/);
        session.upgrade(host);
        await session.cmd(`EHLO ${domain}`);
      }
      await session.cmd(`AUTH LOGIN`, /^334/);
      await session.cmd(btoa(user), /^334/);
      await session.cmd(btoa(pass), /^235/);
      await session.cmd(`MAIL FROM:<${addressOnly(mail.from)}>`);
      await session.cmd(`RCPT TO:<${addressOnly(mail.to)}>`);
      await session.cmd("DATA", /^354/);
      await session.writeRaw(`${buildMime(mail, messageId)}\r\n.\r\n`);
      const res = await session.read();
      if (!/^250/m.test(res.trim().split(/\r?\n/).pop() ?? "")) {
        throw new Error(`SMTP DATA abgelehnt: ${res.trim()}`);
      }
      await session.cmd("QUIT", /^221|^250/);
      return { ok: true, transport: "smtp", messageId };
    } catch (err) {
      console.error(`[smtp] ${label} fehlgeschlagen, Rückfall auf Resend:`, err);
    } finally {
      session?.close();
    }
  }

  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) return { ok: false, transport: "resend", error: "Kein SMTP und kein RESEND_API_KEY konfiguriert" };

  const headers: Record<string, string> = { ...(mail.headers ?? {}) };
  if (mail.inReplyTo) headers["In-Reply-To"] = mail.inReplyTo;
  if (mail.references) headers["References"] = mail.references;

  const result = await sendEmailWithRetry(
    apiKey,
    {
      from: mail.from,
      to: [addressOnly(mail.to)],
      subject: mail.subject,
      html: mail.html,
      headers,
    },
    label,
  );
  const resendId = (result.data as { id?: string } | null)?.id;
  return {
    ok: result.ok,
    transport: "resend",
    messageId: resendId ? `<${resendId}@resend.dev>` : messageId,
    error: result.error,
  };
}
