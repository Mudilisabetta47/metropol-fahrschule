import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ContactFormProps {
  preselectedLocation?: string;
  compact?: boolean;
}

const licenseClasses = ["B (PKW)", "B197", "B196", "BE", "A (Motorrad)", "A1", "A2", "AM", "L"];
const locations = ["Bremen", "Garbsen", "Hannover"];

const ContactForm = ({ preselectedLocation, compact }: ContactFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
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

      toast({ title: "Vielen Dank!", description: "Wir melden uns schnellstmöglich bei dir." });
      setForm({ name: "", phone: "", email: "", location: preselectedLocation || "", license_class: "", message: "" });
      setConsent(false);
    } catch {
      toast({ title: "Fehler beim Senden. Bitte versuche es erneut.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
          <Input id="phone" type="tel" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} placeholder="0421 / 123 45" maxLength={30} />
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
        {loading ? "Wird gesendet…" : "Anfrage absenden"}
      </Button>
    </form>
  );
};

export default ContactForm;
