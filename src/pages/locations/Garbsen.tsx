import LocationTemplate from "@/components/LocationTemplate";
import locationImage from "@/assets/location-garbsen.jpg";

const Garbsen = () => (
  <LocationTemplate
    data={{
      name: "Garbsen",
      address: "Planetenring 25–27",
      zip: "30823 Garbsen",
      phone: "05137 8903395",
      email: "garbsen@fahrschule-metropol.de",
      hours: ["Mo–Fr: 08:00–12:00, 12:30–16:30 Uhr", "Sa–So: Geschlossen"],
      description: "Deine Fahrschule in Garbsen – entspannte Atmosphäre, eigener Parkplatz und top Anbindung.",
      longDescription: "In Garbsen bietet die Fahrschule Metropol eine erstklassige Fahrausbildung in familiärer Atmosphäre. Unser Standort liegt zentral am Planetenring und ist gut erreichbar mit ÖPNV. Das Garbsener Team legt besonderen Wert auf geduldige, individuelle Betreuung. Die ruhigeren Straßenverhältnisse in Garbsen eignen sich hervorragend für den Einstieg, bevor es in den Stadtverkehr nach Hannover geht. Auch Intensivkurse und Ferienkurse bieten wir hier regelmäßig an.",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2400!2d9.5978!3d52.4275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b074d2f0e023b7%3A0x4a0a3b0c1c5e5678!2sPlanetenring+25%2C+30823+Garbsen!5e0!3m2!1sde!2sde!4v1",
      mapsLink: "https://www.google.com/maps/dir//Planetenring+25,+30823+Garbsen",
      seoTitle: "Fahrschule Garbsen – Fahrschule Metropol | Entspannt zum Führerschein",
      seoDescription: "Fahrschule Metropol Garbsen: Fahrausbildung in familiärer Atmosphäre. Eigener Parkplatz, flexible Termine. Klasse B, Motorrad & mehr. Jetzt anmelden!",
      image: locationImage,
    }}
  />
);

export default Garbsen;
