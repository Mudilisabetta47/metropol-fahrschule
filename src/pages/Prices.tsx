import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight } from "lucide-react";
import SEO from "@/components/SEO";

const packages = [
  {
    name: "Klasse B – Komplett",
    price: "ab 2.490 €",
    features: ["Grundgebühr inkl.", "Theorie-Unterricht (14 Doppelstunden)", "12 Sonderfahrten", "Übungsfahrten nach Bedarf", "Vorstellung zur Prüfung", "Online-Lernmaterialien"],
    popular: true,
  },
  {
    name: "Klasse B197",
    price: "ab 2.590 €",
    features: ["Automatik + Schaltung", "Theorie-Unterricht komplett", "12 Sonderfahrten", "10 Schaltstunden inklusive", "Vorstellung zur Prüfung", "Volle Klasse-B-Berechtigung"],
    popular: false,
  },
  {
    name: "Klasse A (Motorrad)",
    price: "ab 1.890 €",
    features: ["Grundgebühr inkl.", "Theorie-Unterricht (12+4 Stunden)", "12 Sonderfahrten", "Übungsfahrten nach Bedarf", "Vorstellung zur Prüfung", "Schutzausrüstung-Beratung"],
    popular: false,
  },
];

const Prices = () => {
  return (
    <div className="min-h-screen pt-20">
      <SEO
        title="Preise – Fahrschule Metropol | Transparente Kosten für alle Klassen"
        description="Transparente Preise bei Fahrschule Metropol. Klasse B ab 2.490 €, Motorrad ab 1.890 €. Keine versteckten Kosten. Ratenzahlung möglich."
        canonical="https://fahrschule-metropol.de/preise"
      />

      <section className="gradient-dark py-20 noise relative overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">Preise</span>
            <h1 className="text-4xl font-extrabold text-primary-foreground font-display md:text-6xl">Unsere Preise</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/50">
              Transparente Preise ohne versteckte Kosten. Ratenzahlung möglich.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`group relative rounded-3xl border p-8 shadow-card transition-all duration-500 hover:shadow-card-hover hover:-translate-y-1 ${
                  pkg.popular ? "border-primary/30 bg-card ring-2 ring-primary/10" : "border-border bg-card"
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-6 rounded-full gradient-primary px-4 py-1 text-xs font-bold text-primary-foreground uppercase tracking-wider">
                    Beliebt
                  </span>
                )}
                <h3 className="mb-1 text-lg font-bold text-foreground font-display">{pkg.name}</h3>
                <div className="mb-6 text-3xl font-extrabold font-display gradient-text inline-block">{pkg.price}</div>
                <ul className="mb-8 space-y-3">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 shrink-0 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
                <Button variant={pkg.popular ? "cta" : "outline"} className="w-full" asChild>
                  <Link to="/kontakt">Anfragen <ChevronRight className="h-4 w-4" /></Link>
                </Button>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 rounded-2xl bg-accent/50 p-6 text-center"
          >
            <p className="text-sm text-muted-foreground">
              Alle Preise sind Richtwerte. Die genauen Kosten hängen vom individuellen Ausbildungsverlauf ab.{" "}
              <Link to="/kontakt" className="text-primary font-medium hover:underline">Kontaktiere uns</Link> für ein persönliches Angebot.
              Wir bieten auch Ratenzahlung an – sprich uns einfach an!
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Prices;
