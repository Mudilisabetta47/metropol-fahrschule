import LocationTemplate from "@/components/LocationTemplate";
import locationImage from "@/assets/class-pkw.jpg";

const Garbsen = () => (
  <LocationTemplate
    data={{
      name: "Garbsen",
      address: "Planetenring 25–27",
      zip: "30823 Garbsen",
      phone: "05137 8903395",
      email: "garbsen@fahrschule-metropol.de",
      hours: ["Mo–Fr: 10:00–13:30, 14:30–19:00 Uhr", "Sa–So: Geschlossen"],
      description: "Deine Fahrschule in Garbsen – entspannte Atmosphäre, eigener Parkplatz und top Anbindung.",
      longDescription: "In Garbsen bietet die Fahrschule Metropol eine erstklassige Fahrausbildung in familiärer Atmosphäre. Unser Standort liegt zentral am Planetenring und ist gut erreichbar mit ÖPNV. Das Garbsener Team legt besonderen Wert auf geduldige, individuelle Betreuung. Die ruhigeren Straßenverhältnisse in Garbsen eignen sich hervorragend für den Einstieg, bevor es in den Stadtverkehr nach Hannover geht. Auch Intensivkurse und Ferienkurse bieten wir hier regelmäßig an.",
      mapEmbed: "https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Planetenring+25,+30823+Garbsen,+Germany&zoom=16",
      mapsLink: "https://www.google.com/maps/dir//Planetenring+25,+30823+Garbsen",
      seoTitle: "Fahrschule Garbsen – Fahrschule Metropol | Entspannt zum Führerschein",
      seoDescription: "Fahrschule Metropol Garbsen: Fahrausbildung in familiärer Atmosphäre. Eigener Parkplatz, flexible Termine. Klasse B, Motorrad & mehr. Jetzt anmelden!",
      image: locationImage,
    }}
  />
);

export default Garbsen;
