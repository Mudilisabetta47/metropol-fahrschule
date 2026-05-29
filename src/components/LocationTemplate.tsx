import { MapPin, Phone, Mail, Clock, Navigation, Megaphone } from "lucide-react";
import { Link } from "react-router-dom";
import InternalLinks from "@/components/InternalLinks";
import ContactForm from "@/components/ContactForm";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

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
      openingHoursSpecification: [
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
