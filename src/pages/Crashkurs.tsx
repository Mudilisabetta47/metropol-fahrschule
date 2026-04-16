import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Zap,
  Clock,
  CheckCircle,
  ArrowRight,
  Phone,
  Calendar,
  Euro,
  MapPin,
  Car,
  Bike,
  Truck,
  Star,
  Shield,
  Users,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEO from "@/components/SEO";
import ContactForm from "@/components/ContactForm";
import InternalLinks from "@/components/InternalLinks";
import heroImage from "@/assets/hero-driving.jpg";

const Crashkurs = () => {
  const faqs = [
    {
      q: "Wie lange dauert ein Führerschein-Crashkurs wirklich?",
      a: "Ein Führerschein-Crashkurs (Klasse B) bei Fahrschule Metropol dauert in der Regel 2 bis 4 Wochen. Der Theorie-Schnellkurs ist in nur 7 Tagen abgeschlossen, danach folgen die Fahrstunden im Intensivblock. Wer alle Voraussetzungen mitbringt, kann den Führerschein in 2 Wochen schaffen.",
    },
    {
      q: "Was kostet ein Crashkurs Führerschein 2025?",
      a: "Die Kosten für einen Führerschein-Crashkurs Klasse B liegen 2025 zwischen 2.500 € und 3.500 € – je nach Anzahl der nötigen Fahrstunden und Vorerfahrung. Express-Führerschein Kosten beinhalten alle Theoriestunden, Pflicht-Sonderfahrten, Lehrmaterial und Prüfungsgebühren der Fahrschule.",
    },
    {
      q: "Ist ein Führerschein in 14 Tagen realistisch?",
      a: "Ja, ein Führerschein in 14 Tagen ist mit unserem Intensivkurs realistisch – sofern Sehtest, Erste-Hilfe-Kurs und Antrag bei der Führerscheinstelle bereits vorliegen. Wir kombinieren tägliche Theorie mit 2–3 Fahrstunden pro Tag für maximalen Lernerfolg.",
    },
    {
      q: "Welche Crashkurse bietet Fahrschule Metropol an?",
      a: "Wir bieten Crashkurse für Klasse B (Auto), B197 (Automatik), BE (Anhänger), A/A1/A2 (Motorrad), B196 (125ccm), C/CE (LKW) und D/DE (Bus) an – jeweils als Intensivkurs, Wochenend-Crashkurs oder Ferienkurs in Hannover, Garbsen und Bremen.",
    },
    {
      q: "Kann ich den Crashkurs in den Ferien machen?",
      a: "Ja, unser Ferienkurs Fahrschule ist die ideale Lösung für Schüler und Studenten. In den Schulferien bieten wir tägliche Theorie- und Fahrstunden an, sodass du den Führerschein in einer Woche bzw. innerhalb der Ferienzeit absolvieren kannst.",
    },
    {
      q: "Wo finde ich einen Schnellkurs Führerschein in der Nähe?",
      a: "Fahrschule Metropol bietet Schnellkurse an drei Standorten: Hannover (Engelbosteler Damm 1), Garbsen (Planetenring 25–27) und Bremen (Bahnhofsplatz 41). Alle drei Standorte sind zentral mit ÖPNV erreichbar – damit findest du garantiert eine Fahrschule in der Nähe mit Schnellkurs.",
    },
    {
      q: "Was ist der Unterschied zwischen Crashkurs und Intensivkurs?",
      a: "Crashkurs und Intensivkurs werden synonym verwendet – beide beschreiben einen komprimierten Führerschein-Kurs in 2–4 Wochen statt 3–6 Monaten. Wir bieten beide Varianten unter einem Dach: Klassischer Intensivkurs (2 Wochen Kurs Führerschein) oder Wochenend-Crashkurs.",
    },
    {
      q: "Bekomme ich beim Crashkurs Ratenzahlung?",
      a: "Bei Fahrschule Metropol kannst du den Führerschein in Raten zahlen. Wir bieten faire Zahlungspläne an, damit der Crashkurs auch finanziell entspannt bleibt. Sprich uns einfach im Beratungsgespräch an.",
    },
  ];

  const courseTypes = [
    {
      icon: Car,
      title: "Crashkurs Klasse B",
      duration: "2–3 Wochen",
      price: "ab 2.500 €",
      desc: "Autoführerschein im Schnellkurs – inklusive Theorie und Fahrstunden im Intensivblock.",
      link: "/fuehrerschein/klasse-b",
    },
    {
      icon: Car,
      title: "B197 Automatik-Crashkurs",
      duration: "2 Wochen",
      price: "ab 2.300 €",
      desc: "Schneller Führerschein mit Automatik-Ausbildung – fahre danach Schalt- und Automatikwagen.",
      link: "/fuehrerschein/klasse-b197",
    },
    {
      icon: Bike,
      title: "Motorrad-Schnellkurs A/A2",
      duration: "1–2 Wochen",
      price: "ab 1.800 €",
      desc: "Motorrad Führerschein Schnellkurs – ideal für die Motorradsaison im Frühjahr.",
      link: "/fuehrerschein/klasse-a",
    },
    {
      icon: Bike,
      title: "B196 Crashkurs (125ccm)",
      duration: "5–7 Tage",
      price: "ab 700 €",
      desc: "125er Schlüsselzahl mit B-Führerschein – Crashkurs ohne Prüfung möglich.",
      link: "/fuehrerschein/klasse-b196",
    },
    {
      icon: Truck,
      title: "LKW-Intensivkurs C/CE",
      duration: "3–4 Wochen",
      price: "auf Anfrage",
      desc: "LKW Führerschein Schnellkurs für Berufskraftfahrer – inkl. Theorie & BKF-Module.",
      link: "/fuehrerschein/klasse-c",
    },
    {
      icon: Calendar,
      title: "Wochenend-Crashkurs",
      duration: "4–6 Wochenenden",
      price: "ab 2.600 €",
      desc: "Ideal für Berufstätige: Theorie und Fahrstunden ausschließlich am Wochenende.",
      link: "/kontakt",
    },
  ];

  const benefits = [
    { icon: Zap, title: "Führerschein in 2 Wochen", desc: "Schnell Führerschein machen – komprimiert und effektiv." },
    { icon: TrendingUp, title: "98 % Bestehensquote", desc: "Erfahrene Fahrlehrer und bewährtes Schnellkurs-Konzept." },
    { icon: Euro, title: "Faire Crashkurs-Preise", desc: "Transparente Kosten, keine versteckten Gebühren – Ratenzahlung möglich." },
    { icon: MapPin, title: "Drei Standorte", desc: "Crashkurse in Hannover, Garbsen und Bremen – Fahrschule in der Nähe." },
    { icon: Calendar, title: "Wochenende & Ferien", desc: "Wochenend-Fahrschule und Ferienkurs für Schüler, Studenten und Berufstätige." },
    { icon: Shield, title: "Zertifizierte Ausbildung", desc: "Geprüfte Fahrlehrer, modernes Lehrmaterial, sichere Prüfungsvorbereitung." },
  ];

  const process = [
    { step: "01", title: "Anmeldung & Beratung", text: "Unverbindliches Beratungsgespräch – wir klären, ob ein Crashkurs für dich passt und wie schnell du starten kannst." },
    { step: "02", title: "Theorie-Schnellkurs", text: "Kompakter Theorie-Crashkurs in 5–7 Tagen statt mehrerer Wochen. Tägliche Doppelstunden, modernes Lernmaterial." },
    { step: "03", title: "Theorieprüfung", text: "Direkt nach dem Theorie-Block geht es zur Prüfung – kein Lernstoff geht verloren." },
    { step: "04", title: "Praxis-Intensivblock", text: "2–3 Fahrstunden täglich, inklusive Pflicht-Sonderfahrten (Überland, Autobahn, Nacht)." },
    { step: "05", title: "Praktische Prüfung", text: "Nach den Fahrstunden direkt zur Praxisprüfung – komplett betreut von deinem Fahrlehrer." },
    { step: "06", title: "Führerschein in der Hand", text: "Nach bestandener Prüfung erhältst du deinen Führerschein und bist mobil." },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Führerschein-Crashkurs & Intensivkurs",
      serviceType: "Fahrausbildung Schnellkurs",
      provider: {
        "@type": "DrivingSchool",
        name: "Fahrschule Metropol",
        url: "https://fahrschule-metropol.de",
        telephone: "+49-511-6425066",
        areaServed: ["Hannover", "Garbsen", "Bremen"],
      },
      areaServed: ["Hannover", "Garbsen", "Bremen", "Niedersachsen"],
      description:
        "Führerschein-Crashkurs in 2 Wochen – Intensivkurs für Klasse B, A, B197, BE, C und D in Hannover, Garbsen und Bremen.",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "EUR",
        lowPrice: "700",
        highPrice: "3500",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Startseite", item: "https://fahrschule-metropol.de/" },
        { "@type": "ListItem", position: 2, name: "Crashkurs", item: "https://fahrschule-metropol.de/crashkurs" },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Führerschein Crashkurs in 2 Wochen | Intensivkurs Hannover, Bremen, Garbsen"
        description="Führerschein-Crashkurs ab 2.500 € – Intensivkurs Klasse B in 2 Wochen, Motorrad-Schnellkurs, LKW-Crashkurs in Hannover, Bremen & Garbsen. Schneller Führerschein, faire Preise."
        canonical="https://fahrschule-metropol.de/crashkurs"
        jsonLd={jsonLd}
        keywords="Führerschein Crashkurs, Crashkurs Führerschein, Führerschein in 2 Wochen, Intensivkurs Führerschein, Führerschein Schnellkurs, Schnellkurs Führerschein, Crashkurs Fahrschule, Intensiv Fahrschule, Führerschein in 14 Tagen, Führerschein in einer Woche, Führerschein 1 Woche, Führerschein 2 Wochen, 2 Wochen Kurs Führerschein, Führerschein 2 Wochen Kurs, Schnell Führerschein machen, Schneller Führerschein, Führerschein schnell, Führerschein Kurs, Führerschein intensiv, Express Führerschein, Crashkurs Führerschein Preis, Crashkurs Führerschein Kosten, Führerschein Crashkurs Kosten, Intensivkurs Führerschein Kosten, Express Führerschein Kosten, Crash Kurs Führerschein Kosten, Kosten Intensivkurs Führerschein, Führerschein Crash Kurs, Führerschein Intensivkurse, Intensivkurse Führerschein, Schnellkurs Fahrschule, Wochenend Fahrschule, Fahrschule Wochenende, Ferienkurs Fahrschule, Fahrschule Ferienkurs in der Nähe, Schnellkurs Führerschein in der Nähe, Fahrschule in der Nähe Schnellkurs, Crashkurs Hannover, Crashkurs Bremen, Crashkurs Garbsen, Intensivkurs Hannover, Intensivkurs Bremen, Intensivkurs Garbsen, Führerschein Crashkurs Hannover, Motorrad Crashkurs, Motorrad Führerschein Schnellkurs, LKW Führerschein Schnellkurs, LKW Crashkurs, LKW Intensivkurs, B197 Schnellkurs, Automatik Crashkurs, 125er Crashkurs, B196 Schnellkurs, Führerschein Raten, Fahrschule Angebote, Fahrschulen Preisvergleich"
      />

      {/* HERO */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden">
        <img src={heroImage} alt="Führerschein Crashkurs in Hannover, Bremen und Garbsen" className="absolute inset-0 h-full w-full object-cover" loading="eager" />
        <div className="hero-overlay absolute inset-0" />
        <div className="container relative z-10 mx-auto px-4 pt-32 pb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary backdrop-blur-sm">
              <Zap className="h-3.5 w-3.5" /> Schneller Führerschein – ab sofort starten
            </span>
            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-primary-foreground font-display md:text-6xl lg:text-7xl">
              Führerschein Crashkurs in 2 Wochen
            </h1>
            <p className="mb-8 max-w-2xl text-lg text-primary-foreground/90 leading-relaxed md:text-xl">
              Dein Intensivkurs für Klasse B, Motorrad, LKW oder Bus – in <strong>Hannover, Bremen und Garbsen</strong>. Theorie-Schnellkurs in einer Woche, Praxis im Intensivblock, faire Crashkurs-Preise und Ratenzahlung möglich.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="cta" size="lg" asChild>
                <Link to="/kontakt">Crashkurs anfragen <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="bg-background/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-background/20">
                <a href="tel:+495116425066"><Phone className="mr-2 h-4 w-4" /> 0511 6425066</a>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-primary-foreground/80">
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-primary" /> Führerschein in 14 Tagen möglich</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-primary" /> 98 % Bestehensquote</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-primary" /> Ratenzahlung verfügbar</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="mb-6 text-3xl font-extrabold text-foreground font-display md:text-4xl">
                Schnellkurs Führerschein in der Nähe – So funktioniert der Crashkurs bei Fahrschule Metropol
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>
                  Du brauchst <strong>schnell deinen Führerschein</strong> – sei es für den Job, das Studium oder den nächsten Urlaub? Mit dem <strong>Führerschein-Crashkurs</strong> von Fahrschule Metropol absolvierst du deinen Führerschein in nur <strong>2 Wochen</strong> statt der üblichen 3–6 Monate. Unser <strong>Intensivkurs Führerschein</strong> kombiniert kompakte Theoriestunden mit täglichen Fahrstunden – ideal für alle, die einen <strong>Schnellkurs Führerschein in der Nähe</strong> suchen.
                </p>
                <p>
                  Egal ob <strong>Crashkurs Klasse B</strong>, <strong>B197 Automatik-Schnellkurs</strong>, <strong>Motorrad-Crashkurs A/A2/A1</strong>, <strong>B196 (125ccm)</strong> oder <strong>LKW-Intensivkurs Klasse C/CE</strong> – an unseren Standorten in <strong>Hannover, Bremen und Garbsen</strong> findest du das passende Schnellkurs-Angebot. Auch <strong>Wochenend-Fahrschule</strong> und <strong>Ferienkurs Fahrschule</strong> sind möglich.
                </p>
                <p>
                  <strong>Was kostet ein Crashkurs Führerschein?</strong> Die <strong>Crashkurs Führerschein Preise</strong> liegen 2025 zwischen 700 € (B196) und 3.500 € (Klasse B inkl. aller Fahrstunden). Die genauen <strong>Express Führerschein Kosten</strong> hängen von der Klasse und deinen individuellen Fahrstunden ab. Sprich uns auf <strong>Ratenzahlung</strong> an – wir bieten flexible Zahlungspläne.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-16 gradient-section">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">Vorteile</span>
            <h2 className="text-3xl font-extrabold text-foreground font-display md:text-4xl">Warum ein Crashkurs bei Fahrschule Metropol?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Schneller Führerschein, faire Preise, beste Betreuung – die <strong>Intensiv Fahrschule</strong> für Hannover, Bremen und Garbsen.
            </p>
          </motion.div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-card-hover hover:-translate-y-1"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl gradient-primary text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-foreground">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* COURSE TYPES */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">Kursarten</span>
            <h2 className="text-3xl font-extrabold text-foreground font-display md:text-4xl">Alle Crashkurse & Intensivkurse im Überblick</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Vom Auto-Crashkurs bis zum LKW-Intensivkurs – wähle deinen <strong>Schneller Führerschein</strong>-Pfad.
            </p>
          </motion.div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {courseTypes.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-card-hover hover:-translate-y-1"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <Icon className="h-8 w-8 text-primary" />
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{c.duration}</span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-foreground">{c.title}</h3>
                  <p className="mb-4 flex-1 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <span className="text-base font-bold text-foreground">{c.price}</span>
                    <Link to={c.link} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                      Details <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-16 gradient-section">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">Ablauf</span>
            <h2 className="text-3xl font-extrabold text-foreground font-display md:text-4xl">In 6 Schritten zum Führerschein in 14 Tagen</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              So läuft dein <strong>Führerschein 2 Wochen Kurs</strong> Schritt für Schritt ab.
            </p>
          </motion.div>
          <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2 lg:grid-cols-3">
            {process.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl border border-border bg-card p-6 shadow-card"
              >
                <span className="mb-2 inline-block text-3xl font-extrabold gradient-text font-display">{p.step}</span>
                <h3 className="mb-2 text-base font-bold text-foreground">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">Standorte</span>
            <h2 className="text-3xl font-extrabold text-foreground font-display md:text-4xl">Crashkurs Führerschein in Hannover, Bremen & Garbsen</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Drei Standorte, ein Versprechen: <strong>Schnell Führerschein machen</strong> mit erfahrenen Fahrlehrern.
            </p>
          </motion.div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { city: "Hannover", addr: "Engelbosteler Damm 1, 30167 Hannover", path: "/standorte/hannover" },
              { city: "Garbsen", addr: "Planetenring 25–27, 30823 Garbsen", path: "/standorte/garbsen" },
              { city: "Bremen", addr: "Bahnhofsplatz 41, 28195 Bremen", path: "/standorte/bremen" },
            ].map((loc, i) => (
              <motion.div
                key={loc.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-card-hover hover:-translate-y-1"
              >
                <MapPin className="mb-3 h-6 w-6 text-primary" />
                <h3 className="mb-1 text-lg font-bold text-foreground">Crashkurs {loc.city}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{loc.addr}</p>
                <Link to={loc.path} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                  Standort ansehen <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 gradient-section">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
            <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">FAQ</span>
            <h2 className="text-3xl font-extrabold text-foreground font-display md:text-4xl">Häufige Fragen zum Führerschein-Crashkurs</h2>
          </motion.div>
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="rounded-2xl border border-border bg-card px-6 shadow-card">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA + CONTACT */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-5">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-2">
              <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">Jetzt anfragen</span>
              <h2 className="mb-4 text-3xl font-extrabold text-foreground font-display md:text-4xl">
                Starte deinen Crashkurs noch diese Woche
              </h2>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                Fülle das Formular aus und wir melden uns innerhalb von 24 Stunden mit einem unverbindlichen Angebot für deinen <strong>Führerschein-Intensivkurs</strong>.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary text-primary-foreground"><Phone className="h-4 w-4" /></div>
                  <div>
                    <p className="text-xs text-muted-foreground">Direkt erreichbar</p>
                    <a href="tel:+495116425066" className="text-sm font-bold text-foreground hover:text-primary">0511 6425066</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground"><Star className="h-4 w-4" /></div>
                  <div>
                    <p className="text-xs text-muted-foreground">Bewertungen</p>
                    <p className="text-sm font-bold text-foreground">4,9 / 5 · 347 Erfahrungen</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground"><Users className="h-4 w-4" /></div>
                  <div>
                    <p className="text-xs text-muted-foreground">Erfolgreich ausgebildet</p>
                    <p className="text-sm font-bold text-foreground">15.000+ Führerscheine</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="lg:col-span-3">
              <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
                <h3 className="mb-2 text-lg font-bold text-foreground font-display">Unverbindliche Crashkurs-Anfrage</h3>
                <p className="mb-6 text-sm text-muted-foreground">100 % kostenlos, keine Verpflichtung – Antwort innerhalb von 24 Stunden.</p>
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <InternalLinks title="Weitere Informationen" />
    </div>
  );
};

export default Crashkurs;
