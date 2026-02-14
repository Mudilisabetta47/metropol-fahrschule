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
      description: "Deine Fahrschule in Garbsen – zentral gelegen, mit eigenem Parkplatz und entspannter Atmosphäre.",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2400!2d9.6!3d52.42!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDI1JzEyLjAiTiA5wrAzNicwMC4wIkU!5e0!3m2!1sde!2sde!4v1",
    }}
  />
);

export default Garbsen;
