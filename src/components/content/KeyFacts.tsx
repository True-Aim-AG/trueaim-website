export type KeyFact = { label: string; text: string };

const LG_COLS: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

/** Short labelled facts as pill cards. Large screens use one column per item, up to four. */
export function KeyFacts({
  heading,
  headingLevel = "h2",
  items,
}: {
  heading?: string;
  headingLevel?: "h2" | "h3";
  items: KeyFact[];
}) {
  const Heading = headingLevel;
  const lg = LG_COLS[Math.min(Math.max(items.length, 1), 4)];
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {heading && (
          <Heading className="mb-8 font-display text-3xl md:text-4xl font-bold text-strong">
            {heading}
          </Heading>
        )}
        <ul className={`grid gap-6 grid-cols-1 md:grid-cols-2 ${lg}`}>
          {items.map((item) => (
            <li
              key={item.label}
              className="bg-card shadow-card rounded-pill px-[29px] py-[27px]"
            >
              <p className="font-display font-semibold text-[28px] leading-[1.3] text-strong">
                {item.label}
              </p>
              <p className="mt-2 text-sm text-body leading-[1.6]">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
