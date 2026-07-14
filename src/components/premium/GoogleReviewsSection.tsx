import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";

interface Review {
  name: string;
  location: string;
  text: string;
  rating: number;
}

interface Props {
  reviews: Review[];
  average?: number;
  total?: number;
}

const GoogleReviewsSection = ({ reviews, average = 4.9, total = 347 }: Props) => {
  const counter = useCountUp(total, 2000);

  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 gradient-animated opacity-60 pointer-events-none" />
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-[380px_1fr] lg:gap-16 items-start">
          {/* Rating hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:sticky lg:top-28"
          >
            <div className="relative rounded-3xl border border-border bg-card p-8 shadow-card-hover overflow-hidden">
              <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative">
                <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"/>
                    <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.07H2.18a11 11 0 0 0 0 9.86l3.66-2.83Z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38Z"/>
                  </svg>
                  Google Rezensionen
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-6xl font-extrabold text-foreground font-display leading-none">{average.toFixed(1)}</span>
                  <span className="text-muted-foreground">/ 5.0</span>
                </div>
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <motion.span
                      key={j}
                      initial={{ scale: 0, rotate: -60 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + j * 0.08, type: "spring", stiffness: 260, damping: 14 }}
                    >
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.5)]" />
                    </motion.span>
                  ))}
                </div>
                <div ref={counter.ref} className="text-sm text-muted-foreground">
                  Basierend auf <strong className="text-foreground">{counter.count}+</strong> echten Bewertungen
                </div>
                <a
                  href="https://www.google.com/search?q=Fahrschule+Metropol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:gap-2.5 transition-all"
                >
                  Alle Bewertungen ansehen <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Reviews grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {reviews.map((r, i) => (
              <motion.div
                key={r.name + i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-shadow duration-500 hover:shadow-card-hover"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary text-primary-foreground text-sm font-bold shadow-glow">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">{r.name}</div>
                      <div className="text-xs text-muted-foreground">{r.location}</div>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">„{r.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviewsSection;
