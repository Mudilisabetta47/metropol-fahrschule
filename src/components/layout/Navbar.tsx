import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Startseite", num: "01", path: "/" },
  { label: "Führerschein", num: "02", path: "/fuehrerscheinklassen" },
  { label: "Ausbildungsklassen", num: "03", path: "/preise" },
  { label: "Kontakt", num: "04", path: "/kontakt" },
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
          {/* Logo - city skyline style like reference */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex items-end gap-[2px]">
              {/* Stylized city skyline icon */}
              <svg width="48" height="36" viewBox="0 0 48 36" fill="none" className="transition-transform duration-300 group-hover:scale-105">
                {/* Buildings */}
                <rect x="2" y="14" width="6" height="22" rx="1" className={showSolid ? "fill-foreground" : "fill-primary-foreground"} opacity="0.7" />
                <rect x="10" y="6" width="5" height="30" rx="1" className={showSolid ? "fill-foreground" : "fill-primary-foreground"} opacity="0.85" />
                <rect x="17" y="10" width="7" height="26" rx="1" className={showSolid ? "fill-foreground" : "fill-primary-foreground"} opacity="0.6" />
                <rect x="26" y="2" width="5" height="34" rx="1" className={showSolid ? "fill-foreground" : "fill-primary-foreground"} opacity="0.9" />
                <rect x="33" y="8" width="6" height="28" rx="1" className={showSolid ? "fill-foreground" : "fill-primary-foreground"} opacity="0.75" />
                <rect x="41" y="16" width="5" height="20" rx="1" className={showSolid ? "fill-foreground" : "fill-primary-foreground"} opacity="0.5" />
                {/* Antenna / spire */}
                <rect x="28" y="0" width="1" height="4" className="fill-primary" />
                <circle cx="28.5" cy="0" r="1" className="fill-primary" />
                {/* Windows */}
                <rect x="11.5" y="10" width="2" height="2" rx="0.5" className="fill-primary" opacity="0.8" />
                <rect x="11.5" y="15" width="2" height="2" rx="0.5" className="fill-primary" opacity="0.6" />
                <rect x="27" y="6" width="2" height="2" rx="0.5" className="fill-primary" opacity="0.8" />
                <rect x="27" y="11" width="2" height="2" rx="0.5" className="fill-primary" opacity="0.6" />
                <rect x="34.5" y="12" width="2" height="2" rx="0.5" className="fill-primary" opacity="0.7" />
              </svg>
            </div>
          </Link>

          {/* Desktop Nav - numbered items like reference */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`group relative px-5 py-2 text-[15px] transition-all duration-200 ${
                    isActive
                      ? showSolid ? "text-foreground" : "text-primary-foreground"
                      : showSolid
                      ? "text-muted-foreground hover:text-foreground"
                      : "text-primary-foreground/50 hover:text-primary-foreground"
                  }`}
                >
                  <span className="font-medium tracking-wide">{link.label}</span>
                  <sup className={`ml-0.5 text-[10px] font-bold ${
                    isActive ? "text-primary" : showSolid ? "text-muted-foreground/50" : "text-primary-foreground/30"
                  }`}>
                    {link.num}
                  </sup>
                  {/* Active underline */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-5 right-5 h-[2px] gradient-primary rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button - arrow circle + text like reference */}
          <div className="hidden lg:flex items-center">
            <Button asChild className="group rounded-full pl-1.5 pr-6 py-2 h-12 gap-3 gradient-primary text-primary-foreground font-bold text-[15px] shadow-cta hover:shadow-glow transition-all duration-300 border-0">
              <Link to="/kontakt">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/20 transition-all duration-300 group-hover:bg-primary-foreground/30">
                  <ArrowRight className="h-4 w-4" />
                </span>
                Freie Fahrt!
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
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                      location.pathname === link.path ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="text-[10px] text-muted-foreground/50 font-bold">{link.num}</span>
                  </Link>
                ))}
                {/* Extra links */}
                {[
                  { label: "Über uns", path: "/ueber-uns" },
                  { label: "Standorte", path: "/standorte" },
                  { label: "FAQ", path: "/faq" },
                ].map((link) => (
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
                <div className="mt-4">
                  <Button className="w-full rounded-xl gradient-primary text-primary-foreground font-bold border-0 shadow-cta" asChild>
                    <Link to="/kontakt">
                      <ArrowRight className="h-4 w-4 mr-2" /> Freie Fahrt!
                    </Link>
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
            <Button className="w-full rounded-xl gradient-primary text-primary-foreground font-bold border-0 shadow-cta" asChild>
              <Link to="/kontakt">Freie Fahrt! <ArrowRight className="h-4 w-4 ml-2" /></Link>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
