import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import SEO from "@/components/SEO";

type Light = "red" | "yellow" | "green";

const NotFound = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Light>("red");
  const [transitioning, setTransitioning] = useState(false);
  const [hovering, setHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useTransform(mouseX, (v) => `${v}px`);
  const glowY = useTransform(mouseY, (v) => `${v}px`);

  // Phase sequence: red → yellow blink → red (loop)
  useEffect(() => {
    const timer = setTimeout(() => setPhase("yellow"), 2000);
    const timer2 = setTimeout(() => setPhase("red"), 3200);
    const interval = setInterval(() => {
      setPhase("yellow");
      setTimeout(() => setPhase("red"), 1200);
    }, 5000);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      clearInterval(interval);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleGo = () => {
    setPhase("green");
    setTransitioning(true);
    setTimeout(() => navigate("/"), 1000);
  };

  const lightConfigs: Record<Light, { red: boolean; yellow: boolean; green: boolean }> = {
    red: { red: true, yellow: false, green: false },
    yellow: { red: false, yellow: true, green: false },
    green: { red: false, yellow: false, green: true },
  };

  const activeLights = lightConfigs[phase];

  return (
    <>
      <SEO
        title="404 – Seite nicht gefunden | Fahrschule Metropol"
        description="Diese Seite existiert leider nicht. Navigiere zurück zur Startseite der Fahrschule Metropol."
      />

      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(220 20% 4%) 0%, hsl(220 25% 8%) 50%, hsl(220 20% 5%) 100%)" }}
        initial={{ opacity: 1 }}
        animate={{ opacity: transitioning ? 0 : 1 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      >
        {/* Cursor-following ambient glow */}
        <motion.div
          className="pointer-events-none absolute h-[500px] w-[500px] rounded-full opacity-[0.07]"
          style={{
            left: glowX,
            top: glowY,
            x: "-50%",
            y: "-50%",
            background: "radial-gradient(circle, hsl(134 100% 40%) 0%, transparent 70%)",
          }}
        />

        {/* Subtle city silhouette */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 opacity-[0.04] sm:h-48">
          <svg viewBox="0 0 1200 200" className="h-full w-full" preserveAspectRatio="xMidYMax slice">
            <path
              d="M0,200 L0,160 L40,160 L40,140 L60,140 L60,120 L80,120 L80,100 L100,100 L100,80 L110,80 L110,60 L120,60 L120,80 L140,80 L140,100 L160,100 L160,130 L200,130 L200,110 L220,110 L220,90 L240,90 L240,70 L250,70 L250,50 L260,50 L260,70 L280,70 L280,100 L320,100 L320,80 L340,80 L340,60 L360,60 L360,80 L380,80 L380,120 L420,120 L420,90 L440,90 L440,110 L480,110 L480,70 L500,70 L500,50 L510,30 L520,50 L520,70 L540,70 L540,100 L580,100 L580,130 L620,130 L620,100 L640,100 L640,80 L660,80 L660,60 L680,60 L680,40 L690,40 L690,60 L700,60 L700,90 L740,90 L740,120 L780,120 L780,100 L800,100 L800,80 L820,80 L820,110 L860,110 L860,90 L880,90 L880,70 L900,70 L900,50 L910,50 L910,70 L920,70 L920,100 L960,100 L960,130 L1000,130 L1000,110 L1020,110 L1020,80 L1040,80 L1040,100 L1080,100 L1080,140 L1120,140 L1120,120 L1140,120 L1140,150 L1200,150 L1200,200 Z"
              fill="hsl(220 20% 20%)"
            />
          </svg>
        </div>

        {/* Fog / atmospheric glow behind traffic light */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "600px",
            height: "600px",
            background: phase === "red"
              ? "radial-gradient(circle, hsla(0,85%,50%,0.08) 0%, transparent 60%)"
              : phase === "yellow"
              ? "radial-gradient(circle, hsla(45,95%,55%,0.08) 0%, transparent 60%)"
              : "radial-gradient(circle, hsla(134,100%,40%,0.12) 0%, transparent 60%)",
            transition: "background 0.8s ease",
          }}
        />

        {/* Traffic Light */}
        <motion.div
          className="relative z-10 flex flex-col items-center"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {/* Mounting bracket */}
          <div className="h-3 w-20 rounded-t-lg sm:w-24" style={{ background: "hsl(220 15% 18%)" }} />

          {/* Housing */}
          <div
            className="relative flex flex-col items-center gap-4 rounded-2xl border px-5 py-6 sm:gap-5 sm:px-7 sm:py-8"
            style={{
              background: "linear-gradient(180deg, hsl(220 18% 13%) 0%, hsl(220 22% 7%) 100%)",
              borderColor: "hsla(220, 15%, 25%, 0.4)",
              boxShadow: hovering
                ? "0 0 60px hsla(220,15%,30%,0.15), inset 0 1px 0 hsla(0,0%,100%,0.04)"
                : "0 20px 60px hsla(0,0%,0%,0.5), inset 0 1px 0 hsla(0,0%,100%,0.04)",
              transition: "box-shadow 0.4s ease",
            }}
          >
            {/* Red */}
            <TrafficLightBulb color="red" active={activeLights.red} hovering={hovering} />
            {/* Yellow */}
            <TrafficLightBulb color="yellow" active={activeLights.yellow} hovering={hovering} />
            {/* Green */}
            <TrafficLightBulb color="green" active={activeLights.green} hovering={hovering} />
          </div>

          {/* Pole */}
          <div
            className="h-20 w-3 sm:h-28"
            style={{
              background: "linear-gradient(180deg, hsl(220 15% 18%) 0%, hsl(220 15% 12%) 100%)",
            }}
          />
          {/* Base */}
          <div
            className="h-2 w-12 rounded-b-md"
            style={{ background: "hsl(220 15% 15%)" }}
          />
        </motion.div>

        {/* Text */}
        <motion.div
          className="relative z-10 mt-10 text-center px-6 sm:mt-12"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            404 –{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, hsl(134 100% 45%) 0%, hsl(160 90% 40%) 100%)",
              }}
            >
              Stop. Diese Seite gibt es nicht.
            </span>
          </h1>

          <AnimatePresence mode="wait">
            <motion.p
              key={phase}
              className="mx-auto mt-4 max-w-lg text-sm sm:text-base"
              style={{ color: "hsla(220, 10%, 65%, 1)" }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              {phase === "red" && "Aber keine Sorge. Wir bringen dich zurück auf die richtige Spur."}
              {phase === "yellow" && "Moment… wir suchen die beste Route für dich."}
              {phase === "green" && "Freie Fahrt – du wirst jetzt weitergeleitet."}
            </motion.p>
          </AnimatePresence>

          <motion.button
            onClick={handleGo}
            disabled={transitioning}
            className="group relative mt-8 inline-flex items-center gap-2.5 overflow-hidden rounded-xl px-8 py-4 font-display text-sm font-semibold text-white transition-all duration-300 disabled:opacity-50 sm:text-base"
            style={{
              background: "linear-gradient(135deg, hsl(134 100% 40%) 0%, hsl(150 85% 35%) 100%)",
              boxShadow: "0 4px 24px hsla(134,100%,40%,0.3), 0 0 0 1px hsla(134,100%,40%,0.15)",
            }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 8px 40px hsla(134,100%,40%,0.45), 0 0 0 1px hsla(134,100%,40%,0.25)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Shine sweep on hover */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">Zur Startseite →</span>
          </motion.button>
        </motion.div>

        {/* Bottom subtle line */}
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, hsla(134,100%,40%,0.15), transparent)" }} />
      </motion.div>
    </>
  );
};

/* ─── Traffic Light Bulb ─── */
function TrafficLightBulb({ color, active, hovering }: { color: "red" | "yellow" | "green"; active: boolean; hovering: boolean }) {
  const hues: Record<string, string> = {
    red: "0, 85%, 50%",
    yellow: "45, 95%, 55%",
    green: "134, 100%, 42%",
  };

  const hsl = hues[color];

  return (
    <div className="relative">
      {/* Hood visor */}
      <div
        className="absolute -top-2.5 left-1/2 h-5 w-[72px] -translate-x-1/2 rounded-t-lg sm:w-[88px]"
        style={{ background: "linear-gradient(180deg, hsl(220 18% 16%) 0%, hsl(220 22% 10%) 100%)" }}
      />

      {/* Outer ring */}
      <div
        className="relative flex h-14 w-14 items-center justify-center rounded-full sm:h-[72px] sm:w-[72px]"
        style={{
          background: `radial-gradient(circle, hsla(220,15%,14%,1) 60%, hsla(220,15%,10%,1) 100%)`,
          boxShadow: "inset 0 2px 6px hsla(0,0%,0%,0.5)",
        }}
      >
        {/* Light */}
        <motion.div
          className="h-10 w-10 rounded-full sm:h-[52px] sm:w-[52px]"
          animate={{
            background: active ? `hsla(${hsl}, 1)` : `hsla(220, 12%, 14%, 0.9)`,
            boxShadow: active
              ? `0 0 ${hovering ? "50px" : "35px"} hsla(${hsl}, 0.6), 0 0 ${hovering ? "100px" : "70px"} hsla(${hsl}, 0.2), inset 0 -3px 8px hsla(0,0%,0%,0.2)`
              : "inset 0 2px 8px hsla(0,0%,0%,0.5)",
            scale: active ? (hovering ? 1.06 : 1) : 0.95,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Inner glass reflection */}
          {active && (
            <div
              className="absolute left-1.5 top-1.5 h-3 w-3 rounded-full sm:left-2 sm:top-2 sm:h-4 sm:w-4"
              style={{ background: "hsla(0,0%,100%,0.25)", filter: "blur(2px)" }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default NotFound;
