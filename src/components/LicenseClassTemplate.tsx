import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, MapPin, Clock, Users, FileCheck, ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEO from "@/components/SEO";
import type { LicenseClassData } from "@/data/licenseClassData";

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
    <div className="min-h-screen pt-20">
      <SEO
        title={data.seoTitle}
        description={data.seoDescription}
        canonical={`https://fahrschule-metropol.de/fuehrerschein-${data.slug}`}
        jsonLd={[jsonLd, faqJsonLd]}
      />

      {/* Hero */}
      <section className="gradient-dark py-20 noise relative overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">
              {data.subtitle}
            </span>
            <h1 className="text-4xl font-extrabold text-primary-foreground font-display md:text-6xl">
              {data.name}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/50">
              {data.heroDescription}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button variant="cta" size="lg" asChild>
                <Link to="/kontakt">
                  Jetzt anmelden <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/fuehrerscheinklassen">Alle Klassen</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Details Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Users, label: "Mindestalter", value: data.details.minAge },
              { icon: Clock, label: "Dauer", value: data.details.duration },
              { icon: FileCheck, label: "Umfang", value: data.details.includes },
              { icon: FileCheck, label: "Prüfung", value: data.details.exam },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-card p-6 shadow-card"
              >
                <item.icon className="mb-3 h-6 w-6 text-primary" />
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{item.label}</p>
                <p className="mt-1 text-sm font-bold text-foreground">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 gradient-section">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl"
          >
            <h2 className="mb-8 text-3xl font-extrabold text-foreground font-display md:text-4xl">
              Was ist {data.name}?
            </h2>
            <div className="space-y-4">
              {data.description.map((p, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">Ablauf</span>
            <h2 className="text-3xl font-extrabold text-foreground font-display md:text-4xl">
              So läuft deine Ausbildung ab
            </h2>
          </motion.div>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {data.process.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
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

      {/* Price CTA */}
      <section className="py-16 gradient-dark noise relative overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-3xl font-extrabold text-primary-foreground font-display">
              Preis auf Anfrage
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-primary-foreground/50">
              Die Kosten für {data.name} hängen von deinem individuellen Ausbildungsverlauf ab. 
              Kontaktiere uns für ein persönliches Angebot – unverbindlich und kostenlos.
            </p>
            <Button variant="cta" size="lg" asChild>
              <Link to="/kontakt">
                Jetzt Angebot anfragen <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
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

      {/* Locations CTA */}
      <section className="py-16 gradient-section">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-2xl font-extrabold text-foreground font-display md:text-3xl">
              {data.name} an unseren Standorten
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-muted-foreground">
              Melde dich an deinem Wunschstandort an – wir freuen uns auf dich!
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {locations.map((loc) => (
                <Button key={loc.path} variant="outline" size="lg" asChild>
                  <Link to={loc.path}>
                    <MapPin className="mr-2 h-4 w-4 text-primary" />
                    {loc.name}
                  </Link>
                </Button>
              ))}
            </div>
            <div className="mt-6">
              <Link to="/fuehrerscheinklassen" className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1">
                Alle Führerscheinklassen ansehen <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LicenseClassPage;
