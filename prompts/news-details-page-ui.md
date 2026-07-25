# CANTABRIA News Details Page Implementation

## Goal

Implement a production-quality, responsive news details experience at
`/news/[id]`, using the attached Biasly article page as the visual and
information-hierarchy reference while preserving CANTABRIA's existing brand,
warm editorial palette, Poppins typography, demo-data disclosure, and component
organization.

Every existing homepage article card must link to a valid detail page. The page
must present stored fixture content only: article metadata, hero artwork, full
article copy, sentiment, AI-estimated political framing, confidence, analysis
summary, framing notes, loaded terms, disclaimer, and related stories.

## Skills read

- No approved project skill is needed for this repository-native UI task.
- The Supabase skill was not used because `.agents/skills/supabase` and the
  Supabase SDK/query layer are absent from the current project. Introducing a
  backend is outside this visual request.
- Clerk was not used because authentication is not installed and the page will
  not add login, save, or personalized behavior.
- Oxylabs Web Scraper and AI SDK are unrelated because the UI must only render
  existing typed demo data; it must not scrape, analyze, or mutate pipeline
  state.

## Project guidance read

- `AGENTS.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md`
- `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/dynamic-routes.md`
- `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/not-found.md`

Relevant conclusions:

- Create the route with `app/news/[id]/page.tsx`.
- In Next.js 16, dynamic `params` is a promise and must be awaited.
- Use `generateStaticParams` for the known fixture IDs so all demo article pages
  are prerendered and build-validated.
- Use `notFound()` for unknown article IDs.
- Keep the page and presentation components as Server Components; no client
  state is necessary for this scope.
- Use `next/link` for homepage-to-detail and related-story navigation.

## Existing code inspected

- `package.json`
- `tsconfig.json`
- `app/layout.tsx`
- `app/page.tsx`
- `app/globals.css`
- `lib/data/homepage.ts`
- `components/analysis/bias-meter.tsx`
- `components/buttons/button.tsx`
- `components/cards/news-card.tsx`
- `components/chips/chip.tsx`
- `components/icons/icons.tsx`
- `components/layout/site-footer.tsx`
- `components/media/article-artwork.tsx`
- `components/navigation/category-bar.tsx`
- `components/navigation/top-bar.tsx`
- `components/panels/panel.tsx`
- `prompts/design-system-reference.md`
- `prompts/home-page-editorial-grid.md`

Current state:

- The project uses Next.js `16.2.11`, React `19.2.4`, TypeScript, Tailwind CSS
  v4, and Poppins.
- `/` is a responsive editorial homepage backed by typed local demo fixtures.
- No article detail route, database integration, remote editorial photography,
  authentication, or interactive save/share/subscription workflow exists.
- Homepage cards currently look clickable on hover but contain no link.
- Existing reusable families already cover navigation, footer, panels, icons,
  artwork, chips, buttons, cards, and the accessible AI-estimated framing meter.
- The fixture records include card-level metadata but not full article copy or
  the complete analysis content required by the product specification.

## Decisions and assumptions

1. Use `/news/[id]` as the canonical detail route because this is explicitly a
   news details page and existing fixture IDs are stable URL-safe identifiers.
2. Implement the dynamic route for every existing homepage fixture rather than
   hardcoding one screenshot-specific page.
3. Treat the reference as a composition, density, and hierarchy reference. Do
   not copy Biasly branding, the Trump/Iran story, partisan red/blue styling,
   source claims, dates, photography, or copyrighted article text.
4. Continue using clearly fictional CANTABRIA demo editorial content. The page
   must visibly identify it as demo content and must not imply that a real model
   or scraper produced it.
5. Extend the existing typed fixture boundary with detail fields rather than
   adding Supabase, API routes, environment variables, or a second data source.
6. Preserve the existing abstract local SVG artwork. Scale it into a large hero
   treatment rather than adding remote stock photography or image-generation
   dependencies.
7. Omit fake login, subscribe, save, share, feedback, methodology modal, and
   source-breakdown controls. Provide only real navigation, including a back
   link, linked headlines, and linked related stories.
8. Replace the reference's unsupported multi-source breakdown with honest
   article-level `Analysis notes` and `Limitations` content drawn from each
   stored fixture.
9. Political framing must always be labeled `AI-estimated`, with confidence and
   disclaimer visible near the analysis.
10. Use the article's existing framing percentages and sentiment values; all
    left/center/right values must remain normalized and total 100.
11. Related stories are selected deterministically from the existing fixture
    collection, excluding the current article, and must link to valid detail
    routes.
12. Update shared header/footer anchor links so they remain valid from nested
    routes by targeting `/#top-stories`, `/#world`, `/#technology`, and
    `/#climate`.

## Visual interpretation

The attached reference establishes:

- A restrained sticky editorial masthead above a wide article canvas.
- A dominant left reading column and a narrower right analysis rail.
- Compact topic metadata, a large multi-line headline, byline/date/read-time
  metadata, and a broad hero image.
- A framing distribution directly beneath the hero, followed by readable
  long-form article text.
- Stacked bordered analysis cards for bias/framing, summary, and supporting
  evidence.
- Related stories near the end of the main reading column.
- A substantial dark footer aligned to the main page grid.

CANTABRIA adaptation:

- Retain the current warm off-white canvas, white panels, charcoal text,
  restrained borders, modest radii, and small shadows.
- Use clay, cool gray, and mint for left/center/right framing instead of the
  reference's saturated red/blue.
- Use CANTABRIA's abstract editorial illustration as the hero visual.
- Make analysis language careful and transparent: `AI-estimated framing`,
  `confidence`, `demo analysis`, and a visible disclaimer.
- Keep the composition editorial rather than dashboard-like: the headline,
  hero, and article body remain visually dominant.

## Layout, typography, spacing, colors, and responsiveness

### Shared shell

- Reuse `TopBar`, `CategoryBar`, and `SiteFooter`.
- Keep the existing sticky header behavior.
- On nested detail routes, all header/footer homepage anchors must use absolute
  root fragment URLs.
- Add the same keyboard-visible skip link used on the homepage, targeting the
  detail page's main content.

### Desktop layout

- Center the page in the existing approximately `1200px` content container.
- Use a two-column layout at large widths:
  - main article column approximately `minmax(0, 1fr)`;
  - analysis rail approximately `320–360px`;
  - gap approximately `28–36px`.
- Keep the headline and article intro constrained enough for comfortable
  reading even when the hero spans the full main column.
- The analysis rail begins level with the article heading area and may become
  sticky below the site header when the viewport has sufficient height.
- Hero artwork uses a stable wide aspect ratio around `16:9`, a subtle border,
  and the existing medium radius.
- The article body stays approximately `68–76` characters per line.

### Tablet layout

- Keep two columns only while both remain readable.
- At roughly `1024px` and below, collapse into one column.
- In the one-column layout, place the analysis overview after the hero/framing
  distribution and before or directly after the article body in a clear
  document order.
- Related stories use two columns where space permits.

### Mobile layout

- Use `16px` page gutters and a single-column flow.
- Headline scales with `clamp()` to approximately `28–44px` across breakpoints.
- Article metadata wraps cleanly without compressed separators.
- Hero artwork remains full-width and stable.
- Analysis panels use full width with compact padding.
- Related stories stack vertically or use a compact one-column media layout.
- No page-level horizontal scrolling at `320px`.
- Disable sticky positioning for the analysis rail when stacked.

### Typography

- Keep global Poppins.
- Eyebrow/topic metadata: `9–11px`, medium/semibold, muted.
- Headline: bold, tightly tracked, approximately `28–44px`, line height
  `1.08–1.18`.
- Byline/date/read-time: `9–11px`.
- Panel heading: `16–20px`, semibold/bold.
- Article body: approximately `15–17px`, line height `1.75–1.9`.
- Analysis body and bullets: `11–13px`, line height `1.6–1.75`.
- Do not use all caps for long labels or body text.

### Spacing

- Main page top/bottom padding: approximately `32–56px`.
- Article heading to metadata: `12–18px`.
- Metadata to hero: `20–28px`.
- Hero caption: `8–12px`.
- Framing panel: `20–28px` after the caption.
- Article paragraphs: `18–24px` vertical rhythm.
- Sidebar panels: `16–20px` internal padding and `16–20px` gaps.
- Related stories: separated from the body by a border and `28–36px` spacing.

### Colors and surfaces

- Reuse all existing semantic variables in `app/globals.css`.
- Canvas: `#F8F7F2`.
- Panels and hero framing surface: `#FFFFFF`.
- Secondary surface: `#F3EEDF`.
- Primary text: `#333333`.
- Secondary/muted text: existing neutral tokens.
- Framing: existing clay/gray/mint tokens and their accessible text colors.
- Avoid gradients, glassmorphism, neon accents, saturated partisan colors, and
  heavy dashboard shadows.

## Data model requirements

- Keep `HomepageArticle` as the card-level type or refactor to a shared
  `NewsArticle` type that contains both card and detail data without duplicating
  base fields.
- Add typed detail fields sufficient for every article route:
  - byline;
  - full published-date label;
  - hero caption/description;
  - article body paragraphs;
  - analysis summary paragraphs or bullet points;
  - framing notes;
  - loaded terms;
  - disclaimer;
  - related article IDs, or a deterministic helper that excludes the current
    article.
- Keep data in `lib/data/`, not under `components/`.
- Export focused lookup helpers such as `getArticleById(id)` and
  `getRelatedArticles(id, limit)`.
- Keep all demo detail content neutral, original, and internally consistent with
  each card's headline/excerpt.
- Do not render fixture text as HTML and do not use `dangerouslySetInnerHTML`.

## Files likely to change

- `app/news/[id]/page.tsx` (new)
- `app/news/[id]/not-found.tsx` (new, if a route-local state improves the
  experience)
- `app/page.tsx` only if shared data imports or heading semantics need a small
  adjustment
- `lib/data/homepage.ts` or a focused replacement such as
  `lib/data/articles.ts`
- `components/cards/news-card.tsx`
- `components/cards/related-story-card.tsx` (new)
- `components/analysis/analysis-overview.tsx` (new)
- `components/analysis/analysis-summary.tsx` (new)
- `components/analysis/analysis-notes.tsx` (new, only if the split remains
  focused)
- `components/navigation/top-bar.tsx`
- `components/layout/site-footer.tsx`
- `components/icons/icons.tsx` only if a small missing local icon is required
- `components/panels/panel.tsx` only if a backwards-compatible panel variant is
  needed
- `app/globals.css` only for genuinely global behavior that Tailwind utilities
  cannot express cleanly

The exact split may be smaller, but the large route file must not contain
duplicated panel, meter, related-card, or data-query logic.

## Implementation requirements

### Dynamic route

- Add `app/news/[id]/page.tsx`.
- Await the Next.js 16 `params` promise.
- Export `generateStaticParams()` using all current fixture IDs.
- Resolve the article through a typed lookup helper.
- Call `notFound()` for unknown IDs.
- Add article-specific metadata if it can be implemented cleanly from the local
  fixture without creating duplicated lookups.
- Keep the route a Server Component with no `'use client'` directive.

### Homepage card navigation

- Make each homepage card open `/news/{id}`.
- Prefer a linked headline and/or an accessible stretched-link pattern that
  preserves valid nested controls. Since the card contains no real controls,
  a single clearly labeled article link may cover the card if keyboard focus
  remains visible.
- Ensure the hover elevation now corresponds to genuine navigation.
- Preserve card semantics and accessible link text.

### Article header and hero

- Render topic and region as the eyebrow.
- Render one `h1` containing the article title.
- Render byline, source, full published date, and reading time.
- Include a clear `Demo editorial article` disclosure.
- Render the existing artwork variant in a large responsive hero frame.
- Add a concise caption that identifies the illustration as CANTABRIA demo
  artwork, not documentary photography.

### Article body

- Render semantic paragraphs from typed plain-text fixture data.
- Keep paragraph width and line height optimized for long-form reading.
- Do not synthesize content in the component layer.
- Do not present fabricated quotations, named experts, precise statistics, or
  claims that imply live reporting.

### Analysis overview

- Reuse `BiasMeter` for the full left/center/right distribution.
- Display:
  - sentiment label;
  - strongest AI-estimated framing label;
  - left, center, and right percentages;
  - confidence as a percentage;
  - a concise explanation that the estimate concerns the article's language and
    framing, not objective truth.
- Never rely on color alone.
- Use the existing semantic framing palette.

### AI summary and notes

- Add a dedicated analysis summary panel with stored summary bullets or
  paragraphs.
- Label the content `AI analysis summary` or `Demo AI summary`.
- Add an analysis-notes panel containing:
  - framing notes;
  - loaded terms rendered as text chips, or a quiet empty-state such as
    `No notable loaded terms` when the list is empty;
  - sentiment context if helpful;
  - the stored disclaimer.
- Keep the disclaimer visible and do not hide it behind a control.
- Do not claim a number of balanced sources, top-source rankings, or independent
  corroboration because that data is not present.

### Related stories

- Show up to four existing fixture articles, excluding the current article.
- Use a compact reusable card with artwork, topic/region, linked title, published
  label, and reading time.
- Every related link must resolve to a real `/news/[id]` route.
- Use a two-column grid on desktop/tablet and one column on narrow screens.

### Shared navigation and footer

- Change same-page fragment links to root fragment links so they work from both
  `/` and `/news/[id]`.
- Keep the brand link pointing to `/`.
- Do not introduce dead company, social, login, subscribe, or feedback links.

### Component boundaries

- Put reusable detail analysis UI in `components/analysis/`.
- Put reusable story previews in `components/cards/`.
- Keep shell components in their current navigation/layout families.
- Keep all fixtures, domain types, and lookup logic under `lib/data/`.
- Reuse `Panel`, `BiasMeter`, `ArticleArtwork`, and existing icons where they fit
  rather than cloning their styling.
- Avoid a broad `components/news/` catch-all directory.

## Security requirements

- Add no environment variables, credentials, API routes, server actions, model
  calls, scraping calls, database clients, or authentication behavior.
- Do not expose or reference secrets.
- Do not use remote user-controlled images.
- Do not use `dangerouslySetInnerHTML`.
- Treat route IDs only as lookup keys into the repository-owned fixture set;
  invalid values must produce a 404.
- UI code must not scrape, analyze, save, subscribe, share, or mutate pipeline
  state.

## Accessibility requirements

- Include a skip link targeting the main article content.
- Use semantic `header`, `nav`, `main`, `article`, `aside`, `section`, and
  `footer` landmarks where appropriate.
- Use exactly one article `h1` and a logical heading hierarchy.
- Give the analysis rail an accessible label.
- Keep all real links keyboard reachable with visible focus indicators.
- Frame analysis in text and percentages, not color alone.
- Treat decorative SVG artwork/icons as hidden from assistive technology.
- Ensure article copy and muted metadata meet readable contrast.
- Avoid keyboard traps, hover-only information, auto-moving content, and fake
  interactive controls.

## Pixel-perfect expectations

- At approximately `1440px`, closely match the reference's macro composition:
  wide left article column, narrow stacked right rail, dominant headline, broad
  hero, immediate distribution panel, long-form body, related stories, and dark
  footer.
- Align the article header, hero, body, analysis rail, and related-story edges
  to a consistent grid.
- Keep border weight, panel radius, internal padding, meter height, and sidebar
  gaps consistent.
- Preserve the reference's compact editorial density while using CANTABRIA's
  softer spacing, muted palette, original content, and abstract artwork.
- The page must feel like the same product as the existing homepage, not a
  separate template.
- Avoid oversized marketing copy, generic dashboard tiles, excessive badges,
  decorative charts unrelated to stored data, and copied Biasly controls.

## Acceptance criteria

1. Every homepage card links to `/news/{id}` and every link resolves.
2. `/news/[id]` renders a complete, server-rendered details page for every
   current fixture.
3. Unknown article IDs render a not-found state rather than a blank or generic
   runtime error.
4. The desktop page visibly matches the reference's two-column article and
   stacked-analysis composition.
5. The page shows topic, region, title, byline/source, full date, reading time,
   demo disclosure, hero artwork, caption, body, sentiment, AI-estimated
   framing, percentages, confidence, summary, framing notes, loaded terms,
   disclaimer, and related stories.
6. Framing is always presented as AI-estimated and never as objective truth.
7. No unsupported source-count, ranking, authentication, save, share,
   subscription, or feedback claim/control is introduced.
8. Related stories exclude the current article and link only to valid routes.
9. The layout collapses cleanly to one column and has no horizontal overflow at
   `320px`.
10. Shared homepage anchors work correctly from both `/` and `/news/[id]`.
11. The page uses existing semantic design tokens and reusable component
    families.
12. The page remains useful without client JavaScript.
13. No dependency, backend behavior, schema, or environment variable is added.
14. TypeScript, ESLint, and the Next.js production build pass.

## Checks to run

From the project root:

1. `npm run typecheck`
2. `npm run lint`
3. `npm run build`

Report the exact results. Do not claim a check passed without running it.

## Exact manual test steps expected after implementation

1. Run `npm run dev`.
2. Open `http://localhost:3000`.
3. Activate the first article card and confirm it opens its
   `/news/{article-id}` route.
4. Return to the homepage and open at least two other cards; confirm their
   headings, artwork, article copy, and analysis values are article-specific.
5. Directly open an invalid URL such as
   `http://localhost:3000/news/not-a-real-article` and confirm a useful
   not-found state appears with a valid route back home.
6. On a valid detail page, confirm the visible order includes:
   - shared header and categories;
   - article eyebrow and headline;
   - byline/source/date/read time and demo disclosure;
   - hero artwork and caption;
   - framing distribution;
   - full article body;
   - analysis summary and notes;
   - related stories;
   - shared footer.
7. Confirm the desktop layout has a broad article column and narrower stacked
   analysis rail aligned near the article header.
8. Resize to approximately `1440px`, `1200px`, `1024px`, `768px`, `390px`, and
   `320px`.
9. At every width, confirm there is no overlap, clipped text, or horizontal page
   scroll; confirm the analysis rail and related stories stack sensibly on
   smaller screens.
10. Confirm all left/center/right percentages are visible in text, total 100,
    and use the clay/gray/mint palette.
11. Confirm `AI-estimated` wording, confidence, demo disclosure, and disclaimer
    are visible without opening a modal.
12. Use the Tab key:
    - confirm the skip link becomes visible and moves focus to the article;
    - confirm homepage cards, brand link, root-fragment navigation, back link,
      and related-story links show visible focus;
    - confirm there are no dead or fake controls.
13. From a detail page, activate the `Top stories`, `World`, `Technology`, and
    `Climate` navigation links and confirm each returns to the matching homepage
    location.
14. Disable JavaScript and reload a valid detail route; confirm the article and
    analysis content remain visible.
15. Inspect the browser console and Network panel for runtime errors or failed
    asset requests.
16. Compare the desktop page with the attached reference and confirm the major
    proportions, editorial hierarchy, two-column rhythm, analysis-card density,
    and footer alignment are closely reflected without copying its brand or
    content.
