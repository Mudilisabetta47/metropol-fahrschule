import LocationTemplate from "@/components/LocationTemplate";

const Hannover = () => (
  <LocationTemplate
    data={{
      name: "Hannover",
      address: "Georgstraße 5",
      zip: "30159 Hannover",
      phone: "0511 / 456 78",
      email: "hannover@fahrschule-metropol.de",
      hours: ["Mo–Fr: 9:00–19:00", "Sa: 10:00–14:00"],
      description: "Mitten in Hannover – perfekt erreichbar mit ÖPNV und modernster Ausstattung für deine Fahrausbildung.",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2400!2d9.73!3d52.37!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDIyJzEyLjAiTiA5wrA0Myc0OC4wIkU!5e0!3m2!1sde!2sde!4v1",
    }}
  />
);

export default Hannover;
