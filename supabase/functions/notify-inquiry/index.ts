import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
    address: "Vahrenwalder Str. 213, 30165 Hannover",
  },
};

const LOGO_URL = "https://zsothhtfripxdiphedsu.supabase.co/storage/v1/object/public/site-images/email-logo.avif";

function buildEmailHtml(data: {
  name: string;
  email: string;
  phone?: string;
  location: string;
  license_class?: string;
  message?: string;
  locationInfo: { phone: string; address: string };
}) {
  const { name, email, phone, location, license_class, message, locationInfo } = data;
  const now = new Date().toLocaleString("de-DE", { dateStyle: "long", timeStyle: "short", timeZone: "Europe/Berlin" });

  return `
<!DOCTYPE html>
<html lang="de">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Segoe UI',Roboto,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <!-- Header -->
  <tr><td style="background:linear-gradient(135deg,#0a0a1a 0%,#1a1a2e 100%);padding:32px 40px;border-radius:16px 16px 0 0;">
    <table width="100%"><tr>
      <td><img src="${LOGO_URL}" alt="Fahrschule Metropol" height="40" style="height:40px;width:auto;"/></td>
      <td align="right"><span style="background:#00cc28;color:#fff;font-size:11px;font-weight:700;padding:6px 14px;border-radius:20px;text-transform:uppercase;letter-spacing:0.5px;">Neue Anfrage</span></td>
    </tr></table>
  </td></tr>

  <!-- Title bar -->
  <tr><td style="background:#00cc28;padding:20px 40px;">
    <p style="margin:0;color:#fff;font-size:18px;font-weight:700;">🚗 Anfrage von ${name}</p>
    <p style="margin:4px 0 0;color:rgba(255,255,255,0.85);font-size:13px;">Standort ${location} · ${now}</p>
  </td></tr>

  <!-- Body -->
  <tr><td style="background:#ffffff;padding:32px 40px;">

    <!-- Contact Card -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border-radius:12px;border:1px solid #e5e7eb;margin-bottom:24px;">
      <tr><td style="padding:20px 24px;">
        <p style="margin:0 0 12px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;">Kontaktdaten</p>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:6px 0;color:#6b7280;font-size:14px;width:130px;">👤 Name</td>
            <td style="padding:6px 0;color:#111827;font-size:14px;font-weight:600;">${name}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#6b7280;font-size:14px;">✉️ E-Mail</td>
            <td style="padding:6px 0;"><a href="mailto:${email}" style="color:#2563eb;font-size:14px;font-weight:600;text-decoration:none;">${email}</a></td>
          </tr>
          ${phone ? `<tr>
            <td style="padding:6px 0;color:#6b7280;font-size:14px;">📞 Telefon</td>
            <td style="padding:6px 0;"><a href="tel:${phone}" style="color:#2563eb;font-size:14px;font-weight:600;text-decoration:none;">${phone}</a></td>
          </tr>` : ""}
          <tr>
            <td style="padding:6px 0;color:#6b7280;font-size:14px;">📍 Standort</td>
            <td style="padding:6px 0;color:#111827;font-size:14px;font-weight:600;">${location}</td>
          </tr>
          ${license_class ? `<tr>
            <td style="padding:6px 0;color:#6b7280;font-size:14px;">🪪 Klasse</td>
            <td style="padding:6px 0;"><span style="background:#00cc28;color:#fff;font-size:12px;font-weight:700;padding:3px 10px;border-radius:6px;">${license_class}</span></td>
          </tr>` : ""}
        </table>
      </td></tr>
    </table>

    ${message ? `
    <!-- Message -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <tr><td>
        <p style="margin:0 0 8px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;">Nachricht</p>
        <div style="background:#f0fdf4;border-left:4px solid #00cc28;padding:16px 20px;border-radius:0 12px 12px 0;">
          <p style="margin:0;color:#111827;font-size:14px;line-height:1.6;white-space:pre-wrap;">${message}</p>
        </div>
      </td></tr>
    </table>` : ""}

    <!-- Action Buttons -->
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:8px 4px;">
          <a href="mailto:${email}?subject=Re: Deine Anfrage bei Fahrschule Metropol ${location}&body=Hallo ${name},%0A%0Avielen Dank für deine Anfrage bei Fahrschule Metropol.%0A%0A" style="display:inline-block;background:#00cc28;color:#fff;font-size:14px;font-weight:700;padding:14px 32px;border-radius:10px;text-decoration:none;min-width:180px;text-align:center;">✉️ Per E-Mail antworten</a>
        </td>
      </tr>
      ${phone ? `<tr>
        <td align="center" style="padding:8px 4px;">
          <table cellpadding="0" cellspacing="0"><tr>
            <td style="padding:0 6px;">
              <a href="tel:${phone}" style="display:inline-block;background:#111827;color:#fff;font-size:13px;font-weight:600;padding:12px 24px;border-radius:10px;text-decoration:none;">📞 Anrufen</a>
            </td>
            <td style="padding:0 6px;">
              <a href="https://wa.me/${phone.replace(/[^0-9]/g, "").replace(/^0/, "49")}" style="display:inline-block;background:#25D366;color:#fff;font-size:13px;font-weight:600;padding:12px 24px;border-radius:10px;text-decoration:none;">💬 WhatsApp</a>
            </td>
          </tr></table>
        </td>
      </tr>` : ""}
    </table>

  </td></tr>

  <!-- Footer -->
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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");

    const { name, email, phone, location, license_class, message } = await req.json();
    if (!name || !email || !location) throw new Error("Missing required fields");

    const loc = locationEmails[location];
    if (!loc) throw new Error(`Unknown location: ${location}`);

    const htmlBody = buildEmailHtml({
      name, email, phone, location, license_class, message,
      locationInfo: { phone: loc.phone, address: loc.address },
    });

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Fahrschule Metropol <noreply@fahrschule-metropol.de>",
        to: [loc.email],
        subject: `🚗 Neue Anfrage von ${name} – ${license_class || "Allgemein"} (${location})`,
        html: htmlBody,
        reply_to: email,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(`Resend API error [${res.status}]: ${JSON.stringify(data)}`);

    return new Response(JSON.stringify({ success: true }), {
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
