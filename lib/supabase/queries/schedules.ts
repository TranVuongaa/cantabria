import "server-only";

import type { QueryData } from "@supabase/supabase-js";

import { throwSupabaseDataError } from "@/lib/supabase/errors";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@/lib/supabase/types";

const SCHEDULE_COLUMNS =
  "id,source_id,schedule_id,is_active,remote_state,last_sync_error,last_synced_at,created_at,updated_at";
const SOURCE_COLUMNS =
  "id,name,listing_url,parser_strategy,is_active,logo_url,created_at,updated_at";
const SCHEDULE_WITH_SOURCE_SELECT =
  `${SCHEDULE_COLUMNS},source:sources!oxylabs_schedules_source_id_fkey(${SOURCE_COLUMNS})` as const;
const SCHEDULE_RUN_COLUMNS =
  "id,schedule_id,remote_run_id,remote_job_id,result_status,processing_status,error_message,summary,discovered_at,processed_at,created_at,updated_at";
const DEFAULT_RUN_LIMIT = 100;
const MAX_RUN_LIMIT = 500;

export type OxylabsSchedule = Tables<"oxylabs_schedules">;
export type OxylabsScheduleInput = TablesInsert<"oxylabs_schedules">;
export type OxylabsScheduleRun = Tables<"oxylabs_schedule_runs">;
export type OxylabsScheduleRunInput =
  TablesInsert<"oxylabs_schedule_runs">;
export type OxylabsScheduleRunUpdate =
  TablesUpdate<"oxylabs_schedule_runs">;

function createSchedulesWithSourcesQuery() {
  return getSupabaseServerClient()
    .from("oxylabs_schedules")
    .select(SCHEDULE_WITH_SOURCE_SELECT);
}

export type OxylabsScheduleWithSource = QueryData<
  ReturnType<typeof createSchedulesWithSourcesQuery>
>[number];

function normalizeRunLimit(limit: number): number {
  if (!Number.isFinite(limit)) {
    return DEFAULT_RUN_LIMIT;
  }

  return Math.min(Math.max(Math.trunc(limit), 1), MAX_RUN_LIMIT);
}

function assertExactRemoteId(value: string, fieldName: string): void {
  if (typeof value !== "string" || value.trim() === "") {
    throw new TypeError(`${fieldName} must be a non-empty string.`);
  }
}

export async function listOxylabsSchedules(): Promise<
  OxylabsScheduleWithSource[]
> {
  const { data, error } = await createSchedulesWithSourcesQuery().order(
    "created_at",
    { ascending: true },
  );

  if (error) {
    throwSupabaseDataError("list Oxylabs schedules", error);
  }

  return data;
}

export async function getOxylabsScheduleBySourceId(
  sourceId: string,
): Promise<OxylabsSchedule | null> {
  const { data, error } = await getSupabaseServerClient()
    .from("oxylabs_schedules")
    .select(SCHEDULE_COLUMNS)
    .eq("source_id", sourceId)
    .maybeSingle();

  if (error) {
    throwSupabaseDataError("get Oxylabs schedule by source", error);
  }

  return data;
}

export async function upsertOxylabsSchedule(
  input: OxylabsScheduleInput,
): Promise<OxylabsSchedule> {
  assertExactRemoteId(input.schedule_id, "schedule_id");

  const { data, error } = await getSupabaseServerClient()
    .from("oxylabs_schedules")
    .upsert(input, { onConflict: "source_id" })
    .select(SCHEDULE_COLUMNS)
    .single();

  if (error) {
    throwSupabaseDataError("upsert Oxylabs schedule", error);
  }

  return data;
}

export async function listRecentOxylabsScheduleRuns(
  limit = DEFAULT_RUN_LIMIT,
): Promise<OxylabsScheduleRun[]> {
  const { data, error } = await getSupabaseServerClient()
    .from("oxylabs_schedule_runs")
    .select(SCHEDULE_RUN_COLUMNS)
    .order("discovered_at", { ascending: false })
    .limit(normalizeRunLimit(limit));

  if (error) {
    throwSupabaseDataError("list Oxylabs schedule runs", error);
  }

  return data;
}

export async function upsertOxylabsScheduleRun(
  input: OxylabsScheduleRunInput,
): Promise<OxylabsScheduleRun> {
  assertExactRemoteId(input.remote_run_id, "remote_run_id");
  assertExactRemoteId(input.remote_job_id, "remote_job_id");

  const { data, error } = await getSupabaseServerClient()
    .from("oxylabs_schedule_runs")
    .upsert(input, {
      onConflict: "schedule_id,remote_job_id",
    })
    .select(SCHEDULE_RUN_COLUMNS)
    .single();

  if (error) {
    throwSupabaseDataError("upsert Oxylabs schedule run", error);
  }

  return data;
}

export async function updateOxylabsScheduleRun(
  runId: string,
  input: Pick<
    OxylabsScheduleRunUpdate,
    | "error_message"
    | "processed_at"
    | "processing_status"
    | "result_status"
    | "summary"
  >,
): Promise<OxylabsScheduleRun> {
  const { data, error } = await getSupabaseServerClient()
    .from("oxylabs_schedule_runs")
    .update(input)
    .eq("id", runId)
    .select(SCHEDULE_RUN_COLUMNS)
    .single();

  if (error) {
    throwSupabaseDataError("update Oxylabs schedule run", error);
  }

  return data;
}
