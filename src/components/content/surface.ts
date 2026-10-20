/**
 * Shared surface classes: rounded cards with a 1px ring inside the shadow,
 * and sections whose backgrounds alternate down the page, white under the
 * hero, then the mockup's lilac, then white again.
 */

/** A card: 12px radius, 1px ring in the shadow, the brand card shadow. */
export const CARD = "rounded-[12px] bg-card shadow-[0_0_0_1px_rgba(44,43,42,.06),var(--shadow-card)]";

/** A clickable card lifts and its ring turns blue. */
export const CARD_HOVER =
  "transition-[box-shadow,transform] duration-300 ease-brand hover:-translate-y-[3px] hover:shadow-[0_0_0_1px_rgba(81,81,219,.28),0_14px_28px_-12px_rgba(44,43,42,.18)] focus-within:shadow-[0_0_0_3px_var(--focus-ring)]";

/** Section backgrounds: white, or the mockup's lilac that alternates with it. */
export type Tone = "white" | "tint";

const TONES: Record<Tone, string> = { white: "bg-page", tint: "bg-lilac" };

/** The section wrapper for a tone, at full or short height. */
export function section(tone: Tone = "white", tight = false) {
  return `${TONES[tone]} px-6 ${tight ? "py-14 md:py-20" : "py-20 md:py-[120px]"}`;
}

export const SECTION = section("white");
export const SECTION_TIGHT = section("white", true);
export const SECTION_LILAC = section("tint");

/** Product-scene chrome: the rounded card the prototype draws its screens in. */
export const SCENE_CARD =
  "overflow-hidden rounded-[10px] bg-card font-body text-[12.5px] leading-normal text-body shadow-[0_0_0_1px_rgba(44,43,42,.09),var(--shadow-card)]";

/** The same scene on a textured hero: a white ring and a long soft shadow. */
export const SCENE_CARD_HERO =
  "shadow-[0_0_0_1px_rgba(255,255,255,.75),0_30px_60px_-30px_rgba(44,43,42,.35),var(--shadow-card)]";

/**
 * Cards in a grid line their rows up with their neighbours: each card is a
 * subgrid over the parent's rows, so icons, titles, texts and links sit on
 * the same lines across the row without fixed heights. The card sets the
 * gap between its own rows; the parent keeps the gap between cards.
 */
export const CARD_GRID = "grid grid-rows-subgrid content-start gap-y-3";
export const ROW_SPAN: Record<number, string> = { 2: "row-span-2", 3: "row-span-3", 4: "row-span-4", 5: "row-span-5" };
export const CARD_TITLE = "font-display text-[20px] font-semibold leading-[1.3] tracking-[0.01em] text-strong";
export const CARD_TEXT = "text-[15px] leading-[1.55] text-muted";
