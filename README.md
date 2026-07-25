## CANTABRIA

## Goal

A production-ready AI-powered news intelligence platform that helps users stay informed by combining globally trending news with personalized content tailored to their interests. The platform automatically collects articles from trusted sources, analyzes them using LLMs, stores structured insights in Supabase, and delivers concise summaries, sentiment analysis, political framing, and key insights through a modern web interface.

## Supabase setup

1. Create or open the Supabase project that will store CANTABRIA data.
2. In Supabase Dashboard, open **SQL Editor**, paste the complete contents of
   `supabase/schema.sql`, and run it.
3. In **Project Settings → API**, copy the project URL, publishable/anonymous
   key, and server-only secret/service-role key into `.env.local`:

   ```dotenv
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_replace_me
   SUPABASE_SERVICE_ROLE_KEY=sb_secret_replace_me
   ```

The privileged key must be named `SUPABASE_SERVICE_ROLE_KEY`. Never prefix it
with `NEXT_PUBLIC_`, commit it, print it, or import the server Supabase client
from browser code.

After applying the schema, verify that all six tables exist and that Row Level
Security is enabled on each one. Then regenerate the checked-in database type
snapshot with your project reference:

```bash
npx supabase gen types typescript --project-id <project-ref> --schema public
```

Review generated output before replacing `lib/supabase/types.ts`.

The initial schema intentionally excludes pgvector and article embeddings.
Those are added only after the AI analysis pipeline is working.
