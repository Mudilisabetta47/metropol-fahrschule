import { sendEmailWithRetry } from "../_shared/send-with-retry.ts";
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LOGO_URL = "https://zsothhtfripxdiphedsu.supabase.co/storage/v1/object/public/site-images/email-logo.avif";

const RECIPIENTS = [
  "bremen@fahrschule-metropol.de",
  "garbsen@fahrschule-metropol.de",
  "hannover@fahrschule-metropol.de",
];

const SUBJECT = "🚨 DRINGEND: Anfragen innerhalb von 24 Stunden bearbeiten – Abmahnung bei Verstoß";

const HTML = `<!DOCTYPE html>
<html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Segoe UI',Roboto,Arial,sans-serif;color:#1a1a2e;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px;">
<tr><td align="center">
<table width="640" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.06);">
  <tr><td style="background:linear-gradient(135deg,#0a0a1a 0%,#1a1a2e 100%);padding:28px 36px;">
    <table width="100%"><tr>
      <td><img src="${LOGO_URL}" alt="Fahrschule Metropol" height="40" style="height:40px;width:auto;"/></td>
      <td align="right"><span style="background:#dc2626;color:#fff;font-size:11px;font-weight:800;padding:6px 14px;border-radius:20px;text-transform:uppercase;letter-spacing:0.5px;">Dringend</span></td>
    </tr></table>
  </td></tr>
  <tr><td style="background:#dc2626;padding:18px 36px;">
    <p style="margin:0;color:#fff;font-size:18px;font-weight:800;">🚨 Wichtige Anweisung der Geschäftsleitung</p>
    <p style="margin:4px 0 0;color:rgba(255,255,255,0.9);font-size:13px;">Bearbeitung aller eingehenden Anfragen</p>
  </td></tr>
  <tr><td style="padding:32px 36px;">
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Liebes Team,</p>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">
      ab sofort gilt für <strong>alle Standorte (Bremen, Garbsen, Hannover)</strong> verbindlich folgende Regelung
      für eingehende Kunden- und Interessenten-Anfragen (E-Mail, Kontaktformular, WhatsApp, Telefon-Rückrufwünsche):
    </p>
    <div style="background:#fef2f2;border-left:4px solid #dc2626;padding:16px 20px;border-radius:8px;margin:0 0 20px;">
      <p style="margin:0;font-size:15px;font-weight:700;color:#991b1b;">
        Jede Anfrage ist innerhalb von <u>maximal 24 Stunden</u> zu beantworten und zu bearbeiten.
      </p>
    </div>
    <p style="margin:0 0 12px;font-size:15px;font-weight:700;">Das bedeutet konkret:</p>
    <ul style="margin:0 0 20px;padding-left:22px;font-size:15px;line-height:1.7;">
      <li>E-Mail-Postfach <strong>täglich mehrfach prüfen</strong> – inkl. Spam-Ordner.</li>
      <li>Bei Urlaub, Krankheit oder Abwesenheit muss eine <strong>Vertretung im Team</strong> die Bearbeitung sicherstellen.</li>
      <li>Auch unvollständige oder kurze Anfragen erhalten eine zeitnahe Rückmeldung.</li>
    </ul>
    <div style="background:#fffbeb;border:1px solid #fbbf24;padding:16px 20px;border-radius:8px;margin:0 0 24px;">
      <p style="margin:0 0 6px;font-size:14px;font-weight:800;color:#92400e;">⚠️ Konsequenzen bei Nichteinhaltung</p>
      <p style="margin:0;font-size:14px;line-height:1.6;color:#78350f;">
        Jede Anfrage, die <strong>länger als 24 Stunden</strong> unbeantwortet bleibt, wird <strong>abgemahnt</strong>.
        Bei wiederholten Verstößen behalten wir uns weitere arbeitsrechtliche Schritte vor.
      </p>
    </div>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">
      Anfragen sind unsere wichtigste Quelle für neue Fahrschüler – jede unbearbeitete Anfrage ist ein direkter Umsatzverlust
      und schadet dem Ruf der Fahrschule Metropol. Wir zählen auf eure Professionalität und Zuverlässigkeit.
    </p>
    <p style="margin:0 0 4px;font-size:15px;">Mit freundlichen Grüßen</p>
    <p style="margin:0;font-size:15px;font-weight:700;">IT – Fahrschule Metropol</p>
    <p style="margin:2px 0 0;font-size:13px;color:#64748b;">im Auftrag von Vedat Özel (Inhaber)</p>
  </td></tr>
  <tr><td style="background:#f8fafc;padding:18px 36px;border-top:1px solid #e2e8f0;">
    <p style="margin:0;font-size:12px;color:#64748b;text-align:center;">
      Fahrschule Metropol · Inh. Vedat Özel · Bremen · Garbsen · Hannover
    </p>
  </td></tr>
</table>
</td></tr></table></body></html>`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  if (!RESEND_API_KEY) {
    return new Response(JSON.stringify({ error: "RESEND_API_KEY missing" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const results = await Promise.all(RECIPIENTS.map(async (to) => {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Fahrschule Metropol IT <noreply@fahrschule-metropol.de>",
        to: [to],
        subject: SUBJECT,
        html: HTML,
        reply_to: "vedat@fahrschule-metropol.de",
      }),
    });
    const data = await res.json().catch(() => ({}));
    return { to, status: res.status, ok: res.ok, data };
  }));

  return new Response(JSON.stringify({ sent: results }, null, 2), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
