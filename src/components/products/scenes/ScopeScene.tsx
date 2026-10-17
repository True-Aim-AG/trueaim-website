import { cn } from "@/lib/utils";
import { BAR, HexDot, INK, type Outcome } from "./marks";
import { SceneCard } from "./SceneCard";

export type ScopeRow = {
  trade: string;
  task: string;
  /** First day of the work, counted from day 0. */
  start: number;
  days: number;
  status: Outcome;
  quote: string;
};

export type ScopeSceneData = {
  alt: string;
  title: string;
  subtitle: string;
  columns: { trade: string; schedule: string; quote: string };
  dayLabel: string;
  totalDays: number;
  rows: ScopeRow[];
  footer: { label: string; value: string; note: string };
};

/**
 * The scope of work as a schedule: each trade on its own line with its task,
 * a bar for the days it needs placed where it falls in the sequence, and the
 * state of its quote. The companion to the report in the hero: the report
 * prices the damage, the scope says who does what, and when.
 */
export function ScopeScene({ data }: { data: ScopeSceneData }) {
  const ticks = Array.from({ length: data.totalDays + 1 }, (_, day) => day);
  return (
    <SceneCard alt={data.alt}>
      <div className="flex items-center gap-3 border-b border-hairline px-4 py-3.5 md:px-5">
        <HexDot className="h-[18px] w-[18px]" />
        <div>
          <p className="font-display text-[15px] font-semibold leading-[1.2] text-strong">{data.title}</p>
          <p className="mt-0.5 text-[12px] text-subtle">{data.subtitle}</p>
        </div>
      </div>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-0 px-4 pb-2 pt-3 text-[10.5px] font-medium uppercase tracking-[.12em] text-subtle md:grid-cols-[200px_minmax(0,1fr)_170px] md:px-5">
        <span>{data.columns.trade}</span>
        <span className="hidden md:block">{data.columns.schedule}</span>
        <span className="text-right md:text-left">{data.columns.quote}</span>
      </div>
      <ol>
        {data.rows.map((row) => {
          const left = (row.start / data.totalDays) * 100;
          const width = (row.days / data.totalDays) * 100;
          return (
            <li
              key={row.trade}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 border-t border-black/5 px-4 py-3 md:grid-cols-[200px_minmax(0,1fr)_170px] md:px-5"
            >
              <div className="min-w-0">
                <p className="truncate text-[13.5px] font-semibold text-strong">{row.trade}</p>
                <p className="truncate text-[11.5px] text-subtle">{row.task}</p>
              </div>
              <div className="relative col-span-2 hidden h-7 md:col-span-1 md:block">
                <div className="absolute inset-y-0 left-0 right-0 bg-[repeating-linear-gradient(90deg,var(--border-hairline)_0_1px,transparent_1px_10%)]" />
                <div
                  className={cn("absolute top-1/2 h-4 -translate-y-1/2 rounded-[3px] opacity-90", BAR[row.status])}
                  style={{ left: `${left}%`, width: `${width}%` }}
                />
                <span
                  className="absolute top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap text-[11px] tabular-nums text-muted"
                  style={{ left: `${left + width}%` }}
                >
                  {row.days} {data.dayLabel}
                </span>
              </div>
              <p className={cn("flex items-center justify-end gap-2 text-[12px] md:justify-start", INK[row.status])}>
                <span aria-hidden className={cn("h-2 w-2 shrink-0 rounded-full", BAR[row.status])} />
                {row.quote}
              </p>
            </li>
          );
        })}
      </ol>
      <div className="hidden grid-cols-[200px_minmax(0,1fr)_170px] gap-x-4 border-t border-black/5 px-5 pb-3 pt-2 text-[10.5px] text-subtle md:grid">
        <span />
        <div className="relative h-4">
          {ticks.map((day) => (
            <span key={day} className="absolute -translate-x-1/2 tabular-nums" style={{ left: `${(day / data.totalDays) * 100}%` }}>
              {day === 0 ? `${data.dayLabel} ${day}` : day}
            </span>
          ))}
        </div>
        <span />
      </div>
      <div className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 border-t border-hairline bg-page px-4 py-3.5 md:px-5">
        <span>
          <span className="block font-display text-[20px] font-semibold leading-[1.1] text-strong">{data.footer.label}</span>
          <span className="mt-1 block text-[12px] text-muted">{data.footer.note}</span>
        </span>
        <span className="text-right font-display text-[20px] font-semibold leading-[1.1] tabular-nums text-strong">{data.footer.value}</span>
      </div>
    </SceneCard>
  );
}
