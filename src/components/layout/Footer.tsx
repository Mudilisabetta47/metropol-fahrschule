import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
                <span className="text-xl font-black text-primary-foreground">M</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-bold text-foreground">Fahrschule</span>
                <span className="text-sm font-semibold text-primary">Metropol</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Deine moderne Fahrschule in Bremen, Garbsen und Hannover. Professionelle Ausbildung für alle Führerscheinklassen.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">Navigation</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Über uns", path: "/ueber-uns" },
                { label: "Führerscheinklassen", path: "/fuehrerscheinklassen" },
                { label: "Preise", path: "/preise" },
                { label: "Standorte", path: "/standorte" },
                { label: "FAQ", path: "/faq" },
                { label: "Kontakt", path: "/kontakt" },
              ].map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-muted-foreground hover:text-primary transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">Standorte</h4>
            <ul className="space-y-3 text-sm">
              {[
                { name: "Bremen", addr: "Musterstraße 1, 28195 Bremen" },
                { name: "Garbsen", addr: "Hauptstraße 10, 30823 Garbsen" },
                { name: "Hannover", addr: "Georgstraße 5, 30159 Hannover" },
              ].map((s) => (
                <li key={s.name} className="flex gap-2 text-muted-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <span className="font-medium text-foreground">{s.name}</span>
                    <br />
                    {s.addr}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">Kontakt</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                0421 / 123 45
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                info@fahrschule-metropol.de
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <Clock className="mt-0.5 h-4 w-4 text-primary" />
                <div>Mo–Fr: 9:00–18:00<br />Sa: 10:00–14:00</div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Fahrschule Metropol. Alle Rechte vorbehalten.</p>
          <div className="flex gap-4">
            <Link to="/datenschutz" className="hover:text-primary">Datenschutz</Link>
            <Link to="/impressum" className="hover:text-primary">Impressum</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
