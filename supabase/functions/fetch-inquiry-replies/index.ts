// Liest das eigene Plesk-Postfach per IMAP aus, ordnet Antworten automatisch der
// passenden Anfrage zu, analysiert sie per KI, beantwortet Standardfragen selbst
// und eskaliert nur wichtige Fälle an die Geschäftsführung.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { fetchNewMessages } from "../_shared/imap.ts";
import { analyzeReply } from "../_shared/ai-reply-analysis.ts";
import { sendMail } from "../_shared/smtp.ts";
import { esc } from "../_shared/html-escape.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const CATEGORY_STATUS: Record<string, string> = {
  absage: "erledigt",
  spam: "spam",
  irrelevant: "in bearbeitung",
  abwesenheit: "in bearbeitung",
};

function addressOf(header: string | undefined): string {
  if (!header) return "";
  const m = header.match(/<([^>]+)>/);
  return (m ? m[1] : header).trim().toLowerCase();
}

function autoReplyHtml(body: string): string {
  return `<!DOCTYPE html><html lang="de"><body style="margin:0;padding:24px;background:#f4f4f5;font-family:'Segoe UI',Roboto,Arial,sans-serif;">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:14px;padding:28px 32px;">
<p style="margin:0 0 16px;color:#111827;font-size:15px;line-height:1.7;white-space:pre-wrap;">${esc(body)}</p>
<hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0 12px;">
<p style="margin:0;color:#9ca3af;font-size:11px;">Diese Nachricht wurde automatisch erstellt · fahrschule-metropol.de</p>
</div></body></html>`;
}

function managerHtml(args: {
  reason: string;
  inquiry: Record<string, unknown>;
  category: string;
  summary: string;
  recommendation: string;
  body: string;
}): string {
  return `<!DOCTYPE html><html lang="de"><body style="margin:0;padding:24px;background:#f4f4f5;font-family:'Segoe UI',Roboto,Arial,sans-serif;">
<div style="max-width:620px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;">
<div style="background:#111827;padding:20px 28px;"><p style="margin:0;color:#fff;font-size:16px;font-weight:700;">⚠️ ${esc(args.reason)}</p></div>
<div style="padding:24px 28px;">
<p style="margin:0 0 6px;color:#6b7280;font-size:13px;">Anfrage</p>
<p style="margin:0 0 18px;color:#111827;font-size:15px;font-weight:600;">${esc(String(args.inquiry.name))} · ${esc(String(args.inquiry.location))} · ${esc(String(args.inquiry.tracking_code ?? ""))}</p>
<p style="margin:0 0 6px;color:#6b7280;font-size:13px;">KI-Kategorie</p>
<p style="margin:0 0 18px;"><span style="background:#00cc28;color:#fff;font-size:12px;font-weight:700;padding:4px 12px;border-radius:6px;">${esc(args.category)}</span></p>
<p style="margin:0 0 6px;color:#6b7280;font-size:13px;">Zusammenfassung</p>
<p style="margin:0 0 18px;color:#111827;font-size:14px;line-height:1.6;">${esc(args.summary)}</p>
<p style="margin:0 0 6px;color:#6b7280;font-size:13px;">Empfehlung</p>
<p style="margin:0 0 18px;color:#111827;font-size:14px;line-height:1.6;">${esc(args.recommendation)}</p>
<div style="background:#f9fafb;border-left:4px solid #00cc28;padding:14px 18px;border-radius:0 10px 10px 0;">
<p style="margin:0;color:#374151;font-size:13px;line-height:1.6;white-space:pre-wrap;">${esc(args.body.slice(0, 2000))}</p>
</div>
</div></div></body></html>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } },
  );

  // Zugriffsschutz: nur Service-Role (Cron) oder Admin-JWT
  const authHeader = req.headers.get("Authorization") ?? "";
  const token = authHeader.replace(/^Bearer\s+/i, "");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const unauthorized = (status: number) =>
    new Response(JSON.stringify({ error: "Nicht autorisiert" }), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  let isService = token.length > 0 && token === serviceKey;
  if (!isService && token.length > 0) {
    // Andere gültige Service-Keys (z. B. nach Rotation) erkennen: nur Service-Role
    // darf email_send_state lesen (RLS), deshalb ist ein Treffer hier beweisend.
    const probe = createClient(Deno.env.get("SUPABASE_URL")!, token, { auth: { persistSession: false } });
    const { error } = await probe.from("email_send_state").select("id").limit(1);
    isService = !error;
  }

  if (!isService) {
    const { data: userData } = await supabase.auth.getUser(token);
    const uid = userData?.user?.id;
    if (!uid) return unauthorized(401);
    const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", uid).eq("role", "admin");
    if (!roles || roles.length === 0) return unauthorized(403);
  }


  const host = Deno.env.get("IMAP_HOST");
  const user = Deno.env.get("IMAP_USER");
  const password = Deno.env.get("IMAP_PASSWORD");
  if (!host || !user || !password) {
    return new Response(JSON.stringify({ error: "IMAP nicht konfiguriert (IMAP_HOST, IMAP_USER, IMAP_PASSWORD)" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { data: state } = await supabase.from("email_inbox_state").select("last_uid").eq("id", 1).maybeSingle();
  const lastUid = state?.last_uid ?? 0;

  let messages;
  try {
    messages = await fetchNewMessages(
      { host, port: Number(Deno.env.get("IMAP_PORT") ?? "993"), user, password, mailbox: Deno.env.get("IMAP_MAILBOX") ?? "INBOX" },
      lastUid,
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("IMAP-Abruf fehlgeschlagen:", msg);
    await supabase.from("email_inbox_state").update({ last_error: msg, last_run_at: new Date().toISOString() }).eq("id", 1);
    return new Response(JSON.stringify({ error: msg }), { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  let maxUid = lastUid;
  let matched = 0;
  let autoReplied = 0;
  let filtered = 0;
  let escalated = 0;

  for (const msg of messages) {
    maxUid = Math.max(maxUid, msg.uid);
    const h = msg.headers;
    const messageId = h["message-id"] ?? null;
    const inReplyTo = h["in-reply-to"] ?? null;
    const references = h["references"] ?? null;
    const subject = h["subject"] ?? "(kein Betreff)";
    const fromEmail = addressOf(h["from"]);

    // Bereits verarbeitet?
    if (messageId) {
      const { data: existing } = await supabase.from("inquiry_messages").select("id").eq("message_id", messageId).maybeSingle();
      if (existing) continue;
    }

    // 1. Zuordnung über versteckten Tracking-Code (Header, Betreff oder Text)
    const codeFromHeader = h["x-metropol-request-id"] ?? h["x-tracking-id"] ?? null;
    const codeMatch = codeFromHeader ?? `${subject}\n${msg.text}`.match(/MP-[A-F0-9]{12}/i)?.[0] ?? null;

    let inquiry: Record<string, unknown> | null = null;
    if (codeMatch) {
      const { data } = await supabase.from("inquiries").select("*").eq("tracking_code", codeMatch.toUpperCase()).maybeSingle();
      inquiry = data ?? null;
    }
    // 2. Zuordnung über In-Reply-To / References
    if (!inquiry) {
      const ids = [inReplyTo, ...(references ? references.split(/\s+/) : [])].filter(Boolean) as string[];
      for (const id of ids) {
        const { data } = await supabase.from("inquiries").select("*").eq("outbound_message_id", id).maybeSingle();
        if (data) { inquiry = data; break; }
        const { data: viaMessage } = await supabase.from("inquiry_messages").select("inquiry_id").eq("message_id", id).maybeSingle();
        if (viaMessage) {
          const { data: inq } = await supabase.from("inquiries").select("*").eq("id", viaMessage.inquiry_id).maybeSingle();
          if (inq) { inquiry = inq; break; }
        }
      }
    }

    if (!inquiry) {
      console.log(`Keine Zuordnung für UID ${msg.uid} (${fromEmail})`);
      continue;
    }
    matched++;

    // KI-Analyse
    const analysis = await analyzeReply({
      inquiryName: String(inquiry.name),
      location: String(inquiry.location),
      licenseClass: (inquiry.license_class as string | null) ?? null,
      originalMessage: (inquiry.message as string | null) ?? null,
      fromEmail,
      subject,
      body: msg.text,
    });

    await supabase.from("inquiry_messages").insert({
      inquiry_id: inquiry.id,
      direction: "inbound",
      from_email: fromEmail,
      to_email: addressOf(h["to"]),
      subject,
      body_text: msg.text || "(leere Antwort)",
      message_id: messageId,
      in_reply_to: inReplyTo,
      email_references: references,
      ai_category: analysis.category,
    });

    const now = new Date();
    const createdAt = new Date(String(inquiry.created_at));
    const responseMinutes = Math.max(0, Math.round((now.getTime() - createdAt.getTime()) / 60000));
    const alreadyReplied = Boolean(inquiry.replied_at);

    const update: Record<string, unknown> = {
      ai_category: analysis.category,
      ai_summary: analysis.summary,
      ai_recommendation: analysis.recommendation,
      ai_confidence: analysis.confidence,
      is_irrelevant: analysis.is_irrelevant,
    };

    if (analysis.is_irrelevant) {
      filtered++;
      if (analysis.category === "spam") update.status = "spam";
    } else {
      if (!alreadyReplied) {
        update.replied_at = now.toISOString();
        update.response_time_minutes = responseMinutes;
      }
      update.status = CATEGORY_STATUS[analysis.category] ?? "beantwortet";
    }

    // Standardanfragen automatisch beantworten
    if (!analysis.is_irrelevant && analysis.auto_reply_body && analysis.confidence >= 0.7 && fromEmail) {
      const replyMessageId = `<${crypto.randomUUID()}@fahrschule-metropol.de>`;
      const outcome = await sendMail({
        from: "Fahrschule Metropol <noreply@fahrschule-metropol.de>",
        to: fromEmail,
        subject: analysis.auto_reply_subject || `Re: ${subject}`,
        html: autoReplyHtml(analysis.auto_reply_body),
        text: analysis.auto_reply_body,
        messageId: replyMessageId,
        inReplyTo: messageId ?? undefined,
        references: [references, messageId].filter(Boolean).join(" ") || undefined,
        headers: {
          "X-Metropol-Request-ID": String(inquiry.tracking_code ?? ""),
          "X-Tracking-ID": String(inquiry.tracking_code ?? ""),
        },
      }, `auto-reply-${inquiry.id}`);

      if (outcome.ok) {
        autoReplied++;
        update.auto_replied_at = now.toISOString();
        await supabase.from("inquiry_messages").insert({
          inquiry_id: inquiry.id,
          direction: "outbound",
          from_email: "noreply@fahrschule-metropol.de",
          to_email: fromEmail,
          subject: analysis.auto_reply_subject || `Re: ${subject}`,
          body_text: analysis.auto_reply_body,
          message_id: outcome.messageId ?? replyMessageId,
          is_auto_generated: true,
          ai_category: analysis.category,
        });
      }
    }

    // Nur wichtige Fälle an die Geschäftsführung
    const managerEmail = Deno.env.get("MANAGER_EMAIL") || "info@fahrschule-metropol.de";
    if (!analysis.is_irrelevant && analysis.needs_manager) {
      const reason = analysis.category === "absage" ? "Fahrschule hat abgelehnt" : "Anfrage benötigt Ihre Aufmerksamkeit";
      const outcome = await sendMail({
        from: "Fahrschule Metropol <noreply@fahrschule-metropol.de>",
        to: managerEmail,
        subject: `⚠️ ${reason} – ${inquiry.name} (${inquiry.location})`,
        html: managerHtml({
          reason,
          inquiry,
          category: analysis.category,
          summary: analysis.summary,
          recommendation: analysis.recommendation,
          body: msg.text,
        }),
      }, `manager-${inquiry.id}`);
      if (outcome.ok) {
        escalated++;
        update.escalated_at = now.toISOString();
      }
    }

    await supabase.from("inquiries").update(update).eq("id", inquiry.id);
  }

  await supabase.from("email_inbox_state").update({
    last_uid: maxUid,
    last_run_at: new Date().toISOString(),
    last_error: null,
  }).eq("id", 1);

  return new Response(JSON.stringify({
    success: true,
    fetched: messages.length,
    matched,
    auto_replied: autoReplied,
    filtered,
    escalated,
    last_uid: maxUid,
  }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
});
