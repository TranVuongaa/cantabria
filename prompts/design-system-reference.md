# CANTABRIA Design System Implementation

## Goal

Implement a production-quality, reusable design system for CANTABRIA based on the attached UI reference, and replace the current placeholder homepage with a responsive design-system showcase that proves the tokens and primitives work together.

The reference is a visual guide, not a branding/content source. Preserve the CANTABRIA product name and editorial purpose. Do not copy the reference's `biasly News` name or its Trump article content.

## Skills read

- No project skill is required for this task.
- The approved Clerk, Supabase, Oxylabs Web Scraper, and AI SDK skills are unrelated to a visual-only design-system implementation and must not be invoked.

## Project guidance read

- `AGENTS.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/12-images.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md`
- `node_modules/next/dist/docs/03-architecture/accessibility.md`

Relevant conclusions:

- Keep the root layout in `app/layout.tsx`.
- Keep global tokens and truly global styles in the root-imported `app/globals.css`.
- Use Tailwind CSS for component styling and shared React components to avoid duplicated class sets.
- Use `next/font/google` for a self-hosted, layout-stable Poppins font.
- Use semantic headings, accessible controls, visible focus states, and descriptive page metadata.

## Existing code inspected

- `package.json`
- `tsconfig.json`
- `postcss.config.mjs`
- `eslint.config.mjs`
- `app/layout.tsx`
- `app/page.tsx`
- `app/globals.css`
- `public/`

Current state:

- Next.js `16.2.11`, React `19.2.4`, Tailwind CSS v4.
- The app is the minimal starter.
- `app/page.tsx` only renders `page`.
- `app/layout.tsx` still uses Geist and starter metadata.
- `app/globals.css` contains starter light/dark variables and an Arial fallback.
- No shared component directory or application design tokens exist.
- No product UI or data integration exists yet.
- `package.json` currently has no `typecheck` script, although TypeScript is configured with `noEmit`.

## Decisions and assumptions

1. Implement the reference as CANTABRIA's reusable visual system, not as a pixel-for-pixel copy of the reference board's brand or article.
2. Replace the placeholder `/` page with the design-system showcase because there is no current home experience to preserve.
3. Keep the page a Server Component and use native HTML/CSS behavior; do not add client state where none is needed.
4. Do not add mock article persistence, scraping, AI, authentication, or database behavior.
5. Do not introduce a component library or icon dependency. The design system can use small local SVG React components where an icon demonstration is valuable.
6. Do not add a new technology. Tailwind v4, CSS custom properties, React, and `next/font` are sufficient.
7. Use the reference's visual proportions as the target while adapting exact text and demonstrations to CANTABRIA.
8. Remove the automatic starter dark-mode override. The approved reference defines a deliberate warm-light system only; an unrequested dark theme would produce inconsistent colors.

## Visual interpretation

The visual system should feel editorial, calm, analytical, and trustworthy:

- Warm off-white application canvas.
- White and ivory surfaces.
- Strong charcoal typography with muted gray supporting text.
- Pale cream section headers and subtle warm borders.
- Low-contrast shadows with modest depth.
- Compact rounded controls and softly rounded panels.
- Desaturated semantic colors for political framing: warm clay for left, cool neutral gray for center, soft mint for right.
- Dense desktop composition that becomes comfortably stacked and readable on small screens.
- Minimal motion. Hover/focus feedback should be quick and restrained.

The result should visually echo the attached reference's structured board while looking like CANTABRIA rather than a copied artifact.

## Design tokens

Define semantic CSS variables in `app/globals.css`, expose the reusable subset through Tailwind v4 `@theme inline`, and consume semantic names in components.

### Color tokens

- Canvas/background: `#F8F7F2`
- Primary surface: `#FFFFFF`
- Secondary/cream surface: `#F3EEDF`
- Primary text: `#333333`
- Secondary text: `#777777`
- Muted text: approximately `#8A8A84`
- Border: `#E5E7EB`
- Divider: `#ECEDE8`
- Left framing: `#D9A58F` or the closest accessible adaptation of the reference's clay tone
- Center framing: `#E5E7EB`
- Right framing: `#B5E3D6`
- Focus ring: a dark neutral ring that remains visible on cream and white surfaces

Semantic colors may be slightly darkened for foreground text when required to meet WCAG AA contrast. Do not use low-contrast colored text simply to preserve the raw swatch.

### Typography

Use Poppins through `next/font/google` as the global sans family.

- H1: 32px, 700, line-height 1.2
- H2: 24px, 600, line-height 1.3
- H3: 20px, 600, line-height 1.3
- H4: 16px, 500, line-height 1.4
- Body large: 16px, 400, line-height 1.6
- Body medium: 14px, 400, line-height 1.6
- Body small: 13px, 400, line-height 1.6
- Caption/eyebrow: 11px, 500–600, line-height 1.4, uppercase where appropriate

Use fluid/clamped display sizing only where it improves narrow-screen fit without changing the scale's hierarchy.

### Spacing

Use the reference's 4px base unit:

- 4, 8, 16, 24, 32, 40, and 64px are the primary spacing stops.
- Page container max width: 1200px.
- Desktop outer gutter: 24px minimum.
- Mobile outer gutter: 16px.
- Avoid one-off spacing values unless needed for optical alignment.

### Grid

- Desktop showcase: 12-column conceptual grid with 24px gutters.
- Tablet: 6 columns.
- Mobile: 1 stacked column.
- Use CSS Grid with responsive spans; do not force horizontal scrolling.

### Radius

- Small: 4px
- Medium: 8px
- Large: 12px
- Full: 9999px

### Shadow

- Small: `0 1px 2px rgb(0 0 0 / 0.08)`
- Medium: `0 4px 12px rgb(0 0 0 / 0.08)`
- Large: `0 12px 24px rgb(0 0 0 / 0.12)`

## Files likely to change

- `app/globals.css`
- `app/layout.tsx`
- `app/page.tsx`
- `components/design-system/button.tsx` (new)
- `components/design-system/chip.tsx` (new)
- `components/design-system/bias-meter.tsx` (new)
- `components/design-system/panel.tsx` (new)
- `components/design-system/icons.tsx` (new, only if used)
- `components/design-system/index.ts` (new)
- `components/news/news-card.tsx` (new reusable visual example, presentational only)
- `package.json` only if adding the missing `typecheck` script is necessary to satisfy the mandated checks

The exact component split may be made smaller if that improves clarity, but repeated UI patterns must not remain duplicated in `app/page.tsx`.

## Implementation requirements

### Root layout

- Replace Geist with Poppins using `next/font/google`.
- Expose the font using a CSS variable and map it to Tailwind's `font-sans`.
- Update metadata to:
  - title: `CANTABRIA`
  - description: concise copy explaining balanced AI-powered news analysis
- Preserve semantic `<html lang="en">` and a flex-capable minimum-height body.

### Global CSS and Tailwind theme

- Replace starter colors with the semantic tokens above.
- Add token mappings for colors, font, radii, and shadows where Tailwind v4 supports them cleanly.
- Add a minimal reset/base layer:
  - border-box sizing
  - body margin reset
  - global background and text color
  - readable font rendering
  - inherited font for form controls
  - visible `:focus-visible` treatment
- Remove the starter `prefers-color-scheme: dark` block.
- Avoid large global component class collections; keep component styling with components.

### Reusable primitives

Create typed, reusable components with semantic HTML:

1. `Panel`
   - Optional eyebrow/header label.
   - White surface, warm cream header strip, subtle border, medium radius, small shadow.
   - Supports `className` and children without using `any`.

2. `Button`
   - Variants: `primary`, `secondary`, `outline`, `text`.
   - Sizes suitable for compact editorial controls.
   - Hover, active, focus-visible, and disabled states.
   - Native button props and correct disabled semantics.

3. `Chip`
   - Neutral category treatment.
   - Optional trailing plus icon.
   - Compact full-radius shape.
   - If interactive, use a button; otherwise render non-interactive semantic text.

4. `BiasMeter`
   - Accepts left, center, and right percentages.
   - Renders the three muted semantic segments.
   - Includes visible labels/percentages and a concise accessible label.
   - Defensively handles invalid display input by normalizing or falling back without producing broken widths.
   - Must not present political framing as objective fact; label the example as `AI-estimated framing`.

5. `NewsCard`
   - Presentational component only, using typed props.
   - Demonstrates category/source metadata, title, excerpt, date/time, read time, and the bias meter.
   - Do not use the reference's political article or any copied claims.
   - Use an intentional abstract/editorial image treatment implemented in CSS or a local decorative SVG rather than a remote stock image.
   - If decorative, give it empty alt text; if meaningful, provide descriptive alt text.

6. Icons
   - If an icon grid is included, use a small, consistent set of local line-style SVG components.
   - `currentColor`, rounded caps/joins, approximately 2px visual stroke.
   - Decorative icons must use `aria-hidden`.
   - Icon-only interactive controls require accessible names.

### Homepage showcase

Build a polished, responsive showcase using the reusable components. The page should include:

- A top identity/intro panel for CANTABRIA with a concise product statement.
- A colors panel showing primary, semantic, and neutral swatches with names and hex values.
- A typography panel showing the scale and its intended roles.
- A UI-elements panel showing button variants/states, chips, and the AI-estimated framing meter.
- An icon panel if local icons are created.
- A news-card example adapted to CANTABRIA.
- A spacing panel showing the 4px-based scale.
- A grid-system panel visualizing columns/gutters.
- Shadow and border-radius panels.
- A compact footer with product name and a short system principle.

Use real semantic headings in a logical hierarchy. The showcase should not be a screenshot reconstruction made from fixed pixel positioning.

### Responsive behavior

- At 1200px and above, approximate the reference's dense multi-column board.
- Between tablet widths, shift to a balanced two-column layout.
- Below approximately 720px, stack panels in a single column.
- Keep touch targets at least 44px where controls are genuinely interactive; compact non-interactive samples may be smaller.
- Allow typography tables/demos to reflow; do not cause page-level horizontal overflow.
- News cards change from side-by-side media/content to stacked media/content on narrow screens.
- Footer content wraps or stacks cleanly.

### Pixel-quality expectations

- Match the reference's restrained border contrast, cream section bars, compact density, and editorial hierarchy.
- Use consistent panel header heights, inner padding, grid gaps, corner radii, and shadow intensity.
- Align baselines and swatch labels carefully.
- Avoid excessive gradients, glassmorphism, oversized hero text, dark-mode styling, or generic dashboard aesthetics.
- Avoid dense inline Tailwind strings when a small extracted component makes intent clearer.

## Security requirements

- No environment variables, secrets, API routes, database clients, scraping, or AI calls are needed.
- Keep the implementation static/presentational and server-rendered.
- Do not use unsafe HTML insertion.
- Do not load remote user-controlled images.
- Do not introduce browser-visible credentials or backend behavior.

## Accessibility requirements

- One descriptive page `<h1>` and a logical heading hierarchy.
- WCAG AA contrast for functional text and controls.
- Visible keyboard focus states.
- Native button semantics and correct disabled states.
- Accessible names for icon-only controls.
- Do not communicate left/center/right values by color alone; always include text and percentages.
- Decorative visuals must be hidden from assistive technologies.
- Respect `prefers-reduced-motion` for any nonessential transition or animation.

## Acceptance criteria

1. `/` presents a complete CANTABRIA design-system showcase rather than the placeholder.
2. The UI clearly reflects the attached reference's warm, minimal, editorial visual language.
3. CANTABRIA branding replaces the reference brand and copied article content.
4. Poppins is loaded with `next/font` and used globally without browser requests to Google.
5. Semantic design tokens exist in `app/globals.css` and are used by the components.
6. At least Panel, Button, Chip, BiasMeter, and NewsCard are reusable typed components.
7. The meter includes left/center/right text and percentages, not color alone.
8. The page has no horizontal overflow at 320px wide.
9. The layout is polished at mobile, tablet, desktop, and 1440px-wide desktop sizes.
10. Hover, focus-visible, active, and disabled states are visibly distinct where applicable.
11. No new runtime dependency is added.
12. No backend, authentication, scraping, AI, or persistence behavior is introduced.
13. TypeScript, ESLint, and production build checks pass.

## Checks to run

From the project root:

1. `npm run typecheck`
   - If the script is absent, add `"typecheck": "tsc --noEmit"` to `package.json` and then run it.
2. `npm run lint`
3. `npm run build`

Report the exact results. Do not claim a check passed without running it.

## Exact manual test steps after implementation

1. Run `npm run dev`.
2. Open `http://localhost:3000`.
3. Confirm the page shows CANTABRIA branding and all design-system sections.
4. Resize to approximately 1440px, 1024px, 768px, 390px, and 320px widths.
5. At every width, confirm:
   - panels do not overlap;
   - the page does not scroll horizontally;
   - text remains readable;
   - the news card changes to the intended stacked layout on narrow screens;
   - meter labels and percentages remain visible.
6. Use the Tab key to move through controls and confirm a visible focus indicator.
7. Confirm disabled buttons cannot be activated and look distinct from active controls.
8. Inspect the colors, spacing samples, shadows, and radii for consistency with the attached reference.
9. In browser developer tools, confirm no unexpected runtime errors or failed asset requests.
10. Optionally disable JavaScript and reload to confirm the static showcase content remains visible.
