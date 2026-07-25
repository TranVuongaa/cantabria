import Link from "next/link";

const navigation = [
  { href: "/#top-stories", label: "Top stories" },
  { href: "/#world", label: "World" },
  { href: "/#technology", label: "Technology" },
  { href: "/#climate", label: "Climate" },
] as const;

export function TopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface shadow-[var(--shadow-small)]">
      <div className="mx-auto flex min-h-[72px] w-full max-w-[1200px] flex-wrap items-center gap-x-8 px-4 py-3 sm:px-6 lg:flex-nowrap">
        <Link
          href="/"
          className="inline-flex min-h-11 shrink-0 items-center gap-3 rounded-[var(--radius-small)]"
          aria-label="CANTABRIA home"
        >
          <span className="text-[24px] leading-none font-bold tracking-[-0.055em] sm:text-[27px]">
            CANTABRIA
          </span>
          <span className="hidden border-l border-border pl-3 text-[9px] leading-[1.35] font-semibold tracking-[0.14em] text-text-secondary uppercase sm:block">
            News
            <br />
            intelligence
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="order-3 -mx-1 mt-2 flex w-[calc(100%+0.5rem)] items-center gap-1 overflow-x-auto px-1 lg:order-none lg:mt-0 lg:w-auto lg:flex-1 lg:justify-center"
        >
          {navigation.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "inline-flex min-h-11 shrink-0 items-center rounded-[var(--radius-small)] px-3 text-[11px] font-medium transition-colors hover:bg-canvas",
                index === 0 ? "bg-surface-secondary" : "",
              ].join(" ")}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#analysis-principles"
          className="ml-auto inline-flex min-h-11 shrink-0 items-center justify-center rounded-[var(--radius-small)] border border-text-primary bg-text-primary px-4 text-[10px] font-semibold text-surface transition-colors hover:border-[#494949] hover:bg-[#494949]"
        >
          Methodology
        </Link>
      </div>
    </header>
  );
}
