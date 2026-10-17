import Image from "next/image";
import { cn } from "@/lib/utils";
import { CARD, CARD_TEXT, CARD_TITLE, section, type Tone } from "./surface";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

export type Award = {
  src: string;
  alt: string;
  width: number;
  height: number;
  label: string;
  name: string;
  text: string;
};

/** The awards row: each award as a card with the organiser's mark, the label, the award and one line on it. Rows line up across the cards. */
export function Awards({ heading, items, tone = "tint" }: { heading: string; items: Award[]; tone?: Tone }) {
  return (
    <section className={section(tone)}>
      <div className="mx-auto max-w-7xl">
        <SectionHead heading={heading} />
        <ul className="grid grid-cols-1 gap-[29px] md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <li key={item.name}>
              <Reveal delay={index * 0.1} className="h-full">
                <div className={cn(CARD, "flex h-full flex-col gap-4 p-8")}>
                  <div className="flex h-14 items-center">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      className="h-auto max-h-14 w-auto max-w-[200px]"
                    />
                  </div>
                  <p className="text-caption-sm text-accent">{item.label}</p>
                  <p className={CARD_TITLE}>{item.name}</p>
                  <p className={CARD_TEXT}>{item.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
