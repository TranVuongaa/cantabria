import "server-only";

import { throwSupabaseDataError } from "@/lib/supabase/errors";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type {
  Tables,
  TablesInsert,
} from "@/lib/supabase/types";

const LOG_COLUMNS =
  "id,level,event,message,context,correlation_id,created_at";
const DEFAULT_LOG_LIMIT = 100;
const MAX_LOG_LIMIT = 500;

export type LogEntry = Tables<"logs">;
export type LogEntryInput = TablesInsert<"logs">;

function normalizeLogLimit(limit: number): number {
  if (!Number.isFinite(limit)) {
    return DEFAULT_LOG_LIMIT;
  }

  return Math.min(Math.max(Math.trunc(limit), 1), MAX_LOG_LIMIT);
}

export async function appendLog(input: LogEntryInput): Promise<LogEntry> {
  const { data, error } = await getSupabaseServerClient()
    .from("logs")
    .insert(input)
    .select(LOG_COLUMNS)
    .single();

  if (error) {
    throwSupabaseDataError("append log", error);
  }

  return data;
}

export async function listRecentLogs(
  limit = DEFAULT_LOG_LIMIT,
): Promise<LogEntry[]> {
  const { data, error } = await getSupabaseServerClient()
    .from("logs")
    .select(LOG_COLUMNS)
    .order("created_at", { ascending: false })
    .limit(normalizeLogLimit(limit));

  if (error) {
    throwSupabaseDataError("list recent logs", error);
  }

  return data;
}

export async function listLogsByCorrelationId(
  correlationId: string,
  limit = DEFAULT_LOG_LIMIT,
): Promise<LogEntry[]> {
  const { data, error } = await getSupabaseServerClient()
    .from("logs")
    .select(LOG_COLUMNS)
    .eq("correlation_id", correlationId)
    .order("created_at", { ascending: false })
    .limit(normalizeLogLimit(limit));

  if (error) {
    throwSupabaseDataError("list logs by correlation ID", error);
  }

  return data;
}
