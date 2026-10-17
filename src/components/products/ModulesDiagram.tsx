import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

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
}: {
  heading: string;
  intro?: string;
  input: DiagramNode;
  modules: DiagramNode[];
  output: DiagramNode;
  features: DiagramNode[];
  featuresHeading: string;
}) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center font-display text-3xl md:text-4xl font-bold text-strong">
          {heading}
        </h2>
        {intro && (
          <p className="mt-4 text-lg text-body max-w-2xl mx-auto text-center">{intro}</p>
        )}
        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,2.4fr)_auto_minmax(0,1fr)] lg:items-center">
          <div className="rounded-pill bg-surface-muted p-6">
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
              const classes = "rounded-pill bg-card shadow-card p-6 block h-full";
              return (
                <li key={module.name}>
                  {module.href ? (
                    <Link href={module.href} className={classes}>
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
          <div className="rounded-pill bg-accent-soft p-6">
            <p className="font-display font-semibold text-strong">{output.name}</p>
            <p className="text-sm text-body">{output.text}</p>
          </div>
        </div>
        <h3 className="sr-only">{featuresHeading}</h3>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {features.map((feature) => (
            <li key={feature.name} className="rounded-pill bg-lilac px-8 py-6">
              <p className="font-display font-semibold text-strong">{feature.name}</p>
              <p className="text-sm text-body">{feature.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
