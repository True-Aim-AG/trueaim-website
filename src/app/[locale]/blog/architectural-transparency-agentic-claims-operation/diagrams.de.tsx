import { ArrowDown } from "lucide-react";

/**
 * The post's three diagrams, drawn in HTML so the labels stay text and wrap at phone width.
 * Graphics grammar as in src/components/diagrams/shared.tsx: 2px monochrome outlines,
 * one True Aim Blue focal node per diagram, visible line connections, no shadows.
 */

const node =
  "rounded-pill border-2 border-line-strong bg-page px-5 py-3 text-center font-display text-sm font-semibold text-strong";
const focal =
  "rounded-pill bg-ta-blue px-6 py-4 text-center font-display font-semibold text-on-brand";

function Stem({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center py-1.5 text-muted">
      <span aria-hidden="true" className="h-3 w-0.5 bg-line-strong" />
      {label && <span className="py-1 text-xs">{label}</span>}
      <ArrowDown aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
    </div>
  );
}

/** A horizontal bar that splits one stem into three columns, from md up. */
function Branch() {
  return (
    <div aria-hidden="true" className="relative hidden h-6 md:block">
      <span className="absolute left-1/2 top-0 h-3 w-0.5 -translate-x-1/2 bg-line-strong" />
      <span className="absolute left-[16.67%] right-[16.67%] top-3 h-3 border-x-2 border-t-2 border-line-strong" />
      <span className="absolute left-1/2 top-3 h-3 w-0.5 -translate-x-1/2 bg-line-strong" />
    </div>
  );
}

function Figure({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <figure aria-label={label} className="my-8 bg-card shadow-card rounded-pill p-6 md:p-8">
      {children}
    </figure>
  );
}

const chain: { party: string; via?: string }[] = [
  { party: "Versicherungsnehmer", via: "Portal" },
  { party: "Makler/MGA", via: "Bordereaux" },
  { party: "Kernsystem Versicherer", via: "E-Mail/Angebot" },
  { party: "Reparaturnetzwerk", via: "PDF-Bericht" },
  { party: "Schadenregulierer" },
];

export function ClaimChainDiagram() {
  return (
    <Figure label="Ein Schadenfall auf dem Weg vom Versicherungsnehmer über den Makler, den Versicherer und das Reparaturnetzwerk zum Schadenregulierer">
      <ol role="list" className="mx-auto max-w-xs list-none p-0">
        {chain.map((step) => (
          <li key={step.party}>
            <div className={node}>{step.party}</div>
            {step.via && <Stem label={step.via} />}
          </li>
        ))}
      </ol>
    </Figure>
  );
}

const views: { name: string; items: string[] }[] = [
  { name: "Workbench Versicherer", items: ["Prüfung auf Positionsebene", "Aufsichtsrechtliche Compliance"] },
  { name: "Sicht Vermittler", items: ["Binder-Schwelle", "Portfolio-Telemetrie"] },
  { name: "Knoten Lieferkette", items: ["Live-Preisprüfung", "Freigabe in Echtzeit"] },
];

export function SharedRecordDiagram() {
  return (
    <Figure label="Eine einheitliche Schadenakte für die Workbench des Versicherers, die Sicht des Vermittlers und den Knoten der Lieferkette">
      <div className={`${focal} mx-auto max-w-xs`}>
        <div>Einheitliche Schadenakte</div>
        <div className="text-sm font-normal opacity-90">(Zustand &amp; Herkunft)</div>
      </div>
      <Branch />
      <div className="md:hidden">
        <Stem />
      </div>
      <ul role="list" className="grid list-none gap-4 p-0 md:grid-cols-3">
        {views.map((view) => (
          <li key={view.name} className="rounded-pill border-2 border-line-strong bg-page px-5 py-4">
            <div className="mb-2 text-center font-display text-sm font-semibold text-strong">
              {view.name}
            </div>
            <ul className="space-y-1 text-sm text-body">
              {view.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden="true" className="text-accent">&bull;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Figure>
  );
}

const outcomes: { test: string; result: string; note?: string }[] = [
  { test: "Innerhalb erwartetem σ", result: "Auto-Cleared" },
  { test: "Positive Abweichung", result: "Markiert mit Delta", note: "(Grund protokolliert)" },
  { test: "Unstrukturierte Daten", result: "Zurückgestellt für erfahrene Sachbearbeiter" },
];

export function PriceEngineDiagram() {
  return (
    <Figure label="Ein Kostenvoranschlag eines Dienstleisters, von der Preis-Engine geprüft und dann automatisch freigegeben, mit seinem Delta markiert oder für erfahrene Sachbearbeiter zurückgestellt">
      <div className={`${node} mx-auto max-w-xs`}>Kostenvoranschlag Dienstleister: Positionen</div>
      <Stem />
      <div className={`${focal} mx-auto max-w-md`}>
        <div>Agentische Preis-Engine: regionale Verteilungsmodelle</div>
        <div className="text-sm font-normal opacity-90">
          (Empirische Varianzprüfung nach Gewerk &amp; Postleitzahl)
        </div>
      </div>
      <Branch />
      <div className="md:hidden">
        <Stem />
      </div>
      <ul role="list" className="grid list-none gap-4 p-0 md:grid-cols-3">
        {outcomes.map((outcome) => (
          <li key={outcome.test} className="flex flex-col items-center">
            <div className={`${node} w-full`}>{outcome.test}</div>
            <Stem />
            <div className="w-full rounded-pill bg-accent-soft px-5 py-3 text-center text-sm text-accent">
              <div className="font-display font-semibold">{outcome.result}</div>
              {outcome.note && <div>{outcome.note}</div>}
            </div>
          </li>
        ))}
      </ul>
    </Figure>
  );
}
