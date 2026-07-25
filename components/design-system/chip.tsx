import type { ReactNode } from "react";

type ChipProps = {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  trailingPlus?: boolean;
};

const chipStyles =
  "inline-flex min-h-8 items-center gap-2 rounded-[var(--radius-full)] border border-border bg-framing-center px-3 py-1 text-[10px] leading-[1.4] font-medium text-text-primary";

export function Chip({
  children,
  className,
  interactive = false,
  trailingPlus = false,
}: ChipProps) {
  const content = (
    <>
      <span>{children}</span>
      {trailingPlus ? (
        <span aria-hidden="true" className="text-sm leading-none text-text-secondary">
          +
        </span>
      ) : null}
    </>
  );

  if (interactive) {
    return (
      <button
        type="button"
        className={`${chipStyles} transition-colors duration-150 hover:bg-[#dadddf] active:bg-[#cdd0d4] ${className ?? ""}`}
      >
        {content}
      </button>
    );
  }

  return <span className={`${chipStyles} ${className ?? ""}`}>{content}</span>;
}
