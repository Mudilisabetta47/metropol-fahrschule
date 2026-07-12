import { motion } from "framer-motion";

/**
 * Slow-drifting decorative orbs for hero backgrounds.
 * Purely presentational — pointer-events disabled.
 */
const FloatingOrbs = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
    <motion.div
      className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary/25 blur-[100px]"
      animate={{ x: [0, 60, -20, 0], y: [0, 40, -30, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute right-[-6rem] top-1/3 h-96 w-96 rounded-full bg-emerald-400/20 blur-[120px]"
      animate={{ x: [0, -80, 30, 0], y: [0, -50, 20, 0] }}
      transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-primary/15 blur-[90px]"
      animate={{ x: [0, 40, -60, 0], y: [0, -40, 30, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
    />
    {/* Animated conic gradient sheen */}
    <motion.div
      className="absolute inset-0 opacity-30"
      style={{
        background:
          "conic-gradient(from 0deg at 50% 50%, transparent 0deg, hsl(var(--primary) / 0.15) 90deg, transparent 180deg, hsl(160 90% 40% / 0.15) 270deg, transparent 360deg)",
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

export default FloatingOrbs;
