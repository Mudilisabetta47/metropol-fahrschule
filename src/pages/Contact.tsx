import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContactForm from "@/components/ContactForm";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <section className="gradient-dark py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">Kontakt & Anmeldung</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/70">
              Melde dich an oder stelle uns deine Fragen – wir freuen uns auf dich!
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
                <h2 className="mb-2 text-2xl font-bold text-foreground">Anmeldeformular</h2>
                <p className="mb-6 text-sm text-muted-foreground">Fülle das Formular aus – wir melden uns schnellstmöglich bei dir.</p>
                <ContactForm />
              </div>
            </div>

            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
                <h3 className="mb-4 text-lg font-bold text-foreground">Kontaktdaten</h3>
                <ul className="space-y-4 text-sm">
                  <li className="flex items-center gap-3"><Phone className="h-5 w-5 text-primary" /><span className="text-foreground">0421 / 123 45</span></li>
                  <li className="flex items-center gap-3"><Mail className="h-5 w-5 text-primary" /><span className="text-foreground">info@fahrschule-metropol.de</span></li>
                  <li className="flex items-start gap-3"><Clock className="mt-0.5 h-5 w-5 text-primary" /><div className="text-foreground">Mo–Fr: 9:00–18:00<br />Sa: 10:00–14:00</div></li>
                </ul>
              </div>

              {["Bremen – Musterstraße 1", "Garbsen – Hauptstraße 10", "Hannover – Georgstraße 5"].map((loc) => (
                <div key={loc} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-card">
                  <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-foreground">{loc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
