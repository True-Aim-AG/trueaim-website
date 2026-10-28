import Image from "next/image";
import { cn } from "@/lib/utils";
import { CARD, SECTION_LILAC, SECTION_TIGHT } from "./surface";
import { SectionHead } from "./SectionHead";

export type BadgeItem = {
  /** A mark drawn as an image, or an icon on a lilac disc. */
  image?: { src: string; alt: string; width: number; height: number };
  icon?: React.ReactNode;
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
 * and one line under it. Each cell takes its four rows from the list's grid
 * (subgrid), so caption, title and text sit level across the row even when
 * one caption or title wraps. `threeTwo` sets five items as three over two
 * on desktop: two panels, the bottom pair centred at the same cell width.
 */
export function BadgeRow({ heading, items, lilac, threeTwo }: { heading: string; items: BadgeItem[]; lilac?: boolean; threeTwo?: boolean }) {
  const split = threeTwo && items.length === 5;
  const lg = LG_COLS[Math.min(Math.max(items.length, 1), 5)];
  const renderList = (list: BadgeItem[], cols: string) => (
    <ul className={cn("grid grid-cols-1 sm:grid-cols-2", cols, CARD)}>
      {list.map((item) => (
        <li
          key={item.title}
          className="row-span-4 grid grid-rows-subgrid border-hairline px-7 py-7 border-t first:border-t-0 sm:[&:nth-child(2)]:border-t-0 sm:even:border-l lg:border-t-0 lg:border-l lg:first:border-l-0"
        >
          <div className={cn("flex h-20 items-center", item.darkPlate && "w-fit rounded-[8px] bg-ta-charcoal px-3")}>
            {item.image ? (
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
                className="w-auto max-w-full object-contain object-left"
                style={{ height: item.renderHeight ?? 72 }}
              />
            ) : (
              <span className="grid h-14 w-14 place-items-center rounded-full bg-lilac text-accent">{item.icon}</span>
            )}
          </div>
          <p className="mt-4 min-h-[1.3em] text-[12px] font-medium uppercase tracking-[0.14em] text-accent">{item.caption}</p>
          <h3 className="mt-2 font-display text-[17px] font-semibold leading-[1.35] text-strong">
            {item.title}
          </h3>
          {item.text && <p className="mt-1.5 text-[14px] leading-[1.5] text-muted">{item.text}</p>}
        </li>
      ))}
    </ul>
  );
  return (
    <section className={lilac ? SECTION_LILAC : SECTION_TIGHT}>
      <div className="mx-auto max-w-7xl">
        <SectionHead heading={heading} className="mb-10" />
        {split ? (
          <div className="space-y-6">
            {renderList(items.slice(0, 3), "lg:grid-cols-3")}
            {renderList(items.slice(3), "lg:mx-auto lg:w-2/3 lg:grid-cols-2")}
          </div>
        ) : (
          renderList(items, lg)
        )}
      </div>
    </section>
  );
}
