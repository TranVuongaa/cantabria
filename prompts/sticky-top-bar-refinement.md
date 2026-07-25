# Sticky Top Bar Refinement

## Goal

Simplify the CANTABRIA homepage chrome so the current white `SiteHeader` becomes
the single top bar. Remove the slim dark utility strip, rename the header
component to `TopBar`, keep that bar visible while the page scrolls, and replace
the `Our method` label with `Login`.

## Skills read

- No approved project skill is required for this small visual refinement.
- Clerk is intentionally not used because the user requested a label and layout
  change, not authentication implementation, and the project has no Clerk setup
  or sign-in route.

## Project guidance read

- `AGENTS.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md`

Relevant conclusion:

- Use Tailwind component utilities for the sticky positioning and visual
  treatment; no global CSS or client-side scroll handler is needed.

## Existing code inspected

- `app/page.tsx`
- `components/news/top-bar.tsx`
- `components/news/site-header.tsx`
- `components/news/category-bar.tsx`

Current state:

- `TopBar` is the slim charcoal utility strip.
- `SiteHeader` is the white CANTABRIA masthead the user wants to retain.
- Both are rendered before the category bar.
- `SiteHeader` contains the `Our method` same-page link.

## Decisions and assumptions

1. Remove the slim charcoal bar entirely.
2. Rename the existing white masthead component and file from `SiteHeader` /
   `site-header.tsx` to `TopBar` / `top-bar.tsx`.
3. Use CSS `position: sticky` with `top: 0` and an appropriate stacking layer so
   the top bar remains visible while scrolling without JavaScript.
4. The category bar remains a separate region and scrolls normally; only the
   renamed top bar stays pinned.
5. Change the right-side label from `Our method` to `Login`.
6. Do not add Clerk, a login page, or a dead link. Render `Login` as a
   presentational control in this visual-only refinement; authentication
   behavior can be connected when a real sign-in route is implemented.
7. Preserve the current responsive navigation, CANTABRIA branding, focus
   styles, and mobile layout.

## Files likely to change

- `components/news/top-bar.tsx`
- `components/news/site-header.tsx` (removed after its implementation is moved)
- `app/page.tsx`
- `prompts/home-page-editorial-grid.md` only if its component inventory needs to
  reflect the final approved structure

## Implementation requirements

- Replace the current contents of `components/news/top-bar.tsx` with the white
  masthead currently implemented in `components/news/site-header.tsx`.
- Export the component as `TopBar`.
- Apply `sticky top-0` and a stacking class such as `z-40` to the semantic
  `<header>`.
- Keep the surface opaque and retain its bottom border so content passing under
  it does not reduce legibility.
- Add a small shadow only if needed to separate the pinned bar from scrolling
  content.
- Change the right-side control text to `Login`.
- Remove its obsolete `#analysis-principles` destination because Login must not
  navigate to methodology content.
- Keep the control presentational and server-rendered; do not add client state
  or a fake login flow.
- Remove `components/news/site-header.tsx`.
- Remove the `SiteHeader` import and render call from `app/page.tsx`.
- Keep one `<TopBar />` immediately before the category bar.
- Preserve the category bar and footer unchanged.

## Responsive expectations

- Desktop: the full brand, primary navigation, and Login control remain in one
  sticky white bar.
- Mobile: the existing wrap/overflow behavior remains usable without horizontal
  page overflow.
- Scrolling: the top bar remains pinned at the viewport top at all breakpoints;
  the category bar and page content scroll beneath it.

## Security requirements

- Do not add authentication secrets, environment variables, routes, or Clerk.
- Do not create a fake `/login` destination.
- Do not introduce client-side state or event handlers.

## Accessibility requirements

- Preserve the semantic `<header>` and labeled primary `<nav>`.
- Preserve visible focus treatment for the home and navigation links.
- The Login presentation must not claim a working navigation destination.
- The sticky bar must not cover same-page anchor targets; retain appropriate
  scroll margins on existing target elements.

## Acceptance criteria

1. The slim charcoal utility strip is gone.
2. The former white site header is now the only `TopBar`.
3. `components/news/site-header.tsx` no longer exists.
4. The top bar remains visible while scrolling.
5. The category bar scrolls normally and is not merged into the sticky bar.
6. `Our method` is replaced by `Login`.
7. No Clerk integration, login route, or dead login link is introduced.
8. The desktop and mobile header layouts remain intact.
9. TypeScript, ESLint, and the production build pass.

## Checks to run

1. `npm run typecheck`
2. `npm run lint`
3. `npm run build`

## Exact manual test steps expected after implementation

1. Run `npm run dev`.
2. Open `http://localhost:3000`.
3. Confirm the dark utility strip no longer appears.
4. Confirm the white CANTABRIA masthead is the first visible bar.
5. Confirm its right-side control says `Login`.
6. Scroll through several rows of cards and confirm the white top bar remains
   pinned to the viewport top.
7. Confirm the category bar scrolls away with the main page.
8. Test at `1440px`, `768px`, `390px`, and `320px`.
9. Confirm the top bar does not overlap controls or cause horizontal page
   scrolling.
10. Tab through the header and confirm focus remains visible.
