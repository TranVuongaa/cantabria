import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AnalysisNotes } from "@/components/analysis/analysis-notes";
import { AnalysisOverview } from "@/components/analysis/analysis-overview";
import { AnalysisSummary } from "@/components/analysis/analysis-summary";
import { BiasMeter } from "@/components/analysis/bias-meter";
import { SourceBreakdown } from "@/components/analysis/source-breakdown";
import { RelatedStoryCard } from "@/components/cards/related-story-card";
import { SiteFooter } from "@/components/layout/site-footer";
import { ArticleArtwork } from "@/components/media/article-artwork";
import { CategoryBar } from "@/components/navigation/category-bar";
import { TopBar } from "@/components/navigation/top-bar";
import { getArticleById, getRelatedArticles } from "@/lib/data/articles";
import {
  homepageArticles,
  homepageCategories,
} from "@/lib/data/homepage";

type NewsDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const sentimentStyles = {
  Negative: "bg-framing-left text-framing-left-text",
  Neutral: "bg-framing-center text-framing-center-text",
  Positive: "bg-framing-right text-framing-right-text",
} as const;

export function generateStaticParams() {
  return homepageArticles.map((article) => ({ id: article.id }));
}

export async function generateMetadata({
  params,
}: NewsDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const article = getArticleById(id);

  if (!article) {
    return {
      title: "Article not found | CANTABRIA",
    };
  }

  return {
    title: `${article.title} | CANTABRIA`,
    description: article.excerpt,
  };
}

export default async function NewsDetailsPage({
  params,
}: NewsDetailsPageProps) {
  const { id } = await params;
  const article = getArticleById(id);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article.id);

  return (
    <>
      <a
        href="#main-content"
        className="fixed top-3 left-3 z-50 -translate-y-20 rounded-[var(--radius-small)] bg-text-primary px-4 py-3 text-[11px] font-semibold text-surface shadow-[var(--shadow-large)] transition-transform focus:translate-y-0"
      >
        Skip to article
      </a>

      <TopBar />
      <CategoryBar categories={homepageCategories} />

      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-8 outline-none sm:px-6 sm:py-10 lg:py-12"
      >
        <Link
          href="/#top-stories"
          className="inline-flex min-h-10 items-center rounded-[var(--radius-small)] text-[10px] font-semibold text-text-secondary transition-colors hover:text-text-primary"
        >
          <span aria-hidden="true">←</span>
          <span className="ml-2">Back to top stories</span>
        </Link>

        <div className="mt-5 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start xl:gap-10">
          <article className="min-w-0">
            <header>
              <p className="text-[10px] leading-[1.5] font-semibold text-text-secondary">
                {article.topic} <span aria-hidden="true">·</span>{" "}
                {article.region}
              </p>
              <h1 className="mt-3 max-w-[20ch] text-[clamp(1.85rem,5vw,2.8rem)] leading-[1.1] font-bold tracking-[-0.05em]">
                {article.title}
              </h1>
              <p className="mt-4 max-w-[70ch] text-[13px] leading-[1.7] text-text-secondary sm:text-[14px]">
                {article.excerpt}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[9px] text-text-secondary">
                <span>
                  By{" "}
                  <span className="font-semibold text-text-primary">
                    {article.byline}
                  </span>
                </span>
                <span aria-hidden="true" className="text-border">
                  |
                </span>
                <span>{article.source}</span>
                <span aria-hidden="true" className="text-border">
                  |
                </span>
                <time>{article.publishedDate}</time>
                <span aria-hidden="true" className="text-border">
                  |
                </span>
                <span>{article.readingTime}</span>
              </div>

              <p className="mt-4 inline-flex items-center gap-2 rounded-[var(--radius-full)] border border-border bg-surface px-3 py-1.5 text-[8px] font-semibold tracking-[0.08em] text-text-secondary uppercase">
                <span
                  className="size-1.5 rounded-full bg-framing-left"
                  aria-hidden="true"
                />
                Demo editorial article
              </p>
            </header>

            <figure className="mt-7">
              <div className="aspect-[16/9] overflow-hidden rounded-[var(--radius-medium)] border border-border bg-text-primary shadow-[var(--shadow-small)]">
                <ArticleArtwork variant={article.artworkVariant} />
              </div>
              <figcaption className="mt-2 text-[8px] leading-[1.6] text-text-muted">
                {article.heroCaption} Illustration only; not documentary
                photography.
              </figcaption>
            </figure>

            <section
              aria-labelledby="bias-distribution-title"
              className="mt-7 rounded-[var(--radius-medium)] border border-border bg-surface p-5 shadow-[var(--shadow-small)] sm:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[9px] font-semibold tracking-[0.1em] text-text-secondary uppercase">
                    Article-level signal
                  </p>
                  <h2
                    id="bias-distribution-title"
                    className="mt-1 text-[16px] font-bold tracking-[-0.025em]"
                  >
                    Bias distribution
                  </h2>
                </div>
                <span
                  className={`rounded-[var(--radius-full)] px-2.5 py-1 text-[9px] font-semibold tracking-[0.04em] uppercase ${sentimentStyles[article.sentiment]}`}
                >
                  {article.sentiment} sentiment
                </span>
              </div>

              <BiasMeter
                className="mt-5"
                left={article.framing.left}
                center={article.framing.center}
                right={article.framing.right}
                title="AI-estimated bias"
              />

              <div className="mt-5 flex flex-wrap justify-between gap-3 border-t border-divider pt-4 text-[9px] text-text-secondary">
                <span>
                  Strongest signal:{" "}
                  <strong className="text-text-primary">
                    {article.framing.label}
                  </strong>
                </span>
                <span>
                  <strong className="text-text-primary">
                    {Math.round(article.confidence * 100)}%
                  </strong>{" "}
                  confidence
                </span>
              </div>
            </section>

            <section
              aria-labelledby="article-body-title"
              className="mt-8 max-w-[74ch]"
            >
              <h2 id="article-body-title" className="sr-only">
                Article
              </h2>
              <div className="space-y-5 text-[15px] leading-[1.82] tracking-[-0.01em] sm:text-[16px]">
                {article.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section
              aria-labelledby="related-stories-title"
              className="mt-10 border-t border-border pt-8"
            >
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-[9px] font-semibold tracking-[0.1em] text-text-secondary uppercase">
                    Continue reading
                  </p>
                  <h2
                    id="related-stories-title"
                    className="mt-1 text-[20px] font-bold tracking-[-0.035em]"
                  >
                    Related stories
                  </h2>
                </div>
                <Link
                  href="/#top-stories"
                  className="inline-flex min-h-9 items-center rounded-[var(--radius-small)] text-[9px] font-semibold text-text-secondary hover:text-text-primary"
                >
                  View all stories
                </Link>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {relatedArticles.map((relatedArticle) => (
                  <RelatedStoryCard
                    key={relatedArticle.id}
                    article={relatedArticle}
                  />
                ))}
              </div>
            </section>
          </article>

          <aside aria-label="Article analysis" className="min-w-0">
            <div className="space-y-5 lg:sticky lg:top-[104px]">
              <AnalysisOverview
                confidence={article.confidence}
                framing={article.framing}
                sentiment={article.sentiment}
                sourceCount={article.sourceBreakdown.length}
              />
              <AnalysisSummary items={article.analysisSummary} />
              <AnalysisNotes
                framingNotes={article.framingNotes}
                loadedTerms={article.loadedTerms}
                disclaimer={article.disclaimer}
              />
              <SourceBreakdown sources={article.sourceBreakdown} />
            </div>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
