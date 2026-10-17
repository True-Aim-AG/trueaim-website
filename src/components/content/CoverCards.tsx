import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { CARD, CARD_HOVER, CARD_TEXT, CARD_TITLE, section, type Tone } from "./surface";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

/** A crop of one of Anna's two textures: which texture, where the crop sits and how far it is zoomed. */
export type CoverTexture = { name: "glass" | "circ"; position: string; size: string };

export type CoverCard = {
  cap: string;
  title: string;
  text: string;
  href: string;
  linkLabel: string;
  cover: CoverTexture;
  logo?: { src: string; alt: string; width: number; height: number };
};

const TEXTURES: Record<CoverTexture["name"], string> = {
  glass: "/brand/textures/glass-box-vivid.webp",
  circ: "/brand/textures/circular-light.webp",
};

/**
 * Linked cards, each topped by a brand-texture cover with the hexagon mark
 * and, for a customer story, the customer's logo on a white plate. Two cards
 * sit under the heading; a single card sits to the right of it, narrower and with a shorter cover.
 */
export function CoverCards({ heading, items, tone = "white" }: { heading: string; items: CoverCard[]; tone?: Tone }) {
  const single = items.length === 1;
  return (
    <section className={section(tone)}>
      <div className={cn("mx-auto max-w-7xl", single && "grid items-center gap-x-[29px] md:grid-cols-2")}>
        <SectionHead heading={heading} className={cn(single && "md:mb-0")} />
        <ul className={cn("grid grid-cols-1 gap-[29px]", single ? "w-full max-w-[480px] md:justify-self-end" : "md:grid-cols-2")}>
          {items.map((item, index) => (
            <li key={item.title}>
              <Reveal delay={index * 0.1} className="h-full">
                <Link href={item.href} className={cn(CARD, CARD_HOVER, "flex h-full flex-col overflow-hidden")}>
                  <div
                    className={cn("relative rounded-t-[12px] bg-no-repeat", single ? "aspect-[3/1]" : "aspect-[16/10]")}
                    style={{
                      backgroundImage: `url(${TEXTURES[item.cover.name]})`,
                      backgroundPosition: item.cover.position,
                      backgroundSize: item.cover.size,
                    }}
                  >
                    {item.logo && (
                      <span className="absolute bottom-4 left-[18px] bg-white px-3 py-[7px] shadow-card">
                        <Image
                          src={item.logo.src}
                          alt={item.logo.alt}
                          width={item.logo.width}
                          height={item.logo.height}
                          className="h-9 w-auto"
                        />
                      </span>
                    )}
                    <svg viewBox="0 0 24 24" aria-hidden className="absolute bottom-3 right-3.5 h-[26px] w-[26px]">
                      <polygon
                        points="12,1.5 21.1,6.75 21.1,17.25 12,22.5 2.9,17.25 2.9,6.75"
                        fill="rgba(255,255,255,.35)"
                        stroke="#fff"
                        strokeWidth="1.4"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-8">
                    <p className="text-caption-sm text-accent">{item.cap}</p>
                    <h3 className={CARD_TITLE}>{item.title}</h3>
                    <p className={CARD_TEXT}>{item.text}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-medium text-accent">
                      {item.linkLabel}
                      <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
