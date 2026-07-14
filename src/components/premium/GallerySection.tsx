import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";

interface Props {
  images: { src: string; alt: string }[];
}

/**
 * Instagram-style masonry gallery with premium lightbox.
 * Keyboard: Esc closes, ←/→ navigates.
 */
const GallerySection = ({ images }: Props) => {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((a) => (a === null ? a : (a + 1) % images.length));
      if (e.key === "ArrowLeft") setActive((a) => (a === null ? a : (a - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, images.length]);

  // Broken-grid tile heights for visual rhythm
  const spans = ["md:row-span-2", "", "", "md:row-span-2", "", "", "", "md:row-span-2"];

  return (
    <section className="relative py-28 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 flex flex-wrap items-end justify-between gap-6"
        >
          <div className="max-w-xl">
            <span className="mb-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.24em] text-primary">
              <Camera className="h-3.5 w-3.5" /> Impressionen
            </span>
            <h2 className="text-3xl font-extrabold text-foreground font-display md:text-5xl">
              Momente aus <span className="gradient-text">unserem Alltag</span>
            </h2>
          </div>
          <a
            href="https://www.instagram.com/fahrschulemetropol/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold text-primary hover:opacity-80 transition-opacity"
          >
            @fahrschulemetropol →
          </a>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] gap-3 md:gap-4">
          {images.map((img, i) => (
            <motion.button
              key={img.src + i}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative overflow-hidden rounded-2xl bg-secondary ${spans[i % spans.length]}`}
              aria-label={`Bild öffnen: ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-x-0 bottom-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-xs font-semibold text-white drop-shadow">{img.alt}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
            onClick={() => setActive(null)}
          >
            <motion.img
              key={active}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              src={images[active].src}
              alt={images[active].alt}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl"
            />

            <button
              onClick={(e) => { e.stopPropagation(); setActive(null); }}
              className="absolute top-6 right-6 flex h-11 w-11 items-center justify-center rounded-full glass-dark text-white hover:scale-110 transition-transform"
              aria-label="Schließen"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setActive((a) => (a === null ? a : (a - 1 + images.length) % images.length)); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full glass-dark text-white hover:scale-110 transition-transform"
              aria-label="Vorheriges Bild"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setActive((a) => (a === null ? a : (a + 1) % images.length)); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full glass-dark text-white hover:scale-110 transition-transform"
              aria-label="Nächstes Bild"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full glass-dark px-4 py-1.5 text-xs text-white/80">
              {active + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
