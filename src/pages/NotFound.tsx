import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "@/components/SEO";

type Light = "red" | "yellow" | "green";

const NotFound = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState<Light>("red");
  const [transitioning, setTransitioning] = useState(false);

  // Auto cycle: red → yellow → red
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev === "red" ? "yellow" : "red"));
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const handleGo = () => {
    setActive("green");
    setTransitioning(true);
    setTimeout(() => navigate("/"), 900);
  };

  const messages: Record<Light, { title: string; sub: string }> = {
    red: { title: "Stop! Diese Seite existiert nicht.", sub: "Du hast eine rote Ampel erwischt." },
    yellow: { title: "Moment…", sub: "Wir suchen die richtige Richtung." },
    green: { title: "Freie Fahrt!", sub: "Du wirst weitergeleitet…" },
  };

  const glowColors: Record<Light, string> = {
    red: "0 0 40px hsla(0,85%,55%,0.6), 0 0 80px hsla(0,85%,55%,0.25)",
    yellow: "0 0 40px hsla(45,95%,55%,0.6), 0 0 80px hsla(45,95%,55%,0.25)",
    green: "0 0 40px hsla(134,100%,40%,0.6), 0 0 80px hsla(134,100%,40%,0.25)",
  };

  const lightStyle = (color: Light) => {
    const isActive = active === color;
    const base: Record<Light, string> = {
      red: "hsla(0,85%,55%,1)",
      yellow: "hsla(45,95%,55%,1)",
      green: "hsla(134,100%,45%,1)",
    };
    return {
      background: isActive ? base[color] : "hsla(220,15%,18%,0.8)",
      boxShadow: isActive ? glowColors[color] : "inset 0 2px 8px hsla(0,0%,0%,0.4)",
      transition: "all 0.5s ease",
    };
  };

  return (
    <>
      <SEO
        title="404 – Seite nicht gefunden | Fahrschule Metropol"
        description="Diese Seite existiert leider nicht. Navigiere zurück zur Startseite der Fahrschule Metropol."
      />
      <motion.div
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4"
        initial={{ opacity: 1 }}
        animate={{ opacity: transitioning ? 0 : 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Subtle road markings background */}
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center opacity-[0.06]">
          <div className="mb-0 flex flex-col items-center gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-10 w-2 rounded bg-foreground" />
            ))}
          </div>
        </div>

        {/* Traffic light */}
        <motion.div
          className="relative z-10 flex flex-col items-center"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Pole top */}
          <div className="h-4 w-24 rounded-t-xl bg-foreground/10" />

          {/* Housing */}
          <div
            className="relative flex flex-col items-center gap-5 rounded-2xl border border-border/50 px-6 py-7 sm:px-8 sm:py-9"
            style={{
              background: "linear-gradient(180deg, hsl(220 20% 14%) 0%, hsl(220 25% 8%) 100%)",
            }}
          >
            {/* Visor hoods */}
            {(["red", "yellow", "green"] as Light[]).map((color) => (
              <div key={color} className="relative">
                {/* Hood */}
                <div
                  className="absolute -top-2 left-1/2 h-5 w-20 -translate-x-1/2 rounded-t-lg sm:w-24"
                  style={{
                    background: "linear-gradient(180deg, hsl(220 20% 16%) 0%, transparent 100%)",
                  }}
                />
                {/* Light */}
                <motion.div
                  className="relative h-16 w-16 rounded-full sm:h-20 sm:w-20"
                  style={lightStyle(color)}
                  animate={
                    active === color
                      ? { scale: [1, 1.05, 1] }
                      : { scale: 1 }
                  }
                  transition={{ duration: 1.5, repeat: active === color ? Infinity : 0, ease: "easeInOut" }}
                >
                  {/* Inner reflection */}
                  <div className="absolute left-2 top-2 h-4 w-4 rounded-full bg-white/20 blur-[2px] sm:h-5 sm:w-5" />
                </motion.div>
              </div>
            ))}
          </div>

          {/* Pole */}
          <div className="h-16 w-3 bg-foreground/10 sm:h-20" />
        </motion.div>

        {/* Text content */}
        <motion.div
          className="relative z-10 mt-8 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            404 – <span className="gradient-text">Falsche Richtung</span>
          </h1>

          <AnimatePresence mode="wait">
            <motion.p
              key={active}
              className="mx-auto mt-4 max-w-md text-base text-muted-foreground sm:text-lg"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
            >
              {messages[active].title}
              <br />
              <span className="text-sm sm:text-base">{messages[active].sub}</span>
            </motion.p>
          </AnimatePresence>

          <motion.button
            onClick={handleGo}
            disabled={transitioning}
            className="gradient-primary mt-8 inline-flex items-center gap-2 rounded-2xl px-8 py-4 font-display text-base font-semibold text-primary-foreground shadow-cta transition-all hover:shadow-glow disabled:opacity-60 sm:text-lg"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            🟢 Zur Startseite
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
};

export default NotFound;
