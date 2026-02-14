import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Car, CalendarCheck, MapPin, ArrowRight, Shield, Users, Star } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-driving.jpg";

const features = [
  { icon: GraduationCap, title: "Professionelle Ausbildung", desc: "Erfahrene Fahrlehrer begleiten dich sicher zum Führerschein – mit modernen Lehrmethoden." },
  { icon: Car, title: "Moderne Fahrzeuge", desc: "Unsere Flotte besteht aus aktuellen Modellen mit modernster Sicherheitsausstattung." },
  { icon: CalendarCheck, title: "Flexible Termine", desc: "Fahrstunden, die sich deinem Alltag anpassen – auch abends und am Wochenende." },
];

const locations = [
  { name: "Bremen", addr: "Musterstraße 1, 28195 Bremen", path: "/standorte/bremen" },
  { name: "Garbsen", addr: "Hauptstraße 10, 30823 Garbsen", path: "/standorte/garbsen" },
  { name: "Hannover", addr: "Georgstraße 5, 30159 Hannover", path: "/standorte/hannover" },
];

const stats = [
  { icon: Users, value: "5.000+", label: "Erfolgreiche Fahrschüler" },
  { icon: Star, value: "4,9", label: "Google-Bewertung" },
  { icon: Shield, value: "98%", label: "Bestehensquote" },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden">
        <img src={heroImage} alt="Fahrschule Metropol – Dein Weg zum Führerschein" className="absolute inset-0 h-full w-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="container relative z-10 mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <span className="mb-6 inline-block rounded-full bg-primary/20 px-4 py-1.5 text-sm font-semibold text-primary">
              Bremen · Garbsen · Hannover
            </span>
            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-primary-foreground md:text-6xl">
              Dein Führerschein –<br />
              <span className="text-primary">Dein Weg zur Freiheit</span>
            </h1>
            <p className="mb-8 text-lg text-primary-foreground/80 md:text-xl">
              Professionelle Fahrausbildung mit modernsten Methoden. Starte jetzt an einem unserer drei Standorte.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" asChild>
                <Link to="/kontakt">Jetzt anmelden</Link>
              </Button>
              <Button variant="hero-outline" asChild>
                <Link to="/fuehrerscheinklassen">Klassen entdecken</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-card py-12">
        <div className="container mx-auto grid grid-cols-1 gap-8 px-4 sm:grid-cols-3">
          {stats.map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 justify-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <s.icon className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-foreground">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-primary">Warum wir</span>
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">Deine Vorteile bei Metropol</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl border border-border bg-card p-8 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:gradient-primary group-hover:text-primary-foreground">
                  <f.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-foreground">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="bg-secondary py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-primary">Standorte</span>
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">3× in deiner Nähe</h2>
          </div>
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
                  className="group flex flex-col rounded-2xl border border-border bg-card p-8 shadow-card transition-all hover:shadow-card-hover hover:-translate-y-1"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <h3 className="mb-1 text-xl font-bold text-foreground">{loc.name}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{loc.addr}</p>
                  <span className="mt-auto flex items-center gap-1 text-sm font-semibold text-primary">
                    Mehr erfahren <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-dark py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="mb-4 text-3xl font-extrabold text-primary-foreground md:text-4xl">
              Bereit für deinen Führerschein?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-lg text-primary-foreground/70">
              Starte jetzt deine Ausbildung bei Fahrschule Metropol. Wir freuen uns auf dich!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="hero" asChild>
                <Link to="/kontakt">Jetzt anmelden</Link>
              </Button>
              <Button variant="hero-outline" asChild>
                <Link to="/standorte">Standorte ansehen</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
