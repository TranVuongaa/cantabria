import { BiasMeter, ClockIcon, InfoIcon } from "@/components/design-system";
import { ArticleArtwork } from "@/components/news/article-artwork";
import type { HomepageArticle } from "@/components/news/homepage-data";

type NewsCardProps = HomepageArticle;

const sentimentStyles = {
  Positive: "bg-framing-right text-framing-right-text",
  Neutral: "bg-framing-center text-framing-center-text",
  Negative: "bg-framing-left text-framing-left-text",
} satisfies Record<HomepageArticle["sentiment"], string>;

export function NewsCard({
  anchorId,
  artworkVariant,
  confidence,
  excerpt,
  framing,
  publishedAt,
  readingTime,
  region,
  sentiment,
  source,
  title,
  topic,
}: NewsCardProps) {
  return (
    <article
      id={anchorId}
      className="group flex h-full scroll-mt-6 flex-col overflow-hidden rounded-[var(--radius-medium)] border border-border bg-surface shadow-[var(--shadow-small)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-medium)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-text-primary">
        <ArticleArtwork variant={artworkVariant} />
        <span className="absolute top-3 right-3 grid size-7 place-items-center rounded-full border border-white/40 bg-text-primary/70 text-white">
          <InfoIcon className="size-4" />
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-4">
        <p className="text-[9px] leading-[1.4] font-medium text-text-secondary">
          {topic} <span aria-hidden="true">·</span> {region}
        </p>
        <h2 className="mt-2 text-[16px] leading-[1.35] font-semibold tracking-[-0.025em]">
          {title}
        </h2>
        <p className="mt-2 line-clamp-2 text-[10px] leading-[1.6] text-text-secondary">
          {excerpt}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span
            className={`rounded-[var(--radius-full)] px-2 py-1 text-[8px] font-semibold tracking-[0.04em] uppercase ${sentimentStyles[sentiment]}`}
          >
            {sentiment} sentiment
          </span>
          <span className="rounded-[var(--radius-full)] border border-border bg-canvas px-2 py-1 text-[8px] font-semibold tracking-[0.04em] uppercase">
            {framing.label} framing
          </span>
        </div>

        <BiasMeter
          className="mt-4"
          compact
          left={framing.left}
          center={framing.center}
          right={framing.right}
        />

        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-divider pt-3 text-[8px] text-text-secondary">
          <span className="font-medium text-text-primary">
            {Math.round(confidence * 100)}% confidence
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ClockIcon className="size-3.5" />
            {publishedAt}
          </span>
          <span>{readingTime}</span>
        </div>
        <p className="mt-2 text-[8px] leading-[1.4] text-text-muted">{source}</p>
      </div>
    </article>
  );
}
