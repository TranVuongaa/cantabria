import "server-only";

import { throwSupabaseDataError } from "@/lib/supabase/errors";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type {
  Tables,
  TablesInsert,
} from "@/lib/supabase/types";

const SOURCE_COLUMNS =
  "id,name,listing_url,parser_strategy,is_active,logo_url,created_at,updated_at";

export type Source = Tables<"sources">;
export type SourceInput = TablesInsert<"sources">;

export async function listSources(): Promise<Source[]> {
  const { data, error } = await getSupabaseServerClient()
    .from("sources")
    .select(SOURCE_COLUMNS)
    .order("name", { ascending: true });

  if (error) {
    throwSupabaseDataError("list sources", error);
  }

  return data;
}

export async function listActiveSources(): Promise<Source[]> {
  const { data, error } = await getSupabaseServerClient()
    .from("sources")
    .select(SOURCE_COLUMNS)
    .eq("is_active", true)
    .order("name", { ascending: true });

  if (error) {
    throwSupabaseDataError("list active sources", error);
  }

  return data;
}

export async function listSelectedActiveSources(
  sourceIds: readonly string[],
): Promise<Source[]> {
  const uniqueSourceIds = [...new Set(sourceIds)];

  if (uniqueSourceIds.length === 0) {
    return [];
  }

  const { data, error } = await getSupabaseServerClient()
    .from("sources")
    .select(SOURCE_COLUMNS)
    .in("id", uniqueSourceIds)
    .eq("is_active", true)
    .order("name", { ascending: true });

  if (error) {
    throwSupabaseDataError("list selected active sources", error);
  }

  return data;
}

export async function upsertSource(input: SourceInput): Promise<Source> {
  const { data, error } = await getSupabaseServerClient()
    .from("sources")
    .upsert(input, { onConflict: "listing_url" })
    .select(SOURCE_COLUMNS)
    .single();

  if (error) {
    throwSupabaseDataError("upsert source", error);
  }

  return data;
}
