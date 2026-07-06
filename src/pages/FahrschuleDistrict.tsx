import { useLocation, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Phone, CheckCircle, Car, Bike, Truck, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEO from "@/components/SEO";
import InternalLinks from "@/components/InternalLinks";
import ContactForm from "@/components/ContactForm";
import { getDistrict, districts, districtsByParent } from "@/data/districtData";

const parentInfo = {
  hannover: {
    city: "Hannover",
    address: "Engelbosteler Damm 1",
    zip: "30167",
    phone: "0511 6425066",
    locationPath: "/standorte/hannover",
  },
  garbsen: {
    city: "Garbsen",
    address: "Planetenring 25–27",
    zip: "30823",
    phone: "05137 8903395",
    locationPath: "/standorte/garbsen",
  },
  bremen: {
    city: "Bremen",
    address: "Bahnhofsplatz 41",
    zip: "28195",
    phone: "0421 48445910",
    locationPath: "/standorte/bremen",
  },
} as const;

const popularClasses = [
  { icon: Car, name: "Klasse B", subtitle: "PKW-Führerschein", path: "/fuehrerschein/klasse-b" },
  { icon: Car, name: "Klasse B197", subtitle: "Automatik + Schalter", path: "/fuehrerschein/klasse-b197" },
  { icon: Bike, name: "Klasse A", subtitle: "Motorrad", path: "/fuehrerschein/klasse-a" },
  { icon: Truck, name: "Klasse C/CE", subtitle: "LKW", path: "/fuehrerschein/klasse-c" },
];

const FahrschuleDistrict = () => {
  const slug = useLocation().pathname.replace(/^\/fahrschule-/, "");
  const district = getDistrict(slug);

  if (!district) return <Navigate to="/standorte" replace />;

  const parent = parentInfo[district.parent];
  const canonical = `https://fahrschule-metropol.de/fahrschule-${district.slug}`;
  const title = `Fahrschule ${district.name} – Führerschein aller Klassen | Metropol`;
  const description = `Fahrschule in ${district.name}: PKW, Motorrad, LKW & Bus. Nächster Metropol-Standort in ${parent.city}, nur ${district.distanceKm} km entfernt. Jetzt Führerschein starten!`;
  const keywords = [
    `Fahrschule ${district.name}`,
    `Führerschein ${district.name}`,
    `Fahrschule in ${district.name}`,
    `Führerschein machen ${district.name}`,
    `Klasse B ${district.name}`,
    `Motorradführerschein ${district.name}`,
    `Intensivkurs ${district.name}`,
    `BF17 ${district.name}`,
    `Fahrschule Metropol ${district.name}`,
    `Fahrschule in der Nähe ${district.name}`,
    `Beste Fahrschule ${district.name}`,
    `Führerschein Kosten ${district.name}`,
  ].join(", ");

  const faqs = [
    {
      q: `Gibt es eine Fahrschule direkt in ${district.name}?`,
      a: `Der nächstgelegene Standort der Fahrschule Metropol befindet sich in ${parent.city} (${parent.address}, ${parent.zip} ${parent.city}) – nur ca. ${district.distanceKm} km von ${district.name} entfernt und bequem erreichbar.`,
    },
    {
      q: `Wie komme ich aus ${district.name} zur Fahrschule?`,
      a: `${district.name} ist gut an ${parent.city} angebunden. Viele unserer Fahrschüler nutzen ÖPNV; auf Wunsch starten deine Fahrstunden direkt ab deinem Wohnort in ${district.name}.`,
    },
    {
      q: `Welche Führerscheinklassen kann ich für ${district.name} machen?`,
      a: `Wir bilden für alle gängigen Klassen aus: PKW (B, B197, BE), Motorrad (AM, A1, A2, A), LKW (C, C1, CE) und Bus (D, DE) – für Fahrschüler aus ${district.name} und Umgebung.`,
    },
    {
      q: `Was kostet der Führerschein für Fahrschüler aus ${district.name}?`,
      a: `Die Kosten sind für alle Fahrschüler gleich – transparent und ohne versteckte Gebühren. Konkrete Preise findest du auf unserer Preisseite oder in einem persönlichen Beratungsgespräch.`,
    },
    {
      q: `Bietet ihr Intensivkurse für ${district.name} an?`,
      a: `Ja, in den Schulferien und ganzjährig bieten wir Intensiv- und Ferienkurse an. So kannst du deinen Führerschein aus ${district.name} in wenigen Wochen abschließen.`,
    },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      additionalType: "https://schema.org/DrivingSchool",
      name: `Fahrschule Metropol – für ${district.name}`,
      url: canonical,
      telephone: parent.phone,
      areaServed: { "@type": "Place", name: district.name },
      address: {
        "@type": "PostalAddress",
        streetAddress: parent.address,
        addressLocality: parent.city,
        postalCode: parent.zip,
        addressRegion: district.region,
        addressCountry: "DE",
      },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "127" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Startseite", item: "https://fahrschule-metropol.de/" },
        { "@type": "ListItem", position: 2, name: `Fahrschule ${parent.city}`, item: `https://fahrschule-metropol.de/fahrschule-${district.parent}` },
        { "@type": "ListItem", position: 3, name: `Fahrschule ${district.name}`, item: canonical },
      ],
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
  ];

  const siblings = districtsByParent(district.parent).filter((d) => d.slug !== district.slug).slice(0, 6);

  return (
    <div className="min-h-screen pt-20">
      <SEO title={title} description={description} canonical={canonical} jsonLd={jsonLd} keywords={keywords} />

      {/* Hero */}
      <section className="gradient-dark py-20 noise relative overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="mb-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <MapPin className="h-3.5 w-3.5" />
              {district.name} · Region {parent.city}
            </span>
            <h1 className="text-4xl font-extrabold text-primary-foreground font-display md:text-6xl">
              Fahrschule {district.name}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/60">{district.intro}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button variant="hero" asChild>
                <Link to="/kontakt">Jetzt anmelden <ArrowRight className="h-5 w-5" /></Link>
              </Button>
              <Button variant="hero-outline" asChild>
                <a href={`tel:${parent.phone.replace(/[^+\d]/g, "")}`}><Phone className="h-5 w-5" /> {parent.phone}</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro / nearest branch */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-extrabold text-foreground font-display md:text-3xl">
              Führerschein machen aus {district.name}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Für alle Fahrschüler aus {district.name} ({district.zipHint}) ist unser Standort in{" "}
              <Link to={parent.locationPath} className="font-semibold text-primary hover:underline">
                {parent.city}, {parent.address}
              </Link>{" "}
              nur ca. {district.distanceKm} km entfernt. Wir bilden dich hier für alle gängigen Führerscheinklassen aus –
              professionell, mehrsprachig und mit über 20 Jahren Erfahrung.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-12 gradient-section">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-xl font-bold text-foreground font-display">Deine Vorteile in {district.name}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {district.advantages.map((adv, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-card">
                <CheckCircle className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">{adv}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular classes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-2xl font-extrabold text-foreground font-display md:text-3xl">
            Beliebte Führerscheinklassen für {district.name}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popularClasses.map((cls, i) => (
              <motion.div key={cls.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Link to={cls.path} className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-500 hover:shadow-card-hover hover:-translate-y-1">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-all duration-500 group-hover:gradient-primary group-hover:text-primary-foreground">
                    <cls.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-0.5 text-lg font-bold text-foreground font-display">{cls.name}</h3>
                  <p className="mb-2 text-xs font-semibold text-primary">{cls.subtitle}</p>
                  <span className="mt-auto flex items-center gap-1.5 text-xs font-bold text-primary transition-all group-hover:gap-2.5">
                    Mehr erfahren <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 gradient-section">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <HelpCircle className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-extrabold text-foreground font-display md:text-3xl">
                Häufige Fragen – Fahrschule {district.name}
              </h2>
            </div>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl border border-border bg-card px-6 shadow-card">
                  <AccordionTrigger className="text-left text-sm font-bold text-foreground hover:text-primary py-4">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl font-extrabold text-foreground font-display">Jetzt Führerschein in {district.name} starten</h2>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                Melde dich unverbindlich an – wir beraten dich zu Klassen, Preisen und Terminen. Nächster Standort:{" "}
                <Link to={parent.locationPath} className="font-semibold text-primary hover:underline">Fahrschule Metropol {parent.city}</Link>.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary text-primary-foreground"><Phone className="h-4 w-4" /></div>
                  <a href={`tel:${parent.phone.replace(/[^+\d]/g, "")}`} className="text-sm font-bold text-foreground hover:text-primary">{parent.phone}</a>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground"><MapPin className="h-4 w-4" /></div>
                  <Link to={parent.locationPath} className="text-sm font-bold text-foreground hover:text-primary">{parent.address}, {parent.zip} {parent.city}</Link>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
              <h3 className="mb-2 text-lg font-bold text-foreground font-display">Unverbindliche Anfrage</h3>
              <p className="mb-6 text-sm text-muted-foreground">Kostenlos & unverbindlich – Antwort innerhalb 24 h.</p>
              <ContactForm preselectedLocation={parent.city} />
            </div>
          </div>
        </div>
      </section>

      {/* Nearby districts */}
      {siblings.length > 0 && (
        <section className="py-12 gradient-section">
          <div className="container mx-auto px-4">
            <h2 className="mb-6 text-xl font-bold text-foreground font-display">
              Weitere Orte in der Region {parent.city}
            </h2>
            <div className="flex flex-wrap gap-2">
              {siblings.map((s) => (
                <Link key={s.slug} to={`/fahrschule-${s.slug}`} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-card hover:bg-accent hover:text-accent-foreground transition-colors">
                  Fahrschule {s.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <InternalLinks exclude={["locations"]} title="Weitere Informationen zur Fahrschule Metropol" />
    </div>
  );
};

export default FahrschuleDistrict;
export { districts };
