import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { motion } from "framer-motion";

interface LocationData {
  name: string;
  address: string;
  zip: string;
  phone: string;
  email: string;
  hours: string[];
  description: string;
  mapEmbed: string;
}

const LocationTemplate = ({ data }: { data: LocationData }) => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="gradient-dark py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="mb-4 inline-block rounded-full bg-primary/20 px-4 py-1 text-sm font-semibold text-primary">
              Standort
            </span>
            <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">
              Fahrschule Metropol {data.name}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/70">{data.description}</p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Info + Map */}
          <div className="space-y-8">
            <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
              <h2 className="mb-6 text-2xl font-bold text-foreground">Kontaktdaten</h2>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                  <div><span className="font-medium text-foreground">{data.address}</span><br /><span className="text-muted-foreground">{data.zip}</span></div>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="text-foreground">{data.phone}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="text-foreground">{data.email}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 text-primary" />
                  <div>{data.hours.map((h, i) => <div key={i} className="text-foreground">{h}</div>)}</div>
                </li>
              </ul>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border shadow-card">
              <iframe
                src={data.mapEmbed}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Karte ${data.name}`}
              />
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
            <h2 className="mb-2 text-2xl font-bold text-foreground">Jetzt anmelden</h2>
            <p className="mb-6 text-sm text-muted-foreground">Fülle das Formular aus – wir melden uns schnellstmöglich.</p>
            <ContactForm preselectedLocation={data.name} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationTemplate;
