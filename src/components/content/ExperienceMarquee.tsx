"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export type ExperienceLogo = { src: string; alt: string; width: number; height: number; renderHeight: number };

const MASK = "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)";

/**
 * Rows of small one-tone logos on a steady loop, each row in its own
 * direction. Every row is repeated so the loop has no seam; the copy is hidden
 * from assistive technology. Under reduced motion the logos sit still in one
 * wrapped block.
 */
export function ExperienceMarquee({
  rows,
  duration = 48,
}: {
  rows: { logos: ExperienceLogo[]; direction: "left" | "right" }[];
  duration?: number;
}) {
  const reduced = useReducedMotion();
  const list = (logos: ExperienceLogo[], hidden: boolean, className: string) => (
    <ul aria-hidden={hidden || undefined} className={className}>
      {logos.map((logo) => (
        <li key={logo.src} className="flex shrink-0 items-center">
          <Image
            src={logo.src}
            alt={hidden ? "" : logo.alt}
            width={logo.width}
            height={logo.height}
            className="w-auto opacity-90"
            style={{ height: logo.renderHeight }}
          />
        </li>
      ))}
    </ul>
  );

  if (reduced) {
    return list(
      rows.flatMap((row) => row.logos),
      false,
      "flex flex-wrap items-center justify-center gap-x-14 gap-y-9",
    );
  }

  return (
    <div className="space-y-9" style={{ WebkitMaskImage: MASK, maskImage: MASK }}>
      {rows.map((row, index) => (
        <div key={index} className="overflow-hidden">
          <motion.div
            className="flex w-max"
            animate={{ x: row.direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
            transition={{ duration, ease: "linear", repeat: Infinity }}
          >
            {list(row.logos, false, "flex shrink-0 items-center gap-16 pr-16")}
            {list(row.logos, true, "flex shrink-0 items-center gap-16 pr-16")}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
