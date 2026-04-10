import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Car, Bike, Truck, Phone, CheckCircle, Heart, BookOpen, HelpCircle } from "lucide-react";
import SEO from "@/components/SEO";
import InternalLinks from "@/components/InternalLinks";
import ContactForm from "@/components/ContactForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface CityLandingData {
  city: string;
  region: string;
  address: string;
  zip: string;
  phone: string;
  locationPath: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  heroText: string;
  introText: string;
  advantages: string[];
}

const cityData: Record<string, CityLandingData> = {
  hannover: {
    city: "Hannover",
    region: "NI",
    address: "Engelbosteler Damm 1",
    zip: "30167",
    phone: "0511 6425066",
    locationPath: "/standorte/hannover",
    seoTitle: "Fahrschule Hannover – Alle Führerscheinklassen | Fahrschule Metropol",
    seoDescription: "Fahrschule in Hannover: PKW, Motorrad, LKW & Bus. 98% Bestehensquote, flexible Zeiten, zentrale Lage. Jetzt bei Fahrschule Metropol anmelden!",
    seoKeywords: "Fahrschule Hannover, Führerschein Hannover, Fahrschule Metropol Hannover, Klasse B Hannover, Motorradführerschein Hannover, LKW Führerschein Hannover, Intensivkurs Hannover, BF17 Hannover, Automatik Führerschein Hannover, B197 Hannover, Fahrschule Engelbosteler Damm, Fahrschule Nordstadt Hannover, Führerschein machen Hannover",
    heroText: "Deine Fahrschule in Hannover – zentral gelegen am Engelbosteler Damm mit bester Verkehrsanbindung.",
    introText: "Die Fahrschule Metropol in Hannover bietet dir eine professionelle Fahrausbildung für alle Führerscheinklassen. Ob PKW, Motorrad, LKW oder Bus – unser erfahrenes Team begleitet dich sicher zum Führerschein. Mit über 15.000 erfolgreichen Absolventen und einer Bestehensquote von 98% gehören wir zu den erfolgreichsten Fahrschulen in Hannover und Umgebung.",
    advantages: [
      "Zentrale Lage am Engelbosteler Damm – perfekt mit ÖPNV erreichbar",
      "Flexible Unterrichtszeiten bis 19 Uhr",
      "Modernste Fahrzeugflotte für alle Klassen",
      "Mehrsprachiger Unterricht (Deutsch, Englisch, Türkisch, Arabisch)",
      "98% Bestehensquote bei Erst- und Wiederholungsprüfungen",
      "BF17 – Begleitetes Fahren ab 17 Jahren",
    ],
  },
  bremen: {
    city: "Bremen",
    region: "HB",
    address: "Bahnhofsplatz 41",
    zip: "28195",
    phone: "0421 48445910",
    locationPath: "/standorte/bremen",
    seoTitle: "Fahrschule Bremen – Führerschein aller Klassen | Fahrschule Metropol",
    seoDescription: "Fahrschule in Bremen am Bahnhofsplatz: Führerschein B, B197, Motorrad, LKW. Erfahrene Fahrlehrer, 98% Bestehensquote. Jetzt anmelden!",
    seoKeywords: "Fahrschule Bremen, Führerschein Bremen, Fahrschule Metropol Bremen, Klasse B Bremen, Motorradführerschein Bremen, LKW Führerschein Bremen, Intensivkurs Bremen, Fahrschule Bahnhofsplatz Bremen, Führerschein machen Bremen, Fahrschule Innenstadt Bremen, BF17 Bremen, Automatik Führerschein Bremen",
    heroText: "Fahrschule Metropol Bremen – direkt am Bahnhofsplatz in der Bremer Innenstadt.",
    introText: "Seit über 20 Jahren ist die Fahrschule Metropol dein verlässlicher Partner für den Führerschein in Bremen. Unser Standort am Bahnhofsplatz ist bestens erreichbar und bietet modernste Ausstattung für deinen Theorieunterricht. Unsere Fahrlehrer kennen die Bremer Prüfstrecken wie ihre Westentasche.",
    advantages: [
      "Direkt am Bremer Hauptbahnhof – optimal erreichbar",
      "Über 20 Jahre Erfahrung in Bremen",
      "Bremer Prüfstrecken-Experten im Team",
      "Intensivkurse und Ferienkurse verfügbar",
      "Mehrsprachiger Unterricht",
      "Moderne Schulungsräume mit digitaler Ausstattung",
    ],
  },
  garbsen: {
    city: "Garbsen",
    region: "NI",
    address: "Planetenring 25–27",
    zip: "30823",
    phone: "05137 8903395",
    locationPath: "/standorte/garbsen",
    seoTitle: "Fahrschule Garbsen – Entspannt zum Führerschein | Fahrschule Metropol",
    seoDescription: "Fahrschule in Garbsen: Führerschein B, Motorrad & mehr. Familiäre Atmosphäre, eigener Parkplatz, flexible Termine. Jetzt anmelden!",
    seoKeywords: "Fahrschule Garbsen, Führerschein Garbsen, Fahrschule Metropol Garbsen, Klasse B Garbsen, Motorradführerschein Garbsen, Intensivkurs Garbsen, Fahrschule Planetenring Garbsen, Führerschein machen Garbsen, BF17 Garbsen, Fahrschule Region Hannover, Fahrschule Garbsen günstig",
    heroText: "Fahrschule Metropol Garbsen – familiäre Atmosphäre und individuelle Betreuung.",
    introText: "In Garbsen lernst du das Fahren in einer entspannten Umgebung. Unser Standort am Planetenring bietet ideale Voraussetzungen für den Einstieg: ruhigere Straßen, individuelle Betreuung und ein engagiertes Team. Perfekt, um sicher und stressfrei deinen Führerschein zu machen – bevor es in den Stadtverkehr nach Hannover geht.",
    advantages: [
      "Familiäre Atmosphäre mit individueller Betreuung",
      "Eigener Parkplatz direkt vor der Tür",
      "Ruhigere Straßen ideal für Fahranfänger",
      "Regelmäßige Intensiv- und Ferienkurse",
      "Gute Anbindung an Hannover",
      "Geduldige und erfahrene Fahrlehrer",
    ],
  },
};

const cityFaqs: Record<string, { q: string; a: string }[]> = {
  hannover: [
    { q: "Was kostet der Führerschein Klasse B in Hannover?", a: "Die Kosten für den Führerschein Klasse B in Hannover variieren je nach Anzahl der benötigten Fahrstunden. Kontaktiere uns für ein individuelles Angebot – wir beraten dich transparent und ohne versteckte Kosten." },
    { q: "Wie lange dauert die Führerscheinausbildung in Hannover?", a: "Bei regelmäßiger Teilnahme am Theorieunterricht und 2–3 Fahrstunden pro Woche kannst du deinen Führerschein in Hannover in ca. 3–4 Monaten machen. Mit einem Intensivkurs geht es noch schneller." },
    { q: "Bietet Fahrschule Metropol Hannover Intensivkurse an?", a: "Ja, wir bieten Intensivkurse und Ferienkurse in Hannover an. So kannst du deinen Führerschein in nur 2–4 Wochen machen. Ideal für Schüler und Studenten." },
    { q: "Kann ich in Hannover den Führerschein auf Automatik machen?", a: "Ja, mit dem Führerschein Klasse B197 machst du die Prüfung auf Automatik und darfst trotzdem Schaltwagen fahren. Das bieten wir in Hannover an." },
    { q: "Wo ist die Fahrschule Metropol in Hannover?", a: "Unsere Fahrschule in Hannover befindet sich am Engelbosteler Damm 1, 30167 Hannover – zentral gelegen und bestens mit Bus und Bahn erreichbar." },
    { q: "Gibt es bei Fahrschule Metropol Hannover Unterricht in anderen Sprachen?", a: "Ja, unser Theorieunterricht in Hannover ist auf Deutsch, Englisch, Türkisch und Arabisch verfügbar." },
  ],
  bremen: [
    { q: "Was kostet der Führerschein in Bremen?", a: "Die Führerscheinkosten in Bremen hängen von der gewählten Klasse und den individuellen Fahrstunden ab. Ruf uns an oder schreib uns – wir machen dir ein faires Angebot." },
    { q: "Wie finde ich die Fahrschule Metropol in Bremen?", a: "Unsere Fahrschule liegt direkt am Bahnhofsplatz 41, 28195 Bremen – nur wenige Schritte vom Bremer Hauptbahnhof entfernt." },
    { q: "Bietet die Fahrschule Metropol Bremen Erste-Hilfe-Kurse an?", a: "Ja, wir bieten anerkannte Erste-Hilfe-Kurse direkt in Bremen an. Der Kurs ist Pflicht für jeden Führerscheinantrag und kann bei uns vor Ort absolviert werden." },
    { q: "Kann ich in Bremen den Motorradführerschein machen?", a: "Ja, wir bilden in Bremen alle Motorradklassen aus – von AM und A1 über A2 bis zum unbeschränkten Klasse-A-Führerschein." },
    { q: "Wie hoch ist die Bestehensquote bei Fahrschule Metropol Bremen?", a: "Unsere Bestehensquote in Bremen liegt bei 98% – dank erfahrener Fahrlehrer, die die Bremer Prüfstrecken bestens kennen." },
    { q: "Gibt es in Bremen auch LKW- und Bus-Führerscheine?", a: "Ja, wir bieten in Bremen alle Führerscheinklassen an, einschließlich Klasse C/CE (LKW) und Klasse D (Bus)." },
  ],
  garbsen: [
    { q: "Warum sollte ich meinen Führerschein in Garbsen machen?", a: "Garbsen bietet ruhigere Straßen und eine entspannte Lernumgebung – ideal für Fahranfänger. Unsere Fahrschule am Planetenring bietet familiäre Atmosphäre und individuelle Betreuung." },
    { q: "Wie komme ich zur Fahrschule Metropol in Garbsen?", a: "Unsere Fahrschule befindet sich am Planetenring 25–27, 30823 Garbsen. Wir haben einen eigenen Parkplatz direkt vor der Tür und sind auch mit dem Bus gut erreichbar." },
    { q: "Gibt es in Garbsen Intensivkurse für den Führerschein?", a: "Ja, wir bieten in Garbsen regelmäßig Intensiv- und Ferienkurse an. So kannst du deinen Führerschein schnell und effizient machen." },
    { q: "Kann ich in Garbsen BF17 (Begleitetes Fahren ab 17) machen?", a: "Ja, BF17 ist in Garbsen verfügbar. Du kannst bereits mit 17 Jahren deinen Führerschein machen und mit einer Begleitperson fahren." },
    { q: "Welche Führerscheinklassen bietet Fahrschule Metropol in Garbsen an?", a: "In Garbsen bieten wir alle gängigen Klassen an: PKW (B, B197, BE), Motorrad (AM, A1, A2, A) und weitere." },
    { q: "Ist Fahrschule Metropol Garbsen günstiger als in Hannover?", a: "Die Grundgebühren sind an allen Standorten gleich. Da du in Garbsen auf ruhigeren Straßen startest, brauchst du oft weniger Fahrstunden – das kann die Gesamtkosten senken." },
  ],
};

const popularClasses = [
  { icon: Car, name: "Klasse B", subtitle: "PKW-Führerschein", path: "/fuehrerschein/klasse-b", desc: "Der beliebteste Führerschein – für Fahrzeuge bis 3,5 t." },
  { icon: Car, name: "Klasse B197", subtitle: "Automatik + Schaltwagen", path: "/fuehrerschein/klasse-b197", desc: "Prüfung auf Automatik, trotzdem Schaltwagen fahren." },
  { icon: Bike, name: "Klasse A", subtitle: "Motorrad unbeschränkt", path: "/fuehrerschein/klasse-a", desc: "Alle Motorräder – ohne Limits." },
  { icon: Truck, name: "Klasse C/CE", subtitle: "LKW-Führerschein", path: "/fuehrerschein/klasse-c", desc: "LKW & Sattelzüge – dein Einstieg in den Güterverkehr." },
];

const CityLanding = ({ citySlug }: { citySlug: string }) => {
  const data = cityData[citySlug];
  if (!data) return null;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "additionalType": "https://schema.org/DrivingSchool",
      name: `Fahrschule Metropol ${data.city}`,
      url: `https://fahrschule-metropol.de/fahrschule-${citySlug}`,
      telephone: data.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: data.address,
        addressLocality: data.city,
        postalCode: data.zip,
        addressRegion: data.region,
        addressCountry: "DE",
      },
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "13:30" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "14:30", closes: "19:00" },
      ],
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "127" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Startseite", item: "https://fahrschule-metropol.de/" },
        { "@type": "ListItem", position: 2, name: `Fahrschule ${data.city}`, item: `https://fahrschule-metropol.de/fahrschule-${citySlug}` },
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <SEO title={data.seoTitle} description={data.seoDescription} canonical={`https://fahrschule-metropol.de/fahrschule-${citySlug}`} jsonLd={jsonLd} keywords={data.seoKeywords} />

      {/* Hero */}
      <section className="gradient-dark py-20 noise relative overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <MapPin className="inline h-3.5 w-3.5 mr-1 -mt-0.5" />
              {data.city}
            </span>
            <h1 className="text-4xl font-extrabold text-primary-foreground font-display md:text-6xl">
              Fahrschule {data.city}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/50">{data.heroText}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button variant="hero" asChild>
                <Link to="/kontakt">Jetzt anmelden <ArrowRight className="h-5 w-5" /></Link>
              </Button>
              <Button variant="hero-outline" asChild>
                <a href={`tel:${data.phone.replace(/[^+\d]/g, "")}`}><Phone className="h-5 w-5" /> {data.phone}</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-extrabold text-foreground font-display md:text-3xl">
              Führerschein machen in {data.city}
            </h2>
            <p className="text-muted-foreground leading-relaxed">{data.introText}</p>
          </motion.div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-12 gradient-section">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="mb-8 text-xl font-bold text-foreground font-display">Deine Vorteile in {data.city}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {data.advantages.map((adv, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-card">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm text-muted-foreground">{adv}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Popular classes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <h2 className="text-2xl font-extrabold text-foreground font-display md:text-3xl">
              Beliebte Führerscheinklassen in {data.city}
            </h2>
            <p className="mt-2 text-muted-foreground">Wir bieten alle Führerscheinklassen an – hier die beliebtesten:</p>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popularClasses.map((cls, i) => (
              <motion.div key={cls.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Link to={cls.path} className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-500 hover:shadow-card-hover hover:-translate-y-1">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-all duration-500 group-hover:gradient-primary group-hover:text-primary-foreground">
                    <cls.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-0.5 text-lg font-bold text-foreground font-display">{cls.name}</h3>
                  <p className="mb-2 text-xs font-semibold text-primary">{cls.subtitle}</p>
                  <p className="mb-4 text-sm text-muted-foreground leading-relaxed flex-1">{cls.desc}</p>
                  <span className="flex items-center gap-1.5 text-xs font-bold text-primary transition-all group-hover:gap-2.5">
                    Mehr erfahren <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link to="/fuehrerscheinklassen" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:gap-2.5 transition-all">
              Alle Führerscheinklassen ansehen <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-12 gradient-section">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-xl font-bold text-foreground font-display">Weitere Angebote in {data.city}</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: Heart, title: "Erste-Hilfe-Kurs", desc: `Anerkannter Erste-Hilfe-Kurs in ${data.city} – Pflicht für jeden Führerscheinantrag.`, path: "/erste-hilfe" },
              { icon: BookOpen, title: "Aufbauseminar (ASF)", desc: `Aufbauseminar für Fahranfänger in ${data.city} – bei Punkten in der Probezeit.`, path: "/aufbauseminar" },
              { icon: MapPin, title: `Standort ${data.city}`, desc: `Alle Infos zu unserem Standort ${data.address}, ${data.zip} ${data.city}.`, path: data.locationPath },
            ].map((service, i) => (
              <motion.div key={service.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link to={service.path} className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
                  <service.icon className="mb-3 h-6 w-6 text-primary" />
                  <h3 className="mb-2 text-sm font-bold text-foreground">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{service.desc}</p>
                  <span className="mt-3 flex items-center gap-1.5 text-xs font-bold text-primary">Mehr erfahren <ArrowRight className="h-3 w-3" /></span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="mb-4 text-2xl font-extrabold text-foreground font-display">Jetzt Führerschein in {data.city} starten</h2>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                Melde dich jetzt unverbindlich an und starte deinen Führerschein bei der Fahrschule Metropol in {data.city}. Wir beraten dich gerne zu allen Klassen, Preisen und Terminen.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary text-primary-foreground"><Phone className="h-4 w-4" /></div>
                  <div>
                    <p className="text-xs text-muted-foreground">Telefon</p>
                    <a href={`tel:${data.phone.replace(/[^+\d]/g, "")}`} className="text-sm font-bold text-foreground hover:text-primary transition-colors">{data.phone}</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground"><MapPin className="h-4 w-4" /></div>
                  <div>
                    <p className="text-xs text-muted-foreground">Adresse</p>
                    <Link to={data.locationPath} className="text-sm font-bold text-foreground hover:text-primary transition-colors">{data.address}, {data.zip} {data.city}</Link>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
                <h3 className="mb-2 text-lg font-bold text-foreground font-display">Unverbindliche Anfrage</h3>
                <p className="mb-6 text-sm text-muted-foreground">Kostenlos und unverbindlich – wir melden uns innerhalb von 24 Stunden.</p>
                <ContactForm preselectedLocation={data.city} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <InternalLinks exclude={["locations"]} title={`Mehr über Fahrschule Metropol ${data.city}`} />
    </div>
  );
};

export default CityLanding;
export { cityData };
