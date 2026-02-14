import { useState } from "react";
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

const Prices = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Preise – Fahrschule Metropol | Alle Führerscheinklassen"
        description="Aktuelle Preise für alle Führerscheinklassen an unseren Standorten Hannover, Garbsen & Bremen. Transparente Kosten, keine versteckten Gebühren."
        canonical="https://fahrschule-metropol.de/preise"
      />

      {/* Hero */}
      <section className="relative min-h-[320px] md:min-h-[380px] flex items-end overflow-hidden">
        <img
          src={heroImage}
          alt="Fahrschule Metropol Preise"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="container relative z-10 mx-auto px-4 pb-10 pt-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/60">Preise</span>
            <h1 className="text-4xl font-extrabold text-primary-foreground font-display md:text-6xl">Unsere Preise</h1>
            <p className="mt-3 max-w-xl text-primary-foreground/60">
              Transparente Preise ohne versteckte Kosten. Ratenzahlung möglich.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Price Tables */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary">Standort wählen</span>
            <h2 className="text-3xl font-extrabold text-foreground font-display md:text-4xl">
              Unsere aktuellen Preise (2025)
            </h2>
          </motion.div>

          <Tabs defaultValue="hannover" className="w-full">
            <TabsList className="mx-auto mb-8 flex w-fit gap-1">
              {priceData.map((loc) => (
                <TabsTrigger key={loc.slug} value={loc.slug} className="gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {loc.location}
                </TabsTrigger>
              ))}
            </TabsList>

            {priceData.map((loc) => (
              <TabsContent key={loc.slug} value={loc.slug}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Accordion type="single" collapsible className="space-y-3" defaultValue="B">
                    {loc.classes.map((cls) => (
                      <AccordionItem
                        key={cls.klasse}
                        value={cls.klasse}
                        className="rounded-2xl border border-border bg-card px-0 shadow-card overflow-hidden"
                      >
                        <AccordionTrigger className="px-6 text-left font-bold text-foreground hover:no-underline font-display text-base">
                          <span className="flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-xs font-extrabold text-primary">
                              {cls.klasse}
                            </span>
                            Klasse {cls.klasse}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="px-0 pb-0">
                          <Table>
                            <TableHeader>
                              <TableRow className="border-border">
                                <TableHead className="pl-6 text-muted-foreground">Leistung</TableHead>
                                <TableHead className="pr-6 text-right text-muted-foreground">Preis</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {cls.items.map((item, idx) => (
                                <TableRow key={idx} className="border-border">
                                  <TableCell className="pl-6 text-sm text-foreground">{item.leistung}</TableCell>
                                  <TableCell className="pr-6 text-right text-sm font-semibold text-foreground">{item.preis}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Footer note */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 rounded-2xl border border-border bg-card p-6 text-center shadow-card"
          >
            <p className="text-sm text-muted-foreground">
              Alle Preise sind Richtwerte. Die genauen Kosten hängen vom individuellen Ausbildungsverlauf ab.{" "}
              <Link to="/kontakt" className="text-primary font-medium hover:underline">Kontaktiere uns</Link> für ein persönliches Angebot.
              Wir bieten auch Ratenzahlung an – sprich uns einfach an!
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
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
