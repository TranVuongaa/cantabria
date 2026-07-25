import { InfoIcon } from "@/components/icons/icons";
import { Panel } from "@/components/panels/panel";
import type {
  SourceBiasLabel,
  SourceBreakdownEntry,
} from "@/lib/data/articles";

type SourceBreakdownProps = {
  sources: readonly SourceBreakdownEntry[];
};

type DistributionItem = {
  count: number;
  label: SourceBiasLabel;
  percentage: number;
};

const labels = ["Left", "Center", "Right"] as const;

const fillStyles = {
  Center: "bg-framing-center",
  Left: "bg-framing-left",
  Right: "bg-framing-right",
} satisfies Record<SourceBiasLabel, string>;

const labelStyles = {
  Center: "text-framing-center-text",
  Left: "text-framing-left-text",
  Right: "text-framing-right-text",
} satisfies Record<SourceBiasLabel, string>;

function getDistribution(
  sources: readonly SourceBreakdownEntry[],
): DistributionItem[] {
  const counts = labels.map((label) => ({
    count: sources.filter((source) => source.label === label).length,
    label,
  }));

  if (sources.length === 0) {
    return counts.map((item) => ({ ...item, percentage: 0 }));
  }

  const leftPercentage =
    Math.round((counts[0].count / sources.length) * 1000) / 10;
  const centerPercentage =
    Math.round((counts[1].count / sources.length) * 1000) / 10;
  const rightPercentage =
    Math.round((100 - leftPercentage - centerPercentage) * 10) / 10;
  const percentages = [leftPercentage, centerPercentage, rightPercentage];

  return counts.map((item, index) => ({
    ...item,
    percentage: percentages[index],
  }));
}

function formatPercentage(value: number) {
  return Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1);
}

export function SourceBreakdown({ sources }: SourceBreakdownProps) {
  const distribution = getDistribution(sources);
  const accessibleSummary = distribution
    .map(
      (item) =>
        `${item.label} ${item.count} sources, ${formatPercentage(item.percentage)} percent`,
    )
    .join("; ");

  return (
    <Panel contentClassName="p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[9px] font-semibold tracking-[0.11em] text-text-secondary uppercase">
            Illustrative demo cohort
          </p>
          <h2 className="mt-1 text-[19px] leading-tight font-bold tracking-[-0.03em]">
            Source breakdown
          </h2>
          <p className="mt-2 text-[10px] font-semibold text-text-secondary">
            {sources.length} total sources
          </p>
        </div>
        <InfoIcon className="mt-0.5 size-4 shrink-0 text-text-secondary" />
      </div>

      <section
        className="mt-5 space-y-3"
        aria-label={`Demo source bias distribution: ${accessibleSummary}`}
      >
        {distribution.map((item) => (
          <div key={item.label}>
            <div className="grid grid-cols-[42px_1fr_auto] items-center gap-3 text-[9px]">
              <span className="font-medium">{item.label}</span>
              <div
                className="h-1.5 overflow-hidden rounded-[var(--radius-full)] bg-surface-secondary"
                aria-hidden="true"
              >
                <div
                  className={`h-full rounded-[var(--radius-full)] ${fillStyles[item.label]}`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <span className="min-w-14 text-right text-text-secondary">
                {item.count} ({formatPercentage(item.percentage)}%)
              </span>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-6 border-t border-divider pt-5">
        <div className="grid grid-cols-[1fr_auto] gap-4 text-[8px] font-semibold tracking-[0.08em] text-text-muted uppercase">
          <span>Demo publication</span>
          <span>Bias</span>
        </div>
        <ul className="mt-3 divide-y divide-divider">
          {sources.map((source) => (
            <li
              key={source.id}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-2.5 text-[10px]"
            >
              <span className="min-w-0 font-medium">{source.name}</span>
              <span
                className={`font-semibold ${labelStyles[source.label]}`}
              >
                {source.label}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-5 rounded-[var(--radius-small)] border border-border bg-surface-secondary p-3 text-[9px] leading-[1.65] text-text-secondary">
        These publication names and their bias distribution are fictional demo
        data for this interface. They are not reporting citations.
      </p>
    </Panel>
  );
}
