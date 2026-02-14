import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";

const locations = [
  { name: "Bremen", addr: "Musterstraße 1, 28195 Bremen", desc: "Unser Hauptstandort im Herzen der Hansestadt – 15+ Jahre Erfahrung.", path: "/standorte/bremen" },
  { name: "Garbsen", addr: "Hauptstraße 10, 30823 Garbsen", desc: "Familiäre Atmosphäre, eigener Übungsplatz, flexible Termine.", path: "/standorte/garbsen" },
  { name: "Hannover", addr: "Georgstraße 5, 30159 Hannover", desc: "Zentrale Lage in der Landeshauptstadt, auch Abendtermine.", path: "/standorte/hannover" },
];

const Locations = () => {
  return (
    <div className="min-h-screen pt-20">
      <SEO
        title="Standorte – Fahrschule Metropol | Bremen, Garbsen & Hannover"
        description="Fahrschule Metropol an 3 Standorten: Bremen, Garbsen und Hannover. Adressen, Öffnungszeiten und Kontakt. Finde deine nächste Filiale."
        canonical="https://fahrschule-metropol.de/standorte"
      />

      <section className="gradient-dark py-20 noise relative overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">Standorte</span>
            <h1 className="text-4xl font-extrabold text-primary-foreground font-display md:text-6xl">Unsere Standorte</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/50">
              3 Standorte in Norddeutschland – immer in deiner Nähe.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {locations.map((loc, i) => (
              <motion.div
                key={loc.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link
                  to={loc.path}
                  className="group flex h-full flex-col rounded-3xl border border-border bg-card p-8 shadow-card transition-all duration-500 hover:shadow-card-hover hover:-translate-y-2"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground transition-all duration-500 group-hover:gradient-primary group-hover:text-primary-foreground group-hover:shadow-glow">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <h2 className="mb-1 text-2xl font-bold text-foreground font-display">{loc.name}</h2>
                  <p className="mb-2 text-sm text-muted-foreground">{loc.addr}</p>
                  <p className="mb-6 text-sm text-muted-foreground/70">{loc.desc}</p>
                  <span className="mt-auto flex items-center gap-1.5 text-sm font-bold text-primary transition-all group-hover:gap-2.5">
                    Standort ansehen <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Locations;
