import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";

const locations = [
  { name: "Bremen", addr: "Musterstraße 1, 28195 Bremen", desc: "Unser Hauptstandort im Herzen von Bremen.", path: "/standorte/bremen" },
  { name: "Garbsen", addr: "Hauptstraße 10, 30823 Garbsen", desc: "Deine Fahrschule in Garbsen – zentral gelegen.", path: "/standorte/garbsen" },
  { name: "Hannover", addr: "Georgstraße 5, 30159 Hannover", desc: "Mitten in Hannover – gut erreichbar mit ÖPNV.", path: "/standorte/hannover" },
];

const Locations = () => {
  return (
    <div className="min-h-screen">
      <section className="gradient-dark py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">Unsere Standorte</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/70">
              3 Standorte in Norddeutschland – immer in deiner Nähe.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            {locations.map((loc, i) => (
              <motion.div
                key={loc.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={loc.path}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card p-8 shadow-card transition-all hover:shadow-card-hover hover:-translate-y-1"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <MapPin className="h-7 w-7" />
                  </div>
                  <h2 className="mb-1 text-2xl font-bold text-foreground">{loc.name}</h2>
                  <p className="mb-2 text-sm text-muted-foreground">{loc.addr}</p>
                  <p className="mb-6 text-sm text-muted-foreground">{loc.desc}</p>
                  <span className="mt-auto flex items-center gap-1 text-sm font-semibold text-primary">
                    Standort ansehen <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
