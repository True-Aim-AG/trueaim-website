import { ButtonLink } from "@/components/brand/Button";

export type CtaButton = { label: string; href: string; variant?: "primary" | "on-dark" };

/** Dark closing band with a heading, an optional lede and one or two buttons, set to the left as the prototype does. */
export function CtaBand({
  heading,
  lede,
  buttons,
}: {
  heading: string;
  lede?: string;
  buttons: CtaButton[];
}) {
  return (
    <section data-theme="dark" className="bg-page-tint px-6 py-20 md:py-[120px]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-[70ch]">
          <h2 className="font-display text-[30px] font-bold leading-[1.15] text-strong text-balance md:text-[40px]">
            {heading}
          </h2>
          {lede && <p className="mt-6 max-w-[62ch] text-[18px] leading-[30px] text-body">{lede}</p>}
        </div>
        <div className="flex flex-wrap items-center gap-3.5">
          {buttons.map((button, index) => (
            <ButtonLink
              key={button.href + button.label}
              href={button.href}
              size="lg"
              variant={button.variant ?? (index === 0 ? "primary" : "on-dark")}
            >
              {button.label}
            </ButtonLink>
          ))}
        </div>
      </div>
    </section>
  );
}
