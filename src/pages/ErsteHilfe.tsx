import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail, Clock, MapPin, CheckCircle, Shield, MessageCircle, Heart } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEO from "@/components/SEO";
import ContactForm from "@/components/ContactForm";
import heroImage from "@/assets/hero-erste-hilfe.jpg";

const faqs = [
  {
    question: "Wie viele Erste-Hilfe-Stunden braucht man für den Führerschein?",
    answer: "9 Unterrichtseinheiten à 45 Minuten – das entspricht einem Kurstag.",
  },
  {
    question: "Wie alt darf der Erste-Hilfe-Kurs sein?",
    answer: "Der Kurs darf bei Antragstellung des Führerscheins nicht älter als 2 Jahre sein.",
  },
  {
    question: "Braucht man einen Erste-Hilfe-Kurs für Klasse BE?",
    answer: "Ja, bei erstmaligem Führerscheinerwerb oder Erweiterung ist der Kurs erforderlich.",
  },
  {
    question: "Kann man mit dem Führerschein anfangen, ohne den Kurs?",
    answer: "Ja – aber du brauchst ihn zur Anmeldung bei der Fahrerlaubnisbehörde.",
  },
  {
    question: "Wird ein Online-Kurs anerkannt?",
    answer: "Nein – der Kurs muss in Präsenz absolviert werden.",
  },
  {
    question: "Kann man im Erste-Hilfe-Kurs durchfallen?",
    answer: "Nein – du musst aktiv mitmachen, aber es gibt keine Prüfung.",
  },
];

const ErsteHilfe = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Erste-Hilfe-Kurs bei Fahrschule Metropol",
    description: "Erste-Hilfe-Kurs für den Führerschein in Hannover, Bremen & Garbsen. 9 Unterrichtseinheiten an nur einem Tag – behördlich anerkannt.",
    provider: {
      "@type": "DrivingSchool",
      name: "Fahrschule Metropol",
      url: "https://fahrschule-metropol.de",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Erste-Hilfe-Kurs in Hannover, Bremen & Garbsen | Fahrschule Metropol"
        description="Erste-Hilfe-Kurs für den Führerschein – 9 Unterrichtseinheiten an nur einem Tag. Behördlich anerkannt, regelmäßige Termine. Jetzt anmelden!"
        canonical="https://fahrschule-metropol.de/erste-hilfe"
        jsonLd={[jsonLd, faqJsonLd]}
      />

      {/* Hero */}
      <section className="relative min-h-[340px] md:min-h-[480px] flex items-end overflow-hidden">
        <img
          src={heroImage}
          alt="Erste-Hilfe-Kurs bei Fahrschule Metropol"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="container relative z-10 mx-auto px-4 pb-8 pt-28 md:pb-10 md:pt-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <p className="mb-1 text-xs md:text-sm font-semibold text-primary-foreground/60">Pflicht für den Führerschein</p>
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-extrabold text-primary-foreground font-display leading-tight">
              Erste-Hilfe-Kurse in<br />Hannover & Bremen
            </h1>
            <div className="mt-4 md:mt-6">
              <Button variant="cta" size="lg" asChild className="w-full sm:w-auto">
                <Link to="/kontakt">
                  Jetzt Termin vereinbaren <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="mb-4 md:mb-6 text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground font-display">
                Dein Erste-Hilfe-Kurs in nur einem Tag!
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                Für den Führerschein ist ein Erste-Hilfe-Kurs Pflicht: 9 Unterrichtseinheiten à 45 Minuten an nur einem Tag – bei Metropol schnell erledigt. Unsere Kurse sind von allen Behörden anerkannt und werden regelmäßig angeboten. Ideal kombinierbar mit deinem Theorieunterricht!
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="pb-8 md:pb-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border bg-card p-5 md:p-6 shadow-card"
            >
              <Clock className="mb-2 md:mb-3 h-5 w-5 md:h-6 md:w-6 text-primary" />
              <h4 className="text-sm font-bold text-foreground mb-1.5 md:mb-2">Dauer & Umfang</h4>
              <ul className="space-y-1 md:space-y-1.5 text-xs md:text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  9 Unterrichtseinheiten à 45 Min.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  Komplett an einem Tag
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  Theorie & praktische Übungen
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-border bg-card p-5 md:p-6 shadow-card"
            >
              <Shield className="mb-2 md:mb-3 h-5 w-5 md:h-6 md:w-6 text-primary" />
              <h4 className="text-sm font-bold text-foreground mb-1.5 md:mb-2">Behördlich anerkannt</h4>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                Unser Kurs wird von allen Fahrerlaubnisbehörden anerkannt und ist gültig für alle Führerscheinklassen.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border border-border bg-card p-5 md:p-6 shadow-card"
            >
              <MapPin className="mb-2 md:mb-3 h-5 w-5 md:h-6 md:w-6 text-primary" />
              <h4 className="text-sm font-bold text-foreground mb-1.5 md:mb-2">Standorte</h4>
              <ul className="space-y-1 md:space-y-1.5 text-xs md:text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                  <Link to="/standorte/hannover" className="hover:text-primary transition-colors">Hannover</Link>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                  <Link to="/standorte/bremen" className="hover:text-primary transition-colors">Bremen</Link>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                  <Link to="/standorte/garbsen" className="hover:text-primary transition-colors">Garbsen</Link>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vorteile */}
      <section className="py-10 md:py-12 gradient-section">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:gap-8 md:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-2.5 md:gap-3 mb-4 md:mb-5">
                <Heart className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                <h2 className="text-lg md:text-xl font-bold text-foreground font-display">Was du lernst</h2>
              </div>
              <ul className="space-y-2.5 md:space-y-3">
                {[
                  "Absichern der Unfallstelle & Notruf absetzen",
                  "Stabile Seitenlage & Herz-Lungen-Wiederbelebung",
                  "Wundversorgung & Verbände anlegen",
                  "Umgang mit Schock und Bewusstlosigkeit",
                  "Verhalten bei Verkehrsunfällen",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 md:gap-3 text-xs md:text-sm text-muted-foreground">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div className="flex items-center gap-2.5 md:gap-3 mb-4 md:mb-5">
                <Shield className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                <h2 className="text-lg md:text-xl font-bold text-foreground font-display">Deine Vorteile bei Metropol</h2>
              </div>
              <ul className="space-y-2.5 md:space-y-3">
                {[
                  "Regelmäßige Termine – schnell einen Platz finden",
                  "Erfahrene, zertifizierte Ausbilder",
                  "Behördlich anerkannt für alle Führerscheinklassen",
                  "Ideal kombinierbar mit deinem Theorieunterricht",
                  "Moderne Schulungsräume an allen Standorten",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 md:gap-3 text-xs md:text-sm text-muted-foreground">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6 md:mb-10 text-center">
            <span className="mb-1.5 md:mb-2 inline-block text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-primary">FAQ</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground font-display">
              Antworten auf häufige Fragen
            </h2>
          </motion.div>
          <div className="mx-auto max-w-2xl">
            <Accordion type="single" collapsible className="space-y-2 md:space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl md:rounded-2xl border border-border bg-card px-4 md:px-6 shadow-card">
                  <AccordionTrigger className="text-left text-sm md:text-base font-semibold text-foreground hover:no-underline py-3 md:py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs md:text-sm text-muted-foreground leading-relaxed pb-3 md:pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact & Form */}
      <section className="py-10 md:py-16 gradient-section">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:gap-10 lg:grid-cols-5">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-2">
              <span className="mb-1.5 md:mb-2 inline-block text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-primary">Kontakt & Beratung</span>
              <h2 className="mb-3 md:mb-4 text-xl md:text-2xl lg:text-3xl font-extrabold text-foreground font-display">
                Erste-Hilfe-Kurs buchen
              </h2>
              <p className="mb-6 md:mb-8 text-sm text-muted-foreground leading-relaxed">
                Füll das Formular aus und wir informieren dich über die nächsten Termine an deinem Standort.
              </p>

              <div className="mb-6 md:mb-8 grid grid-cols-2 gap-2 md:gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 md:px-4 py-2.5 md:py-3 shadow-card">
                  <MessageCircle className="h-4 w-4 md:h-5 md:w-5 text-primary shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[11px] md:text-xs font-bold text-foreground truncate">Schnelle Antwort</p>
                    <p className="text-[9px] md:text-[10px] text-muted-foreground">innerhalb von 24h</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 md:px-4 py-2.5 md:py-3 shadow-card">
                  <Shield className="h-4 w-4 md:h-5 md:w-5 text-primary shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[11px] md:text-xs font-bold text-foreground truncate">100% unverbindlich</p>
                    <p className="text-[9px] md:text-[10px] text-muted-foreground">Kostenlose Beratung</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full gradient-primary text-primary-foreground shrink-0">
                    <Phone className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs text-muted-foreground">Telefonisch erreichbar</p>
                    <a href="tel:+4942112345" className="text-sm font-bold text-foreground hover:text-primary transition-colors">0421 / 123 45</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-accent text-accent-foreground shrink-0">
                    <Mail className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] md:text-xs text-muted-foreground">E-Mail Kontakt</p>
                    <a href="mailto:info@fahrschule-metropol.de" className="text-sm font-bold text-foreground hover:text-primary transition-colors truncate block">info@fahrschule-metropol.de</a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="lg:col-span-3">
              <div className="rounded-2xl border border-border bg-card p-5 md:p-8 shadow-card">
                <h3 className="mb-1.5 md:mb-2 text-base md:text-lg font-bold text-foreground font-display">Unverbindliche Anfrage</h3>
                <p className="mb-4 md:mb-6 text-xs md:text-sm text-muted-foreground">
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

export default ErsteHilfe;
