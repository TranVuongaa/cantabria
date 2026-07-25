# CANTABRIA Editorial Homepage Implementation

## Goal

Replace the current design-system showcase at `/` with a production-quality,
responsive CANTABRIA news homepage inspired by the attached Biasly reference.
Reuse the project's established visual language and design-system primitives
instead of copying the reference brand, article claims, colors, or photography.

The finished page should feel like a real editorial product and must include
four distinct shared layout regions: a top bar, site header, category bar, and
site footer. Between the category bar and footer, render a prominent
`Top stories` section, dense responsive card grid, and clear AI-analysis
signals.

## Skills read

- No approved project skill is needed for this visual-only homepage task.
- Clerk is not used because authentication is not installed in the current
  project and this request does not include adding it.
- Supabase is not used because the SDK, clients, schema integration, and article
  queries do not exist in the current project; adding the backend is outside this
  visual implementation.
- Oxylabs Web Scraper and AI SDK are unrelated because the UI must not scrape,
  analyze, or mutate pipeline state.
- The image-generation skill is not used because the requested result is
  repository-native React/Tailwind UI. Article artwork should be implemented as
  lightweight local SVG/CSS editorial illustrations.

## Project guidance read

- `AGENTS.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/04-linking-and-navigating.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/12-images.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md`

Relevant conclusions:

- Keep `app/page.tsx` as a Server Component; no client state is necessary.
- Use `next/link` only for destinations that actually exist. Do not add dead
  article routes or fake authentication interactions.
- Keep global tokens and base behavior in the root-imported `app/globals.css`.
- Use Tailwind utilities and extracted shared components for repeated styling.
- Keep Poppins loaded globally through `next/font/google`.
- Local SVG/CSS artwork avoids remote image configuration and layout shift.

## Existing code inspected

- `package.json`
- `tsconfig.json`
- `app/layout.tsx`
- `app/page.tsx`
- `app/globals.css`
- `components/design-system/bias-meter.tsx`
- `components/design-system/button.tsx`
- `components/design-system/chip.tsx`
- `components/design-system/icons.tsx`
- `components/design-system/index.ts`
- `components/design-system/panel.tsx`
- `components/news/news-card.tsx`
- `prompts/design-system-reference.md`
- `public/`

Current state:

- Next.js `16.2.11`, React `19.2.4`, Tailwind CSS v4, and TypeScript strict
  mode are installed.
- `/` is a comprehensive design-system showcase rather than a reader-facing
  homepage.
- Poppins and the CANTABRIA metadata are already configured.
- Semantic warm-light tokens, buttons, chips, icons, a bias meter, and an
  initial news card exist.
- The existing news card is a horizontal showcase example with one fixed
  artwork and does not yet support the dense three-column homepage layout or
  all required analysis metadata.
- No Clerk, Supabase, scraping, API, or article-detail route exists.
- `public/` contains only starter assets and no editorial images.

## Decisions and assumptions

1. Treat the attached image as a composition and density reference, not content
   or branding to copy.
2. Preserve CANTABRIA's established warm canvas, charcoal typography, restrained
   borders, Poppins font, and clay/gray/mint framing palette.
3. Replace the design-system showcase at `/`; reusable design-system files stay
   in the project and are adapted only when the homepage needs them.
4. Use a small typed set of editorial fixture articles in a dedicated data
   module because no persisted data layer exists yet. The fixture boundary must
   be obvious and replaceable by a future Supabase query without rewriting the
   presentation components.
5. Fixtures are display content only. They must not claim to be live news,
   scraped results, or AI output from a real model run. Add a subtle demo-data
   disclosure near the section heading.
6. Do not add Supabase, Clerk, image libraries, icon libraries, a carousel
   package, or any new runtime dependency.
7. Use topic chips as non-interactive labels until filtering behavior exists.
8. Use only valid links. Brand/home navigation can point to `/`; other
   unavailable destinations should render as text or disabled/presentational
   controls rather than dead links.
9. Keep the page server-rendered and usable without JavaScript.
10. Use varied abstract editorial SVG illustrations with a common art direction
    rather than remote stock photography or copied reference images.

## Visual interpretation

The reference contributes the following structural ideas:

- Slim utility strip above a larger primary masthead.
- Left-aligned brand, compact navigation, and restrained actions.
- A bordered horizontal topic rail.
- Large editorial section heading followed by a consistent three-column card
  grid.
- Image-first cards with compact metadata, strong headlines, an analysis meter,
  and a quiet bottom row.
- A full-width charcoal footer with multiple information groups.

CANTABRIA adaptation:

- Warm off-white canvas instead of clinical white.
- White cards with modest radius, subtle gray border, and small shadow.
- Charcoal masthead typography with cream secondary surfaces.
- Clay, cool gray, and mint framing segments rather than saturated partisan
  red/blue.
- Confidence and sentiment shown as compact text badges, with political framing
  explicitly labeled `AI-estimated`.
- Abstract editorial illustrations using the system palette plus muted topical
  accents.
- More breathing room and softer density than the reference while preserving
  its scan-friendly editorial rhythm.

## Layout, typography, spacing, and colors

### Required page regions

Render these as four visually distinct, full-width regions in this exact order:

1. `TopBar`
   - Slim utility/value strip at the very top of the viewport.
   - Displays a concise product value statement and an
     `Independent analysis` indicator.
2. `SiteHeader`
   - Primary masthead containing the CANTABRIA identity, main navigation, and a
     compact methodology action.
   - Visually taller and more prominent than the top bar.
3. `CategoryBar`
   - Bordered topic/category strip directly beneath the site header.
   - Uses project chips, with responsive wrapping or horizontal overflow.
4. `SiteFooter`
   - Full-width dark editorial footer after the main content.
   - Contains the brand statement, valid same-page topic links, analysis
     principles, and copyright text.

Each region should be its own reusable component in
`components/news/`. The top bar, site header, and category bar may be composed
inside a shared header wrapper, but their markup and visual boundaries must
remain distinct.

### Desktop layout

- Full-width top bar, site header, and category bar.
- Centered content container, maximum width approximately `1200px`.
- `Top stories` header with a concise description/disclosure.
- Three equal card columns at large desktop widths.
- Approximately `24px` horizontal outer gutters and `20–24px` card gaps.
- Footer spans the viewport with an inner grid aligned to the content container.

### Tablet layout

- Header navigation can simplify or wrap without becoming a client-side menu.
- Topic rail may horizontally scroll with hidden decorative scrollbar styling
  only if necessary.
- Cards become a two-column grid.
- Footer reduces to two columns.

### Mobile layout

- Brand and compact utility actions remain visible.
- Secondary navigation and topic chips wrap or scroll without page overflow.
- Cards stack to one column.
- Card artwork keeps a stable editorial aspect ratio.
- Footer becomes a readable vertical stack.
- Maintain `16px` page gutters and avoid horizontal page scroll at `320px`.

### Typography

- Keep global Poppins.
- Brand: bold, tightly tracked, approximately `22–28px`.
- Section heading: `24–32px`, semibold/bold, restrained tracking.
- Card headline: approximately `16px` on compact cards with a `1.3–1.4`
  line-height; clamp visually to avoid irregular card heights without making
  content inaccessible.
- Metadata and badges: `9–11px`.
- Supporting copy: `12–14px`, muted but WCAG-readable.

### Spacing

- Continue the project's 4px-based scale.
- Utility bar: compact `8–12px` vertical rhythm.
- Main header: approximately `64–72px` tall on desktop.
- Topic rail: `12–16px` vertical padding.
- Main content: `40–56px` top and bottom padding.
- Card body: `16px`; keep analysis and metadata spacing consistent.

### Colors

- Continue semantic variables from `app/globals.css`.
- Canvas: `#F8F7F2`.
- Surface: `#FFFFFF`.
- Secondary surface: `#F3EEDF`.
- Primary text: `#333333`.
- Secondary text: `#6F6F6F`.
- Border/divider: existing subtle neutral tokens.
- Framing: existing clay/gray/mint tokens and accessible text counterparts.
- Footer: deep charcoal derived from `--text-primary`, with warm white and muted
  neutral text.
- Add only a small number of muted illustration accent colors when essential;
  do not expand the core design token palette unnecessarily.

## Files likely to change

- `app/page.tsx`
- `app/globals.css`
- `components/news/news-card.tsx`
- `components/news/article-artwork.tsx` (new)
- `components/news/top-bar.tsx` (new)
- `components/news/site-header.tsx` (new)
- `components/news/category-bar.tsx` (new)
- `components/news/site-footer.tsx` (new)
- `components/news/homepage-data.ts` (new fixture boundary)
- `components/design-system/bias-meter.tsx` only if a homepage-specific compact
  mode or accessible labeling improvement is needed
- `components/design-system/icons.tsx` and
  `components/design-system/index.ts` only for small missing local icons

The exact split may be smaller if the result remains readable, but repeated
header, footer, artwork, and card markup must not all be embedded in
`app/page.tsx`.

## Implementation requirements

### Page composition

- Add a skip link targeting the main content.
- Render a dedicated `TopBar` with a concise CANTABRIA value statement and a
  neutral `Independent analysis` indicator.
- Render a dedicated semantic `SiteHeader`:
  - CANTABRIA wordmark linked to `/`;
  - subtitle such as `News intelligence`;
  - visible desktop navigation labels for `Top stories`, `World`,
    `Technology`, and `Climate`, implemented as same-page anchors where
    meaningful;
  - a compact methodology disclosure/control that is not a fake login flow.
- Render a dedicated accessible `CategoryBar` using non-interactive `Chip`
  components for topics represented by fixture articles.
- Build a `Top stories` section with:
  - one `h1`;
  - short editorial supporting copy;
  - clear `Demo editorial data` disclosure;
  - responsive grid of 9–12 fixtures to match the reference's substantial page
    rhythm.
- Render a dedicated `SiteFooter` with:
  - CANTABRIA brand/value statement;
  - topic links to valid same-page anchors;
  - analysis principles;
  - current year or static product copyright text;
  - no fake social or company links.

### Fixture data

- Define an explicit `HomepageArticle` type.
- Include stable unique IDs, topic, region, source, title, short excerpt,
  published label, reading time, sentiment label, political framing label,
  left/center/right percentages, confidence, and artwork variant.
- Use neutral fictional editorial summaries/headlines that demonstrate the
  product without duplicating the reference's politics or presenting fabricated
  claims as current reporting.
- Keep percentages valid and summing to 100.
- Mark the page's content as demo data.

### News card

- Refactor `NewsCard` into a reusable image-first vertical card suited to a
  three-column grid.
- Preserve strongly typed props and semantic `<article>` markup.
- Use local `ArticleArtwork` variants with an accessible description or hide
  purely decorative illustrations appropriately.
- Card information hierarchy:
  1. artwork;
  2. topic and region/source metadata;
  3. headline;
  4. optional short excerpt where height permits;
  5. sentiment and `AI-estimated framing` label;
  6. compact left/center/right percentage meter;
  7. confidence, published label, and reading time.
- Avoid an interactive whole-card treatment because article detail routes do not
  exist.
- Use consistent card heights per grid row where practical, without brittle
  fixed heights.
- Add subtle hover elevation only as visual polish; do not imply clickability
  with a pointer cursor.

### Editorial artwork

- Create 6–8 deterministic SVG/CSS variants such as world, climate, technology,
  economy, science, civic, energy, and culture.
- Use the same view box/aspect ratio for every card to prevent layout shifts.
- Keep detail abstract and geometric, echoing the established
  `EditorialArtwork` style.
- Use `currentColor` or a small controlled palette and no external asset loads.
- SVGs must be decorative (`aria-hidden`) unless a meaningful accessible
  description is provided separately.

### Bias meter

- Continue defensive normalization for invalid values.
- Keep an accessible summary describing all three percentages.
- In compact card mode, avoid duplicating every percentage twice visually.
- Never rely on color alone.
- Always use the wording `AI-estimated framing`.

### CSS and responsive behavior

- Reuse semantic tokens and Tailwind v4 utilities.
- Add global CSS only for genuinely global behavior such as smooth anchor offset,
  skip-link support, or scrollbar treatment.
- Do not add a dark theme; the footer is a deliberate dark surface within the
  existing light system.
- Preserve visible focus styles and reduced-motion behavior.
- No JavaScript-powered menu or carousel is required.

## Security requirements

- No environment variables, credentials, API routes, server actions, Supabase
  clients, scraping, or model calls.
- Do not expose or reference secrets.
- No remote user-controlled images.
- No `dangerouslySetInnerHTML`.
- The page only renders typed, repository-owned fixture content.
- UI code must not trigger scraping, AI analysis, or pipeline mutation.

## Accessibility requirements

- One visible descriptive `h1` and logical heading order.
- Semantic `header`, `nav`, `main`, `section`, `article`, and `footer`.
- Skip link with a visible focused state.
- Navigation landmarks need accessible labels when more than one exists.
- WCAG AA contrast for functional text.
- Framing values include text and percentages, not color alone.
- Decorative artwork and icons are hidden from assistive technology.
- Touch targets for real interactive controls are at least approximately `44px`.
- No keyboard traps, auto-moving content, or essential hover-only information.

## Pixel-perfect expectations

- Match the reference's major proportions: compact utility bar, substantial
  masthead, topic rail, three-column desktop grid, image-first card ratio, and
  full-width footer.
- Maintain consistent artwork heights, card padding, border radius, border
  strength, and meter alignment across the grid.
- Use CANTABRIA's softer surfaces and muted semantic colors throughout.
- Avoid generic dashboard visuals, gradient-heavy heroes, glassmorphism,
  oversized marketing copy, saturated partisan colors, or copied Biasly UI
  details.
- At `1440px`, the first viewport should establish the complete header and at
  least the first card row with a strong resemblance to the reference's density.

## Acceptance criteria

1. `/` is a complete reader-facing CANTABRIA homepage rather than a design-system
   showcase.
2. The page visibly reflects the attached reference's editorial structure while
   remaining faithful to the project style.
3. CANTABRIA branding and original demo content replace all Biasly branding and
   copied news content.
4. The layout uses three card columns on large screens, two on tablets, and one
   on mobile.
5. The layout includes four distinct required regions in order: top bar, site
   header, category bar, and full-width site footer.
6. Cards display artwork, topic/source metadata, title, sentiment,
   AI-estimated framing label, left/center/right percentages, confidence, and
   time metadata.
7. Demo fixtures are isolated in a typed module and clearly disclosed in the UI.
8. No dead article, login, subscription, or social links are introduced.
9. The page has no horizontal overflow at `320px`.
10. Framing is accessible without color and never presented as objective fact.
11. The page remains server-rendered and functional without client JavaScript.
12. No new dependency or backend behavior is introduced.
13. TypeScript, ESLint, and the production build pass.

## Checks to run

From the project root:

1. `npm run typecheck`
2. `npm run lint`
3. `npm run build`

Report exact results and do not claim success without running each command.

## Exact manual test steps expected after implementation

1. Run `npm run dev`.
2. Open `http://localhost:3000`.
3. Confirm the top bar, site header, category bar, `Top stories` grid, and dark
   site footer all render as visually distinct regions in the correct order.
4. Confirm the page visibly says the article content is demo editorial data.
5. Resize to approximately `1440px`, `1200px`, `1024px`, `768px`, `390px`, and
   `320px`.
6. Confirm cards render as three columns on large screens, two on tablet, and one
   on mobile, with no overlap or page-level horizontal scrolling.
7. Confirm each card shows topic/source, headline, sentiment, AI-estimated
   framing, left/center/right percentages, confidence, and time metadata.
8. Confirm every artwork variant keeps the same aspect ratio and no image
   request fails.
9. Use the Tab key from the browser chrome:
   - the skip link appears when focused and moves focus to main content;
   - the wordmark and same-page navigation show visible focus rings;
   - there are no keyboard traps or fake interactive controls.
10. Temporarily disable JavaScript and reload; confirm all homepage content still
    renders.
11. Inspect the browser console and Network panel for runtime errors or failed
    assets.
12. Compare at desktop width with the reference and confirm the hierarchy,
    density, card proportions, topic rail, and footer read as the same class of
    editorial homepage while using CANTABRIA's palette and original content.
