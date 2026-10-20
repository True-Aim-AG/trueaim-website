import { Reveal } from "./Reveal";
import { section, type Tone } from "./surface";

/** One statement, centred, in the heading colour. */
export function Callout({ text, tone = "tint" }: { text: string; tone?: Tone }) {
  return (
    <section className={section(tone, true)}>
      <Reveal>
        <p className="mx-auto max-w-[70ch] text-center font-display text-[22px] font-medium leading-[1.4] text-strong text-balance md:text-[26px]">
          {text}
        </p>
      </Reveal>
    </section>
  );
}
