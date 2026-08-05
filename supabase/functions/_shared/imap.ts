// Minimaler IMAP-Client (IMAP4rev1 über TLS) für den eigenen Plesk-Mailserver.
// Nur die benötigten Kommandos: LOGIN, SELECT, UID SEARCH, UID FETCH, LOGOUT.

export interface ImapConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  mailbox?: string;
}

export interface RawMessage {
  uid: number;
  headers: Record<string, string>;
  text: string;
  raw: string;
}

const decoder = new TextDecoder("utf-8", { fatal: false });
const encoder = new TextEncoder();

class ImapConnection {
  private conn: Deno.TlsConn;
  private buffer = "";
  private tag = 0;

  constructor(conn: Deno.TlsConn) {
    this.conn = conn;
  }

  static async connect(cfg: ImapConfig): Promise<ImapConnection> {
    const conn = await Deno.connectTls({ hostname: cfg.host, port: cfg.port });
    const c = new ImapConnection(conn);
    await c.readUntilGreeting();
    return c;
  }

  private async readChunk(): Promise<boolean> {
    const buf = new Uint8Array(65536);
    const n = await this.conn.read(buf);
    if (n === null) return false;
    this.buffer += decoder.decode(buf.subarray(0, n));
    return true;
  }

  private async readUntilGreeting(): Promise<void> {
    const deadline = Date.now() + 15_000;
    while (!/\r\n/.test(this.buffer)) {
      if (Date.now() > deadline) throw new Error("IMAP: Timeout beim Verbinden");
      if (!(await this.readChunk())) throw new Error("IMAP: Verbindung geschlossen");
    }
    this.buffer = "";
  }

  /** Sendet ein Kommando und liest bis zur getaggten Antwort. */
  async command(cmd: string, timeoutMs = 30_000): Promise<string> {
    const tag = `a${++this.tag}`;
    await this.conn.write(encoder.encode(`${tag} ${cmd}\r\n`));
    const done = new RegExp(`^${tag} (OK|NO|BAD)(.*)$`, "m");
    const deadline = Date.now() + timeoutMs;
    while (!done.test(this.buffer)) {
      if (Date.now() > deadline) throw new Error(`IMAP: Timeout bei "${cmd.split(" ")[0]}"`);
      if (!(await this.readChunk())) throw new Error("IMAP: Verbindung unerwartet geschlossen");
    }
    const response = this.buffer;
    this.buffer = "";
    const m = response.match(done)!;
    if (m[1] !== "OK") throw new Error(`IMAP ${m[1]}: ${m[2].trim()}`);
    return response;
  }

  async close(): Promise<void> {
    try {
      await this.command("LOGOUT", 5000);
    } catch {
      // ignore
    }
    try {
      this.conn.close();
    } catch {
      // ignore
    }
  }
}

function literalQuote(v: string): string {
  return `"${v.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

/** Entfaltet und parst RFC-822-Header in ein Lowercase-Key-Objekt. */
export function parseHeaders(headerBlock: string): Record<string, string> {
  const unfolded = headerBlock.replace(/\r?\n[ \t]+/g, " ");
  const out: Record<string, string> = {};
  for (const line of unfolded.split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx <= 0) continue;
    const key = line.slice(0, idx).trim().toLowerCase();
    const value = line.slice(idx + 1).trim();
    out[key] = out[key] ? `${out[key]} ${value}` : value;
  }
  return out;
}

function decodeQuotedPrintable(input: string): string {
  return input
    .replace(/=\r?\n/g, "")
    .replace(/=([0-9A-Fa-f]{2})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
}

function decodeBase64(input: string): string {
  try {
    const bytes = Uint8Array.from(atob(input.replace(/\s+/g, "")), (c) => c.charCodeAt(0));
    return decoder.decode(bytes);
  } catch {
    return input;
  }
}

function htmlToText(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|tr|li|h[1-6])>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Extrahiert den besten Klartext aus einer (ggf. mehrteiligen) RFC-822-Mail. */
export function extractBody(raw: string): string {
  const sep = raw.search(/\r?\n\r?\n/);
  if (sep < 0) return "";
  const headerBlock = raw.slice(0, sep);
  const body = raw.slice(sep).replace(/^\r?\n\r?\n/, "");
  const headers = parseHeaders(headerBlock);
  const ctype = headers["content-type"] ?? "";

  const boundaryMatch = ctype.match(/boundary="?([^";]+)"?/i);
  if (boundaryMatch) {
    const boundary = boundaryMatch[1];
    const parts = body.split(new RegExp(`--${boundary.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(--)?\r?\n`));
    let htmlFallback = "";
    for (const part of parts) {
      if (!part || !/content-type/i.test(part)) continue;
      const partSep = part.search(/\r?\n\r?\n/);
      if (partSep < 0) continue;
      const pHeaders = parseHeaders(part.slice(0, partSep));
      const pType = (pHeaders["content-type"] ?? "").toLowerCase();
      if (/multipart\//.test(pType)) {
        const nested = extractBody(part);
        if (nested) return nested;
        continue;
      }
      let pBody = part.slice(partSep).replace(/^\r?\n\r?\n/, "");
      const enc = (pHeaders["content-transfer-encoding"] ?? "").toLowerCase();
      if (enc.includes("quoted-printable")) pBody = decodeQuotedPrintable(pBody);
      else if (enc.includes("base64")) pBody = decodeBase64(pBody);
      if (pType.includes("text/plain")) return pBody.trim();
      if (pType.includes("text/html")) htmlFallback = htmlToText(pBody);
    }
    return htmlFallback;
  }

  let plain = body;
  const enc = (headers["content-transfer-encoding"] ?? "").toLowerCase();
  if (enc.includes("quoted-printable")) plain = decodeQuotedPrintable(plain);
  else if (enc.includes("base64")) plain = decodeBase64(plain);
  return ctype.toLowerCase().includes("text/html") ? htmlToText(plain) : plain.trim();
}

/** Entfernt zitierte Vorgänger-Mails und Signatur-Trenner aus einer Antwort. */
export function stripQuotedReply(text: string): string {
  const lines = text.split(/\r?\n/);
  const out: string[] = [];
  for (const line of lines) {
    if (/^>/.test(line)) continue;
    if (/^-{2,}\s*(Original|Ursprüngliche)/i.test(line)) break;
    if (/^Am .*schrieb.*:$/i.test(line)) break;
    if (/^On .* wrote:$/i.test(line)) break;
    if (/^(Von|From):\s.+@/i.test(line) && out.join("").trim().length > 0) break;
    if (/^-- $/.test(line)) break;
    out.push(line);
  }
  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

/** Holt alle Nachrichten mit UID > sinceUid aus dem Postfach. */
export async function fetchNewMessages(cfg: ImapConfig, sinceUid: number, limit = 25): Promise<RawMessage[]> {
  const conn = await ImapConnection.connect(cfg);
  try {
    await conn.command(`LOGIN ${literalQuote(cfg.user)} ${literalQuote(cfg.password)}`);
    await conn.command(`SELECT ${literalQuote(cfg.mailbox ?? "INBOX")}`);

    const searchRes = await conn.command(`UID SEARCH UID ${sinceUid + 1}:*`);
    const searchLine = searchRes.split(/\r?\n/).find((l) => /^\* SEARCH/i.test(l)) ?? "";
    const uids = searchLine
      .replace(/^\* SEARCH/i, "")
      .trim()
      .split(/\s+/)
      .map(Number)
      .filter((n) => Number.isFinite(n) && n > sinceUid)
      .sort((a, b) => a - b)
      .slice(0, limit);

    const messages: RawMessage[] = [];
    for (const uid of uids) {
      let res: string;
      try {
        res = await conn.command(`UID FETCH ${uid} (BODY.PEEK[])`);
      } catch (err) {
        console.error(`IMAP: UID ${uid} konnte nicht geladen werden`, err);
        continue;
      }
      // Literal: * n FETCH (... {size}\r\n<raw>\r\n)
      const litIdx = res.search(/\{\d+\}\r?\n/);
      if (litIdx < 0) continue;
      const afterLit = res.slice(res.indexOf("\n", litIdx) + 1);
      const raw = afterLit.replace(/\r?\n\)\r?\n[\s\S]*$/, "");
      const sep = raw.search(/\r?\n\r?\n/);
      const headers = parseHeaders(sep > 0 ? raw.slice(0, sep) : raw);
      messages.push({ uid, headers, text: stripQuotedReply(extractBody(raw)), raw });
    }
    return messages;
  } finally {
    await conn.close();
  }
}
