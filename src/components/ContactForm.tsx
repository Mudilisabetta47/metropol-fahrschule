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
import { useTranslation } from "react-i18next";
import MathCaptcha from "@/components/MathCaptcha";

interface ContactFormProps {
  preselectedLocation?: string;
  compact?: boolean;
}

const licenseClasses = ["B (PKW)", "B197", "B196", "BE", "A (Motorrad)", "A1", "A2", "AM", "L"];
const locations = ["Bremen", "Garbsen", "Hannover"];

const ContactForm = ({ preselectedLocation, compact }: ContactFormProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [consent, setConsent] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
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
      toast({ title: t("contactForm.consentError"), variant: "destructive" });
      return;
    }
    if (!form.name.trim() || !form.email.trim() || !form.location) {
      toast({ title: t("contactForm.fieldsError"), variant: "destructive" });
      return;
    }
    if (!turnstileToken) {
      toast({ title: t("contactForm.captchaError"), variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const inquiryPayload = {
        name: form.name.trim(),
        phone: form.phone.trim() || null,
        email: form.email.trim(),
        location: form.location,
        license_class: form.license_class || null,
        message: form.message.trim() || null,
        status: "neu",
      };

      const { error: fnError } = await supabase.functions.invoke("notify-inquiry", {
        body: { ...inquiryPayload, turnstile_token: turnstileToken },
      });
      if (fnError) throw fnError;

      const { error } = await supabase.from("inquiries").insert(inquiryPayload);
      if (error) throw error;

      setSubmittedName(form.name.trim().split(" ")[0]);
      setSubmitted(true);

      // Google Ads Conversion Tracking
      // TODO: Replace AW-XXXXXXXXXX/AbCdEfGhIjKlMnOpQr with your Conversion ID/Label
      if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
        (window as any).gtag("event", "conversion", {
          send_to: "AW-XXXXXXXXXX/AbCdEfGhIjKlMnOpQr",
          value: 1.0,
          currency: "EUR",
        });
      }

      setForm({ name: "", phone: "", email: "", location: preselectedLocation || "", license_class: "", message: "" });
      setConsent(false);
      setTurnstileToken(null);
    } catch {
      toast({ title: t("contactForm.sendError"), variant: "destructive" });
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
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }} className="relative mb-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-full gradient-primary shadow-glow">
              <CheckCircle className="h-12 w-12 text-primary-foreground" />
            </div>
            {[...Array(6)].map((_, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], x: [0, (i % 2 === 0 ? 1 : -1) * (30 + i * 12)], y: [0, -(20 + i * 10)] }} transition={{ duration: 0.8, delay: 0.3 + i * 0.05 }} className="absolute top-1/2 left-1/2 h-2 w-2 rounded-full" style={{ background: i % 3 === 0 ? "hsl(134, 100%, 40%)" : i % 3 === 1 ? "hsl(45, 100%, 55%)" : "hsl(200, 100%, 50%)" }} />
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <div className="flex items-center justify-center gap-2 mb-3">
              <PartyPopper className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-extrabold text-foreground font-display">{t("contactForm.successTitle", { name: submittedName })}</h3>
              <PartyPopper className="h-6 w-6 text-primary" />
            </div>
            <p className="text-muted-foreground mb-2 max-w-sm mx-auto">
              {t("contactForm.successText")} <strong className="text-foreground">{t("contactForm.successBold")}</strong> {t("contactForm.successEnd")}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="mt-6 rounded-2xl border border-border bg-accent/50 p-5 max-w-sm w-full">
            <p className="text-xs font-semibold text-foreground mb-3">{t("contactForm.nextSteps")}</p>
            <div className="space-y-3 text-left">
              {[t("contactForm.step1"), t("contactForm.step2"), t("contactForm.step3")].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full gradient-primary text-primary-foreground text-xs font-bold">{i + 1}</div>
                  <p className="text-sm text-muted-foreground">{step}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }} className="mt-6 flex flex-wrap justify-center gap-3">
            <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
              <ArrowLeft className="mr-1.5 h-4 w-4" /> {t("contactForm.newInquiry")}
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="tel:+495116425066"><Phone className="mr-1.5 h-4 w-4" /> {t("contactForm.callDirect")}</a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="mailto:info@fahrschule-metropol.de"><Mail className="mr-1.5 h-4 w-4" /> {t("contactForm.writeEmail")}</a>
            </Button>
          </motion.div>
        </motion.div>
      ) : (
        <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="space-y-4">
          <div className={`grid gap-4 ${compact ? "grid-cols-1" : "sm:grid-cols-2"}`}>
            <div className="space-y-2">
              <Label htmlFor="name">{t("contactForm.name")} *</Label>
              <Input id="name" value={form.name} onChange={(e) => handleChange("name", e.target.value)} placeholder={t("contactForm.namePlaceholder")} maxLength={100} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t("contactForm.email")} *</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} placeholder={t("contactForm.emailPlaceholder")} maxLength={255} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{t("contactForm.phone")}</Label>
              <Input id="phone" type="tel" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} placeholder={t("contactForm.phonePlaceholder")} maxLength={30} />
            </div>
            <div className="space-y-2">
              <Label>{t("contactForm.location")} *</Label>
              <Select value={form.location} onValueChange={(v) => handleChange("location", v)}>
                <SelectTrigger><SelectValue placeholder={t("contactForm.locationPlaceholder")} /></SelectTrigger>
                <SelectContent>
                  {locations.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t("contactForm.licenseClass")}</Label>
              <Select value={form.license_class} onValueChange={(v) => handleChange("license_class", v)}>
                <SelectTrigger><SelectValue placeholder={t("contactForm.classPlaceholder")} /></SelectTrigger>
                <SelectContent>
                  {licenseClasses.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">{t("contactForm.message")}</Label>
            <Textarea id="message" value={form.message} onChange={(e) => handleChange("message", e.target.value)} placeholder={t("contactForm.messagePlaceholder")} rows={4} maxLength={1000} />
          </div>
          <div className="flex items-start gap-2">
            <Checkbox id="consent" checked={consent} onCheckedChange={(v) => setConsent(v === true)} />
            <Label htmlFor="consent" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
              {t("contactForm.consent")} <a href="/datenschutz" className="text-primary underline">{t("contactForm.privacyPolicy")}</a>{t("contactForm.consentEnd")} *
            </Label>
          </div>
          <MathCaptcha onVerify={(token) => setTurnstileToken(token)} onExpire={() => setTurnstileToken(null)} />
          <Button type="submit" variant="cta" size="lg" disabled={loading || !turnstileToken} className="w-full sm:w-auto">
            {loading ? t("contactForm.sending") : t("contactForm.submit")}
          </Button>
          <p className="text-xs text-muted-foreground/60 mt-1">{t("contactForm.note")}</p>
        </motion.form>
      )}
    </AnimatePresence>
  );
};

export default ContactForm;
