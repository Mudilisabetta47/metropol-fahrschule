import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const faqs = [
  { q: "Wie melde ich mich an?", a: "Du kannst dich direkt über unser Online-Formular anmelden oder uns in einer unserer Filialen besuchen. Wir benötigen einen gültigen Ausweis und ein Passfoto." },
  { q: "Wie lange dauert die Ausbildung?", a: "Die Dauer hängt von der Führerscheinklasse und deiner Verfügbarkeit ab. Im Schnitt dauert der Klasse-B-Führerschein 2–4 Monate." },
  { q: "Welche Zahlungsmöglichkeiten gibt es?", a: "Wir bieten Ratenzahlung, Barzahlung und Überweisung an. Sprich uns gerne auf individuelle Zahlungspläne an." },
  { q: "Kann ich den Theorieunterricht online machen?", a: "Ja, wir bieten hybride Theoriekurse an – sowohl vor Ort als auch online. So kannst du flexibel lernen." },
  { q: "Was passiert, wenn ich die Prüfung nicht bestehe?", a: "Kein Problem! Wir bereiten dich mit zusätzlichen Übungsstunden vor und stellen dich erneut zur Prüfung vor. Die Gebühr für eine Wiederholungsprüfung ist in unserer Preisliste aufgeführt." },
  { q: "Bietet ihr auch Intensivkurse an?", a: "Ja, an allen Standorten bieten wir Intensivkurse (Ferienkurse) an. Damit kannst du deinen Führerschein in nur 2–3 Wochen machen." },
  { q: "Ab welchem Alter kann ich mit dem Führerschein anfangen?", a: "Für Klasse B kannst du mit der Theorie 6 Monate vor deinem 17. Geburtstag beginnen (BF17). Die genauen Mindestalter findest du auf unserer Führerscheinklassen-Seite." },
  { q: "Wo finde ich eure Standorte?", a: "Wir sind in Bremen, Garbsen und Hannover vertreten. Alle Adressen und Öffnungszeiten findest du auf unserer Standorte-Seite." },
];

const FAQ = () => {
  return (
    <div className="min-h-screen">
      <section className="gradient-dark py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">Häufige Fragen</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/70">
              Antworten auf die wichtigsten Fragen rund um deine Fahrausbildung.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto max-w-3xl px-4">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl border border-border bg-card px-6 shadow-card">
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-16 text-center">
            <p className="mb-4 text-muted-foreground">Noch Fragen? Wir helfen dir gerne!</p>
            <Button variant="cta" size="lg" asChild>
              <Link to="/kontakt">Kontakt aufnehmen</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
