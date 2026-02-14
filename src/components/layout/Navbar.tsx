import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { label: "Startseite", path: "/" },
  { label: "Über uns", path: "/ueber-uns" },
  { label: "Führerscheinklassen", path: "/fuehrerscheinklassen" },
  { label: "Preise", path: "/preise" },
  { label: "Standorte", path: "/standorte" },
  { label: "FAQ", path: "/faq" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:h-20">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
            <span className="text-xl font-black text-primary-foreground">M</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-bold text-foreground">Fahrschule</span>
            <span className="text-sm font-semibold text-primary">Metropol</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                location.pathname === link.path
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="tel:+4942112345" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
            <Phone className="h-4 w-4" />
            0421 / 123 45
          </a>
          <Button variant="cta" asChild>
            <Link to="/kontakt">Jetzt anmelden</Link>
          </Button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-foreground hover:bg-accent lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button variant="cta" className="mt-2" asChild>
              <Link to="/kontakt" onClick={() => setOpen(false)}>Jetzt anmelden</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
