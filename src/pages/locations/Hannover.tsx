import LocationTemplate from "@/components/LocationTemplate";
import locationImage from "@/assets/location-hannover.jpg";

const Hannover = () => (
  <LocationTemplate
    data={{
      name: "Hannover",
      address: "Vahrenwalder Str. 213",
      zip: "30165 Hannover",
      phone: "0511 6425068",
      email: "info@metropol-bz.de",
      hours: ["Mo–Fr: 08:00–12:00, 12:30–16:30 Uhr", "Sa–So: Geschlossen"],
      description: "Mitten in Hannover – perfekt erreichbar per ÖPNV und mit modernster Ausstattung.",
      longDescription: "Der Standort Hannover der Fahrschule Metropol befindet sich an der Vahrenwalder Straße 213 – gut erreichbar mit Bus und Bahn. Wir bieten hier eine umfassende Fahrausbildung für alle gängigen Führerscheinklassen. Unsere erfahrenen Fahrlehrer kennen den Hannoveraner Stadtverkehr aus dem Effeff und bereiten dich praxisnah auf die Prüfung vor. Gut erreichbar mit ÖPNV.",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2400!2d9.738!3d52.399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b074e2f0e023b7%3A0x4a0a3b0c1c5e9012!2sVahrenwalder+Str.+213%2C+30165+Hannover!5e0!3m2!1sde!2sde!4v1",
      mapsLink: "https://www.google.com/maps/dir//Vahrenwalder+Str.+213,+30165+Hannover",
      seoTitle: "Fahrschule Hannover – Fahrschule Metropol | Zentral & Flexibel",
      seoDescription: "Fahrschule Metropol Hannover: Zentrale Lage an der Georgstraße. Flexible Zeiten bis 19 Uhr, alle Klassen. 98% Bestehensquote. Jetzt anmelden!",
      image: locationImage,
    }}
  />
);

export default Hannover;
