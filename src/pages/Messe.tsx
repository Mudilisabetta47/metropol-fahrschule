import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Car, Bike, Truck, Tractor, Check, CheckCircle, Phone, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import MathCaptcha from "@/components/MathCaptcha";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { licenseClasses, type LicenseClassData } from "@/data/licenseClassData";
import logo from "@/assets/logo.avif";

const CAMPAIGN = "MESSE_2026";
const DRAFT_KEY = "messe-form-draft";

const groups = [
  { id: "pkw", title: "Auto", subtitle: "PKW & Anhänger", icon: Car, slugs: ["klasse-b", "klasse-b197", "klasse-b196", "klasse-be"] },
  { id: "motorrad", title: "Motorrad", subtitle: "Roller bis Superbike", icon: Bike, slugs: ["klasse-am", "klasse-a1", "klasse-a2", "klasse-a"] },
  { id: "lkw", title: "LKW & Bus", subtitle: "Berufskraftfahrer", icon: Truck, slugs: ["klasse-c1", "klasse-c", "klasse-ce", "klasse-d", "klasse-de"] },
  { id: "weitere", title: "Weitere", subtitle: "Land- & Forstwirtschaft", icon: Tractor, slugs: ["klasse-l"] },
];

const track = (event: string, params: Record<string, unknown> = {}) => {
  const w = window as any;
  if (typeof w.gtag === "function") w.gtag("event", event, { campaign: CAMPAIGN, ...params });
};

type Step = "start" | "group" | "course" | "info" | "form" | "done";

const emptyForm = { firstName: "", lastName: "", email: "", phone: "", location: "", birthDate: "", contact: "", message: "" };

const Messe = () => {
  const [step, setStep] = useState<Step>("start");
  const [groupId, setGroupId] = useState<string | null>(null);
  const [course, setCourse] = useState<LicenseClassData | null>(null);
  const [form, setForm] = useState(() => {
    try { return { ...emptyForm, ...JSON.parse(sessionStorage.getItem(DRAFT_KEY) || "{}") }; } catch { return emptyForm; }
  });
  const [consent, setConsent] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [started, setStarted] = useState(false);

  const group = groups.find((g) => g.id === groupId);
  const groupCourses = useMemo(
    () => (group ? group.slugs.map((s) => licenseClasses.find((c) => c.slug === s)).filter(Boolean) as LicenseClassData[] : []),
    [group]
  );

  useEffect(() => { track("messe_page_view"); }, []);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [step]);
  useEffect(() => { sessionStorage.setItem(DRAFT_KEY, JSON.stringify(form)); }, [form]);

  const set = (k: keyof typeof emptyForm, v: string) => {
    if (!started) { setStarted(true); track("messe_form_start", { course: course?.name }); }
    setForm((f: typeof emptyForm) => ({ ...f, [k]: v }));
  };

  const courseLabel = course && group ? `${group.title} – ${course.name}` : "";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim() || !form.phone.trim() || !form.location) {
      setError("Bitte fülle alle Pflichtfelder aus."); return;
    }
    if (!consent) { setError("Bitte bestätige die Datenschutzhinweise."); return; }
    if (!token) { setError("Bitte löse die kleine Rechenaufgabe."); return; }
    setLoading(true);
    track("messe_form_submit", { course: courseLabel });
    try {
      const { error: fnError } = await supabase.functions.invoke("notify-inquiry", {
        body: {
          name: `${form.firstName.trim()} ${form.lastName.trim()}`,
          email: form.email.trim(),
          phone: form.phone.trim(),
          location: form.location,
          license_class: course?.name.replace("Klasse ", "") || null,
          message: [`[MESSE 2026] Gewünschter Kurs: ${courseLabel}`, form.message.trim()].filter(Boolean).join("\n\n"),
          source: "messe",
          campaign: CAMPAIGN,
          birth_date: form.birthDate || null,
          contact_preference: form.contact || null,
          turnstile_token: token,
        },
      });
      if (fnError) throw fnError;
      track("messe_lead_success", { course: courseLabel });
      track("conversion", { send_to: "AW-XXXXXXXXXX/AbCdEfGhIjKlMnOpQr", value: 1.0, currency: "EUR" });
      sessionStorage.removeItem(DRAFT_KEY);
      setForm(emptyForm);
      setConsent(false);
      setToken(null);
      setStep("done");
    } catch (err) {
      console.error("[Messe] Anfrage fehlgeschlagen", err);
      track("messe_lead_error");
      setError("Deine Anfrage konnte gerade nicht gesendet werden. Deine Angaben bleiben erhalten – bitte versuche es gleich noch einmal oder ruf uns an: 0511 6425066.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setGroupId(null); setCourse(null); setStep("group"); };

  const Back = ({ to }: { to: Step }) => (
    <button onClick={() => setStep(to)} className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
      <ArrowLeft className="h-4 w-4" /> Zurück
    </button>
  );

  const stepIndex = { start: 0, group: 1, course: 2, info: 3, form: 4, done: 4 }[step];

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Messe 2026 – Fahrschule Metropol" description="Wähle jetzt deinen Führerscheinkurs bei der Fahrschule Metropol und sende direkt deine Anfrage – exklusiv auf der Messe 2026." canonical="https://messe.fahrschule-metropol.de/" />

      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <button onClick={() => setStep("start")} className="flex items-center gap-2">
            <img src={logo} alt="Fahrschule Metropol" className="h-9 w-auto" />
          </button>
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">Messe 2026</span>
        </div>
        {step !== "start" && step !== "done" && (
          <div className="h-1 bg-muted"><div className="h-1 bg-primary transition-all duration-500" style={{ width: `${(stepIndex / 4) * 100}%` }} /></div>
        )}
      </header>

      <main className="mx-auto max-w-3xl px-4 pb-16 pt-6">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
            {step === "start" && (
              <section className="pt-6 text-center">
                <p className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                  <Sparkles className="h-3.5 w-3.5" /> Besuche uns auf der Messe und sichere dir jetzt deinen passenden Führerscheinkurs.
                </p>
                <h1 className="font-display text-4xl font-extrabold leading-tight text-foreground sm:text-5xl">Fahrschule Metropol</h1>
                <p className="mt-3 text-xl font-semibold text-foreground sm:text-2xl">
                  Deine Ausbildung. Dein Führerschein. <span className="text-primary">Dein Weg.</span>
                </p>
                <p className="mx-auto mt-4 max-w-md text-muted-foreground">Über 20 Jahre Erfahrung · Zertifizierte Ausbildung · Hannover, Garbsen & Bremen</p>
                <div className="mx-auto mt-8 flex max-w-sm flex-col gap-3">
                  <Button size="lg" variant="cta" className="h-14 text-base" onClick={() => setStep("group")}>
                    Jetzt Kurs auswählen <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="h-14 text-base" onClick={() => { setGroupId(null); setCourse(null); setStep("form"); }}>
                    Beratung anfragen
                  </Button>
                </div>
                <div className="mt-10 grid grid-cols-3 gap-3 text-center">
                  {[["20+", "Jahre Erfahrung"], ["3", "Standorte"], ["14", "Klassen"]].map(([n, l]) => (
                    <div key={l} className="rounded-2xl border border-border bg-card p-4">
                      <div className="font-display text-2xl font-extrabold text-primary">{n}</div>
                      <div className="text-xs text-muted-foreground">{l}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {step === "group" && (
              <section>
                <Back to="start" />
                <p className="text-xs font-bold uppercase tracking-wider text-primary">Schritt 1 von 4</p>
                <h2 className="mb-6 mt-1 font-display text-3xl font-extrabold text-foreground">Was möchtest du machen?</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {groups.map((g) => (
                    <button key={g.id} onClick={() => { setGroupId(g.id); track("messe_course_open", { group: g.title }); setStep("course"); }}
                      className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 text-left transition hover:border-primary hover:shadow-lg active:scale-[0.98]">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                        <g.icon className="h-7 w-7" />
                      </div>
                      <div className="flex-1">
                        <div className="text-lg font-bold text-foreground">{g.title}</div>
                        <div className="text-sm text-muted-foreground">{g.subtitle} · {g.slugs.length} {g.slugs.length === 1 ? "Kurs" : "Kurse"}</div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                    </button>
                  ))}
                </div>
              </section>
            )}

            {step === "course" && group && (
              <section>
                <Back to="group" />
                <p className="text-xs font-bold uppercase tracking-wider text-primary">Schritt 2 von 4 · {group.title}</p>
                <h2 className="mb-6 mt-1 font-display text-3xl font-extrabold text-foreground">Welcher genaue Kurs?</h2>
                <div className="space-y-3">
                  {groupCourses.map((c) => (
                    <button key={c.slug} onClick={() => { setCourse(c); track("messe_subcourse_select", { course: c.name }); setStep("info"); }}
                      className="flex w-full items-center gap-4 rounded-2xl border border-border bg-card p-5 text-left transition hover:border-primary active:scale-[0.99]">
                      <div className="flex-1">
                        <div className="text-lg font-bold text-foreground">{c.name}</div>
                        <div className="text-sm text-muted-foreground">{c.subtitle} · ab {c.details.minAge}</div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-primary" />
                    </button>
                  ))}
                </div>
              </section>
            )}

            {step === "info" && course && (
              <section>
                <Back to="course" />
                <p className="text-xs font-bold uppercase tracking-wider text-primary">Schritt 3 von 4 · Kurzinformation</p>
                <h2 className="mt-1 font-display text-3xl font-extrabold text-foreground">{course.name}</h2>
                <p className="text-lg font-medium text-muted-foreground">{course.subtitle}</p>
                <p className="mt-4 leading-relaxed text-foreground/90">{course.heroDescription}</p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[["Mindestalter", course.details.minAge], ["Dauer", course.details.duration], ["Prüfung", course.details.exam], ["Inklusive", course.details.includes]].map(([k, v]) => (
                    <div key={k} className="rounded-xl border border-border bg-card p-4">
                      <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{k}</div>
                      <div className="mt-1 text-sm font-semibold text-foreground">{v}</div>
                    </div>
                  ))}
                </div>

                <h3 className="mb-3 mt-8 font-bold text-foreground">Voraussetzungen</h3>
                <ul className="space-y-2">
                  {course.prerequisites.map((p) => (
                    <li key={p} className="flex gap-2 text-sm text-foreground/90"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{p}</li>
                  ))}
                </ul>

                <h3 className="mb-3 mt-6 font-bold text-foreground">Deine Vorteile</h3>
                <ul className="space-y-2">
                  {course.advantages.slice(0, 5).map((p) => (
                    <li key={p} className="flex gap-2 text-sm text-foreground/90"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{p}</li>
                  ))}
                </ul>

                <div className="sticky bottom-4 mt-8">
                  <Button size="lg" variant="cta" className="h-14 w-full text-base shadow-lg" onClick={() => setStep("form")}>
                    Diesen Kurs auswählen <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </section>
            )}

            {step === "form" && (
              <section>
                <Back to={course ? "info" : "start"} />
                <p className="text-xs font-bold uppercase tracking-wider text-primary">{course ? "Schritt 4 von 4" : "Beratung"}</p>
                <h2 className="mb-4 mt-1 font-display text-3xl font-extrabold text-foreground">Jetzt Interesse anmelden</h2>

                {course ? (
                  <div className="mb-6 flex items-center justify-between rounded-2xl border border-primary/40 bg-primary/10 p-4">
                    <div>
                      <div className="text-xs font-semibold uppercase text-muted-foreground">Gewünschter Kurs</div>
                      <div className="font-bold text-foreground">{courseLabel}</div>
                    </div>
                    <button type="button" onClick={reset} className="text-sm font-semibold text-primary underline">Ändern</button>
                  </div>
                ) : (
                  <p className="mb-6 text-sm text-muted-foreground">Noch unsicher? Wir beraten dich gerne persönlich. <button type="button" onClick={() => setStep("group")} className="font-semibold text-primary underline">Oder Kurs auswählen</button></p>
                )}

                <form onSubmit={submit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5"><Label htmlFor="fn">Vorname *</Label><Input id="fn" className="h-12" autoComplete="given-name" maxLength={50} value={form.firstName} onChange={(e) => set("firstName", e.target.value)} /></div>
                    <div className="space-y-1.5"><Label htmlFor="ln">Nachname *</Label><Input id="ln" className="h-12" autoComplete="family-name" maxLength={50} value={form.lastName} onChange={(e) => set("lastName", e.target.value)} /></div>
                  </div>
                  <div className="space-y-1.5"><Label htmlFor="em">E-Mail *</Label><Input id="em" type="email" inputMode="email" className="h-12" autoComplete="email" maxLength={255} value={form.email} onChange={(e) => set("email", e.target.value)} /></div>
                  <div className="space-y-1.5"><Label htmlFor="ph">Telefon *</Label><Input id="ph" type="tel" inputMode="tel" className="h-12" autoComplete="tel" maxLength={30} value={form.phone} onChange={(e) => set("phone", e.target.value)} /></div>

                  <div className="space-y-1.5">
                    <Label>Standort *</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Hannover", "Garbsen", "Bremen"].map((l) => (
                        <button type="button" key={l} onClick={() => set("location", l)}
                          className={`h-12 rounded-xl border text-sm font-semibold transition ${form.location === l ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground"}`}>{l}</button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5"><Label htmlFor="bd">Geburtsdatum</Label><Input id="bd" type="date" className="h-12" value={form.birthDate} onChange={(e) => set("birthDate", e.target.value)} /></div>
                    <div className="space-y-1.5">
                      <Label htmlFor="ct">Kontakt per</Label>
                      <select id="ct" value={form.contact} onChange={(e) => set("contact", e.target.value)} className="h-12 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground">
                        <option value="">Egal</option><option value="telefon">Telefon</option><option value="whatsapp">WhatsApp</option><option value="email">E-Mail</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1.5"><Label htmlFor="msg">Nachricht</Label><Textarea id="msg" rows={3} maxLength={1000} value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="Fragen, Wunschtermin …" /></div>

                  <div className="flex items-start gap-2">
                    <Checkbox id="cs" checked={consent} onCheckedChange={(v) => setConsent(v === true)} className="mt-0.5" />
                    <Label htmlFor="cs" className="cursor-pointer text-xs leading-relaxed text-muted-foreground">
                      Ich bin einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage gespeichert werden. <a href="https://fahrschule-metropol.de/datenschutz" target="_blank" rel="noopener noreferrer" className="text-primary underline">Datenschutz</a> *
                    </Label>
                  </div>
                  <MathCaptcha onVerify={setToken} onExpire={() => setToken(null)} />

                  {error && <div role="alert" className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm font-medium text-destructive">{error}</div>}

                  <Button type="submit" size="lg" variant="cta" disabled={loading} className="h-14 w-full text-base">
                    {loading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Wird gesendet …</> : <>Jetzt Anfrage senden <ArrowRight className="ml-2 h-5 w-5" /></>}
                  </Button>
                </form>
              </section>
            )}

            {step === "done" && (
              <section className="pt-10 text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary">
                  <CheckCircle className="h-12 w-12 text-primary-foreground" />
                </motion.div>
                <h2 className="font-display text-2xl font-extrabold text-foreground sm:text-3xl">Vielen Dank! Deine Anfrage ist bei der Fahrschule Metropol eingegangen.</h2>
                <p className="mt-3 text-lg text-muted-foreground">Wir melden uns schnellstmöglich bei dir.</p>
                <div className="mx-auto mt-8 flex max-w-sm flex-col gap-3">
                  <Button size="lg" variant="cta" className="h-14" onClick={reset}>Zurück zur Kursübersicht</Button>
                  <Button size="lg" variant="outline" className="h-14" asChild><a href="tel:+495116425066"><Phone className="mr-2 h-5 w-5" /> 0511 6425066</a></Button>
                </div>
              </section>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        Fahrschule Metropol · Inh. Vedat Özel · <a href="https://fahrschule-metropol.de/impressum" className="underline">Impressum</a> · <a href="https://fahrschule-metropol.de/datenschutz" className="underline">Datenschutz</a>
      </footer>
    </div>
  );
};

export default Messe;
