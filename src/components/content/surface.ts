/**
 * Shared surface classes from the V5 prototype (Reuben's reviews of 8, 12 and
 * 15 October): rounded cards with a 1px ring inside the shadow, sections with
 * generous padding and a hairline between two plain sections.
 */

/** A card: 12px radius, 1px ring in the shadow, the brand card shadow. */
export const CARD = "rounded-[12px] bg-card shadow-[0_0_0_1px_rgba(44,43,42,.06),var(--shadow-card)]";

/** A clickable card lifts and its ring turns blue. */
export const CARD_HOVER =
  "transition-[box-shadow,transform] duration-300 ease-brand hover:-translate-y-[3px] hover:shadow-[0_0_0_1px_rgba(81,81,219,.28),0_14px_28px_-12px_rgba(44,43,42,.18)] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--focus-ring)]";

/** A plain section: a hairline on top when it follows another plain section. */
export const SECTION = "sec px-6 py-20 md:py-[120px] [.sec+&]:border-t [.sec+&]:border-hairline";

/** A short section (key facts, logos, callouts). */
export const SECTION_TIGHT = "sec px-6 py-14 md:py-20 [.sec+&]:border-t [.sec+&]:border-hairline";

/** A lilac section carries no hairline of its own. */
export const SECTION_LILAC = "sec px-6 py-20 md:py-[120px] bg-lilac";

/** Product-scene chrome: the rounded card the prototype draws its screens in. */
export const SCENE_CARD =
  "overflow-hidden rounded-[10px] bg-card font-body text-[12.5px] leading-normal text-body shadow-[0_0_0_1px_rgba(44,43,42,.09),var(--shadow-card)]";

/** The same scene on a textured hero: a white ring and a long soft shadow. */
export const SCENE_CARD_HERO =
  "shadow-[0_0_0_1px_rgba(255,255,255,.75),0_30px_60px_-30px_rgba(44,43,42,.35),var(--shadow-card)]";
