import { Reveal } from "./Reveal";

/** One statement, centred and set in True Aim Blue on the pale blue surface. */
export function Callout({ text }: { text: string }) {
  return (
    <section className="sec bg-ta-blue-50 px-6 py-14 md:py-20">
      <Reveal>
        <p className="mx-auto max-w-[70ch] text-center font-display text-[22px] font-medium leading-[1.4] text-ta-blue-600 text-balance md:text-[26px]">
          {text}
        </p>
      </Reveal>
    </section>
  );
}
