import { motion } from "framer-motion";
import { Sparkles, Gauge, Fuel, Shield } from "lucide-react";
import TiltCard from "./TiltCard";

interface FleetCar {
  model: string;
  tag: string;
  image: string;
  specs: { icon: React.ComponentType<{ className?: string }>; label: string }[];
}

interface FleetSectionProps {
  cars: FleetCar[];
}

/**
 * Premium fleet showcase — big cards, ken-burns hover zoom, cinematic light sweep,
 * 3D tilt. Presents driving school vehicles as a hero fleet, not a spec sheet.
 */
const FleetSection = ({ cars }: FleetSectionProps) => {
  return (
    <section className="relative py-28 overflow-hidden bg-gradient-to-b from-background via-secondary/40 to-background">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center max-w-2xl mx-auto"
        >
          <span className="mb-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.24em] text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Unsere Flotte
          </span>
          <h2 className="text-3xl font-extrabold text-foreground font-display md:text-5xl lg:text-6xl">
            Lerne auf <span className="gradient-text">Premium-Fahrzeugen</span>
          </h2>
          <p className="mx-auto mt-5 text-muted-foreground leading-relaxed">
            Moderne, gepflegte Fahrzeuge mit den neuesten Assistenzsystemen –
            damit du dich vom ersten Meter an sicher fühlst.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cars.map((car, i) => (
            <motion.div
              key={car.model}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard max={5} className="rounded-3xl h-full">
                <div className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-all duration-500 hover:shadow-card-hover">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={car.image}
                      alt={car.model}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent" />
                    {/* Light sweep reflex */}
                    <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 transition-transform duration-[1400ms] ease-out group-hover:translate-x-full" />
                    <span className="absolute top-4 left-4 rounded-full glass-premium px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-foreground">
                      {car.tag}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="mb-4 text-xl font-bold text-foreground font-display">
                      {car.model}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {car.specs.map((s) => (
                        <span
                          key={s.label}
                          className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground"
                        >
                          <s.icon className="h-3.5 w-3.5 text-primary" />
                          {s.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap justify-center gap-6 text-xs text-muted-foreground"
        >
          {[
            { icon: Shield, text: "Zertifizierte Ausbildung" },
            { icon: Gauge, text: "Moderne Assistenzsysteme" },
            { icon: Fuel, text: "Regelmäßig gewartet" },
          ].map((f) => (
            <span key={f.text} className="flex items-center gap-1.5">
              <f.icon className="h-4 w-4 text-primary" /> {f.text}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FleetSection;
