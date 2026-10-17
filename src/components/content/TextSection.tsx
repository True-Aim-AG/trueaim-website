import { Reveal } from "./Reveal";
import { section, type Tone } from "./surface";
import { SectionHead } from "./SectionHead";

/** A plain prose block: caption, heading and a few paragraphs at the lede size. */
export function TextSection({
  cap,
  heading,
  headingLevel = "h2",
  paragraphs,
  tone = "white",
}: {
  cap?: string;
  heading: string;
  headingLevel?: "h2" | "h3";
  paragraphs: string[];
  tone?: Tone;
}) {
  return (
    <section className={section(tone)}>
      <div className="mx-auto max-w-7xl">
        <SectionHead cap={cap} heading={heading} headingLevel={headingLevel} className="mb-6" />
        <Reveal delay={0.1} className="max-w-[74ch] space-y-6 text-[18px] leading-[30px] text-body">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
