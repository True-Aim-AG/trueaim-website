/**
 * The short answer under a page's H1: 40 to 60 words on what the page
 * covers, who it is for and what True Aim does about it. A paragraph, not a
 * heading, so the outline stays H1 then H2.
 */
export function Summary({ children }: { children: React.ReactNode }) {
  return (
    <p className="max-w-3xl text-lg text-body leading-[1.6]">{children}</p>
  );
}
