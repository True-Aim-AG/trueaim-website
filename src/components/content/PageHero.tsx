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
 * Page hero as the V5 prototype draws it: the one H1, the 40 to 60 word
 * summary, one or two buttons, and the product scene or brand graphic in the
 * second column. A brand texture is the surface, with a light veil so the
 * copy reads; without a texture the page gradient shows.
 */
export function PageHero({
  title,
  summary,
  buttons,
  visual,
  texture,
}: {
  title: string;
  summary: string;
  buttons: HeroButton[];
  visual?: React.ReactNode;
  texture?: HeroTexture;
}) {
  const style = texture
    ? {
        backgroundImage: `url(${TEXTURES[texture.name]})`,
        backgroundSize: "cover",
        backgroundPosition: texture.position ?? "50% 50%",
        backgroundRepeat: "no-repeat",
      }
    : undefined;
  return (
    <section className="relative overflow-hidden border-b border-hairline bg-page-tint" style={style}>
      {texture && (
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(251,252,253,.96)_0%,rgba(251,252,253,.9)_55%,rgba(251,252,253,.7)_100%)] lg:bg-[linear-gradient(90deg,rgba(251,252,253,.97)_0%,rgba(251,252,253,.88)_38%,rgba(251,252,253,.46)_64%,rgba(251,252,253,.06)_100%)]"
        />
      )}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 py-16 md:py-24 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] lg:items-center lg:gap-20 lg:py-[104px]">
        <div>
          <h1 className="font-display text-[34px] font-semibold leading-[1.05] text-strong text-balance sm:text-[40px] lg:text-[54px] lg:leading-none">
            {title}
          </h1>
          <div className="mt-6">
            <Summary>{summary}</Summary>
          </div>
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
        {visual && <div className="relative mx-auto w-full max-w-[600px] lg:mx-0 lg:justify-self-end">{visual}</div>}
      </div>
    </section>
  );
}
