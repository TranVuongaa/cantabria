# CANTABRIA News Details Source Breakdown Amendment

## Goal

Add the missing `Source breakdown` panel to the news details page analysis rail,
following the attached reference's third-sidebar-card composition. Update the
details-page presentation terminology from `Framing` to `Bias`, while always
qualifying political bias as `AI-estimated`.

Because the current project is a typed local demonstration with no Supabase
source-comparison data, the panel must use clearly labeled fictional demo source
cohorts. It must not imply that the displayed publications are real citations,
that the article was corroborated by those outlets, or that the source
distribution came from a live analysis pipeline.

## Skills read

- No approved project skill is required for this fixture-backed presentation
  change.
- The Supabase skill is not used because the SDK, schema, clients, and
  source-comparison query layer are absent from this project.
- Clerk, Oxylabs Web Scraper, and AI SDK are unrelated because this amendment
  only renders stored demo data.

## Existing code inspected

- `AGENTS.md`
- `prompts/news-details-page-ui.md`
- `app/news/[id]/page.tsx`
- `lib/data/articles.ts`
- `lib/data/homepage.ts`
- `components/analysis/analysis-overview.tsx`
- `components/analysis/analysis-summary.tsx`
- `components/analysis/analysis-notes.tsx`
- `components/analysis/bias-meter.tsx`
- `components/panels/panel.tsx`
- `app/globals.css`

Current state:

- The detail page has framing overview, AI analysis summary, and analysis notes
  panels in the right rail.
- It does not include the reference's source-distribution panel.
- Article fixtures contain one display source but no multi-source coverage,
  per-source political label, comparison count, or source provenance.
- The application has no live data layer from which an honest real-source
  breakdown can be queried.

## Decisions and assumptions

1. Add a fourth sidebar panel named `Source breakdown`, placed after
   `Analysis notes`, matching the reference's vertical rhythm.
2. Add typed source-cohort data to the article detail fixture boundary.
3. Use original fictional publication names such as `North Coast Ledger` and
   `Civic Wire`; do not use Reuters, BBC, Fox News, The New York Times, or other
   real publishers from the reference.
4. Label the panel `Illustrative demo cohort` and include an always-visible note
   that the entries are fictional interface data, not citations.
5. Keep source labels limited to `Left`, `Center`, and `Right` for a clear
   count-based distribution.
6. Derive total source count, label counts, and percentages from the source-row
   array in code so the visual cannot drift from the displayed list.
7. Use a small number of deterministic, topic-relevant demo cohorts that may be
   shared across related articles. Do not duplicate large source arrays inside
   every article object.
8. Treat this breakdown as separate from the article-text AI framing estimate.
   Its percentages do not replace or silently modify the existing article
   framing values.
9. Do not add `View all sources` or other buttons unless there is an actual
   destination or interaction. The complete short demo list should be visible
   in the card.
10. Use exactly eight visible sources in every demo cohort. Derive all displayed
    totals from the source array, and show `Based on 8 illustrative demo
    sources` under the overall bias value.
11. Replace details-page UI wording as follows:
    - `Framing overview` → `Bias analysis`;
    - `Strongest AI-estimated signal` → `Overall AI-estimated bias`;
    - `Framing distribution` → `Bias distribution`;
    - `AI-estimated framing` → `AI-estimated bias`;
    - `Framing notes` → `Bias notes`;
    - source-list column `Label` → `Bias`.
    Internal persisted/type field names such as `framing` may remain unchanged
    when renaming them would create unnecessary churn.
12. Add a real `How we analyze bias` action at the bottom of the `Bias
    analysis` panel. Implement it as an accessible link styled like the
    reference's full-width outline button, targeting the on-page Bias Notes and
    limitations section at `#bias-methodology`.

## Visual interpretation

- Use the same bordered white `Panel` surface, radius, padding, heading scale,
  info icon, and shadow as the other analysis cards.
- Header:
  - eyebrow: `Illustrative demo cohort`;
  - heading: `Source breakdown`;
  - `8 total sources` immediately below.
- Distribution:
  - three compact rows labeled `Left`, `Center`, and `Right`;
  - each row shows count, percentage, and a proportional horizontal bar;
  - use the existing clay, gray, and mint framing palette;
  - never rely on color alone.
- Source list:
  - divider above the list;
  - `Demo publication` and `Bias` column headings;
  - compact rows with publication name on the left and text label on the right;
  - left labels use clay text, center labels use neutral text, and right labels
    use mint text.
- Disclosure:
  - quiet bordered or secondary-surface note at the bottom;
  - explicitly state that the names and distribution are fictional demo data
    and are not reporting citations.
- Bias analysis action:
  - full-width outline treatment below the existing explanatory copy;
  - label exactly `How we analyze bias`;
  - compact rectangular shape matching the reference and existing button
    tokens;
  - navigates to the real `#bias-methodology` section rather than opening an
    unimplemented modal.

## Layout, typography, spacing, colors, and responsiveness

- Match the current analysis panels' `p-5 sm:p-6` internal padding.
- Heading approximately `19px`, bold, tightly tracked.
- Eyebrow and column labels approximately `8–9px`.
- Source total and distribution labels approximately `9–10px`.
- Source rows approximately `10px` with `10–12px` vertical spacing.
- Bar track height approximately `5–7px`, with a neutral secondary track and
  semantic filled portion.
- Maintain the existing `space-y-5` sidebar rhythm.
- The `How we analyze bias` action must be at least `44px` high, preserve a
  visible keyboard focus state, and use the existing outline-button styling.
- The panel must fit the existing `340px` desktop rail without truncating source
  names.
- On tablet and mobile it becomes full width with the other analysis panels.
- No horizontal overflow at `320px`.

## Data requirements

- Add:
  - `SourceBiasLabel = "Left" | "Center" | "Right"`;
  - `SourceBreakdownEntry` with stable `id`, fictional `name`, and `label`;
  - `sourceBreakdown: readonly SourceBreakdownEntry[]` to `ArticleDetails`.
- Keep all source-cohort fixtures and types in `lib/data/articles.ts` or a
  focused `lib/data/source-breakdowns.ts` module.
- Use stable IDs even when a display name is shared across cohorts.
- Provide exactly eight entries per displayed cohort so the list has comparable
  density to the reference and the source count is explicit.
- Ensure all current article routes resolve to a non-empty source cohort.
- Compute counts and percentages in a reusable pure helper or inside the
  component from the stored entries.
- Percentages must total 100 after rounding; allocate any rounding remainder
  deterministically.

## Files likely to change

- `lib/data/articles.ts`
- `components/analysis/source-breakdown.tsx` (new)
- `components/analysis/analysis-overview.tsx`
- `components/analysis/analysis-notes.tsx`
- `components/analysis/bias-meter.tsx` if a configurable accessible title is
  needed
- `app/news/[id]/page.tsx`

No schema, API, environment, homepage, or pipeline file should change.

## Implementation requirements

1. Create a focused `SourceBreakdown` Server Component under
   `components/analysis/`.
2. Accept typed source entries as props.
3. Derive:
   - total count;
   - per-label count;
   - per-label percentage;
   - accessible distribution summary.
4. Render the distribution rows and full source list using semantic headings
   and list/table-like markup.
5. Add a visible fictional-data disclosure.
6. Add the component after `AnalysisNotes` in the existing sticky sidebar stack.
7. Supply source breakdown data for every detail article through the typed data
   layer.
8. Pass the derived source count into `AnalysisOverview` and render
   `Based on 8 illustrative demo sources` directly below the overall
   AI-estimated bias.
9. Replace visible details-page `Framing` terminology with `Bias` using the
   approved mapping above. Keep the `AI-estimated` qualifier and disclaimer.
10. Add `id="bias-methodology"` and an appropriate scroll offset to the Bias
    Notes/limitations panel.
11. Render a full-width `How we analyze bias` link in `AnalysisOverview`,
    targeting `#bias-methodology`.
12. Preserve Server Component rendering and JavaScript-free usefulness.
13. Do not alter the article summary, body, or related-story behavior.

## Security requirements

- No API calls, scraping, AI calls, database access, environment variables,
  credentials, server actions, or client-side mutation.
- No real source URLs or external navigation.
- No `dangerouslySetInnerHTML`.
- Render repository-owned typed strings only.
- The disclosure must prevent the fictional cohort from being confused with
  real reporting provenance.

## Accessibility requirements

- Give the panel a clear heading.
- Provide counts and percentages in text, not only bar width or color.
- Include an accessible summary of the complete distribution.
- Preserve logical reading order: distribution, source list, disclosure.
- Use semantic list markup and readable contrast.
- Decorative bar tracks and info icons remain hidden from assistive technology.

## Pixel-perfect expectations

- The new panel should read as the missing bottom card from the attached
  reference: title, total, three distribution rows, source-name/label rows, and
  a quiet bottom disclosure.
- It must visually match the existing CANTABRIA analysis rail rather than appear
  bolted on.
- At desktop width, all four analysis cards should form a consistent vertical
  column with aligned edges and equal gaps.

## Acceptance criteria

1. Every valid `/news/[id]` page displays a `Source breakdown` panel.
2. The panel includes `8 total sources`, Left/Center/Right counts and
   percentages, proportional bars, and exactly eight named demo source rows.
3. Counts and percentages are derived from and consistent with the visible
   rows.
4. Percentages total 100.
5. All source names are fictional and the disclosure explicitly identifies
   them as demo data rather than citations.
6. The panel uses existing semantic framing colors and remains understandable
   without color.
7. It fits the desktop analysis rail and produces no horizontal overflow at
   `320px`.
8. Existing details-page content and routing continue to work.
9. No dependency, backend behavior, schema, or environment variable is added.
10. TypeScript, ESLint, and the production build pass.
11. Details-page headings and labels use `Bias` instead of `Framing`, while
    political bias remains explicitly described as AI-estimated.
12. The bias overview visibly states `Based on 8 illustrative demo sources`,
    derived from the same source array rendered in the breakdown panel.
13. The Bias Analysis card includes a full-width `How we analyze bias` outline
    action that navigates to the visible Bias Notes and limitations content.
14. The methodology action works with keyboard navigation and without client
    JavaScript.

## Checks to run

1. `npm run typecheck`
2. `npm run lint`
3. `npm run build`

Also request all 12 generated `/news/[id]` routes locally and confirm each
returns `200` with the `Source breakdown` heading.

## Exact manual test steps expected after implementation

1. Run `npm run dev`.
2. Open `http://localhost:3000/news/coastal-planning`.
3. Scroll through the analysis rail and confirm the panel order is:
   - Bias analysis;
   - AI analysis summary;
   - Analysis notes;
   - Source breakdown.
4. Confirm the source panel shows:
   - `Illustrative demo cohort`;
   - `8 total sources`;
   - Left/Center/Right count and percentage rows;
   - proportional clay/gray/mint bars;
   - exactly eight fictional publication rows;
   - a visible note that these are not reporting citations.
5. Count the source rows and verify they match the total and label subtotals.
6. Verify the displayed percentages total 100.
7. Open at least two other article detail routes and confirm each has a populated
   source panel.
8. Resize to `1440px`, `1024px`, `390px`, and `320px`; confirm the panel remains
   readable and causes no horizontal page scroll.
9. Disable JavaScript and confirm the source list remains visible.
10. Inspect the browser console for runtime errors.
11. Confirm the overview says `Overall AI-estimated bias` and
    `Based on 8 illustrative demo sources`.
12. Confirm the details page uses `Bias analysis`, `Bias distribution`,
    `AI-estimated bias`, and `Bias notes` instead of the previous visible
    `Framing` labels.
13. Activate `How we analyze bias` with both mouse and keyboard; confirm the page
    moves to the Bias Notes and limitations panel and the sticky header does not
    obscure its heading.
14. Disable JavaScript, reload, and confirm the same action still navigates to
    `#bias-methodology`.
