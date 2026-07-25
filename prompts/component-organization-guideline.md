# Component Organization Guideline

## Goal

Update `AGENTS.md` so future CANTABRIA UI work consistently organizes shared components by reusable family or responsibility—such as buttons, cards, navigation, layout, and analysis—instead of grouping components by page.

## Skills read

- No project skill is required. This is a repository-guidance documentation update and does not involve Clerk, Supabase, Oxylabs, or the AI SDK.
- Read the current `AGENTS.md`.

## Existing code inspected

- `AGENTS.md`
- The implemented component structure under `components/`
- `lib/data/homepage.ts`
- `prompts/component-organization-by-family.md`

## Decisions and assumptions

- Add a concise, durable convention rather than documenting every current folder as a permanently fixed list.
- Treat component family/responsibility as the default organization model.
- Keep data, fixtures, queries, and business logic outside `components/`.
- Prefer explicit focused imports and avoid broad barrels that hide component ownership.
- Do not change application code or the rendered UI.

## Files likely to change

- `AGENTS.md`

## Implementation requirements

1. Add a dedicated component-organization subsection in the architecture/code-standards guidance.
2. State that reusable UI components must be grouped by family or responsibility, with examples such as:
   - `components/buttons`
   - `components/cards`
   - `components/navigation`
   - `components/layout`
   - `components/analysis`
3. State that components should not be grouped by consuming page, such as a broad `components/news` folder.
4. State that non-UI data, fixtures, domain types, queries, and business logic must live outside `components/` in the appropriate `lib/` module.
5. State that imports should use focused module paths rather than a broad catch-all barrel.
6. Allow a new family folder when a genuinely distinct reusable responsibility appears; do not require empty placeholder folders.
7. Keep the wording consistent with the existing separation-of-layers and small-module rules.
8. Avoid unrelated edits or reformatting elsewhere in `AGENTS.md`.

## Security requirements

- Do not change credential, environment-variable, authentication, scraping, AI, database, or server/client security rules.
- Do not introduce application behavior.

## Acceptance criteria

- `AGENTS.md` clearly makes family/responsibility-based component organization the default.
- Page-based component buckets are explicitly discouraged.
- Non-UI code is explicitly kept outside `components/`.
- Focused imports are preferred over a broad barrel.
- Existing architecture and security guidance remains unchanged.

## Checks to run

```powershell
rg -n "Component organization|components/buttons|components/cards|broad.*barrel" AGENTS.md
git diff --check
git diff -- AGENTS.md
git status --short
```

Typecheck, lint, and build are unnecessary because only Markdown documentation changes.

## Exact manual test steps

1. Open `AGENTS.md`.
2. Locate the new component-organization guidance.
3. Confirm it requires family/responsibility folders, keeps non-UI modules outside `components/`, and prefers focused imports.
4. Confirm no application files or runtime behavior changed.
