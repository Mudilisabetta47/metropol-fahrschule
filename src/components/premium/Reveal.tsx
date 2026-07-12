import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "scale" | "blur";

interface RevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  amount?: number;
}

const variantsFor = (dir: Direction): Variants => {
  const base = { opacity: 0 };
  const map: Record<Direction, Variants> = {
    up: { hidden: { ...base, y: 40 }, show: { opacity: 1, y: 0 } },
    down: { hidden: { ...base, y: -40 }, show: { opacity: 1, y: 0 } },
    left: { hidden: { ...base, x: -40 }, show: { opacity: 1, x: 0 } },
    right: { hidden: { ...base, x: 40 }, show: { opacity: 1, x: 0 } },
    scale: { hidden: { ...base, scale: 0.94 }, show: { opacity: 1, scale: 1 } },
    blur: { hidden: { ...base, filter: "blur(12px)" }, show: { opacity: 1, filter: "blur(0px)" } },
  };
  return map[dir];
};

const Reveal = ({ children, direction = "up", delay = 0, className, amount = 0.2 }: RevealProps) => (
  <motion.div
    variants={variantsFor(direction)}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount }}
    transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default Reveal;
