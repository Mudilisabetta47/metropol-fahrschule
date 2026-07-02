import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Car, Bike, Truck, ArrowRight, Zap, Clock, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";

const classes = [
  { icon: Car, name: "Klasse B", subtitle: "PKW-Führerschein", slug: "klasse-b", desc: "Der Klassiker. PKW bis 3,5 t – der beliebteste Führerschein Deutschlands.", minAge: "ab 17", popular: true, category: "car" },
  { icon: Car, name: "Klasse B197", subtitle: "Automatik + Schaltwagen", slug: "klasse-b197", desc: "Prüfung auf Automatik – trotzdem Schaltwagen fahren.", minAge: "ab 17", popular: true, category: "car" },
  { icon: Bike, name: "Klasse A", subtitle: "Motorrad unbeschränkt", slug: "klasse-a", desc: "Alle Motorräder ohne Limits. Direkteinstieg ab 24.", minAge: "ab 24", popular: false, category: "bike" },
  { icon: Bike, name: "Klasse A2", subtitle: "Motorrad bis 35 kW", slug: "klasse-a2", desc: "Der Einstieg. Perfekte Basis für später.", minAge: "ab 18", popular: false, category: "bike" },
  { icon: Bike, name: "Klasse A1", subtitle: "125ccm Leichtkrafträder", slug: "klasse-a1", desc: "Früh mobil. 125ccm ab 16 Jahren.", minAge: "ab 16", popular: false, category: "bike" },
  { icon: Bike, name: "Klasse AM", subtitle: "Moped & Roller", slug: "klasse-am", desc: "Roller bis 45 km/h. Deine erste Freiheit.", minAge: "ab 15", popular: false, category: "bike" },
  { icon: Car, name: "Klasse BE", subtitle: "PKW + Anhänger", slug: "klasse-be", desc: "Schwere Anhänger für Wohnwagen, Boot & Co.", minAge: "ab 17", popular: false, category: "car" },
  { icon: Car, name: "Klasse B96", subtitle: "PKW + kleiner Anhänger", slug: "klasse-be", desc: "Erweiterung ohne Prüfung. Schnell & günstig.", minAge: "ab 17", popular: false, category: "car" },
  { icon: Car, name: "Klasse B196", subtitle: "125ccm mit Klasse B", slug: "klasse-b196", desc: "125er fahren ohne separate Motorrad-Prüfung.", minAge: "ab 25", popular: false, category: "bike" },
  { icon: Truck, name: "Klasse C", subtitle: "LKW über 3,5 t", slug: "klasse-c", desc: "Einstieg in den Güterverkehr.", minAge: "ab 21", popular: false, category: "truck" },
  { icon: Truck, name: "Klasse CE", subtitle: "LKW + Anhänger / Sattelzug", slug: "klasse-ce", desc: "Die Königsklasse. Sattel- und Gliederzüge.", minAge: "ab 21", popular: false, category: "truck" },
  { icon: Truck, name: "Klasse C1", subtitle: "LKW bis 7,5 t", slug: "klasse-c1", desc: "Ideal für Lieferfahrzeuge und leichte LKW.", minAge: "ab 18", popular: false, category: "truck" },
  { icon: Truck, name: "Klasse D", subtitle: "Bus – alle Größen", slug: "klasse-d", desc: "Stadt- und Reisebusse ohne Limits.", minAge: "ab 24", popular: false, category: "bus" },
  { icon: Truck, name: "Klasse DE", subtitle: "Bus mit Anhänger", slug: "klasse-de", desc: "Bus mit schwerem Anhänger – Spezial-Einsatz.", minAge: "ab 24", popular: false, category: "bus" },
  { icon: Truck, name: "Klasse L", subtitle: "Land- & Forstwirtschaft", slug: "klasse-l", desc: "Zugmaschinen bis 40 km/h – nur Theorie.", minAge: "ab 16", popular: false, category: "truck" },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Startseite", item: "https://fahrschule-metropol.de/" },
    { "@type": "ListItem", position: 2, name: "Führerscheinklassen", item: "https://fahrschule-metropol.de/fuehrerscheinklassen" },
  ],
};

const featured = classes.filter((c) => c.popular);
const others = classes.filter((c) => !c.popular);

const catLabel: Record<string, string> = { car: "PKW", bike: "Motorrad", truck: "LKW", bus: "Bus" };

const LicenseClasses = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#f5f5f2] font-['DM_Sans'] text-[#0a0a0a]">
      <SEO
        title={t("licenseClasses.seoTitle")}
        description={t("licenseClasses.seoDesc")}
        canonical="https://fahrschule-metropol.de/fuehrerscheinklassen"
        jsonLd={[breadcrumbSchema]}
        keywords="Führerscheinklassen, Klasse B, Klasse A, Klasse C, Klasse D, Motorradführerschein, LKW Führerschein, Bus Führerschein, B197, B196, Klasse AM, Klasse A1, Klasse A2, Fahrschule Metropol"
      />

      <section className="pt-28 pb-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
            <div className="max-w-2xl">
              <motion.span
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="inline-block px-3 py-1 bg-[#00cc28] text-[#0a0a0a] text-[10px] font-black uppercase tracking-[0.25em] rounded-full mb-5"
              >
                {classes.length} Klassen · 3 Standorte
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
                className="text-5xl md:text-7xl font-bold font-['Space_Grotesk'] leading-[0.9] tracking-tighter uppercase"
              >
                Wähle deinen<br />Weg.
              </motion.h1>
              <p className="mt-5 max-w-md text-[#0a0a0a]/60 text-base leading-relaxed">
                Auto, Motorrad, LKW, Bus oder Anhänger – jede Reise beginnt mit dem ersten Schritt. Finde die Klasse, die zu deinem Leben passt.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-widest text-[#0a0a0a]/60">
              {[{ icon: Shield, t: "98% Erfolg" }, { icon: Clock, t: "Schnell" }, { icon: Zap, t: "Flexibel" }].map((i) => (
                <span key={i.t} className="inline-flex items-center gap-2 rounded-full bg-white border border-[#0a0a0a]/10 px-4 py-2">
                  <i.icon className="h-3.5 w-3.5 text-[#00cc28]" /> {i.t}
                </span>
              ))}
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Featured: Klasse B */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-8 relative bg-white rounded-[2rem] p-10 md:p-12 border border-[#0a0a0a]/5 shadow-xl overflow-hidden group min-h-[420px]"
            >
              <div className="pointer-events-none absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-[#00cc28]/12 blur-3xl" />
              <div className="absolute top-6 right-6">
                <span className="bg-[#00cc28] px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-[#0a0a0a]">Beliebt</span>
              </div>
              <div className="relative max-w-md h-full flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#0a0a0a]/40 mb-2">{featured[0].minAge} · {catLabel[featured[0].category]}</div>
                  <h3 className="text-5xl md:text-6xl font-bold font-['Space_Grotesk'] tracking-tighter uppercase mb-3">{featured[0].name}</h3>
                  <p className="text-[#00cc28] text-sm font-bold uppercase tracking-widest mb-5">{featured[0].subtitle}</p>
                  <p className="text-[#0a0a0a]/60 text-lg leading-relaxed">{featured[0].desc}</p>
                </div>
                <Link
                  to={`/fuehrerschein/${featured[0].slug}`}
                  className="mt-10 inline-flex items-center gap-3 bg-[#0a0a0a] text-white px-8 py-4 rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-[#00cc28] hover:text-[#0a0a0a] transition-all w-fit"
                >
                  Klasse B starten <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            {/* Featured accent: B197 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.08, duration: 0.6 }}
              className="md:col-span-4 bg-[#00cc28] rounded-[2rem] p-10 flex flex-col justify-between min-h-[420px]"
            >
              <div>
                <span className="inline-block bg-[#0a0a0a] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4">Neu</span>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#0a0a0a]/60 mb-2">{featured[1].minAge}</div>
                <h3 className="text-3xl md:text-4xl font-bold font-['Space_Grotesk'] leading-none text-[#0a0a0a] uppercase tracking-tight mb-3">{featured[1].name}</h3>
                <p className="text-sm font-bold uppercase tracking-widest text-[#0a0a0a]/80">{featured[1].subtitle}</p>
              </div>
              <div>
                <p className="text-[#0a0a0a]/80 text-sm font-medium mb-6">{featured[1].desc}</p>
                <div className="h-px bg-[#0a0a0a]/15 w-full mb-5" />
                <Link to={`/fuehrerschein/${featured[1].slug}`} className="inline-flex items-center gap-2 font-bold text-[#0a0a0a] underline decoration-2 underline-offset-4">
                  B197 entdecken <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            {/* Remaining classes as bento tiles */}
            {others.map((c, i) => {
              // Vary spans for bento rhythm
              const spanPattern = [
                "md:col-span-4",
                "md:col-span-4",
                "md:col-span-4",
                "md:col-span-6",
                "md:col-span-3",
                "md:col-span-3",
              ];
              const span = spanPattern[i % spanPattern.length];
              // Vary variant
              const isDark = i % 7 === 5;
              const isAccent = i % 7 === 2;
              const base = "rounded-[2rem] p-8 flex flex-col justify-between min-h-[240px] transition-all duration-500";
              const styleCls = isDark
                ? "bg-[#0a0a0a] text-white"
                : isAccent
                ? "bg-[#00cc28] text-[#0a0a0a]"
                : "bg-white border border-[#0a0a0a]/5 hover:border-[#00cc28]";
              const muted = isDark ? "text-white/60" : isAccent ? "text-[#0a0a0a]/70" : "text-[#0a0a0a]/60";
              const iconWrap = isDark ? "bg-white/10 text-[#00cc28]" : isAccent ? "bg-[#0a0a0a] text-[#00cc28]" : "bg-[#f5f5f2] text-[#0a0a0a]";
              return (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: (i % 6) * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`${span} ${base} ${styleCls}`}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconWrap}`}>
                        <c.icon className="h-5 w-5" />
                      </div>
                      <div className={`text-[10px] font-bold uppercase tracking-widest ${muted}`}>{c.minAge} · {catLabel[c.category]}</div>
                    </div>
                    <h4 className="text-2xl md:text-3xl font-bold font-['Space_Grotesk'] tracking-tight uppercase mb-1">{c.name}</h4>
                    <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${isDark || isAccent ? muted : "text-[#00cc28]"}`}>{c.subtitle}</p>
                    <p className={`text-sm leading-relaxed ${muted}`}>{c.desc}</p>
                  </div>
                  <Link
                    to={`/fuehrerschein/${c.slug}`}
                    className={`mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest w-fit ${
                      isDark ? "text-[#00cc28] hover:text-white" : isAccent ? "text-[#0a0a0a]" : "text-[#0a0a0a] hover:text-[#00cc28]"
                    }`}
                  >
                    Details <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </motion.div>
              );
            })}

            {/* Closing CTA tile */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-12 bg-[#0a0a0a] rounded-[2rem] p-10 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-white"
            >
              <div>
                <span className="text-[#00cc28] text-[10px] font-black uppercase tracking-widest">Kostenlose Beratung</span>
                <h3 className="mt-2 text-3xl md:text-5xl font-bold font-['Space_Grotesk'] uppercase tracking-tight">
                  Nicht sicher, welche Klasse?
                </h3>
                <p className="mt-3 text-white/60 max-w-xl">
                  Wir beraten dich persönlich – am Telefon oder in der Fahrschule. Ehrlich, direkt, ohne Verkaufsdruck.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/kontakt"
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#00cc28] text-[#0a0a0a] px-8 py-4 text-sm font-black uppercase tracking-widest hover:bg-white transition-colors"
                >
                  Beratung starten <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="tel:+4942112345"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/20 text-white px-8 py-4 text-sm font-black uppercase tracking-widest hover:bg-white/10 transition-colors"
                >
                  Jetzt anrufen
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LicenseClasses;
