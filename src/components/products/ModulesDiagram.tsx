import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionHead } from "@/components/content/SectionHead";
import { CARD, CARD_HOVER, section, type Tone } from "@/components/content/surface";
import { cn } from "@/lib/utils";

export type DiagramNode = { name: string; text: string; href?: string };

const Arrow = () => (
  <ChevronRight className="hidden lg:block w-6 h-6 text-subtle" strokeWidth={1.5} aria-hidden />
);

/** Input, modules and output as a left-to-right flow, with feature rails underneath. */
export function ModulesDiagram({
  heading,
  intro,
  input,
  modules,
  output,
  features,
  featuresHeading,
  tone = "white",
}: {
  heading: string;
  intro?: string;
  input: DiagramNode;
  modules: DiagramNode[];
  output: DiagramNode;
  features: DiagramNode[];
  featuresHeading: string;
  tone?: Tone;
}) {
  return (
    <section className={section(tone)}>
      <div className="max-w-7xl mx-auto">
        <SectionHead heading={heading} lede={intro} />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,2.4fr)_auto_minmax(0,1fr)] lg:items-center">
          <div className="rounded-[12px] bg-surface-muted p-6">
            <p className="font-display font-semibold text-strong">{input.name}</p>
            <p className="text-sm text-body">{input.text}</p>
          </div>
          <Arrow />
          <ol className="grid gap-4 sm:grid-cols-2">
            {modules.map((module) => {
              const body = (
                <>
                  <span className="block font-display font-semibold text-link">
                    {module.name}
                  </span>
                  <span className="block text-sm text-body">{module.text}</span>
                </>
              );
              const classes = cn(CARD, "block h-full p-6");
              return (
                <li key={module.name}>
                  {module.href ? (
                    <Link href={module.href} className={cn(classes, CARD_HOVER)}>
                      {body}
                    </Link>
                  ) : (
                    <div className={classes}>{body}</div>
                  )}
                </li>
              );
            })}
          </ol>
          <Arrow />
          <div className="rounded-[12px] bg-accent-soft p-6">
            <p className="font-display font-semibold text-strong">{output.name}</p>
            <p className="text-sm text-body">{output.text}</p>
          </div>
        </div>
        <h3 className="sr-only">{featuresHeading}</h3>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {features.map((feature) => (
            <li key={feature.name} className="rounded-[12px] bg-lilac px-8 py-6">
              <p className="font-display font-semibold text-strong">{feature.name}</p>
              <p className="text-sm text-body">{feature.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
