import { Download } from "lucide-react";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { StatusPill } from "@/components/brand/StatusPill";

export type DossierItem = { title: string; text: string };
export type DossierRow = { label: string; value: string };

/** Decision Dossier explainer: points on the left, an illustrative dossier card on the right. */
export function DecisionDossierSection({
  id,
  heading,
  paragraphs,
  items,
  card,
}: {
  id: string;
  heading: string;
  paragraphs: string[];
  items: DossierItem[];
  card: {
    title: string;
    subtitle: string;
    status: string;
    rows: DossierRow[];
    exportLabel: string;
  };
}) {
  return (
    <section id={id} className="py-20 px-6 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-strong mb-6">
          {heading}
        </h2>
        <div className="text-body leading-[1.6] max-w-3xl space-y-4">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-start">
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.title} className="flex items-start gap-4 p-4 rounded-pill">
                <span aria-hidden className="mt-2 h-2 w-2 rounded-full bg-accent shrink-0" />
                <div>
                  <h3 className="font-semibold text-strong">{item.title}</h3>
                  <p className="text-sm text-muted">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="rounded-pill bg-card shadow-card overflow-hidden">
            <div className="flex items-center gap-4 px-6 py-4 border-b border-hairline">
              <div className="icon-plate h-10 w-10">
                <BrandIcon name="traceability" size={24} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-strong">{card.title}</p>
                <p className="text-xs text-muted">{card.subtitle}</p>
              </div>
              <StatusPill tone="approved">{card.status}</StatusPill>
            </div>
            <dl className="p-6 grid gap-3 text-sm">
              {card.rows.map((row) => (
                <div
                  key={row.label}
                  className="flex justify-between gap-4 border-b border-hairline pb-3"
                >
                  <dt className="text-muted">{row.label}</dt>
                  <dd className="text-strong text-right">{row.value}</dd>
                </div>
              ))}
            </dl>
            <p className="px-6 pb-6 inline-flex items-center gap-2 text-sm font-medium text-link">
              <Download className="w-4 h-4" strokeWidth={1.5} aria-hidden />
              {card.exportLabel}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
