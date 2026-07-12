import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  children?: ReactNode;
}

/**
 * Splits text into words and reveals each with a soft blur+rise stagger.
 * Cheap enough to feel silky at 60fps.
 */
const SplitText = ({ text, className = "", delay = 0, stagger = 0.055, as = "span" }: SplitTextProps) => {
  const words = text.split(" ");
  const MotionTag = motion[as] as typeof motion.span;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-baseline">
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden: { y: "110%", opacity: 0, filter: "blur(8px)" },
              show: { y: "0%", opacity: 1, filter: "blur(0px)", transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            {w}
            {i < words.length - 1 && "\u00A0"}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
};

export default SplitText;
