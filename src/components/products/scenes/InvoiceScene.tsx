import { cn } from "@/lib/utils";
import { BAR, HexCheck, type Outcome } from "./marks";
import { SceneCard } from "./SceneCard";

export type InvoiceSceneData = {
  alt: string;
  title: string;
  subtitle: string;
  count: string;
  lines: { kind: Outcome; description: string; amount: string }[];
  totalLabel: string;
  total: string;
  summaryLabel: string;
  action: { title: string; text: string; saveLabel: string; save: string };
  rows: { kind: Outcome; label: string; count: string }[];
};

/** An invoice with every line coloured against the benchmark, and the reissue request drafted for the line that is too high. */
export function InvoiceScene({ data, hero }: { data: InvoiceSceneData; hero?: boolean }) {
  return (
    <SceneCard alt={data.alt} hero={hero}>
      <div className="grid sm:grid-cols-[1.15fr_1fr]">
        <div className="border-b border-hairline px-3.5 py-3.5 sm:border-b-0 sm:border-r">
          <div className="flex items-center justify-between gap-2.5 border-b border-hairline pb-2.5">
            <div>
              <p className="font-display text-[14px] font-semibold leading-[1.2] text-strong">{data.title}</p>
              <p className="mt-1 text-[11.5px] text-subtle">{data.subtitle}</p>
            </div>
            <span className="text-[11px] tabular-nums text-subtle">{data.count}</span>
          </div>
          <ul>
            {data.lines.map((line) => (
              <li
                key={line.description}
                className={cn(
                  "grid grid-cols-[6px_minmax(0,1fr)_auto] items-center gap-2.5 border-b border-black/5 py-[9px]",
                  line.kind === "denied" && "-mx-3.5 bg-[rgba(233,65,25,.06)] px-3.5",
                )}
              >
                <span aria-hidden className={cn("h-[22px] w-1.5 rounded-[3px]", BAR[line.kind])} />
                <span className="truncate font-medium text-strong">{line.description}</span>
                <span className="whitespace-nowrap text-right font-medium tabular-nums text-strong">{line.amount}</span>
              </li>
            ))}
          </ul>
          <p className="flex justify-between pt-2.5 text-muted">
            <span>{data.totalLabel}</span>
            <span className="font-semibold tabular-nums text-strong">{data.total}</span>
          </p>
        </div>
        <div className="flex flex-col gap-1.5 px-3.5 py-3.5">
          <p className="mb-1 text-[10.5px] font-medium uppercase tracking-[.12em] text-subtle">{data.summaryLabel}</p>
          <div className="relative mb-2 rounded-[8px] border-l-[3px] border-denied-base bg-white p-3 pr-10 shadow-[0_0_0_1px_rgba(44,43,42,.08),var(--shadow-card)]">
            <p className="font-display text-[13.5px] font-semibold leading-[1.2] text-strong">{data.action.title}</p>
            <p className="mt-1 text-[11.5px] text-muted">{data.action.text}</p>
            <p className="mt-2.5 flex items-baseline gap-2">
              <span className="text-[12px] text-muted">{data.action.saveLabel}</span>
              <span className="font-display text-[26px] font-semibold leading-none tabular-nums text-approved-dark">
                {data.action.save}
              </span>
            </p>
            <HexCheck className="absolute right-3 top-3 h-[22px] w-[22px]" />
          </div>
          <ul>
            {data.rows.map((row) => (
              <li key={row.label} className="flex items-center gap-2.5 border-b border-black/5 py-2 last:border-b-0">
                <span aria-hidden className={cn("h-2 w-2 rounded-full", BAR[row.kind])} />
                <span>{row.label}</span>
                <span className="ml-auto font-medium tabular-nums text-strong">{row.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SceneCard>
  );
}
