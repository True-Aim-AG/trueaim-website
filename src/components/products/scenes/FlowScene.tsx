import { HexCheck, HexDot } from "./marks";
import { SceneCard } from "./SceneCard";

export type FlowSceneData = {
  alt: string;
  channelsLabel: string;
  channels: string[];
  record: { title: string; fields: { label: string; value: string }[]; status: string };
  partiesLabel: string;
  parties: { name: string; text: string }[];
};

const LAB = "mb-3 text-[10.5px] font-medium uppercase tracking-[.12em] text-subtle";

/** Claims arrive on four channels, merge into one record, and every party is updated from it. */
export function FlowScene({ data }: { data: FlowSceneData }) {
  return (
    <SceneCard alt={data.alt}>
      <div className="grid items-center gap-3.5 p-3.5 sm:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)_minmax(0,1.15fr)] sm:gap-[18px]">
        <div>
          <p className={LAB}>{data.channelsLabel}</p>
          {data.channels.map((channel) => (
            <div
              key={channel}
              className="relative mt-1.5 flex items-center gap-2 bg-page px-2.5 py-[9px] font-medium text-strong shadow-[0_0_0_1px_rgba(44,43,42,.06)] sm:after:absolute sm:after:left-full sm:after:top-1/2 sm:after:h-[1.5px] sm:after:w-[18px] sm:after:bg-ta-blue-200 sm:after:content-['']"
            >
              <HexDot className="h-3 w-3" />
              <span>{channel}</span>
            </div>
          ))}
        </div>
        <div className="bg-white p-3.5 shadow-[0_0_0_1.5px_var(--accent),0_12px_30px_-14px_rgba(81,81,219,.35)]">
          <p className="mb-2.5 font-display text-[14px] font-semibold leading-[1.2] text-strong">{data.record.title}</p>
          {data.record.fields.map((field) => (
            <p key={field.label} className="flex justify-between gap-2.5 border-t border-black/5 py-1.5 text-[12px]">
              <span className="text-subtle">{field.label}</span>
              <span className="text-right font-semibold text-strong">{field.value}</span>
            </p>
          ))}
          <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-pill bg-ta-blue-100 px-2.5 py-1.5 text-[11.5px] font-medium leading-none text-ta-blue-700 before:h-1.5 before:w-1.5 before:rounded-full before:bg-current before:content-['']">
            {data.record.status}
          </span>
        </div>
        <div>
          <p className={LAB}>{data.partiesLabel}</p>
          {data.parties.map((party) => (
            <div
              key={party.name}
              className="relative flex items-start gap-2.5 border-t border-black/5 py-2 pl-3.5 first-of-type:border-t-0 sm:before:absolute sm:before:-left-[18px] sm:before:top-1/2 sm:before:h-[1.5px] sm:before:w-3.5 sm:before:bg-ta-blue-200 sm:before:content-['']"
            >
              <HexCheck className="h-[18px] w-[18px]" />
              <div>
                <p className="text-[12.5px] font-semibold text-strong">{party.name}</p>
                <p className="mt-px text-[11.5px] text-muted">{party.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SceneCard>
  );
}
