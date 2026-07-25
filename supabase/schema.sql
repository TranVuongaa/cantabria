begin;

create table if not exists public.sources (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  listing_url text not null unique,
  parser_strategy text,
  is_active boolean not null default true,
  logo_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint sources_name_not_blank check (btrim(name) <> ''),
  constraint sources_listing_url_not_blank check (btrim(listing_url) <> ''),
  constraint sources_parser_strategy_not_blank
    check (parser_strategy is null or btrim(parser_strategy) <> ''),
  constraint sources_logo_url_not_blank
    check (logo_url is null or btrim(logo_url) <> '')
);

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null
    references public.sources(id)
    on update cascade
    on delete restrict,
  original_url text not null unique,
  canonical_url text not null unique,
  title text not null,
  image_url text not null,
  published_at timestamptz not null,
  raw_text text not null,
  scraped_at timestamptz not null default now(),
  analyzed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint articles_original_url_not_blank check (btrim(original_url) <> ''),
  constraint articles_canonical_url_not_blank check (btrim(canonical_url) <> ''),
  constraint articles_title_not_blank check (btrim(title) <> ''),
  constraint articles_image_url_not_blank check (btrim(image_url) <> ''),
  constraint articles_raw_text_not_blank check (btrim(raw_text) <> '')
);

create table if not exists public.article_analyses (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null unique
    references public.articles(id)
    on update cascade
    on delete cascade,
  summary text not null,
  sentiment_score double precision not null,
  sentiment_label text not null,
  bias_score double precision generated always as (
    (right_percentage - left_percentage)::double precision / 100.0
  ) stored,
  bias_label text not null,
  left_percentage smallint not null,
  center_percentage smallint not null,
  right_percentage smallint not null,
  confidence double precision not null,
  framing_notes text not null,
  loaded_terms text[] not null default array[]::text[],
  disclaimer text not null,
  model text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint article_analyses_summary_not_blank check (btrim(summary) <> ''),
  constraint article_analyses_sentiment_score_range
    check (sentiment_score between -1.0 and 1.0),
  constraint article_analyses_sentiment_label_allowed
    check (sentiment_label in ('positive', 'neutral', 'negative')),
  constraint article_analyses_bias_score_range
    check (bias_score between -1.0 and 1.0),
  constraint article_analyses_bias_label_allowed
    check (bias_label in ('left', 'center', 'right', 'mixed', 'unclear')),
  constraint article_analyses_left_percentage_range
    check (left_percentage between 0 and 100),
  constraint article_analyses_center_percentage_range
    check (center_percentage between 0 and 100),
  constraint article_analyses_right_percentage_range
    check (right_percentage between 0 and 100),
  constraint article_analyses_percentages_total
    check (left_percentage + center_percentage + right_percentage = 100),
  constraint article_analyses_confidence_range
    check (confidence between 0.0 and 1.0),
  constraint article_analyses_framing_notes_not_blank
    check (btrim(framing_notes) <> ''),
  constraint article_analyses_disclaimer_not_blank
    check (btrim(disclaimer) <> ''),
  constraint article_analyses_model_not_blank check (btrim(model) <> '')
);

create table if not exists public.logs (
  id uuid primary key default gen_random_uuid(),
  level text not null,
  event text not null,
  message text not null,
  context jsonb not null default '{}'::jsonb,
  correlation_id uuid,
  created_at timestamptz not null default now(),
  constraint logs_level_allowed check (level in ('debug', 'info', 'warn', 'error')),
  constraint logs_event_not_blank check (btrim(event) <> ''),
  constraint logs_message_not_blank check (btrim(message) <> ''),
  constraint logs_context_is_object check (jsonb_typeof(context) = 'object')
);

create table if not exists public.oxylabs_schedules (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null unique
    references public.sources(id)
    on update cascade
    on delete cascade,
  schedule_id text not null unique,
  is_active boolean not null default true,
  remote_state text not null default 'active',
  last_sync_error text,
  last_synced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint oxylabs_schedules_schedule_id_not_blank
    check (btrim(schedule_id) <> ''),
  constraint oxylabs_schedules_remote_state_not_blank
    check (btrim(remote_state) <> ''),
  constraint oxylabs_schedules_last_sync_error_not_blank
    check (last_sync_error is null or btrim(last_sync_error) <> '')
);

create table if not exists public.oxylabs_schedule_runs (
  id uuid primary key default gen_random_uuid(),
  schedule_id uuid not null
    references public.oxylabs_schedules(id)
    on update cascade
    on delete cascade,
  remote_run_id text not null,
  remote_job_id text not null,
  result_status text not null,
  processing_status text not null default 'pending',
  error_message text,
  summary jsonb not null default '{}'::jsonb,
  discovered_at timestamptz not null default now(),
  processed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint oxylabs_schedule_runs_remote_run_id_not_blank
    check (btrim(remote_run_id) <> ''),
  constraint oxylabs_schedule_runs_remote_job_id_not_blank
    check (btrim(remote_job_id) <> ''),
  constraint oxylabs_schedule_runs_result_status_allowed
    check (result_status in ('pending', 'done', 'faulted')),
  constraint oxylabs_schedule_runs_processing_status_allowed
    check (processing_status in ('pending', 'processing', 'processed', 'failed', 'skipped')),
  constraint oxylabs_schedule_runs_error_message_not_blank
    check (error_message is null or btrim(error_message) <> ''),
  constraint oxylabs_schedule_runs_summary_is_object
    check (jsonb_typeof(summary) = 'object'),
  constraint oxylabs_schedule_runs_remote_job_unique
    unique (schedule_id, remote_job_id)
);

create index if not exists sources_active_name_idx
  on public.sources (is_active, name);

create index if not exists articles_source_published_at_idx
  on public.articles (source_id, published_at desc);

create index if not exists articles_published_at_idx
  on public.articles (published_at desc);

create index if not exists articles_pending_analysis_idx
  on public.articles (created_at, id)
  where analyzed_at is null;

create index if not exists logs_created_at_idx
  on public.logs (created_at desc);

create index if not exists logs_correlation_id_idx
  on public.logs (correlation_id, created_at desc)
  where correlation_id is not null;

create index if not exists oxylabs_schedule_runs_discovered_at_idx
  on public.oxylabs_schedule_runs (discovered_at desc);

create index if not exists oxylabs_schedule_runs_processing_status_idx
  on public.oxylabs_schedule_runs (processing_status, discovered_at);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = pg_catalog
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke all on function public.set_updated_at() from public;
revoke all on function public.set_updated_at() from anon, authenticated;

drop trigger if exists sources_set_updated_at on public.sources;
create trigger sources_set_updated_at
before update on public.sources
for each row execute function public.set_updated_at();

drop trigger if exists articles_set_updated_at on public.articles;
create trigger articles_set_updated_at
before update on public.articles
for each row execute function public.set_updated_at();

drop trigger if exists article_analyses_set_updated_at on public.article_analyses;
create trigger article_analyses_set_updated_at
before update on public.article_analyses
for each row execute function public.set_updated_at();

drop trigger if exists oxylabs_schedules_set_updated_at on public.oxylabs_schedules;
create trigger oxylabs_schedules_set_updated_at
before update on public.oxylabs_schedules
for each row execute function public.set_updated_at();

drop trigger if exists oxylabs_schedule_runs_set_updated_at
  on public.oxylabs_schedule_runs;
create trigger oxylabs_schedule_runs_set_updated_at
before update on public.oxylabs_schedule_runs
for each row execute function public.set_updated_at();

alter table public.sources enable row level security;
alter table public.articles enable row level security;
alter table public.article_analyses enable row level security;
alter table public.logs enable row level security;
alter table public.oxylabs_schedules enable row level security;
alter table public.oxylabs_schedule_runs enable row level security;

revoke all on table public.sources from anon, authenticated;
revoke all on table public.articles from anon, authenticated;
revoke all on table public.article_analyses from anon, authenticated;
revoke all on table public.logs from anon, authenticated;
revoke all on table public.oxylabs_schedules from anon, authenticated;
revoke all on table public.oxylabs_schedule_runs from anon, authenticated;

grant select, insert, update on table public.sources to service_role;
grant select, insert, update on table public.articles to service_role;
grant select, insert, update on table public.article_analyses to service_role;
grant select, insert on table public.logs to service_role;
grant select, insert, update on table public.oxylabs_schedules to service_role;
grant select, insert, update on table public.oxylabs_schedule_runs to service_role;

comment on table public.sources is
  'Configured news homepage entry points. Scraping must use active rows from this table.';
comment on column public.articles.original_url is
  'The discovered article URL and primary append-only deduplication key.';
comment on column public.articles.canonical_url is
  'The canonical article URL and secondary append-only deduplication key.';
comment on column public.article_analyses.bias_score is
  'Generated as (right_percentage - left_percentage) / 100.0.';
comment on column public.oxylabs_schedules.schedule_id is
  'Exact remote 64-bit identifier stored as text to avoid JavaScript precision loss.';
comment on column public.oxylabs_schedule_runs.remote_run_id is
  'Exact remote 64-bit identifier stored as text to avoid JavaScript precision loss.';
comment on column public.oxylabs_schedule_runs.remote_job_id is
  'Exact remote 64-bit identifier stored as text to avoid JavaScript precision loss.';

commit;
