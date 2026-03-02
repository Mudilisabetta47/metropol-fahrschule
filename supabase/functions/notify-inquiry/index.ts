import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const locationEmails: Record<string, string> = {
  Bremen: "bremen@fahrschule-metropol.de",
  Garbsen: "garbsen@fahrschule-metropol.de",
  Hannover: "hannover@fahrschule-metropol.de",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const { name, email, phone, location, license_class, message } = await req.json();

    if (!name || !email || !location) {
      throw new Error("Missing required fields: name, email, location");
    }

    const recipientEmail = locationEmails[location];
    if (!recipientEmail) {
      throw new Error(`Unknown location: ${location}`);
    }

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a1a2e; color: white; padding: 24px; border-radius: 12px 12px 0 0;">
          <h1 style="margin: 0; font-size: 20px;">🚗 Neue Anfrage – ${location}</h1>
        </div>
        <div style="background: #ffffff; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 140px;">Name:</td>
              <td style="padding: 8px 0; color: #111827;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151;">E-Mail:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td>
            </tr>
            ${phone ? `<tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151;">Telefon:</td>
              <td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #2563eb;">${phone}</a></td>
            </tr>` : ""}
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151;">Standort:</td>
              <td style="padding: 8px 0; color: #111827;">${location}</td>
            </tr>
            ${license_class ? `<tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151;">Führerscheinklasse:</td>
              <td style="padding: 8px 0; color: #111827;">${license_class}</td>
            </tr>` : ""}
          </table>
          ${message ? `
            <div style="margin-top: 16px; padding: 16px; background: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
              <p style="margin: 0 0 4px 0; font-weight: bold; color: #374151; font-size: 14px;">Nachricht:</p>
              <p style="margin: 0; color: #111827; white-space: pre-wrap;">${message}</p>
            </div>
          ` : ""}
          <p style="margin-top: 24px; font-size: 12px; color: #9ca3af;">
            Diese E-Mail wurde automatisch über das Kontaktformular auf fahrschule-metropol.de gesendet.
          </p>
        </div>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Fahrschule Metropol <onboarding@resend.dev>",
        to: [recipientEmail],
        subject: `Neue Anfrage von ${name} – ${license_class || "Allgemein"} (${location})`,
        html: htmlBody,
        reply_to: email,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(`Resend API error [${res.status}]: ${JSON.stringify(data)}`);
    }

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
