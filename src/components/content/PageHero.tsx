import { ButtonLink } from "@/components/brand/Button";
import { GridPattern } from "@/components/brand/GridPattern";
import { Summary } from "./Summary";

export type HeroButton = { label: string; href: string; variant?: "primary" | "secondary" };

/**
 * Page hero for the platform and product pages: the one H1, the 40 to 60 word
 * summary under it, one or two buttons, and an optional visual in the second
 * column. The structured grid sits top right as on the home hero.
 */
export function PageHero({
  title,
  summary,
  buttons,
  visual,
}: {
  title: string;
  summary: string;
  buttons: HeroButton[];
  visual?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden">
      <GridPattern className="absolute right-0 top-0 hidden h-[560px] w-[746px] lg:block" />
      <div
        className={
          visual
            ? "relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-16 pt-16 md:pt-24 lg:grid-cols-[minmax(0,560px)_1fr] lg:gap-16 lg:pb-24"
            : "relative mx-auto max-w-7xl px-6 pb-16 pt-16 md:pt-24 lg:pb-20"
        }
      >
        <div className="max-w-[640px]">
          <h1 className="font-display text-[40px] font-bold leading-[1.05] text-strong sm:text-[48px] lg:text-[54px]">
            {title}
          </h1>
          <div className="mt-[26px]">
            <Summary>{summary}</Summary>
          </div>
          {buttons.length > 0 && (
            <div className="mt-10 flex flex-col gap-3.5 sm:flex-row">
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
        {visual && <div className="relative">{visual}</div>}
      </div>
    </section>
  );
}
