# Clerk Authentication Implementation

## Goal

Add production-ready Clerk authentication to the existing CANTABRIA Next.js
application. Visitors must be able to browse the public news homepage and news
details pages without signing in, create an account or sign in through
repository-owned routes, see authentication-aware controls in the existing top
bar, manage their Clerk account when signed in, and sign out.

This task establishes authentication infrastructure and UI only. It does not add
personalization, private dashboards, organization support, billing, Clerk
webhooks, Supabase user synchronization, roles, or permissions.

## Skills read

- `.agents/skills/clerk/SKILL.md`
  - Routed this task to the Clerk setup guidance.
  - Confirmed that a new project without an installed Clerk SDK should use the
    current SDK generation.
- `.agents/skills/clerk-setup/SKILL.md`
  - Confirmed the Next.js package, environment, provider, Proxy, auth page, and
    testing requirements.
  - Confirmed that current Clerk requires Node.js `20.9.0` or newer and that
    `ClerkProvider` belongs inside `<body>`.
- `.agents/skills/clerk-nextjs-patterns/SKILL.md`
- `.agents/skills/clerk-nextjs-patterns/references/middleware-strategies.md`
  - Confirmed the separation between server auth APIs and client-facing Clerk
    components.
  - Reviewed public-first and protected-first behavior. The current public news
    product does not have a private resource to protect.

No other project skill is needed. Supabase, Oxylabs, and AI SDK behavior is
outside this authentication-only task.

## Live and installed documentation read

- Current Clerk Next.js App Router quickstart:
  `https://clerk.com/docs/nextjs/getting-started/quickstart`
- Current Clerk `clerkMiddleware()` reference:
  `https://clerk.com/docs/reference/nextjs/clerk-middleware`
- Current Clerk custom sign-in/sign-up page guidance:
  `https://clerk.com/docs/nextjs/guides/development/custom-sign-in-or-up-page`
  and
  `https://clerk.com/docs/nextjs/guides/development/custom-sign-up-page`
- `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`
- `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/layout.md`

Relevant conclusions:

- Next.js `16.2.11` uses a root `proxy.ts`; the old `middleware.ts` convention
  is deprecated.
- Clerk's current quickstart matcher skips framework internals and static files,
  covers API routes, and includes Clerk frontend API routes.
- Current Clerk middleware is public by default. Authentication and
  authorization should be enforced close to protected resources rather than
  inventing global route protection.
- The current Clerk reference deprecates `createRouteMatcher()` for protecting
  resources, so it must not be introduced when the app has no protected
  resource.
- Optional catch-all App Router pages are the supported shape for hosted
  `/sign-in` and `/sign-up` components.

## Existing code inspected

- `package.json`
- `package-lock.json`
- `README.md`
- `.env.local` variable names only; secret values were not printed
- `.gitignore`
- `app/layout.tsx`
- `app/globals.css`
- `app/page.tsx`
- `app/news/[id]/page.tsx`
- `components/navigation/top-bar.tsx`
- `components/buttons/button.tsx`
- existing prompt files in `prompts/`

Current state:

- Next.js `16.2.11`, React `19.2.4`, TypeScript, Tailwind CSS v4, and Node.js
  `24.16.0` are in use.
- No authentication package or previous authentication implementation exists.
- The current `@clerk/nextjs` release resolved from npm is `7.6.1`, which is the
  current Clerk SDK generation.
- `.env.local` already contains variable entries for
  `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`.
- `.env.example` does not exist yet.
- There is no `components.json`, so the project does not use shadcn/ui and the
  Clerk shadcn theme package is not required.
- The homepage and news details pages both render the shared `TopBar`.
- The current application has no private page, user-scoped database query,
  Server Action, or API route.
- The worktree has no overlapping application-code changes for the files in
  this prompt.

## Decisions and assumptions

1. Keep `/` and `/news/[id]` public because CANTABRIA is a reader-facing news
   site and the user did not request a private dashboard or paywall.
2. Install the current `@clerk/nextjs` package through npm and let npm record the
   compatible version in both package files.
3. Use Clerk's prebuilt components rather than building a custom credential or
   OAuth flow.
4. Host dedicated `/sign-in` and `/sign-up` pages using optional catch-all route
   segments so redirects and multi-step auth flows work.
5. Use redirect-based header actions that target the local auth pages.
6. After successful direct sign-in or sign-up, fall back to `/`; preserve a
   Clerk-provided return URL when one exists.
7. Add a root `proxy.ts` with Clerk's current standard matcher and no global
   protection callback. This initializes auth state without making public news
   inaccessible.
8. Do not use deprecated `createRouteMatcher()` when there is currently nothing
   private to match.
9. Add a focused reusable `components/auth` family because authentication
   controls and the auth-page shell are distinct reusable responsibilities.
10. Keep the existing CANTABRIA navigation, methodology action, Poppins font,
    warm canvas, charcoal text, restrained borders, and responsive behavior.
11. Do not provision or link a new Clerk application because keys are already
    present. Do not overwrite, rotate, log, or commit those keys.
12. Document all Clerk variables used by the implementation in a new
    `.env.example`. Add only non-secret local route and fallback values to
    `.env.local` if they are missing; preserve its existing key values exactly.
13. Do not sync Clerk users into Supabase. No user table or user-owned data
    requirement exists in the current scope.

## Files likely to change

- `package.json`
- `package-lock.json`
- `.env.example` (new)
- `.env.local` (local-only non-secret route configuration, only if missing)
- `proxy.ts` (new)
- `app/layout.tsx`
- `app/sign-in/[[...sign-in]]/page.tsx` (new)
- `app/sign-up/[[...sign-up]]/page.tsx` (new)
- `components/auth/auth-controls.tsx` (new)
- `components/auth/auth-page-shell.tsx` (new, only if it prevents duplicated
  auth-page structure)
- `components/navigation/top-bar.tsx`

Avoid changing unrelated news cards, analysis components, fixture data, article
queries, footer behavior, or global design tokens.

## Implementation requirements

### Package and global setup

- Install `@clerk/nextjs` with npm.
- Import `ClerkProvider` from `@clerk/nextjs`.
- Place `ClerkProvider` inside the root layout's `<body>` and wrap all route
  content without moving or duplicating `<html>` or `<body>`.
- Do not add `dynamic` rendering unless an actual server-side auth read requires
  it. Header auth components can rely on Clerk's supported component boundary.
- Preserve root metadata, Poppins configuration, and body layout classes.

### Proxy

- Add `proxy.ts` at the project root for Next.js 16.
- Export Clerk's `clerkMiddleware()` as the default.
- Use the current documented constant matcher that:
  - skips Next.js internals and ordinary static assets;
  - always covers API/TRPC paths;
  - covers Clerk-specific frontend API paths.
- Do not use `middleware.ts`.
- Do not add global `auth.protect()` behavior or deprecated
  `createRouteMatcher()` calls.
- Do not add development debug logging to production configuration.

### Environment configuration

- Create `.env.example` with safe placeholders for:
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  - `CLERK_SECRET_KEY`
  - `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`
  - `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`
  - `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/`
  - `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/`
- Never copy real keys from `.env.local` into tracked files or output.
- Preserve the existing `.env.local` key values. Add the four public route and
  fallback variables locally only when absent.
- Do not introduce force-redirect URLs; fallback redirects preserve legitimate
  return destinations.

### Authentication pages

- Add `app/sign-in/[[...sign-in]]/page.tsx` with Clerk's prebuilt `<SignIn />`.
- Add `app/sign-up/[[...sign-up]]/page.tsx` with Clerk's prebuilt `<SignUp />`.
- Give both routes useful CANTABRIA metadata.
- Render each component in a semantic, centered auth-page shell that:
  - includes a CANTABRIA home link;
  - uses the existing warm canvas and typography;
  - has enough vertical breathing room for multi-step flows;
  - does not constrain or clip Clerk dialogs, validation, OAuth, MFA, or session
    task content;
  - provides a short, neutral explanation of the benefit of signing in;
  - remains usable at `320px` without horizontal page overflow.
- Use Clerk's default prebuilt UI behavior. Do not add `@clerk/ui`, a new theme
  dependency, or custom authentication hooks.

### Shared header controls

- Add a reusable `AuthControls` component in `components/auth/`.
- For signed-out visitors, render:
  - a visually quiet `Sign in` action;
  - a stronger `Create account` action.
- For signed-in users, render Clerk's `UserButton` with account management and
  sign-out behavior, and an accessible label or surrounding context.
- Use current Clerk conditional rendering (`Show`) rather than legacy
  `SignedIn`/`SignedOut` components.
- Integrate the controls into the right-hand action region of `TopBar` while
  preserving the existing methodology link.
- Use the existing radius, surface, border, and text tokens. Auth controls must
  look native to CANTABRIA, not like an unrelated purple SaaS toolbar.
- Keep real interactive targets approximately `44px` high, retain visible focus
  rings, and avoid nested interactive elements invalid in HTML.

### Responsive layout

- Desktop: methodology and auth controls form a compact right-aligned action
  group without displacing the centered primary navigation unnecessarily.
- Tablet: actions may wrap with the existing header layout while maintaining a
  clear reading order.
- Mobile: brand, methodology, and authentication remain reachable; primary
  navigation can continue on its existing overflow row with no page-level
  horizontal scrolling.
- The signed-in avatar must not cause layout shift large enough to reflow the
  entire masthead.

### Auth boundaries

- No existing public page should call `auth()` solely to prove authentication is
  installed.
- No current content or route should become private.
- If implementation discovers a genuinely private resource not visible during
  inspection, stop and amend the prompt rather than silently choosing a policy.
- Future private Server Components, Route Handlers, and Server Actions must use
  `await auth()` from `@clerk/nextjs/server` close to the protected resource, but
  adding such future resources is outside this task.

## Security requirements

- `CLERK_SECRET_KEY` remains server-only and must never be imported, referenced,
  serialized, or rendered by client code.
- Only `NEXT_PUBLIC_*` Clerk configuration may reach browser code.
- Never print actual environment values in commands, logs, diffs, test output,
  or the final response.
- Do not commit `.env.local`.
- Do not add auth tokens to URLs, local storage, fixture data, or cookies
  managed outside Clerk.
- Do not build a custom password form or handle credentials directly.
- Do not expose a Clerk backend client to the browser.
- Do not add user impersonation, webhook endpoints, organizations, roles,
  billing, or user synchronization.
- Preserve the existing admin-secret architecture described by `AGENTS.md`;
  Clerk sessions must not replace administrative pipeline secrets in future API
  work.

## Accessibility requirements

- Sign-in and create-account controls have clear accessible names.
- All interactive elements have visible keyboard focus.
- Auth pages have one clear `h1`, meaningful supporting copy, and a logical
  landmark structure.
- The CANTABRIA home link is keyboard accessible.
- Authentication controls do not rely on color alone.
- Touch targets are approximately `44px` high where layout allows.
- No focus trap is introduced outside Clerk's own supported modal/dialog
  behavior.
- Error messages and labels inside auth flows remain owned by Clerk's accessible
  prebuilt components.

## Acceptance criteria

1. `@clerk/nextjs` is installed and recorded in both package files.
2. `ClerkProvider` wraps the app inside `<body>` without changing existing
   metadata, font loading, or page layout behavior.
3. Root `proxy.ts` uses Clerk's current Next.js 16 setup and documented matcher.
4. `/`, `/news/[id]`, `/sign-in`, and `/sign-up` remain publicly reachable.
5. Signed-out users see working `Sign in` and `Create account` controls in the
   shared top bar.
6. `/sign-in` and `/sign-up` render Clerk's supported prebuilt flows on
   CANTABRIA-styled responsive pages.
7. Successful sign-in/sign-up returns to the intended return URL when present,
   otherwise `/`.
8. Signed-in users see a stable `UserButton`, can open account management, and
   can sign out.
9. Signed-out controls replace the signed-in account control correctly without
   hydration errors.
10. The header remains usable without horizontal page overflow at `320px`.
11. `.env.example` documents every Clerk variable used and contains no real
    credentials.
12. Existing `.env.local` secrets remain unchanged and unexposed.
13. No unrequested private route, user synchronization, organization, role,
    billing, webhook, or Supabase behavior is added.
14. TypeScript, ESLint, and the Next.js production build pass.

## Checks to run

From the project root:

1. `npm run typecheck`
2. `npm run lint`
3. `npm run build`

Also inspect `git diff --check` and the final diff for accidentally exposed
environment values. Report the exact check results; do not claim a check passed
without running it.

## Exact manual test steps expected after implementation

1. Confirm `.env.local` contains valid development values for
   `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`, plus the documented
   sign-in/sign-up route and fallback variables. Do not paste their values into
   the terminal or chat.
2. Run `npm run dev`.
3. Open `http://localhost:3000` in a signed-out or private browser window.
4. Confirm the homepage remains readable without authentication and the top bar
   shows `Sign in` and `Create account`.
5. Open a demo article and confirm `/news/<valid-demo-id>` also remains public
   and shows the same signed-out controls.
6. Select `Sign in`; confirm navigation reaches the local `/sign-in` route and
   the Clerk flow renders without console or network errors.
7. Return home, select `Create account`, and confirm navigation reaches the
   local `/sign-up` route.
8. Create a development user using a Clerk-enabled method configured for the
   instance. Complete any verification or session task Clerk requests.
9. Confirm successful sign-up returns to `/` when no earlier return URL exists.
10. Confirm the header now shows the Clerk account avatar instead of signed-out
    controls.
11. Reload the page and navigate between `/` and a valid `/news/<id>` route;
    confirm the session and account control persist without hydration warnings.
12. Open the `UserButton`; confirm account management is reachable.
13. Sign out; confirm the header returns to the signed-out controls and public
    news content remains accessible.
14. Visit `/sign-in` while already signed in; confirm Clerk safely redirects
    according to its single-session behavior instead of rendering a broken form.
15. Resize the homepage and both auth pages at approximately `1440px`, `768px`,
    `390px`, and `320px`. Confirm controls remain reachable, focus rings are
    visible, Clerk content is not clipped, and there is no page-level horizontal
    overflow.
16. Use only the keyboard to reach the top-bar auth controls, submit an auth
    screen as far as practical, open the user menu, and sign out.
17. Inspect the browser console for hydration/runtime errors and inspect loaded
    client assets to confirm `CLERK_SECRET_KEY` is never exposed.
