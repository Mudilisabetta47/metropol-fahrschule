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
            className="fixed bottom-36 lg:bottom-20 left-4 z-50 w-80 rounded-2xl border border-border bg-card p-6 shadow-card-hover"
          >
            <button onClick={() => setExpanded(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors" aria-label="Close">
              <X className="h-4 w-4" />
            </button>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ background: '#00cc28' }}>
                <Cookie className="h-6 w-6 text-white" />
              </div>
              <div className="pr-6">
                <h3 className="text-base font-bold text-foreground mb-2">{t("cookie.title")}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {t("cookie.text")}{" "}
                  <a href="/datenschutz" className="text-[#00cc28] hover:underline font-medium">{t("cookie.learnMore")}</a>
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    size="sm" 
                    onClick={() => accept("all")} 
                    className="text-sm font-semibold rounded-xl px-6 py-2.5 text-white border-0 hover:opacity-90 transition-opacity"
                    style={{ background: '#00cc28' }}
                  >
                    {t("cookie.acceptAll")}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => accept("essential")} 
                    className="text-sm font-semibold rounded-xl px-6 py-2.5 border-border hover:bg-accent transition-colors"
                  >
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
