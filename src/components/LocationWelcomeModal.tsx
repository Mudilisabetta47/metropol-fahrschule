import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, ArrowRight } from "lucide-react";

const STORAGE_KEY = "metropol_preferred_location";
export const OPEN_LOCATION_MODAL_EVENT = "open-location-modal";
export const LOCATION_CHANGED_EVENT = "location-changed";

export const getPreferredLocation = () => {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(STORAGE_KEY);
  return v && v !== "skipped" ? v : null;
};

const locations = [
  { name: "Hannover", path: "/standorte/hannover", address: "Engelbosteler Damm 1", zip: "30167 Hannover" },
  { name: "Garbsen", path: "/standorte/garbsen", address: "Planetenring 25–27", zip: "30823 Garbsen" },
  { name: "Bremen", path: "/standorte/bremen", address: "Bahnhofsplatz 41", zip: "28195 Bremen" },
];

const LocationWelcomeModal = ({ autoOpen = false }: { autoOpen?: boolean }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (autoOpen && !localStorage.getItem(STORAGE_KEY)) {
      const timer = setTimeout(() => setOpen(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [autoOpen]);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(OPEN_LOCATION_MODAL_EVENT, handler);
    return () => window.removeEventListener(OPEN_LOCATION_MODAL_EVENT, handler);
  }, []);

  const dismiss = () => {
    if (!localStorage.getItem(STORAGE_KEY)) localStorage.setItem(STORAGE_KEY, "skipped");
    setOpen(false);
  };

  const choose = (name: string) => {
    localStorage.setItem(STORAGE_KEY, name);
    window.dispatchEvent(new CustomEvent(LOCATION_CHANGED_EVENT, { detail: name }));
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
          onClick={dismiss}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border-2 border-primary/30 bg-card p-6 shadow-glow md:p-10"
          >
            <button
              onClick={dismiss}
              aria-label="Schließen"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
                <MapPin className="h-7 w-7" />
              </div>
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                Standort wählen
              </span>
              <h2 className="mt-3 text-2xl font-bold text-foreground font-display md:text-3xl">
                Welcher Standort passt zu dir?
              </h2>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">
                Wähle deinen Wunsch-Standort – du kannst die Auswahl jederzeit über den Button im Header ändern.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {locations.map((loc) => (
                <Link
                  key={loc.name}
                  to={loc.path}
                  onClick={() => choose(loc.name)}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-background p-5 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-cta"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-primary/0 transition-all group-hover:from-primary/10 group-hover:to-primary/5" />
                  <div className="relative">
                    <h3 className="text-lg font-bold text-foreground font-display">{loc.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{loc.address}</p>
                    <p className="text-xs text-muted-foreground">{loc.zip}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                      Standort öffnen
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <button
              onClick={dismiss}
              className="mx-auto mt-6 block text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Später entscheiden
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LocationWelcomeModal;
