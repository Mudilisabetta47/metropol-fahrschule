import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Desktop-only premium cursor follower.
 * Renders a small dot + soft ring that magnetizes to interactive elements.
 */
const CursorFollower = () => {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 250, damping: 25, mass: 0.4 });
  const ringY = useSpring(dotY, { stiffness: 250, damping: 25, mass: 0.4 });
  const rafRef = useRef<number>();

  useEffect(() => {
    const isFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFine || reduced) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        dotX.set(e.clientX);
        dotY.set(e.clientY);
      });
    };
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest("a, button, [role='button'], input, textarea, select, [data-cursor='hover']");
      setHovering(!!interactive);
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [dotX, dotY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        style={{ x: dotX, y: dotY }}
        className="pointer-events-none fixed left-0 top-0 z-[70] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary mix-blend-difference"
        aria-hidden
      />
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{ scale: hovering ? 1.8 : 1, opacity: hovering ? 0.9 : 0.5 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="pointer-events-none fixed left-0 top-0 z-[70] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/70 mix-blend-difference"
        aria-hidden
      />
    </>
  );
};

export default CursorFollower;
