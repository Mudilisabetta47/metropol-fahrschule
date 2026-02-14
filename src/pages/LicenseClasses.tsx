import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Car, Bike, Truck, ChevronRight, ArrowRight, Sparkles, Zap, Shield, Clock } from "lucide-react";
import SEO from "@/components/SEO";
import classPkw from "@/assets/class-pkw.jpg";
import classMotorrad from "@/assets/class-motorrad.jpg";
import classLkw from "@/assets/class-lkw.jpg";
import classBus from "@/assets/class-bus.jpg";

const categoryImages: Record<string, string> = {
  car: classPkw,
  bike: classMotorrad,
  truck: classLkw,
  bus: classBus,
};

const classes = [
  {
    icon: Car, name: "Klasse B", subtitle: "PKW-Führerschein", slug: "klasse-b",
    desc: "Dein Schlüssel zur Freiheit. Der beliebteste Führerschein Deutschlands – für Fahrzeuge bis 3,5 t.",
    minAge: "ab 17", popular: true, cta: "Klasse B starten", category: "car",
    gradient: "from-[hsl(134,100%,40%)] to-[hsl(160,85%,35%)]",
  },
  {
    icon: Car, name: "Klasse B197", subtitle: "Automatik + Schaltwagen", slug: "klasse-b197",
    desc: "Das Beste aus beiden Welten. Prüfung auf Automatik, trotzdem Schaltwagen fahren.",
    minAge: "ab 17", popular: true, cta: "B197 entdecken", category: "car",
    gradient: "from-[hsl(150,85%,35%)] to-[hsl(170,70%,35%)]",
  },
  {
    icon: Bike, name: "Klasse A", subtitle: "Motorrad unbeschränkt", slug: "klasse-a",
    desc: "Grenzenlose Freiheit auf zwei Rädern. Alle Motorräder – ohne Limits.",
    minAge: "ab 24", popular: false, cta: "Klasse A anfragen", category: "bike",
    gradient: "from-[hsl(134,100%,40%)] to-[hsl(90,70%,40%)]",
  },
  {
    icon: Bike, name: "Klasse A2", subtitle: "Motorrad bis 35 kW", slug: "klasse-a2",
    desc: "Dein Einstieg in die Motorradwelt. Die perfekte Basis für später.",
    minAge: "ab 18", popular: false, cta: "A2 starten", category: "bike",
    gradient: "from-[hsl(160,85%,35%)] to-[hsl(134,100%,40%)]",
  },
  {
    icon: Bike, name: "Klasse A1", subtitle: "125ccm Leichtkrafträder", slug: "klasse-a1",
    desc: "Früh mobil auf zwei Rädern. 125ccm ab 16 Jahren – der erste Schritt.",
    minAge: "ab 16", popular: false, cta: "A1 anfragen", category: "bike",
    gradient: "from-[hsl(134,100%,40%)] to-[hsl(150,85%,35%)]",
  },
  {
    icon: Bike, name: "Klasse AM", subtitle: "Moped & Roller", slug: "klasse-am",
    desc: "Deine erste Freiheit. Roller bis 45 km/h – ideal für den Alltag.",
    minAge: "ab 15", popular: false, cta: "AM starten", category: "bike",
    gradient: "from-[hsl(150,85%,35%)] to-[hsl(134,100%,40%)]",
  },
  {
    icon: Car, name: "Klasse BE", subtitle: "PKW + Anhänger", slug: "klasse-be",
    desc: "Mehr mitnehmen. Schwere Anhänger für Wohnwagen, Boote & mehr.",
    minAge: "ab 17", popular: false, cta: "BE anfragen", category: "car",
    gradient: "from-[hsl(134,100%,40%)] to-[hsl(160,85%,35%)]",
  },
  {
    icon: Truck, name: "Klasse C", subtitle: "LKW über 3,5 t", slug: "klasse-c",
    desc: "Der Einstieg in den Güterverkehr. Schwere Fahrzeuge ohne Limits.",
    minAge: "ab 21", popular: false, cta: "C anfragen", category: "truck",
    gradient: "from-[hsl(200,70%,40%)] to-[hsl(220,60%,35%)]",
  },
  {
    icon: Truck, name: "Klasse CE", subtitle: "LKW + Anhänger / Sattelzug", slug: "klasse-ce",
    desc: "Die Königsklasse. Sattelzüge und Gliederzüge ohne Beschränkung.",
    minAge: "ab 21", popular: false, cta: "CE anfragen", category: "truck",
    gradient: "from-[hsl(220,60%,35%)] to-[hsl(200,70%,40%)]",
  },
  {
    icon: Truck, name: "Klasse C1", subtitle: "Leichte LKW bis 7,5 t", slug: "klasse-c1",
    desc: "Perfekt für Lieferfahrzeuge und leichte LKW im Alltag.",
    minAge: "ab 18", popular: false, cta: "C1 anfragen", category: "truck",
    gradient: "from-[hsl(200,70%,40%)] to-[hsl(180,60%,35%)]",
  },
  {
    icon: Truck, name: "Klasse D", subtitle: "Bus – alle Größen", slug: "klasse-d",
    desc: "Dein Weg zum Busfahrer. Stadt- und Reisebusse ohne Limits.",
    minAge: "ab 24", popular: false, cta: "D anfragen", category: "bus",
    gradient: "from-[hsl(30,80%,50%)] to-[hsl(20,70%,45%)]",
  },
  {
    icon: Truck, name: "Klasse DE", subtitle: "Bus mit Anhänger", slug: "klasse-de",
    desc: "Bus mit schwerem Anhänger – für spezielle Einsätze.",
    minAge: "ab 24", popular: false, cta: "DE anfragen", category: "bus",
    gradient: "from-[hsl(20,70%,45%)] to-[hsl(30,80%,50%)]",
  },
  {
    icon: Car, name: "Klasse B196", subtitle: "125er mit Klasse B", slug: "klasse-b196",
    desc: "Erweitere dein B. 125ccm fahren – ganz ohne extra Prüfung.",
    minAge: "ab 25", popular: false, cta: "B196 anfragen", category: "bike",
    gradient: "from-[hsl(160,85%,35%)] to-[hsl(170,70%,35%)]",
  },
  {
    icon: Truck, name: "Klasse L", subtitle: "Land- & Forstwirtschaft", slug: "klasse-l",
    desc: "Für's Land gemacht. Zugmaschinen bis 40 km/h – nur Theorie.",
    minAge: "ab 16", popular: false, cta: "L anfragen", category: "truck",
    gradient: "from-[hsl(90,70%,40%)] to-[hsl(134,100%,40%)]",
  },
];

const LicenseClasses = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <SEO
        title="Führerscheinklassen – Fahrschule Metropol | Dein Weg zur Freiheit"
        description="Alle Führerscheinklassen bei Fahrschule Metropol: PKW, Motorrad, Anhänger & mehr. Finde deinen Weg zur Freiheit – in Hannover, Bremen & Garbsen."
        canonical="https://fahrschule-metropol.de/fuehrerscheinklassen"
      />

      {/* Premium Hero with image */}
      <section className="relative overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img src={classPkw} alt="Metropol Fahrschulwagen" className="h-full w-full object-cover" />
        </div>
        <div className="hero-overlay absolute inset-0 noise" />
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/8 blur-[150px]" />

        <div className="container relative z-10 mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">14 Klassen · 3 Standorte</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-6 text-5xl font-extrabold leading-[1.05] text-primary-foreground font-display md:text-7xl"
            >
              Wähle deinen Weg
              <br />
              <span className="gradient-text">zur Freiheit.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-10 max-w-xl text-lg text-primary-foreground/60 leading-relaxed"
            >
              Auto, Motorrad, LKW, Bus oder Anhänger – jede Reise beginnt mit dem ersten Schritt. 
              Finde die Klasse, die zu deinem Leben passt.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-6 text-sm"
            >
              {[
                { icon: Shield, text: "98% Bestehensquote" },
                { icon: Zap, text: "Flexible Termine" },
                { icon: Clock, text: "Schnelle Ausbildung" },
              ].map((item) => (
                <span key={item.text} className="flex items-center gap-2 text-primary-foreground/40">
                  <item.icon className="h-4 w-4 text-primary/70" />
                  {item.text}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="relative py-20 md:py-28 bg-warm bg-driving-pattern overflow-hidden">
        <div className="container relative z-10 mx-auto px-4">
          {/* Popular Classes - Featured with images */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Meistgebucht</span>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 mb-16">
            {classes.filter(c => c.popular).map((c, i) => (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Link to={`/fuehrerschein/${c.slug}`} className="block h-full">
                  <div className="group relative h-full overflow-hidden rounded-3xl border border-primary/20 bg-card transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-card-hover">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={categoryImages[c.category]} 
                        alt={c.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                      {/* Popular badge */}
                      <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center gap-1 rounded-full gradient-primary px-3 py-1 text-[10px] font-bold text-primary-foreground uppercase tracking-wider shadow-cta">
                          <Zap className="h-3 w-3" /> Beliebt
                        </span>
                      </div>
                    </div>

                    <div className="relative p-8 pt-4">
                      {/* Glow effect */}
                      <div className={`absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br ${c.gradient} opacity-0 blur-[80px] transition-opacity duration-700 group-hover:opacity-20`} />

                      <div className="mb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground/50">
                        {c.minAge}
                      </div>
                      <h3 className="mb-1 text-2xl font-extrabold text-foreground font-display md:text-3xl">
                        {c.name}
                      </h3>
                      <p className="mb-3 text-sm font-semibold text-primary">{c.subtitle}</p>
                      <p className="mb-6 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>

                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-all duration-300 group-hover:gap-3">
                          {c.cta} <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* All other classes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Alle Klassen</span>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {classes.filter(c => !c.popular).map((c, i) => (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
              >
                <Link to={`/fuehrerschein/${c.slug}`} className="block h-full">
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-card-hover">
                    {/* Small image strip */}
                    <div className="relative h-32 overflow-hidden">
                      <img 
                        src={categoryImages[c.category]} 
                        alt={c.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                    </div>

                    <div className="relative z-10 p-7 pt-3">
                      {/* Subtle glow */}
                      <div className={`absolute -top-16 -right-16 h-32 w-32 rounded-full bg-gradient-to-br ${c.gradient} opacity-0 blur-[60px] transition-opacity duration-700 group-hover:opacity-15`} />

                      <div className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/40">
                        {c.minAge}
                      </div>
                      <h3 className="mb-1 text-lg font-extrabold text-foreground font-display">{c.name}</h3>
                      <p className="mb-2 text-xs font-semibold text-primary">{c.subtitle}</p>
                      <p className="mb-5 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>

                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:gap-2.5">
                          {c.cta} <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden gradient-dark py-24 noise">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/8 blur-[150px]" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className="mx-auto mb-4 h-8 w-8 text-primary/60" />
            <h2 className="mb-5 text-3xl font-extrabold text-primary-foreground font-display md:text-5xl lg:text-6xl">
              Noch unsicher?
              <br />
              <span className="gradient-text">Wir beraten dich.</span>
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-lg text-primary-foreground/40">
              Du weißt nicht genau, welche Klasse zu dir passt? Kein Problem – ruf an oder schreib uns. 
              Wir finden gemeinsam den richtigen Weg für dich.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="hero" asChild>
                <Link to="/kontakt">
                  Kostenlos beraten lassen <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" asChild>
                <a href="tel:+4942112345">
                  Jetzt anrufen
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