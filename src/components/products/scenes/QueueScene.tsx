import { cn } from "@/lib/utils";
import { HexDot } from "./marks";
import { SceneCard } from "./SceneCard";

export type QueueStatus = "open" | "referred" | "approved" | "closed";

export type QueueSceneData = {
  alt: string;
  title: string;
  subtitle: string;
  tabs: string[];
  columns: { claim: string; status: string; sla: string };
  rows: { reference: string; kind: string; status: QueueStatus; label: string; sla: string }[];
  totalLabel: string;
  showingLabel: string;
};

const PILL: Record<QueueStatus, string> = {
  open: "bg-ta-blue-100 text-ta-blue-700",
  referred: "bg-referred-light text-referred-dark",
  approved: "bg-approved-light text-approved-dark",
  closed: "bg-surface-muted text-muted",
};

const ROW = "grid grid-cols-[minmax(0,1fr)_112px_40px] items-center gap-3 border-b border-black/5 px-3.5";

/** A claims work queue: each open claim with its status and the time left to its service level. */
export function QueueScene({ data, hero }: { data: QueueSceneData; hero?: boolean }) {
  return (
    <SceneCard alt={data.alt} hero={hero}>
      <div className="flex flex-wrap items-center gap-3 border-b border-hairline bg-surface-muted px-3.5 py-3">
        <HexDot className="h-3.5 w-3.5" />
        <div className="min-w-0 flex-1">
          <p className="font-display text-[15px] font-semibold leading-[1.2] text-strong">{data.title}</p>
          <p className="mt-1 text-[11.5px] text-subtle">{data.subtitle}</p>
        </div>
        <div className="inline-flex rounded-pill bg-white p-[3px] shadow-[inset_0_0_0_1px_var(--border-hairline)]">
          {data.tabs.map((tab, index) => (
            <span
              key={tab}
              className={cn(
                "rounded-pill px-2.5 py-[6px] text-[11.5px] font-medium leading-none",
                index === 0 ? "bg-accent text-on-brand" : "text-muted",
              )}
            >
              {tab}
            </span>
          ))}
        </div>
      </div>
      <div className="py-1">
        <p className={cn(ROW, "pb-2 pt-3 text-[10.5px] font-medium uppercase tracking-[.12em] text-subtle")}>
          <span>{data.columns.claim}</span>
          <span>{data.columns.status}</span>
          <span className="text-right">{data.columns.sla}</span>
        </p>
        {data.rows.map((row) => (
          <p key={row.reference} className={cn(ROW, "py-2.5 last:border-b-0")}>
            <span className="min-w-0">
              <span className="block font-medium tabular-nums text-strong">{row.reference}</span>
              <span className="block text-[11.5px] text-subtle">{row.kind}</span>
            </span>
            <span>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1.5 text-[11.5px] font-medium leading-none before:h-1.5 before:w-1.5 before:rounded-full before:bg-current before:content-['']",
                  PILL[row.status],
                )}
              >
                {row.label}
              </span>
            </span>
            <span className="text-right text-[12px] tabular-nums text-subtle">{row.sla}</span>
          </p>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-hairline bg-page px-3.5 py-3 text-[12px]">
        <span className="text-muted">{data.totalLabel}</span>
        <span className="font-medium text-strong">{data.showingLabel}</span>
      </div>
    </SceneCard>
  );
}
