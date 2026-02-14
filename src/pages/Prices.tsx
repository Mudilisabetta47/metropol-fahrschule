import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEO from "@/components/SEO";
import { priceData } from "@/data/priceData";
import heroImage from "@/assets/hero-driving.jpg";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const itemAnim = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 400, damping: 28 } },
};

const rowAnim = {
  hidden: { opacity: 0, x: -8 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.03, duration: 0.25, ease: "easeOut" as const },
  }),
};

const Prices = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Preise – Fahrschule Metropol | Alle Führerscheinklassen"
        description="Aktuelle Preise für alle Führerscheinklassen an unseren Standorten Hannover, Garbsen & Bremen. Transparente Kosten, keine versteckten Gebühren."
        canonical="https://fahrschule-metropol.de/preise"
      />

      {/* Hero – kompakter */}
      <section className="relative min-h-[280px] md:min-h-[340px] flex items-end overflow-hidden">
        <img
          src={heroImage}
          alt="Fahrschule Metropol Preise"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="container relative z-10 mx-auto px-4 pb-8 pt-28">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="mb-1 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/50">Preise</span>
            <h1 className="text-3xl font-extrabold text-primary-foreground font-display md:text-5xl">Unsere Preise</h1>
            <p className="mt-2 max-w-xl text-sm text-primary-foreground/50">
              Transparente Preise ohne versteckte Kosten. Ratenzahlung möglich.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Price Tables */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6 text-center"
          >
            <span className="mb-1 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">Standort wählen</span>
            <h2 className="text-2xl font-extrabold text-foreground font-display md:text-3xl">
              Aktuelle Preise (2025)
            </h2>
          </motion.div>

          <Tabs defaultValue="hannover" className="w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <TabsList className="mx-auto mb-6 flex w-fit gap-1">
                {priceData.map((loc) => (
                  <TabsTrigger key={loc.slug} value={loc.slug} className="gap-1.5 transition-all duration-200">
                    <MapPin className="h-3.5 w-3.5" />
                    {loc.location}
                  </TabsTrigger>
                ))}
              </TabsList>
            </motion.div>

            {priceData.map((loc) => (
              <TabsContent key={loc.slug} value={loc.slug}>
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  animate="show"
                  className="space-y-2"
                >
                  <Accordion type="single" collapsible className="space-y-2" defaultValue="B">
                    {loc.classes.map((cls) => (
                      <motion.div key={cls.klasse} variants={itemAnim}>
                        <AccordionItem
                          value={cls.klasse}
                          className="rounded-xl border border-border bg-card px-0 shadow-card overflow-hidden transition-shadow duration-300 hover:shadow-card-hover"
                        >
                          <AccordionTrigger className="px-5 py-3 text-left font-bold text-foreground hover:no-underline font-display text-sm">
                            <span className="flex items-center gap-2.5">
                              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-[11px] font-extrabold text-primary">
                                {cls.klasse}
                              </span>
                              Klasse {cls.klasse}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="px-0 pb-0">
                            <Table>
                              <TableHeader>
                                <TableRow className="border-border">
                                  <TableHead className="pl-5 py-2 text-xs text-muted-foreground">Leistung</TableHead>
                                  <TableHead className="pr-5 py-2 text-right text-xs text-muted-foreground">Preis</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {cls.items.map((item, idx) => (
                                  <motion.tr
                                    key={idx}
                                    custom={idx}
                                    initial="hidden"
                                    animate="show"
                                    variants={rowAnim}
                                    className="border-b border-border last:border-0 transition-colors duration-150 hover:bg-accent/30"
                                  >
                                    <TableCell className="pl-5 py-2.5 text-sm text-foreground">{item.leistung}</TableCell>
                                    <TableCell className="pr-5 py-2.5 text-right text-sm font-semibold text-foreground tabular-nums">{item.preis}</TableCell>
                                  </motion.tr>
                                ))}
                              </TableBody>
                            </Table>
                          </AccordionContent>
                        </AccordionItem>
                      </motion.div>
                    ))}
                  </Accordion>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Footer note */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-8 rounded-xl border border-border bg-card p-5 text-center shadow-card"
          >
            <p className="text-xs text-muted-foreground">
              Alle Preise sind Richtwerte. Die genauen Kosten hängen vom individuellen Ausbildungsverlauf ab.{" "}
              <Link to="/kontakt" className="text-primary font-medium hover:underline">Kontaktiere uns</Link> für ein persönliches Angebot.
              Ratenzahlung möglich – sprich uns einfach an!
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.15 }}
            className="mt-6 text-center"
          >
            <Button variant="cta" size="lg" asChild>
              <Link to="/kontakt">
                Jetzt unverbindlich anfragen <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Prices;
