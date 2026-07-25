import { NewsCard } from "@/components/cards/news-card";
import { SiteFooter } from "@/components/layout/site-footer";
import { CategoryBar } from "@/components/navigation/category-bar";
import { TopBar } from "@/components/navigation/top-bar";
import { homepageArticles, homepageCategories } from "@/lib/data/homepage";

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="fixed top-3 left-3 z-50 -translate-y-20 rounded-[var(--radius-small)] bg-text-primary px-4 py-3 text-[11px] font-semibold text-surface shadow-[var(--shadow-large)] transition-transform focus:translate-y-0"
      >
        Skip to main content
      </a>

      <TopBar />
      <CategoryBar categories={homepageCategories} />

      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-10 outline-none sm:px-6 sm:py-12 lg:py-14"
      >
        <section
          id="top-stories"
          className="scroll-mt-6"
          aria-labelledby="top-stories-title"
        >
          <div className="mb-7 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-[9px] font-semibold tracking-[0.12em] text-text-secondary uppercase">
                News with context
              </p>
              <h1
                id="top-stories-title"
                className="text-[clamp(1.75rem,4vw,2.25rem)] leading-[1.15] font-bold tracking-[-0.045em]"
              >
                Top stories
              </h1>
              <p className="mt-3 max-w-xl text-[12px] leading-[1.7] text-text-secondary">
                Compare sentiment, framing, and confidence before you form a view.
              </p>
            </div>
            <p className="inline-flex w-fit items-center gap-2 rounded-[var(--radius-full)] border border-border bg-surface px-3 py-2 text-[9px] font-medium text-text-secondary">
              <span
                className="size-1.5 rounded-full bg-framing-left"
                aria-hidden="true"
              />
              Demo editorial data
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {homepageArticles.map((article) => (
              <NewsCard key={article.id} {...article} />
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
