import { cn } from "@/lib/utils";
import { EDGE, INK, type Outcome } from "./marks";
import { SceneCard } from "./SceneCard";

export type ClaimLine = { description: string; quantity: string; claimed: string; covered: string };

export type ClaimSceneData = {
  alt: string;
  title: string;
  reference: string;
  columns: { description: string; quantity: string; claimed: string; covered: string };
  groups: { kind: Outcome; label: string; total: string; lines: ClaimLine[] }[];
  deductibleLabel: string;
  deductible: string;
  payoutLabel: string;
  payout: string;
};

const GRID = "grid grid-cols-[18px_minmax(0,1fr)_64px_70px] gap-x-2.5 sm:grid-cols-[22px_minmax(0,1fr)_74px_78px_78px] sm:gap-x-3";
const CELL = "min-w-0 self-center border-b border-hairline py-2";
const NUM = "whitespace-nowrap text-right tabular-nums";

/** A claim as the adjuster sees it: the lines grouped by outcome, each with its covered amount, and the payout. */
export function ClaimScene({ data, hero }: { data: ClaimSceneData; hero?: boolean }) {
  // Line numbers run across the groups, as the product counts them.
  const starts = data.groups.reduce<number[]>((acc, group, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + data.groups[i - 1].lines.length);
    return acc;
  }, []);
  return (
    <SceneCard alt={data.alt} hero={hero} className="border-l-4 border-approved-base">
      <div className="flex items-center gap-3 border-b border-hairline bg-surface-muted px-3.5 py-3">
        <div>
          <p className="font-display text-[15px] font-semibold leading-[1.2] text-strong">{data.title}</p>
          <p className="mt-1 text-[11.5px] tabular-nums text-subtle">{data.reference}</p>
        </div>
      </div>
      <div className={cn(GRID, "px-3.5 pb-1.5 pt-1")}>
        <span className={cn(CELL, "text-[11px] font-medium text-muted")}>#</span>
        <span className={cn(CELL, "text-[11px] font-medium text-muted")}>{data.columns.description}</span>
        <span className={cn(CELL, NUM, "hidden text-[11px] font-medium text-muted sm:block")}>{data.columns.quantity}</span>
        <span className={cn(CELL, NUM, "text-[11px] font-medium text-muted")}>{data.columns.claimed}</span>
        <span className={cn(CELL, NUM, "text-[11px] font-medium text-muted")}>{data.columns.covered}</span>
        {data.groups.map((group, i) => (
          <Group key={group.label} group={group} start={starts[i]} />
        ))}
      </div>
      <div className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1.5 border-t border-hairline bg-page px-3.5 py-3.5">
        <span className="text-muted">{data.deductibleLabel}</span>
        <span className="text-right font-medium tabular-nums text-strong">{data.deductible}</span>
        <span className="pt-1 font-display text-[20px] font-semibold leading-[1.1] text-strong">{data.payoutLabel}</span>
        <span className="pt-1 text-right font-display text-[20px] font-semibold leading-[1.1] tabular-nums text-strong">
          {data.payout}
        </span>
      </div>
    </SceneCard>
  );
}

function Group({ group, start }: { group: ClaimSceneData["groups"][number]; start: number }) {
  return (
    <>
      <span
        className={cn(
          "col-span-full mt-2 flex items-center justify-between border-l-[3px] bg-surface-muted px-2.5 py-[7px] text-[12px] font-semibold",
          EDGE[group.kind],
          INK[group.kind],
        )}
      >
        <span>
          {group.label} <span className="font-normal text-muted">({group.lines.length})</span>
        </span>
        <span className="tabular-nums">{group.total}</span>
      </span>
      {group.lines.map((line, offset) => (
        <Line key={line.description} line={line} kind={group.kind} number={start + offset + 1} />
      ))}
    </>
  );
}

function Line({ line, kind, number }: { line: ClaimLine; kind: Outcome; number: number }) {
  return (
    <>
      <span className={cn(CELL, "text-[11px] text-subtle")}>{number}</span>
      <span className={cn(CELL, "truncate font-medium text-strong")}>{line.description}</span>
      <span className={cn(CELL, NUM, "hidden text-[11.5px] text-subtle sm:block")}>{line.quantity}</span>
      <span className={cn(CELL, NUM, "text-strong")}>{line.claimed}</span>
      <span className={cn(CELL, NUM, kind === "approved" ? "text-strong" : INK[kind])}>{line.covered}</span>
    </>
  );
}
