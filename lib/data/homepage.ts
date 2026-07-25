import type { ArtworkVariant } from "@/components/media/article-artwork";

export type SentimentLabel = "Positive" | "Neutral" | "Negative";
export type FramingLabel = "Left" | "Center" | "Right" | "Mixed" | "Unclear";

export type HomepageArticle = {
  anchorId?: string;
  artworkVariant: ArtworkVariant;
  confidence: number;
  excerpt: string;
  framing: {
    center: number;
    label: FramingLabel;
    left: number;
    right: number;
  };
  id: string;
  publishedAt: string;
  readingTime: string;
  region: string;
  sentiment: SentimentLabel;
  source: string;
  title: string;
  topic: string;
};

export const homepageCategories = [
  "World",
  "Technology",
  "Climate",
  "Economy",
  "Science",
  "Energy",
  "Cities",
  "Culture",
] as const;

export const homepageArticles: HomepageArticle[] = [
  {
    id: "coastal-planning",
    anchorId: "world",
    artworkVariant: "world",
    topic: "World",
    region: "Coastal cities",
    source: "CANTABRIA demo desk",
    title: "Coastal regions rethink how public services prepare for rising seas",
    excerpt:
      "A fictional briefing showing how infrastructure, housing, and local planning can be compared in one story.",
    publishedAt: "35 min ago",
    readingTime: "6 min read",
    sentiment: "Neutral",
    framing: { left: 24, center: 58, right: 18, label: "Center" },
    confidence: 0.82,
  },
  {
    id: "material-research",
    artworkVariant: "science",
    topic: "Science",
    region: "Research",
    source: "CANTABRIA lab notes",
    title: "New material study highlights a quieter path to efficient cooling",
    excerpt:
      "Researchers test passive techniques designed to reduce heat without adding demand to the power grid.",
    publishedAt: "1 hr ago",
    readingTime: "5 min read",
    sentiment: "Positive",
    framing: { left: 16, center: 70, right: 14, label: "Center" },
    confidence: 0.88,
  },
  {
    id: "rail-renewal",
    artworkVariant: "cities",
    topic: "Cities",
    region: "Europe",
    source: "CANTABRIA urban desk",
    title: "Rail renewal plans put reliability ahead of headline speed",
    excerpt:
      "A demonstration report weighs maintenance, access, and long-term capacity across a regional network.",
    publishedAt: "2 hrs ago",
    readingTime: "7 min read",
    sentiment: "Neutral",
    framing: { left: 30, center: 52, right: 18, label: "Center" },
    confidence: 0.76,
  },
  {
    id: "public-ai-tools",
    anchorId: "technology",
    artworkVariant: "technology",
    topic: "Technology",
    region: "Public services",
    source: "CANTABRIA systems",
    title: "Public-interest AI tools shift attention from novelty to usefulness",
    excerpt:
      "Teams focus on measurable outcomes, careful oversight, and interfaces that make automated decisions easier to question.",
    publishedAt: "3 hrs ago",
    readingTime: "8 min read",
    sentiment: "Positive",
    framing: { left: 32, center: 47, right: 21, label: "Center" },
    confidence: 0.71,
  },
  {
    id: "energy-storage",
    artworkVariant: "energy",
    topic: "Energy",
    region: "Regional grids",
    source: "CANTABRIA energy",
    title: "Storage projects test a more flexible rhythm for regional power grids",
    excerpt:
      "The fictional analysis compares reliability benefits with construction costs and community concerns.",
    publishedAt: "4 hrs ago",
    readingTime: "6 min read",
    sentiment: "Neutral",
    framing: { left: 27, center: 48, right: 25, label: "Mixed" },
    confidence: 0.68,
  },
  {
    id: "local-economies",
    artworkVariant: "economy",
    topic: "Economy",
    region: "Small business",
    source: "CANTABRIA economics",
    title: "Local economies look beyond growth totals to track everyday resilience",
    excerpt:
      "A sample economic story combines hiring, household costs, and business formation into a broader view.",
    publishedAt: "5 hrs ago",
    readingTime: "9 min read",
    sentiment: "Neutral",
    framing: { left: 36, center: 45, right: 19, label: "Center" },
    confidence: 0.74,
  },
  {
    id: "heat-planning",
    anchorId: "climate",
    artworkVariant: "climate",
    topic: "Climate",
    region: "Mediterranean",
    source: "CANTABRIA climate",
    title: "Heat planning moves from emergency response to neighborhood design",
    excerpt:
      "Shade, water access, and building standards are considered together in this fictional policy explainer.",
    publishedAt: "6 hrs ago",
    readingTime: "7 min read",
    sentiment: "Negative",
    framing: { left: 41, center: 44, right: 15, label: "Mixed" },
    confidence: 0.79,
  },
  {
    id: "civic-data",
    artworkVariant: "civic",
    topic: "Civic life",
    region: "Open government",
    source: "CANTABRIA public data",
    title: "Clearer civic data helps residents follow decisions before the final vote",
    excerpt:
      "A demonstration article examines how timelines, sources, and plain-language notes improve public oversight.",
    publishedAt: "Yesterday",
    readingTime: "5 min read",
    sentiment: "Positive",
    framing: { left: 34, center: 53, right: 13, label: "Center" },
    confidence: 0.84,
  },
  {
    id: "night-sky",
    artworkVariant: "science",
    topic: "Science",
    region: "Astronomy",
    source: "CANTABRIA observatory",
    title: "A shared night-sky map makes small observatories part of a larger picture",
    excerpt:
      "Open standards allow independent teams to combine observations and flag unusual patterns more quickly.",
    publishedAt: "Yesterday",
    readingTime: "4 min read",
    sentiment: "Positive",
    framing: { left: 11, center: 77, right: 12, label: "Center" },
    confidence: 0.91,
  },
  {
    id: "food-networks",
    artworkVariant: "world",
    topic: "World",
    region: "Food systems",
    source: "CANTABRIA field notes",
    title: "Regional food networks balance efficiency with a need for redundancy",
    excerpt:
      "The sample report traces how storage, transport, and smaller suppliers can reduce single points of failure.",
    publishedAt: "2 days ago",
    readingTime: "8 min read",
    sentiment: "Neutral",
    framing: { left: 29, center: 51, right: 20, label: "Center" },
    confidence: 0.73,
  },
  {
    id: "creative-archives",
    artworkVariant: "culture",
    topic: "Culture",
    region: "Digital archives",
    source: "CANTABRIA culture",
    title: "Community archives find new audiences without losing local context",
    excerpt:
      "Small collections use careful digitization to widen access while keeping authorship and history visible.",
    publishedAt: "2 days ago",
    readingTime: "6 min read",
    sentiment: "Positive",
    framing: { left: 38, center: 50, right: 12, label: "Center" },
    confidence: 0.77,
  },
  {
    id: "water-monitoring",
    artworkVariant: "climate",
    topic: "Climate",
    region: "River basins",
    source: "CANTABRIA environment",
    title: "Low-cost water monitors turn scattered readings into earlier warnings",
    excerpt:
      "A fictional field report considers data quality, maintenance, and who receives an alert first.",
    publishedAt: "3 days ago",
    readingTime: "7 min read",
    sentiment: "Neutral",
    framing: { left: 33, center: 54, right: 13, label: "Center" },
    confidence: 0.81,
  },
];
