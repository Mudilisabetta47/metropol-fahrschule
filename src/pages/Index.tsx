import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car, Bike, Truck, CalendarCheck, MapPin, ArrowRight, Shield, Users, Star, ChevronDown, ChevronRight, Phone, CheckCircle, Gauge, Route, BadgeCheck } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useCountUp } from "@/hooks/useCountUp";
import SEO from "@/components/SEO";
import heroImage from "@/assets/hero-driving.jpg";

const locationPills = ["Bremen", "Garbsen", "Hannover"];

const features = [
  { icon: Gauge, title: "Theorie & Praxis", desc: "Modernster Theorieunterricht mit App-Unterstützung und praxisnahe Fahrstunden auf echten Prüfungsstrecken." },
  { icon: Car, title: "Moderne Fahrschulwagen", desc: "Doppelbediente Fahrzeuge der neuesten Generation – VW, BMW & Mercedes mit modernster Sicherheitsausstattung." },
  { icon: CalendarCheck, title: "Flexible Fahrstunden", desc: "Fahrstunden, die sich deinem Alltag anpassen – auch abends und am Wochenende. Online-Buchung möglich." },
];

const licenseClasses = [
  { icon: Car, label: "Klasse B", desc: "PKW-Führerschein", path: "/fuehrerscheinklassen" },
  { icon: Car, label: "B197 / B196", desc: "Automatik & 125ccm", path: "/fuehrerscheinklassen" },
  { icon: Bike, label: "Klasse A", desc: "Motorrad", path: "/fuehrerscheinklassen" },
  { icon: Truck, label: "Klasse BE", desc: "Anhänger", path: "/fuehrerscheinklassen" },
];

const locations = [
  { name: "Bremen", addr: "Musterstraße 1, 28195 Bremen", path: "/standorte/bremen", desc: "Unser Hauptstandort im Herzen der Hansestadt." },
  { name: "Garbsen", addr: "Hauptstraße 10, 30823 Garbsen", path: "/standorte/garbsen", desc: "Zentral gelegen mit eigenem Übungsplatz." },
  { name: "Hannover", addr: "Georgstraße 5, 30159 Hannover", path: "/standorte/hannover", desc: "Bestens erreichbar in der Landeshauptstadt." },
];

const trustItems = [
  { icon: CheckCircle, text: "TÜV-geprüfte Ausbildung" },
  { icon: BadgeCheck, text: "Hohe Erstbestehensquote" },
  { icon: Route, text: "Prüfungsstrecken-Training" },
  { icon: Shield, text: "Keine versteckten Kosten" },
];

const AnimatedPills = () => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setActive((a) => (a + 1) % locationPills.length), 2500);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex gap-2">
      {locationPills.map((l, i) => (
        <motion.span
          key={l}
          animate={{
            scale: i === active ? 1.05 : 1,
            opacity: i === active ? 1 : 0.6,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-300 ${
            i === active ? "gradient-primary text-primary-foreground shadow-cta" : "bg-primary-foreground/10 text-primary-foreground/70 backdrop-blur-sm"
          }`}
        >
          <MapPin className="inline h-3.5 w-3.5 mr-1 -mt-0.5" />{l}
        </motion.span>
      ))}
    </div>
  );
};

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const stat1 = useCountUp(5000, 2000);
  const stat2 = useCountUp(98, 1800);
  const stat3 = useCountUp(15, 1500);

  const seoJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "DrivingSchool",
      name: "Fahrschule Metropol",
      url: "https://fahrschule-metropol.de",
      telephone: "+4942112345",
      email: "info@fahrschule-metropol.de",
      description: "Professionelle Fahrausbildung in Bremen, Garbsen und Hannover.",
      address: [
        { "@type": "PostalAddress", streetAddress: "Musterstraße 1", addressLocality: "Bremen", postalCode: "28195", addressCountry: "DE" },
        { "@type": "PostalAddress", streetAddress: "Hauptstraße 10", addressLocality: "Garbsen", postalCode: "30823", addressCountry: "DE" },
        { "@type": "PostalAddress", streetAddress: "Georgstraße 5", addressLocality: "Hannover", postalCode: "30159", addressCountry: "DE" },
      ],
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "347" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [{ "@type": "ListItem", position: 1, name: "Startseite", item: "https://fahrschule-metropol.de/" }],
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Fahrschule Metropol – Deine Fahrschule in Bremen, Garbsen & Hannover"
        description="Professionelle Fahrausbildung für alle Klassen. 98% Bestehensquote, moderne Fahrzeuge, flexible Termine. Jetzt anmelden!"
        canonical="https://fahrschule-metropol.de/"
        jsonLd={seoJsonLd}
      />

      {/* Hero */}
      <section ref={heroRef} className="relative flex min-h-screen items-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img
            src={heroImage}
            alt="Fahrschule Metropol – Modernes Fahrschulauto auf grüner Landstraße"
            className="h-full w-full object-cover"
            loading="eager"
          />
        </motion.div>
        <div className="hero-overlay absolute inset-0 noise" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="container relative z-10 mx-auto px-4 pt-20"
        >
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <AnimatedPills />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mb-6 text-5xl font-extrabold leading-[1.08] text-primary-foreground font-display md:text-7xl lg:text-8xl"
            >
              Führerschein
              <br />
              <span className="gradient-text">machen.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-10 max-w-xl text-lg text-primary-foreground/60 leading-relaxed md:text-xl"
            >
              Deine Fahrschule in Bremen, Garbsen & Hannover. PKW, Motorrad oder Anhänger – wir bringen dich sicher durch Theorie & Praxis.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <Button variant="hero" asChild>
                <Link to="/kontakt">
                  Jetzt anmelden <ChevronRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" asChild>
                <a href="tel:+4942112345">
                  <Phone className="h-5 w-5" /> Rückruf anfordern
                </a>
              </Button>
            </motion.div>

            {/* Trust badges inline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-12 flex flex-wrap gap-x-6 gap-y-2"
            >
              {trustItems.map((t) => (
                <span key={t.text} className="flex items-center gap-1.5 text-xs text-primary-foreground/40">
                  <t.icon className="h-3.5 w-3.5 text-primary/70" /> {t.text}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
          <ChevronDown className="h-6 w-6 text-primary-foreground/30" />
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 -mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { ref: stat1.ref, value: `${stat1.count.toLocaleString("de-DE")}+`, label: "Erfolgreiche Fahrschüler", icon: Users },
              { ref: stat2.ref, value: `${stat2.count}%`, label: "Bestehensquote", icon: Shield },
              { ref: stat3.ref, value: `${stat3.count}+`, label: "Jahre Erfahrung", icon: Star },
            ].map((s) => (
              <motion.div
                key={s.label}
                ref={s.ref}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-all duration-300 group-hover:gradient-primary group-hover:text-primary-foreground group-hover:shadow-glow">
                  <s.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-foreground font-display">{s.value}</div>
                  <div className="text-xs text-muted-foreground font-medium">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* License Classes Quick Access */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">Führerscheinklassen</span>
            <h2 className="text-3xl font-extrabold text-foreground font-display md:text-5xl">
              Welchen Führerschein brauchst du?
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {licenseClasses.map((lc, i) => (
              <motion.div
                key={lc.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={lc.path}
                  className="group flex flex-col items-center gap-3 rounded-3xl border border-border bg-card p-6 text-center shadow-card transition-all duration-500 hover:shadow-card-hover hover:-translate-y-1"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-accent-foreground transition-all duration-500 group-hover:gradient-primary group-hover:text-primary-foreground group-hover:shadow-glow group-hover:scale-110">
                    <lc.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground font-display">{lc.label}</div>
                    <div className="text-xs text-muted-foreground">{lc.desc}</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <Link to="/fuehrerscheinklassen" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:gap-2.5 transition-all">
              Alle Klassen ansehen <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features / Why us */}
      <section className="gradient-section py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 max-w-2xl"
          >
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">Deine Fahrschule</span>
            <h2 className="text-3xl font-extrabold text-foreground font-display md:text-5xl">
              So läuft's bei Metropol
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative rounded-3xl border border-border bg-card p-8 shadow-card transition-all duration-500 hover:shadow-card-hover hover:-translate-y-1"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground transition-all duration-500 group-hover:gradient-primary group-hover:text-primary-foreground group-hover:shadow-glow group-hover:scale-110">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-foreground font-display">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">Standorte</span>
            <h2 className="text-3xl font-extrabold text-foreground font-display md:text-5xl">
              3× in deiner Nähe
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {locations.map((loc, i) => (
              <motion.div
                key={loc.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
              >
                <Link
                  to={loc.path}
                  className="group flex h-full flex-col rounded-3xl border border-border bg-card p-8 shadow-card transition-all duration-500 hover:shadow-card-hover hover:-translate-y-2"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground transition-all duration-500 group-hover:gradient-primary group-hover:text-primary-foreground">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <h3 className="mb-1 text-2xl font-bold text-foreground font-display">{loc.name}</h3>
                  <p className="mb-1 text-sm text-muted-foreground">{loc.addr}</p>
                  <p className="mb-6 text-sm text-muted-foreground/70">{loc.desc}</p>
                  <span className="mt-auto flex items-center gap-1.5 text-sm font-bold text-primary transition-all group-hover:gap-2.5">
                    Standort entdecken <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ablauf / How it works */}
      <section className="gradient-section py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">In 4 Schritten</span>
            <h2 className="text-3xl font-extrabold text-foreground font-display md:text-5xl">
              Dein Weg zum Führerschein
            </h2>
          </motion.div>

          <div className="relative grid gap-6 md:grid-cols-4">
            {/* Connecting road line */}
            <div className="absolute top-12 left-[12.5%] right-[12.5%] hidden h-0.5 bg-border md:block">
              <div className="absolute inset-0 gradient-primary opacity-30" />
              <div className="absolute top-1/2 left-0 h-3 w-3 -translate-y-1/2 rounded-full bg-primary shadow-glow" />
              <div className="absolute top-1/2 right-0 h-3 w-3 -translate-y-1/2 rounded-full bg-primary shadow-glow" />
            </div>
            {[
              { step: "01", title: "Anmelden", desc: "Online oder vor Ort – schnell & unkompliziert." },
              { step: "02", title: "Theorie lernen", desc: "Theorieunterricht + Lern-App für die Theorieprüfung." },
              { step: "03", title: "Fahrstunden", desc: "Übungs- und Sonderfahrten mit deinem Fahrlehrer." },
              { step: "04", title: "Prüfung bestehen", desc: "Theorie- & Praxisprüfung – und der Lappen ist deiner!" },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative text-center"
              >
                <div className="relative z-10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-card border border-border shadow-card">
                  <span className="text-lg font-extrabold text-primary font-display">{s.step}</span>
                </div>
                <h3 className="mb-1 text-lg font-bold text-foreground font-display">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden gradient-dark py-28 noise">
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-5 text-3xl font-extrabold text-primary-foreground font-display md:text-5xl lg:text-6xl">
              Bereit für deinen
              <br />
              <span className="gradient-text">Führerschein?</span>
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-lg text-primary-foreground/50">
              Starte jetzt deine Ausbildung bei Fahrschule Metropol – an allen 3 Standorten. Theorie, Praxis & Prüfung aus einer Hand.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="hero" asChild>
                <Link to="/kontakt">
                  Jetzt anmelden <ChevronRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" asChild>
                <Link to="/fuehrerscheinklassen">Führerscheinklassen</Link>
              </Button>
            </div>
          </motion.div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
      </section>
    </div>
  );
};

export default Index;
