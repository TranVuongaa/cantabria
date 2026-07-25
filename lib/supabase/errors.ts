import "server-only";

type SupabaseErrorMetadata = {
  code?: string;
};

export class SupabaseDataError extends Error {
  readonly code: string | undefined;
  readonly operation: string;

  constructor(operation: string, error: SupabaseErrorMetadata) {
    const codeSuffix = error.code ? ` (${error.code})` : "";

    super(`Supabase operation "${operation}" failed${codeSuffix}.`);
    this.name = "SupabaseDataError";
    this.code = error.code;
    this.operation = operation;
  }
}

export function throwSupabaseDataError(
  operation: string,
  error: SupabaseErrorMetadata,
): never {
  throw new SupabaseDataError(operation, error);
}
