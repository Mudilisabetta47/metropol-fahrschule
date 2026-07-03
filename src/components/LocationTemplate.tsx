import { MapPin, Phone, Mail, Clock, Navigation, Megaphone, CheckCircle, Car, Bike, Truck, ArrowRight, HelpCircle, Heart, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import InternalLinks from "@/components/InternalLinks";
import ContactForm from "@/components/ContactForm";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cityData } from "@/components/CityLanding";

// SEO-Landingpage-Inhalte je Stadt (langer Fließtext, Vorteile, Stadt-FAQ)
const cityExtras: Record<string, {
  longText: string[];
  advantages: string[];
  faqs: { q: string; a: string }[];
}> = {
  hannover: {
    longText: [
      "Die Fahrschule Metropol Hannover ist deine Anlaufstelle für einen professionellen und erfolgreichen Führerschein in Hannover. Direkt am Engelbosteler Damm in der Nordstadt gelegen, erreichst du uns bequem mit U-Bahn, Bus, Fahrrad oder Auto – die Haltestellen Christuskirche und Kopernikusstraße liegen nur wenige Gehminuten entfernt. Ob du deinen Autoführerschein Klasse B, den Motorradführerschein Klasse A, den LKW Führerschein Klasse C oder eine Anhänger-Erweiterung machen möchtest: Bei uns bekommst du eine geduldige, individuelle Ausbildung von erfahrenen Fahrlehrern, die den Hannoveraner Stadtverkehr in- und auswendig kennen.",
      "Der Führerschein in Hannover erfordert Prüfungsstrecken, auf denen du sicher durch enge Innenstadtstraßen, über mehrspurige Kreuzungen wie am Aegidientorplatz oder den Königsworther Platz und über Umgehungsstraßen fährst. Unsere Fahrlehrer trainieren dich gezielt auf diese realen Prüfsituationen. So gehst du selbstbewusst in die praktische Prüfung – unsere Bestehensquote von rund 98 % spricht für sich. Auch für Fahrschüler aus Umgebung wie Langenhagen, Ronnenberg, Laatzen oder Isernhagen sind wir mit unserer zentralen Lage eine echte Empfehlung.",
      "Neben der regulären Fahrausbildung bieten wir in Hannover auch Intensivkurse und Ferienkurse an: Wenn du deinen Führerschein schnell machen möchtest, ist unser Crashkurs Führerschein Hannover ideal – dann hast du dein Fahrzeug in 2 bis 4 Wochen legal auf der Straße. Zusätzlich unterrichten wir mehrsprachig auf Deutsch, Englisch, Türkisch und Arabisch, damit Sprache nie eine Hürde ist. Egal ob BF17 (Begleitetes Fahren ab 17), B197 (Automatik + Schaltwagen), Motorradführerschein Hannover oder Führerscheinklasse für den Beruf: Bei der Fahrschule Metropol Hannover startest du bei einer der besten Fahrschulen in Hannover.",
    ],
    advantages: [
      "Zentrale Lage am Engelbosteler Damm – perfekt mit ÖPNV erreichbar",
      "Flexible Unterrichtszeiten Mo–Fr bis 19:00 Uhr",
      "Moderne Fahrzeugflotte für alle Führerscheinklassen",
      "Mehrsprachiger Unterricht: Deutsch, Englisch, Türkisch, Arabisch",
      "Rund 98 % Bestehensquote in Theorie und Praxis",
      "BF17 – Begleitetes Fahren ab 17 Jahren möglich",
      "Intensiv- und Crashkurse für einen schnellen Führerschein",
      "Erfahrung mit allen Prüfstrecken in Hannover",
    ],
    faqs: [
      { q: "Was kostet der Führerschein Klasse B in Hannover?", a: "Die Kosten für den Führerschein Klasse B in Hannover hängen von der Anzahl deiner Fahrstunden ab. Grundgebühren, Lehrmaterial und Prüfungsgebühren sind bei allen Fahrschulen ähnlich – die Fahrstunden machen den Unterschied. Wir beraten dich transparent und ohne versteckte Kosten." },
      { q: "Wie lange dauert der Führerschein in Hannover?", a: "Mit 2–3 Fahrstunden pro Woche und regelmäßigem Theorieunterricht dauert der Führerschein Klasse B in Hannover ca. 3–4 Monate. Mit einem Intensivkurs bzw. Crashkurs geht es in 2–4 Wochen." },
      { q: "Bietet die Fahrschule Metropol Hannover Intensivkurse an?", a: "Ja, Intensivkurse, Ferienkurse und Crashkurse gehören zum festen Angebot in Hannover. Damit ist der Führerschein schnell machbar – ideal für Schüler, Studenten und Berufstätige." },
      { q: "Kann ich in Hannover den Führerschein auf Automatik machen (B197)?", a: "Ja. Mit dem B197 machst du die Prüfung auf einem Automatikfahrzeug, darfst aber später auch Schaltwagen fahren. Ein moderner Weg zum Autoführerschein in Hannover." },
      { q: "Wo genau ist die Fahrschule Metropol in Hannover?", a: "Unser Standort in Hannover liegt am Engelbosteler Damm 1, 30167 Hannover (Nordstadt) – nur wenige Minuten von der Christuskirche und dem Hauptbahnhof entfernt." },
      { q: "Gibt es in Hannover Theorieunterricht auf Türkisch oder Arabisch?", a: "Ja, unser Theorieunterricht in Hannover ist auf Deutsch, Englisch, Türkisch und Arabisch verfügbar – ideal für internationale Fahrschüler." },
    ],
  },
  bremen: {
    longText: [
      "Die Fahrschule Metropol Bremen ist unser Hauptstandort und liegt direkt am Bahnhofsplatz 41 – nur wenige Schritte vom Bremer Hauptbahnhof entfernt. Damit erreichst du uns aus jeder Ecke Bremens sowie aus dem Umland (Bremerhaven, Delmenhorst, Achim, Weyhe, Osterholz-Scharmbeck) mit Bahn und Bus in wenigen Minuten. Seit über 20 Jahren bilden wir hier Fahrschüler in allen Führerscheinklassen aus – vom klassischen Autoführerschein Klasse B über den Motorradführerschein bis hin zu LKW- und Bus-Klassen für den Berufsverkehr.",
      "Der Führerschein in Bremen ist anspruchsvoll: Enge Altstadtgassen, Straßenbahnkreuzungen am Domshof und die Bundesstraße 6 fordern Präzision. Genau darauf bereiten wir dich gezielt vor. Unsere Fahrlehrer trainieren dich auf allen relevanten Prüfstrecken in Bremen, sodass du in der praktischen Prüfung selbstbewusst und sicher agierst. Die Bestehensquote von rund 98 % zeigt, dass unsere Methode funktioniert – gerade auch für Wiederholer, die eine strukturierte, faire Ausbildung suchen.",
      "Wir bieten in Bremen alle relevanten Führerscheinarten an: Klasse B (PKW), B197 (Automatik + Schaltwagen), BE (Anhänger), Motorradführerschein A/A1/A2/AM/B196, LKW-Führerschein Klasse C/CE sowie Busführerschein Klasse D. Zusätzlich zu regulären Kursen kannst du bei uns Intensivkurse und einen Führerschein-Crashkurs in Bremen absolvieren, um deinen Führerschein schnell zu machen. Auch Erste-Hilfe-Kurse und Aufbauseminare (ASF/FES/MPU-Vorbereitung) sind bei uns direkt vor Ort möglich – so hast du alles unter einem Dach.",
    ],
    advantages: [
      "Direkt am Bremer Hauptbahnhof – ideale ÖPNV-Anbindung",
      "Über 20 Jahre Erfahrung als Fahrschule in Bremen",
      "Fahrlehrer kennen alle Bremer Prüfstrecken",
      "Intensivkurse, Ferienkurse und Crashkurse verfügbar",
      "Mehrsprachiger Unterricht (Deutsch, Englisch, Türkisch, Arabisch)",
      "Moderne Schulungsräume mit digitaler Ausstattung",
      "Alle Klassen: PKW, Motorrad, LKW, Bus, Anhänger",
      "Erste-Hilfe-Kurs und Aufbauseminar direkt vor Ort",
    ],
    faqs: [
      { q: "Was kostet der Führerschein Klasse B in Bremen?", a: "Die Führerscheinkosten in Bremen hängen von der Anzahl der Fahrstunden ab. Grundgebühr, Prüfungsgebühren und Lehrmaterial sind bei allen Fahrschulen vergleichbar. Wir kalkulieren transparent und stimmen alles vorab mit dir ab." },
      { q: "Wie finde ich die Fahrschule Metropol in Bremen?", a: "Unsere Fahrschule Bremen liegt am Bahnhofsplatz 41, 28195 Bremen – direkt gegenüber vom Hauptbahnhof. Bus, Bahn, Regio-S-Bahn und Fernverkehr halten quasi vor der Tür." },
      { q: "Bietet die Fahrschule Metropol Bremen Erste-Hilfe-Kurse an?", a: "Ja, anerkannte Erste-Hilfe-Kurse sind direkt bei uns in Bremen buchbar – Voraussetzung für jeden Führerscheinantrag." },
      { q: "Kann ich in Bremen den Motorradführerschein machen?", a: "Ja, wir bilden alle Motorradklassen in Bremen aus: AM, A1, A2, A und die Erweiterung B196. Auch Umsteiger und Wiedereinsteiger sind willkommen." },
      { q: "Wie hoch ist die Bestehensquote?", a: "Unsere Bestehensquote in Bremen liegt bei rund 98 % – dank erfahrener Fahrlehrer, die alle Bremer Prüfstrecken kennen und dich individuell vorbereiten." },
      { q: "Gibt es LKW- und Bus-Führerscheine in Bremen?", a: "Ja, wir bilden in Bremen auch Klasse C/CE (LKW/Sattelzug) und Klasse D (Bus) aus – inkl. der beruflichen Weiterbildung." },
    ],
  },
  garbsen: {
    longText: [
      "Die Fahrschule Metropol Garbsen ist deine Fahrschule in der Region Hannover – zentral am Planetenring 25–27 gelegen, mit eigenem Parkplatz direkt vor der Tür und guter Anbindung mit den Buslinien 700, 620 und 630. Aus Garbsen, Berenbostel, Meyenfeld, Havelse, Osterwald und Seelze erreichst du uns in wenigen Minuten. Wer den Führerschein in Garbsen machen möchte, findet bei uns eine ruhige, familiäre Lernatmosphäre – ideal für alle, die stressfrei und geduldig zum Führerschein kommen möchten.",
      "Garbsen bietet einen entscheidenden Vorteil für Fahranfänger: Auf ruhigeren Straßen kannst du dich zunächst mit dem Fahrzeug vertraut machen, bevor es später auf die anspruchsvolleren Prüfstrecken in Hannover geht. Unsere Fahrlehrer bauen die Ausbildung genau darauf auf: Wir starten strukturiert in Garbsen und erweitern das Training Schritt für Schritt auf den innerstädtischen Verkehr. Das Ergebnis: entspanntes Lernen, mehr Sicherheit und weniger überflüssige Fahrstunden. Viele unserer Fahrschüler schätzen genau diesen Mix aus Ruhe und Praxisnähe.",
      "Bei uns in Garbsen kannst du alle gängigen Führerscheinklassen machen: Autoführerschein Klasse B, B197 (Automatik), BE (Anhänger), Motorradführerschein A, A1, A2, AM, B196, BF17 (Begleitetes Fahren ab 17) sowie regelmäßig Intensivkurse und Ferienkurse. Neu ab 01.07.: Theorieunterricht in Garbsen jeden Montag, Dienstag und Mittwoch von 18:30 bis 20:00 Uhr – perfekt planbar neben Schule, Ausbildung oder Beruf. Egal ob du eine günstige Fahrschule in Garbsen suchst oder einfach eine Fahrschule in deiner Nähe: Wir sind für dich da.",
    ],
    advantages: [
      "Ruhige Straßen in Garbsen – ideal für Fahranfänger",
      "Eigener Parkplatz direkt vor der Fahrschule",
      "Familiäre Atmosphäre und individuelle Betreuung",
      "Regelmäßige Intensiv- und Ferienkurse",
      "Neue Theoriezeiten Mo–Mi 18:30–20:00 Uhr (ab 01.07.)",
      "Gute Anbindung an Hannover und die Region",
      "Erfahrene, geduldige Fahrlehrer",
      "BF17 und alle PKW-/Motorradklassen möglich",
    ],
    faqs: [
      { q: "Warum sollte ich meinen Führerschein in Garbsen machen?", a: "Garbsen bietet ruhigere Straßen und eine entspannte Lernumgebung – ideal für Fahranfänger. In der Fahrschule Metropol Garbsen profitierst du zusätzlich von familiärer Atmosphäre und individueller Betreuung." },
      { q: "Wie komme ich zur Fahrschule Metropol in Garbsen?", a: "Unsere Fahrschule Garbsen liegt am Planetenring 25–27, 30823 Garbsen. Wir haben einen eigenen Parkplatz vor der Tür und sind mit den Buslinien 700, 620 und 630 sehr gut erreichbar." },
      { q: "Gibt es in Garbsen Intensivkurse für den Führerschein?", a: "Ja, Intensivkurse und Ferienkurse in Garbsen finden regelmäßig statt. So kannst du deinen Führerschein schnell machen – ideal für Ferien oder Semesterpausen." },
      { q: "Kann ich in Garbsen BF17 (Begleitetes Fahren ab 17) machen?", a: "Ja, BF17 ist in Garbsen verfügbar. Du kannst bereits mit 17 mit der Ausbildung fertig sein und dann mit einer Begleitperson legal fahren." },
      { q: "Welche Führerscheinklassen bietet Fahrschule Metropol in Garbsen an?", a: "In Garbsen bilden wir alle gängigen Klassen aus: PKW (B, B197, BE), Motorrad (AM, A1, A2, A, B196) sowie BF17." },
      { q: "Ist die Fahrschule Metropol Garbsen günstiger als in Hannover?", a: "Die Grundgebühren sind an allen Standorten gleich. Da du in Garbsen auf ruhigeren Straßen startest, benötigst du oft weniger Fahrstunden – das kann die Gesamtkosten senken und macht Garbsen zur günstigen Option." },
    ],
  },
};

const popularClassesForCity = [
  { icon: Car, name: "Klasse B", subtitle: "PKW-Führerschein", path: "/fuehrerschein/klasse-b", desc: "Der beliebteste Führerschein – für Fahrzeuge bis 3,5 t." },
  { icon: Car, name: "Klasse B197", subtitle: "Automatik + Schaltwagen", path: "/fuehrerschein/klasse-b197", desc: "Prüfung auf Automatik, trotzdem Schaltwagen fahren." },
  { icon: Bike, name: "Klasse A", subtitle: "Motorrad unbeschränkt", path: "/fuehrerschein/klasse-a", desc: "Alle Motorräder – ohne Limits." },
  { icon: Truck, name: "Klasse C/CE", subtitle: "LKW-Führerschein", path: "/fuehrerschein/klasse-c", desc: "LKW & Sattelzüge – dein Einstieg in den Güterverkehr." },
];

interface LocationData {
  name: string;
  address: string;
  zip: string;
  phone: string;
  email: string;
  hours: string[];
  description: string;
  longDescription: string;
  mapEmbed: string;
  mapsLink: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords?: string;
  image?: string;
  notice?: { title: string; text: string };
}

const LocationTemplate = ({ data }: { data: LocationData }) => {
  const { t } = useTranslation();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "additionalType": "https://schema.org/DrivingSchool",
      name: `Fahrschule Metropol ${data.name}`,
      description: data.longDescription,
      url: `https://fahrschule-metropol.de/standorte/${data.name.toLowerCase()}`,
      telephone: data.phone,
      email: data.email,
      image: data.image,
      priceRange: "€€",
      address: {
        "@type": "PostalAddress",
        streetAddress: data.address,
        addressLocality: data.name,
        postalCode: data.zip.split(" ")[0],
        addressRegion: data.name === "Bremen" ? "HB" : "NI",
        addressCountry: "DE",
      },
      geo: data.name === "Hannover"
        ? { "@type": "GeoCoordinates", latitude: 52.3879, longitude: 9.7243 }
        : data.name === "Garbsen"
        ? { "@type": "GeoCoordinates", latitude: 52.4163, longitude: 9.5980 }
        : { "@type": "GeoCoordinates", latitude: 53.0833, longitude: 8.8137 },
      openingHoursSpecification:
        data.name === "Garbsen"
          ? [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "14:30",
                closes: "18:30",
              },
              {
                "@type": "OpeningHoursSpecification",
                name: "Theorieunterricht",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday"],
                opens: "18:30",
                closes: "20:00",
                validFrom: "2026-07-01",
              },
            ]
          : [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "10:00",
                closes: "13:30",
              },
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "14:30",
                closes: "19:00",
              },
            ],
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "127" },
      sameAs: [
        "https://www.instagram.com/fahrschulemetropol/",
        "https://www.facebook.com/p/Fahrschule-Metropol-100037905975615/",
        "https://www.tiktok.com/@fahrschulemetropol",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Startseite", item: "https://fahrschule-metropol.de/" },
        { "@type": "ListItem", position: 2, name: t("locations.subtitle"), item: "https://fahrschule-metropol.de/standorte" },
        { "@type": "ListItem", position: 3, name: data.name, item: `https://fahrschule-metropol.de/standorte/${data.name.toLowerCase()}` },
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <SEO title={data.seoTitle} description={data.seoDescription} canonical={`https://fahrschule-metropol.de/standorte/${data.name.toLowerCase()}`} jsonLd={jsonLd} keywords={data.seoKeywords} />

      <section className="relative py-20 overflow-hidden">
        {data.image && (
          <>
            <img src={data.image} alt={`Fahrschule Metropol Standort ${data.name}`} className="absolute inset-0 h-full w-full object-cover" loading="eager" />
            <div className="hero-overlay absolute inset-0 noise" />
          </>
        )}
        {!data.image && <div className="absolute inset-0 gradient-dark noise" />}
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">{t("locations.location")}</span>
            <h1 className="text-4xl font-extrabold text-primary-foreground font-display md:text-6xl">{data.name}</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/50">{data.description}</p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto mb-12 max-w-3xl">
          <p className="text-muted-foreground leading-relaxed">{data.longDescription}</p>
        </motion.div>

        {data.notice && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-10 max-w-4xl"
          >
            <div className="relative overflow-hidden rounded-3xl border-2 border-primary/40 bg-primary/10 p-6 shadow-glow md:p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent" />
              <div className="relative flex flex-col gap-4 md:flex-row md:items-start">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
                  <Megaphone className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <span className="mb-1 inline-block rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground">
                    Neu · Wichtige Info
                  </span>
                  <h2 className="mt-2 text-xl font-bold text-foreground font-display md:text-2xl">
                    {data.notice.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80 md:text-base">
                    {data.notice.text}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl border border-border bg-card p-8 shadow-card">
              <h2 className="mb-6 text-xl font-bold text-foreground font-display">{t("locations.contactAndHours")}</h2>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                  <div><span className="font-medium text-foreground">{data.address}</span><br /><span className="text-muted-foreground">{data.zip}</span></div>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <a href={`tel:${data.phone.replace(/[^+\d]/g, "")}`} className="text-foreground hover:text-primary transition-colors">{data.phone}</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <a href={`mailto:${data.email}`} className="text-foreground hover:text-primary transition-colors">{data.email}</a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 text-primary" />
                  <div>{data.hours.map((h, i) => <div key={i} className="text-foreground">{h}</div>)}</div>
                </li>
              </ul>
              <a href={data.mapsLink} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
                <Navigation className="h-4 w-4" /> {t("common.planRoute")}
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="overflow-hidden rounded-3xl border border-border shadow-card">
              <iframe src={data.mapEmbed} width="100%" height="300" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={`Google Maps – Fahrschule Metropol ${data.name}`} />
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl border border-border bg-card p-8 shadow-card">
            <h2 className="mb-2 text-xl font-bold text-foreground font-display">{t("locations.signUpAt", { name: data.name })}</h2>
            <p className="mb-6 text-sm text-muted-foreground">{t("locations.fillForm")}</p>
            <ContactForm preselectedLocation={data.name} />
          </motion.div>
        </div>
      </div>

      {/* Related links for SEO */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="mb-4 text-lg font-bold text-foreground font-display">Beliebte Führerscheinklassen in {data.name}</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { label: `Führerschein Klasse B in ${data.name}`, path: "/fuehrerschein/klasse-b" },
                { label: `B197 Automatik in ${data.name}`, path: "/fuehrerschein/klasse-b197" },
                { label: `Motorrad Führerschein ${data.name}`, path: "/fuehrerschein/klasse-a" },
                { label: `BF17 in ${data.name}`, path: "/fuehrerschein/klasse-b" },
                { label: `LKW Führerschein ${data.name}`, path: "/fuehrerschein/klasse-c" },
                { label: `Erste-Hilfe-Kurs ${data.name}`, path: "/erste-hilfe" },
              ].map((link) => (
                <Link key={link.label} to={link.path} className="rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary">
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <InternalLinks exclude={["locations"]} title={`Mehr entdecken – Fahrschule Metropol ${data.name}`} />
    </div>
  );
};

export default LocationTemplate;
