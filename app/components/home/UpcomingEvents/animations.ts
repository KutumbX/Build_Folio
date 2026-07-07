import type { Variants } from "framer-motion";

// Framer Motion: Container for stagger entry of elements
export const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Framer Motion: Single Card Entry animation
export const cardRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94], // Cubic bezier ease-out
    },
  },
};

// Framer Motion: Dynamic Heading reveal
export const headingLetterVariants: Variants = {
  hidden: {
    y: "100%",
    opacity: 0,
  },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// Framer Motion: Parallax hover depth variables
export const CARD_TILT_MAX = 12; // Maximum tilt rotation in degrees
export const GLOW_GRADIENT_RADIUS = 350; // Size of radial glow mask
