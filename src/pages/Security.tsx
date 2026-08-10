import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, ShieldAlert, Smartphone, Trash2, Monitor, Globe, Clock } from "lucide-react";
import type { User } from "@supabase/supabase-js";

interface LoginEvent {
  id: string;
  email: string | null;
  ip_address: string | null;
  user_agent: string | null;
  aal: string | null;
  created_at: string;
}

interface Factor {
  id: string;
  friendly_name?: string;
  status: string;
}

function deviceLabel(ua: string | null): string {
  if (!ua) return "Unbekanntes Gerät";
  const os = /iPhone|iPad/.test(ua) ? "iOS"
    : /Android/.test(ua) ? "Android"
    : /Mac OS X/.test(ua) ? "macOS"
    : /Windows/.test(ua) ? "Windows"
    : /Linux/.test(ua) ? "Linux"
    : "Unbekannt";
  const browser = /Edg\//.test(ua) ? "Edge"
    : /Chrome\//.test(ua) ? "Chrome"
    : /Safari\//.test(ua) ? "Safari"
    : /Firefox\//.test(ua) ? "Firefox"
    : "Browser";
  return `${browser} · ${os}`;
}

const Security = () => {
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<LoginEvent[]>([]);
  const [factors, setFactors] = useState<Factor[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [qr, setQr] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [newFactorId, setNewFactorId] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) navigate("/login");
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) navigate("/login");
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadFactors = useCallback(async () => {
    const { data } = await supabase.auth.mfa.listFactors();
    setFactors((data?.totp ?? []) as Factor[]);
  }, []);

  const loadEvents = useCallback(async () => {
    const { data } = await supabase
      .from("login_events")
      .select("id,email,ip_address,user_agent,aal,created_at")
      .order("created_at", { ascending: false })
      .limit(50);
    setEvents(data ?? []);
  }, []);

  useEffect(() => {
    if (!user) return;
    (async () => {
      setLoading(true);
      await Promise.all([loadFactors(), loadEvents()]);
      setLoading(false);
    })();
  }, [user, loadFactors, loadEvents]);

  const startEnroll = async () => {
    setEnrolling(true);
    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: "totp",
      friendlyName: `Authenticator ${new Date().toLocaleDateString("de-DE")}`,
    });
    if (error || !data) {
      toast({ title: "Einrichtung fehlgeschlagen", description: error?.message, variant: "destructive" });
      setEnrolling(false);
      return;
    }
    setNewFactorId(data.id);
    setQr(data.totp.qr_code);
    setSecret(data.totp.secret);
    setEnrolling(false);
  };

  const confirmEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFactorId || code.trim().length < 6) {
      toast({ title: "Bitte den 6-stelligen Code eingeben.", variant: "destructive" });
      return;
    }
    setEnrolling(true);
    try {
      const { data: challenge, error: cErr } = await supabase.auth.mfa.challenge({ factorId: newFactorId });
      if (cErr) throw cErr;
      const { error: vErr } = await supabase.auth.mfa.verify({
        factorId: newFactorId,
        challengeId: challenge.id,
        code: code.trim(),
      });
      if (vErr) throw vErr;
      toast({ title: "Zwei-Faktor-Anmeldung aktiv", description: "Ab jetzt wird bei jedem Login ein Code verlangt." });
      setQr(null);
      setSecret(null);
      setNewFactorId(null);
      setCode("");
      await loadFactors();
    } catch (err: any) {
      toast({ title: "Code ungültig", description: err.message, variant: "destructive" });
    } finally {
      setEnrolling(false);
    }
  };

  const removeFactor = async (id: string) => {
    const { error } = await supabase.auth.mfa.unenroll({ factorId: id });
    if (error) {
      toast({ title: "Entfernen fehlgeschlagen", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Zwei-Faktor-Anmeldung entfernt" });
    await loadFactors();
  };

  const cancelEnroll = async () => {
    if (newFactorId) await supabase.auth.mfa.unenroll({ factorId: newFactorId }).catch(() => {});
    setQr(null);
    setSecret(null);
    setNewFactorId(null);
    setCode("");
  };

  const active = factors.filter((f) => f.status === "verified");

  if (!user) return null;

  return (
    <div className="min-h-screen bg-secondary/50 pt-20">
      <div className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-20 z-20">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard"><ArrowLeft className="h-4 w-4 mr-1" /> Zurück</Link>
            </Button>
            <div>
              <h1 className="text-base font-bold text-foreground font-display">Sicherheit</h1>
              <p className="text-[10px] text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-3xl px-4 py-6 space-y-6">
        {/* Zwei-Faktor */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-border bg-card p-6 shadow-card"
        >
          <div className="mb-4 flex items-start gap-3">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${active.length ? "bg-primary/10 text-primary" : "bg-amber-500/10 text-amber-600"}`}>
              {active.length ? <ShieldCheck className="h-5 w-5" /> : <ShieldAlert className="h-5 w-5" />}
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground font-display">Zwei-Faktor-Anmeldung</h2>
              <p className="text-sm text-muted-foreground">
                {active.length
                  ? "Aktiv – bei jeder Anmeldung wird zusätzlich ein Code aus deiner Authenticator-App verlangt."
                  : "Noch nicht aktiv. Ein gestohlenes Passwort allein reicht dann für den Zugang."}
              </p>
            </div>
          </div>

          {loading ? (
            <Skeleton className="h-10 w-full" />
          ) : active.length > 0 ? (
            <div className="space-y-2">
              {active.map((f) => (
                <div key={f.id} className="flex items-center justify-between rounded-2xl border border-border bg-secondary/40 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{f.friendly_name || "Authenticator-App"}</p>
                      <Badge variant="outline" className="mt-1 border-primary/30 bg-primary/10 text-primary">Bestätigt</Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeFactor(f.id)} className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4 mr-1" /> Entfernen
                  </Button>
                </div>
              ))}
            </div>
          ) : qr ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                1. Öffne eine Authenticator-App (z.&nbsp;B. Google Authenticator, Microsoft Authenticator, 1Password).<br />
                2. Scanne den QR-Code.<br />
                3. Gib den angezeigten 6-stelligen Code unten ein.
              </p>
              <div className="flex justify-center rounded-2xl border border-border bg-background p-4">
                <img src={qr} alt="QR-Code zur Einrichtung der Zwei-Faktor-Anmeldung" className="h-44 w-44" />
              </div>
              {secret && (
                <p className="text-center text-xs text-muted-foreground">
                  Manuell eingeben: <span className="font-mono text-foreground break-all">{secret}</span>
                </p>
              )}
              <form onSubmit={confirmEnroll} className="space-y-3">
                <Label htmlFor="enroll-code">Bestätigungscode</Label>
                <Input
                  id="enroll-code"
                  inputMode="numeric"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                  className="tracking-[0.4em] text-center font-mono"
                  placeholder="000000"
                  required
                />
                <div className="flex gap-2">
                  <Button type="submit" variant="cta" className="flex-1" disabled={enrolling}>
                    {enrolling ? "Wird geprüft…" : "Aktivieren"}
                  </Button>
                  <Button type="button" variant="outline" onClick={cancelEnroll} disabled={enrolling}>
                    Abbrechen
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <Button variant="cta" onClick={startEnroll} disabled={enrolling}>
              <ShieldCheck className="h-4 w-4 mr-1" />
              {enrolling ? "Wird vorbereitet…" : "Zwei-Faktor-Anmeldung einrichten"}
            </Button>
          )}
        </motion.section>

        {/* Login-Protokoll */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-3xl border border-border bg-card p-6 shadow-card"
        >
          <h2 className="mb-1 text-lg font-bold text-foreground font-display">Anmeldeprotokoll</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Die letzten 50 Anmeldungen. Kommt hier ein Zugriff vor, den du nicht kennst, ändere sofort dein Passwort.
          </p>

          {loading ? (
            <div className="space-y-2">
              {[0, 1, 2].map((i) => <Skeleton key={i} className="h-16 w-full" />)}
            </div>
          ) : events.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
              Noch keine Anmeldungen protokolliert. Neue Logins erscheinen hier automatisch.
            </p>
          ) : (
            <div className="space-y-2">
              {events.map((ev) => (
                <div key={ev.id} className="rounded-2xl border border-border bg-secondary/40 px-4 py-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-foreground">{ev.email ?? "Unbekannt"}</p>
                    <Badge
                      variant="outline"
                      className={ev.aal === "aal2"
                        ? "border-primary/30 bg-primary/10 text-primary"
                        : "border-amber-500/30 bg-amber-500/10 text-amber-600"}
                    >
                      {ev.aal === "aal2" ? "Mit 2FA" : "Nur Passwort"}
                    </Badge>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(ev.created_at).toLocaleString("de-DE", { dateStyle: "medium", timeStyle: "short" })}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Globe className="h-3 w-3" /> {ev.ip_address ?? "IP unbekannt"}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Monitor className="h-3 w-3" /> {deviceLabel(ev.user_agent)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
};

export default Security;
