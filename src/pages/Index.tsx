import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Car,
  Bike,
  Truck,
  CalendarCheck,
  MapPin,
  ArrowRight,
  Shield,
  Users,
  Star,
  ChevronDown,
  ChevronRight,
  Phone,
  CheckCircle,
  Gauge,
  Route,
  BadgeCheck,
  Heart,
  Quote,
  Sparkles,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useCountUp } from "@/hooks/useCountUp";
import SEO from "@/components/SEO";

const locationPills = ["Hannover", "Garbsen", "Bremen"];

const features = [
  {
    icon: Heart,
    title: "Wir glauben an dich",
    desc: "Egal ob du nervös bist oder schon voller Vorfreude – wir nehmen uns Zeit für dich. Kein Druck, kein Stress. Nur du, dein Fahrlehrer und dein Tempo.",
  },
  {
    icon: Car,
    title: "Fahrzeuge, die Spaß machen",
    desc: "Unsere Flotte? Nagelneu. BMW, VW, Mercedes – mit Doppelbedienung und allem, was dich sicher fühlen lässt. Du wirst dich auf jede Fahrstunde freuen.",
  },
  {
    icon: CalendarCheck,
    title: "Dein Leben, dein Zeitplan",
    desc: "Schule, Job, Freizeit – wir passen uns an. Fahrstunden auch abends und samstags. Online buchen, umbuchen, fertig.",
  },
];

const licenseClasses = [
  { icon: Car, label: "Klasse B", desc: "Dein Autoführerschein", path: "/fuehrerschein/klasse-b" },
  { icon: Bike, label: "Klasse A", desc: "Freiheit auf zwei Rädern", path: "/fuehrerschein/klasse-a" },
  { icon: Truck, label: "LKW (C/CE)", desc: "Güterverkehr & Logistik", path: "/fuehrerschein/klasse-c" },
  { icon: Truck, label: "Bus (D)", desc: "Personenverkehr", path: "/fuehrerschein/klasse-d" },
];

const locations = [
  {
    name: "Hannover",
    addr: "Vahrenwalder Str. 213, 30165 Hannover",
    path: "/standorte/hannover",
    desc: "Unser erster Standort – zentral und bestens erreichbar.",
  },
  {
    name: "Garbsen",
    addr: "Planetenring 25–27, 30823 Garbsen",
    path: "/standorte/garbsen",
    desc: "Familiäre Atmosphäre, gut erreichbar mit ÖPNV.",
  },
  {
    name: "Bremen",
    addr: "Bahnhofsplatz 41, 28195 Bremen",
    path: "/standorte/bremen",
    desc: "Mitten im Herzen der Hansestadt – direkt am Bahnhof.",
  },
];

const trustItems = [
  { icon: CheckCircle, text: "Zertifizierte Ausbildung" },
  { icon: BadgeCheck, text: "Hohe Erstbestehensquote" },
  { icon: Route, text: "Prüfungsstrecken-Training" },
  { icon: Shield, text: "Keine versteckten Kosten" },
];

const testimonials = [
  {
    name: "Lena M.",
    location: "Bremen",
    text: "Ich hatte richtig Angst vor dem Fahren. Mein Fahrlehrer Kai hat das sofort gemerkt und mir die Nervosität komplett genommen. Nach 3 Wochen hab ich mich aufs Fahren gefreut!",
    rating: 5,
  },
  {
    name: "Timo K.",
    location: "Hannover",
    text: "Bestanden beim ersten Mal – Theorie UND Praxis! Die App zum Lernen war mega, und mein Fahrlehrer hat mich perfekt auf die Prüfungsstrecken vorbereitet.",
    rating: 5,
  },
  {
    name: "Sarah & Jonas",
    location: "Garbsen",
    text: "Wir haben beide gleichzeitig unseren Führerschein bei Metropol gemacht. Super Team, flexible Termine, und die Stimmung ist einfach top. Absolute Empfehlung!",
    rating: 5,
  },
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
            i === active
              ? "gradient-primary text-primary-foreground shadow-cta"
              : "bg-primary-foreground/10 text-primary-foreground/70 backdrop-blur-sm"
          }`}
        >
          <MapPin className="inline h-3.5 w-3.5 mr-1 -mt-0.5" />
          {l}
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

  const stat1 = useCountUp(15000, 2000);
  const stat2 = useCountUp(98, 1800);
  const stat3 = useCountUp(20, 1500);

  const seoJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "DrivingSchool",
      name: "Fahrschule Metropol",
      url: "https://fahrschule-metropol.de",
      telephone: "+495116425066",
      email: "info@metropol-bz.de",
      description: "Professionelle Fahrausbildung in Hannover, Garbsen und Bremen.",
      address: [
        {
          "@type": "PostalAddress",
          streetAddress: "Vahrenwalder Str. 213",
          addressLocality: "Hannover",
          postalCode: "30165",
          addressCountry: "DE",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "Planetenring 25–27",
          addressLocality: "Garbsen",
          postalCode: "30823",
          addressCountry: "DE",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "Bahnhofsplatz 41",
          addressLocality: "Bremen",
          postalCode: "28195",
          addressCountry: "DE",
        },
      ],
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "347" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Startseite", item: "https://fahrschule-metropol.de/" },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Fahrschule Metropol – Dein Führerschein in Hannover, Garbsen & Bremen"
        description="Endlich Führerschein! Bei Fahrschule Metropol lernst du in deinem Tempo, mit Fahrlehrern die dich verstehen. 98% bestehen beim ersten Mal."
        canonical="https://fahrschule-metropol.de/"
        jsonLd={seoJsonLd}
      />

      {/* Hero */}
      <section ref={heroRef} className="relative flex min-h-screen items-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/lLDmN1AnqgE?autoplay=1&mute=1&loop=1&playlist=lLDmN1AnqgE&controls=0&showinfo=0&modestbranding=1&rel=0&disablekb=1&iv_load_policy=3&playsinline=1"
            title="Fahrschule Metropol"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300vw] h-[300vh] min-w-[300vw] min-h-[300vh] md:w-[177.78vh] md:h-[56.25vw] md:min-w-full md:min-h-full"
            style={{ border: 0 }}
          />
        </motion.div>
        <div className="hero-overlay absolute inset-0 noise" />

        <motion.div style={{ opacity: heroOpacity }} className="container relative z-10 mx-auto px-4 pt-20">
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
              Dein erstes Mal
              <br />
              <span className="gradient-text">hinterm Steuer.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-10 max-w-xl text-lg text-primary-foreground/60 leading-relaxed md:text-xl"
            >
              Das Kribbeln, wenn du zum ersten Mal alleine fährst. Dieses Gefühl schaffen wir zusammen – mit Geduld,
              Erfahrung und Fahrlehrern, die dich wirklich verstehen.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <Button variant="hero" asChild>
                <Link to="/kontakt">
                  Kostenlos beraten lassen <ChevronRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" asChild>
                <a href="tel:+495116425066">
                  <Phone className="h-5 w-5" /> Direkt anrufen
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

      {/* Marquee trust banner */}
      <section className="relative z-10 -mt-16 mb-8">
        <div className="container mx-auto px-4">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            <div className="relative overflow-hidden py-4">
              <div className="marquee-track">
                {[...Array(2)].map((_, setIdx) => (
                  <div key={setIdx} className="flex shrink-0 items-center gap-8 px-4">
                    {[
                      "✅ Hohe Erstbestehensquote",
                      "🚗 Moderne BMW-Flotte",
                      "📍 3 Standorte",
                      "⭐ 4.9/5 Bewertung",
                      "🎯 Prüfungsstrecken-Training",
                      "💚 Flexible Zeiten",
                      "🏆 20+ Jahre Erfahrung",
                      "📱 Online-Buchung",
                    ].map((item) => (
                      <span key={item} className="whitespace-nowrap text-sm font-semibold text-muted-foreground">
                        {item}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                ref: stat1.ref,
                value: `${stat1.count.toLocaleString("de-DE")}+`,
                label: "Fahrschüler, die es geschafft haben",
                icon: Users,
              },
              { ref: stat2.ref, value: `${stat2.count}%`, label: "bestehen beim ersten Anlauf", icon: Shield },
              { ref: stat3.ref, value: `${stat3.count}+`, label: "Jahre Leidenschaft fürs Fahren", icon: Star },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                ref={s.ref}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-foreground transition-all duration-500 group-hover:gradient-primary group-hover:text-primary-foreground group-hover:shadow-glow group-hover:scale-110">
                  <s.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-foreground font-display">{s.value}</div>
                  <div className="text-xs text-muted-foreground font-medium">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Storytelling intro */}
      <section className="relative py-24 bg-warm bg-driving-pattern overflow-hidden">
        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Sparkles className="mx-auto mb-4 h-8 w-8 text-primary" />
              <h2 className="mb-6 text-3xl font-extrabold text-foreground font-display md:text-5xl">
                Mehr als nur eine Fahrschule
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Wir wissen, wie aufregend der erste Führerschein ist. Und wie viel Überwindung es manchmal kostet. Genau
                deshalb sind wir anders: Bei Metropol bist du keine Nummer. Du bist{" "}
                <strong className="text-foreground">Teil unserer Geschichte</strong> – und wir begleiten dich von der
                allerersten Theoriestunde bis zu dem Moment, wo du den Schlüssel in der Hand hältst und weißt:
                <em className="text-primary"> Ich hab's geschafft.</em>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* License Classes Quick Access */}
      <section className="gradient-section py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Dein Weg
            </span>
            <h2 className="text-3xl font-extrabold text-foreground font-display md:text-5xl">
              Welches Abenteuer wartet auf dich?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Auto, Motorrad oder beides? Finde die Klasse, die zu deinem Leben passt.
            </p>
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
            <Link
              to="/fuehrerscheinklassen"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:gap-2.5 transition-all"
            >
              Alle Klassen entdecken <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features / Why us */}
      <section className="relative py-28 bg-warm bg-driving-pattern overflow-hidden">
        <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-primary/5 blur-[100px]" />
        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 max-w-2xl"
          >
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Warum Metropol?
            </span>
            <h2 className="text-3xl font-extrabold text-foreground font-display md:text-5xl">
              Weil wir wissen, wie sich der erste Gang anfühlt
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Jeder von uns war mal Fahranfänger. Deshalb wissen wir genau, was du brauchst – und was nicht.
            </p>
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

      {/* Testimonials */}
      <section className="gradient-section py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Echte Stimmen
            </span>
            <h2 className="text-3xl font-extrabold text-foreground font-display md:text-5xl">
              Was unsere Fahrschüler sagen
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Keine Marketing-Floskeln – echte Erfahrungen von echten Menschen.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative rounded-3xl border border-border bg-card p-8 shadow-card"
              >
                <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/10" />
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground italic">„{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary text-primary-foreground text-sm font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">{t.name}</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" /> {t.location}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="relative py-28 bg-warm bg-driving-pattern overflow-hidden">
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-primary/5 blur-[100px]" />
        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Immer in deiner Nähe
            </span>
            <h2 className="text-3xl font-extrabold text-foreground font-display md:text-5xl">3 Standorte, 1 Familie</h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Egal wo du wohnst – bei uns bist du immer willkommen. Komm vorbei und lern uns kennen!
            </p>
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
                    Standort entdecken{" "}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
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
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Schritt für Schritt
            </span>
            <h2 className="text-3xl font-extrabold text-foreground font-display md:text-5xl">
              Vom Traum zum Führerschein
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Vier Schritte. Ein Ziel. Und wir an deiner Seite – bei jedem einzelnen.
            </p>
          </motion.div>

          <div className="relative grid gap-6 md:grid-cols-4">
            {/* Connecting road line */}
            <div className="absolute top-12 left-[12.5%] right-[12.5%] hidden h-0.5 bg-border md:block">
              <div className="absolute inset-0 gradient-primary opacity-30" />
              <div className="absolute top-1/2 left-0 h-3 w-3 -translate-y-1/2 rounded-full bg-primary shadow-glow" />
              <div className="absolute top-1/2 right-0 h-3 w-3 -translate-y-1/2 rounded-full bg-primary shadow-glow" />
            </div>
            {[
              {
                step: "01",
                title: "Sag Hallo",
                desc: "Meld dich online oder komm vorbei. Wir nehmen uns Zeit für deine Fragen – ganz ohne Druck.",
              },
              {
                step: "02",
                title: "Theorie rocken",
                desc: "Spannender Unterricht + smarte Lern-App. So macht Theorie tatsächlich Spaß.",
              },
              {
                step: "03",
                title: "Ans Steuer",
                desc: "Dein Fahrlehrer zeigt dir alles. In deinem Tempo, auf echten Prüfungsstrecken.",
              },
              {
                step: "04",
                title: "Führerschein! 🎉",
                desc: "Du hast es geschafft! Jetzt steht dir die Welt offen – und wir feiern mit dir.",
              },
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
              Bereit für dein
              <br />
              <span className="gradient-text">größtes Abenteuer?</span>
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-lg text-primary-foreground/50">
              Der Führerschein ist mehr als ein Dokument – er ist Freiheit, Unabhängigkeit und dein erster großer
              Schritt. Lass uns ihn zusammen gehen.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="hero" asChild>
                <Link to="/kontakt">
                  Jetzt kostenlos beraten lassen <ChevronRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" asChild>
                <Link to="/fuehrerscheinklassen">Alle Klassen entdecken</Link>
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
