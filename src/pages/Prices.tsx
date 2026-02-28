import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, ChevronRight, ChevronDown, Car, Bike, Truck, Bus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SEO from "@/components/SEO";
import { priceData } from "@/data/priceData";
import heroImage from "@/assets/hero-driving.jpg";

const categoryMap: Record<string, { label: string; icon: React.ElementType }> = {
  B: { label: "PKW", icon: Car },
  A: { label: "Motorrad", icon: Bike },
  A1: { label: "Motorrad", icon: Bike },
  A2: { label: "Motorrad", icon: Bike },
  BE: { label: "PKW", icon: Car },
  C: { label: "LKW", icon: Truck },
  CE: { label: "LKW", icon: Truck },
  C1: { label: "LKW", icon: Truck },
  D: { label: "Bus", icon: Bus },
  DE: { label: "Bus", icon: Bus },
  ASF: { label: "Seminar", icon: Car },
};

const popularClasses = ["B", "A", "C"];

interface PriceCardProps {
  klasse: string;
  items: { leistung: string; preis: string }[];
  index: number;
}

const PriceCard = ({ klasse, items, index }: PriceCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const isPopular = popularClasses.includes(klasse);
  const cat = categoryMap[klasse] || { label: "", icon: Car };
  const Icon = cat.icon;
  const grundbetrag = items.find((i) => i.leistung === "Grundbetrag" || i.leistung === "Seminarpreis gesamt");
  const fahrstunde = items.find((i) => i.leistung.includes("Übungsfahrt") || i.leistung.includes("Fahrstunde"));
  const previewItems = items.slice(0, 3);
  const restItems = items.slice(3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative rounded-2xl border bg-card shadow-card transition-all duration-500 hover:shadow-card-hover hover:-translate-y-1 overflow-hidden ${
        isPopular ? "border-primary/40 ring-1 ring-primary/20" : "border-border"
      }`}
    >
      {isPopular && (
        <div className="absolute top-0 right-0 rounded-bl-xl gradient-primary px-3 py-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary-foreground">Beliebt</span>
        </div>
      )}

      <div className="p-5">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            isPopular ? "gradient-primary text-primary-foreground shadow-glow" : "bg-accent text-accent-foreground"
          } transition-all duration-300`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-foreground font-display">Klasse {klasse}</h3>
            <p className="text-[11px] text-muted-foreground">{cat.label}</p>
          </div>
        </div>

        {/* Key prices */}
        {grundbetrag && (
          <div className="mb-4 rounded-xl bg-accent/50 p-3">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-muted-foreground">{grundbetrag.leistung}</span>
              <span className="text-xl font-extrabold text-foreground tabular-nums font-display">{grundbetrag.preis}</span>
            </div>
            {fahrstunde && (
              <div className="mt-1.5 flex items-baseline justify-between border-t border-border/50 pt-1.5">
                <span className="text-xs text-muted-foreground">{fahrstunde.leistung}</span>
                <span className="text-sm font-bold text-foreground tabular-nums">{fahrstunde.preis}</span>
              </div>
            )}
          </div>
        )}

        {/* Price list */}
        <div className="space-y-0">
          {previewItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-1.5 border-b border-border/30 last:border-0"
            >
              <span className="text-xs text-muted-foreground truncate pr-2">{item.leistung}</span>
              <span className="text-xs font-semibold text-foreground tabular-nums whitespace-nowrap">{item.preis}</span>
            </div>
          ))}
        </div>

        {/* Expandable rest */}
        <AnimatePresence>
          {expanded && restItems.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="space-y-0">
                {restItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-1.5 border-b border-border/30 last:border-0"
                  >
                    <span className="text-xs text-muted-foreground truncate pr-2">{item.leistung}</span>
                    <span className="text-xs font-semibold text-foreground tabular-nums whitespace-nowrap">{item.preis}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {restItems.length > 0 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 flex w-full items-center justify-center gap-1 rounded-lg bg-accent/50 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            {expanded ? "Weniger anzeigen" : `+${restItems.length} weitere Posten`}
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>

      {/* Footer CTA */}
      <div className="border-t border-border/50 bg-accent/20 px-5 py-3">
        <Button variant="ghost" size="sm" className="w-full text-xs font-bold text-primary hover:text-primary" asChild>
          <Link to="/kontakt">
            Jetzt anfragen <ChevronRight className="ml-1 h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
};

const Prices = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Preise – Fahrschule Metropol | Alle Führerscheinklassen"
        description="Aktuelle Preise für alle Führerscheinklassen an unseren Standorten Hannover, Garbsen & Bremen. Transparente Kosten, keine versteckten Gebühren."
        canonical="https://fahrschule-metropol.de/preise"
      />

      {/* Hero */}
      <section className="relative min-h-[280px] md:min-h-[340px] flex items-end overflow-hidden">
        <img
          src={heroImage}
          alt="Fahrschule Metropol Preise"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="container relative z-10 mx-auto px-4 pb-8 pt-28">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="mb-1 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/50">Preise</span>
            <h1 className="text-3xl font-extrabold text-primary-foreground font-display md:text-5xl">Unsere Preise</h1>
            <p className="mt-2 max-w-xl text-sm text-primary-foreground/50">
              Transparente Preise ohne versteckte Kosten.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Price Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <span className="mb-1 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">Standort wählen</span>
            <h2 className="text-2xl font-extrabold text-foreground font-display md:text-3xl">
              Aktuelle Preise (2025)
            </h2>
          </motion.div>

          <Tabs defaultValue="hannover" className="w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <TabsList className="mx-auto mb-8 flex w-fit gap-1">
                {priceData.map((loc) => (
                  <TabsTrigger key={loc.slug} value={loc.slug} className="gap-1.5 transition-all duration-200">
                    <MapPin className="h-3.5 w-3.5" />
                    {loc.location}
                  </TabsTrigger>
                ))}
              </TabsList>
            </motion.div>

            {priceData.map((loc) => (
              <TabsContent key={loc.slug} value={loc.slug}>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {loc.classes.map((cls, i) => (
                    <PriceCard key={cls.klasse} klasse={cls.klasse} items={cls.items} index={i} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Footer note */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-10 rounded-2xl border border-border bg-card p-6 text-center shadow-card"
          >
            <p className="text-xs text-muted-foreground">
              Alle Preise sind Richtwerte. Die genauen Kosten hängen vom individuellen Ausbildungsverlauf ab.{" "}
              <Link to="/kontakt" className="text-primary font-medium hover:underline">Kontaktiere uns</Link> für ein persönliches Angebot.
            </p>
            <p className="mt-2 text-[11px] text-muted-foreground/60">
              Zahlungsmittel: Barzahlung & Überweisung
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.15 }}
            className="mt-6 text-center"
          >
            <Button variant="cta" size="lg" asChild>
              <Link to="/kontakt">
                Jetzt unverbindlich anfragen <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Prices;
