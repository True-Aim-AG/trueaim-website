"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * The site's scroll reveal, as the case-study and blog pages use it: a block
 * rises 20px and fades in once as it scrolls into view. Cards in a grid pass
 * a delay so they arrive one after another; a card renders as the list item
 * itself so it can take part in the grid.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const reduced = useReducedMotion();
  if (reduced) {
    return as === "li" ? <li className={className}>{children}</li> : <div className={className}>{children}</div>;
  }
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </Tag>
  );
}
