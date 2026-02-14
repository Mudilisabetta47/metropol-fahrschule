import LocationTemplate from "@/components/LocationTemplate";

const Garbsen = () => (
  <LocationTemplate
    data={{
      name: "Garbsen",
      address: "Hauptstraße 10",
      zip: "30823 Garbsen",
      phone: "05131 / 987 65",
      email: "garbsen@fahrschule-metropol.de",
      hours: ["Mo–Fr: 10:00–18:00", "Sa: 10:00–13:00"],
      description: "Deine Fahrschule in Garbsen – entspannte Atmosphäre, eigener Parkplatz und top Anbindung.",
      longDescription: "In Garbsen bietet die Fahrschule Metropol eine erstklassige Fahrausbildung in familiärer Atmosphäre. Unser Standort liegt zentral an der Hauptstraße und verfügt über einen eigenen Parkplatz – ideal für die ersten Übungen. Das Garbsener Team legt besonderen Wert auf geduldige, individuelle Betreuung. Die ruhigeren Straßenverhältnisse in Garbsen eignen sich hervorragend für den Einstieg, bevor es in den Stadtverkehr nach Hannover geht. Auch Intensivkurse und Ferienkurse bieten wir hier regelmäßig an.",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2400!2d9.6!3d52.42!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDI1JzEyLjAiTiA5wrAzNicwMC4wIkU!5e0!3m2!1sde!2sde!4v1",
      mapsLink: "https://www.google.com/maps/dir//Hauptstraße+10,+30823+Garbsen",
      seoTitle: "Fahrschule Garbsen – Fahrschule Metropol | Entspannt zum Führerschein",
      seoDescription: "Fahrschule Metropol Garbsen: Fahrausbildung in familiärer Atmosphäre. Eigener Parkplatz, flexible Termine. Klasse B, Motorrad & mehr. Jetzt anmelden!",
    }}
  />
);

export default Garbsen;
