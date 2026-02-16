import LocationTemplate from "@/components/LocationTemplate";
import locationImage from "@/assets/location-bremen.jpg";

const Bremen = () => (
  <LocationTemplate
    data={{
      name: "Bremen",
      address: "Bahnhofsplatz 41",
      zip: "28195 Bremen",
      phone: "0421 48445910",
      email: "bremen@fahrschule-metropol.de",
      hours: ["Mo–Fr: 08:00–12:00, 12:30–16:30 Uhr", "Sa–So: Geschlossen"],
      description: "Unser Hauptstandort mitten in der Bremer Innenstadt – modern, gut erreichbar und mit viel Erfahrung.",
      longDescription: "Die Fahrschule Metropol Bremen ist unser Hauptstandort und befindet sich zentral in der Bremer Innenstadt am Bahnhofsplatz. Seit über 20 Jahren bilden wir hier Fahrschüler aller Klassen aus – vom PKW-Führerschein B über Motorrad bis hin zu speziellen Klassen. Unsere Fahrlehrer kennen die Bremer Prüfstrecken bestens und bereiten dich gezielt auf die Prüfung vor. Die Räumlichkeiten sind modern ausgestattet und bieten optimale Bedingungen für deinen Theorieunterricht. Ob BF17, Intensivkurs oder reguläre Ausbildung – in Bremen bist du bestens aufgehoben. Gut erreichbar mit ÖPNV.",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2397.5!2d8.8135!3d53.0835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b12762f0e023b7%3A0x4a0a3b0c1c5e1234!2sBahnhofsplatz+41%2C+28195+Bremen!5e0!3m2!1sde!2sde!4v1",
      mapsLink: "https://www.google.com/maps/dir//Bahnhofsplatz+41,+28195+Bremen",
      seoTitle: "Fahrschule Bremen – Fahrschule Metropol | Alle Klassen, Top Bestehensquote",
      seoDescription: "Fahrschule Metropol Bremen: Professionelle Fahrausbildung in der Innenstadt. Klasse B, Motorrad & mehr. 98% Bestehensquote. Jetzt anmelden!",
      image: locationImage,
    }}
  />
);

export default Bremen;
