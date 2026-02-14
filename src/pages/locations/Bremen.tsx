import LocationTemplate from "@/components/LocationTemplate";

const Bremen = () => (
  <LocationTemplate
    data={{
      name: "Bremen",
      address: "Musterstraße 1",
      zip: "28195 Bremen",
      phone: "0421 / 123 45",
      email: "bremen@fahrschule-metropol.de",
      hours: ["Mo–Fr: 9:00–18:00", "Sa: 10:00–14:00"],
      description: "Unser Hauptstandort mitten in der Bremer Innenstadt – modern, gut erreichbar und mit viel Erfahrung.",
      longDescription: "Die Fahrschule Metropol Bremen ist unser Hauptstandort und befindet sich zentral in der Bremer Innenstadt. Seit über 15 Jahren bilden wir hier Fahrschüler aller Klassen aus – vom PKW-Führerschein B über Motorrad bis hin zu speziellen Klassen. Unsere Fahrlehrer kennen die Bremer Prüfstrecken bestens und bereiten dich gezielt auf die Prüfung vor. Die Räumlichkeiten sind modern ausgestattet und bieten optimale Bedingungen für deinen Theorieunterricht. Ob BF17, Intensivkurs oder reguläre Ausbildung – in Bremen bist du bestens aufgehoben.",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2397.5!2d8.8!3d53.08!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTPCsDA0JzQ4LjAiTiA4wrA0OCcwMC4wIkU!5e0!3m2!1sde!2sde!4v1",
      mapsLink: "https://www.google.com/maps/dir//Musterstraße+1,+28195+Bremen",
      seoTitle: "Fahrschule Bremen – Fahrschule Metropol | Alle Klassen, Top Bestehensquote",
      seoDescription: "Fahrschule Metropol Bremen: Professionelle Fahrausbildung in der Innenstadt. Klasse B, Motorrad & mehr. 98% Bestehensquote. Jetzt anmelden!",
    }}
  />
);

export default Bremen;
