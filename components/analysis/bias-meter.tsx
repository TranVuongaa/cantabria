type BiasMeterProps = {
  center: number;
  className?: string;
  compact?: boolean;
  left: number;
  right: number;
};

type NormalizedFraming = {
  center: number;
  left: number;
  right: number;
};

function sanitize(value: number) {
  return Number.isFinite(value) ? Math.max(0, value) : 0;
}

function normalizeFraming(
  leftValue: number,
  centerValue: number,
  rightValue: number,
): NormalizedFraming {
  const left = sanitize(leftValue);
  const center = sanitize(centerValue);
  const right = sanitize(rightValue);
  const total = left + center + right;

  if (total === 0) {
    return { left: 0, center: 100, right: 0 };
  }

  const normalizedLeft = Math.round((left / total) * 1000) / 10;
  const normalizedCenter = Math.round((center / total) * 1000) / 10;
  const normalizedRight =
    Math.round((100 - normalizedLeft - normalizedCenter) * 10) / 10;

  return {
    left: normalizedLeft,
    center: normalizedCenter,
    right: normalizedRight,
  };
}

function formatPercentage(value: number) {
  return Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1);
}

export function BiasMeter({
  center,
  className,
  compact = false,
  left,
  right,
}: BiasMeterProps) {
  const framing = normalizeFraming(left, center, right);
  const label = `AI-estimated framing: left ${formatPercentage(
    framing.left,
  )} percent, center ${formatPercentage(
    framing.center,
  )} percent, right ${formatPercentage(framing.right)} percent`;

  return (
    <figure className={className} aria-label={label}>
      <figcaption
        className={`font-semibold tracking-[0.08em] uppercase ${
          compact ? "mb-2 text-[9px]" : "mb-3 text-[11px]"
        }`}
      >
        AI-estimated framing
      </figcaption>
      <div
        className={`flex w-full overflow-hidden rounded-[var(--radius-small)] border border-border ${
          compact ? "h-7" : "h-9"
        }`}
        aria-hidden="true"
      >
        <div
          className="flex min-w-0 items-center justify-center bg-framing-left px-1 text-framing-left-text"
          style={{ width: `${framing.left}%` }}
        >
          {!compact && framing.left >= 15 ? (
            <span className={compact ? "text-[8px] font-medium" : "text-[9px] font-medium"}>
              Left {formatPercentage(framing.left)}%
            </span>
          ) : null}
        </div>
        <div
          className="flex min-w-0 items-center justify-center bg-framing-center px-1 text-framing-center-text"
          style={{ width: `${framing.center}%` }}
        >
          {!compact && framing.center >= 15 ? (
            <span className={compact ? "text-[8px] font-medium" : "text-[9px] font-medium"}>
              Center {formatPercentage(framing.center)}%
            </span>
          ) : null}
        </div>
        <div
          className="flex min-w-0 items-center justify-center bg-framing-right px-1 text-framing-right-text"
          style={{ width: `${framing.right}%` }}
        >
          {!compact && framing.right >= 15 ? (
            <span className={compact ? "text-[8px] font-medium" : "text-[9px] font-medium"}>
              Right {formatPercentage(framing.right)}%
            </span>
          ) : null}
        </div>
      </div>
      <div
        className={`mt-2 grid grid-cols-3 gap-2 text-text-secondary ${
          compact ? "text-[8px]" : "text-[9px]"
        }`}
      >
        <span>Left {formatPercentage(framing.left)}%</span>
        <span className="text-center">Center {formatPercentage(framing.center)}%</span>
        <span className="text-right">Right {formatPercentage(framing.right)}%</span>
      </div>
    </figure>
  );
}
