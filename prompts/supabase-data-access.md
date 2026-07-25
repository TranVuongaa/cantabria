# CANTABRIA Supabase and Data Access Implementation

## Goal

Implement the initial Supabase persistence and typed server-side data-access foundation for CANTABRIA.

This phase establishes Supabase as the canonical application datastore by:

- defining the six core tables required by `AGENTS.md`;
- adding a pinned Supabase JavaScript client dependency;
- creating a server-only, service-role Supabase client;
- adding generated-style TypeScript database types;
- adding focused query modules for sources, articles, analyses, logs, schedules, and schedule runs;
- documenting how to apply and verify the schema.

This phase does **not** implement scraping, Oxylabs Scheduler API calls, AI model calls, pgvector/embeddings, API routes, or a UI migration from the existing demo fixtures. Those features should consume this data layer in later approved prompts.

## Skills read

- `.agents/skills/supabase/SKILL.md`

The skill requires current documentation checks, RLS on exposed tables, strict separation of service-role credentials from browser code, pinned package versions, and a live verification query after implementation.

## Current documentation reviewed

Supabase:

- `https://supabase.com/changelog?types=breaking-change`
- `https://supabase.com/docs/guides/api/securing-your-api`
- `https://supabase.com/docs/guides/database/postgres/row-level-security`
- `https://supabase.com/docs/guides/database/joins-and-nesting`
- `https://supabase.com/docs/reference/javascript/installing`
- `https://supabase.com/docs/reference/javascript/typescript-support`
- `https://supabase.com/docs/reference/javascript/auth`
- `https://supabase.com/docs/guides/troubleshooting/performing-administration-tasks-on-the-server-side-with-the-servicerole-secret-BYM4Fa`

Relevant current guidance:

- New tables are moving to explicit, opt-in Data API grants.
- RLS must be enabled for tables in exposed schemas.
- A privileged server client must be created directly with `@supabase/supabase-js`, kept separate from user/session clients, and configured with session persistence, token refresh, and URL session detection disabled.
- Supabase database types should use the generated `Database` shape and be supplied to `createClient<Database>()`.

Next.js 16.2.11 project-local documentation:

- `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/06-fetching-data.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/08-caching.md`
- `node_modules/next/dist/docs/01-app/02-guides/environment-variables.md`

Relevant Next.js guidance:

- Database access belongs in Server Components or server-only modules.
- Secrets must not cross a Client Component boundary.
- `server-only` should guard privileged data modules.
- Only `NEXT_PUBLIC_*` variables are bundled for browsers.

## Existing code inspected

- `AGENTS.md`
- `package.json`
- `package-lock.json`
- `.env.example`
- `.env.local` environment variable **names only**; secret values were not read or printed
- `.gitignore`
- `next.config.ts`
- `tsconfig.json`
- `app/page.tsx`
- `app/news/[id]/page.tsx`
- `lib/data/homepage.ts`
- `lib/data/articles.ts`
- `components/cards/news-card.tsx`
- `components/cards/related-story-card.tsx`
- `components/analysis/analysis-overview.tsx`
- `components/analysis/analysis-summary.tsx`
- `components/analysis/analysis-notes.tsx`
- `components/analysis/source-breakdown.tsx`

Current findings:

- No Supabase dependency, schema, migration configuration, client, generated database types, or query layer exists.
- The UI currently reads fictional data synchronously from `lib/data/*`.
- No `supabase/`, `supabase/schemas/`, `supabase/migrations/`, `supabase/config.toml`, or `lib/supabase/` directory exists.
- The Supabase CLI is not installed, and no callable Supabase MCP tools are available in this session.
- The project therefore has no established declarative or imperative migration workflow.
- `.env.local` currently names the privileged key `NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY`. That prefix is unsafe because Next.js treats `NEXT_PUBLIC_*` variables as browser-exposable. The implementation must never reference that name.
- The installed `.env.local` has Supabase URL and anonymous key names, but the correctly named server-only `SUPABASE_SERVICE_ROLE_KEY` is not present.
- The current published `@supabase/supabase-js` package version observed during preparation is `2.110.8`.

## Decisions and assumptions

1. This is a focused persistence/data-layer phase. Existing demo pages remain unchanged so this task does not turn into an unrequested UI redesign.
2. Use `public` tables because the project expects `supabase-js` Data API access.
3. Enable RLS on every table and explicitly revoke `anon` and `authenticated` access. All application access in this phase uses one trusted server-only service-role client.
4. Explicitly grant required table and sequence privileges to `service_role` to remain compatible with Supabase's opt-in Data API model.
5. Do not add permissive RLS policies. The service role bypasses RLS; public browser access is not needed because Next.js Server Components and server routes will read through the server-only layer.
6. Use UUID primary keys with `gen_random_uuid()`.
7. Preserve Oxylabs schedule, run, and job identifiers as `text`, never JavaScript numbers, because they may exceed `Number.MAX_SAFE_INTEGER`.
8. Do not add `article_analyses.embedding` or enable pgvector in this initial schema. `AGENTS.md` explicitly reserves that for the later related-articles phase.
9. Store `bias_score` as a generated column derived from `(right_percentage - left_percentage) / 100.0`, so the database enforces the canonical formula.
10. Enforce analysis ranges and the 100-percent framing total with database constraints.
11. Enforce append-only article behavior in repository APIs: provide inserts and reads, but no delete/reset helper.
12. Enforce URL existence checks in chunks of at most 15 values per `.in()` request.
13. Avoid joined-table filters such as `.eq("foreignTable.column", value)`, per the project-specific Supabase gotcha. Filter joined results in application code when necessary.
14. Use explicit select column lists rather than `select("*")` in application queries.
15. Use a canonical `supabase/schema.sql` because there is no initialized CLI migration workflow. Do not invent a migration filename. The user will apply this idempotent schema through Supabase Dashboard → SQL Editor for the initial setup.
16. Keep query results close to database/domain records rather than forcing them into the current demo-only UI types.
17. Do not create a browser Supabase client in this phase. Clerk remains the authentication provider, and the service-role client must never inherit or persist a user session.
18. Fail fast with a concise configuration error when required server environment variables are missing, without including secret values in errors or logs.

## Files likely to change

- `package.json`
- `package-lock.json`
- `.env.example`
- `README.md`
- `supabase/schema.sql` (new)
- `lib/supabase/types.ts` (new)
- `lib/supabase/server.ts` (new)
- `lib/supabase/errors.ts` (new, only if it keeps query error handling focused)
- `lib/supabase/queries/sources.ts` (new)
- `lib/supabase/queries/articles.ts` (new)
- `lib/supabase/queries/analyses.ts` (new)
- `lib/supabase/queries/logs.ts` (new)
- `lib/supabase/queries/schedules.ts` (new)

Do not modify:

- the current page/component UI;
- `lib/data/homepage.ts` or `lib/data/articles.ts`;
- `.env.local` secret values;
- existing unrelated uncommitted skill files.

## Database schema requirements

Create `supabase/schema.sql` as an idempotent initial schema for these tables.

### `sources`

Required data:

- UUID primary key
- unique non-empty `name`
- unique non-empty `listing_url`
- optional `parser_strategy`
- `is_active` boolean defaulting to true
- optional `logo_url`
- created and updated timestamps

Indexes:

- an index supporting active-source reads ordered by name

### `articles`

Required data:

- UUID primary key
- required foreign key to `sources`
- unique non-empty `original_url`
- unique non-empty `canonical_url`
- non-empty `title`
- required non-empty `image_url`
- required `published_at`
- required non-empty `raw_text`
- required `scraped_at`
- nullable `analyzed_at`
- created and updated timestamps

Behavior:

- source deletion must be restricted while articles reference it
- scraping is append-only
- original and canonical URLs enforce deduplication

Indexes:

- source and publication ordering
- pending/analyzed lookup support

### `article_analyses`

Required data:

- UUID primary key
- unique required foreign key to `articles`, with cascade delete
- non-empty neutral `summary`
- `sentiment_score` from -1 to 1
- `sentiment_label`: `positive`, `neutral`, or `negative`
- generated `bias_score` from -1 to 1
- `bias_label`: `left`, `center`, `right`, `mixed`, or `unclear`
- integer `left_percentage`, `center_percentage`, and `right_percentage`, each from 0 to 100 and totaling 100
- `confidence` from 0 to 1
- non-empty `framing_notes`
- `loaded_terms` as a non-null text array defaulting to an empty array
- non-empty `disclaimer`
- non-empty `model`
- created and updated timestamps

Do not include an embedding column.

### `logs`

Required data:

- UUID primary key
- constrained log level
- non-empty event name
- non-empty message
- JSONB context defaulting to an empty object
- optional UUID correlation/run identifier
- created timestamp

Indexes:

- newest-first log reads
- correlation/run lookup

### `oxylabs_schedules`

Required data:

- UUID primary key
- unique required foreign key to `sources`, with cascade delete
- unique exact Oxylabs `schedule_id` stored as text
- active/state fields needed by later synchronization
- optional last synchronization error
- created, updated, and last-synced timestamps

### `oxylabs_schedule_runs`

Required data:

- UUID primary key
- required foreign key to `oxylabs_schedules`, with cascade delete
- exact Oxylabs run/job identifiers stored as text
- constrained result/processing status fields
- optional error message
- JSONB summary defaulting to an empty object
- discovered, processed, created, and updated timestamps
- a uniqueness constraint that prevents processing the same exact remote job more than once

### Shared schema behavior

- Add an idempotent `set_updated_at` trigger function with a fixed safe search path.
- Attach the update trigger to mutable tables with `updated_at`.
- Enable RLS on every table.
- Revoke all table access from `anon` and `authenticated`.
- Grant only the required CRUD permissions to `service_role`.
- Grant required sequence usage to `service_role` if any sequences exist.
- Revoke function execution from `PUBLIC` where applicable, then grant only what is actually needed.
- Add table and column comments where they clarify security-sensitive or precision-sensitive decisions.

## TypeScript data-access requirements

### Dependency

- Install and pin `@supabase/supabase-js` to exact version `2.110.8`.
- Commit the resulting `package-lock.json` update.

### Types

Create `lib/supabase/types.ts` in Supabase's generated database type shape:

- `Database`
- `Json`
- row/insert/update types for every table
- relationship metadata required for typed nested selects
- reusable `Tables`, `TablesInsert`, and `TablesUpdate` helpers when useful
- no `any`

The file must exactly match `supabase/schema.sql`. Include a header explaining the command that should replace this checked-in snapshot after the remote schema is created:

`npx supabase gen types typescript --project-id <project-ref> --schema public`

Do not run that command without a project reference.

### Server client

Create `lib/supabase/server.ts`:

- begin with `import "server-only"`;
- read `NEXT_PUBLIC_SUPABASE_URL`;
- read only `SUPABASE_SERVICE_ROLE_KEY` for privileged access;
- never read `NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY`;
- instantiate `createClient<Database>()` directly from `@supabase/supabase-js`;
- set `persistSession: false`, `autoRefreshToken: false`, and `detectSessionInUrl: false`;
- avoid logging credentials;
- expose a small server-client accessor suitable for reuse by query modules.

### Query behavior

All query modules must:

- begin with `import "server-only"`;
- use the typed server client;
- select explicit columns;
- check every Supabase `{ error }`;
- throw a normalized error that includes operation context and safe Supabase metadata, but never secrets or raw article content;
- expose explicit return types;
- avoid `any`;
- avoid browser imports and React dependencies.

#### Sources

Provide focused functions for:

- listing all sources;
- listing active sources ordered by name;
- retrieving selected active sources by UUID;
- upserting a source record for administrative/server workflows.

#### Articles

Provide focused functions for:

- listing analyzed articles for website reads with joined source and analysis data, ordered newest first and with a configurable bounded limit;
- retrieving one article by UUID with its source and optional analysis;
- checking existing original/canonical URLs, chunking `.in()` filters to no more than 15 URLs;
- inserting one validated article without delete/reset behavior;
- retrieving pending-analysis candidates using a left embedded relationship and application-side filtering, not `analyzed_at IS NULL` alone;
- treating an article as pending when no analysis row exists;
- exposing a separate embedding-backfill behavior only in the later pgvector phase, not now.

Do not implement `getRelatedArticles` in this phase because the canonical implementation requires pgvector and embeddings.

#### Analyses

Provide focused functions for:

- inserting/upserting one validated analysis row;
- updating `articles.analyzed_at` only after the valid analysis write succeeds;
- retrieving an article analysis by article ID.

Do not call an AI provider or generate embeddings.

#### Logs

Provide focused functions for:

- appending a structured log entry;
- listing recent logs with a bounded limit;
- listing logs by correlation/run ID.

#### Schedules and runs

Provide focused functions for:

- listing stored schedules with their source data;
- retrieving a schedule by source ID;
- upserting schedule metadata while preserving remote IDs as strings;
- listing recent schedule runs;
- recording/upserting a discovered remote run/job;
- marking processing status and summary;
- never coercing an Oxylabs identifier to `number`.

Do not call Oxylabs in this phase.

## Environment and documentation requirements

Update `.env.example` with:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Use obvious placeholders, never real credentials.

Add a concise README section that explains:

- how to create/configure the Supabase project;
- how to apply `supabase/schema.sql` in Dashboard → SQL Editor;
- how to copy the URL, anonymous/publishable key, and service-role/secret key into `.env.local`;
- that the privileged key must be named `SUPABASE_SERVICE_ROLE_KEY`, never with `NEXT_PUBLIC_`;
- how to verify the schema and regenerate types;
- that pgvector is intentionally deferred.

Do not add `CRON_SECRET` to `.env.local`.

## Security requirements

- Never expose or print the service-role/secret key.
- Never use a `NEXT_PUBLIC_` prefix for a privileged Supabase key.
- Never import the service client from Client Components.
- Never create permissive `anon` or `authenticated` policies in this phase.
- Enable RLS on every public table.
- Use explicit grants compatible with Supabase's 2026 opt-in Data API changes.
- Keep all writes server-only.
- Do not use Supabase Auth; Clerk remains the authentication system.
- Do not use `auth.role()` in policies.
- Do not add `SECURITY DEFINER` merely to bypass permissions.
- If a privileged function is necessary, keep its search path fixed, revoke execution from `PUBLIC`, and grant the minimum required role.
- Do not expose raw article text inside thrown errors or logs.
- Preserve large external IDs as strings end to end.

## Acceptance criteria

- `@supabase/supabase-js@2.110.8` is installed as an exact dependency and the lockfile is updated.
- `supabase/schema.sql` defines all six required tables, constraints, relationships, indexes, timestamps, RLS, and explicit grants.
- `article_analyses` has no embedding column.
- Analysis percentages are database-constrained to 0–100 and exactly sum to 100.
- `bias_score` is derived by the database from the left/right percentages.
- Article original and canonical URLs are unique.
- Oxylabs IDs are typed and stored as strings.
- `lib/supabase/types.ts` matches the schema with no `any`.
- The service client is guarded by `server-only`, uses only the non-public privileged key, and disables auth session behavior.
- Focused typed query modules cover sources, articles, analyses, logs, schedules, and schedule runs.
- URL existence checks never send more than 15 URLs in one `.in()` filter.
- Pending-analysis lookup depends on the presence of `article_analyses`, not only on `articles.analyzed_at`.
- No query uses `.eq("foreignTable.column", ...)`.
- No article delete/reset helper is introduced.
- Existing UI fixture behavior is unchanged in this phase.
- `.env.example` and README setup instructions are updated without real secrets.
- Typecheck, lint, and production build pass.
- A live, read-only verification query succeeds after the user applies the schema and configures the correctly named environment variables.

## Checks to run

From the project root:

1. `npm run typecheck`
2. `npm run lint`
3. `npm run build`

Schema/static checks:

4. Confirm all six tables exist in `supabase/schema.sql`.
5. Confirm every public table enables RLS.
6. Confirm no `NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY` reference exists in tracked source.
7. Confirm no embedding column exists yet.
8. Confirm no joined-table `.eq(...)` filter exists.
9. Confirm every URL `.in()` call is fed chunks of at most 15.

Live Supabase check after schema application and environment setup:

10. Execute a read-only server-side query through the new client to list active sources.
11. If a source row is available, retrieve it through `listActiveSources()` and confirm the typed result.
12. If no rows exist, confirm the query succeeds with an empty array rather than treating empty data as an error.

Report exact command results. Do not claim the live query passed unless it was actually run.

## Exact manual test steps expected after implementation

1. In Supabase Dashboard, open the target project.
2. Open **SQL Editor**.
3. Copy and run the complete contents of `supabase/schema.sql`.
4. Open **Database → Tables** and confirm these tables exist:
   - `sources`
   - `articles`
   - `article_analyses`
   - `logs`
   - `oxylabs_schedules`
   - `oxylabs_schedule_runs`
5. Open **Database → Policies** and confirm RLS is enabled on all six tables.
6. Open **Project Settings → API** and copy the project URL, anonymous/publishable key, and privileged service-role/secret key.
7. In `.env.local`, set:

   ```dotenv
   NEXT_PUBLIC_SUPABASE_URL=<project-url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<publishable-or-anon-key>
   SUPABASE_SERVICE_ROLE_KEY=<server-only-service-role-or-secret-key>
   ```

8. Remove the unsafe `NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY` entry from `.env.local`. Never paste its value into chat or terminal output.
9. Restart the Next.js process after changing `.env.local`.
10. Run `npm run typecheck`.
11. Run `npm run lint`.
12. Run `npm run build`.
13. Run the provided read-only verification command from the implementation handoff.
14. Confirm it returns either an empty array or the configured active source rows without exposing credentials.
15. Optionally add one test source in Supabase Dashboard with a real homepage `listing_url`, rerun the verification command, and confirm that source is returned.

