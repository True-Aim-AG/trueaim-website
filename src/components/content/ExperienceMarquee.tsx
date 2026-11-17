"use client";

import Image from "next/image";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useState } from "react";

export type ExperienceLogo = { src: string; alt: string; width: number; height: number; renderHeight: number };

const MASK = "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)";

/**
 * Rows of small one-tone logos on a steady loop, each row in its own
 * direction. Every row is repeated so the loop has no seam; the copy is hidden
 * from assistive technology. A small toggle under the rows lets anyone pause
 * the loop (WCAG 2.2.2). Under reduced motion the logos sit still in one
 * wrapped block and there is nothing to pause.
 */
export function ExperienceMarquee({
  rows,
  labels,
  duration = 48,
}: {
  rows: { logos: ExperienceLogo[]; direction: "left" | "right" }[];
  labels: { pause: string; play: string };
  duration?: number;
}) {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);

  // One clock for every row, from 0 to 1 per loop; it stops while paused.
  const progress = useMotionValue(0);
  useAnimationFrame((_, delta) => {
    if (paused || reduced) return;
    progress.set((progress.get() + delta / (duration * 1000)) % 1);
  });
  const toLeft = useTransform(progress, (value) => `${-50 * value}%`);
  const toRight = useTransform(progress, (value) => `${-50 * (1 - value)}%`);

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

  const Icon = paused ? Play : Pause;
  return (
    <div>
      <div className="space-y-9" style={{ WebkitMaskImage: MASK, maskImage: MASK }}>
        {rows.map((row, index) => (
          <div key={index} className="overflow-hidden">
            <motion.div className="flex w-max" style={{ x: row.direction === "left" ? toLeft : toRight }}>
              {list(row.logos, false, "flex shrink-0 items-center gap-16 pr-16")}
              {list(row.logos, true, "flex shrink-0 items-center gap-16 pr-16")}
            </motion.div>
          </div>
        ))}
      </div>
      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-label={paused ? labels.play : labels.pause}
          className="flex h-6 w-6 items-center justify-center rounded-pill text-muted opacity-50 transition-opacity duration-150 ease-brand hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
        >
          <Icon aria-hidden="true" strokeWidth={1.5} className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
