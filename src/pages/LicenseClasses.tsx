import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car, Bike, Truck, ChevronRight } from "lucide-react";
import SEO from "@/components/SEO";

const classes = [
  { icon: Car, name: "Klasse B", subtitle: "PKW", desc: "Der klassische Autoführerschein ab 18 Jahren (oder BF17). Fahrzeuge bis 3,5 t zulässiges Gesamtgewicht.", minAge: "17/18 Jahre", popular: true },
  { icon: Car, name: "Klasse B197", subtitle: "PKW Automatik + Schaltung", desc: "Ausbildung auf Automatik mit Schaltprüfung – volle Flexibilität, beide Varianten fahren.", minAge: "17/18 Jahre", popular: true },
  { icon: Bike, name: "Klasse A", subtitle: "Motorrad unbeschränkt", desc: "Alle Motorräder ohne Leistungsbeschränkung. Die ultimative Freiheit auf zwei Rädern.", minAge: "24 Jahre", popular: false },
  { icon: Bike, name: "Klasse A2", subtitle: "Motorrad bis 35 kW", desc: "Motorräder mit max. 35 kW Leistung – der perfekte Einstieg in die Motorradwelt.", minAge: "18 Jahre", popular: false },
  { icon: Bike, name: "Klasse A1", subtitle: "Leichtkrafträder", desc: "Motorräder bis 125 ccm / 11 kW. Der erste Schritt zum Motorradführerschein.", minAge: "16 Jahre", popular: false },
  { icon: Bike, name: "Klasse AM", subtitle: "Moped & Roller", desc: "Kleinkrafträder bis 45 km/h. Mobil ab 15 Jahren – ideal für den Schulweg.", minAge: "15 Jahre", popular: false },
  { icon: Car, name: "Klasse BE", subtitle: "PKW + Anhänger", desc: "PKW mit schwerem Anhänger über 750 kg. Für Wohnwagen, Pferdeanhänger & Co.", minAge: "17/18 Jahre", popular: false },
  { icon: Car, name: "Klasse B196", subtitle: "125er mit B-Führerschein", desc: "Erweiterung des Klasse-B-Führerscheins auf 125er-Motorräder ohne extra Prüfung.", minAge: "25 Jahre", popular: false },
  { icon: Truck, name: "Klasse L", subtitle: "Land-/Forstwirtschaft", desc: "Zugmaschinen bis 40 km/h für land- oder forstwirtschaftliche Zwecke.", minAge: "16 Jahre", popular: false },
];

const LicenseClasses = () => {
  return (
    <div className="min-h-screen pt-20">
      <SEO
        title="Führerscheinklassen – Fahrschule Metropol | B, A, BE, AM & mehr"
        description="Alle Führerscheinklassen bei Fahrschule Metropol: PKW (B, B197), Motorrad (A, A1, A2), Anhänger (BE) und mehr. Infos, Mindestalter & Anmeldung."
        canonical="https://fahrschule-metropol.de/fuehrerscheinklassen"
      />

      <section className="gradient-dark py-20 noise relative overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">Klassen</span>
            <h1 className="text-4xl font-extrabold text-primary-foreground font-display md:text-6xl">Führerscheinklassen</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/50">
              Von PKW über Motorrad bis Anhänger – finde die passende Klasse für dich.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {classes.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className={`group relative rounded-3xl border bg-card p-7 shadow-card transition-all duration-500 hover:shadow-card-hover hover:-translate-y-1 ${
                  c.popular ? "border-primary/30 ring-1 ring-primary/10" : "border-border"
                }`}
              >
                {c.popular && (
                  <span className="absolute -top-2.5 right-6 rounded-full gradient-primary px-3 py-0.5 text-[10px] font-bold text-primary-foreground uppercase tracking-wider">
                    Beliebt
                  </span>
                )}
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-all duration-500 group-hover:gradient-primary group-hover:text-primary-foreground group-hover:scale-110">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground font-display">{c.name}</h3>
                <p className="mb-2 text-sm font-semibold text-primary">{c.subtitle}</p>
                <p className="mb-3 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                <span className="text-xs font-medium text-muted-foreground/70">Mindestalter: {c.minAge}</span>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 flex flex-col items-center gap-4 text-center"
          >
            <p className="text-muted-foreground">Nicht sicher, welche Klasse? Wir beraten dich gerne!</p>
            <div className="flex flex-wrap gap-3">
              <Button variant="cta" size="lg" asChild>
                <Link to="/kontakt">Jetzt anmelden <ChevronRight className="h-4 w-4" /></Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/preise">Preise ansehen</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LicenseClasses;
