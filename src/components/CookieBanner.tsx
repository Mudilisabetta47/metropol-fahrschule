import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const CookieBanner = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => {
        setVisible(true);
        setExpanded(true);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      // Show collapsed button for users who already consented (to change settings)
      setVisible(true);
    }
  }, []);

  const accept = (type: "all" | "essential") => {
    localStorage.setItem("cookie-consent", type);
    setExpanded(false);
  };

  const hasConsent = localStorage.getItem("cookie-consent");

  return (
    <>
      <AnimatePresence>
        {visible && expanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
            className="fixed bottom-36 lg:bottom-20 left-4 z-50 w-72 rounded-2xl border border-border bg-card p-5 shadow-card-hover"
          >
            <button onClick={() => setExpanded(false)} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors" aria-label="Close">
              <X className="h-4 w-4" />
            </button>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Cookie className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground mb-1">{t("cookie.title")}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  {t("cookie.text")}{" "}
                  <a href="/datenschutz" className="text-primary hover:underline">{t("cookie.learnMore")}</a>
                </p>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => accept("all")} className="gradient-primary text-primary-foreground border-0 text-xs font-bold rounded-lg">
                    {t("cookie.acceptAll")}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => accept("essential")} className="text-xs font-bold rounded-lg">
                    {t("cookie.essentialOnly")}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {visible && (
        <div className="fixed bottom-20 lg:bottom-6 left-4 z-50">
          <motion.button
            onClick={() => setExpanded(!expanded)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-card transition-all hover:shadow-card-hover"
            aria-label="Cookie settings"
          >
            <Cookie className="h-5 w-5" />
          </motion.button>
        </div>
      )}
    </>
  );
};

export default CookieBanner;
