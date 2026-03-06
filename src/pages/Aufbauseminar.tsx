import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail, MapPin, CheckCircle, Shield, MessageCircle, AlertTriangle, Users, Calendar, Scale } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import ContactForm from "@/components/ContactForm";
import heroImage from "@/assets/hero-aufbauseminar.jpg";

const Aufbauseminar = () => {
  const { t } = useTranslation();

  const aVerstoesse = [
    t("aufbauseminar.aV1"), t("aufbauseminar.aV2"), t("aufbauseminar.aV3"), t("aufbauseminar.aV4"), t("aufbauseminar.aV5"),
  ];

  const bVerstoesse = [
    t("aufbauseminar.bV1"), t("aufbauseminar.bV2"), t("aufbauseminar.bV3"),
  ];

  const durationItems = [
    t("aufbauseminar.dur1"), t("aufbauseminar.dur2"), t("aufbauseminar.dur3"), t("aufbauseminar.dur4"), t("aufbauseminar.dur5"),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: t("aufbauseminar.seoTitle"),
    description: t("aufbauseminar.seoDesc"),
    provider: { "@type": "LocalBusiness", "additionalType": "https://schema.org/DrivingSchool", name: "Fahrschule Metropol", url: "https://fahrschule-metropol.de" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: "https://fahrschule-metropol.de/" },
      { "@type": "ListItem", position: 2, name: "Aufbauseminar", item: "https://fahrschule-metropol.de/aufbauseminar" },
    ],
  };

  return (
    <div className="min-h-screen">
      <SEO title={t("aufbauseminar.seoTitle")} description={t("aufbauseminar.seoDesc")} canonical="https://fahrschule-metropol.de/aufbauseminar" jsonLd={[jsonLd, breadcrumbSchema]} />

      <section className="relative min-h-[420px] md:min-h-[480px] flex items-end overflow-hidden">
        <img src={heroImage} alt={t("aufbauseminar.heroTitle")} className="absolute inset-0 h-full w-full object-cover" loading="eager" />
        <div className="hero-overlay absolute inset-0" />
        <div className="container relative z-10 mx-auto px-4 pb-10 pt-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <p className="mb-1 text-sm font-semibold text-primary-foreground/60">{t("aufbauseminar.heroSubtitle")}</p>
            <h1 className="text-4xl font-extrabold text-primary-foreground font-display md:text-6xl whitespace-pre-line">{t("aufbauseminar.heroTitle")}</h1>
            <div className="mt-6">
              <Button variant="cta" size="lg" asChild>
                <Link to="/kontakt">{t("common.scheduleAppointment")} <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="mb-6 text-3xl font-extrabold text-foreground font-display md:text-4xl">{t("aufbauseminar.whenRequired")}</h2>
              <p className="text-muted-foreground leading-relaxed text-base">{t("aufbauseminar.whenDesc")}</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl border border-border bg-card p-8 shadow-card">
              <AlertTriangle className="mb-3 h-6 w-6 text-destructive" />
              <h3 className="text-lg font-bold text-foreground font-display mb-4">{t("aufbauseminar.aViolations")}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t("aufbauseminar.aViolationsDesc")}</p>
              <ul className="space-y-2">
                {aVerstoesse.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground"><CheckCircle className="mt-0.5 h-4 w-4 text-destructive shrink-0" />{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted-foreground font-medium">{t("aufbauseminar.aViolationsNote")}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="rounded-2xl border border-border bg-card p-8 shadow-card">
              <AlertTriangle className="mb-3 h-6 w-6 text-primary" />
              <h3 className="text-lg font-bold text-foreground font-display mb-4">{t("aufbauseminar.bViolations")}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t("aufbauseminar.bViolationsDesc")}</p>
              <ul className="space-y-2">
                {bVerstoesse.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground"><CheckCircle className="mt-0.5 h-4 w-4 text-primary shrink-0" />{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">{t("aufbauseminar.bViolationsNote")}</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 gradient-section">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-5"><Calendar className="h-6 w-6 text-primary" /><h2 className="text-xl font-bold text-foreground font-display">{t("aufbauseminar.durationTitle")}</h2></div>
              <ul className="space-y-3">
                {durationItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground"><CheckCircle className="mt-0.5 h-4 w-4 text-primary shrink-0" />{item}</li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div className="flex items-center gap-3 mb-5"><Scale className="h-6 w-6 text-primary" /><h2 className="text-xl font-bold text-foreground font-display">{t("aufbauseminar.mpuTitle")}</h2></div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{t("aufbauseminar.mpuDesc1")}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{t("aufbauseminar.mpuDesc2")}</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <Users className="mb-3 h-6 w-6 text-primary" />
              <h4 className="text-sm font-bold text-foreground mb-2">{t("aufbauseminar.smallGroups")}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{t("aufbauseminar.smallGroupsDesc")}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <Shield className="mb-3 h-6 w-6 text-primary" />
              <h4 className="text-sm font-bold text-foreground mb-2">{t("aufbauseminar.experiencedLeaders")}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{t("aufbauseminar.experiencedLeadersDesc")}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <MapPin className="mb-3 h-6 w-6 text-primary" />
              <h4 className="text-sm font-bold text-foreground mb-2">{t("ersteHilfe.locationsTitle")}</h4>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {[{ name: "Hannover", path: "/standorte/hannover" }, { name: "Bremen", path: "/standorte/bremen" }, { name: "Garbsen", path: "/standorte/garbsen" }].map((loc) => (
                  <li key={loc.name} className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-primary" /><Link to={loc.path} className="hover:text-primary transition-colors">{loc.name}</Link></li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 gradient-section">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-5">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-2">
              <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">{t("ersteHilfe.contactTitle")}</span>
              <h2 className="mb-4 text-2xl font-extrabold text-foreground font-display md:text-3xl">{t("aufbauseminar.contactTitle")}</h2>
              <p className="mb-8 text-muted-foreground leading-relaxed">{t("aufbauseminar.contactDesc")}</p>
              <div className="mb-8 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 shadow-card">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <div><p className="text-xs font-bold text-foreground">{t("ersteHilfe.quickReply")}</p><p className="text-[10px] text-muted-foreground">{t("ersteHilfe.within24h")}</p></div>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 shadow-card">
                  <Shield className="h-5 w-5 text-primary" />
                  <div><p className="text-xs font-bold text-foreground">{t("aufbauseminar.discreet")}</p><p className="text-[10px] text-muted-foreground">{t("ersteHilfe.freeConsultation")}</p></div>
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

export default Aufbauseminar;
