import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, PartyPopper, Phone, Mail, ArrowLeft } from "lucide-react";

interface ContactFormProps {
  preselectedLocation?: string;
  compact?: boolean;
}

const licenseClasses = ["B (PKW)", "B197", "B196", "BE", "A (Motorrad)", "A1", "A2", "AM", "L"];
const locations = ["Bremen", "Garbsen", "Hannover"];

const ContactForm = ({ preselectedLocation, compact }: ContactFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [consent, setConsent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    location: preselectedLocation || "",
    license_class: "",
    message: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      toast({ title: "Bitte stimme der Datenschutzerklärung zu.", variant: "destructive" });
      return;
    }
    if (!form.name.trim() || !form.email.trim() || !form.location) {
      toast({ title: "Bitte fülle alle Pflichtfelder aus.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("inquiries").insert({
        name: form.name.trim(),
        phone: form.phone.trim() || null,
        email: form.email.trim(),
        location: form.location,
        license_class: form.license_class || null,
        message: form.message.trim() || null,
        status: "neu",
      });

      if (error) throw error;

      setSubmittedName(form.name.trim().split(" ")[0]);
      setSubmitted(true);
      setForm({ name: "", phone: "", email: "", location: preselectedLocation || "", license_class: "", message: "" });
      setConsent(false);
    } catch {
      toast({ title: "Fehler beim Senden. Bitte versuche es erneut.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="flex flex-col items-center justify-center py-12 text-center"
        >
          {/* Animated checkmark */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
            className="relative mb-6"
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-full gradient-primary shadow-glow">
              <CheckCircle className="h-12 w-12 text-primary-foreground" />
            </div>
            {/* Confetti particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  x: [0, (i % 2 === 0 ? 1 : -1) * (30 + i * 12)],
                  y: [0, -(20 + i * 10)],
                }}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.05 }}
                className="absolute top-1/2 left-1/2 h-2 w-2 rounded-full"
                style={{
                  background: i % 3 === 0 ? "hsl(134, 100%, 40%)" : i % 3 === 1 ? "hsl(45, 100%, 55%)" : "hsl(200, 100%, 50%)",
                }}
              />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <PartyPopper className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-extrabold text-foreground font-display">
                Danke, {submittedName}!
              </h3>
              <PartyPopper className="h-6 w-6 text-primary" />
            </div>
            <p className="text-muted-foreground mb-2 max-w-sm mx-auto">
              Deine Anfrage ist bei uns eingegangen. Wir melden uns <strong className="text-foreground">innerhalb von 24 Stunden</strong> persönlich bei dir – versprochen!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-6 rounded-2xl border border-border bg-accent/50 p-5 max-w-sm w-full"
          >
            <p className="text-xs font-semibold text-foreground mb-3">So geht's weiter:</p>
            <div className="space-y-3 text-left">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full gradient-primary text-primary-foreground text-xs font-bold">1</div>
                <p className="text-sm text-muted-foreground">Wir prüfen deine Anfrage & bereiten alles vor.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full gradient-primary text-primary-foreground text-xs font-bold">2</div>
                <p className="text-sm text-muted-foreground">Du bekommst einen Anruf oder eine E-Mail von uns.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full gradient-primary text-primary-foreground text-xs font-bold">3</div>
                <p className="text-sm text-muted-foreground">Gemeinsam planen wir deinen Weg zum Führerschein! 🚗</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="mt-6 flex flex-wrap justify-center gap-3"
          >
            <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
              <ArrowLeft className="mr-1.5 h-4 w-4" /> Neue Anfrage
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="tel:+495116425066"><Phone className="mr-1.5 h-4 w-4" /> Direkt anrufen</a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="mailto:info@metropol-bz.de"><Mail className="mr-1.5 h-4 w-4" /> E-Mail schreiben</a>
            </Button>
          </motion.div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className={`grid gap-4 ${compact ? "grid-cols-1" : "sm:grid-cols-2"}`}>
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input id="name" value={form.name} onChange={(e) => handleChange("name", e.target.value)} placeholder="Max Mustermann" maxLength={100} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-Mail *</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="max@beispiel.de" maxLength={255} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon</Label>
              <Input id="phone" type="tel" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} placeholder="0511 6425066" maxLength={30} />
            </div>
            <div className="space-y-2">
              <Label>Standort *</Label>
              <Select value={form.location} onValueChange={(v) => handleChange("location", v)}>
                <SelectTrigger><SelectValue placeholder="Standort wählen" /></SelectTrigger>
                <SelectContent>
                  {locations.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Führerscheinklasse</Label>
              <Select value={form.license_class} onValueChange={(v) => handleChange("license_class", v)}>
                <SelectTrigger><SelectValue placeholder="Klasse wählen" /></SelectTrigger>
                <SelectContent>
                  {licenseClasses.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Nachricht</Label>
            <Textarea id="message" value={form.message} onChange={(e) => handleChange("message", e.target.value)} placeholder="Deine Nachricht an uns..." rows={4} maxLength={1000} />
          </div>
          <div className="flex items-start gap-2">
            <Checkbox id="consent" checked={consent} onCheckedChange={(v) => setConsent(v === true)} />
            <Label htmlFor="consent" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
              Ich stimme der Verarbeitung meiner Daten gemäß der <a href="/datenschutz" className="text-primary underline">Datenschutzerklärung</a> zu. *
            </Label>
          </div>
          <Button type="submit" variant="cta" size="lg" disabled={loading} className="w-full sm:w-auto">
            {loading ? "Wird gesendet…" : "Kostenlos beraten lassen ✨"}
          </Button>
          <p className="text-xs text-muted-foreground/60 mt-1">Unverbindlich & kostenlos – wir melden uns innerhalb von 24h.</p>
        </motion.form>
      )}
    </AnimatePresence>
  );
};

export default ContactForm;
