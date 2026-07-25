import Link from "next/link";

import { SiteFooter } from "@/components/layout/site-footer";
import { CategoryBar } from "@/components/navigation/category-bar";
import { TopBar } from "@/components/navigation/top-bar";
import { homepageCategories } from "@/lib/data/homepage";

export default function NewsNotFound() {
  return (
    <>
      <TopBar />
      <CategoryBar categories={homepageCategories} />
      <main className="mx-auto grid w-full max-w-[1200px] flex-1 place-items-center px-4 py-20 text-center sm:px-6">
        <div className="max-w-lg">
          <p className="text-[10px] font-semibold tracking-[0.12em] text-text-secondary uppercase">
            404 · Story unavailable
          </p>
          <h1 className="mt-3 text-[clamp(2rem,7vw,3.5rem)] leading-[1.05] font-bold tracking-[-0.055em]">
            This article is not in the demo desk.
          </h1>
          <p className="mt-5 text-[13px] leading-[1.75] text-text-secondary">
            The address may be incomplete, or the story may no longer be part
            of the current CANTABRIA demonstration set.
          </p>
          <Link
            href="/#top-stories"
            className="mt-7 inline-flex min-h-11 items-center justify-center rounded-[var(--radius-small)] border border-text-primary bg-text-primary px-5 text-[11px] font-semibold text-surface transition-colors hover:bg-[#494949]"
          >
            Return to top stories
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
