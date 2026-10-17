import Image from "next/image";
import { cn } from "@/lib/utils";
import { CARD, SECTION_TIGHT } from "./surface";
import { SectionHead } from "./SectionHead";

export type BadgeItem = {
  image: { src: string; alt: string; width: number; height: number };
  /** Height the mark renders at, in pixels. */
  renderHeight?: number;
  /** Marks drawn for a dark ground sit on a charcoal plate. */
  darkPlate?: boolean;
  /** "Certified", "Aligned", "Winner". */
  caption?: string;
  title: string;
  text?: string;
};

const LG_COLS: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
};

/**
 * Credentials as the prototype's badge row: one rounded panel divided by
 * hairlines, the mark, a caption such as "Certified" or "Winner", the name
 * and one line under it.
 */
export function BadgeRow({ heading, items }: { heading: string; items: BadgeItem[] }) {
  const lg = LG_COLS[Math.min(Math.max(items.length, 1), 5)];
  return (
    <section className={SECTION_TIGHT}>
      <div className="mx-auto max-w-7xl">
        <SectionHead heading={heading} className="mb-10" />
        <ul className={cn("grid grid-cols-1 sm:grid-cols-2", lg, CARD)}>
          {items.map((item) => (
            <li
              key={item.title}
              className="border-hairline px-7 py-7 border-t first:border-t-0 sm:[&:nth-child(2)]:border-t-0 sm:even:border-l lg:border-t-0 lg:border-l lg:first:border-l-0"
            >
              <div className={cn("flex h-20 items-center", item.darkPlate && "w-fit rounded-[8px] bg-ta-charcoal px-3")}>
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  width={item.image.width}
                  height={item.image.height}
                  className="w-auto max-w-full object-contain object-left"
                  style={{ height: item.renderHeight ?? 72 }}
                />
              </div>
              {item.caption && (
                <p className="mt-4 text-[12px] font-medium uppercase tracking-[0.14em] text-accent">{item.caption}</p>
              )}
              <h3 className={cn("font-display text-[17px] font-semibold leading-[1.35] text-strong", item.caption ? "mt-2" : "mt-4")}>
                {item.title}
              </h3>
              {item.text && <p className="mt-1.5 text-[14px] leading-[1.5] text-muted">{item.text}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
