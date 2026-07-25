import Link from "next/link";

const footerTopics = [
  { href: "/#top-stories", label: "Top stories" },
  { href: "/#world", label: "World" },
  { href: "/#technology", label: "Technology" },
  { href: "/#climate", label: "Climate" },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-text-primary text-surface">
      <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.35fr_0.8fr_1fr] lg:py-14">
        <div>
          <p className="text-2xl leading-none font-bold tracking-[-0.055em]">
            CANTABRIA
          </p>
          <p className="mt-2 text-[9px] font-semibold tracking-[0.18em] text-white/55 uppercase">
            News intelligence
          </p>
          <p className="mt-6 max-w-sm text-[12px] leading-[1.7] text-white/70">
            Balanced news coverage made clearer through transparent,
            AI-assisted sentiment and bias analysis.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="text-[10px] font-semibold tracking-[0.1em] uppercase">
            Explore
          </h2>
          <ul className="mt-4 space-y-2.5">
            {footerTopics.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-8 items-center text-[11px] text-white/70 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <section id="analysis-principles" className="scroll-mt-6">
          <h2 className="text-[10px] font-semibold tracking-[0.1em] uppercase">
            Analysis principles
          </h2>
          <ul className="mt-4 space-y-3 text-[11px] leading-[1.6] text-white/70">
            <li>Separate reporting from interpretation.</li>
            <li>Show uncertainty and confidence.</li>
            <li>Treat political bias as AI-estimated, never objective fact.</li>
          </ul>
        </section>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex min-h-14 w-full max-w-[1200px] flex-col justify-center gap-1 px-4 py-3 text-[9px] text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© 2026 CANTABRIA. Demonstration interface.</p>
          <p>Stay curious. Read the bias. Keep the nuance.</p>
        </div>
      </div>
    </footer>
  );
}
