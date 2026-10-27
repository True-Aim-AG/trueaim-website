export type Point = { title: string; text: string };

/** Short titled points under a split section's paragraphs, against a thin blue rule. */
export function Points({ items, align = "left" }: { items: Point[]; align?: "left" | "right" }) {
  return (
    <ul className={align === "right" ? "mt-8 space-y-5 border-ta-blue-200 border-l-2 pl-6 lg:border-l-0 lg:border-r-2 lg:pl-0 lg:pr-6" : "mt-8 space-y-5 border-l-2 border-ta-blue-200 pl-6"}>
      {items.map((item) => (
        <li key={item.title}>
          <p className="font-display text-[19px] font-semibold leading-[1.3] text-strong">{item.title}</p>
          <p className="mt-1 text-[16px] leading-[1.55] text-muted">{item.text}</p>
        </li>
      ))}
    </ul>
  );
}
