import { SECTION } from "./surface";
import { SectionHead } from "./SectionHead";

/** A plain prose block: caption, heading and a few paragraphs at the lede size. */
export function TextSection({
  cap,
  heading,
  headingLevel = "h2",
  paragraphs,
}: {
  cap?: string;
  heading: string;
  headingLevel?: "h2" | "h3";
  paragraphs: string[];
}) {
  return (
    <section className={SECTION}>
      <div className="mx-auto max-w-7xl">
        <SectionHead cap={cap} heading={heading} headingLevel={headingLevel} className="mb-6" />
        <div className="max-w-[74ch] space-y-6 text-[18px] leading-[30px] text-body">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
