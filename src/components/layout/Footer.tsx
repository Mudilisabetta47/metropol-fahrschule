import { Link } from "react-router-dom";
import { Phone, Mail, Clock, ArrowUpRight, Facebook, Instagram, Linkedin } from "lucide-react";
import logoImage from "@/assets/logo.avif";

const seoLinks = [
  { label: "Fahrschule Bremen", path: "/standorte/bremen" },
  { label: "Fahrschule Hannover", path: "/standorte/hannover" },
  { label: "Fahrschule Garbsen", path: "/standorte/garbsen" },
  { label: "Führerschein B197", path: "/fuehrerschein/b197" },
  { label: "Führerschein Klasse B", path: "/fuehrerschein/b" },
  { label: "Führerschein Klasse A", path: "/fuehrerschein/a" },
  { label: "BF17 Hannover", path: "/fuehrerschein/bf17" },
  { label: "Motorrad Führerschein", path: "/fuehrerschein/a" },
  { label: "Erste Hilfe Kurs", path: "/erste-hilfe" },
  { label: "Aufbauseminar", path: "/aufbauseminar" },
  { label: "LKW Führerschein", path: "/fuehrerschein/c" },
  { label: "Bus Führerschein Bremen", path: "/fuehrerschein/d" },
  { label: "Führerschein Klasse BE", path: "/fuehrerschein/be" },
  { label: "Führerschein Klasse AM", path: "/fuehrerschein/am" },
  { label: "Führerschein Klasse A1", path: "/fuehrerschein/a1" },
  { label: "Führerschein Klasse A2", path: "/fuehrerschein/a2" },
];

const Footer = () => {
  return (
    <footer className="relative border-t border-primary/20">
      {/* CTA Bar */}
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

      {/* Main Footer – green background like reference */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Column 1: Logo & Description */}
            <div>
              <div className="mb-5">
                <img
                  src={logoImage}
                  alt="Fahrschule Metropol Logo"
                  className="h-24 w-auto brightness-0 invert"
                />
              </div>
              <p className="text-sm text-primary-foreground/70 leading-relaxed">
                Deine moderne Fahrschule in Hannover, Garbsen und Bremen. Professionelle Ausbildung für alle Führerscheinklassen seit über 20 Jahren.
              </p>
              {/* Google Rating Badge */}
              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
                <span className="text-yellow-300">★★★★★</span>
                <span>4.8</span>
                <span className="text-primary-foreground/50">(127)</span>
              </div>
              {/* Social Media */}
              <div className="mt-5 flex gap-3">
                {[
                  { icon: Facebook, href: "https://www.facebook.com/fahrschulemetropol", label: "Facebook" },
                  { icon: Instagram, href: "https://www.instagram.com/fahrschulemetropol", label: "Instagram" },
                  { icon: Linkedin, href: "https://www.linkedin.com/company/metropol-bildungszentrum", label: "LinkedIn" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground/70 transition-colors hover:bg-primary-foreground/20 hover:text-primary-foreground"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Navigation / Kurse */}
            <div>
              <h4 className="mb-5 text-base font-bold font-display">Unsere Klassen</h4>
              <ul className="space-y-2.5 text-sm">
                {[
                  { label: "PKW – Klasse B / B197", path: "/fuehrerschein/b" },
                  { label: "Motorrad – Klasse A", path: "/fuehrerschein/a" },
                  { label: "LKW – Klasse C/CE", path: "/fuehrerschein/c" },
                  { label: "Bus – Klasse D/DE", path: "/fuehrerschein/d" },
                  { label: "Erste Hilfe Kurs", path: "/erste-hilfe" },
                  { label: "Aufbauseminar", path: "/aufbauseminar" },
                  { label: "Alle Klassen →", path: "/fuehrerscheinklassen" },
                ].map((l) => (
                  <li key={l.path}>
                    <Link to={l.path} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-200">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Standorte */}
            <div>
              <h4 className="mb-5 text-base font-bold font-display">Standorte</h4>
              <ul className="space-y-4 text-sm">
                {[
                  { name: "Hannover", addr: "Vahrenwalder Str. 213, 30165 Hannover", path: "/standorte/hannover" },
                  { name: "Garbsen", addr: "Planetenring 25–27, 30823 Garbsen", path: "/standorte/garbsen" },
                  { name: "Bremen", addr: "Bahnhofsplatz 41, 28195 Bremen", path: "/standorte/bremen" },
                ].map((s) => (
                  <li key={s.name}>
                    <Link to={s.path} className="group block text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                      <span className="font-semibold text-primary-foreground">{s.name}</span>
                      <br />
                      <span className="text-xs text-primary-foreground/50">{s.addr}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Kontakt */}
            <div>
              <h4 className="mb-5 text-base font-bold font-display">Kontakt</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-primary-foreground/50" />
                  <div>
                    <span className="block text-xs text-primary-foreground/50">Telefon</span>
                    <a href="tel:+495116425066" className="font-medium hover:underline">0511 – 642 50 66</a>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary-foreground/50" />
                  <div>
                    <span className="block text-xs text-primary-foreground/50">E-Mail</span>
                    <a href="mailto:info@metropol-bz.de" className="font-medium hover:underline">info@metropol-bz.de</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 text-primary-foreground/50" />
                  <div>
                    <span className="block text-xs text-primary-foreground/50">Öffnungszeiten</span>
                    <span className="font-medium">Mo–Fr: 10:00–13:30</span>
                    <br />
                    <span className="font-medium">14:30–19:00 Uhr</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* SEO Links Section */}
        <div className="border-t border-primary-foreground/10">
          <div className="container mx-auto px-4 py-8">
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-primary-foreground/50">
              Ausbildungen & Standorte
            </h4>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {seoLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="mt-6 max-w-4xl text-xs text-primary-foreground/40 leading-relaxed">
              Fahrschule Metropol – Deine Fahrschule in Niedersachsen und Bremen. Wir bieten Führerschein Klasse B, B197, BF17, Motorrad (A, A1, A2, AM), LKW (C, CE), Bus (D, DE) sowie Erste-Hilfe-Kurse und Aufbauseminare an unseren Standorten Hannover, Garbsen und Bremen.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10">
          <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-primary-foreground/40 sm:flex-row">
            <p>© {new Date().getFullYear()} Fahrschule Metropol. Alle Rechte vorbehalten.</p>
            <div className="flex flex-wrap gap-6">
              <Link to="/impressum" className="hover:text-primary-foreground transition-colors">Impressum</Link>
              <Link to="/datenschutz" className="hover:text-primary-foreground transition-colors">Datenschutz</Link>
              <Link to="/login" className="hover:text-primary-foreground transition-colors">Mitarbeiter-Login</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
