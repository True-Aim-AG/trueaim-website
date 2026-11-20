import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/brand/Button";
import { Summary } from "./Summary";

export type HeroButton = { label: string; href: string; variant?: "primary" | "secondary" };

/** One of Anna's two brand textures as the hero surface, with the crop to show. */
export type HeroTexture = { name: "glass" | "circ"; position?: string };

const TEXTURES: Record<HeroTexture["name"], string> = {
  glass: "/brand/textures/glass-box-vivid.webp",
  circ: "/brand/textures/circular-light.webp",
};

/**
 * The texture and its light veil, behind a hero's copy. The parent section
 * needs `relative overflow-hidden` and its content `relative`. Blog posts use
 * it alone, as their hero keeps its own layout.
 */
export function TextureBackdrop({ texture }: { texture: HeroTexture }) {
  return (
    <>
      {/* The texture and its veil fade out at the foot, so the hero runs into the page ground with no edge. */}
      <div aria-hidden className="absolute inset-0 [mask-image:linear-gradient(180deg,#000_62%,transparent_100%)]">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${TEXTURES[texture.name]})`, backgroundPosition: texture.position ?? "50% 50%" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--ground-1)_96%,transparent)_0%,color-mix(in_oklab,var(--ground-1)_90%,transparent)_55%,color-mix(in_oklab,var(--ground-1)_70%,transparent)_100%)] lg:bg-[linear-gradient(90deg,color-mix(in_oklab,var(--ground-1)_97%,transparent)_0%,color-mix(in_oklab,var(--ground-1)_88%,transparent)_38%,color-mix(in_oklab,var(--ground-1)_46%,transparent)_64%,color-mix(in_oklab,var(--ground-1)_6%,transparent)_100%)]" />
      </div>
    </>
  );
}

/**
 * Page hero as the V5 prototype draws it: an optional caption over the one
 * H1, the 40 to 60 word summary, one or two buttons, and the product scene or
 * brand graphic in the second column. A brand texture is the surface, with a
 * light veil so the copy reads; without a texture the page gradient shows.
 * Children render under the summary, for a hero that carries more than one
 * paragraph (the About page) or a date line (the legal pages).
 * Every hero has the same height on desktop, so pages within a section line
 * up; `compact` gives the legal, contact and blog pages a shorter shared
 * height, and `wideCopy` widens the copy column for a long hero (About).
 */
export function PageHero({
  eyebrow,
  title,
  summary,
  buttons = [],
  visual,
  visualWidth,
  texture,
  compact = false,
  wideCopy = false,
  children,
}: {
  eyebrow?: string;
  /** The H1, as a string or as two lines (text, <br />, text). */
  title: React.ReactNode;
  summary?: string;
  buttons?: HeroButton[];
  visual?: React.ReactNode;
  /** The visual column's maximum width in pixels, where the default 600 is too narrow. */
  visualWidth?: number;
  texture?: HeroTexture;
  compact?: boolean;
  wideCopy?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-page-tint">
      {texture && <TextureBackdrop texture={texture} />}
      <div
        className={cn(
          "relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 py-16 md:py-24 lg:items-center lg:py-[104px]",
          wideCopy
            ? "lg:grid-cols-[minmax(0,1.5fr)_minmax(0,.5fr)] lg:gap-12"
            : visualWidth
              ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,min(var(--hero-visual),54%))] lg:gap-14"
              : "lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] lg:gap-20",
          compact ? "lg:min-h-[360px]" : "lg:min-h-[720px]",
        )}
        style={visualWidth ? ({ "--hero-visual": `${visualWidth}px` } as React.CSSProperties) : undefined}
      >
        <div>
          {eyebrow && (
            <p className="mb-5 font-body text-[14px] font-medium uppercase tracking-[0.16em] text-accent">{eyebrow}</p>
          )}
          <h1
            className={cn(
              "whitespace-pre-line font-display text-[34px] font-bold leading-[1.15] text-strong text-balance sm:text-[40px] lg:leading-[1.1]",
              // Beside a wide figure the copy column is narrower, so the heading steps down to keep its lines whole.
              visualWidth ? "lg:text-[46px]" : "lg:text-[54px]",
            )}
          >
            {title}
          </h1>
          {summary && (
            <div className={cn("mt-6", wideCopy && "[&>*]:max-w-[78ch]")}>
              <Summary>{summary}</Summary>
            </div>
          )}
          {children}
          {buttons.length > 0 && (
            <div className="mt-10 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap">
              {buttons.map((button, index) => (
                <ButtonLink
                  key={button.href + button.label}
                  href={button.href}
                  variant={button.variant ?? (index === 0 ? "primary" : "secondary")}
                  size="lg"
                >
                  {button.label}
                </ButtonLink>
              ))}
            </div>
          )}
        </div>
        {visual && (
          <div
            className="relative mx-auto w-full max-w-[600px] lg:mx-0 lg:justify-self-end"
            style={visualWidth ? { maxWidth: visualWidth } : undefined}
          >
            {visual}
          </div>
        )}
      </div>
    </section>
  );
}
