import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { sendEmailWithRetry } from "../_shared/send-with-retry.ts";
import { esc, isEmail } from "../_shared/html-escape.ts";

const CAPTCHA_MAX_AGE_MS = 10 * 60 * 1000; // 10 minutes

function verifyMathCaptcha(token: unknown): boolean {
  if (typeof token !== "string" || token.length === 0 || token.length > 512) return false;
  try {
    const decoded = JSON.parse(atob(token));
    const { a, b, answer, t } = decoded ?? {};
    if (typeof a !== "number" || typeof b !== "number" || typeof answer !== "number" || typeof t !== "number") return false;
    if (a + b !== answer) return false;
    const age = Date.now() - t;
    if (age < 0 || age > CAPTCHA_MAX_AGE_MS) return false;
    return true;
  } catch {
    return false;
  }
}

function str(v: unknown, max: number): string | null {
  if (typeof v !== "string") return null;
  const trimmed = v.trim();
  if (trimmed.length === 0 || trimmed.length > max) return null;
  return trimmed;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const locationEmails: Record<string, { email: string; phone: string; address: string }> = {
  Bremen: {
    email: "bremen@fahrschule-metropol.de",
    phone: "0421 48445910",
    address: "Bahnhofsplatz 41, 28195 Bremen",
  },
  Garbsen: {
    email: "garbsen@fahrschule-metropol.de",
    phone: "05137 8903395",
    address: "Planetenring 25–27, 30823 Garbsen",
  },
  Hannover: {
    email: "hannover@fahrschule-metropol.de",
    phone: "0511 6425066",
    address: "Engelbosteler Damm 1, 30167 Hannover",
  },
};

const LOGO_URL = "https://zsothhtfripxdiphedsu.supabase.co/storage/v1/object/public/site-images/email-logo.avif";

function buildStaffEmailHtml(data: {
  name: string;
  email: string;
  phone?: string;
  location: string;
  license_class?: string;
  message?: string;
  locationInfo: { phone: string; address: string };
}) {
  const name = esc(data.name);
  const email = esc(data.email);
  const emailAttr = encodeURIComponent(data.email);
  const phone = data.phone ? esc(data.phone) : "";
  const phoneTel = data.phone ? data.phone.replace(/[^0-9+]/g, "") : "";
  const phoneWa = data.phone ? data.phone.replace(/[^0-9]/g, "").replace(/^0/, "49") : "";
  const location = esc(data.location);
  const license_class = data.license_class ? esc(data.license_class) : "";
  const message = data.message ? esc(data.message) : "";
  const locationInfo = { phone: esc(data.locationInfo.phone), address: esc(data.locationInfo.address) };
  const now = new Date().toLocaleString("de-DE", { dateStyle: "long", timeStyle: "short", timeZone: "Europe/Berlin" });

  return `
<!DOCTYPE html>
<html lang="de">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Segoe UI',Roboto,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <tr><td style="background:linear-gradient(135deg,#0a0a1a 0%,#1a1a2e 100%);padding:32px 40px;border-radius:16px 16px 0 0;">
    <table width="100%"><tr>
      <td><img src="${LOGO_URL}" alt="Fahrschule Metropol" height="40" style="height:40px;width:auto;"/></td>
      <td align="right"><span style="background:#00cc28;color:#fff;font-size:11px;font-weight:700;padding:6px 14px;border-radius:20px;text-transform:uppercase;letter-spacing:0.5px;">Neue Anfrage</span></td>
    </tr></table>
  </td></tr>

  <tr><td style="background:#00cc28;padding:20px 40px;">
    <p style="margin:0;color:#fff;font-size:18px;font-weight:700;">🚗 Anfrage von ${name}</p>
    <p style="margin:4px 0 0;color:rgba(255,255,255,0.85);font-size:13px;">Standort ${location} · ${now}</p>
  </td></tr>

  <tr><td style="background:#ffffff;padding:32px 40px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border-radius:12px;border:1px solid #e5e7eb;margin-bottom:24px;">
      <tr><td style="padding:20px 24px;">
        <p style="margin:0 0 12px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;">Kontaktdaten</p>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="padding:6px 0;color:#6b7280;font-size:14px;width:130px;">👤 Name</td><td style="padding:6px 0;color:#111827;font-size:14px;font-weight:600;">${name}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280;font-size:14px;">✉️ E-Mail</td><td style="padding:6px 0;"><a href="mailto:${emailAttr}" style="color:#2563eb;font-size:14px;font-weight:600;text-decoration:none;">${email}</a></td></tr>
          ${phone ? `<tr><td style="padding:6px 0;color:#6b7280;font-size:14px;">📞 Telefon</td><td style="padding:6px 0;"><a href="tel:${phoneTel}" style="color:#2563eb;font-size:14px;font-weight:600;text-decoration:none;">${phone}</a></td></tr>` : ""}
          <tr><td style="padding:6px 0;color:#6b7280;font-size:14px;">📍 Standort</td><td style="padding:6px 0;color:#111827;font-size:14px;font-weight:600;">${location}</td></tr>
          ${license_class ? `<tr><td style="padding:6px 0;color:#6b7280;font-size:14px;">🪪 Klasse</td><td style="padding:6px 0;"><span style="background:#00cc28;color:#fff;font-size:12px;font-weight:700;padding:3px 10px;border-radius:6px;">${license_class}</span></td></tr>` : ""}
        </table>
      </td></tr>
    </table>
    ${message ? `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;"><tr><td>
      <p style="margin:0 0 8px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;">Nachricht</p>
      <div style="background:#f0fdf4;border-left:4px solid #00cc28;padding:16px 20px;border-radius:0 12px 12px 0;">
        <p style="margin:0;color:#111827;font-size:14px;line-height:1.6;white-space:pre-wrap;">${message}</p>
      </div>
    </td></tr></table>` : ""}
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center" style="padding:8px 4px;">
        <a href="mailto:${emailAttr}?subject=Re: Deine Anfrage bei Fahrschule Metropol ${location}" style="display:inline-block;background:#00cc28;color:#fff;font-size:14px;font-weight:700;padding:14px 32px;border-radius:10px;text-decoration:none;min-width:180px;text-align:center;">✉️ Per E-Mail antworten</a>
      </td></tr>
      ${phone ? `<tr><td align="center" style="padding:8px 4px;">
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="padding:0 6px;"><a href="tel:${phoneTel}" style="display:inline-block;background:#111827;color:#fff;font-size:13px;font-weight:600;padding:12px 24px;border-radius:10px;text-decoration:none;">📞 Anrufen</a></td>
          <td style="padding:0 6px;"><a href="https://wa.me/${phoneWa}" style="display:inline-block;background:#25D366;color:#fff;font-size:13px;font-weight:600;padding:12px 24px;border-radius:10px;text-decoration:none;">💬 WhatsApp</a></td>
        </tr></table>
      </td></tr>` : ""}
    </table>
  </td></tr>

  <tr><td style="background:#f9fafb;padding:24px 40px;border-top:1px solid #e5e7eb;border-radius:0 0 16px 16px;">
    <p style="margin:0 0 4px;color:#6b7280;font-size:12px;">Fahrschule Metropol · Standort ${location}</p>
    <p style="margin:0 0 4px;color:#9ca3af;font-size:12px;">${locationInfo.address} · Tel: ${locationInfo.phone}</p>
    <p style="margin:12px 0 0;color:#d1d5db;font-size:11px;">Automatisch gesendet über fahrschule-metropol.de</p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

function buildConfirmationHtml(data: {
  name: string;
  location: string;
  license_class?: string;
  message?: string;
  locationInfo: { phone: string; address: string; email: string };
}) {
  const name = esc(data.name);
  const location = esc(data.location);
  const license_class = data.license_class ? esc(data.license_class) : "";
  const message = data.message ? esc(data.message) : "";
  const locationInfo = {
    phone: esc(data.locationInfo.phone),
    phoneTel: data.locationInfo.phone.replace(/[^0-9+]/g, ""),
    address: esc(data.locationInfo.address),
    email: esc(data.locationInfo.email),
    emailAttr: encodeURIComponent(data.locationInfo.email),
  };
  const firstName = esc(data.name.split(" ")[0]);

  return `
<!DOCTYPE html>
<html lang="de">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Segoe UI',Roboto,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <!-- Header -->
  <tr><td style="background:linear-gradient(135deg,#0a0a1a 0%,#1a1a2e 100%);padding:32px 40px;border-radius:16px 16px 0 0;" align="center">
    <img src="${LOGO_URL}" alt="Fahrschule Metropol" height="44" style="height:44px;width:auto;"/>
  </td></tr>

  <!-- Green hero -->
  <tr><td style="background:#00cc28;padding:32px 40px;text-align:center;">
    <p style="margin:0;font-size:40px;">✅</p>
    <h1 style="margin:12px 0 0;color:#fff;font-size:24px;font-weight:800;">Anfrage erhalten!</h1>
    <p style="margin:8px 0 0;color:rgba(255,255,255,0.9);font-size:15px;">Danke, ${firstName} – wir haben deine Nachricht bekommen.</p>
  </td></tr>

  <!-- Body -->
  <tr><td style="background:#ffffff;padding:36px 40px;">

    <!-- Personal greeting -->
    <p style="margin:0 0 20px;color:#111827;font-size:15px;line-height:1.7;">
      Hallo ${firstName},<br/><br/>
      schön, dass du dich für die <strong>Fahrschule Metropol</strong> in <strong>${location}</strong> entschieden hast! 
      Deine Anfrage${license_class ? ` für den <strong>${license_class}</strong>-Führerschein` : ""} ist bei uns eingegangen.
    </p>

    ${message ? `
    <!-- Their message back -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;"><tr><td>
      <p style="margin:0 0 8px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;">Deine Nachricht</p>
      <div style="background:#f9fafb;border-left:4px solid #e5e7eb;padding:14px 18px;border-radius:0 10px 10px 0;">
        <p style="margin:0;color:#6b7280;font-size:14px;line-height:1.5;font-style:italic;white-space:pre-wrap;">${message}</p>
      </div>
    </td></tr></table>` : ""}

    <!-- Next steps -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0fdf4;border-radius:12px;border:1px solid #dcfce7;margin-bottom:24px;">
      <tr><td style="padding:24px;">
        <p style="margin:0 0 16px;font-size:14px;font-weight:700;color:#111827;">🗓️ So geht's weiter:</p>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:8px 0;vertical-align:top;width:36px;">
              <div style="width:28px;height:28px;border-radius:50%;background:#00cc28;color:#fff;font-size:13px;font-weight:700;text-align:center;line-height:28px;">1</div>
            </td>
            <td style="padding:8px 0 8px 8px;color:#374151;font-size:14px;">Wir prüfen deine Anfrage und bereiten alles vor.</td>
          </tr>
          <tr>
            <td style="padding:8px 0;vertical-align:top;">
              <div style="width:28px;height:28px;border-radius:50%;background:#00cc28;color:#fff;font-size:13px;font-weight:700;text-align:center;line-height:28px;">2</div>
            </td>
            <td style="padding:8px 0 8px 8px;color:#374151;font-size:14px;">Innerhalb von <strong>24 Stunden</strong> melden wir uns persönlich bei dir.</td>
          </tr>
          <tr>
            <td style="padding:8px 0;vertical-align:top;">
              <div style="width:28px;height:28px;border-radius:50%;background:#00cc28;color:#fff;font-size:13px;font-weight:700;text-align:center;line-height:28px;">3</div>
            </td>
            <td style="padding:8px 0 8px 8px;color:#374151;font-size:14px;">Gemeinsam planen wir deinen Weg zum Führerschein! 🚗</td>
          </tr>
        </table>
      </td></tr>
    </table>

    <!-- Contact options -->
    <p style="margin:0 0 16px;font-size:14px;color:#6b7280;text-align:center;">Du hast Fragen? Erreich uns jederzeit:</p>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:6px;">
          <a href="tel:${locationInfo.phoneTel}" style="display:inline-block;background:#111827;color:#fff;font-size:14px;font-weight:700;padding:14px 28px;border-radius:10px;text-decoration:none;">📞 ${locationInfo.phone}</a>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding:6px;">
          <a href="mailto:${locationInfo.emailAttr}" style="display:inline-block;background:#f9fafb;color:#111827;font-size:13px;font-weight:600;padding:12px 28px;border-radius:10px;text-decoration:none;border:1px solid #e5e7eb;">✉️ ${locationInfo.email}</a>
        </td>
      </tr>
    </table>

  </td></tr>

  <!-- Footer -->
  <tr><td style="background:#f9fafb;padding:24px 40px;border-top:1px solid #e5e7eb;border-radius:0 0 16px 16px;text-align:center;">
    <p style="margin:0 0 4px;color:#6b7280;font-size:12px;font-weight:600;">Fahrschule Metropol · Standort ${location}</p>
    <p style="margin:0 0 4px;color:#9ca3af;font-size:12px;">${locationInfo.address}</p>
    <p style="margin:12px 0 0;color:#d1d5db;font-size:11px;">Du erhältst diese E-Mail, weil du eine Anfrage über fahrschule-metropol.de gestellt hast.</p>
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

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");

    const body = await req.json();

    // 1. Captcha (proof-of-effort). Blocks trivially-scripted spam.
    if (!verifyMathCaptcha(body?.turnstile_token)) {
      return new Response(JSON.stringify({ error: "Invalid or expired captcha" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 2. Strict server-side field validation.
    const name = str(body?.name, 100);
    const email = typeof body?.email === "string" ? body.email.trim() : null;
    const location = str(body?.location, 50);
    const phone = body?.phone == null || body.phone === "" ? undefined : str(body.phone, 40);
    const license_class = body?.license_class == null || body.license_class === "" ? undefined : str(body.license_class, 20);
    const message = body?.message == null || body.message === "" ? undefined : str(body.message, 5000);

    if (!name || !email || !isEmail(email) || !location) {
      return new Response(JSON.stringify({ error: "Missing or invalid fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (phone === null || license_class === null || message === null) {
      return new Response(JSON.stringify({ error: "Invalid field length" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const loc = locationEmails[location];
    if (!loc) throw new Error(`Unknown location: ${location}`);

    const staffHtml = buildStaffEmailHtml({
      name, email, phone, location, license_class, message,
      locationInfo: { phone: loc.phone, address: loc.address },
    });

    const confirmHtml = buildConfirmationHtml({
      name, location, license_class, message,
      locationInfo: { phone: loc.phone, address: loc.address, email: loc.email },
    });

    // Send both emails in parallel, each with independent retry/backoff
    const [staffResult, confirmResult] = await Promise.all([
      sendEmailWithRetry(RESEND_API_KEY, {
        from: "Fahrschule Metropol <noreply@fahrschule-metropol.de>",
        to: [loc.email],
        subject: `🚗 Neue Anfrage von ${name} – ${license_class || "Allgemein"} (${location})`,
        html: staffHtml,
        reply_to: email,
      }, `staff-${location}`),
      sendEmailWithRetry(RESEND_API_KEY, {
        from: "Fahrschule Metropol <noreply@fahrschule-metropol.de>",
        to: [email],
        subject: `✅ Deine Anfrage bei Fahrschule Metropol – wir melden uns!`,
        html: confirmHtml,
      }, `confirm-${email}`),
    ]);

    // Staff mail is critical — surface failure so the client can react.
    if (!staffResult.ok) {
      throw new Error(`Staff email failed after ${staffResult.attempts} attempts: ${staffResult.error}`);
    }
    if (!confirmResult.ok) {
      console.error(`Confirmation email failed after ${confirmResult.attempts} attempts:`, confirmResult.error);
    }

    return new Response(JSON.stringify({
      success: true,
      staff: { attempts: staffResult.attempts },
      confirm: { ok: confirmResult.ok, attempts: confirmResult.attempts },
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error sending inquiry notification:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
