import Link from "next/link";
import type { ReactNode } from "react";

type AuthPageShellProps = {
  children: ReactNode;
  description: string;
  eyebrow: string;
  title: string;
};

export function AuthPageShell({
  children,
  description,
  eyebrow,
  title,
}: AuthPageShellProps) {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 sm:py-14">
      <section
        aria-labelledby="auth-page-title"
        className="grid w-full max-w-[960px] border border-border bg-surface shadow-[var(--shadow-medium)] lg:grid-cols-[minmax(0,0.85fr)_minmax(400px,1fr)]"
      >
        <div className="flex flex-col justify-between bg-text-primary p-6 text-surface sm:p-10 lg:min-h-[600px]">
          <Link
            href="/"
            className="inline-flex min-h-11 w-fit items-center rounded-[var(--radius-small)] text-[24px] leading-none font-bold tracking-[-0.055em]"
            aria-label="CANTABRIA home"
          >
            CANTABRIA
          </Link>

          <div className="my-12 max-w-[34rem] lg:my-16">
            <p className="text-[9px] font-semibold tracking-[0.14em] text-[#c9c9c4] uppercase">
              {eyebrow}
            </p>
            <h1
              id="auth-page-title"
              className="mt-3 text-[clamp(1.8rem,5vw,2.7rem)] leading-[1.1] font-bold tracking-[-0.05em]"
            >
              {title}
            </h1>
            <p className="mt-5 max-w-[44ch] text-[13px] leading-[1.75] text-[#deded9]">
              {description}
            </p>
          </div>

          <p className="text-[9px] leading-[1.7] text-[#b9b9b4]">
            News browsing remains open to everyone.
          </p>
        </div>

        <div className="flex min-w-0 items-center justify-center bg-canvas px-3 py-8 sm:px-8 sm:py-12">
          {children}
        </div>
      </section>
    </main>
  );
}
