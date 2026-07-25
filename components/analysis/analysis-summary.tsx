import { InfoIcon } from "@/components/icons/icons";
import { Panel } from "@/components/panels/panel";

type AnalysisSummaryProps = {
  items: readonly string[];
};

export function AnalysisSummary({ items }: AnalysisSummaryProps) {
  return (
    <Panel contentClassName="p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[9px] font-semibold tracking-[0.11em] text-text-secondary uppercase">
            Stored demo output
          </p>
          <h2 className="mt-1 text-[19px] leading-tight font-bold tracking-[-0.03em]">
            AI analysis summary
          </h2>
        </div>
        <InfoIcon className="mt-0.5 size-4 shrink-0 text-text-secondary" />
      </div>

      <ul className="mt-5 space-y-4">
        {items.map((item) => (
          <li
            key={item}
            className="grid grid-cols-[6px_1fr] gap-3 text-[11px] leading-[1.7]"
          >
            <span
              className="mt-[0.55rem] size-1.5 rounded-full bg-text-primary"
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
