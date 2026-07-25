import type { HTMLAttributes, ReactNode } from "react";

type PanelProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  contentClassName?: string;
  title?: string;
  titleId?: string;
};

function joinClassNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function Panel({
  children,
  className,
  contentClassName,
  title,
  titleId,
  ...props
}: PanelProps) {
  return (
    <section
      aria-labelledby={title && titleId ? titleId : undefined}
      className={joinClassNames(
        "min-w-0 overflow-hidden rounded-[var(--radius-medium)] border border-border bg-surface shadow-[var(--shadow-small)]",
        className,
      )}
      {...props}
    >
      {title ? (
        <div className="flex min-h-9 items-center border-b border-border bg-surface-secondary px-4 py-2">
          <h2
            id={titleId}
            className="text-[11px] leading-[1.4] font-semibold tracking-[0.06em] uppercase"
          >
            {title}
          </h2>
        </div>
      ) : null}
      <div className={contentClassName}>{children}</div>
    </section>
  );
}
