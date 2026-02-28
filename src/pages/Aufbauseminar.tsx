import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail, MapPin, CheckCircle, Shield, MessageCircle, AlertTriangle, Users, Calendar, Scale } from "lucide-react";
import SEO from "@/components/SEO";
import ContactForm from "@/components/ContactForm";
import heroImage from "@/assets/hero-aufbauseminar.jpg";

const aVerstoesse = [
  "Überschreitung der Höchstgeschwindigkeit um mehr als 20 km/h",
  "Handynutzung am Steuer",
  "Fahren ohne Begleitperson (bei Führerschein ab 17)",
  "Fahrerflucht oder fahrlässige Körperverletzung",
  "Rechtsüberholen, zu geringer Abstand",
];

const bVerstoesse = [
  "Fahren mit abgefahrenen Reifen",
  "Überziehen der Hauptuntersuchung um mehr als 8 Monate",
  "Kinder nicht ordnungsgemäß gesichert transportieren",
];

const Aufbauseminar = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Aufbauseminar für Fahranfänger (ASF) – Fahrschule Metropol",
    description: "Aufbauseminar (ASF) für Fahranfänger in der Probezeit. Pflicht bei A-Verstößen oder zwei B-Verstößen. Termine in Hannover, Bremen & Garbsen.",
    provider: {
      "@type": "DrivingSchool",
      name: "Fahrschule Metropol",
      url: "https://fahrschule-metropol.de",
    },
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Aufbauseminar (ASF) für Fahranfänger | Fahrschule Metropol"
        description="Aufbauseminar für Fahranfänger in der Probezeit – Pflicht bei Verstößen. Kleine Gruppen, erfahrene Seminarleiter. Termine in Hannover, Bremen & Garbsen."
        canonical="https://fahrschule-metropol.de/aufbauseminar"
        jsonLd={[jsonLd]}
      />

      {/* Hero */}
      <section className="relative min-h-[420px] md:min-h-[480px] flex items-end overflow-hidden">
        <img
          src={heroImage}
          alt="Aufbauseminar für Fahranfänger bei Fahrschule Metropol"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="container relative z-10 mx-auto px-4 pb-10 pt-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <p className="mb-1 text-sm font-semibold text-primary-foreground/60">Probezeit & Verkehrsverstöße</p>
            <h1 className="text-4xl font-extrabold text-primary-foreground font-display md:text-6xl">
              Aufbauseminare für<br />Fahranfänger (ASF)
            </h1>
            <div className="mt-6">
              <Button variant="cta" size="lg" asChild>
                <Link to="/kontakt">
                  Jetzt Termin vereinbaren <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Wann ist ein ASF Pflicht? */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="mb-6 text-3xl font-extrabold text-foreground font-display md:text-4xl">
                Wann ist ein Aufbauseminar Pflicht?
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base">
                Ein Aufbauseminar wird für Fahranfänger in der Probezeit verpflichtend, wenn ein sogenannter A-Verstoß oder zwei B-Verstöße vorliegen. Dabei handelt es sich um Verkehrsdelikte, die als gefährlich oder fahrlässig eingestuft werden. Die Fahrerlaubnisbehörde ordnet das Seminar an, das innerhalb einer festgelegten Frist (meist zwei Monate) absolviert werden muss.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* A- und B-Verstöße */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border bg-card p-8 shadow-card"
            >
              <AlertTriangle className="mb-3 h-6 w-6 text-destructive" />
              <h3 className="text-lg font-bold text-foreground font-display mb-4">A-Verstöße</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Ein einzelner A-Verstoß führt direkt zur Pflichtteilnahme am ASF. Typische A-Verstöße sind:
              </p>
              <ul className="space-y-2">
                {aVerstoesse.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-destructive shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted-foreground font-medium">
                Zusätzlich wird die Probezeit auf 4 Jahre verlängert.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-border bg-card p-8 shadow-card"
            >
              <AlertTriangle className="mb-3 h-6 w-6 text-primary" />
              <h3 className="text-lg font-bold text-foreground font-display mb-4">B-Verstöße</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Zwei B-Verstöße innerhalb der Probezeit gelten ebenfalls als Grundlage für ein verpflichtendes ASF. Dazu zählen:
              </p>
              <ul className="space-y-2">
                {bVerstoesse.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                Ein einzelner B-Verstoß bleibt zunächst folgenlos.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dauer und Kosten */}
      <section className="py-12 gradient-section">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-5">
                <Calendar className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-bold text-foreground font-display">Dauer und Kosten</h2>
              </div>
              <ul className="space-y-3">
                {[
                  "Vier Theorie-Sitzungen à 135 Minuten",
                  "Eine Beobachtungsfahrt (Fahrprobe) zwischen der ersten und zweiten Sitzung",
                  "Kleine Gruppen mit 6 bis 12 Personen",
                  "Dauer insgesamt: 2 bis 4 Wochen",
                  "Kosten: zwischen 200 € und 500 € – klare Preise bei Metropol",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div className="flex items-center gap-3 mb-5">
                <Scale className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-bold text-foreground font-display">Wird eine MPU benötigt?</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Eine <strong className="text-foreground">MPU (medizinisch-psychologische Untersuchung)</strong> ist nach einem Aufbauseminar in der Regel nicht nötig. Sie wird nur bei besonders schweren Fällen – z.&nbsp;B. Trunkenheitsfahrten – direkt angeordnet.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Wer jedoch nach dem ASF erneut Verstöße begeht, riskiert den Entzug der Fahrerlaubnis und muss ggf. später eine MPU absolvieren.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border bg-card p-6 shadow-card"
            >
              <Users className="mb-3 h-6 w-6 text-primary" />
              <h4 className="text-sm font-bold text-foreground mb-2">Kleine Gruppen</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Maximal 12 Teilnehmer pro Seminar für persönliche Betreuung und offene Gespräche.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-card"
            >
              <Shield className="mb-3 h-6 w-6 text-primary" />
              <h4 className="text-sm font-bold text-foreground mb-2">Erfahrene Seminarleiter</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Unsere zertifizierten Seminarleiter sorgen für eine konstruktive und respektvolle Atmosphäre.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-card"
            >
              <MapPin className="mb-3 h-6 w-6 text-primary" />
              <h4 className="text-sm font-bold text-foreground mb-2">Standorte</h4>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  <Link to="/standorte/hannover" className="hover:text-primary transition-colors">Hannover</Link>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  <Link to="/standorte/bremen" className="hover:text-primary transition-colors">Bremen</Link>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  <Link to="/standorte/garbsen" className="hover:text-primary transition-colors">Garbsen</Link>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact & Form */}
      <section className="py-16 gradient-section">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-5">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-2">
              <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">Kontakt & Beratung</span>
              <h2 className="mb-4 text-2xl font-extrabold text-foreground font-display md:text-3xl">
                Aufbauseminar anfragen
              </h2>
              <p className="mb-8 text-muted-foreground leading-relaxed">
                Du hast Post von der Fahrerlaubnisbehörde bekommen? Melde dich bei uns – wir helfen dir schnell und diskret weiter.
              </p>

              <div className="mb-8 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 shadow-card">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs font-bold text-foreground">Schnelle Antwort</p>
                    <p className="text-[10px] text-muted-foreground">innerhalb von 24 Stunden</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 shadow-card">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs font-bold text-foreground">Diskret & vertraulich</p>
                    <p className="text-[10px] text-muted-foreground">Kostenlose Beratung</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary text-primary-foreground">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Telefonisch erreichbar</p>
                    <a href="tel:+495116425066" className="text-sm font-bold text-foreground hover:text-primary transition-colors">0511 6425066</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">E-Mail Kontakt</p>
                    <a href="mailto:info@fahrschule-metropol.de" className="text-sm font-bold text-foreground hover:text-primary transition-colors">info@fahrschule-metropol.de</a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="lg:col-span-3">
              <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
                <h3 className="mb-2 text-lg font-bold text-foreground font-display">Unverbindliche Anfrage</h3>
                <p className="mb-6 text-sm text-muted-foreground">
                  Füll das Formular aus und wir melden uns bei dir – persönlich, nicht automatisch.
                </p>
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Aufbauseminar;
