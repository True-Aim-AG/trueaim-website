/**
 * Shared surface classes: rounded cards with a 1px ring inside the shadow,
 * and sections whose backgrounds alternate down the page, white under the
 * hero, then the pale blue, then white again.
 */

/** A card: 12px radius, 1px ring in the shadow, the brand card shadow. */
export const CARD = "rounded-[12px] bg-card shadow-[0_0_0_1px_rgba(44,43,42,.06),var(--shadow-card)]";

/** A clickable card lifts and its ring turns blue. */
export const CARD_HOVER =
  "transition-[box-shadow,transform] duration-300 ease-brand hover:-translate-y-[3px] hover:shadow-[0_0_0_1px_rgba(81,81,219,.28),0_14px_28px_-12px_rgba(44,43,42,.18)] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--focus-ring)]";

/** Section backgrounds: white, or the pale blue that alternates with it. */
export type Tone = "white" | "tint";

const TONES: Record<Tone, string> = { white: "bg-page", tint: "bg-ta-blue-50" };

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

/** Card rows line up across a grid: the icon slot, the title (room for two lines), then the text. */
export const CARD_ICON_SLOT = "flex h-10 items-center";
export const CARD_TITLE = "min-h-[52px] font-display text-[20px] font-semibold leading-[1.3] tracking-[0.01em] text-strong";
export const CARD_TEXT = "text-[15px] leading-[1.55] text-muted";
