import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, MapPin, Clock, Users, FileCheck, ArrowRight, Phone, Mail, CheckCircle, Calendar, Shield, MessageCircle, ChevronLeft } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEO from "@/components/SEO";
import ContactForm from "@/components/ContactForm";
import type { LicenseClassData } from "@/data/licenseClassData";
import heroImage from "@/assets/hero-driving.jpg";

interface Props {
  data: LicenseClassData;
}

const locations = [
  { name: "Hannover", path: "/standorte/hannover" },
  { name: "Bremen", path: "/standorte/bremen" },
  { name: "Garbsen", path: "/standorte/garbsen" },
];

const LicenseClassPage = ({ data }: Props) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${data.name} – ${data.subtitle}`,
    description: data.seoDescription,
    provider: {
      "@type": "DrivingSchool",
      name: "Fahrschule Metropol",
      url: "https://fahrschule-metropol.de",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div className="min-h-screen">
      <SEO
        title={data.seoTitle}
        description={data.seoDescription}
        canonical={`https://fahrschule-metropol.de/fuehrerschein/${data.slug}`}
        jsonLd={[jsonLd, faqJsonLd]}
      />

      {/* Hero with image */}
      <section className="relative min-h-[420px] md:min-h-[480px] flex items-end overflow-hidden">
        <img
          src={heroImage}
          alt={`${data.name} – ${data.subtitle} bei Fahrschule Metropol`}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="container relative z-10 mx-auto px-4 pb-10 pt-32">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <Link
              to="/fuehrerscheinklassen"
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary-foreground/60 hover:text-primary-foreground transition-colors"
            >
              <ChevronLeft className="h-3 w-3" /> Zurück zur Übersicht
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <p className="mb-1 text-sm font-semibold text-primary-foreground/60">{data.subtitle}</p>
            <h1 className="text-4xl font-extrabold text-primary-foreground font-display md:text-6xl">
              Führerschein {data.name.replace("Klasse ", "")}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Description + CTA Card */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left: Description & meta */}
            <div className="lg:col-span-2">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-muted-foreground leading-relaxed text-base mb-6"
              >
                {data.heroDescription}
              </motion.p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-primary" /> {data.details.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <FileCheck className="h-4 w-4 text-primary" /> Auf Anfrage / Förderfähig
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-primary" /> Hannover · Bremen · Garbsen
                </span>
              </div>
            </div>

            {/* Right: CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border bg-card p-6 shadow-card lg:-mt-28 relative z-20"
            >
              <h3 className="mb-4 text-lg font-bold text-foreground font-display">Jetzt anmelden</h3>
              <div className="space-y-3">
                <Button variant="cta" size="lg" className="w-full" asChild>
                  <Link to="/kontakt">
                    Unverbindlich anfragen <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="w-full" asChild>
                  <a href="tel:+4942112345">
                    <Phone className="mr-2 h-4 w-4 text-primary" /> 0421 / 123 45
                  </a>
                </Button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground text-center leading-relaxed">
                100% kostenlos & unverbindlich.
                <br />
                Wir melden uns innerhalb von 24 Stunden.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Info Cards Row */}
      <section className="pb-10">
        <div className="container mx-auto px-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border bg-card p-6 shadow-card"
            >
              <Calendar className="mb-3 h-6 w-6 text-primary" />
              <h4 className="text-sm font-bold text-foreground mb-2">Ausbildungsdetails</h4>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  Dauer: {data.details.duration}
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  {data.details.includes}
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  {data.details.exam}
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-card"
            >
              <Shield className="mb-3 h-6 w-6 text-primary" />
              <h4 className="text-sm font-bold text-foreground mb-2">Preis & Förderung</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Preis auf Anfrage. Fördermöglichkeiten durch Bildungsgutschein oder Agentur für Arbeit / Jobcenter möglich.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-card"
            >
              <MapPin className="mb-3 h-6 w-6 text-primary" />
              <h4 className="text-sm font-bold text-foreground mb-2">Standorte</h4>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {locations.map((loc) => (
                  <li key={loc.name} className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    <Link to={loc.path} className="hover:text-primary transition-colors">{loc.name}</Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Voraussetzungen & Vorteile */}
      <section className="py-12 gradient-section">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-5">
                <FileCheck className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-bold text-foreground font-display">Voraussetzungen</h2>
              </div>
              <ul className="space-y-3">
                {data.prerequisites.map((p, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <Shield className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-bold text-foreground font-display">Deine Vorteile</h2>
              </div>
              <ul className="space-y-3">
                {data.advantages.map((a, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                    {a}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ablauf */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">Ablauf</span>
            <h2 className="text-3xl font-extrabold text-foreground font-display md:text-4xl">
              So läuft deine Ausbildung ab
            </h2>
          </motion.div>
          <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
            {data.process.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
              >
                <span className="mb-2 inline-block text-3xl font-extrabold gradient-text font-display">
                  {step.step}
                </span>
                <h3 className="mb-2 text-lg font-bold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 gradient-section">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">FAQ</span>
            <h2 className="text-3xl font-extrabold text-foreground font-display md:text-4xl">
              Häufige Fragen zu {data.name}
            </h2>
          </motion.div>
          <div className="mx-auto max-w-2xl">
            <Accordion type="single" collapsible className="space-y-3">
              {data.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="rounded-2xl border border-border bg-card px-6 shadow-card">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact & Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Left side: info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">Kontakt & Beratung</span>
              <h2 className="mb-4 text-2xl font-extrabold text-foreground font-display md:text-3xl">
                Interesse an: {data.name}
              </h2>
              <p className="mb-8 text-muted-foreground leading-relaxed">
                Füll das Formular aus und wir beraten dich kostenlos und unverbindlich zu allen Details, Voraussetzungen und Fördermöglichkeiten.
              </p>

              {/* Trust badges */}
              <div className="mb-8 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 shadow-card">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs font-bold text-foreground">Schnelle Antwort</p>
                    <p className="text-[10px] text-muted-foreground">innerhalb von 24 Stunden</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 shadow-card">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs font-bold text-foreground">100% unverbindlich</p>
                    <p className="text-[10px] text-muted-foreground">Kostenlose Beratung</p>
                  </div>
                </div>
              </div>

              {/* Contact details */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary text-primary-foreground">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Telefonisch erreichbar</p>
                    <a href="tel:+4942112345" className="text-sm font-bold text-foreground hover:text-primary transition-colors">0421 / 123 45</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">E-Mail Kontakt</p>
                    <a href="mailto:info@fahrschule-metropol.de" className="text-sm font-bold text-foreground hover:text-primary transition-colors">info@fahrschule-metropol.de</a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right side: form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-3"
            >
              <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
                <h3 className="mb-2 text-lg font-bold text-foreground font-display">Unverbindliche Anfrage</h3>
                <p className="mb-6 text-sm text-muted-foreground">
                  Füll das Formular aus und wir melden uns bei dir – persönlich, nicht automatisch.
                </p>
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LicenseClassPage;
