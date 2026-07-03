import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car, Bike, Truck, ArrowRight, Shield, Zap, Clock, Sparkles, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import heroKlassen from "@/assets/hero-klassen.jpg";
import classPkw from "@/assets/class-pkw.jpg";
import classMotorrad from "@/assets/class-motorrad.jpg";
import classLkw from "@/assets/class-lkw.jpg";
import classBus from "@/assets/class-bus.jpg";

const categoryImages: Record<string, string> = { car: classPkw, bike: classMotorrad, truck: classLkw, bus: classBus };

type CatKey = "car" | "bike" | "truck" | "bus";

const classes: Array<{
  icon: React.ElementType;
  name: string;
  subtitle: string;
  slug: string;
  desc: string;
  minAge: string;
  popular: boolean;
  cta: string;
  category: CatKey;
}> = [
  { icon: Car, name: "Klasse B", subtitle: "PKW-Führerschein", slug: "klasse-b", desc: "Dein Schlüssel zur Freiheit. Der beliebteste Führerschein Deutschlands – für Fahrzeuge bis 3,5 t.", minAge: "ab 17", popular: true, cta: "Klasse B starten", category: "car" },
  { icon: Car, name: "Klasse B197", subtitle: "Automatik + Schaltwagen", slug: "klasse-b197", desc: "Das Beste aus beiden Welten. Prüfung auf Automatik, trotzdem Schaltwagen fahren.", minAge: "ab 17", popular: true, cta: "B197 entdecken", category: "car" },
  { icon: Bike, name: "Klasse A", subtitle: "Motorrad unbeschränkt", slug: "klasse-a", desc: "Grenzenlose Freiheit auf zwei Rädern. Alle Motorräder – ohne Limits.", minAge: "ab 24", popular: false, cta: "Klasse A anfragen", category: "bike" },
  { icon: Bike, name: "Klasse A2", subtitle: "Motorrad bis 35 kW", slug: "klasse-a2", desc: "Dein Einstieg in die Motorradwelt. Die perfekte Basis für später.", minAge: "ab 18", popular: false, cta: "A2 starten", category: "bike" },
  { icon: Bike, name: "Klasse A1", subtitle: "125ccm Leichtkrafträder", slug: "klasse-a1", desc: "Früh mobil auf zwei Rädern. 125ccm ab 16 Jahren – der erste Schritt.", minAge: "ab 16", popular: false, cta: "A1 anfragen", category: "bike" },
  { icon: Bike, name: "Klasse AM", subtitle: "Moped & Roller", slug: "klasse-am", desc: "Deine erste Freiheit. Roller bis 45 km/h – ideal für den Alltag.", minAge: "ab 15", popular: false, cta: "AM starten", category: "bike" },
  { icon: Car, name: "Klasse BE", subtitle: "PKW + Anhänger", slug: "klasse-be", desc: "Mehr mitnehmen. Schwere Anhänger für Wohnwagen, Boote & mehr.", minAge: "ab 17", popular: false, cta: "BE anfragen", category: "car" },
  { icon: Truck, name: "Klasse C", subtitle: "LKW über 3,5 t", slug: "klasse-c", desc: "Der Einstieg in den Güterverkehr. Schwere Fahrzeuge ohne Limits.", minAge: "ab 21", popular: false, cta: "C anfragen", category: "truck" },
  { icon: Truck, name: "Klasse CE", subtitle: "LKW + Anhänger / Sattelzug", slug: "klasse-ce", desc: "Die Königsklasse. Sattelzüge und Gliederzüge ohne Beschränkung.", minAge: "ab 21", popular: false, cta: "CE anfragen", category: "truck" },
  { icon: Truck, name: "Klasse C1", subtitle: "Leichte LKW bis 7,5 t", slug: "klasse-c1", desc: "Perfekt für Lieferfahrzeuge und leichte LKW im Alltag.", minAge: "ab 18", popular: false, cta: "C1 anfragen", category: "truck" },
  { icon: Truck, name: "Klasse D", subtitle: "Bus – alle Größen", slug: "klasse-d", desc: "Dein Weg zum Busfahrer. Stadt- und Reisebusse ohne Limits.", minAge: "ab 24", popular: false, cta: "D anfragen", category: "bus" },
  { icon: Truck, name: "Klasse DE", subtitle: "Bus mit Anhänger", slug: "klasse-de", desc: "Bus mit schwerem Anhänger – für spezielle Einsätze.", minAge: "ab 24", popular: false, cta: "DE anfragen", category: "bus" },
  { icon: Car, name: "Klasse B196", subtitle: "125er mit Klasse B", slug: "klasse-b196", desc: "Erweitere dein B. 125ccm fahren – ganz ohne extra Prüfung.", minAge: "ab 25", popular: false, cta: "B196 anfragen", category: "bike" },
  { icon: Truck, name: "Klasse L", subtitle: "Land- & Forstwirtschaft", slug: "klasse-l", desc: "Für's Land gemacht. Zugmaschinen bis 40 km/h – nur Theorie.", minAge: "ab 16", popular: false, cta: "L anfragen", category: "truck" },
];

const filters: Array<{ key: "all" | CatKey; label: string }> = [
  { key: "all", label: "Alle" },
  { key: "car", label: "PKW" },
  { key: "bike", label: "Motorrad" },
  { key: "truck", label: "LKW" },
  { key: "bus", label: "Bus" },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Startseite", item: "https://fahrschule-metropol.de/" },
    { "@type": "ListItem", position: 2, name: "Führerscheinklassen", item: "https://fahrschule-metropol.de/fuehrerscheinklassen" },
  ],
};

const LicenseClasses = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<(typeof filters)[number]["key"]>("all");

  const popular = classes.filter((c) => c.popular);
  const rest = useMemo(
    () => classes.filter((c) => !c.popular).filter((c) => (filter === "all" ? true : c.category === filter)),
    [filter],
  );

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={t("licenseClasses.seoTitle")}
        description={t("licenseClasses.seoDesc")}
        canonical="https://fahrschule-metropol.de/fuehrerscheinklassen"
        jsonLd={[breadcrumbSchema]}
        keywords="Führerscheinklassen, Klasse B, Klasse A, Klasse C, Klasse D, Motorradführerschein, LKW Führerschein, Bus Führerschein, PKW Führerschein, Anhänger Führerschein, B197, B196, Klasse AM, Klasse A1, Klasse A2, Führerscheinklassen Übersicht, Fahrschule Metropol"
      />

      {/* Elegant Hero – light, airy, editorial */}
      <section className="relative overflow-hidden bg-background pt-28 md:pt-40 pb-16 md:pb-24">
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-primary/10 blur-[140px]" />
          <div className="absolute top-1/3 -left-40 h-[420px] w-[420px] rounded-full bg-primary/5 blur-[120px]" />
          <svg className="absolute inset-0 h-full w-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container relative z-10 mx-auto grid gap-12 px-4 md:grid-cols-12 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7 md:pt-6"
          >
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-border/60 bg-card/60 px-4 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                14 Klassen · 3 Standorte
              </span>
            </div>

            <h1 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-foreground md:text-7xl lg:text-[5.5rem]">
              Wähle deinen
              <br />
              <span className="relative inline-block">
                Weg zur
                <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 300 12" fill="none" preserveAspectRatio="none">
                  <path d="M2 8 Q 75 2, 150 6 T 298 4" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" fill="none" />
                </svg>
              </span>{" "}
              <span className="text-primary">Freiheit.</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Auto, Motorrad, LKW, Bus oder Anhänger – jede Reise beginnt mit dem ersten Schritt. Finde die Klasse, die zu deinem Leben passt.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              {[
                { icon: Shield, label: "98% Bestehensquote" },
                { icon: Zap, label: "Flexible Termine" },
                { icon: Clock, label: "Schnelle Ausbildung" },
              ].map((item) => (
                <span key={item.label} className="flex items-center gap-2.5 text-sm font-medium text-foreground/80">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <item.icon className="h-4 w-4" />
                  </span>
                  {item.label}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative md:col-span-5"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-30px_hsl(var(--primary)/0.35)]">
              <img src={heroKlassen} alt="Metropol Fahrzeugflotte" className="h-full w-full object-cover" loading="eager" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">Von Roller bis Sattelzug</span>
                <p className="mt-2 font-display text-xl font-extrabold leading-tight text-white">
                  Wir bilden alle 14 Klassen aus.
                </p>
                <Link
                  to="/kontakt"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-primary transition-transform hover:translate-x-0.5"
                >
                  Beratung anfragen <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
            </div>

            {/* Corner accent */}
            <div className="absolute -top-3 -right-3 h-16 w-16 rounded-2xl border-2 border-primary/40 bg-background/60 backdrop-blur" />
          </motion.div>
        </div>
      </section>

      {/* Popular – elegant editorial highlight */}
      <section className="relative border-t border-border/40 bg-gradient-to-b from-background to-accent/30 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary">
                  Meistgebucht
                </span>
              </div>
              <h2 className="font-display text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                Beliebteste Klassen
              </h2>
              <p className="mt-3 max-w-md text-muted-foreground">
                Diese Führerscheine wählen die meisten Metropol-Fahrschüler.
              </p>
            </div>
            <span className="hidden font-display text-sm font-bold tabular-nums text-muted-foreground/50 md:inline">
              {String(popular.length).padStart(2, "0")} / {String(classes.length).padStart(2, "0")}
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {popular.map((c, i) => (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link to={`/fuehrerschein/${c.slug}`} className="group block h-full">
                  <article className="relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-card shadow-[0_20px_60px_-30px_hsl(var(--foreground)/0.25)] ring-1 ring-border/60 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_80px_-30px_hsl(var(--primary)/0.4)] hover:ring-primary/40">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={categoryImages[c.category]}
                        alt={c.name}
                        className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                      <div className="absolute inset-x-5 top-5 flex items-start justify-between">
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-lg shadow-primary/30">
                          <Sparkles className="h-3 w-3" /> Beliebt
                        </div>
                        <span className="rounded-full bg-white/10 px-3 py-1.5 font-display text-[10px] font-bold tabular-nums tracking-widest text-white backdrop-blur-md">
                          0{i + 1} / 02
                        </span>
                      </div>
                      <div className="absolute bottom-5 left-5">
                        <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                          {c.minAge}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-8">
                      <h3 className="font-display text-4xl font-extrabold leading-none tracking-tight text-foreground">
                        {c.name}
                      </h3>
                      <p className="mt-2 text-sm font-semibold text-primary">{c.subtitle}</p>
                      <p className="mt-4 flex-1 text-[15px] leading-relaxed text-muted-foreground">{c.desc}</p>
                      <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-5">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                          {filters.find((f) => f.key === c.category)?.label}
                        </span>
                        <span className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-all group-hover:gap-3">
                          {c.cta}
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:translate-x-0.5">
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All classes with sticky filter */}
      <section className="relative bg-background pb-24 pt-4 md:pb-32">
        <div className="sticky top-16 z-30 border-b border-border/40 bg-background/85 py-5 backdrop-blur-lg">
          <div className="container mx-auto flex flex-col gap-4 px-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary">
                Alle Klassen
              </span>
              <h2 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
                Vollständige Übersicht
                <span className="ml-3 font-display text-lg font-bold tabular-nums text-muted-foreground/40">
                  {String(rest.length).padStart(2, "0")}
                </span>
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {filters.map((f) => {
                const active = filter === f.key;
                return (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    className={`rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] transition-all ${
                      active
                        ? "bg-foreground text-background shadow-md"
                        : "border border-border/70 bg-card text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 pt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {rest.map((c, i) => (
                <motion.div
                  key={c.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link to={`/fuehrerschein/${c.slug}`} className="group block h-full">
                    <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_50px_-20px_hsl(var(--primary)/0.25)]">
                      {/* Decorative gradient orb */}
                      <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-primary/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                      <div className="relative flex items-start justify-between">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent/50 text-foreground ring-1 ring-border/60 transition-all duration-500 group-hover:from-primary group-hover:to-primary/80 group-hover:text-primary-foreground group-hover:ring-primary/30">
                          <c.icon className="h-6 w-6" />
                        </div>
                        <span className="font-display text-[11px] font-bold tabular-nums tracking-[0.14em] text-muted-foreground/50">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="relative mt-6 flex-1">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                          {c.minAge}
                        </span>
                        <h3 className="mt-1 font-display text-2xl font-extrabold leading-tight tracking-tight text-foreground">
                          {c.name}
                        </h3>
                        <p className="mt-1.5 text-sm font-semibold text-primary">{c.subtitle}</p>
                        <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">{c.desc}</p>
                      </div>

                      <div className="relative mt-6 flex items-center justify-between border-t border-border/50 pt-4">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                          {filters.find((f) => f.key === c.category)?.label}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary transition-all group-hover:gap-2.5">
                          Mehr erfahren <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA – elegant dark finish */}
      <section className="relative overflow-hidden bg-foreground py-24 text-background md:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[160px]" />
          <svg className="absolute inset-0 h-full w-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cta-grid" width="56" height="56" patternUnits="userSpaceOnUse">
                <path d="M 56 0 L 0 0 0 56" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-grid)" />
          </svg>
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-background/15 bg-background/5 px-4 py-1.5 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-background/70">Nächster Schritt</span>
            </div>
            <h2 className="font-display text-4xl font-extrabold leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
              Bereit für deine <span className="text-primary">Freiheit?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-background/70 md:text-lg">
              Persönliche Beratung, transparente Preise, faire Konditionen. Wir begleiten dich vom ersten Gespräch bis zum Führerschein.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button variant="hero" size="lg" asChild>
                <Link to="/kontakt">
                  Kostenlose Beratung <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <a href="tel:+4942112345">
                  <Phone className="h-5 w-5" /> Jetzt anrufen
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LicenseClasses;
