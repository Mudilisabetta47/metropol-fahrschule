import LocationTemplate from "@/components/LocationTemplate";
import locationImage from "@/assets/hero-driving.jpg";

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
      mapEmbed: "https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Vahrenwalder+Str.+213,+30165+Hannover,+Germany&zoom=16",
      mapsLink: "https://www.google.com/maps/dir//Vahrenwalder+Str.+213,+30165+Hannover",
      seoTitle: "Fahrschule Hannover – Fahrschule Metropol | Zentral & Flexibel",
      seoDescription: "Fahrschule Metropol Hannover: Zentrale Lage an der Georgstraße. Flexible Zeiten bis 19 Uhr, alle Klassen. 98% Bestehensquote. Jetzt anmelden!",
      image: locationImage,
    }}
  />
);

export default Hannover;
