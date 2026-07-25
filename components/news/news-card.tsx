import { BiasMeter, BookmarkIcon, ClockIcon } from "@/components/design-system";

type Framing = {
  center: number;
  left: number;
  right: number;
};

type NewsCardProps = {
  category: string;
  excerpt: string;
  framing: Framing;
  publishedAt: string;
  readingTime: string;
  source: string;
  title: string;
};

function EditorialArtwork() {
  return (
    <svg
      viewBox="0 0 320 240"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="320" height="240" fill="#333333" />
      <rect x="20" y="20" width="132" height="200" rx="10" fill="#F3EEDF" />
      <circle cx="86" cy="83" r="36" fill="#D9A58F" />
      <path d="M42 152h68M42 168h88M42 184h54" stroke="#333333" strokeWidth="8" />
      <path d="M180 42h110v64H180z" fill="#B5E3D6" />
      <path d="m180 144 42-28 68 48v56H180z" fill="#D9A58F" />
      <circle cx="269" cy="55" r="10" fill="#333333" />
      <path d="M195 76h68M195 90h42" stroke="#333333" strokeWidth="7" />
    </svg>
  );
}

export function NewsCard({
  category,
  excerpt,
  framing,
  publishedAt,
  readingTime,
  source,
  title,
}: NewsCardProps) {
  return (
    <article className="grid overflow-hidden rounded-[var(--radius-medium)] border border-border bg-surface shadow-[var(--shadow-small)] sm:grid-cols-[minmax(140px,0.9fr)_minmax(0,1.45fr)]">
      <div className="min-h-44 overflow-hidden bg-text-primary sm:min-h-full">
        <EditorialArtwork />
      </div>
      <div className="min-w-0 p-4">
        <p className="text-[9px] leading-[1.4] text-text-secondary">
          {category} · {source}
        </p>
        <h3 className="mt-2 text-base leading-[1.35] font-semibold tracking-[-0.02em]">
          {title}
        </h3>
        <p className="mt-2 text-[11px] leading-[1.6] text-text-secondary">{excerpt}</p>
        <BiasMeter
          className="mt-4"
          compact
          left={framing.left}
          center={framing.center}
          right={framing.right}
        />
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-divider pt-3 text-[9px] text-text-secondary">
          <span className="inline-flex items-center gap-1.5">
            <ClockIcon className="size-3.5" />
            {publishedAt}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BookmarkIcon className="size-3.5" />
            {readingTime}
          </span>
        </div>
      </div>
    </article>
  );
}
