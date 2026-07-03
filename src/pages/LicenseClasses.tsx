import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car, Bike, Truck, ArrowRight, Shield, Zap, Clock, Sparkles } from "lucide-react";
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
    <div className="min-h-screen">
      <SEO
        title={t("licenseClasses.seoTitle")}
        description={t("licenseClasses.seoDesc")}
        canonical="https://fahrschule-metropol.de/fuehrerscheinklassen"
        jsonLd={[breadcrumbSchema]}
        keywords="Führerscheinklassen, Klasse B, Klasse A, Klasse C, Klasse D, Motorradführerschein, LKW Führerschein, Bus Führerschein, PKW Führerschein, Anhänger Führerschein, B197, B196, Klasse AM, Klasse A1, Klasse A2, Führerscheinklassen Übersicht, Fahrschule Metropol"
      />

      {/* Editorial Hero */}
      <section className="relative overflow-hidden bg-foreground text-background">
        <img src={heroKlassen} alt="Metropol Fahrzeugflotte" className="absolute inset-0 h-full w-full object-cover opacity-25" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/80 via-foreground/90 to-foreground" />
        <div className="absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[160px]" />

        <div className="container relative z-10 mx-auto grid gap-10 px-4 pb-20 pt-32 md:grid-cols-12 md:pb-28 md:pt-44">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-8"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="font-display text-xs font-bold tabular-nums text-primary">02</span>
              <span className="h-px w-10 bg-background/30" />
              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-background/60">
                {t("licenseClasses.badge")}
              </span>
            </div>
            <h1 className="font-display text-5xl font-extrabold leading-[0.95] md:text-7xl">
              {t("licenseClasses.title1")} <br />
              <span className="text-primary">{t("licenseClasses.title2")}</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-background/70 md:text-lg">
              {t("licenseClasses.heroDesc")}
            </p>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              {[
                { icon: Shield, text: t("licenseClasses.passRate") },
                { icon: Zap, text: t("licenseClasses.flexible") },
                { icon: Clock, text: t("licenseClasses.fast") },
              ].map((item) => (
                <span key={item.text} className="flex items-center gap-2 text-background/60">
                  <item.icon className="h-4 w-4 text-primary" />
                  {item.text}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex items-end md:col-span-4 md:justify-end"
          >
            <div className="w-full max-w-xs rounded-2xl border border-background/15 bg-background/5 p-5 backdrop-blur">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">14 Klassen</span>
              <p className="mt-2 font-display text-2xl font-extrabold leading-tight">
                Von Roller bis Sattelzug – wir bilden alle Klassen aus.
              </p>
              <Link
                to="/kontakt"
                className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary transition-transform hover:translate-x-0.5"
              >
                Beratung anfragen <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Popular / Featured */}
      <section className="border-b border-border/60 bg-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary">
                {t("licenseClasses.mostBooked")}
              </span>
              <h2 className="mt-2 font-display text-3xl font-extrabold text-foreground md:text-4xl">
                Beliebteste Klassen
              </h2>
            </div>
            <span className="hidden font-display text-sm font-bold tabular-nums text-muted-foreground/50 md:inline">
              {String(popular.length).padStart(2, "0")} / {String(classes.length).padStart(2, "0")}
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {popular.map((c, i) => (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <Link to={`/fuehrerschein/${c.slug}`} className="group block h-full">
                  <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-primary/40 bg-foreground text-background shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.4)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_-20px_hsl(var(--primary)/0.6)]">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={categoryImages[c.category]}
                        alt={c.name}
                        className="h-full w-full object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/40 to-transparent" />
                      <div className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground">
                        <Sparkles className="h-3 w-3" /> Beliebt
                      </div>
                      <span className="absolute right-5 top-5 font-display text-xs font-bold tabular-nums text-background/60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-7">
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                        {c.minAge}
                      </span>
                      <h3 className="mt-1 font-display text-3xl font-extrabold leading-tight">{c.name}</h3>
                      <p className="mt-1 text-sm font-semibold text-primary">{c.subtitle}</p>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-background/70">{c.desc}</p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary transition-all group-hover:gap-3">
                        {c.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All classes with sticky filter */}
      <section className="bg-background pb-20 pt-4 md:pb-28">
        <div className="sticky top-16 z-30 -mx-4 mb-10 border-b border-border/60 bg-background/85 px-4 py-4 backdrop-blur-lg md:mx-0 md:rounded-none">
          <div className="container mx-auto flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-muted-foreground">
                {t("licenseClasses.allClassesLabel")}
              </span>
              <h2 className="font-display text-2xl font-extrabold text-foreground md:text-3xl">
                Alle Klassen
                <span className="ml-2 font-display text-base font-bold tabular-nums text-muted-foreground/50">
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
                    className={`rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] transition-all ${
                      active
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "border border-border bg-card text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {rest.map((c, i) => (
                <motion.div
                  key={c.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                >
                  <Link to={`/fuehrerschein/${c.slug}`} className="group block h-full">
                    <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card-hover">
                      <div className="flex items-start justify-between p-6 pb-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                            <c.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                              {c.minAge}
                            </span>
                            <h3 className="font-display text-2xl font-extrabold leading-none text-foreground">
                              {c.name}
                            </h3>
                          </div>
                        </div>
                        <span className="font-display text-xs font-bold tabular-nums tracking-wider text-muted-foreground/50">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="flex-1 px-6">
                        <p className="text-sm font-semibold text-primary">{c.subtitle}</p>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                      </div>

                      <div className="mt-6 flex items-center justify-between border-t border-border/60 px-6 py-4">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                          {filters.find((f) => f.key === c.category)?.label}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-primary transition-transform group-hover:translate-x-0.5">
                          {c.cta} <ArrowRight className="h-3.5 w-3.5" />
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

      {/* CTA */}
      <section className="relative overflow-hidden bg-foreground py-24 text-background">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[160px]" />
        <div className="container relative z-10 mx-auto grid gap-8 px-4 md:grid-cols-12 md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-8"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="font-display text-xs font-bold tabular-nums text-primary">03</span>
              <span className="h-px w-10 bg-background/30" />
              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-background/60">Nächster Schritt</span>
            </div>
            <h2 className="font-display text-4xl font-extrabold leading-[0.95] md:text-6xl">
              {t("licenseClasses.ctaTitle")} <br />
              <span className="text-primary">{t("licenseClasses.ctaHighlight")}</span>
            </h2>
            <p className="mt-5 max-w-lg text-base text-background/70 md:text-lg">{t("licenseClasses.ctaDesc")}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap gap-3 md:col-span-4 md:justify-end"
          >
            <Button variant="hero" asChild>
              <Link to="/kontakt">
                {t("common.freeConsultation")} <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="hero-outline" asChild>
              <a href="tel:+4942112345">{t("common.callNow")}</a>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LicenseClasses;
