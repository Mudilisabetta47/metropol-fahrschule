import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car, Bike, Truck } from "lucide-react";

const classes = [
  { icon: Car, name: "Klasse B", subtitle: "PKW", desc: "Der klassische Autoführerschein ab 18 Jahren (oder BF17). Fahrzeuge bis 3,5t.", minAge: "17/18 Jahre" },
  { icon: Car, name: "Klasse B197", subtitle: "PKW Automatik/Schaltung", desc: "Ausbildung auf Automatik mit Schaltprüfung. Volle Flexibilität.", minAge: "17/18 Jahre" },
  { icon: Bike, name: "Klasse A", subtitle: "Motorrad unbeschränkt", desc: "Alle Motorräder ohne Leistungsbeschränkung. Freiheit auf zwei Rädern.", minAge: "24 Jahre" },
  { icon: Bike, name: "Klasse A2", subtitle: "Motorrad bis 35 kW", desc: "Motorräder mit max. 35 kW Leistung. Der Einstieg in die Motorradwelt.", minAge: "18 Jahre" },
  { icon: Bike, name: "Klasse A1", subtitle: "Leichtkrafträder", desc: "Motorräder bis 125 ccm / 11 kW. Ideal für junge Fahrer.", minAge: "16 Jahre" },
  { icon: Bike, name: "Klasse AM", subtitle: "Moped/Roller", desc: "Kleinkrafträder bis 45 km/h. Mobil ab 15 Jahren.", minAge: "15 Jahre" },
  { icon: Car, name: "Klasse BE", subtitle: "PKW mit Anhänger", desc: "PKW mit schwerem Anhänger über 750 kg. Für Wohnwagen & Co.", minAge: "17/18 Jahre" },
  { icon: Car, name: "Klasse B196", subtitle: "125er mit PKW-Führerschein", desc: "Erweiterung des B-Führerscheins auf 125er-Motorräder.", minAge: "25 Jahre" },
  { icon: Truck, name: "Klasse L", subtitle: "Land-/Forstwirtschaft", desc: "Zugmaschinen bis 40 km/h für land- oder forstwirtschaftliche Zwecke.", minAge: "16 Jahre" },
];

const LicenseClasses = () => {
  return (
    <div className="min-h-screen">
      <section className="gradient-dark py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">Führerscheinklassen</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/70">
              Von PKW bis Motorrad – finde die passende Klasse für dich.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {classes.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <c.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{c.name}</h3>
                <p className="mb-2 text-sm font-medium text-primary">{c.subtitle}</p>
                <p className="mb-3 text-sm text-muted-foreground">{c.desc}</p>
                <span className="text-xs font-semibold text-muted-foreground">Mindestalter: {c.minAge}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Button variant="cta" size="lg" asChild>
              <Link to="/kontakt">Jetzt zur Anmeldung</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LicenseClasses;
