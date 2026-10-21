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
  { party: "Policyholder", via: "Portal" },
  { party: "Broker/MGA", via: "Bordereaux" },
  { party: "Carrier Core", via: "Email/Quote" },
  { party: "Repair Network", via: "PDF Report" },
  { party: "Adjuster" },
];

export function ClaimChainDiagram() {
  return (
    <Figure label="A claim passing from the policyholder to the broker, the carrier, the repair network and the adjuster">
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
  { name: "Carrier Workbench", items: ["Line-level audit", "Statutory compliance"] },
  { name: "Intermediary View", items: ["Binder threshold", "Portfolio telemetry"] },
  { name: "Supply Chain Node", items: ["Live price testing", "Real-time clearance"] },
];

export function SharedRecordDiagram() {
  return (
    <Figure label="One unified claim record serving the carrier workbench, the intermediary view and the supply chain node">
      <div className={`${focal} mx-auto max-w-xs`}>
        <div>Unified Claim Record</div>
        <div className="text-sm font-normal opacity-90">(State &amp; Provenance)</div>
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
  { test: "Within Expected σ", result: "Auto-Cleared" },
  { test: "Positive Variance", result: "Flagged w/ Delta", note: "(Reason Logged)" },
  { test: "Unstructured Data", result: "Held for Senior Handler Judgement" },
];

export function PriceEngineDiagram() {
  return (
    <Figure label="A contractor estimate tested by the price engine, then auto-cleared, flagged with its delta or held for senior judgement">
      <div className={`${node} mx-auto max-w-xs`}>Contractor Estimate: Line Items</div>
      <Stem />
      <div className={`${focal} mx-auto max-w-md`}>
        <div>Agentic Price Engine: Regional Distribution Models</div>
        <div className="text-sm font-normal opacity-90">
          (Empirical variance testing by trade &amp; postal code)
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
