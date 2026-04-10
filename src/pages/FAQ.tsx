import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import InternalLinks from "@/components/InternalLinks";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";

const FAQ = () => {
  const { t } = useTranslation();

  const faqs = Array.from({ length: 8 }, (_, i) => ({
    q: t(`faq.q${i + 1}`),
    a: t(`faq.a${i + 1}`),
  }));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: "https://fahrschule-metropol.de/" },
      { "@type": "ListItem", position: 2, name: "FAQ", item: "https://fahrschule-metropol.de/faq" },
    ],
  };

  return (
    <div className="min-h-screen pt-20">
      <SEO
        title={t("faq.seoTitle")}
        description={t("faq.seoDesc")}
        canonical="https://fahrschule-metropol.de/faq"
        jsonLd={[faqSchema, breadcrumbSchema]}
        keywords="Fahrschule FAQ, Führerschein Fragen, Fahrschule Anmeldung, Führerschein Dauer, Führerschein Kosten, Theorie Prüfung Tipps, Praktische Prüfung, BF17 Voraussetzungen, Sehtest Führerschein, Erste Hilfe Kurs Führerschein, Fahrschule Metropol FAQ, Führerschein beantragen, Wie lange dauert der Führerschein, Theorieprüfung durchgefallen, Führerschein Unterlagen, Führerschein Anmeldung online, Fahrschule Arabisch, Fahrschule Türkisch"
      />

      <section className="gradient-dark py-20 noise relative overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">{t("faq.subtitle")}</span>
            <h1 className="text-4xl font-extrabold text-primary-foreground font-display md:text-6xl">{t("faq.title")}</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/50">{t("faq.heroText")}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto max-w-3xl px-4">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.4 }}>
                <AccordionItem value={`faq-${i}`} className="rounded-2xl border border-border bg-card px-6 shadow-card transition-shadow hover:shadow-card-hover overflow-hidden">
                  <AccordionTrigger className="py-5 text-left font-semibold text-foreground hover:no-underline font-display text-base">{faq.q}</AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 text-center">
            <p className="mb-5 text-muted-foreground">{t("faq.moreQuestions")}</p>
            <Button variant="cta" size="lg" asChild>
              <Link to="/kontakt">{t("faq.contactBtn")} <ChevronRight className="h-4 w-4" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <InternalLinks exclude={["services"]} title="Weitere Informationen" />
    </div>
  );
};

export default FAQ;
