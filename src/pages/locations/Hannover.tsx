import LocationTemplate from "@/components/LocationTemplate";

const Hannover = () => (
  <LocationTemplate
    data={{
      name: "Hannover",
      address: "Georgstraße 5",
      zip: "30159 Hannover",
      phone: "0511 / 456 78",
      email: "hannover@fahrschule-metropol.de",
      hours: ["Mo–Fr: 10:00–13:30, 14:30–19:00", "Sa–So: Geschlossen"],
      description: "Mitten in der Landeshauptstadt – perfekt erreichbar per ÖPNV und mit modernster Ausstattung.",
      longDescription: "Der Standort Hannover der Fahrschule Metropol befindet sich direkt an der Georgstraße – einer der zentralsten Adressen der Landeshauptstadt. Perfekt erreichbar mit Bus und Bahn, bieten wir hier eine umfassende Fahrausbildung für alle gängigen Führerscheinklassen. Unsere erfahrenen Fahrlehrer kennen den Hannoveraner Stadtverkehr aus dem Effeff und bereiten dich praxisnah auf die Prüfung vor. Auch Abendtermine sind hier möglich – ideal für Berufstätige und Studenten. Erweiterte Öffnungszeiten bis 19 Uhr machen uns besonders flexibel.",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2400!2d9.73!3d52.37!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDIyJzEyLjAiTiA5wrA0Myc0OC4wIkU!5e0!3m2!1sde!2sde!4v1",
      mapsLink: "https://www.google.com/maps/dir//Georgstraße+5,+30159+Hannover",
      seoTitle: "Fahrschule Hannover – Fahrschule Metropol | Zentral & Flexibel",
      seoDescription: "Fahrschule Metropol Hannover: Zentrale Lage an der Georgstraße. Flexible Zeiten bis 19 Uhr, alle Klassen. 98% Bestehensquote. Jetzt anmelden!",
    }}
  />
);

export default Hannover;
