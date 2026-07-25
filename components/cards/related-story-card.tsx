import Link from "next/link";

import { ArticleArtwork } from "@/components/media/article-artwork";
import type { HomepageArticle } from "@/lib/data/homepage";

type RelatedStoryCardProps = {
  article: HomepageArticle;
};

export function RelatedStoryCard({ article }: RelatedStoryCardProps) {
  return (
    <article className="group min-w-0">
      <Link
        href={`/news/${article.id}`}
        className="grid min-h-28 grid-cols-[112px_1fr] overflow-hidden rounded-[var(--radius-medium)] border border-border bg-surface shadow-[var(--shadow-small)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-medium)] sm:grid-cols-[128px_1fr]"
      >
        <span className="min-h-full overflow-hidden bg-text-primary">
          <ArticleArtwork variant={article.artworkVariant} />
        </span>
        <span className="flex min-w-0 flex-col p-3">
          <span className="text-[8px] leading-[1.4] font-medium text-text-secondary">
            {article.topic} <span aria-hidden="true">·</span> {article.region}
          </span>
          <span className="mt-1.5 text-[12px] leading-[1.35] font-semibold tracking-[-0.02em] group-hover:underline">
            {article.title}
          </span>
          <span className="mt-auto pt-2 text-[8px] text-text-muted">
            {article.publishedAt} <span aria-hidden="true">·</span>{" "}
            {article.readingTime}
          </span>
        </span>
      </Link>
    </article>
  );
}
