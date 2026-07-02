import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, Car, Bike, Truck, Bus } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import InternalLinks from "@/components/InternalLinks";
import { priceData } from "@/data/priceData";

const categoryMap: Record<string, { label: string; icon: React.ElementType }> = {
  B: { label: "PKW", icon: Car },
  B96: { label: "PKW + Anhänger", icon: Car },
  B196: { label: "Motorrad-Erweiterung", icon: Bike },
  Umschreiber: { label: "Umschreibung / Wiedererteilung", icon: Car },
  A: { label: "Motorrad", icon: Bike },
  A1: { label: "Motorrad", icon: Bike },
  A2: { label: "Motorrad", icon: Bike },
  BE: { label: "PKW + Anhänger", icon: Car },
  C: { label: "LKW", icon: Truck },
  CE: { label: "LKW", icon: Truck },
  C1: { label: "LKW", icon: Truck },
  D: { label: "Bus", icon: Bus },
  DE: { label: "Bus", icon: Bus },
  ASF: { label: "Seminar", icon: Car },
};

const featured = new Set(["B", "A", "C"]);

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Startseite", item: "https://fahrschule-metropol.de/" },
    { "@type": "ListItem", position: 2, name: "Preise", item: "https://fahrschule-metropol.de/preise" },
  ],
};

interface PriceTileProps {
  klasse: string;
  items: { leistung: string; preis: string }[];
  variant: "hero" | "accent" | "dark" | "card";
  span?: string;
  index: number;
}

const PriceTile = ({ klasse, items, variant, span = "md:col-span-4", index }: PriceTileProps) => {
  const [expanded, setExpanded] = useState(false);
  const cat = categoryMap[klasse] || { label: "", icon: Car };
  const Icon = cat.icon;
  const grund = items.find((i) => i.leistung === "Grundbetrag" || i.leistung.toLowerCase().includes("pauschal") || i.leistung.toLowerCase().includes("kursentgelt") || i.leistung === "Seminarpreis gesamt");
  const preview = items.slice(0, variant === "hero" ? 4 : 3);
  const rest = items.slice(preview.length);

  const base = "relative rounded-[2rem] p-8 md:p-10 flex flex-col justify-between overflow-hidden transition-all duration-500";
  const styles: Record<string, string> = {
    hero: "md:col-span-8 md:row-span-2 bg-white border border-[#0a0a0a]/5 shadow-xl min-h-[420px]",
    accent: "bg-[#00cc28] text-[#0a0a0a] min-h-[280px]",
    dark: "bg-[#0a0a0a] text-white min-h-[280px]",
    card: "bg-white border border-[#0a0a0a]/5 hover:border-[#00cc28] min-h-[280px]",
  };

  const isDark = variant === "dark";
  const mutedTxt = isDark ? "text-white/60" : variant === "accent" ? "text-[#0a0a0a]/70" : "text-[#0a0a0a]/60";
  const dividerCol = isDark ? "border-white/10" : variant === "accent" ? "border-[#0a0a0a]/15" : "border-[#0a0a0a]/10";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.05, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={`${base} ${styles[variant]} ${span}`}
    >
      {variant === "hero" && (
        <div className="absolute top-6 right-6">
          <span className="bg-[#00cc28] px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-[#0a0a0a]">Beliebt</span>
        </div>
      )}
      {variant === "hero" && (
        <div className="pointer-events-none absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-[#00cc28]/12 blur-3xl" />
      )}

      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            variant === "accent" ? "bg-[#0a0a0a] text-[#00cc28]" : isDark ? "bg-white/10 text-[#00cc28]" : "bg-[#f5f5f2] text-[#0a0a0a]"
          }`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <div className={`text-[10px] font-bold uppercase tracking-widest ${mutedTxt}`}>{cat.label}</div>
            <h3 className={`font-['Space_Grotesk'] font-bold ${variant === "hero" ? "text-4xl md:text-5xl" : "text-2xl"} tracking-tight`}>
              Klasse {klasse}
            </h3>
          </div>
        </div>

        {grund && (
          <div className={`mt-6 mb-6 border-t border-b ${dividerCol} py-4`}>
            <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${mutedTxt}`}>{grund.leistung}</div>
            <div className={`font-['Space_Grotesk'] font-bold tabular-nums ${variant === "hero" ? "text-6xl md:text-7xl" : "text-4xl"} tracking-tighter`}>
              {grund.preis}
            </div>
          </div>
        )}

        <div className="space-y-2">
          {preview.filter((p) => p !== grund).map((it, i) => (
            <div key={i} className={`flex items-baseline justify-between text-sm border-b ${dividerCol} pb-2 last:border-0`}>
              <span className={mutedTxt}>{it.leistung}</span>
              <span className="font-semibold tabular-nums">{it.preis}</span>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {expanded && rest.length > 0 && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
              <div className="pt-2 space-y-2">
                {rest.map((it, i) => (
                  <div key={i} className={`flex items-baseline justify-between text-sm border-b ${dividerCol} pb-2 last:border-0`}>
                    <span className={mutedTxt}>{it.leistung}</span>
                    <span className="font-semibold tabular-nums">{it.preis}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        {rest.length > 0 ? (
          <button
            onClick={() => setExpanded(!expanded)}
            className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest ${mutedTxt} hover:opacity-100 opacity-90`}
          >
            {expanded ? "Weniger" : `+${rest.length} Positionen`}
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} />
          </button>
        ) : <span />}
        <Link
          to="/kontakt"
          className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-xs font-bold uppercase tracking-widest transition-all ${
            variant === "hero" || variant === "accent"
              ? "bg-[#0a0a0a] text-white hover:bg-[#00cc28] hover:text-[#0a0a0a]"
              : isDark
              ? "bg-[#00cc28] text-[#0a0a0a] hover:bg-white"
              : "bg-[#0a0a0a] text-white hover:bg-[#00cc28] hover:text-[#0a0a0a]"
          }`}
        >
          Anfragen <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </motion.div>
  );
};

const Prices = () => {
  const { t } = useTranslation();
  const [locSlug, setLocSlug] = useState<string>(priceData[0]?.slug ?? "hannover");
  const loc = priceData.find((l) => l.slug === locSlug) ?? priceData[0];

  const ordered = useMemo(() => {
    const list = [...loc.classes];
    list.sort((a, b) => {
      const af = featured.has(a.klasse) ? 0 : 1;
      const bf = featured.has(b.klasse) ? 0 : 1;
      return af - bf;
    });
    return list;
  }, [loc]);

  const heroCls = ordered[0];
  const restCls = ordered.slice(1);

  return (
    <div className="min-h-screen bg-[#f5f5f2] font-['DM_Sans'] text-[#0a0a0a]">
      <SEO
        title={t("prices.seoTitle")}
        description={t("prices.seoDesc")}
        canonical="https://fahrschule-metropol.de/preise"
        jsonLd={[breadcrumbSchema]}
        keywords="Fahrschule Preise, Führerschein Kosten, Klasse B Kosten, Motorradführerschein Kosten, LKW Führerschein Preise, Führerschein Preise Hannover, Führerschein Preise Bremen, Führerschein Preise Garbsen, Was kostet der Führerschein, Fahrschule Preise 2025"
      />

      <section className="pt-28 pb-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
            <div className="max-w-2xl">
              <motion.span
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="inline-block px-3 py-1 bg-[#00cc28] text-[#0a0a0a] text-[10px] font-black uppercase tracking-[0.25em] rounded-full mb-5"
              >
                Tarife & Klassen
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
                className="text-5xl md:text-7xl font-bold font-['Space_Grotesk'] leading-[0.9] tracking-tighter uppercase"
              >
                Dein Weg zum<br />Führerschein.
              </motion.h1>
              <p className="mt-5 max-w-md text-[#0a0a0a]/60 text-base leading-relaxed">
                Transparente Preise, keine versteckten Kosten. Wähle deinen Standort und vergleiche alle Klassen auf einen Blick.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.15 }}
              className="flex bg-white p-1 rounded-2xl border border-[#0a0a0a]/10 shadow-sm"
            >
              {priceData.map((l) => (
                <button
                  key={l.slug}
                  onClick={() => setLocSlug(l.slug)}
                  className={`px-5 md:px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                    l.slug === locSlug
                      ? "bg-[#0a0a0a] text-white"
                      : "text-[#0a0a0a]/50 hover:text-[#0a0a0a]"
                  }`}
                >
                  {l.location}
                </button>
              ))}
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={locSlug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-4"
            >
              {heroCls && (
                <PriceTile klasse={heroCls.klasse} items={heroCls.items} variant="hero" span="md:col-span-8" index={0} />
              )}

              <motion.div
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.05, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="md:col-span-4 bg-[#00cc28] rounded-[2rem] p-8 md:p-10 flex flex-col justify-between min-h-[280px]"
              >
                <div>
                  <span className="inline-block bg-[#0a0a0a] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                    Standort {loc.location}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold font-['Space_Grotesk'] leading-none text-[#0a0a0a] uppercase tracking-tight">
                    7-Tage<br />Express
                  </h3>
                </div>
                <div>
                  <p className="text-[#0a0a0a]/80 text-sm font-medium mb-5">
                    Führerschein im Intensivkurs. Theorie + Praxis in Rekordzeit.
                  </p>
                  <div className="h-px bg-[#0a0a0a]/15 w-full mb-5" />
                  <Link to="/crashkurs" className="inline-flex items-center gap-2 font-bold text-[#0a0a0a] underline decoration-2 underline-offset-4">
                    Crashkurs entdecken <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>

              {restCls.map((cls, i) => (
                <PriceTile
                  key={cls.klasse}
                  klasse={cls.klasse}
                  items={cls.items}
                  variant={i % 5 === 4 ? "dark" : "card"}
                  span="md:col-span-4"
                  index={i + 2}
                />
              ))}

              <motion.div
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="md:col-span-12 bg-[#0a0a0a] rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-white"
              >
                <div>
                  <span className="text-[#00cc28] text-[10px] font-black uppercase tracking-widest">Unverbindlich anfragen</span>
                  <h3 className="mt-2 text-3xl md:text-4xl font-bold font-['Space_Grotesk'] uppercase tracking-tight">
                    Persönliches Angebot in 24 h.
                  </h3>
                  <p className="mt-2 text-white/60 max-w-xl">
                    Kostenlose Beratung, alle Zahlungsoptionen, keine versteckten Gebühren. Nur Bar oder Überweisung – ohne Ratenzahlung.
                  </p>
                </div>
                <Link
                  to="/kontakt"
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#00cc28] text-[#0a0a0a] px-8 py-4 text-sm font-black uppercase tracking-widest hover:bg-white transition-colors whitespace-nowrap"
                >
                  Jetzt anfragen <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex flex-col md:flex-row justify-between gap-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0a0a0a]/50">
            <div>Alle Preise inkl. MwSt. · Stand 2025</div>
            <div className="flex gap-6">
              <span>Zahlung: Bar / Überweisung</span>
              <Link to="/kontakt" className="hover:text-[#00cc28] underline underline-offset-4">Preisliste anfragen</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white">
        <InternalLinks exclude={["services"]} title="Mehr über unsere Fahrschule" />
      </div>
    </div>
  );
};

export default Prices;
