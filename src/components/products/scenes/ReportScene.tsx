import { BrandIcon } from "@/components/brand/BrandIcon";
import { HexCheck, HexDot } from "./marks";
import { SceneCard } from "./SceneCard";

export type ReportSceneData = {
  alt: string;
  photosLabel: string;
  files: { name: string; meta: string }[];
  title: string;
  subtitle: string;
  lines: { item: string; quantity: string; amount: string }[];
  estimateLabel: string;
  estimate: string;
};

/** Photographs received on one side, the priced damage report and scope of work on the other. */
export function ReportScene({ data, hero }: { data: ReportSceneData; hero?: boolean }) {
  return (
    <SceneCard alt={data.alt} hero={hero}>
      <div className="grid sm:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]">
        <div className="border-b border-hairline bg-page px-3.5 py-3.5 sm:border-b-0 sm:border-r">
          <p className="mb-2 text-[10.5px] font-medium uppercase tracking-[.12em] text-subtle">{data.photosLabel}</p>
          <ul className="grid grid-cols-2 gap-x-4 sm:block">
            {data.files.map((file) => (
              <li key={file.name} className="flex items-center gap-2.5 border-t border-black/5 py-[9px]">
                <BrandIcon name="document" size={26} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[12px] font-medium leading-[1.3] text-strong">{file.name}</span>
                  <span className="block text-[11px] text-subtle">{file.meta}</span>
                </span>
                <HexCheck className="h-[18px] w-[18px]" />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="flex items-center gap-3 border-b border-hairline px-3.5 py-3.5">
            <HexDot className="h-[18px] w-[18px]" />
            <div>
              <p className="font-display text-[15px] font-semibold leading-[1.2] text-strong">{data.title}</p>
              <p className="mt-0.5 text-[12px] text-subtle">{data.subtitle}</p>
            </div>
          </div>
          <ul className="py-1">
            {data.lines.map((line) => (
              <li
                key={line.item}
                className="grid grid-cols-[minmax(0,1fr)_60px_64px] items-center gap-2.5 border-b border-black/5 px-3.5 py-2.5 last:border-b-0"
              >
                <span className="truncate font-medium text-strong">{line.item}</span>
                <span className="text-[11.5px] text-subtle">{line.quantity}</span>
                <span className="whitespace-nowrap text-right font-medium tabular-nums text-strong">{line.amount}</span>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 border-t border-hairline bg-page px-3.5 py-3.5">
            <span className="font-display text-[20px] font-semibold leading-[1.1] text-strong">{data.estimateLabel}</span>
            <span className="text-right font-display text-[20px] font-semibold leading-[1.1] tabular-nums text-strong">
              {data.estimate}
            </span>
          </div>
        </div>
      </div>
    </SceneCard>
  );
}
