import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { MessageCircle, CalendarCheck, X, Phone } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Sticky floating action stack (bottom-right): WhatsApp + Termin/Kontakt + Call.
 * Appears after user scrolls past hero. Desktop-friendly, keyboard accessible.
 */
const FloatingActions = () => {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
        >
          <AnimatePresence>
            {open && (
              <>
                <motion.a
                  key="wa"
                  href="https://wa.me/491784142020"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  transition={{ duration: 0.25, delay: 0.05 }}
                  className="group flex items-center gap-3 rounded-full bg-[#25D366] pl-5 pr-5 py-3 text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.7)] hover:scale-105 transition-transform"
                  aria-label="WhatsApp"
                >
                  <span className="text-sm font-semibold whitespace-nowrap">WhatsApp</span>
                  <MessageCircle className="h-5 w-5" />
                </motion.a>
                <motion.div
                  key="ct"
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  transition={{ duration: 0.25, delay: 0.1 }}
                >
                  <Link
                    to="/kontakt"
                    className="flex items-center gap-3 rounded-full gradient-primary pl-5 pr-5 py-3 text-primary-foreground shadow-cta hover:scale-105 transition-transform"
                    aria-label="Termin anfragen"
                  >
                    <span className="text-sm font-semibold whitespace-nowrap">Termin anfragen</span>
                    <CalendarCheck className="h-5 w-5" />
                  </Link>
                </motion.div>
                <motion.a
                  key="tel"
                  href="tel:+495116425066"
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  transition={{ duration: 0.25, delay: 0.15 }}
                  className="flex items-center gap-3 rounded-full bg-foreground pl-5 pr-5 py-3 text-background shadow-lg hover:scale-105 transition-transform"
                  aria-label="Anrufen"
                >
                  <span className="text-sm font-semibold whitespace-nowrap">0511 6425066</span>
                  <Phone className="h-5 w-5" />
                </motion.a>
              </>
            )}
          </AnimatePresence>

          <motion.button
            onClick={() => setOpen((o) => !o)}
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.06 }}
            className="relative flex h-14 w-14 items-center justify-center rounded-full gradient-primary text-primary-foreground shadow-[0_12px_40px_-8px_hsl(var(--primary)/0.6)]"
            aria-label={open ? "Menü schließen" : "Kontaktoptionen öffnen"}
            aria-expanded={open}
          >
            <span className="absolute inset-0 rounded-full gradient-primary opacity-70 blur-md -z-10 animate-pulse" />
            <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }}>
              {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
            </motion.span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingActions;
