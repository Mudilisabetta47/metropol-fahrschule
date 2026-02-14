import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const packages = [
  {
    name: "Klasse B – Komplett",
    price: "ab 2.490 €",
    features: ["Grundgebühr inkl.", "Theorie-Unterricht", "12 Sonderfahrten", "Übungsfahrten nach Bedarf", "Vorstellung zur Prüfung", "Lernmaterialien"],
    popular: true,
  },
  {
    name: "Klasse B197",
    price: "ab 2.590 €",
    features: ["Automatik + Schaltung", "Theorie-Unterricht", "12 Sonderfahrten", "10 Schaltstunden", "Vorstellung zur Prüfung", "Lernmaterialien"],
    popular: false,
  },
  {
    name: "Klasse A (Motorrad)",
    price: "ab 1.890 €",
    features: ["Grundgebühr inkl.", "Theorie-Unterricht", "12 Sonderfahrten", "Übungsfahrten nach Bedarf", "Vorstellung zur Prüfung", "Schutzausrüstung-Beratung"],
    popular: false,
  },
];

const Prices = () => {
  return (
    <div className="min-h-screen">
      <section className="gradient-dark py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">Unsere Preise</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/70">
              Transparente Preise – keine versteckten Kosten. Individuelle Angebote auf Anfrage.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-2xl border p-8 shadow-card ${
                  pkg.popular ? "border-primary bg-card ring-2 ring-primary/20" : "border-border bg-card"
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-6 rounded-full gradient-primary px-4 py-1 text-xs font-bold text-primary-foreground">
                    Beliebt
                  </span>
                )}
                <h3 className="mb-1 text-xl font-bold text-foreground">{pkg.name}</h3>
                <div className="mb-6 text-3xl font-extrabold text-primary">{pkg.price}</div>
                <ul className="mb-8 space-y-3">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
                <Button variant={pkg.popular ? "cta" : "outline"} className="w-full" asChild>
                  <Link to="/kontakt">Anfragen</Link>
                </Button>
              </motion.div>
            ))}
          </div>
          <p className="mt-12 text-center text-sm text-muted-foreground">
            Alle Preise sind Richtwerte. Genaue Kosten hängen vom individuellen Ausbildungsverlauf ab. Kontaktiere uns für ein persönliches Angebot.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Prices;
