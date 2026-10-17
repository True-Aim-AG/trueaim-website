"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { section, type Tone } from "./surface";
import type { StripLogo } from "./LogoStrip";

const LOGO_CLASS =
  "w-auto max-w-[360px] opacity-80 grayscale transition-[filter,opacity] duration-300 ease-brand hover:opacity-100 hover:grayscale-0";

/**
 * Partner logos on a slow loop from right to left, one tone until hovered. The
 * row is repeated so the loop has no seam; the copy is hidden from assistive
 * technology, which reads the first row only. Still under reduced motion.
 */
export function LogoMarquee({ logos, duration = 38, tone = "white" }: { logos: StripLogo[]; duration?: number; tone?: Tone }) {
  const reduced = useReducedMotion();
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-20 pr-20">
      {logos.map((logo) => {
        const img = (
          <Image
            src={logo.src}
            alt={hidden ? "" : logo.alt}
            width={logo.width}
            height={logo.height}
            className={LOGO_CLASS}
            style={{ height: logo.renderHeight }}
          />
        );
        return (
          <li key={logo.src} className="flex items-center">
            {logo.href && !hidden ? (
              <Link href={logo.href} className="block">
                {img}
              </Link>
            ) : (
              img
            )}
          </li>
        );
      })}
    </ul>
  );
  return (
    <section className={section(tone, true)}>
      <div
        className="mx-auto max-w-7xl overflow-hidden"
        style={{
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
          maskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
        }}
      >
        {reduced ? (
          <div className="flex justify-center">{row(false)}</div>
        ) : (
          <motion.div
            className="flex w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration, ease: "linear", repeat: Infinity }}
          >
            {row(false)}
            {row(true)}
          </motion.div>
        )}
      </div>
    </section>
  );
}
