import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import SEO from "@/components/SEO";

const faqs = [
  { q: "Wie melde ich mich bei der Fahrschule Metropol an?", a: "Du kannst dich direkt über unser Online-Formular anmelden oder uns in einer unserer Filialen in Bremen, Garbsen oder Hannover besuchen. Wir benötigen einen gültigen Ausweis und ein Passfoto." },
  { q: "Wie lange dauert die Führerscheinausbildung?", a: "Die Dauer hängt von der Führerscheinklasse und deiner Verfügbarkeit ab. Im Schnitt dauert der Klasse-B-Führerschein 2–4 Monate. Mit unserem Intensivkurs auch in 2–3 Wochen." },
  { q: "Welche Zahlungsmöglichkeiten bietet die Fahrschule Metropol?", a: "Wir bieten Ratenzahlung, Barzahlung und Überweisung an. Sprich uns gerne auf individuelle Zahlungspläne an." },
  { q: "Kann ich den Theorieunterricht online machen?", a: "Ja, wir bieten hybride Theoriekurse an – sowohl vor Ort als auch online. So kannst du flexibel lernen, wann und wo es dir passt." },
  { q: "Was passiert, wenn ich die Prüfung nicht bestehe?", a: "Kein Problem! Wir bereiten dich mit zusätzlichen Übungsstunden vor und stellen dich erneut zur Prüfung. Etwa 98% unserer Schüler bestehen beim ersten oder zweiten Versuch." },
  { q: "Bietet ihr auch Intensiv- oder Ferienkurse an?", a: "Ja, an allen drei Standorten bieten wir Intensivkurse an. Damit kannst du deinen Führerschein in nur 2–3 Wochen machen – ideal für Schüler und Studenten." },
  { q: "Ab welchem Alter kann ich den Führerschein machen?", a: "Für Klasse B kannst du mit der Theorie 6 Monate vor deinem 17. Geburtstag beginnen (BF17). Die genauen Mindestalter findest du auf unserer Führerscheinklassen-Seite." },
  { q: "An welchen Standorten ist die Fahrschule Metropol vertreten?", a: "Wir sind in Bremen (Musterstraße 1), Garbsen (Hauptstraße 10) und Hannover (Georgstraße 5) für dich da." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Startseite", item: "https://fahrschule-metropol.de/" },
    { "@type": "ListItem", position: 2, name: "FAQ", item: "https://fahrschule-metropol.de/faq" },
  ],
};

const FAQ = () => {
  return (
    <div className="min-h-screen pt-20">
      <SEO
        title="Häufige Fragen (FAQ) – Fahrschule Metropol"
        description="Antworten auf die wichtigsten Fragen rund um deine Fahrausbildung bei Fahrschule Metropol in Bremen, Garbsen und Hannover."
        canonical="https://fahrschule-metropol.de/faq"
        jsonLd={[faqSchema, breadcrumbSchema]}
      />

      <section className="gradient-dark py-20 noise relative overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">FAQ</span>
            <h1 className="text-4xl font-extrabold text-primary-foreground font-display md:text-6xl">
              Häufige Fragen
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/50">
              Alles, was du über deine Fahrausbildung wissen musst.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto max-w-3xl px-4">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <AccordionItem value={`faq-${i}`} className="rounded-2xl border border-border bg-card px-6 shadow-card transition-shadow hover:shadow-card-hover overflow-hidden">
                  <AccordionTrigger className="py-5 text-left font-semibold text-foreground hover:no-underline font-display text-base">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <p className="mb-5 text-muted-foreground">Noch Fragen? Wir helfen dir gerne!</p>
            <Button variant="cta" size="lg" asChild>
              <Link to="/kontakt">
                Kontakt aufnehmen <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
