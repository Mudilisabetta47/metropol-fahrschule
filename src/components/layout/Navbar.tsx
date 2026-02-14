import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Über uns", path: "/ueber-uns" },
  { label: "Führerscheinklassen", path: "/fuehrerscheinklassen" },
  { label: "Preise", path: "/preise" },
  { label: "Standorte", path: "/standorte" },
  { label: "FAQ", path: "/faq" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const isHome = location.pathname === "/";
  const navBg = scrolled || !isHome
    ? "glass border-b border-border/40"
    : "bg-transparent";

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
        <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:h-20">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary transition-transform duration-200 group-hover:scale-105">
              <span className="text-lg font-black text-primary-foreground font-display">M</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className={`text-base font-bold transition-colors ${scrolled || !isHome ? "text-foreground" : "text-primary-foreground"}`}>
                Fahrschule
              </span>
              <span className="text-xs font-bold text-primary tracking-wide">METROPOL</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 hover:bg-primary/10 ${
                  location.pathname === link.path
                    ? "text-primary"
                    : scrolled || !isHome
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-primary-foreground/80 hover:text-primary-foreground"
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-3 right-3 h-0.5 gradient-primary rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="tel:+4942112345"
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                scrolled || !isHome ? "text-muted-foreground hover:text-foreground" : "text-primary-foreground/70 hover:text-primary-foreground"
              }`}
            >
              <Phone className="h-3.5 w-3.5" />
              0421 / 123 45
            </a>
            <Button variant="cta" size="sm" asChild>
              <Link to="/kontakt">
                Jetzt anmelden <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className={`rounded-lg p-2 transition-colors lg:hidden ${
              scrolled || !isHome ? "text-foreground hover:bg-accent" : "text-primary-foreground hover:bg-primary-foreground/10"
            }`}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden glass border-t border-border/40 lg:hidden"
            >
              <nav className="container mx-auto flex flex-col gap-1 px-4 py-4">
                <Link
                  to="/"
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    location.pathname === "/" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent"
                  }`}
                >
                  Startseite
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      location.pathname === link.path ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-3 flex flex-col gap-2">
                  <Button variant="cta" asChild>
                    <Link to="/kontakt">Jetzt anmelden</Link>
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Sticky mobile CTA */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
            className="fixed bottom-0 left-0 right-0 z-40 glass border-t border-border/40 p-3 lg:hidden"
          >
            <div className="flex gap-2">
              <Button variant="cta" className="flex-1" asChild>
                <Link to="/kontakt">Jetzt anmelden</Link>
              </Button>
              <Button variant="outline" size="default" asChild>
                <a href="tel:+4942112345">
                  <Phone className="h-4 w-4" /> Anrufen
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
