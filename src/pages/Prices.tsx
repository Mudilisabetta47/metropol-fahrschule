import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InternalLinks from "@/components/InternalLinks";
import { Link } from "react-router-dom";
import { MapPin, ChevronRight, ChevronDown, Car, Bike, Truck, Bus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import { priceData } from "@/data/priceData";
import heroImage from "@/assets/hero-driving.jpg";

type CatKey = "PKW" | "Motorrad" | "LKW" | "Bus" | "Spezial";

const categoryMap: Record<string, { label: string; group: CatKey; icon: React.ElementType }> = {
  B: { label: "PKW", group: "PKW", icon: Car },
  B96: { label: "PKW + Anhänger", group: "PKW", icon: Car },
  B196: { label: "Motorrad-Erweiterung", group: "Motorrad", icon: Bike },
  Umschreiber: { label: "Umschreibung", group: "Spezial", icon: Sparkles },
  A: { label: "Motorrad", group: "Motorrad", icon: Bike },
  A1: { label: "Motorrad", group: "Motorrad", icon: Bike },
  A2: { label: "Motorrad", group: "Motorrad", icon: Bike },
  BE: { label: "PKW + Anhänger", group: "PKW", icon: Car },
  C: { label: "LKW", group: "LKW", icon: Truck },
  CE: { label: "LKW", group: "LKW", icon: Truck },
  C1: { label: "LKW", group: "LKW", icon: Truck },
  D: { label: "Bus", group: "Bus", icon: Bus },
  DE: { label: "Bus", group: "Bus", icon: Bus },
  ASF: { label: "Seminar", group: "Spezial", icon: Sparkles },
};

const popularClasses = ["B", "A", "C"];
const filters: (CatKey | "Alle")[] = ["Alle", "PKW", "Motorrad", "LKW", "Bus", "Spezial"];

interface PriceCardProps {
  klasse: string;
  items: { leistung: string; preis: string }[];
  index: number;
  number: string;
}

const PriceCard = ({ klasse, items, index, number }: PriceCardProps) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const isPopular = popularClasses.includes(klasse);
  const cat = categoryMap[klasse] || { label: "", group: "Spezial" as CatKey, icon: Car };
  const Icon = cat.icon;

  const grundbetrag = items.find(
    (i) => i.leistung === "Grundbetrag" || i.leistung === "Seminarpreis gesamt" || i.leistung.startsWith("Pauschal") || i.leistung.startsWith("Kursentgelt"),
  );
  const rest = items.filter((i) => i !== grundbetrag);
  const preview = rest.slice(0, 3);
  const hidden = rest.slice(3);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border transition-all duration-500 hover:-translate-y-1 ${
        isPopular
          ? "border-primary/60 bg-foreground text-background shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.5)] hover:shadow-[0_30px_80px_-20px_hsl(var(--primary)/0.7)]"
          : "border-border bg-card text-foreground shadow-card hover:shadow-card-hover"
      }`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between p-6 pb-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
              isPopular ? "bg-primary text-primary-foreground" : "bg-accent text-foreground"
            }`}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <span className={`text-[10px] font-bold uppercase tracking-[0.18em] ${isPopular ? "text-primary" : "text-muted-foreground"}`}>
              {cat.label}
            </span>
            <h3 className={`font-display text-2xl font-extrabold leading-none ${isPopular ? "text-background" : "text-foreground"}`}>
              Klasse {klasse}
            </h3>
          </div>
        </div>
        <span
          className={`font-display text-xs font-bold tabular-nums tracking-wider ${
            isPopular ? "text-background/40" : "text-muted-foreground/60"
          }`}
        >
          {number}
        </span>
      </div>

      {/* Hero price */}
      {grundbetrag && (
        <div className={`mx-6 mb-4 rounded-2xl px-4 py-3 ${isPopular ? "bg-background/5 ring-1 ring-background/10" : "bg-accent/60"}`}>
          <div className="flex items-end justify-between gap-3">
            <span className={`text-[11px] font-medium leading-tight ${isPopular ? "text-background/60" : "text-muted-foreground"}`}>
              {grundbetrag.leistung}
            </span>
            <span
              className={`font-display text-3xl font-extrabold tabular-nums leading-none ${
                isPopular ? "text-primary" : "text-foreground"
              }`}
            >
              {grundbetrag.preis}
            </span>
          </div>
        </div>
      )}

      {/* Item list */}
      <div className="flex-1 px-6">
        <ul>
          {preview.map((item, idx) => (
            <li
              key={idx}
              className={`flex items-center justify-between border-t py-2.5 text-[13px] ${
                isPopular ? "border-background/10" : "border-border/60"
              }`}
            >
              <span className={`truncate pr-3 ${isPopular ? "text-background/70" : "text-muted-foreground"}`}>{item.leistung}</span>
              <span className={`whitespace-nowrap font-semibold tabular-nums ${isPopular ? "text-background" : "text-foreground"}`}>
                {item.preis}
              </span>
            </li>
          ))}
          <AnimatePresence initial={false}>
            {expanded &&
              hidden.map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex items-center justify-between overflow-hidden border-t py-2.5 text-[13px] ${
                    isPopular ? "border-background/10" : "border-border/60"
                  }`}
                >
                  <span className={`truncate pr-3 ${isPopular ? "text-background/70" : "text-muted-foreground"}`}>{item.leistung}</span>
                  <span className={`whitespace-nowrap font-semibold tabular-nums ${isPopular ? "text-background" : "text-foreground"}`}>
                    {item.preis}
                  </span>
                </motion.li>
              ))}
          </AnimatePresence>
        </ul>

        {hidden.length > 0 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className={`mt-3 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors ${
              isPopular ? "text-primary hover:text-primary/80" : "text-primary hover:text-primary/80"
            }`}
          >
            {expanded ? t("common.showLess") : t("common.moreItems", { count: hidden.length })}
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>

      {/* Footer CTA */}
      <div className={`mt-5 flex items-center justify-between border-t px-6 py-4 ${isPopular ? "border-background/10" : "border-border/60"}`}>
        {isPopular ? (
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {t("common.popular")}
          </span>
        ) : (
          <span className="text-[11px] text-muted-foreground">inkl. 19% MwSt.</span>
        )}
        <Link
          to="/kontakt"
          className={`inline-flex items-center gap-1 text-xs font-bold transition-transform group-hover:translate-x-0.5 ${
            isPopular ? "text-primary" : "text-primary"
          }`}
        >
          {t("common.inquireNow")} <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </motion.article>
  );
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Startseite", item: "https://fahrschule-metropol.de/" },
    { "@type": "ListItem", position: 2, name: "Preise", item: "https://fahrschule-metropol.de/preise" },
  ],
};

const Prices = () => {
  const { t } = useTranslation();
  const [activeLoc, setActiveLoc] = useState(priceData[0].slug);
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("Alle");

  const currentLoc = priceData.find((l) => l.slug === activeLoc) ?? priceData[0];

  const visibleClasses = useMemo(() => {
    if (activeFilter === "Alle") return currentLoc.classes;
    return currentLoc.classes.filter((c) => categoryMap[c.klasse]?.group === activeFilter);
  }, [currentLoc, activeFilter]);

  return (
    <div className="min-h-screen">
      <SEO
        title={t("prices.seoTitle")}
        description={t("prices.seoDesc")}
        canonical="https://fahrschule-metropol.de/preise"
        jsonLd={[breadcrumbSchema]}
        keywords="Fahrschule Preise, Führerschein Kosten, Fahrschule Metropol Preise, Klasse B Kosten, Motorradführerschein Kosten, LKW Führerschein Preise, Führerschein Preise Hannover, Führerschein Preise Bremen, Führerschein Preise Garbsen, Führerschein Kosten 2026"
      />

      {/* Editorial Hero */}
      <section className="relative overflow-hidden bg-foreground text-background">
        <img src={heroImage} alt="Fahrschule Metropol Preise" className="absolute inset-0 h-full w-full object-cover opacity-30" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/85 to-foreground" />
        <div className="container relative z-10 mx-auto grid gap-8 px-4 pb-16 pt-32 md:grid-cols-12 md:pb-24 md:pt-40">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-8"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="font-display text-xs font-bold tabular-nums text-primary">01</span>
              <span className="h-px w-10 bg-background/30" />
              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-background/60">Preise · 2026</span>
            </div>
            <h1 className="font-display text-5xl font-extrabold leading-[0.95] md:text-7xl">
              Transparent. <br />
              <span className="text-primary">Fair. Fix.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base text-background/70 md:text-lg">
              Keine versteckten Kosten, keine Überraschungen. Wähle deinen Standort und deine Führerscheinklasse.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex items-end md:col-span-4 md:justify-end"
          >
            <div className="rounded-2xl border border-background/15 bg-background/5 p-5 backdrop-blur">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Gültig ab Juli 2026
              </span>
              <p className="mt-3 text-sm text-background/70">
                Alle Preise inkl. 19 % MwSt. Barzahlung oder Kartenzahlung vor Ort möglich.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <div className="sticky top-16 z-30 border-b border-border/60 bg-background/85 backdrop-blur-lg">
        <div className="container mx-auto flex flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
          {/* Location */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-full border border-border bg-card p-1">
            {priceData.map((loc) => {
              const active = activeLoc === loc.slug;
              return (
                <button
                  key={loc.slug}
                  onClick={() => setActiveLoc(loc.slug)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                    active
                      ? "bg-foreground text-background shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <MapPin className="h-3.5 w-3.5" /> {loc.location}
                </button>
              );
            })}
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            {filters.map((f) => {
              const active = activeFilter === f;
              return (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] transition-all ${
                    active
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "border border-border bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-muted-foreground">
                {currentLoc.location}
              </span>
              <h2 className="font-display text-3xl font-extrabold text-foreground md:text-4xl">
                {activeFilter === "Alle" ? "Alle Klassen" : activeFilter}
                <span className="ml-2 font-display text-lg font-bold text-muted-foreground/60 tabular-nums">
                  {String(visibleClasses.length).padStart(2, "0")}
                </span>
              </h2>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeLoc}-${activeFilter}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {visibleClasses.map((cls, i) => (
                <PriceCard
                  key={cls.klasse}
                  klasse={cls.klasse}
                  items={cls.items}
                  index={i}
                  number={String(i + 1).padStart(2, "0")}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Footer note */}
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-border bg-card p-8"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary">Beratung</span>
              <h3 className="mt-2 font-display text-2xl font-extrabold text-foreground">
                Individuelles Angebot?
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                {t("prices.footerNote")}{" "}
                <Link to="/kontakt" className="font-semibold text-primary hover:underline">
                  {t("prices.footerContact")}
                </Link>{" "}
                {t("prices.footerContactEnd")}
              </p>
              <Button variant="cta" size="lg" className="mt-5" asChild>
                <Link to="/kontakt">
                  {t("prices.inquireCta")} <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl border border-border bg-foreground p-8 text-background"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary">Zahlung</span>
              <h3 className="mt-2 font-display text-2xl font-extrabold">
                Bar oder Karte vor Ort
              </h3>
              <p className="mt-3 text-sm text-background/70">{t("prices.paymentMethods")}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Barzahlung", "Kartenzahlung vor Ort", "Inkl. 19% MwSt."].map((c) => (
                  <span key={c} className="rounded-full border border-background/20 px-3 py-1 text-[11px] font-semibold">
                    {c}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <InternalLinks exclude={["services"]} title="Mehr über unsere Fahrschule" />
    </div>
  );
};

export default Prices;
