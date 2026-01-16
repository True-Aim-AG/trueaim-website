import { Variants } from "framer-motion";

/**
 * Animation variants for different UI elements
 * Use these to maintain consistency while adding variety to animations
 */

// Fade up - the default animation (slight y movement)
export const fadeUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

// Fade in - no y movement, good for hero headlines
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

// Scale in - for CTAs and buttons
export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

// Scale in with slight bounce - for emphasized CTAs
export const scaleInBounce: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    }
  },
  exit: { opacity: 0, scale: 0.8 },
};

// Slide from left - for alternating card animations
export const slideFromLeft: Variants = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

// Slide from right - for alternating card animations
export const slideFromRight: Variants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30 },
};

// Stagger container - parent for staggered children
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Stagger container (fast) - quicker stagger timing
export const staggerContainerFast: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

// Stagger from center - items animate from center outward
export const staggerFromCenter = (index: number, totalItems: number): Variants => {
  const center = (totalItems - 1) / 2;
  const distanceFromCenter = Math.abs(index - center);
  const delay = distanceFromCenter * 0.1;

  return {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay,
        duration: 0.5,
        ease: "easeOut",
      }
    },
  };
};

// Grow width - for progress bars or underlines
export const growWidth: Variants = {
  initial: { scaleX: 0, originX: 0 },
  animate: { scaleX: 1 },
  exit: { scaleX: 0 },
};

// Float animation - subtle continuous movement
export const float: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Glow pulse - for highlighted elements
export const glowPulse: Variants = {
  initial: { boxShadow: "0 0 0 rgba(37, 99, 235, 0)" },
  animate: {
    boxShadow: [
      "0 0 20px rgba(37, 99, 235, 0.2)",
      "0 0 40px rgba(37, 99, 235, 0.4)",
      "0 0 20px rgba(37, 99, 235, 0.2)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Default transition settings
export const defaultTransition = {
  duration: 0.5,
  ease: "easeOut" as const,
};

// Spring transition for bouncy animations
export const springTransition = {
  type: "spring" as const,
  stiffness: 200,
  damping: 20,
};

// Viewport settings for scroll-triggered animations
export const defaultViewport = {
  once: true,
  margin: "-100px",
};

/**
 * Helper to get alternating slide direction
 * @param index - The index of the item
 * @returns slideFromLeft or slideFromRight based on index
 */
export function getAlternatingSlide(index: number): Variants {
  return index % 2 === 0 ? slideFromLeft : slideFromRight;
}

/**
 * Helper to check if reduced motion is preferred
 * Use this in components to disable animations when needed
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
