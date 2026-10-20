import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { section, type Tone } from "./surface";
import { SectionHead } from "./SectionHead";

/** A product scene at the full content width under its heading. */
export function FigureSection({
  id,
  cap,
  heading,
  headingLevel = "h2",
  tone = "white",
  children,
}: {
  id?: string;
  cap?: string;
  heading: string;
  headingLevel?: "h2" | "h3";
  tone?: Tone;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn(section(tone), id && "scroll-mt-24")}>
      <div className="mx-auto max-w-7xl">
        <SectionHead cap={cap} heading={heading} headingLevel={headingLevel} />
        <Reveal delay={0.1}>{children}</Reveal>
      </div>
    </section>
  );
}
