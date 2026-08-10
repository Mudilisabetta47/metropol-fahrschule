import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Lock, Mail, ShieldCheck } from "lucide-react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Zwei-Faktor-Schritt
  const [mfaFactorId, setMfaFactorId] = useState<string | null>(null);
  const [totpCode, setTotpCode] = useState("");

  const { toast } = useToast();
  const navigate = useNavigate();

  const logLogin = async () => {
    try {
      await supabase.functions.invoke("log-login", { body: {} });
    } catch {
      // Protokollierung darf den Login nie blockieren
    }
  };

  /** Prüft, ob nach dem Passwort noch ein zweiter Faktor nötig ist. */
  const continueAfterPassword = async () => {
    const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
    if (aal && aal.nextLevel === "aal2" && aal.nextLevel !== aal.currentLevel) {
      const { data: factors } = await supabase.auth.mfa.listFactors();
      const verified = factors?.totp?.[0];
      if (verified) {
        setMfaFactorId(verified.id);
        toast({ title: "Bestätigungscode erforderlich", description: "Bitte gib den 6-stelligen Code aus deiner Authenticator-App ein." });
        return;
      }
    }
    await logLogin();
    navigate("/dashboard");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast({ title: "Bitte E-Mail und Passwort eingeben.", variant: "destructive" });
      return;
    }
    const domain = email.trim().split("@")[1]?.toLowerCase();
    if (domain !== "fahrschule-metropol.de" && domain !== "metropol-bz.de" && domain !== "mep-agentur.de") {
      toast({ title: "Zugriff verweigert", description: "Nur E-Mail-Adressen mit @fahrschule-metropol.de oder @metropol-bz.de sind erlaubt.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) throw error;
      await continueAfterPassword();
    } catch (err: any) {
      toast({ title: "Login fehlgeschlagen", description: err.message || "Bitte überprüfe deine Eingaben.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyTotp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mfaFactorId || totpCode.trim().length < 6) {
      toast({ title: "Bitte den 6-stelligen Code eingeben.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({ factorId: mfaFactorId });
      if (challengeError) throw challengeError;
      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId: mfaFactorId,
        challengeId: challenge.id,
        code: totpCode.trim(),
      });
      if (verifyError) throw verifyError;
      await logLogin();
      navigate("/dashboard");
    } catch (err: any) {
      toast({ title: "Code ungültig", description: err.message || "Bitte versuche es erneut.", variant: "destructive" });
      setTotpCode("");
    } finally {
      setLoading(false);
    }
  };

  const cancelMfa = async () => {
    await supabase.auth.signOut();
    setMfaFactorId(null);
    setTotpCode("");
    setPassword("");
  };

  return (
    <div className="flex min-h-screen items-center justify-center pt-20 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="rounded-3xl border border-border bg-card p-8 shadow-card">
          <div className="mb-6 flex items-center justify-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
              <span className="text-xl font-black text-primary-foreground font-display">M</span>
            </div>
          </div>

          {mfaFactorId ? (
            <>
              <h1 className="mb-1 text-center text-xl font-bold text-foreground font-display">
                Zwei-Faktor-Bestätigung
              </h1>
              <p className="mb-6 text-center text-sm text-muted-foreground">
                Gib den 6-stelligen Code aus deiner Authenticator-App ein.
              </p>
              <form onSubmit={handleVerifyTotp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="totp">Bestätigungscode</Label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="totp"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={6}
                      value={totpCode}
                      onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ""))}
                      className="pl-10 tracking-[0.4em] text-center font-mono"
                      placeholder="000000"
                      autoFocus
                      required
                    />
                  </div>
                </div>
                <Button type="submit" variant="cta" className="w-full" disabled={loading}>
                  {loading ? "Wird geprüft…" : "Bestätigen"}
                </Button>
                <Button type="button" variant="ghost" className="w-full" onClick={cancelMfa} disabled={loading}>
                  Abbrechen
                </Button>
              </form>
            </>
          ) : (
            <>
              <h1 className="mb-1 text-center text-xl font-bold text-foreground font-display">
                Mitarbeiter-Login
              </h1>
              <p className="mb-6 text-center text-sm text-muted-foreground">
                Melde dich an, um das Dashboard zu nutzen.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-Mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" placeholder="name@fahrschule-metropol.de" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Passwort</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" placeholder="••••••••" required />
                  </div>
                </div>
                <Button type="submit" variant="cta" className="w-full" disabled={loading}>
                  {loading ? "Wird angemeldet…" : "Anmelden"}
                </Button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
