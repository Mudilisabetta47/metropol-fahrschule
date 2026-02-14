import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, ChevronRight, Car } from "lucide-react";
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
  const showSolid = scrolled || !isHome;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          showSolid
            ? "bg-card/95 backdrop-blur-xl border-b border-border shadow-card"
            : "bg-transparent"
        }`}
      >
        {/* Top accent line */}
        <div className="h-[3px] w-full gradient-primary" />

        <div className="container mx-auto flex h-[72px] items-center justify-between px-4 lg:h-[80px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl gradient-primary shadow-cta transition-all duration-300 group-hover:shadow-glow group-hover:scale-105">
              <Car className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className={`text-[17px] font-extrabold tracking-tight transition-colors font-display ${
                showSolid ? "text-foreground" : "text-primary-foreground"
              }`}>
                Fahrschule
              </span>
              <span className="text-[11px] font-extrabold text-primary tracking-[0.2em] uppercase">Metropol</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center lg:flex">
            <div className={`flex items-center gap-0.5 rounded-2xl px-1.5 py-1.5 ${
              showSolid ? "bg-secondary/60" : "bg-primary-foreground/5 backdrop-blur-sm"
            }`}>
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative rounded-xl px-4 py-2 text-[13px] font-semibold transition-all duration-200 ${
                      isActive
                        ? showSolid
                          ? "bg-card text-foreground shadow-sm"
                          : "bg-primary-foreground/15 text-primary-foreground"
                        : showSolid
                        ? "text-muted-foreground hover:text-foreground hover:bg-card/60"
                        : "text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Right side */}
          <div className="hidden items-center gap-4 lg:flex">
            <a
              href="tel:+4942112345"
              className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 ${
                showSolid
                  ? "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  : "text-primary-foreground/50 hover:text-primary-foreground hover:bg-primary-foreground/10"
              }`}
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                <Phone className="h-3.5 w-3.5 text-primary" />
              </div>
              0421 / 123 45
            </a>
            <Button variant="cta" size="default" className="rounded-xl px-5 shadow-cta" asChild>
              <Link to="/kontakt">
                Jetzt anmelden <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors lg:hidden ${
              showSolid ? "text-foreground hover:bg-secondary" : "text-primary-foreground hover:bg-primary-foreground/10"
            }`}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden bg-card/98 backdrop-blur-xl border-t border-border lg:hidden"
            >
              <nav className="container mx-auto flex flex-col gap-1 px-4 py-5">
                <Link
                  to="/"
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                    location.pathname === "/" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  Startseite
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                      location.pathname === link.path ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4 flex flex-col gap-2">
                  <Button variant="cta" className="rounded-xl" asChild>
                    <Link to="/kontakt">Jetzt anmelden <ChevronRight className="h-4 w-4" /></Link>
                  </Button>
                  <Button variant="outline" className="rounded-xl" asChild>
                    <a href="tel:+4942112345">
                      <Phone className="h-4 w-4" /> 0421 / 123 45
                    </a>
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
            className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-xl border-t border-border p-3 shadow-card lg:hidden"
          >
            <div className="flex gap-2">
              <Button variant="cta" className="flex-1 rounded-xl" asChild>
                <Link to="/kontakt">Jetzt anmelden</Link>
              </Button>
              <Button variant="outline" size="default" className="rounded-xl" asChild>
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
