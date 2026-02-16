import { motion } from "framer-motion";
import { Award, Heart, Target, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import SEO from "@/components/SEO";

const values = [
  { icon: Heart, title: "Leidenschaft", desc: "Wir lieben, was wir tun – und das spürt jeder Fahrschüler bei jeder Fahrstunde." },
  { icon: Target, title: "Qualität", desc: "Höchste Ausbildungsstandards mit individuellem Lernplan." },
  { icon: Users, title: "Teamgeist", desc: "Ein motiviertes Team aus erfahrenen Fahrlehrerinnen und Fahrlehrern." },
  { icon: Award, title: "Erfahrung", desc: "Über 20 Jahre Erfahrung und mehr als 15.000 erfolgreiche Fahrschüler." },
];

const About = () => {
  return (
    <div className="min-h-screen pt-20">
      <SEO
        title="Über uns – Fahrschule Metropol | Dein Team in Bremen, Garbsen & Hannover"
        description="Lerne das Team hinter Fahrschule Metropol kennen. Über 20 Jahre Erfahrung, 15.000+ erfolgreiche Schüler, 3 Standorte."
        canonical="https://fahrschule-metropol.de/ueber-uns"
      />

      <section className="gradient-dark py-20 noise relative overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">Über uns</span>
            <h1 className="text-4xl font-extrabold text-primary-foreground font-display md:text-6xl">Wer wir sind</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/50">
              Seit über 20 Jahren bilden wir Fahrschüler erfolgreich aus – mit Herz, Erfahrung und modernster Technik.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-6 text-muted-foreground leading-relaxed">
            <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <strong className="text-foreground font-display">Fahrschule Metropol</strong> steht seit über 20 Jahren für erstklassige Fahrausbildung in Norddeutschland.
              An unseren drei Standorten in <Link to="/standorte/bremen" className="text-primary font-medium hover:underline">Bremen</Link>,{" "}
              <Link to="/standorte/garbsen" className="text-primary font-medium hover:underline">Garbsen</Link> und{" "}
              <Link to="/standorte/hannover" className="text-primary font-medium hover:underline">Hannover</Link> bilden wir jährlich hunderte Fahrschüler erfolgreich aus.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              Unser erfahrenes Team legt Wert auf eine freundliche, stressfreie Lernatmosphäre. Moderne Schulungsfahrzeuge, aktuelle Lehrmaterialien und flexible Terminplanung sorgen dafür, dass du bestens vorbereitet in die Prüfung gehst.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              Ob <Link to="/fuehrerscheinklassen" className="text-primary font-medium hover:underline">PKW, Motorrad oder andere Klassen</Link> – bei uns bist du in guten Händen. Wir passen die Ausbildung individuell an deine Bedürfnisse an. Schau dir unsere{" "}
              <Link to="/preise" className="text-primary font-medium hover:underline">transparenten Preise</Link> an oder{" "}
              <Link to="/kontakt" className="text-primary font-medium hover:underline">melde dich direkt an</Link>.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="gradient-section py-24">
        <div className="container mx-auto px-4">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center text-3xl font-extrabold text-foreground font-display md:text-4xl">
            Unsere Werte
          </motion.h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group rounded-3xl border border-border bg-card p-8 text-center shadow-card transition-all duration-500 hover:shadow-card-hover hover:-translate-y-1"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground transition-all duration-500 group-hover:gradient-primary group-hover:text-primary-foreground group-hover:shadow-glow group-hover:scale-110">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground font-display">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Button variant="cta" size="lg" asChild>
              <Link to="/kontakt">Jetzt anmelden <ChevronRight className="h-4 w-4" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
