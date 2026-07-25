import Link from "next/link";

import { BiasMeter } from "@/components/analysis/bias-meter";
import { InfoIcon } from "@/components/icons/icons";
import { Panel } from "@/components/panels/panel";
import type {
  FramingLabel,
  SentimentLabel,
} from "@/lib/data/homepage";

type AnalysisOverviewProps = {
  confidence: number;
  framing: {
    center: number;
    label: FramingLabel;
    left: number;
    right: number;
  };
  sentiment: SentimentLabel;
  sourceCount: number;
};

const framingTextStyles = {
  Center: "text-framing-center-text",
  Left: "text-framing-left-text",
  Mixed: "text-text-primary",
  Right: "text-framing-right-text",
  Unclear: "text-text-secondary",
} satisfies Record<FramingLabel, string>;

const sentimentStyles = {
  Negative: "bg-framing-left text-framing-left-text",
  Neutral: "bg-framing-center text-framing-center-text",
  Positive: "bg-framing-right text-framing-right-text",
} satisfies Record<SentimentLabel, string>;

export function AnalysisOverview({
  confidence,
  framing,
  sentiment,
  sourceCount,
}: AnalysisOverviewProps) {
  return (
    <Panel contentClassName="p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[9px] font-semibold tracking-[0.11em] text-text-secondary uppercase">
            Demo analysis
          </p>
          <h2 className="mt-1 text-[19px] leading-tight font-bold tracking-[-0.03em]">
            Bias analysis
          </h2>
        </div>
        <InfoIcon className="mt-0.5 size-4 shrink-0 text-text-secondary" />
      </div>

      <div className="mt-6 border-b border-divider pb-5">
        <p className="text-[10px] font-medium text-text-secondary">
          Overall AI-estimated bias
        </p>
        <p
          className={`mt-1 text-[28px] leading-none font-bold tracking-[-0.045em] ${framingTextStyles[framing.label]}`}
        >
          {framing.label} {Math.max(framing.left, framing.center, framing.right)}%
        </p>
        <p className="mt-2 text-[10px] text-text-secondary">
          Based on {sourceCount} illustrative demo sources
        </p>
        <p className="mt-1 text-[10px] text-text-secondary">
          {Math.round(confidence * 100)}% analysis confidence
        </p>
      </div>

      <BiasMeter
        className="mt-5"
        left={framing.left}
        center={framing.center}
        right={framing.right}
        title="AI-estimated bias"
      />

      <div className="mt-5 flex items-center justify-between gap-4 border-t border-divider pt-4">
        <span className="text-[10px] font-medium text-text-secondary">
          Language sentiment
        </span>
        <span
          className={`rounded-[var(--radius-full)] px-2.5 py-1 text-[9px] font-semibold tracking-[0.04em] uppercase ${sentimentStyles[sentiment]}`}
        >
          {sentiment}
        </span>
      </div>

      <p className="mt-5 text-[10px] leading-[1.7] text-text-secondary">
        This estimate describes patterns in the article&apos;s language and
        presentation. It is not a rating of objective political truth.
      </p>

      <Link
        href="#bias-methodology"
        className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-[var(--radius-small)] border border-text-primary bg-surface px-4 text-center text-[10px] font-semibold text-text-primary transition-colors hover:bg-canvas"
      >
        How we analyze bias
      </Link>
    </Panel>
  );
}
