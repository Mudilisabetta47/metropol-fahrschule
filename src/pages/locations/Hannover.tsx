import LocationTemplate from "@/components/LocationTemplate";
import locationImage from "@/assets/hero-driving.jpg";

const Hannover = () => (
  <LocationTemplate
    data={{
      name: "Hannover",
      address: "Engelbosteler Damm 1",
      zip: "30167 Hannover",
      phone: "0511 6425066",
      email: "info@fahrschule-metropol.de",
      hours: ["Mo–Fr: 10:00–13:30, 14:30–19:00 Uhr", "Sa–So: Geschlossen"],
      description: "Mitten in Hannover – perfekt erreichbar per ÖPNV und mit modernster Ausstattung.",
      longDescription: "Der Standort Hannover der Fahrschule Metropol befindet sich am Engelbosteler Damm 1 – gut erreichbar mit Bus und Bahn. Wir bieten hier eine umfassende Fahrausbildung für alle gängigen Führerscheinklassen. Unsere erfahrenen Fahrlehrer kennen den Hannoveraner Stadtverkehr aus dem Effeff und bereiten dich praxisnah auf die Prüfung vor. Gut erreichbar mit ÖPNV.",
      mapEmbed: "https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Engelbosteler+Damm+1,+30167+Hannover,+Germany&zoom=16",
      mapsLink: "https://www.google.com/maps/dir//Engelbosteler+Damm+1,+30167+Hannover",
      seoTitle: "Fahrschule Hannover – Fahrschule Metropol | Zentral & Flexibel",
      seoDescription: "Fahrschule Metropol Hannover: Zentrale Lage an der Georgstraße. Flexible Zeiten bis 19 Uhr, alle Klassen. 98% Bestehensquote. Jetzt anmelden!",
      seoKeywords: "Fahrschule Hannover Standort, Fahrschule Engelbosteler Damm, Fahrschule Nordstadt, Öffnungszeiten Fahrschule Hannover, Fahrschule Hannover Kontakt, Fahrschule Hannover Telefon, Fahrschule Mitte Hannover, Beste Fahrschule Hannover, Fahrschule Hannover Bewertung",
      image: locationImage,
    }}
  />
);

export default Hannover;
