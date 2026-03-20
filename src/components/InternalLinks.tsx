import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Car, MapPin, Heart, BookOpen, HelpCircle, Euro } from "lucide-react";

const linkGroups = {
  classes: [
    { label: "Führerschein Klasse B", path: "/fuehrerschein/klasse-b", icon: Car },
    { label: "Führerschein B197", path: "/fuehrerschein/klasse-b197", icon: Car },
    { label: "Motorrad Klasse A", path: "/fuehrerschein/klasse-a", icon: Car },
    { label: "LKW Klasse C/CE", path: "/fuehrerschein/klasse-c", icon: Car },
    { label: "Bus Klasse D", path: "/fuehrerschein/klasse-d", icon: Car },
    { label: "Alle Führerscheinklassen", path: "/fuehrerscheinklassen", icon: BookOpen },
  ],
  locations: [
    { label: "Fahrschule Hannover", path: "/standorte/hannover", icon: MapPin },
    { label: "Fahrschule Garbsen", path: "/standorte/garbsen", icon: MapPin },
    { label: "Fahrschule Bremen", path: "/standorte/bremen", icon: MapPin },
  ],
  services: [
    { label: "Erste-Hilfe-Kurs", path: "/erste-hilfe", icon: Heart },
    { label: "Aufbauseminar", path: "/aufbauseminar", icon: BookOpen },
    { label: "Preise & Kosten", path: "/preise", icon: Euro },
    { label: "Häufige Fragen", path: "/faq", icon: HelpCircle },
  ],
};

interface InternalLinksProps {
  /** Which groups to exclude from rendering (e.g., on location pages exclude "locations") */
  exclude?: ("classes" | "locations" | "services")[];
  title?: string;
}

const InternalLinks = ({ exclude = [], title = "Weitere Informationen" }: InternalLinksProps) => {
  const groups = Object.entries(linkGroups).filter(([key]) => !exclude.includes(key as keyof typeof linkGroups));

  return (
    <section className="py-16 border-t border-border/50">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="mb-8 text-xl font-bold text-foreground font-display">{title}</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map(([key, links]) => (
              <div key={key}>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground/50">
                  {key === "classes" ? "Führerscheinklassen" : key === "locations" ? "Standorte" : "Services & Infos"}
                </h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        <link.icon className="h-3.5 w-3.5 text-primary/50 group-hover:text-primary transition-colors" />
                        {link.label}
                        <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InternalLinks;
