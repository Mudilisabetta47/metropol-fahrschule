import { motion } from "framer-motion";
import { Award, Heart, Target, Users } from "lucide-react";

const values = [
  { icon: Heart, title: "Leidenschaft", desc: "Wir lieben, was wir tun – und das spürt jeder Fahrschüler." },
  { icon: Target, title: "Qualität", desc: "Höchste Ausbildungsstandards und individuelle Betreuung." },
  { icon: Users, title: "Teamgeist", desc: "Ein motiviertes Team, das dich auf dem Weg zum Führerschein begleitet." },
  { icon: Award, title: "Erfahrung", desc: "Über 15 Jahre Erfahrung in der Fahrausbildung." },
];

const About = () => {
  return (
    <div className="min-h-screen">
      <section className="gradient-dark py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">Über uns</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/70">
              Lerne das Team hinter Fahrschule Metropol kennen – mit Standorten in Bremen, Garbsen und Hannover.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-6 text-muted-foreground leading-relaxed">
            <p>
              <strong className="text-foreground">Fahrschule Metropol</strong> steht seit über 15 Jahren für erstklassige Fahrausbildung. 
              An unseren drei Standorten in Bremen, Garbsen und Hannover bilden wir jährlich hunderte Fahrschüler erfolgreich aus.
            </p>
            <p>
              Unser erfahrenes Team aus engagierten Fahrlehrerinnen und Fahrlehrern legt Wert auf eine freundliche, stressfreie 
              Lernatmosphäre. Moderne Schulungsfahrzeuge, aktuelle Lehrmaterialien und flexible Terminplanung sorgen dafür, dass 
              du bestens vorbereitet in die Prüfung gehst.
            </p>
            <p>
              Ob PKW, Motorrad oder andere Klassen – bei uns bist du in guten Händen. Wir passen die Ausbildung individuell an 
              deine Bedürfnisse an und stehen dir mit Rat und Tat zur Seite.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-extrabold text-foreground">Unsere Werte</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-card p-8 text-center shadow-card"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <v.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
