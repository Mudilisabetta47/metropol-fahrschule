import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { sendEmailWithRetry } from "../_shared/send-with-retry.ts";
import { esc } from "../_shared/html-escape.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const CHEF_EMAIL = "vedat.oezel@gmx.de";
const ESCALATION_HOURS = 24;
const LOGO_URL = "https://zsothhtfripxdiphedsu.supabase.co/storage/v1/object/public/site-images/email-logo.avif";

const locationInfo: Record<string, { email: string; phone: string }> = {
  Bremen: { email: "bremen@fahrschule-metropol.de", phone: "0421 48445910" },
  Garbsen: { email: "garbsen@fahrschule-metropol.de", phone: "05137 8903395" },
  Hannover: { email: "hannover@fahrschule-metropol.de", phone: "0511 6425066" },
};

function buildEscalationHtml(inquiries: Array<{
  id: string; name: string; email: string; phone: string | null;
  location: string; license_class: string | null; created_at: string;
}>) {
  const rows = inquiries.map((inq) => {
    const created = new Date(inq.created_at).toLocaleString("de-DE", {
      dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Berlin",
    });
    const hoursAgo = Math.round((Date.now() - new Date(inq.created_at).getTime()) / 3600000);
    const name = esc(inq.name);
    const email = esc(inq.email);
    const emailAttr = encodeURIComponent(inq.email);
    const phone = inq.phone ? esc(inq.phone) : "";
    const phoneTel = inq.phone ? inq.phone.replace(/[^0-9+]/g, "") : "";
    const location = esc(inq.location);
    const license_class = inq.license_class ? esc(inq.license_class) : "–";

    return `
    <tr>
      <td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;">
        <strong style="color:#111827;">${name}</strong><br/>
        <a href="mailto:${emailAttr}" style="color:#2563eb;font-size:13px;">${email}</a>
        ${phone ? `<br/><a href="tel:${phoneTel}" style="color:#2563eb;font-size:13px;">${phone}</a>` : ""}
      </td>
      <td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;text-align:center;">
        <span style="background:#00cc28;color:#fff;font-size:11px;font-weight:700;padding:3px 10px;border-radius:6px;">${location}</span>
      </td>
      <td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;text-align:center;font-size:13px;color:#6b7280;">
        ${license_class}
      </td>
      <td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;text-align:center;">
        <span style="color:#dc2626;font-weight:700;font-size:13px;">${hoursAgo}h</span><br/>
        <span style="color:#9ca3af;font-size:11px;">${esc(created)}</span>
      </td>
      <td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;text-align:center;">
        <a href="mailto:${emailAttr}?subject=Re: Deine Anfrage bei Fahrschule Metropol" style="display:inline-block;background:#00cc28;color:#fff;font-size:12px;font-weight:700;padding:8px 16px;border-radius:8px;text-decoration:none;">Antworten</a>
      </td>
    </tr>`;
  }).join("");

  return `
<!DOCTYPE html>
<html lang="de">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Segoe UI',Roboto,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px;">
<tr><td align="center">
<table width="700" cellpadding="0" cellspacing="0" style="max-width:700px;width:100%;">

  <tr><td style="background:linear-gradient(135deg,#0a0a1a 0%,#1a1a2e 100%);padding:32px 40px;border-radius:16px 16px 0 0;">
    <table width="100%"><tr>
      <td><img src="${LOGO_URL}" alt="Fahrschule Metropol" height="40" style="height:40px;width:auto;"/></td>
      <td align="right"><span style="background:#dc2626;color:#fff;font-size:11px;font-weight:700;padding:6px 14px;border-radius:20px;text-transform:uppercase;letter-spacing:0.5px;">⚠️ Eskalation</span></td>
    </tr></table>
  </td></tr>

  <tr><td style="background:#dc2626;padding:20px 40px;">
    <p style="margin:0;color:#fff;font-size:18px;font-weight:700;">⚠️ ${inquiries.length} unbearbeitete Anfrage${inquiries.length > 1 ? "n" : ""}</p>
    <p style="margin:4px 0 0;color:rgba(255,255,255,0.85);font-size:13px;">Diese Anfragen sind seit über ${ESCALATION_HOURS} Stunden ohne Reaktion</p>
  </td></tr>

  <tr><td style="background:#ffffff;padding:24px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
      <tr style="background:#f9fafb;">
        <th style="padding:12px 16px;text-align:left;font-size:12px;color:#6b7280;font-weight:600;">Kontakt</th>
        <th style="padding:12px 16px;text-align:center;font-size:12px;color:#6b7280;font-weight:600;">Standort</th>
        <th style="padding:12px 16px;text-align:center;font-size:12px;color:#6b7280;font-weight:600;">Klasse</th>
        <th style="padding:12px 16px;text-align:center;font-size:12px;color:#6b7280;font-weight:600;">Wartezeit</th>
        <th style="padding:12px 16px;text-align:center;font-size:12px;color:#6b7280;font-weight:600;">Aktion</th>
      </tr>
      ${rows}
    </table>
  </td></tr>

  <tr><td style="background:#f9fafb;padding:24px 40px;border-top:1px solid #e5e7eb;border-radius:0 0 16px 16px;">
    <p style="margin:0;color:#9ca3af;font-size:12px;">Automatische Eskalation – Fahrschule Metropol Anfrage-System</p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Auth: only accept calls from our own server (cron/edge invocations) that
  // present the service-role bearer token, OR an admin-issued JWT.
  const authHeader = req.headers.get("Authorization") ?? "";
  const bearer = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  const isService = bearer !== "" && bearer === serviceKey;

  if (!isService) {
    // Fall back to admin-user check.
    try {
      const authClient = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_ANON_KEY")!,
        { global: { headers: { Authorization: authHeader } } },
      );
      const { data: userData } = await authClient.auth.getUser();
      const userId = userData?.user?.id;
      if (!userId) throw new Error("no user");
      const adminClient = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      );
      const { data: isAdmin } = await adminClient.rpc("has_role", { _user_id: userId, _role: "admin" });
      if (!isAdmin) throw new Error("not admin");
    } catch {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Find inquiries older than 24h that are still "neu" (unprocessed)
    const cutoff = new Date(Date.now() - ESCALATION_HOURS * 3600000).toISOString();

    const { data: overdue, error } = await supabase
      .from("inquiries")
      .select("id, name, email, phone, location, license_class, created_at")
      .eq("status", "neu")
      .lt("created_at", cutoff)
      .order("created_at", { ascending: true });

    if (error) throw error;

    if (!overdue || overdue.length === 0) {
      return new Response(JSON.stringify({ success: true, message: "No overdue inquiries" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const htmlBody = buildEscalationHtml(overdue);

    const result = await sendEmailWithRetry(RESEND_API_KEY, {
      from: "Fahrschule Metropol <noreply@fahrschule-metropol.de>",
      to: [CHEF_EMAIL],
      subject: `⚠️ ${overdue.length} unbearbeitete Anfrage${overdue.length > 1 ? "n" : ""} – Eskalation`,
      html: htmlBody,
    }, "escalation-chef");

    if (!result.ok) {
      throw new Error(`Escalation email failed after ${result.attempts} attempts: ${result.error}`);
    }

    return new Response(JSON.stringify({ success: true, escalated: overdue.length, attempts: result.attempts }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error in escalation check:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
