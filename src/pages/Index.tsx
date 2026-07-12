import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";
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
import classPkw from "@/assets/class-pkw.jpg";
import classMotorrad from "@/assets/class-motorrad.jpg";
import classLkw from "@/assets/class-lkw.jpg";
import classBus from "@/assets/class-bus.jpg";
import locationHannover from "@/assets/location-hannover.jpg";
import locationGarbsen from "@/assets/location-garbsen.jpg";
import locationBremen from "@/assets/location-bremen.jpg";
import heroDriving from "@/assets/hero-driving.jpg";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useCountUp } from "@/hooks/useCountUp";
import { useSiteImages } from "@/hooks/useSiteImage";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import SplitText from "@/components/premium/SplitText";
import MagneticButton from "@/components/premium/MagneticButton";
import TiltCard from "@/components/premium/TiltCard";
import FloatingOrbs from "@/components/premium/FloatingOrbs";
import Reveal from "@/components/premium/Reveal";


const locationPills = ["Hannover", "Garbsen", "Bremen"];

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
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const stat1 = useCountUp(15000, 2000);
  const stat2 = useCountUp(98, 1800);
  const stat3 = useCountUp(20, 1500);

  const img = useSiteImages({
    "class-pkw": classPkw, "class-motorrad": classMotorrad,
    "class-lkw": classLkw, "class-bus": classBus,
    "location-hannover": locationHannover, "location-garbsen": locationGarbsen,
    "location-bremen": locationBremen, "hero-index": heroDriving,
  });

  const features = [
    { icon: Heart, title: t("index.feature1Title"), desc: t("index.feature1Desc") },
    { icon: Car, title: t("index.feature2Title"), desc: t("index.feature2Desc") },
    { icon: CalendarCheck, title: t("index.feature3Title"), desc: t("index.feature3Desc") },
  ];

  const licenseClasses = [
    { icon: Car, label: t("index.classB"), desc: t("index.classBDesc"), path: "/fuehrerschein/klasse-b", imageKey: "class-pkw" as const },
    { icon: Bike, label: t("index.classA"), desc: t("index.classADesc"), path: "/fuehrerschein/klasse-a", imageKey: "class-motorrad" as const },
    { icon: Truck, label: t("index.classC"), desc: t("index.classCDesc"), path: "/fuehrerschein/klasse-c", imageKey: "class-lkw" as const },
    { icon: Truck, label: t("index.classD"), desc: t("index.classDDesc"), path: "/fuehrerschein/klasse-d", imageKey: "class-bus" as const },
  ];

  const locationsData = [
    { name: "Hannover", addr: "Engelbosteler Damm 1, 30167 Hannover", path: "/standorte/hannover", desc: t("index.locationHannover"), imageKey: "location-hannover" as const },
    { name: "Garbsen", addr: "Planetenring 25–27, 30823 Garbsen", path: "/standorte/garbsen", desc: t("index.locationGarbsen"), imageKey: "location-garbsen" as const },
    { name: "Bremen", addr: "Bahnhofsplatz 41, 28195 Bremen", path: "/standorte/bremen", desc: t("index.locationBremen"), imageKey: "location-bremen" as const },
  ];

  const trustItems = [
    { icon: CheckCircle, text: t("index.trustCertified") },
    { icon: BadgeCheck, text: t("index.trustFirstTime") },
    { icon: Route, text: t("index.trustRoutes") },
    { icon: Shield, text: t("index.trustNoCosts") },
  ];

  const testimonials = [
    { name: "Lena M.", location: "Bremen", text: t("index.testimonial1"), rating: 5 },
    { name: "Timo K.", location: "Hannover", text: t("index.testimonial2"), rating: 5 },
    { name: "Sarah & Jonas", location: "Garbsen", text: t("index.testimonial3"), rating: 5 },
  ];

  const marqueeItems = [
    t("index.marquee1"), t("index.marquee2"), t("index.marquee3"), t("index.marquee4"),
    t("index.marquee5"), t("index.marquee6"), t("index.marquee7"), t("index.marquee8"),
  ];

  const steps = [
    { step: "01", title: t("index.step1Title"), desc: t("index.step1Desc") },
    { step: "02", title: t("index.step2Title"), desc: t("index.step2Desc") },
    { step: "03", title: t("index.step3Title"), desc: t("index.step3Desc") },
    { step: "04", title: t("index.step4Title"), desc: t("index.step4Desc") },
  ];

  const seoJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "additionalType": "https://schema.org/DrivingSchool",
      name: "Fahrschule Metropol",
      "legalName": "Fahrschule Metropol - Inh. Vedat Özel",
      url: "https://fahrschule-metropol.de",
      telephone: "+495116425066",
      email: "info@metropol-bz.de",
      description: "Professionelle Fahrausbildung in Hannover, Garbsen und Bremen. Alle Führerscheinklassen, Erste-Hilfe-Kurse und Aufbauseminare.",
      foundingDate: "2003",
      priceRange: "€€",
      currenciesAccepted: "EUR",
      paymentAccepted: "Cash, EC Card, Bank Transfer",
      areaServed: [
        { "@type": "City", name: "Hannover" },
        { "@type": "City", name: "Garbsen" },
        { "@type": "City", name: "Bremen" },
      ],
      address: [
        { "@type": "PostalAddress", streetAddress: "Engelbosteler Damm 1", addressLocality: "Hannover", postalCode: "30167", addressRegion: "NI", addressCountry: "DE" },
        { "@type": "PostalAddress", streetAddress: "Planetenring 25–27", addressLocality: "Garbsen", postalCode: "30823", addressRegion: "NI", addressCountry: "DE" },
        { "@type": "PostalAddress", streetAddress: "Bahnhofsplatz 41", addressLocality: "Bremen", postalCode: "28195", addressRegion: "HB", addressCountry: "DE" },
      ],
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "13:30" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "14:30", closes: "19:00" },
      ],
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "347", bestRating: "5" },
      sameAs: [
        "https://www.instagram.com/fahrschulemetropol/",
        "https://www.facebook.com/p/Fahrschule-Metropol-100037905975615/",
        "https://www.tiktok.com/@fahrschulemetropol",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Führerscheinklassen",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Führerschein Klasse B", url: "https://fahrschule-metropol.de/fuehrerschein/klasse-b" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Führerschein Klasse B197", url: "https://fahrschule-metropol.de/fuehrerschein/klasse-b197" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Motorrad Klasse A", url: "https://fahrschule-metropol.de/fuehrerschein/klasse-a" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "LKW Klasse C/CE", url: "https://fahrschule-metropol.de/fuehrerschein/klasse-c" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bus Klasse D", url: "https://fahrschule-metropol.de/fuehrerschein/klasse-d" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Erste-Hilfe-Kurs", url: "https://fahrschule-metropol.de/erste-hilfe" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Aufbauseminar", url: "https://fahrschule-metropol.de/aufbauseminar" } },
        ],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Startseite", item: "https://fahrschule-metropol.de/" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Fahrschule Metropol",
      url: "https://fahrschule-metropol.de",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://fahrschule-metropol.de/fuehrerscheinklassen",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Wie lange dauert ein Führerschein-Crashkurs?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ein Führerschein-Crashkurs bei Fahrschule Metropol dauert in der Regel 2 bis 4 Wochen. In dieser Zeit absolvierst du Theorie- und Praxisunterricht intensiv, oft täglich, sodass du deinen Führerschein deutlich schneller als im klassischen Modell erhältst.",
          },
        },
        {
          "@type": "Question",
          name: "Kann ich den Führerschein in 2 Wochen machen?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ja, mit einem Intensivkurs ist der Führerschein Klasse B in ca. 2 Wochen möglich, vorausgesetzt du hast bereits einen Sehtest und Erste-Hilfe-Kurs absolviert. Wir bieten Schnellkurse an unseren Standorten Hannover, Garbsen und Bremen an.",
          },
        },
        {
          "@type": "Question",
          name: "Was kostet ein Führerschein-Crashkurs?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Die Kosten für einen Führerschein-Crashkurs Klasse B liegen bei Fahrschule Metropol je nach individuellem Lernfortschritt und Anzahl der benötigten Fahrstunden zwischen 2.500 € und 3.500 €. Eine genaue Kostenaufstellung erhältst du nach einem unverbindlichen Beratungsgespräch.",
          },
        },
        {
          "@type": "Question",
          name: "Was ist der Unterschied zwischen Crashkurs und normalem Kurs?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Beim Crashkurs absolvierst du Theorie und Praxis komprimiert in 2–4 Wochen statt 3–6 Monaten. Der Stundenumfang und die Prüfungsanforderungen sind identisch – du lernst nur deutlich intensiver und schneller.",
          },
        },
        {
          "@type": "Question",
          name: "Welche Voraussetzungen brauche ich für einen Intensivkurs?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Für einen Intensivkurs benötigst du: Mindestalter (17 für BF17, 18 für Klasse B), gültigen Sehtest, Erste-Hilfe-Bescheinigung, biometrisches Passfoto und einen Antrag bei der Führerscheinstelle. Wir helfen dir bei allen Formalitäten.",
          },
        },
        {
          "@type": "Question",
          name: "Bietet Fahrschule Metropol Crashkurse in Hannover, Garbsen und Bremen an?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ja, wir bieten Crashkurse, Intensivkurse und Schnellkurse an allen drei Standorten an: Hannover (Engelbosteler Damm 1), Garbsen (Planetenring 25–27) und Bremen (Bahnhofsplatz 41). Auch Ferienkurse und Wochenend-Intensivkurse sind möglich.",
          },
        },
        {
          "@type": "Question",
          name: "Kann ich auch einen Motorrad-Crashkurs machen?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ja, wir bieten Schnellkurse für die Motorradklassen A, A1, A2 und B196 an. Die Kursdauer beträgt je nach Vorerfahrung 1–3 Wochen. Ideal für die Motorradsaison im Frühjahr.",
          },
        },
        {
          "@type": "Question",
          name: "Wie schnell bekomme ich einen Termin für den Intensivkurs?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "In der Regel kannst du innerhalb von 1–2 Wochen mit deinem Intensivkurs starten. Kontaktiere uns telefonisch unter 0511 6425066 oder per Online-Anfrage – wir finden den passenden Starttermin für dich.",
          },
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title={t("index.seoTitle")}
        description={t("index.seoDesc")}
        canonical="https://fahrschule-metropol.de/"
        jsonLd={seoJsonLd}
        keywords="Fahrschule Hannover, Fahrschule Bremen, Fahrschule Garbsen, Führerschein Hannover, Führerschein Bremen, Fahrschule Metropol, Führerschein machen, Fahrschule in der Nähe, Klasse B Hannover, Motorradführerschein Hannover, LKW Führerschein Bremen, Fahrschule Niedersachsen, Intensivkurs Fahrschule, BF17 Hannover, Automatik Führerschein, B197 Hannover, Führerschein anmelden, Fahrschule anmelden online, Was kostet der Führerschein, Führerschein Kosten 2025, Beste Fahrschule Hannover, Fahrschule Arabisch, Fahrschule Türkisch, Führerschein Schnellkurs, Ferienkurs Fahrschule, Begleitetes Fahren, Führerschein umschreiben, Theorie lernen, Fahrschule Bewertung, Fahrschule Empfehlung, Führerschein Crashkurs, Führerschein in 2 Wochen, Crashkurs Fahrschule, Intensiv Fahrschule, Schnellkurs Führerschein in der Nähe, Führerschein schnell, Schneller Führerschein, Führerschein Kurs, Fahrschule Angebote, Führerschein Raten, Fahrschulen Preisvergleich, Wochenend Fahrschule, Fahrschule Wochenende, Führerschein 1 Woche, Führerschein intensiv, Schnellkurs Fahrschule, 2 Wochen Kurs Führerschein, Führerschein 2 Wochen Kurs, Schnell Führerschein machen, Führerschein Fahrschule, Führerschein Kosten Hannover, Fahrschule Kosten Fahrstunde, Autoführerschein Preise, Führerschein Beschränkung 197, Crashkurs Führerschein Preis, Führerschein in einer Woche, Führerschein in 14 Tagen Kosten, Crash Kurs Führerschein Kosten, Führerschein Crashkurs Kosten, Intensivkurs Führerschein Kosten, Express Führerschein Kosten, Kosten Intensivkurs Führerschein, Fahrschule in der Nähe Schnellkurs, Führerschein Crash Kurs, Führerschein 2 Wochen, Fahrschule Ferienkurs in der Nähe, Führerschein Intensivkurse, Intensivkurse Führerschein"
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
        <FloatingOrbs />

        <motion.div style={{ opacity: heroOpacity }} className="container relative z-10 mx-auto px-4 pt-20">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mb-6">
              <AnimatedPills />
            </motion.div>

            <h1 className="mb-6 text-5xl font-extrabold leading-[1.08] text-primary-foreground font-display md:text-7xl lg:text-8xl">
              <SplitText as="span" text={t("index.heroTitle1")} delay={0.25} className="block" />
              <SplitText as="span" text={t("index.heroTitle2")} delay={0.55} className="block gradient-text" />
            </h1>

            <motion.p initial={{ opacity: 0, y: 20, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.8, delay: 0.9 }} className="mb-10 max-w-xl text-lg text-primary-foreground/60 leading-relaxed md:text-xl">
              {t("index.heroSubtitle")}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.1 }} className="flex flex-wrap gap-4">
              <MagneticButton>
                <Button variant="hero" asChild className="btn-glow">
                  <Link to="/kontakt">
                    {t("index.heroCta")} <ChevronRight className="h-5 w-5" />
                  </Link>
                </Button>
              </MagneticButton>
              <MagneticButton strength={0.25}>
                <Button variant="hero-outline" asChild className="btn-glow">
                  <a href="tel:+495116425066">
                    <Phone className="h-5 w-5" /> {t("index.heroCall")}
                  </a>
                </Button>
              </MagneticButton>
            </motion.div>


            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1 }} className="mt-12 flex flex-wrap gap-x-6 gap-y-2">
              {trustItems.map((ti) => (
                <span key={ti.text} className="flex items-center gap-1.5 text-xs text-primary-foreground/40">
                  <ti.icon className="h-3.5 w-3.5 text-primary/70" /> {ti.text}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>

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
                    {marqueeItems.map((item) => (
                      <span key={item} className="whitespace-nowrap text-sm font-semibold text-muted-foreground">{item}</span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated text ticker */}
      <section className="py-6 overflow-hidden">
        <div className="relative">
          <div className="flex animate-marquee-slow whitespace-nowrap">
            {[...Array(3)].map((_, i) => (
              <span key={i} className="mx-4 text-7xl md:text-9xl font-extrabold font-display text-transparent" style={{ WebkitTextStroke: "1.5px hsl(var(--border))" }}>
                {t("index.tickerText")}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { ref: stat1.ref, value: `${stat1.count.toLocaleString("de-DE")}+`, label: t("index.stat1Label"), icon: Users },
              { ref: stat2.ref, value: `${stat2.count}%`, label: t("index.stat2Label"), icon: Shield },
              { ref: stat3.ref, value: `${stat3.count}+`, label: t("index.stat3Label"), icon: Star },
            ].map((s, i) => (
              <motion.div key={s.label} ref={s.ref} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
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
          <div className="grid gap-10 items-center md:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Sparkles className="mb-4 h-8 w-8 text-primary" />
              <h2 className="mb-6 text-3xl font-extrabold text-foreground font-display md:text-5xl">
                {t("index.storyTitle")}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("index.storyText")}{" "}
                <strong className="text-foreground">{t("index.storyHighlight")}</strong>{" "}
                {t("index.storyEnd")}
                <em className="text-primary"> {t("index.storyDone")}</em>
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
              <div className="relative rounded-3xl overflow-hidden shadow-card-hover">
                <img src={img("hero-index")} alt="Fahrschüler bei der Fahrausbildung" className="w-full h-80 object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* License Classes Quick Access */}
      <section className="gradient-section py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">{t("index.classesSubtitle")}</span>
            <h2 className="text-3xl font-extrabold text-foreground font-display md:text-5xl">{t("index.classesTitle")}</h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">{t("index.classesDesc")}</p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {licenseClasses.map((lc, i) => (
              <motion.div key={lc.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                <TiltCard className="h-full rounded-3xl">
                  <Link to={lc.path} className="group flex flex-col h-full overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-all duration-500 hover:shadow-card-hover">
                    <div className="relative h-36 overflow-hidden">
                      <img src={img(lc.imageKey)} alt={lc.label} className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.12]" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                      <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl gradient-primary text-primary-foreground shadow-glow transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                        <lc.icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="p-4 text-center">
                      <div className="text-lg font-bold text-foreground font-display">{lc.label}</div>
                      <div className="text-xs text-muted-foreground">{lc.desc}</div>
                    </div>
                  </Link>
                </TiltCard>
              </motion.div>
            ))}

          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-8 text-center">
            <Link to="/fuehrerscheinklassen" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:gap-2.5 transition-all">
              {t("index.allClasses")} <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features / Why us */}
      <section className="relative py-28 bg-warm bg-driving-pattern overflow-hidden">
        <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-primary/5 blur-[100px]" />
        <div className="container relative z-10 mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 max-w-2xl">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">{t("index.whySubtitle")}</span>
            <h2 className="text-3xl font-extrabold text-foreground font-display md:text-5xl">{t("index.whyTitle")}</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">{t("index.whyDesc")}</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="group relative rounded-3xl border border-border bg-card p-8 shadow-card transition-all duration-500 hover:shadow-card-hover hover:-translate-y-1">
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
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">{t("index.testimonialsSubtitle")}</span>
            <h2 className="text-3xl font-extrabold text-foreground font-display md:text-5xl">{t("index.testimonialsTitle")}</h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((tm, i) => (
              <motion.div key={tm.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                <TiltCard max={6} className="rounded-3xl h-full">
                  <div className="group relative h-full rounded-3xl border border-border bg-card p-8 shadow-card transition-shadow duration-500 hover:shadow-card-hover">
                    <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/10 transition-all duration-500 group-hover:text-primary/30 group-hover:rotate-6" />
                    <div className="mb-4 flex gap-0.5">
                      {Array.from({ length: tm.rating }).map((_, j) => (
                        <motion.span key={j} initial={{ scale: 0, rotate: -30 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + j * 0.06, type: "spring", stiffness: 300 }}>
                          <Star className="h-4 w-4 fill-primary text-primary" />
                        </motion.span>
                      ))}
                    </div>
                    <p className="mb-6 text-sm leading-relaxed text-muted-foreground italic">„{tm.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary text-primary-foreground text-sm font-bold shadow-glow">{tm.name.charAt(0)}</div>
                      <div>
                        <div className="text-sm font-bold text-foreground">{tm.name}</div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" /> {tm.location}</div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="relative py-28 bg-warm bg-driving-pattern overflow-hidden">
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-primary/5 blur-[100px]" />
        <div className="container relative z-10 mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">{t("index.locationsSubtitle")}</span>
            <h2 className="text-3xl font-extrabold text-foreground font-display md:text-5xl">{t("index.locationsTitle")}</h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {locationsData.map((loc, i) => (
              <motion.div key={loc.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                <TiltCard max={7} className="rounded-3xl h-full">
                  <Link to={loc.path} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-shadow duration-500 hover:shadow-card-hover">
                    <div className="relative h-44 overflow-hidden">
                      <img src={img(loc.imageKey)} alt={`Standort ${loc.name}`} className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.12]" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-card/70 via-card/10 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 transition-all duration-500 group-hover:from-primary/10 group-hover:to-transparent" />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="mb-1 text-2xl font-bold text-foreground font-display">{loc.name}</h3>
                      <p className="mb-1 text-sm text-muted-foreground">{loc.addr}</p>
                      <p className="mb-6 text-sm text-muted-foreground/70">{loc.desc}</p>
                      <span className="mt-auto flex items-center gap-1.5 text-sm font-bold text-primary transition-all group-hover:gap-2.5">
                        {t("locations.viewLocation")} <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </TiltCard>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="gradient-section py-28">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">{t("index.stepsSubtitle")}</span>
            <h2 className="text-3xl font-extrabold text-foreground font-display md:text-5xl">{t("index.stepsTitle")}</h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">{t("index.stepsDesc")}</p>
          </motion.div>

          <div className="relative grid gap-6 md:grid-cols-4">
            <div className="absolute top-12 left-[12.5%] right-[12.5%] hidden h-0.5 bg-border md:block">
              <div className="absolute inset-0 gradient-primary opacity-30" />
              <div className="absolute top-1/2 left-0 h-3 w-3 -translate-y-1/2 rounded-full bg-primary shadow-glow" />
              <div className="absolute top-1/2 right-0 h-3 w-3 -translate-y-1/2 rounded-full bg-primary shadow-glow" />
            </div>
            {steps.map((s, i) => (
              <motion.div key={s.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} className="relative text-center">
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

      {/* Inline Contact Form */}
      <section className="relative py-28 bg-warm bg-driving-pattern overflow-hidden">
        <div className="container relative z-10 mx-auto px-4">
          <div className="grid gap-10 items-start lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">{t("contact.subtitle")}</span>
              <h2 className="text-3xl font-extrabold text-foreground font-display md:text-5xl lg:text-6xl mb-4">
                {t("index.ctaTitle")}
                <br />
                <span className="gradient-text">{t("index.ctaText")}</span>
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full gradient-primary text-primary-foreground pulse-glow">
                    <Phone className="h-4 w-4" />
                  </div>
                  <a href="tel:+495116425066" className="font-semibold text-foreground hover:text-primary transition-colors">0511 6425066</a>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full gradient-primary text-primary-foreground">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="text-foreground font-semibold">Hannover · Garbsen · Bremen</span>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="rounded-3xl border border-border bg-card p-8 shadow-card">
              <ContactForm compact />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden gradient-primary py-20 noise">
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="mb-5 text-2xl font-extrabold text-primary-foreground font-display md:text-4xl">
              {t("index.bottomCtaTitle")}
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="hero" asChild className="bg-white text-primary hover:bg-white/90">
                <Link to="/kontakt">
                  {t("common.contactUs")} <ChevronRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" asChild className="border-white text-white hover:bg-white/10">
                <Link to="/fuehrerscheinklassen">{t("index.allClasses")}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-white/10 blur-[120px]" />
      </section>
    </div>
  );
};

export default Index;
