import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative border-t border-border bg-secondary">
      {/* Top bar */}
      <div className="gradient-dark">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
          <p className="text-lg font-bold text-primary-foreground font-display">
            Bereit für deinen Führerschein?
          </p>
          <Link
            to="/kontakt"
            className="group flex items-center gap-2 gradient-primary rounded-xl px-6 py-3 text-sm font-bold text-primary-foreground shadow-cta transition-all hover:shadow-glow"
          >
            Jetzt anmelden
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-5 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary">
                <span className="text-lg font-black text-primary-foreground font-display">M</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-base font-bold text-foreground">Fahrschule</span>
                <span className="text-xs font-bold text-primary tracking-wide">METROPOL</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Deine moderne Fahrschule in Bremen, Garbsen und Hannover. Professionelle Ausbildung seit über 15 Jahren.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Über uns", path: "/ueber-uns" },
                { label: "Führerscheinklassen", path: "/fuehrerscheinklassen" },
                { label: "Preise", path: "/preise" },
                { label: "Standorte", path: "/standorte" },
                { label: "FAQ", path: "/faq" },
                { label: "Kontakt", path: "/kontakt" },
              ].map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-foreground/70 hover:text-primary transition-colors duration-200">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Standorte</h4>
            <ul className="space-y-3 text-sm">
              {[
                { name: "Bremen", addr: "Musterstraße 1, 28195 Bremen", path: "/standorte/bremen" },
                { name: "Garbsen", addr: "Hauptstraße 10, 30823 Garbsen", path: "/standorte/garbsen" },
                { name: "Hannover", addr: "Georgstraße 5, 30159 Hannover", path: "/standorte/hannover" },
              ].map((s) => (
                <li key={s.name}>
                  <Link to={s.path} className="group flex gap-2 text-foreground/70 hover:text-primary transition-colors">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary/60 group-hover:text-primary" />
                    <div>
                      <span className="font-medium text-foreground">{s.name}</span>
                      <br />
                      <span className="text-xs">{s.addr}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Kontakt</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5 text-foreground/70">
                <Phone className="h-4 w-4 text-primary/60" /> 0421 / 123 45
              </li>
              <li className="flex items-center gap-2.5 text-foreground/70">
                <Mail className="h-4 w-4 text-primary/60" /> info@fahrschule-metropol.de
              </li>
              <li className="flex items-start gap-2.5 text-foreground/70">
                <Clock className="mt-0.5 h-4 w-4 text-primary/60" />
                <div>Mo–Fr: 9:00–18:00<br />Sa: 10:00–14:00</div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Fahrschule Metropol. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6">
            <Link to="/datenschutz" className="hover:text-primary transition-colors">Datenschutz</Link>
            <Link to="/impressum" className="hover:text-primary transition-colors">Impressum</Link>
            <Link to="/login" className="hover:text-primary transition-colors">Mitarbeiter-Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
