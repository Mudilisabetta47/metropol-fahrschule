import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = (type: "all" | "essential") => {
    localStorage.setItem("cookie-consent", type);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
          className="fixed bottom-4 left-4 right-4 z-[60] mx-auto max-w-lg rounded-2xl border border-border bg-card p-5 shadow-card-hover sm:bottom-6 sm:left-6 sm:right-auto"
        >
          <button
            onClick={() => accept("essential")}
            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Schließen"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <Cookie className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground mb-1">Cookie-Einstellungen</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                Wir verwenden Cookies, um dir die bestmögliche Erfahrung auf unserer Website zu bieten.{" "}
                <a href="/datenschutz" className="text-primary hover:underline">Mehr erfahren</a>
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => accept("all")}
                  className="gradient-primary text-primary-foreground border-0 text-xs font-bold rounded-lg"
                >
                  Alle akzeptieren
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => accept("essential")}
                  className="text-xs font-bold rounded-lg"
                >
                  Nur notwendige
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
