"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ButtonLink } from "@/components/brand/Button";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { GlassBox } from "@/components/brand/GlassBox";
import { Glow } from "@/components/brand/Glow";
import { GridPattern } from "@/components/brand/GridPattern";
import type { ReactNode } from "react";

const ease = [0.4, 0, 0.2, 1] as const;

interface ProductHeroCTA {
  label: string;
  href: string;
}

interface ProductHeroProps {
  badge: string;
  headline: string;
  description: string;
  supportingText?: string;
  primaryCTA: ProductHeroCTA;
  secondaryCTA?: ProductHeroCTA;
  /** Optional brand graphic for the right column. Defaults to a Glass Box with a glow behind it. */
  graphic?: ReactNode;
}

/**
 * Product page hero, following the brand page-hero pattern (design system brief §7):
 * eyebrow -> H1 -> lede -> pill buttons in a left-aligned copy column, with a structured
 * grid and an optional brand graphic on the right. Square corners, no card around the hero.
 */
export function ProductHero({
  badge,
  headline,
  description,
  supportingText,
  primaryCTA,
  secondaryCTA,
  graphic,
}: ProductHeroProps) {
  const reduce = useReducedMotion();
  const fade = (delay: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay, ease } };

  return (
    <section className="relative overflow-hidden pb-16 pt-20 md:pt-28">
      <GridPattern className="absolute right-0 top-0 hidden h-[600px] w-[746px] lg:block" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[minmax(0,640px)_1fr] lg:gap-8">
        {/* Copy column */}
        <div className="max-w-[640px]">
          <motion.div {...fade(0)}>
            <Eyebrow>{badge}</Eyebrow>
          </motion.div>

          <motion.h1
            {...fade(0.05)}
            className="mt-4 font-display text-[40px] font-bold leading-[1.05] text-strong sm:text-[48px] lg:text-[54px]"
          >
            {headline}
          </motion.h1>

          <motion.p {...fade(0.15)} className="mt-[26px] text-lede text-body">
            {description}
          </motion.p>

          {supportingText && (
            <motion.p {...fade(0.2)} className="mt-4 text-lede text-body">
              {supportingText}
            </motion.p>
          )}

          <motion.div {...fade(0.25)} className="mt-10 flex flex-col gap-3.5 sm:flex-row">
            <ButtonLink href={primaryCTA.href} variant="primary" size="lg">
              {primaryCTA.label}
            </ButtonLink>
            {secondaryCTA && (
              <ButtonLink href={secondaryCTA.href} variant="secondary" size="lg">
                {secondaryCTA.label}
              </ButtonLink>
            )}
          </motion.div>
        </div>

        {/* Brand graphic */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
          className="relative mx-auto hidden h-[320px] w-[320px] lg:block"
          aria-hidden
        >
          {graphic ?? (
            <>
              <Glow size={320} opacity={0.6} className="absolute left-0 top-0" />
              <GlassBox size={260} glow={false} className="absolute left-[30px] top-[30px]" />
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
