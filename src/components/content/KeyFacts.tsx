import type { BrandIconName } from "@/components/brand/BrandIcon";
import { FeatureCards } from "./FeatureCards";

export type KeyFact = { label: string; text: string };

/** Short labelled facts as icon cards, the same card as every other grid on the page. */
export function KeyFacts({
  cap,
  heading,
  headingLevel = "h2",
  items,
  icons = [],
  lilac,
}: {
  cap?: string;
  heading: string;
  headingLevel?: "h2" | "h3";
  items: KeyFact[];
  icons?: BrandIconName[];
  lilac?: boolean;
}) {
  const columns = Math.min(Math.max(items.length, 2), 4) as 2 | 3 | 4;
  return (
    <FeatureCards
      cap={cap}
      heading={heading}
      headingLevel={headingLevel}
      columns={columns}
      items={items.map((item, index) => ({ title: item.label, text: item.text, icon: icons[index] }))}
      lilac={lilac}
    />
  );
}
