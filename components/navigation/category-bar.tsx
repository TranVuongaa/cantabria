import { Chip } from "@/components/chips/chip";

type CategoryBarProps = {
  categories: readonly string[];
};

export function CategoryBar({ categories }: CategoryBarProps) {
  return (
    <section
      aria-label="News categories"
      className="border-b border-border bg-canvas"
    >
      <div className="mx-auto flex w-full max-w-[1200px] items-center gap-2 overflow-x-auto px-4 py-3 sm:px-6">
        <span className="mr-1 shrink-0 text-[9px] font-semibold tracking-[0.1em] text-text-secondary uppercase">
          Explore
        </span>
        {categories.map((category) => (
          <Chip key={category} className="shrink-0 bg-surface">
            {category}
          </Chip>
        ))}
      </div>
    </section>
  );
}
