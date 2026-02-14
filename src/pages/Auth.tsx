import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast({ title: "Bitte E-Mail und Passwort eingeben.", variant: "destructive" });
      return;
    }
    if (isSignUp && password.length < 6) {
      toast({ title: "Passwort muss mindestens 6 Zeichen haben.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast({ title: "Registrierung erfolgreich!", description: "Bitte bestätige deine E-Mail-Adresse, um dich anzumelden." });
        setIsSignUp(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
        navigate("/dashboard");
      }
    } catch (err: any) {
      toast({ title: isSignUp ? "Registrierung fehlgeschlagen" : "Login fehlgeschlagen", description: err.message || "Bitte überprüfe deine Eingaben.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
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
          <h1 className="mb-1 text-center text-xl font-bold text-foreground font-display">
            {isSignUp ? "Mitarbeiter-Registrierung" : "Mitarbeiter-Login"}
          </h1>
          <p className="mb-6 text-center text-sm text-muted-foreground">
            {isSignUp ? "Erstelle deinen Account." : "Melde dich an, um das Dashboard zu nutzen."}
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
              {loading ? (isSignUp ? "Wird registriert…" : "Wird angemeldet…") : (isSignUp ? "Registrieren" : "Anmelden")}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            {isSignUp ? "Bereits registriert?" : "Noch kein Account?"}{" "}
            <button onClick={() => setIsSignUp(!isSignUp)} className="font-semibold text-primary hover:underline">
              {isSignUp ? "Zum Login" : "Jetzt registrieren"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
