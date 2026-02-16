import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";

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
  image?: string;
}

const LocationTemplate = ({ data }: { data: LocationData }) => {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "DrivingSchool",
      name: `Fahrschule Metropol ${data.name}`,
      telephone: data.phone,
      email: data.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: data.address,
        addressLocality: data.name,
        postalCode: data.zip.split(" ")[0],
        addressCountry: "DE",
      },
      openingHoursSpecification: data.hours.map((h) => ({
        "@type": "OpeningHoursSpecification",
        description: h,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Startseite", item: "https://fahrschule-metropol.de/" },
        { "@type": "ListItem", position: 2, name: "Standorte", item: "https://fahrschule-metropol.de/standorte" },
        { "@type": "ListItem", position: 3, name: data.name, item: `https://fahrschule-metropol.de/standorte/${data.name.toLowerCase()}` },
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <SEO title={data.seoTitle} description={data.seoDescription} canonical={`https://fahrschule-metropol.de/standorte/${data.name.toLowerCase()}`} jsonLd={jsonLd} />

      <section className="relative py-20 overflow-hidden">
        {data.image && (
          <>
            <img
              src={data.image}
              alt={`Fahrschule Metropol Standort ${data.name}`}
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
            />
            <div className="hero-overlay absolute inset-0 noise" />
          </>
        )}
        {!data.image && <div className="absolute inset-0 gradient-dark noise" />}
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">Standort</span>
            <h1 className="text-4xl font-extrabold text-primary-foreground font-display md:text-6xl">
              {data.name}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/50">{data.description}</p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Long description for SEO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-3xl"
        >
          <p className="text-muted-foreground leading-relaxed">{data.longDescription}</p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-border bg-card p-8 shadow-card"
            >
              <h2 className="mb-6 text-xl font-bold text-foreground font-display">Kontaktdaten & Öffnungszeiten</h2>
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
              <a
                href={data.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Navigation className="h-4 w-4" /> Route planen
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-3xl border border-border shadow-card"
            >
              <iframe
                src={data.mapEmbed}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Google Maps – Fahrschule Metropol ${data.name}`}
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-border bg-card p-8 shadow-card"
          >
            <h2 className="mb-2 text-xl font-bold text-foreground font-display">Jetzt in {data.name} anmelden</h2>
            <p className="mb-6 text-sm text-muted-foreground">Fülle das Formular aus – wir melden uns schnellstmöglich.</p>
            <ContactForm preselectedLocation={data.name} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LocationTemplate;
