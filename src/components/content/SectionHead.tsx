import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

/** Section heading as the prototype sets it: an optional blue caption, the heading at 40px, an optional lede. */
export function SectionHead({
  cap,
  heading,
  headingLevel = "h2",
  lede,
  className,
  center,
}: {
  cap?: string;
  heading: string;
  headingLevel?: "h2" | "h3";
  lede?: string;
  className?: string;
  center?: boolean;
}) {
  const Heading = headingLevel;
  return (
    <Reveal className={cn("mb-14 max-w-[70ch]", center && "mx-auto text-center", className)}>
      {cap && <p className="mb-4 text-caption-sm text-accent">{cap}</p>}
      <Heading className="font-display text-[30px] font-bold leading-[1.15] text-strong text-balance md:text-[40px]">
        {heading}
      </Heading>
      {lede && <p className={cn("mt-6 max-w-[62ch] text-[18px] leading-[30px] text-body", center && "mx-auto")}>{lede}</p>}
    </Reveal>
  );
}
