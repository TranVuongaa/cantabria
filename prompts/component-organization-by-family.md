# Component Organization by Family

## Goal

Reorganize the CANTABRIA component system by reusable component family or UI responsibility instead of by page-level ownership. Replace the broad `components/news` and `components/design-system` buckets with focused folders such as `buttons`, `cards`, `navigation`, and related families. Preserve the current homepage behavior, appearance, accessibility, responsive layout, and Server Component boundaries.

## Skills read

- No project skill is required for this refactor. The approved Clerk, Supabase, Oxylabs, and AI SDK skills do not apply because this change is limited to local React component organization and imports.
- Read `AGENTS.md`.
- Read the installed Next.js 16.2.11 guidance in:
  - `node_modules/next/dist/docs/01-app/01-getting-started/02-project-structure.md`
  - `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`

## Existing code inspected

- `app/page.tsx`
- `app/layout.tsx`
- `app/globals.css`
- `components/design-system/bias-meter.tsx`
- `components/design-system/button.tsx`
- `components/design-system/chip.tsx`
- `components/design-system/icons.tsx`
- `components/design-system/index.ts`
- `components/design-system/panel.tsx`
- `components/news/article-artwork.tsx`
- `components/news/category-bar.tsx`
- `components/news/homepage-data.ts`
- `components/news/news-card.tsx`
- `components/news/site-footer.tsx`
- `components/news/top-bar.tsx`
- `tsconfig.json`
- `package.json`
- All current imports that reference `components/`
- Current Git worktree status

## Decisions and assumptions

- Interpret “group components by feature, not by page” as grouping by reusable component family/responsibility, with examples such as buttons and cards.
- This is a structural refactor only. It must not redesign the homepage or alter rendered markup, copy, styling, interactions, responsive behavior, or accessibility semantics.
- Use explicit, focused module paths instead of retaining one broad `components/design-system` barrel.
- Move non-component mock data and its domain types out of `components/` so the components directory contains UI modules only.
- Keep all existing components as Server Components. Do not add `"use client"` because none of the current components require state, effects, event handlers, or browser-only APIs.
- Do not introduce a new dependency, framework, state system, or architectural layer.

## Target organization

```text
components/
  analysis/
    bias-meter.tsx
  buttons/
    button.tsx
  cards/
    news-card.tsx
  chips/
    chip.tsx
  icons/
    icons.tsx
  layout/
    site-footer.tsx
  media/
    article-artwork.tsx
  navigation/
    category-bar.tsx
    top-bar.tsx
  panels/
    panel.tsx
lib/
  data/
    homepage.ts
```

The old `components/news` and `components/design-system` directories should be removed after every file and import has been migrated.

## Files likely to change

- `app/page.tsx`
- `components/analysis/bias-meter.tsx` (moved)
- `components/buttons/button.tsx` (moved)
- `components/cards/news-card.tsx` (moved and imports updated)
- `components/chips/chip.tsx` (moved)
- `components/icons/icons.tsx` (moved)
- `components/layout/site-footer.tsx` (moved)
- `components/media/article-artwork.tsx` (moved)
- `components/navigation/category-bar.tsx` (moved and import updated)
- `components/navigation/top-bar.tsx` (moved)
- `components/panels/panel.tsx` (moved)
- `lib/data/homepage.ts` (moved and type import updated)
- Remove `components/design-system/index.ts`
- Remove the now-empty `components/design-system/` and `components/news/` directories

## Implementation requirements

1. Move each existing component into the target family folder without changing its public component name or prop contract.
2. Move `homepage-data.ts` to `lib/data/homepage.ts`, retaining `HomepageArticle`, framing/sentiment types, categories, and article fixtures.
3. Update the artwork type import in the homepage data module to use the new media path.
4. Update `NewsCard` imports to use:
   - the analysis family for `BiasMeter`
   - the icons family for `ClockIcon` and `InfoIcon`
   - the media family for `ArticleArtwork`
   - `lib/data/homepage` for `HomepageArticle`
5. Update `CategoryBar` to import `Chip` from the chips family.
6. Update `app/page.tsx` to import all components and homepage data from their new focused paths.
7. Replace any remaining references to `@/components/design-system` and `@/components/news`.
8. Do not add compatibility re-export files at the old paths; the migration should be complete and stale paths should fail loudly.
9. Preserve TypeScript strictness and avoid `any`.
10. Keep route files focused on page composition and keep data outside the UI component tree.
11. Verify with a repository search that the old directories are no longer referenced.

## UI and visual interpretation

- The intended visual result is pixel-identical to the current page.
- Preserve the current editorial grid, header, category strip, cards, footer, artwork, framing meter, typography, spacing, colors, borders, shadows, and radii.
- Preserve all current breakpoints and responsive behavior from 320px mobile width through desktop.
- Preserve all focus states, labels, landmarks, and accessible names.
- No CSS token or `app/globals.css` changes are expected.

## Security requirements

- Do not introduce environment-variable access or new client-side modules.
- Do not expose server-only credentials or move any pipeline/data-access logic into browser code.
- Do not add scraping, analysis, authentication, or persistence behavior.
- Keep the refactor limited to static UI modules, mock homepage data, and import paths.

## Acceptance criteria

- Components are organized by focused family/responsibility, including dedicated `buttons` and `cards` folders.
- No page-oriented `components/news` directory remains.
- No broad `components/design-system` directory or barrel remains.
- Mock homepage data lives outside `components/`.
- All imports resolve from their new paths.
- The homepage renders the same content and visual presentation as before.
- No unnecessary Client Component boundary is introduced.
- TypeScript, ESLint, and the production build pass.
- A repository search finds no import or path reference to `components/news` or `components/design-system`.

## Checks to run

From the project root:

```powershell
rg -n "components/(news|design-system)" -g "*.ts" -g "*.tsx" .
npm run typecheck
npm run lint
npm run build
git status --short
```

The first command should return no matches after migration. Report the exact results of all checks.

## Exact manual test steps

1. From the project root, run:

   ```powershell
   npm run dev
   ```

2. Open `http://localhost:3000`.
3. Confirm the sticky CANTABRIA top bar, navigation links, category strip, three-column desktop card grid, framing meters, and footer render as before.
4. Resize the browser to approximately 375px wide and confirm navigation remains horizontally scrollable, cards collapse to one column, text does not overflow, and the footer stacks correctly.
5. At tablet width, confirm the cards use two columns; at desktop width, confirm they use three columns.
6. Use the keyboard to focus the skip link and navigation links, confirming visible focus outlines and that “Skip to main content” moves focus to the main content.
7. Confirm the browser console and development terminal show no import-resolution or hydration errors.
