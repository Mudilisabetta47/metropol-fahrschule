import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ChevronRight } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import SEO from "@/components/SEO";
import heroKontakt from "@/assets/hero-kontakt.jpg";

const Contact = () => {
  return (
    <div className="min-h-screen pt-20">
      <SEO
        title="Kontakt & Anmeldung – Fahrschule Metropol | Jetzt anmelden"
        description="Melde dich jetzt bei Fahrschule Metropol an. Kontaktformular, Telefon & E-Mail. Standorte in Bremen, Garbsen und Hannover."
        canonical="https://fahrschule-metropol.de/kontakt"
      />

      <section className="relative overflow-hidden py-20 noise">
        <div className="absolute inset-0">
          <img src={heroKontakt} alt="Metropol Fahrschulwagen" className="h-full w-full object-cover" />
        </div>
        <div className="hero-overlay absolute inset-0 noise" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">Dein erster Schritt</span>
            <h1 className="text-4xl font-extrabold text-primary-foreground font-display md:text-6xl">Lass uns loslegen!</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/50">
              Egal ob du gerade erst anfängst oder schon konkret weißt, was du willst – schreib uns einfach. Wir antworten persönlich, nicht per Bot. Versprochen. ✌️
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="rounded-3xl border border-border bg-card p-8 shadow-card">
                <h2 className="mb-2 text-2xl font-bold text-foreground font-display">Schreib uns – wir beißen nicht 😄</h2>
                <p className="mb-6 text-sm text-muted-foreground">Pflichtfelder sind mit * gekennzeichnet. Wir melden uns schnellstmöglich – persönlich, nicht automatisch.</p>
                <ContactForm />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-5 lg:col-span-2"
            >
              <div className="rounded-3xl border border-border bg-card p-8 shadow-card">
                <h3 className="mb-5 text-lg font-bold text-foreground font-display">Direkter Kontakt</h3>
                <ul className="space-y-4 text-sm">
                  <li className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <a href="tel:+4942112345" className="text-foreground font-medium hover:text-primary transition-colors">0421 / 123 45</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <a href="mailto:info@fahrschule-metropol.de" className="text-foreground font-medium hover:text-primary transition-colors">info@fahrschule-metropol.de</a>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 text-primary" />
                    <div className="text-foreground">Mo–Fr: 9:00–18:00<br />Sa: 10:00–14:00</div>
                  </li>
                </ul>
              </div>

              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground pt-2">Unsere Standorte</h3>
              {[
                { name: "Bremen", addr: "Musterstraße 1, 28195", path: "/standorte/bremen" },
                { name: "Garbsen", addr: "Hauptstraße 10, 30823", path: "/standorte/garbsen" },
                { name: "Hannover", addr: "Georgstraße 5, 30159", path: "/standorte/hannover" },
              ].map((loc) => (
                <a
                  key={loc.name}
                  href={loc.path}
                  className="group flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-card transition-all hover:shadow-card-hover hover:-translate-y-0.5"
                >
                  <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <span className="font-bold text-foreground font-display text-sm">{loc.name}</span>
                    <br />
                    <span className="text-xs text-muted-foreground">{loc.addr}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/50 mt-1 transition-transform group-hover:translate-x-0.5" />
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
