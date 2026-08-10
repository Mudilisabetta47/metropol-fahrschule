// Protokolliert erfolgreiche Anmeldungen (IP, Gerät, Zwei-Faktor-Status).
// Nur mit gültigem Benutzer-Token aufrufbar; der Eintrag wird serverseitig
// erzeugt, damit IP-Adresse und Nutzer nicht gefälscht werden können.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

function clientIp(req: Request): string | null {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim().slice(0, 100);
  return req.headers.get("cf-connecting-ip")?.slice(0, 100) ?? null;
}

function decodeAal(token: string): string | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
    return typeof payload.aal === "string" ? payload.aal : null;
  } catch {
    return null;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Methode nicht erlaubt" }, 405);

  const token = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "");
  if (!token) return json({ error: "Nicht autorisiert" }, 401);

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } },
  );

  const { data: userData, error: userError } = await supabase.auth.getUser(token);
  const user = userData?.user;
  if (userError || !user) return json({ error: "Nicht autorisiert" }, 401);

  const { error } = await supabase.from("login_events").insert({
    user_id: user.id,
    email: user.email ?? null,
    ip_address: clientIp(req),
    user_agent: req.headers.get("user-agent")?.slice(0, 400) ?? null,
    aal: decodeAal(token),
  });

  if (error) {
    console.error("Login-Protokoll fehlgeschlagen:", error.message);
    return json({ error: "Protokollierung fehlgeschlagen" }, 500);
  }

  return json({ success: true });
});
