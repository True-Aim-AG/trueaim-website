import { ButtonLink } from "@/components/brand/Button";
import { Glow } from "@/components/brand/Glow";

export type CtaButton = { label: string; href: string; variant?: "primary" | "on-dark" };

/** Dark closing band with a heading, an optional lede and one or two buttons. */
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
    <section data-theme="dark" className="relative overflow-hidden bg-page-tint py-24 px-6">
      <Glow variant="soft" size={520} className="absolute -right-40 -top-40" />
      <div className="relative max-w-7xl mx-auto text-center">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-strong mb-6">
          {heading}
        </h2>
        {lede && (
          <p className="text-lg md:text-xl text-body mb-10 max-w-2xl mx-auto">{lede}</p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-4">
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
