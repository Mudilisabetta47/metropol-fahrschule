import { Link } from "react-router-dom";
import InternalLinks from "@/components/InternalLinks";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, MapPin, Clock, Users, FileCheck, ArrowRight, Phone, Mail, CheckCircle, Calendar, Shield, MessageCircle, ChevronLeft } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import ContactForm from "@/components/ContactForm";
import type { LicenseClassData } from "@/data/licenseClassData";
import heroImage from "@/assets/hero-driving.jpg";

interface Props {
  data: LicenseClassData;
}

const locations = [
  { name: "Hannover", path: "/standorte/hannover" },
  { name: "Bremen", path: "/standorte/bremen" },
  { name: "Garbsen", path: "/standorte/garbsen" },
];

const LicenseClassPage = ({ data }: Props) => {
  const { t } = useTranslation();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${data.name} – ${data.subtitle}`,
    description: data.seoDescription,
    provider: { "@type": "LocalBusiness", "additionalType": "https://schema.org/DrivingSchool", name: "Fahrschule Metropol", url: "https://fahrschule-metropol.de" },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: "https://fahrschule-metropol.de/" },
      { "@type": "ListItem", position: 2, name: t("nav.licenseClasses"), item: "https://fahrschule-metropol.de/fuehrerscheinklassen" },
      { "@type": "ListItem", position: 3, name: `${data.name}`, item: `https://fahrschule-metropol.de/fuehrerschein/${data.slug}` },
    ],
  };

  return (
    <div className="min-h-screen">
      <SEO title={data.seoTitle} description={data.seoDescription} canonical={`https://fahrschule-metropol.de/fuehrerschein/${data.slug}`} jsonLd={[jsonLd, faqJsonLd, breadcrumbSchema]} />

      <section className="relative min-h-[420px] md:min-h-[480px] flex items-end overflow-hidden">
        <img src={heroImage} alt={`${data.name} – ${data.subtitle} bei Fahrschule Metropol`} className="absolute inset-0 h-full w-full object-cover" loading="eager" />
        <div className="hero-overlay absolute inset-0" />
        <div className="container relative z-10 mx-auto px-4 pb-10 pt-32">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
            <Link to="/fuehrerscheinklassen" className="inline-flex items-center gap-1 text-xs font-semibold text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              <ChevronLeft className="h-3 w-3" /> {t("common.backToOverview")}
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <p className="mb-1 text-sm font-semibold text-primary-foreground/60">{data.subtitle}</p>
            <h1 className="text-4xl font-extrabold text-primary-foreground font-display md:text-6xl">Führerschein {data.name.replace("Klasse ", "")}</h1>
          </motion.div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-muted-foreground leading-relaxed text-base mb-6">{data.heroDescription}</motion.p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" /> {data.details.duration}</span>
                <span className="flex items-center gap-1.5"><FileCheck className="h-4 w-4 text-primary" /> {t("licenseClass.onRequest")}</span>
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary" /> Hannover · Bremen · Garbsen</span>
              </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl border border-border bg-card p-6 shadow-card lg:-mt-28 relative z-20">
              <h3 className="mb-4 text-lg font-bold text-foreground font-display">{t("licenseClass.signUpNow")}</h3>
              <div className="space-y-3">
                <Button variant="cta" size="lg" className="w-full" asChild>
                  <Link to="/kontakt">{t("common.nonBindingInquiry")} <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button variant="outline" size="lg" className="w-full" asChild>
                  <a href="tel:+495116425066"><Phone className="mr-2 h-4 w-4 text-primary" /> 0511 6425066</a>
                </Button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground text-center leading-relaxed">{t("licenseClass.freeNote")}</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="pb-10">
        <div className="container mx-auto px-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <Calendar className="mb-3 h-6 w-6 text-primary" />
              <h4 className="text-sm font-bold text-foreground mb-2">{t("licenseClass.trainingDetails")}</h4>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />{t("licenseClass.duration")}: {data.details.duration}</li>
                <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />{data.details.includes}</li>
                <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />{data.details.exam}</li>
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <Shield className="mb-3 h-6 w-6 text-primary" />
              <h4 className="text-sm font-bold text-foreground mb-2">{t("licenseClass.priceFunding")}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{t("licenseClass.priceFundingDesc")}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <MapPin className="mb-3 h-6 w-6 text-primary" />
              <h4 className="text-sm font-bold text-foreground mb-2">{t("ersteHilfe.locationsTitle")}</h4>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {locations.map((loc) => (
                  <li key={loc.name} className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-primary" /><Link to={loc.path} className="hover:text-primary transition-colors">{loc.name}</Link></li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 gradient-section">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-5"><FileCheck className="h-6 w-6 text-primary" /><h2 className="text-xl font-bold text-foreground font-display">{t("licenseClass.prerequisites")}</h2></div>
              <ul className="space-y-3">
                {data.prerequisites.map((p, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground"><CheckCircle className="mt-0.5 h-4 w-4 text-primary shrink-0" />{p}</li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div className="flex items-center gap-3 mb-5"><Shield className="h-6 w-6 text-primary" /><h2 className="text-xl font-bold text-foreground font-display">{t("licenseClass.advantages")}</h2></div>
              <ul className="space-y-3">
                {data.advantages.map((a, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground"><CheckCircle className="mt-0.5 h-4 w-4 text-primary shrink-0" />{a}</li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
            <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">{t("licenseClass.processLabel")}</span>
            <h2 className="text-3xl font-extrabold text-foreground font-display md:text-4xl">{t("licenseClass.processTitle")}</h2>
          </motion.div>
          <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
            {data.process.map((step, i) => (
              <motion.div key={step.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
                <span className="mb-2 inline-block text-3xl font-extrabold gradient-text font-display">{step.step}</span>
                <h3 className="mb-2 text-lg font-bold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 gradient-section">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
            <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">FAQ</span>
            <h2 className="text-3xl font-extrabold text-foreground font-display md:text-4xl">{t("licenseClass.faqTitle", { name: data.name })}</h2>
          </motion.div>
          <div className="mx-auto max-w-2xl">
            <Accordion type="single" collapsible className="space-y-3">
              {data.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="rounded-2xl border border-border bg-card px-6 shadow-card">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-5">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-2">
              <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">{t("ersteHilfe.contactTitle")}</span>
              <h2 className="mb-4 text-2xl font-extrabold text-foreground font-display md:text-3xl">{t("licenseClass.interestIn", { name: data.name })}</h2>
              <p className="mb-8 text-muted-foreground leading-relaxed">{t("licenseClass.fillFormDesc")}</p>

              <div className="mb-8 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 shadow-card">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <div><p className="text-xs font-bold text-foreground">{t("ersteHilfe.quickReply")}</p><p className="text-[10px] text-muted-foreground">{t("ersteHilfe.within24h")}</p></div>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 shadow-card">
                  <Shield className="h-5 w-5 text-primary" />
                  <div><p className="text-xs font-bold text-foreground">{t("ersteHilfe.nonBinding")}</p><p className="text-[10px] text-muted-foreground">{t("ersteHilfe.freeConsultation")}</p></div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary text-primary-foreground"><Phone className="h-4 w-4" /></div>
                  <div><p className="text-xs text-muted-foreground">{t("ersteHilfe.phoneReachable")}</p><a href="tel:+495116425066" className="text-sm font-bold text-foreground hover:text-primary transition-colors">0511 6425066</a></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground"><Mail className="h-4 w-4" /></div>
                  <div><p className="text-xs text-muted-foreground">{t("ersteHilfe.emailContact")}</p><a href="mailto:info@fahrschule-metropol.de" className="text-sm font-bold text-foreground hover:text-primary transition-colors">info@fahrschule-metropol.de</a></div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="lg:col-span-3">
              <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
                <h3 className="mb-2 text-lg font-bold text-foreground font-display">{t("common.nonBindingInquiry")}</h3>
                <p className="mb-6 text-sm text-muted-foreground">{t("ersteHilfe.formDesc")}</p>
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LicenseClassPage;
