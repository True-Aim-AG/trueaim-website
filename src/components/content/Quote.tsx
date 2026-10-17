import { Reveal } from "./Reveal";
import { section, type Tone } from "./surface";

/** A customer's words, centred, in italics and quotation marks, with the speaker's name and role beneath. */
export function Quote({ text, name, role, tone = "white" }: { text: string; name: string; role: string; tone?: Tone }) {
  return (
    <section className={section(tone, true)}>
      <Reveal>
        <figure className="mx-auto max-w-[70ch] text-center">
          <blockquote className="font-display text-[20px] font-medium italic leading-[1.5] text-strong text-balance md:text-[24px]">
            <p>&ldquo;{text}&rdquo;</p>
          </blockquote>
          <figcaption className="mt-8 text-[15px] text-muted">
            <span className="font-semibold text-strong">{name}</span>, {role}
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}
