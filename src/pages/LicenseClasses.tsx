import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car, Bike, Truck, ArrowRight, Shield, Zap, Clock, Sparkles, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import heroKlassen from "@/assets/hero-klassen.jpg";

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
  bullets?: string[];
  watermark?: string;
}> = [
  { icon: Car, name: "Klasse B", subtitle: "PKW-Führerschein", slug: "klasse-b", desc: "Der klassische Autoführerschein für Fahrzeuge bis 3,5 t – dein Schlüssel zur täglichen Freiheit.", minAge: "ab 17", popular: true, cta: "Klasse B starten", category: "car", bullets: ["Automatik & Schaltgetriebe", "Begleitetes Fahren ab 17"], watermark: "POPULAR" },
  { icon: Car, name: "Klasse B197", subtitle: "Automatik + Schaltwagen", slug: "klasse-b197", desc: "Prüfung auf Automatik, trotzdem Schaltwagen fahren. Das Beste aus beiden Welten.", minAge: "ab 17", popular: true, cta: "B197 entdecken", category: "car", bullets: ["10 Std. Schalt-Unterweisung", "Volle Klasse B nach der Prüfung"], watermark: "SMART" },
  { icon: Bike, name: "Klasse A", subtitle: "Motorrad unbeschränkt", slug: "klasse-a", desc: "Grenzenlose Freiheit auf zwei Rädern. Alle Motorräder – ohne Limits.", minAge: "ab 24", popular: false, cta: "Klasse A anfragen", category: "bike" },
  { icon: Bike, name: "Klasse A2", subtitle: "Motorrad bis 35 kW", slug: "klasse-a2", desc: "Dein Einstieg in die Motorradwelt. Die perfekte Basis für später.", minAge: "ab 18", popular: false, cta: "A2 starten", category: "bike" },
  { icon: Bike, name: "Klasse A1", subtitle: "125ccm Leichtkrafträder", slug: "klasse-a1", desc: "Früh mobil auf zwei Rädern. 125ccm ab 16 Jahren.", minAge: "ab 16", popular: false, cta: "A1 anfragen", category: "bike" },
  { icon: Bike, name: "Klasse AM", subtitle: "Moped & Roller", slug: "klasse-am", desc: "Roller bis 45 km/h – ideal für den Alltag.", minAge: "ab 15", popular: false, cta: "AM starten", category: "bike" },
  { icon: Car, name: "Klasse BE", subtitle: "PKW + Anhänger", slug: "klasse-be", desc: "Schwere Anhänger für Wohnwagen, Boote & mehr.", minAge: "ab 17", popular: false, cta: "BE anfragen", category: "car" },
  { icon: Truck, name: "Klasse C", subtitle: "LKW über 3,5 t", slug: "klasse-c", desc: "Der Einstieg in den Güterverkehr. Schwere Fahrzeuge ohne Limits.", minAge: "ab 21", popular: false, cta: "C anfragen", category: "truck" },
  { icon: Truck, name: "Klasse CE", subtitle: "LKW + Sattelzug", slug: "klasse-ce", desc: "Die Königsklasse. Sattelzüge und Gliederzüge ohne Beschränkung.", minAge: "ab 21", popular: false, cta: "CE anfragen", category: "truck" },
  { icon: Truck, name: "Klasse C1", subtitle: "Leichte LKW bis 7,5 t", slug: "klasse-c1", desc: "Perfekt für Lieferfahrzeuge und leichte LKW im Alltag.", minAge: "ab 18", popular: false, cta: "C1 anfragen", category: "truck" },
  { icon: Truck, name: "Klasse D", subtitle: "Bus – alle Größen", slug: "klasse-d", desc: "Dein Weg zum Busfahrer. Stadt- und Reisebusse ohne Limits.", minAge: "ab 24", popular: false, cta: "D anfragen", category: "bus" },
  { icon: Truck, name: "Klasse DE", subtitle: "Bus mit Anhänger", slug: "klasse-de", desc: "Bus mit schwerem Anhänger – für spezielle Einsätze.", minAge: "ab 24", popular: false, cta: "DE anfragen", category: "bus" },
  { icon: Car, name: "Klasse B196", subtitle: "125er mit Klasse B", slug: "klasse-b196", desc: "Erweitere dein B. 125ccm fahren – ohne extra Prüfung.", minAge: "ab 25", popular: false, cta: "B196 anfragen", category: "bike" },
  { icon: Truck, name: "Klasse L", subtitle: "Land- & Forstwirtschaft", slug: "klasse-l", desc: "Zugmaschinen bis 40 km/h – nur Theorie.", minAge: "ab 16", popular: false, cta: "L anfragen", category: "truck" },
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

      {/* Hero – with image, elegant, light */}
      <section className="relative overflow-hidden bg-background">
        <div className="absolute inset-0">
          <img src={heroKlassen} alt="Metropol Fahrzeugflotte" className="h-full w-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
        </div>
        <div className="pointer-events-none absolute -top-24 -right-24 h-[520px] w-[520px] rounded-full bg-primary/20 blur-[160px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-[300px] w-[500px] rounded-full bg-primary/10 blur-[140px]" />

        <div className="container relative z-10 mx-auto px-4 pb-24 pt-32 md:pb-32 md:pt-44">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <span className="mb-5 inline-block text-xs font-bold uppercase tracking-[0.28em] text-primary">
              Fahrschule Metropol · 14 Klassen
            </span>
            <h1 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-foreground md:text-7xl lg:text-[5.5rem]">
              Deine Freiheit auf{" "}
              <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                Rädern.
              </span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Entdecke unsere vielfältigen Führerscheinklassen. Von PKW über Motorrad bis LKW – wir bringen dich sicher und professionell an dein Ziel.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button variant="hero" size="lg" asChild>
                <Link to="/kontakt">
                  Jetzt anmelden <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#klassen">Klassen ansehen</a>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              {[
                { icon: Shield, label: "98% Bestehensquote" },
                { icon: Zap, label: "Flexible Termine" },
                { icon: Clock, label: "Schnelle Ausbildung" },
              ].map((item) => (
                <span key={item.label} className="flex items-center gap-2.5 text-sm font-semibold text-foreground/80">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
                    <item.icon className="h-4 w-4" />
                  </span>
                  {item.label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Popular classes – dark elegant cards on light bg */}
      <section id="klassen" className="relative bg-background py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
                Beliebteste Klassen
              </h2>
              <div className="mt-3 h-1 w-20 rounded-full bg-primary" />
            </div>
            <span className="hidden font-display text-sm font-bold tabular-nums text-muted-foreground/50 md:inline">
              {String(popular.length).padStart(2, "0")} / {String(classes.length).padStart(2, "0")}
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {popular.map((c, i) => (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link to={`/fuehrerschein/${c.slug}`} className="group block h-full">
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 p-8 text-background transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_30px_80px_-30px_hsl(var(--primary)/0.5)] md:p-10">
                    <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-primary/10 blur-[100px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="relative flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
                          <c.icon className="h-6 w-6" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                          {c.minAge} · {filters.find((f) => f.key === c.category)?.label}
                        </span>
                        <h3 className="mt-1 font-display text-4xl font-extrabold leading-none tracking-tight md:text-5xl">
                          {c.name}
                        </h3>
                        <p className="mt-2 text-sm font-semibold text-primary">{c.subtitle}</p>
                        <p className="mt-4 max-w-md text-sm leading-relaxed text-background/60">{c.desc}</p>
                      </div>
                      <span className="pointer-events-none hidden font-display text-5xl font-black uppercase tracking-tight text-white/[0.04] transition-colors duration-500 group-hover:text-primary/10 md:block">
                        {c.watermark}
                      </span>
                    </div>

                    {c.bullets && (
                      <ul className="mt-8 space-y-3">
                        {c.bullets.map((b) => (
                          <li key={b} className="flex items-center text-sm text-background/70">
                            <span className="mr-3 h-1.5 w-1.5 rounded-full bg-primary" /> {b}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="relative mt-8 flex items-center justify-between border-t border-neutral-800 pt-6">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-background/50">
                        Meistgebucht
                      </span>
                      <span className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-all group-hover:gap-3">
                        {c.cta}
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:translate-x-0.5">
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </span>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All classes – compact chip grid */}
      <section className="relative bg-accent/30 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="flex items-center font-display text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
              Alle Klassen im Überblick
              <span className="ml-4 hidden h-px flex-1 bg-border md:block" />
            </h2>
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

          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
            >
              {rest.map((c, i) => (
                <motion.div
                  key={c.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link to={`/fuehrerschein/${c.slug}`} className="group block h-full">
                    <article className="group relative flex h-full flex-col justify-between rounded-2xl border border-border/60 bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_20px_40px_-20px_hsl(var(--primary)/0.35)]">
                      <div>
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
                          <c.icon className="h-5 w-5" />
                        </div>
                        <div className="font-display text-2xl font-extrabold tracking-tight text-primary">
                          {c.name.replace("Klasse ", "")}
                        </div>
                        <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                          {c.subtitle}
                        </div>
                        <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground/90 line-clamp-2">
                          {c.desc}
                        </p>
                      </div>
                      <div className="mt-5 flex items-center justify-between border-t border-border/50 pt-4 text-[11px]">
                        <span className="font-bold uppercase tracking-[0.14em] text-muted-foreground">
                          {c.minAge}
                        </span>
                        <span className="inline-flex items-center gap-1 font-bold text-primary transition-all group-hover:gap-2">
                          Details <ArrowRight className="h-3.5 w-3.5" />
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

      {/* CTA – dark elegant finish */}
      <section className="relative bg-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-[2.5rem] border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-950 p-10 text-center text-background md:p-16"
          >
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary/20 blur-[120px]" />
            <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-primary/10 blur-[100px]" />

            <div className="relative">
              <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-primary">Nächster Schritt</span>
              <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
                Bereit für die <span className="text-primary">Überholspur?</span>
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-background/60 md:text-lg">
                Melde dich jetzt online an und starte deine Ausbildung bei der Fahrschule Metropol. Wir freuen uns auf dich.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/kontakt">
                    Kostenlos beraten lassen <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="hero-outline" size="lg" asChild>
                  <a href="tel:+4942112345">
                    <Phone className="h-5 w-5" /> Jetzt anrufen
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LicenseClasses;
