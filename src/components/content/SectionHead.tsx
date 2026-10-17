import { cn } from "@/lib/utils";

/** Section heading as the prototype sets it: left-aligned, 40px, with an optional lede under it. */
export function SectionHead({
  heading,
  headingLevel = "h2",
  lede,
  className,
}: {
  heading: string;
  headingLevel?: "h2" | "h3";
  lede?: string;
  className?: string;
}) {
  const Heading = headingLevel;
  return (
    <div className={cn("mb-14 max-w-[70ch]", className)}>
      <Heading className="font-display text-[30px] font-bold leading-[1.15] text-strong text-balance md:text-[40px]">
        {heading}
      </Heading>
      {lede && <p className="mt-6 max-w-[62ch] text-[18px] leading-[30px] text-body">{lede}</p>}
    </div>
  );
}
