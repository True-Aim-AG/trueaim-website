import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SECTION, SECTION_LILAC } from "./surface";
import { SectionHead } from "./SectionHead";

/** A product scene at the full content width under its heading. */
export function FigureSection({
  id,
  cap,
  heading,
  headingLevel = "h2",
  lilac,
  children,
}: {
  id?: string;
  cap?: string;
  heading: string;
  headingLevel?: "h2" | "h3";
  lilac?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn(lilac ? SECTION_LILAC : SECTION, id && "scroll-mt-24")}>
      <div className="mx-auto max-w-7xl">
        <SectionHead cap={cap} heading={heading} headingLevel={headingLevel} />
        <Reveal delay={0.1}>{children}</Reveal>
      </div>
    </section>
  );
}
