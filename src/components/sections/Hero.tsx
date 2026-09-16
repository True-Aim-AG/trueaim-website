"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ButtonLink } from "@/components/brand/Button";
import { GridPattern } from "@/components/brand/GridPattern";

const ease = [0.4, 0, 0.2, 1] as const;

/**
 * Home hero, transcribed from the design system's marketing "Example" frame:
 * page tint, structured grid top-right, ~540px copy column, and the dimensional Glass Box render
 * from the brand guidelines (custom graphics, dimensional) on the right.
 */
export function Hero() {
  const t = useTranslations("hero");
  const reduce = useReducedMotion();
  const fade = (delay: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay, ease } };

  return (
    <section className="relative overflow-hidden">
      <GridPattern className="absolute right-0 top-0 hidden h-[760px] w-[746px] lg:block" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-16 pt-20 md:pt-28 lg:min-h-[640px] lg:grid-cols-[minmax(0,560px)_1fr] lg:gap-8 lg:pb-24 lg:pt-[120px]">
        {/* Copy column */}
        <div className="max-w-[560px]">
          <motion.h1 {...fade(0.05)} className="font-display text-[40px] font-bold leading-[1.05] text-strong sm:text-[48px] lg:text-[54px] lg:leading-none">
            {t("title")}
            <br />
            {t("titleHighlight")}
          </motion.h1>

          <motion.p {...fade(0.15)} className="mt-[26px] max-w-[480px] text-lede text-body">
            {t("subtitle1")}
            <br />
            {t("subtitle2")} {t("subtitle3")}
          </motion.p>

          <motion.div {...fade(0.25)} className="mt-10 flex flex-col gap-3.5 sm:flex-row">
            <ButtonLink href="/contact" variant="primary" size="lg">
              {t("ctaDemo")}
            </ButtonLink>
            <ButtonLink href="/impact-estimator" variant="secondary" size="lg">
              {t("ctaImpact")}
            </ButtonLink>
          </motion.div>
        </div>

        {/* Brand graphic: the Glass Box render (glow baked in, transparent background) */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
          className="relative mx-auto hidden h-[520px] w-[470px] lg:block"
          aria-hidden
        >
          <Image
            src="/brand/3d/glass-box.webp"
            alt=""
            width={940}
            height={900}
            priority
            className="absolute left-0 top-[35px] h-auto w-[470px]"
          />
        </motion.div>

        {/* Compact graphic for small screens */}
        <div className="relative mx-auto h-[260px] w-[260px] lg:hidden" aria-hidden>
          <Image
            src="/brand/3d/glass-box.webp"
            alt=""
            width={940}
            height={900}
            priority
            className="absolute left-0 top-[5px] h-auto w-[260px]"
          />
        </div>
      </div>
    </section>
  );
}
