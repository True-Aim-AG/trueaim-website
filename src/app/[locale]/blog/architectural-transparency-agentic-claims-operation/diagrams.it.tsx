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
  { party: "Assicurato", via: "Portale" },
  { party: "Broker/MGA", via: "Bordereaux" },
  { party: "Core assicuratore", via: "E-mail/Preventivo" },
  { party: "Rete di riparazione", via: "Rapporto PDF" },
  { party: "Perito" },
];

export function ClaimChainDiagram() {
  return (
    <Figure label="Un sinistro che passa dall’assicurato al broker, all’assicuratore, alla rete di riparazione e al perito">
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
  { name: "Workbench assicuratore", items: ["Audit a livello di riga", "Conformità normativa"] },
  { name: "Vista intermediario", items: ["Soglia del binder", "Telemetria del portafoglio"] },
  { name: "Nodo della filiera", items: ["Test dei prezzi in tempo reale", "Approvazione in tempo reale"] },
];

export function SharedRecordDiagram() {
  return (
    <Figure label="Un unico fascicolo sinistro al servizio del workbench dell’assicuratore, della vista dell’intermediario e del nodo della filiera">
      <div className={`${focal} mx-auto max-w-xs`}>
        <div>Fascicolo sinistro unificato</div>
        <div className="text-sm font-normal opacity-90">(Stato &amp; provenienza)</div>
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
  { test: "Entro il σ atteso", result: "Approvato automaticamente" },
  { test: "Scostamento positivo", result: "Segnalato con delta", note: "(motivo registrato)" },
  { test: "Dati non strutturati", result: "In attesa del giudizio di un liquidatore senior" },
];

export function PriceEngineDiagram() {
  return (
    <Figure label="Un preventivo di un fornitore testato dal motore dei prezzi, poi approvato automaticamente, segnalato con il suo delta o messo in attesa del giudizio senior">
      <div className={`${node} mx-auto max-w-xs`}>Preventivo del fornitore: voci</div>
      <Stem />
      <div className={`${focal} mx-auto max-w-md`}>
        <div>Motore dei prezzi agentico: modelli di distribuzione regionali</div>
        <div className="text-sm font-normal opacity-90">
          (Test empirico della varianza per settore &amp; codice postale)
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
