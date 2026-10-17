const TEXT = "max-w-[54ch] text-[18px] leading-[1.6] text-body md:text-[20px] md:leading-[1.5]";

/**
 * The short answer under a page's H1: 40 to 60 words on what the page
 * covers, who it is for and what True Aim does about it. A paragraph, not a
 * heading, so the outline stays H1 then H2. A blank line in the string
 * starts a second paragraph, as the home lede does.
 */
export function Summary({ children }: { children: React.ReactNode }) {
  const parts = typeof children === "string" ? children.split(/\n\s*\n/) : [children];
  if (parts.length === 1) return <p className={TEXT}>{parts[0]}</p>;
  return (
    <div className={`${TEXT} space-y-5`}>
      {parts.map((part, index) => (
        <p key={index}>{part}</p>
      ))}
    </div>
  );
}
