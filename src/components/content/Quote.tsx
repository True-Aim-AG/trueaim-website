import { Reveal } from "./Reveal";
import { section, type Tone } from "./surface";

/**
 * A customer's words in italics and quotation marks, with the speaker's name
 * and role beneath. As a section it is centred; inline it sits left-aligned
 * inside another block, for instance under a section heading.
 */
export function Quote({
  text,
  name,
  role,
  tone = "white",
  inline,
}: {
  text: string;
  name: string;
  role: string;
  tone?: Tone;
  inline?: boolean;
}) {
  const figure = (
    <figure className={inline ? "max-w-[60ch]" : "mx-auto max-w-[70ch] text-center"}>
      <blockquote className="font-display text-[20px] font-medium italic leading-[1.5] text-strong text-balance md:text-[24px]">
        <p>&ldquo;{text}&rdquo;</p>
      </blockquote>
      <figcaption className="mt-8 text-[15px] text-muted">
        <span className="font-semibold text-strong">{name}</span>, {role}
      </figcaption>
    </figure>
  );
  if (inline) return <Reveal delay={0.1}>{figure}</Reveal>;
  return (
    <section className={section(tone, true)}>
      <Reveal>{figure}</Reveal>
    </section>
  );
}
