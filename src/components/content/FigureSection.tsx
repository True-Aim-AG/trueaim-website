import { cn } from "@/lib/utils";
import { SECTION } from "./surface";
import { SectionHead } from "./SectionHead";

/** A product scene at full width under its heading, with an optional note beneath it. */
export function FigureSection({
  id,
  cap,
  heading,
  headingLevel = "h2",
  note,
  children,
}: {
  id?: string;
  cap?: string;
  heading: string;
  headingLevel?: "h2" | "h3";
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn(SECTION, id && "scroll-mt-24")}>
      <div className="mx-auto max-w-7xl">
        <SectionHead cap={cap} heading={heading} headingLevel={headingLevel} />
        <div className="mx-auto max-w-[900px]">{children}</div>
        {note && <p className="mt-[30px] max-w-[74ch] text-[14px] leading-[1.55] text-muted">{note}</p>}
      </div>
    </section>
  );
}
