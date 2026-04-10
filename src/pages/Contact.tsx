import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import ContactForm from "@/components/ContactForm";
import SEO from "@/components/SEO";
import heroKontakt from "@/assets/hero-kontakt.jpg";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Startseite", item: "https://fahrschule-metropol.de/" },
    { "@type": "ListItem", position: 2, name: "Kontakt", item: "https://fahrschule-metropol.de/kontakt" },
  ],
};

const Contact = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen pt-20">
      <SEO title={t("contact.seoTitle")} description={t("contact.seoDesc")} canonical="https://fahrschule-metropol.de/kontakt" jsonLd={[breadcrumbSchema]} keywords="Fahrschule Kontakt, Fahrschule Metropol Kontakt, Fahrschule Hannover Kontakt, Fahrschule Bremen Kontakt, Fahrschule Garbsen Kontakt, Fahrschule Telefonnummer, Fahrschule Anmeldung, Fahrschule in der Nähe, Fahrschule Öffnungszeiten, Fahrschule anmelden online, Führerschein anmelden, Fahrschule E-Mail, Fahrschule Beratung, Probestunde Fahrschule" />

      <section className="relative overflow-hidden py-20 noise">
        <div className="absolute inset-0">
          <img src={heroKontakt} alt="Metropol Fahrschulwagen" className="h-full w-full object-cover" />
        </div>
        <div className="hero-overlay absolute inset-0 noise" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">{t("contact.subtitle")}</span>
            <h1 className="text-4xl font-extrabold text-primary-foreground font-display md:text-6xl">{t("contact.title")}</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/50">{t("contact.heroText")}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-5">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-3">
              <div className="rounded-3xl border border-border bg-card p-8 shadow-card">
                <h2 className="mb-2 text-2xl font-bold text-foreground font-display">{t("contact.formTitle")}</h2>
                <p className="mb-6 text-sm text-muted-foreground">{t("contact.formDesc")}</p>
                <ContactForm />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="space-y-5 lg:col-span-2">
              <div className="rounded-3xl border border-border bg-card p-8 shadow-card">
                <h3 className="mb-5 text-lg font-bold text-foreground font-display">{t("contact.directContact")}</h3>
                <ul className="space-y-4 text-sm">
                  <li className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <a href="tel:+495116425066" className="text-foreground font-medium hover:text-primary transition-colors">0511 6425066</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <a href="mailto:info@fahrschule-metropol.de" className="text-foreground font-medium hover:text-primary transition-colors">info@fahrschule-metropol.de</a>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 text-primary" />
                    <div className="text-foreground">{t("contact.hoursLabel")}<br />{t("contact.hoursClosed")}</div>
                  </li>
                </ul>
              </div>

              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground pt-2">{t("contact.ourLocations")}</h3>
              {[
                { name: "Bremen", addr: "Bahnhofsplatz 41, 28195 Bremen", path: "/standorte/bremen" },
                { name: "Garbsen", addr: "Planetenring 25–27, 30823 Garbsen", path: "/standorte/garbsen" },
                { name: "Hannover", addr: "Engelbosteler Damm 1, 30167 Hannover", path: "/standorte/hannover" },
              ].map((loc) => (
                <a key={loc.name} href={loc.path} className="group flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-card transition-all hover:shadow-card-hover hover:-translate-y-0.5">
                  <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <span className="font-bold text-foreground font-display text-sm">{loc.name}</span><br />
                    <span className="text-xs text-muted-foreground">{loc.addr}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/50 mt-1 transition-transform group-hover:translate-x-0.5" />
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
