import type { ComponentType, SVGProps } from "react";

import {
  BellIcon,
  BiasMeter,
  BookmarkIcon,
  Button,
  CalendarIcon,
  CheckIcon,
  Chip,
  ClockIcon,
  InfoIcon,
  MenuIcon,
  MoreIcon,
  Panel,
  SearchIcon,
  ShareIcon,
  SlidersIcon,
  TagIcon,
  UserIcon,
} from "@/components/design-system";
import { NewsCard } from "@/components/news/news-card";

type SwatchProps = {
  bordered?: boolean;
  color: string;
  name: string;
  value: string;
};

function Swatch({ bordered = false, color, name, value }: SwatchProps) {
  return (
    <div className="min-w-0">
      <div
        className={`mb-2 size-12 rounded-[var(--radius-medium)] shadow-[var(--shadow-small)] ${
          bordered ? "border border-border" : ""
        }`}
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
      <p className="text-[11px] leading-[1.4] font-semibold tracking-[0.03em] uppercase">
        {name}
      </p>
      <p className="mt-0.5 font-mono text-[10px] leading-[1.4] text-text-secondary">
        {value}
      </p>
    </div>
  );
}

const typeRows = [
  ["H1", "Page / screen title", "32px", "Bold", "1.2"],
  ["H2", "Section title", "24px", "Semibold", "1.3"],
  ["H3", "Card / module title", "20px", "Semibold", "1.3"],
  ["H4", "Subheading", "16px", "Medium", "1.4"],
  ["Body large", "Important content", "16px", "Regular", "1.6"],
  ["Body medium", "Body text", "14px", "Regular", "1.6"],
  ["Body small", "Supporting text", "13px", "Regular", "1.6"],
  ["Caption", "Labels and metadata", "11px", "Medium", "1.4"],
] as const;

const iconExamples: Array<{
  name: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}> = [
  { name: "Menu", Icon: MenuIcon },
  { name: "Search", Icon: SearchIcon },
  { name: "Bookmark", Icon: BookmarkIcon },
  { name: "Time", Icon: ClockIcon },
  { name: "Info", Icon: InfoIcon },
  { name: "Share", Icon: ShareIcon },
  { name: "Calendar", Icon: CalendarIcon },
  { name: "Tag", Icon: TagIcon },
  { name: "Profile", Icon: UserIcon },
  { name: "Alerts", Icon: BellIcon },
  { name: "Filters", Icon: SlidersIcon },
  { name: "Verified", Icon: CheckIcon },
  { name: "More", Icon: MoreIcon },
];

const spacingStops = [
  { value: 4, height: 8 },
  { value: 8, height: 12 },
  { value: 16, height: 20 },
  { value: 24, height: 28 },
  { value: 32, height: 36 },
  { value: 40, height: 44 },
  { value: 64, height: 60 },
] as const;

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-4 sm:px-6 sm:py-6">
      <h1 className="sr-only">CANTABRIA design system</h1>
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-12">
        <Panel
          title="Brand"
          titleId="brand-title"
          className="md:col-span-1 xl:col-span-4"
          contentClassName="flex min-h-60 items-center justify-center px-6 py-10"
        >
          <div className="text-center">
            <p className="text-[clamp(1.75rem,5vw,2.5rem)] leading-none font-bold tracking-[-0.055em]">
              CANTABRIA
            </p>
            <p className="mt-1 text-[11px] font-semibold tracking-[0.34em] text-text-secondary uppercase">
              News intelligence
            </p>
            <div className="mx-auto my-5 h-px w-12 bg-border" aria-hidden="true" />
            <p className="mx-auto max-w-64 text-base leading-[1.6] font-normal">
              Balanced news coverage,
              <br />
              made clearer by AI.
            </p>
          </div>
        </Panel>

        <Panel
          title="Typography"
          titleId="typography-title"
          className="md:col-span-2 xl:col-span-5"
          contentClassName="p-4 sm:p-6"
        >
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.6fr]">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.08em] uppercase">
                Font family
              </p>
              <p className="mt-2 text-[32px] leading-[1.2] font-bold tracking-[-0.04em]">
                Poppins
              </p>
              <p className="mt-4 max-w-56 text-[13px] leading-[1.6] text-text-secondary">
                A modern geometric sans serif selected for clarity, warmth, and
                confident editorial hierarchy.
              </p>
            </div>
            <div className="min-w-0">
              <table className="w-full table-fixed border-collapse text-left text-[10px] leading-[1.4]">
                <thead>
                  <tr className="border-b border-divider text-[9px] tracking-[0.06em] uppercase">
                    <th className="w-[30%] pb-2 font-semibold sm:w-auto">Style</th>
                    <th className="w-[48%] pb-2 font-semibold sm:w-auto">Use</th>
                    <th className="w-[22%] pb-2 font-semibold sm:w-auto">Size</th>
                    <th className="hidden pb-2 font-semibold sm:table-cell">Weight</th>
                    <th className="hidden pb-2 font-semibold sm:table-cell">Line</th>
                  </tr>
                </thead>
                <tbody>
                  {typeRows.map(([style, use, size, weight, line]) => (
                    <tr key={style} className="border-b border-divider last:border-0">
                      <td className="py-2 font-semibold">{style}</td>
                      <td className="py-2 text-text-secondary">{use}</td>
                      <td className="py-2">{size}</td>
                      <td className="hidden py-2 sm:table-cell">{weight}</td>
                      <td className="hidden py-2 sm:table-cell">{line}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Panel>

        <Panel
          title="UI elements"
          titleId="ui-elements-title"
          className="md:col-span-2 xl:col-span-3"
          contentClassName="space-y-6 p-4"
        >
          <div>
            <p className="mb-3 text-[11px] font-semibold tracking-[0.08em] uppercase">
              Buttons
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="text">Text</Button>
              <Button variant="primary" disabled>
                Disabled
              </Button>
            </div>
          </div>
          <div>
            <p className="mb-3 text-[11px] font-semibold tracking-[0.08em] uppercase">
              Chip / category
            </p>
            <div className="flex flex-wrap gap-2">
              <Chip trailingPlus>World</Chip>
              <Chip trailingPlus>Technology</Chip>
              <Chip trailingPlus>More</Chip>
            </div>
          </div>
          <BiasMeter left={25} center={50} right={25} />
        </Panel>

        <Panel
          title="Colors"
          titleId="colors-title"
          className="md:col-span-1 xl:col-span-4"
          contentClassName="space-y-6 p-4 sm:p-6"
        >
          <div>
            <p className="mb-3 text-[11px] font-semibold tracking-[0.08em] uppercase">
              Primary
            </p>
            <div className="grid grid-cols-3 gap-4">
              <Swatch color="#333333" name="Text primary" value="#333333" />
              <Swatch color="#6F6F6F" name="Text secondary" value="#6F6F6F" />
              <Swatch color="#F8F7F2" name="Canvas" value="#F8F7F2" bordered />
            </div>
          </div>
          <div>
            <p className="mb-3 text-[11px] font-semibold tracking-[0.08em] uppercase">
              Semantic framing
            </p>
            <div className="grid grid-cols-3 gap-4">
              <Swatch color="#D9A58F" name="Left" value="#D9A58F" />
              <Swatch color="#E5E7EB" name="Center" value="#E5E7EB" />
              <Swatch color="#B5E3D6" name="Right" value="#B5E3D6" />
            </div>
          </div>
          <div>
            <p className="mb-3 text-[11px] font-semibold tracking-[0.08em] uppercase">
              Neutrals
            </p>
            <div className="grid grid-cols-4 gap-3">
              <Swatch color="#FFFFFF" name="Surface" value="#FFFFFF" bordered />
              <Swatch color="#F3EEDF" name="Secondary" value="#F3EEDF" bordered />
              <Swatch color="#E5E7EB" name="Border" value="#E5E7EB" />
              <Swatch color="#ECEDE8" name="Divider" value="#ECEDE8" />
            </div>
          </div>
        </Panel>

        <Panel
          title="Icons"
          titleId="icons-title"
          className="md:col-span-1 xl:col-span-4"
          contentClassName="p-4 sm:p-6"
        >
          <div className="grid grid-cols-5 gap-x-3 gap-y-6 sm:grid-cols-7">
            {iconExamples.map(({ name, Icon }) => (
              <div key={name} className="flex flex-col items-center gap-2 text-center">
                <Icon className="size-5" />
                <span className="text-[9px] leading-[1.3] text-text-secondary">
                  {name}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-7 border-t border-divider pt-4 text-[11px] text-text-secondary">
            Line style · 2px stroke · Rounded joins
          </p>
        </Panel>

        <Panel
          title="Card example"
          titleId="card-title"
          className="md:col-span-2 xl:col-span-4"
          contentClassName="p-3 sm:p-4"
        >
          <NewsCard
            category="Technology"
            source="CANTABRIA desk"
            title="New tools make complex climate data easier to understand"
            excerpt="Researchers are turning dense public datasets into clearer signals for local decision-makers."
            publishedAt="2h ago"
            readingTime="7 min read"
            framing={{ left: 18, center: 63, right: 19 }}
          />
        </Panel>

        <Panel
          title="Spacing system"
          titleId="spacing-title"
          className="md:col-span-1 xl:col-span-4"
          contentClassName="p-4 sm:p-6"
        >
          <div className="flex min-h-24 items-end justify-between gap-2">
            {spacingStops.map(({ value, height }) => (
              <div key={value} className="flex min-w-0 flex-1 flex-col items-center gap-2">
                <div
                  className="w-full max-w-12 bg-surface-secondary"
                  style={{ height }}
                  aria-hidden="true"
                />
                <span className="text-[10px] font-medium">{value}px</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[13px] text-text-secondary">
            A consistent scale built on a 4px base unit.
          </p>
        </Panel>

        <Panel
          title="Grid system"
          titleId="grid-title"
          className="md:col-span-1 xl:col-span-4"
          contentClassName="p-4 sm:p-6"
        >
          <div className="grid grid-cols-12 gap-1.5" aria-label="Twelve-column grid">
            {Array.from({ length: 12 }, (_, index) => (
              <div
                key={index}
                className="h-32 rounded-[2px] bg-surface-secondary"
                aria-hidden="true"
              />
            ))}
          </div>
          <dl className="mt-4 grid grid-cols-3 gap-2 text-[10px] leading-[1.4]">
            <div>
              <dt className="text-text-secondary">Container</dt>
              <dd className="font-semibold">1200px</dd>
            </div>
            <div>
              <dt className="text-text-secondary">Columns</dt>
              <dd className="font-semibold">12</dd>
            </div>
            <div>
              <dt className="text-text-secondary">Gutter</dt>
              <dd className="font-semibold">24px</dd>
            </div>
          </dl>
        </Panel>

        <Panel
          title="Shadows"
          titleId="shadows-title"
          className="md:col-span-1 xl:col-span-2"
          contentClassName="space-y-4 p-4"
        >
          {[
            ["Small", "var(--shadow-small)"],
            ["Medium", "var(--shadow-medium)"],
            ["Large", "var(--shadow-large)"],
          ].map(([name, shadow]) => (
            <div key={name} className="flex items-center gap-4">
              <div
                className="size-10 shrink-0 rounded-[var(--radius-small)] bg-surface"
                style={{ boxShadow: shadow }}
                aria-hidden="true"
              />
              <div>
                <p className="text-[10px] font-semibold uppercase">{name}</p>
                <p className="text-[9px] text-text-secondary">Soft elevation</p>
              </div>
            </div>
          ))}
        </Panel>

        <Panel
          title="Border radius"
          titleId="radius-title"
          className="md:col-span-1 xl:col-span-2"
          contentClassName="space-y-3 p-4"
        >
          {[
            ["Small", "4px", "var(--radius-small)"],
            ["Medium", "8px", "var(--radius-medium)"],
            ["Large", "12px", "var(--radius-large)"],
            ["Full", "9999px", "var(--radius-full)"],
          ].map(([name, value, radius]) => (
            <div key={name} className="grid grid-cols-[40px_1fr_auto] items-center gap-3">
              <div
                className="size-8 border border-border bg-canvas"
                style={{ borderRadius: radius }}
                aria-hidden="true"
              />
              <span className="text-[10px] font-semibold uppercase">{name}</span>
              <span className="text-[10px] text-text-secondary">{value}</span>
            </div>
          ))}
        </Panel>

        <footer className="flex flex-col gap-4 rounded-[var(--radius-medium)] border border-border bg-surface px-5 py-4 shadow-[var(--shadow-small)] md:col-span-2 md:flex-row md:items-center md:justify-between xl:col-span-12">
          <div className="flex items-baseline gap-3">
            <p className="text-lg font-bold tracking-[-0.04em]">CANTABRIA</p>
            <p className="text-[10px] tracking-[0.08em] text-text-secondary uppercase">
              Design system v1.0
            </p>
          </div>
          <p className="text-[11px] text-text-secondary">
            Stay curious. Read the framing. Keep the nuance.
          </p>
        </footer>
      </div>
    </main>
  );
}
