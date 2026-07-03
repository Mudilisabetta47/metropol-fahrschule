import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car, Bike, Truck, ArrowUpRight, ShieldCheck, Clock, Users, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import heroKlassen from "@/assets/hero-klassen.jpg";

type CatKey = "car" | "bike" | "truck" | "bus";

const classes: Array<{
  icon: React.ElementType;
  name: string;
  code: string;
  subtitle: string;
  slug: string;
  desc: string;
  minAge: string;
  popular: boolean;
  category: CatKey;
  duration: string;
}> = [
  { icon: Car, name: "Klasse B", code: "B", subtitle: "PKW-Führerschein", slug: "klasse-b", desc: "Der klassische Autoführerschein für Fahrzeuge bis 3,5 t – dein Schlüssel zur täglichen Freiheit.", minAge: "17 Jahre", popular: true, category: "car", duration: "3–6 Monate" },
  { icon: Car, name: "Klasse B197", code: "B197", subtitle: "Automatik + Schaltwagen", slug: "klasse-b197", desc: "Prüfung auf Automatik, trotzdem Schaltwagen fahren – das Beste aus beiden Welten.", minAge: "17 Jahre", popular: true, category: "car", duration: "3–6 Monate" },
  { icon: Bike, name: "Klasse A", code: "A", subtitle: "Motorrad unbeschränkt", slug: "klasse-a", desc: "Grenzenlose Freiheit auf zwei Rädern. Alle Motorräder – ohne Limits.", minAge: "24 Jahre", popular: false, category: "bike", duration: "2–4 Monate" },
  { icon: Bike, name: "Klasse A2", code: "A2", subtitle: "Motorrad bis 35 kW", slug: "klasse-a2", desc: "Dein Einstieg in die Motorradwelt. Die perfekte Basis für später.", minAge: "18 Jahre", popular: false, category: "bike", duration: "2–4 Monate" },
  { icon: Bike, name: "Klasse A1", code: "A1", subtitle: "125ccm Leichtkrafträder", slug: "klasse-a1", desc: "Früh mobil auf zwei Rädern. 125 ccm bereits ab 16 Jahren.", minAge: "16 Jahre", popular: false, category: "bike", duration: "2–3 Monate" },
  { icon: Bike, name: "Klasse AM", code: "AM", subtitle: "Moped & Roller", slug: "klasse-am", desc: "Roller bis 45 km/h – ideal für den Alltag und den ersten Weg zur Mobilität.", minAge: "15 Jahre", popular: false, category: "bike", duration: "1–2 Monate" },
  { icon: Car, name: "Klasse BE", code: "BE", subtitle: "PKW + Anhänger", slug: "klasse-be", desc: "Schwere Anhänger für Wohnwagen, Boote und mehr – erweitert deine Klasse B.", minAge: "17 Jahre", popular: false, category: "car", duration: "kurz" },
  { icon: Truck, name: "Klasse C", code: "C", subtitle: "LKW über 3,5 t", slug: "klasse-c", desc: "Der Einstieg in den Güterverkehr. Schwere Fahrzeuge ohne Limits.", minAge: "21 Jahre", popular: false, category: "truck", duration: "2–4 Monate" },
  { icon: Truck, name: "Klasse CE", code: "CE", subtitle: "LKW + Sattelzug", slug: "klasse-ce", desc: "Die Königsklasse – Sattelzüge und Gliederzüge ohne Beschränkung.", minAge: "21 Jahre", popular: false, category: "truck", duration: "2–4 Monate" },
  { icon: Truck, name: "Klasse C1", code: "C1", subtitle: "Leichte LKW bis 7,5 t", slug: "klasse-c1", desc: "Perfekt für Lieferfahrzeuge und leichte LKW im Alltag.", minAge: "18 Jahre", popular: false, category: "truck", duration: "2–3 Monate" },
  { icon: Truck, name: "Klasse D", code: "D", subtitle: "Bus – alle Größen", slug: "klasse-d", desc: "Dein Weg zum Busfahrer – Stadt- und Reisebusse ohne Limits.", minAge: "24 Jahre", popular: false, category: "bus", duration: "2–4 Monate" },
  { icon: Truck, name: "Klasse DE", code: "DE", subtitle: "Bus mit Anhänger", slug: "klasse-de", desc: "Bus mit schwerem Anhänger – für spezielle Einsätze.", minAge: "24 Jahre", popular: false, category: "bus", duration: "2–4 Monate" },
  { icon: Car, name: "Klasse B196", code: "B196", subtitle: "125er mit Klasse B", slug: "klasse-b196", desc: "Erweitere dein B. 125 ccm fahren – ganz ohne extra Prüfung.", minAge: "25 Jahre", popular: false, category: "bike", duration: "kurz" },
  { icon: Truck, name: "Klasse L", code: "L", subtitle: "Land- & Forstwirtschaft", slug: "klasse-l", desc: "Zugmaschinen bis 40 km/h – nur Theorie.", minAge: "16 Jahre", popular: false, category: "truck", duration: "1 Monat" },
];

const filters: Array<{ key: "all" | CatKey; label: string }> = [
  { key: "all", label: "Alle Klassen" },
  { key: "car", label: "PKW" },
  { key: "bike", label: "Motorrad" },
  { key: "truck", label: "LKW" },
  { key: "bus", label: "Bus" },
];

const stats = [
  { value: "14", label: "Führerschein­klassen" },
  { value: "98%", label: "Bestehens­quote" },
  { value: "3", label: "Standorte" },
  { value: "40+", label: "Jahre Erfahrung" },
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
  const allFiltered = useMemo(
    () => classes.filter((c) => (filter === "all" ? true : c.category === filter)),
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

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] overflow-hidden">
        {/* Full-bleed background image */}
        <div className="absolute inset-0">
          <img
            src={heroKlassen}
            alt="Fahrschule Metropol Flotte"
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="container relative mx-auto flex min-h-[85vh] flex-col justify-end px-4 pb-16 pt-28 md:pb-24 md:pt-36">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <div className="mb-8 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              <span className="h-px w-10 bg-foreground/40" />
              <span>Führerscheinklassen · Übersicht</span>
            </div>

            <h1 className="font-display text-5xl font-extrabold leading-[0.98] tracking-tight text-foreground md:text-7xl lg:text-[5.25rem]">
              Deine Klasse.<br />
              <span className="text-primary">Dein Weg.</span>
            </h1>

            <p className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              Von Roller bis Sattelzug – die Fahrschule Metropol bildet in allen 14 Führerscheinklassen aus.
              Persönlich, transparent, mit über 40 Jahren Erfahrung.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button variant="hero" size="lg" asChild>
                <Link to="/kontakt">Beratung anfragen</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#klassen">Alle Klassen ansehen</a>
ull
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-border/70 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-y-8 py-10 md:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col px-2">
                <span className="font-display text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                  {s.value}
                </span>
                <span className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── POPULAR CLASSES ──────────────────────────────────── */}
      <section className="relative bg-background py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-16 grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <div className="mb-4 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
                <span className="h-px w-10 bg-primary" />
                <span>Ausgewählt</span>
              </div>
              <h2 className="font-display text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                Am häufigsten gewählt
              </h2>
            </div>
            <p className="text-base leading-relaxed text-muted-foreground md:col-span-5">
              Diese zwei Klassen entscheiden sich die meisten Metropol-Fahrschülerinnen und -Fahrschüler.
              Ausbildung, Prüfungsvorbereitung und Fahrzeuge auf höchstem Standard.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-sm bg-border md:grid-cols-2">
            {popular.map((c, i) => (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link to={`/fuehrerschein/${c.slug}`} className="group block h-full bg-card">
                  <article className="relative flex h-full flex-col p-10 transition-colors duration-500 hover:bg-accent/50 md:p-14">
                    <div className="flex items-start justify-between">
                      <span className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                        0{i + 1} / 02
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Meistgebucht
                      </span>
                    </div>

                    <div className="mt-16 flex items-end justify-between border-b border-border/70 pb-6">
                      <div>
                        <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                          {c.subtitle}
                        </span>
                        <h3 className="mt-2 font-display text-6xl font-extrabold leading-none tracking-tight text-foreground md:text-7xl">
                          {c.name}
                        </h3>
                      </div>
                      <c.icon className="h-10 w-10 text-muted-foreground/50 transition-colors group-hover:text-primary" strokeWidth={1.4} />
                    </div>

                    <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                      {c.desc}
                    </p>

                    <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
                      <div>
                        <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Mindestalter</dt>
                        <dd className="mt-1 font-display text-lg font-bold text-foreground">{c.minAge}</dd>
                      </div>
                      <div>
                        <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Ausbildungsdauer</dt>
                        <dd className="mt-1 font-display text-lg font-bold text-foreground">{c.duration}</dd>
                      </div>
                    </dl>

                    <div className="mt-auto flex items-center justify-between pt-10">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                        {filters.find((f) => f.key === c.category)?.label}
                      </span>
                      <span className="inline-flex items-center gap-2 font-display text-sm font-bold text-foreground transition-all group-hover:gap-3 group-hover:text-primary">
                        Details ansehen
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Trust row */}
          <div className="mt-16 grid gap-8 border-t border-border/70 pt-10 md:grid-cols-3">
            {[
              { icon: ShieldCheck, title: "Zertifizierte Ausbildung", desc: "Nach aktuellen Richtlinien mit modernster Technik." },
              { icon: Users, title: "Persönliche Betreuung", desc: "Feste Ansprechpartner vom ersten Tag bis zur Prüfung." },
              { icon: Clock, title: "Flexible Termine", desc: "Theorie und Praxis passend zu deinem Alltag." },
            ].map((f) => (
              <div key={f.title} className="flex items-start gap-4">
                <span className="mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-sm bg-primary/10 text-primary">
                  <f.icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-foreground">{f.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALL CLASSES ──────────────────────────────────────── */}
      <section id="klassen" className="relative border-t border-border/70 bg-accent/30 py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-12 grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <div className="mb-4 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                <span className="h-px w-10 bg-foreground/40" />
                <span>Vollständige Übersicht</span>
              </div>
              <h2 className="font-display text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                Alle 14 Klassen im Überblick
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2 md:col-span-5 md:justify-end">
              {filters.map((f) => {
                const active = filter === f.key;
                return (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    className={`rounded-sm px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition-all ${
                      active
                        ? "bg-foreground text-background"
                        : "border border-border bg-card text-muted-foreground hover:border-foreground/40 hover:text-foreground"
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
              transition={{ duration: 0.3 }}
              className="grid gap-px overflow-hidden rounded-sm bg-border sm:grid-cols-2 lg:grid-cols-3"
            >
              {allFiltered.map((c, i) => (
                <motion.div
                  key={c.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link to={`/fuehrerschein/${c.slug}`} className="group flex h-full flex-col bg-card p-8 transition-colors duration-500 hover:bg-accent/60">
                    <div className="flex items-start justify-between">
                      <span className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <c.icon className="h-6 w-6 text-muted-foreground/50 transition-colors group-hover:text-primary" strokeWidth={1.4} />
                    </div>

                    <div className="mt-14 flex-1">
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                        {c.subtitle}
                      </span>
                      <h3 className="mt-2 font-display text-4xl font-extrabold leading-none tracking-tight text-foreground">
                        {c.code}
                      </h3>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-border/70 pt-5 text-[11px] font-semibold uppercase tracking-[0.18em]">
                      <span className="text-muted-foreground">ab {c.minAge.replace(" Jahre", "")}</span>
                      <span className="inline-flex items-center gap-1.5 text-foreground transition-all group-hover:gap-2 group-hover:text-primary">
                        Details
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-foreground py-24 text-background md:py-32">
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/15 blur-[160px]" />
        <div className="pointer-events-none absolute -top-40 right-0 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[140px]" />

        <div className="container relative z-10 mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-12 md:items-end">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-7"
            >
              <div className="mb-5 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
                <span className="h-px w-10 bg-primary" />
                <span>Nächster Schritt</span>
              </div>
              <h2 className="font-display text-4xl font-extrabold leading-[0.98] tracking-tight md:text-6xl">
                Bereit für die<br /><span className="text-primary">erste Fahrstunde?</span>
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-background/70 md:text-lg">
                Persönliche Beratung, transparente Preise, faire Konditionen. Wir begleiten dich vom ersten Gespräch bis zum Führerschein.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex flex-wrap gap-3 md:col-span-5 md:justify-end"
            >
              <Button variant="hero" size="lg" asChild>
                <Link to="/kontakt">Beratung anfragen</Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <a href="tel:+4942112345">
                  <Phone className="h-4 w-4" /> Jetzt anrufen
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LicenseClasses;
