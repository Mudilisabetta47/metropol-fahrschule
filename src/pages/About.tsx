import { motion } from "framer-motion";
import { Award, Heart, Target, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Startseite", item: "https://fahrschule-metropol.de/" },
    { "@type": "ListItem", position: 2, name: "Über uns", item: "https://fahrschule-metropol.de/ueber-uns" },
  ],
};

const About = () => {
  const { t } = useTranslation();

  const values = [
    { icon: Heart, title: t("about.passion"), desc: t("about.passionDesc") },
    { icon: Target, title: t("about.quality"), desc: t("about.qualityDesc") },
    { icon: Users, title: t("about.team"), desc: t("about.teamDesc") },
    { icon: Award, title: t("about.experience"), desc: t("about.experienceDesc") },
  ];

  return (
    <div className="min-h-screen pt-20">
      <SEO title={t("about.seoTitle")} description={t("about.seoDesc")} canonical="https://fahrschule-metropol.de/ueber-uns" jsonLd={[breadcrumbSchema]} keywords="Fahrschule Metropol, Über uns, Fahrschule Hannover Team, Fahrschule Bremen Team, Fahrlehrer, Erfahrung Fahrschule, Bestehensquote Fahrschule, Fahrschule mit Erfahrung, Fahrschule Bewertung, Fahrschule Qualität" />

      <section className="gradient-dark py-20 noise relative overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">{t("about.subtitle")}</span>
            <h1 className="text-4xl font-extrabold text-primary-foreground font-display md:text-6xl">{t("about.title")}</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/50">{t("about.heroText")}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-6 text-muted-foreground leading-relaxed">
            <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <strong className="text-foreground font-display">Fahrschule Metropol</strong> {t("about.text1")}{" "}
              <Link to="/standorte/bremen" className="text-primary font-medium hover:underline">Bremen</Link>,{" "}
              <Link to="/standorte/garbsen" className="text-primary font-medium hover:underline">Garbsen</Link> und{" "}
              <Link to="/standorte/hannover" className="text-primary font-medium hover:underline">Hannover</Link> {t("about.text1End")}
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              {t("about.text2")}
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              {t("about.text3start")} <Link to="/fuehrerscheinklassen" className="text-primary font-medium hover:underline">{t("about.text3link")}</Link>{" "}
              {t("about.text3middle")} <Link to="/preise" className="text-primary font-medium hover:underline">{t("about.text3prices")}</Link>{" "}
              {t("about.text3end")} <Link to="/kontakt" className="text-primary font-medium hover:underline">{t("about.text3contact")}</Link>.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="gradient-section py-24">
        <div className="container mx-auto px-4">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center text-3xl font-extrabold text-foreground font-display md:text-4xl">
            {t("about.valuesTitle")}
          </motion.h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="group rounded-3xl border border-border bg-card p-8 text-center shadow-card transition-all duration-500 hover:shadow-card-hover hover:-translate-y-1">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground transition-all duration-500 group-hover:gradient-primary group-hover:text-primary-foreground group-hover:shadow-glow group-hover:scale-110">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground font-display">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 text-center">
            <Button variant="cta" size="lg" asChild>
              <Link to="/kontakt">{t("about.ctaBtn")} <ChevronRight className="h-4 w-4" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
