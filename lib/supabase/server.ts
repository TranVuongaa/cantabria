import "server-only";

import {
  createClient,
  type SupabaseClient,
} from "@supabase/supabase-js";

import type { Database } from "@/lib/supabase/types";

let serverClient: SupabaseClient<Database> | undefined;

function requireServerEnvironmentVariable(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(
      `Missing required server environment variable: ${name}.`,
    );
  }

  return value;
}

export function getSupabaseServerClient(): SupabaseClient<Database> {
  if (serverClient) {
    return serverClient;
  }

  const supabaseUrl = requireServerEnvironmentVariable(
    "NEXT_PUBLIC_SUPABASE_URL",
  );
  const serviceRoleKey = requireServerEnvironmentVariable(
    "SUPABASE_SERVICE_ROLE_KEY",
  );

  serverClient = createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });

  return serverClient;
}
