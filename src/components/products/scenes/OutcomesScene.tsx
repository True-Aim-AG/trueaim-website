import { BrandIcon, type BrandIconName } from "@/components/brand/BrandIcon";
import { SCENE_CARD_HERO } from "@/components/content/surface";
import { cn } from "@/lib/utils";
import { HexCheck } from "./marks";

export type OutcomeItem = { icon: BrandIconName; title: string };

/** Three finished outcomes as stepped cards, each ticked. */
export function OutcomesScene({ alt, items, hero }: { alt: string; items: OutcomeItem[]; hero?: boolean }) {
  return (
    <ul
      aria-label={alt}
      className="mx-auto grid w-full max-w-[520px] gap-3.5 [&>li:nth-child(2)]:ml-6 [&>li:nth-child(3)]:ml-12 sm:[&>li:nth-child(2)]:ml-8 sm:[&>li:nth-child(3)]:ml-16"
    >
      {items.map((item) => (
        <li
          key={item.title}
          className={cn(
            "flex items-center gap-4 rounded-[10px] bg-card px-[22px] py-5 shadow-[0_0_0_1px_rgba(44,43,42,.09),var(--shadow-card)]",
            hero && SCENE_CARD_HERO,
          )}
        >
          <BrandIcon name={item.icon} size={28} />
          <span className="font-display text-[17px] font-semibold leading-[1.2] text-strong">{item.title}</span>
          <HexCheck className="ml-auto h-7 w-7" />
        </li>
      ))}
    </ul>
  );
}
