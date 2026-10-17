import { SECTION_TIGHT } from "./surface";

/** One statement, centred and set in True Aim Blue, as the prototype sets every quote line. */
export function Callout({ text }: { text: string }) {
  return (
    <section className={SECTION_TIGHT}>
      <p className="mx-auto max-w-[70ch] text-center font-display text-[22px] font-medium leading-[1.4] text-ta-blue-600 text-balance md:text-[26px]">
        {text}
      </p>
    </section>
  );
}
