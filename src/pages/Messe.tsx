import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight, Car, Bike, Truck, Tractor, Check, CheckCircle, Phone, Sparkles, Loader2, Star, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import MathCaptcha from "@/components/MathCaptcha";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { licenseClasses, type LicenseClassData } from "@/data/licenseClassData";
import logo from "@/assets/logo-crop.png";
import heroImg from "@/assets/fahrschule-hero.jpg";
import imgPkw from "@/assets/class-pkw.jpg";
import imgMotorrad from "@/assets/class-motorrad.jpg";
import imgLkw from "@/assets/class-lkw.jpg";
import imgBus from "@/assets/class-bus.jpg";

const CAMPAIGN = "MESSE_2026";
const DRAFT_KEY = "messe-form-draft";

const groups = [
  { id: "pkw", title: "Auto", subtitle: "PKW & Anhänger", icon: Car, image: imgPkw, slugs: ["klasse-b", "klasse-b197", "klasse-b196", "klasse-be"] },
  { id: "motorrad", title: "Motorrad", subtitle: "Roller bis Superbike", icon: Bike, image: imgMotorrad, slugs: ["klasse-am", "klasse-a1", "klasse-a2", "klasse-a"] },
  { id: "lkw", title: "LKW & Bus", subtitle: "Berufskraftfahrer", icon: Truck, image: imgLkw, slugs: ["klasse-c1", "klasse-c", "klasse-ce", "klasse-d", "klasse-de"] },
  { id: "weitere", title: "Weitere", subtitle: "Land- & Forstwirtschaft", icon: Tractor, image: imgBus, slugs: ["klasse-l"] },
];

const gallery = [
  { src: imgPkw, label: "Klasse B" },
  { src: imgMotorrad, label: "Motorrad" },
  { src: imgLkw, label: "LKW & CE" },
  { src: imgBus, label: "Bus & D" },
];

const track = (event: string, params: Record<string, unknown> = {}) => {
  const w = window as any;
  if (typeof w.gtag === "function") w.gtag("event", event, { campaign: CAMPAIGN, ...params });
};

type Step = "start" | "group" | "course" | "info" | "form" | "done";

const emptyForm = { firstName: "", lastName: "", email: "", phone: "", location: "", birthDate: "", contact: "", message: "" };

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const Counter = ({ value, label }: { value: number; label: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1200;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return (
    <div ref={ref} className="rounded-2xl border border-border bg-card/90 p-4 text-center shadow-lg backdrop-blur">
      <div className="font-display text-2xl font-extrabold text-primary sm:text-3xl">{n}{value >= 20 ? "+" : ""}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
};

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
  const courseImage = group?.image ?? heroImg;

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
            <img src={logo} alt="Fahrschule Metropol" className="h-11 w-auto" />
          </button>
          <motion.span
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
            className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground"
          >
            Messe 2026
          </motion.span>
        </div>
        {step !== "start" && step !== "done" && (
          <div className="h-1 bg-muted">
            <motion.div className="h-full bg-primary" initial={false} animate={{ width: `${(stepIndex / 4) * 100}%` }} transition={{ duration: 0.5, ease: "easeOut" }} />
          </div>
        )}
      </header>

      {/* Ticker */}
      <div className="overflow-hidden border-b border-border bg-primary/5 py-2">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
        >
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center gap-8 pr-8 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <span className="flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5 text-primary" /> Messe-Angebot 2026</span>
              <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-primary" /> Hannover · Garbsen · Bremen</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-primary" /> Zertifizierte Ausbildung</span>
              <span className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5 text-primary" /> Über 20 Jahre Erfahrung</span>
              <span className="flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5 text-primary" /> Persönliche Beratung am Stand</span>
              <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-primary" /> 3 Standorte in der Region</span>
            </div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, y: 24, scale: 0.99 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12, scale: 0.995 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
          {step === "start" && (
            <main>
              {/* HERO */}
              <section className="relative flex min-h-[72vh] items-end overflow-hidden">
                <motion.img
                  src={heroImg}
                  alt="Fahrschule Metropol Trainingsfahrzeug"
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ scale: 1.15, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />

                <motion.div
                  variants={stagger}
                  initial="hidden"
                  animate="show"
                  className="relative mx-auto w-full max-w-3xl px-4 pb-10 pt-24 text-center"
                >
                  <motion.p variants={fadeUp} className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur">
                    <Sparkles className="h-3.5 w-3.5" /> Besuche uns auf der Messe und sichere dir deinen Kurs
                  </motion.p>
                  <motion.h1 variants={fadeUp} className="font-display text-4xl font-extrabold leading-tight text-foreground drop-shadow-sm sm:text-6xl">
                    Fahrschule <span className="text-primary">Metropol</span>
                  </motion.h1>
                  <motion.p variants={fadeUp} className="mt-3 text-xl font-semibold text-foreground sm:text-2xl">
                    Deine Ausbildung. Dein Führerschein. <span className="text-primary">Dein Weg.</span>
                  </motion.p>
                  <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-md text-sm text-muted-foreground sm:text-base">
                    Über 20 Jahre Erfahrung · Zertifizierte Ausbildung · Hannover, Garbsen & Bremen
                  </motion.p>
                  <motion.div variants={fadeUp} className="mx-auto mt-8 flex max-w-sm flex-col gap-3">
                    <Button size="lg" variant="cta" className="h-14 text-base shadow-xl" onClick={() => setStep("group")}>
                      Jetzt Kurs auswählen <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button size="lg" variant="outline" className="h-14 text-base" onClick={() => { setGroupId(null); setCourse(null); setStep("form"); }}>
                      Beratung anfragen
                    </Button>
                  </motion.div>
                  <motion.div variants={fadeUp} className="mt-10 grid grid-cols-3 gap-3">
                    <Counter value={20} label="Jahre Erfahrung" />
                    <Counter value={3} label="Standorte" />
                    <Counter value={14} label="Klassen" />
                  </motion.div>
                </motion.div>
              </section>

              {/* GALERIE */}
              <section className="mx-auto max-w-3xl px-4 py-12">
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-60px" }}
                >
                  <motion.h2 variants={fadeUp} className="mb-1 text-center font-display text-2xl font-extrabold text-foreground sm:text-3xl">
                    Das wartet auf dich
                  </motion.h2>
                  <motion.p variants={fadeUp} className="mb-8 text-center text-sm text-muted-foreground">
                    Moderne Fahrzeuge, echte Praxis – komm am Stand vorbei und sieh dir alles direkt an.
                  </motion.p>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {gallery.map((g, i) => (
                      <motion.figure
                        key={g.label}
                        variants={fadeUp}
                        whileHover={{ y: -6, scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                        className={`group relative overflow-hidden rounded-2xl border border-border shadow-lg ${i === 0 ? "col-span-2 aspect-[16/7]" : "aspect-[4/3]"}`}
                      >
                        <img src={g.src} alt={g.label} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                        <figcaption className="absolute bottom-3 left-3 rounded-full bg-background/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-foreground backdrop-blur">
                          {g.label}
                        </figcaption>
                      </motion.figure>
                    ))}
                  </div>
                </motion.div>
              </section>

              {/* USP-BAND */}
              <section className="mx-auto max-w-3xl px-4 pb-14">
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-60px" }}
                  className="grid gap-3 sm:grid-cols-3"
                >
                  {[
                    { icon: ShieldCheck, title: "Zertifizierte Ausbildung", text: "Erfahrene Fahrlehrer, die dich ans Ziel bringen." },
                    { icon: MapPin, title: "3 Standorte", text: "Hannover, Garbsen und Bremen – immer in deiner Nähe." },
                    { icon: Star, title: "Messe-Vorteil", text: "Sichere dir deinen Kurs direkt vor Ort – ohne Wartezeit." },
                  ].map(({ icon: Icon, title, text }) => (
                    <motion.div key={title} variants={fadeUp} whileHover={{ y: -4 }} className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-lg">
                      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="font-bold text-foreground">{title}</div>
                      <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </section>

              {/* FINAL CTA */}
              <section className="mx-auto max-w-3xl px-4 pb-16">
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5 }}
                  className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/15 via-card to-card p-8 text-center shadow-xl"
                >
                  <motion.div
                    aria-hidden
                    className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl"
                    animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  />
                  <motion.div
                    aria-hidden
                    className="absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl"
                    animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.7, 0.4] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  />
                  <h2 className="relative font-display text-2xl font-extrabold text-foreground sm:text-3xl">
                    Bereit für <span className="text-primary">deinen Weg?</span>
                  </h2>
                  <p className="relative mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                    Wähle in under einer Minute deinen Kurs – wir kümmern uns um den Rest.
                  </p>
                  <Button size="lg" variant="cta" className="relative mt-6 h-14 px-8 text-base shadow-lg" onClick={() => setStep("group")}>
                    Kurs auswählen <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </section>
            </main>
          )}

          {step === "group" && (
            <main className="mx-auto max-w-3xl px-4 pb-16 pt-6">
              <section>
                <Back to="start" />
                <p className="text-xs font-bold uppercase tracking-wider text-primary">Schritt 1 von 4</p>
                <h2 className="mb-6 mt-1 font-display text-3xl font-extrabold text-foreground">Was möchtest du machen?</h2>
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  animate="show"
                  className="grid gap-4 sm:grid-cols-2"
                >
                  {groups.map((g) => (
                    <motion.button
                      key={g.id}
                      variants={fadeUp}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { setGroupId(g.id); track("messe_course_open", { group: g.title }); setStep("course"); }}
                      className="group relative flex items-end overflow-hidden rounded-2xl border border-border p-5 text-left shadow-sm transition-shadow hover:border-primary hover:shadow-xl"
                    >
                      <img src={g.image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
                      <div className="relative flex w-full items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
                          <g.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <div className="text-lg font-extrabold text-foreground drop-shadow-sm">{g.title}</div>
                          <div className="text-sm text-muted-foreground">{g.subtitle} · {g.slugs.length} {g.slugs.length === 1 ? "Kurs" : "Kurse"}</div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              </section>
            </main>
          )}

          {step === "course" && group && (
            <main className="mx-auto max-w-3xl px-4 pb-16 pt-6">
              <section>
                <Back to="group" />
                <p className="text-xs font-bold uppercase tracking-wider text-primary">Schritt 2 von 4 · {group.title}</p>
                <h2 className="mb-6 mt-1 font-display text-3xl font-extrabold text-foreground">Welcher genaue Kurs?</h2>
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  animate="show"
                  className="space-y-3"
                >
                  {groupCourses.map((c) => (
                    <motion.button
                      key={c.slug}
                      variants={fadeUp}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => { setCourse(c); track("messe_subcourse_select", { course: c.name }); setStep("info"); }}
                      className="flex w-full items-center gap-4 rounded-2xl border border-border bg-card p-5 text-left shadow-sm transition hover:border-primary hover:shadow-lg"
                    >
                      <div className="flex-1">
                        <div className="text-lg font-bold text-foreground">{c.name}</div>
                        <div className="text-sm text-muted-foreground">{c.subtitle} · ab {c.details.minAge}</div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-primary" />
                    </motion.button>
                  ))}
                </motion.div>
              </section>
            </main>
          )}

          {step === "info" && course && (
            <main className="mx-auto max-w-3xl px-4 pb-16 pt-6">
              <section>
                <Back to="course" />
                <div className="relative mb-5 overflow-hidden rounded-2xl">
                  <motion.img
                    key={course.slug}
                    src={courseImage}
                    alt={course.name}
                    className="h-40 w-full object-cover sm:h-52"
                    initial={{ scale: 1.12, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-primary">Schritt 3 von 4 · Kurzinformation</p>
                    <h2 className="font-display text-2xl font-extrabold text-foreground drop-shadow-sm sm:text-3xl">{course.name}</h2>
                  </div>
                </div>
                <p className="text-lg font-medium text-muted-foreground">{course.subtitle}</p>
                <p className="mt-4 leading-relaxed text-foreground/90">{course.heroDescription}</p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[["Mindestalter", course.details.minAge], ["Dauer", course.details.duration], ["Prüfung", course.details.exam], ["Inklusive", course.details.includes]].map(([k, v], i) => (
                    <motion.div
                      key={k}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
                      className="rounded-xl border border-border bg-card p-4"
                    >
                      <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{k}</div>
                      <div className="mt-1 text-sm font-semibold text-foreground">{v}</div>
                    </motion.div>
                  ))}
                </div>

                <h3 className="mb-3 mt-8 font-bold text-foreground">Voraussetzungen</h3>
                <ul className="space-y-2">
                  {course.prerequisites.map((p, i) => (
                    <motion.li
                      key={p}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.06, duration: 0.35 }}
                      className="flex gap-2 text-sm text-foreground/90"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{p}
                    </motion.li>
                  ))}
                </ul>

                <h3 className="mb-3 mt-6 font-bold text-foreground">Deine Vorteile</h3>
                <ul className="space-y-2">
                  {course.advantages.slice(0, 5).map((p, i) => (
                    <motion.li
                      key={p}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.06, duration: 0.35 }}
                      className="flex gap-2 text-sm text-foreground/90"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{p}
                    </motion.li>
                  ))}
                </ul>

                <div className="sticky bottom-4 mt-8">
                  <Button size="lg" variant="cta" className="h-14 w-full text-base shadow-xl" onClick={() => setStep("form")}>
                    Diesen Kurs auswählen <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </section>
            </main>
          )}

          {step === "form" && (
            <main className="mx-auto max-w-3xl px-4 pb-16 pt-6">
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
            </main>
          )}

          {step === "done" && (
            <main className="mx-auto max-w-3xl px-4 pb-16">
              <section className="pt-10 text-center">
                <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary shadow-xl">
                  <CheckCircle className="h-12 w-12 text-primary-foreground" />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.4 }}>
                  <h2 className="font-display text-2xl font-extrabold text-foreground sm:text-3xl">Vielen Dank! Deine Anfrage ist bei der Fahrschule Metropol eingegangen.</h2>
                  <p className="mt-3 text-lg text-muted-foreground">Wir melden uns schnellstmöglich bei dir.</p>
                  <div className="mx-auto mt-8 flex max-w-sm flex-col gap-3">
                    <Button size="lg" variant="cta" className="h-14" onClick={reset}>Zurück zur Kursübersicht</Button>
                    <Button size="lg" variant="outline" className="h-14" asChild><a href="tel:+495116425066"><Phone className="mr-2 h-5 w-5" /> 0511 6425066</a></Button>
                  </div>
                </motion.div>
              </section>
            </main>
          )}
        </motion.div>
      </AnimatePresence>

      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        Fahrschule Metropol · Inh. Vedat Özel · <a href="https://fahrschule-metropol.de/impressum" className="underline">Impressum</a> · <a href="https://fahrschule-metropol.de/datenschutz" className="underline">Datenschutz</a>
      </footer>
    </div>
  );
};

export default Messe;
