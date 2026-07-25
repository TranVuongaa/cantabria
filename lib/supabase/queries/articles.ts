import "server-only";

import type { QueryData } from "@supabase/supabase-js";

import { throwSupabaseDataError } from "@/lib/supabase/errors";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type {
  Tables,
  TablesInsert,
} from "@/lib/supabase/types";

const ARTICLE_COLUMNS =
  "id,source_id,original_url,canonical_url,title,image_url,published_at,raw_text,scraped_at,analyzed_at,created_at,updated_at";
const ANALYSIS_COLUMNS =
  "id,article_id,summary,sentiment_score,sentiment_label,bias_score,bias_label,left_percentage,center_percentage,right_percentage,confidence,framing_notes,loaded_terms,disclaimer,model,created_at,updated_at";
const SOURCE_COLUMNS =
  "id,name,listing_url,parser_strategy,is_active,logo_url,created_at,updated_at";
const ANALYZED_ARTICLE_SELECT =
  `${ARTICLE_COLUMNS},source:sources!articles_source_id_fkey(${SOURCE_COLUMNS}),analysis:article_analyses!inner(${ANALYSIS_COLUMNS})` as const;
const ARTICLE_WITH_OPTIONAL_ANALYSIS_SELECT =
  `${ARTICLE_COLUMNS},source:sources!articles_source_id_fkey(${SOURCE_COLUMNS}),analysis:article_analyses!article_analyses_article_id_fkey(${ANALYSIS_COLUMNS})` as const;
const PENDING_ANALYSIS_SELECT =
  `${ARTICLE_COLUMNS},source:sources!articles_source_id_fkey(${SOURCE_COLUMNS}),analysis:article_analyses!article_analyses_article_id_fkey(id)` as const;

const URL_FILTER_CHUNK_SIZE = 15;
const DEFAULT_ARTICLE_LIMIT = 30;
const MAX_ARTICLE_LIMIT = 100;
const PENDING_SCAN_PAGE_SIZE = 100;

export type Article = Tables<"articles">;
export type ArticleInput = TablesInsert<"articles">;

function createAnalyzedArticlesQuery() {
  return getSupabaseServerClient()
    .from("articles")
    .select(ANALYZED_ARTICLE_SELECT);
}

function createArticleWithOptionalAnalysisQuery() {
  return getSupabaseServerClient()
    .from("articles")
    .select(ARTICLE_WITH_OPTIONAL_ANALYSIS_SELECT);
}

function createPendingAnalysisQuery() {
  return getSupabaseServerClient()
    .from("articles")
    .select(PENDING_ANALYSIS_SELECT);
}

export type AnalyzedArticle = QueryData<
  ReturnType<typeof createAnalyzedArticlesQuery>
>[number];

export type ArticleWithOptionalAnalysis = QueryData<
  ReturnType<typeof createArticleWithOptionalAnalysisQuery>
>[number];

export type PendingAnalysisCandidate = QueryData<
  ReturnType<typeof createPendingAnalysisQuery>
>[number];

export type ArticleUrlCandidate = {
  canonicalUrl: string;
  originalUrl: string;
};

export type ExistingArticleUrls = {
  canonicalUrls: string[];
  originalUrls: string[];
};

function normalizeArticleLimit(limit: number): number {
  if (!Number.isFinite(limit)) {
    return DEFAULT_ARTICLE_LIMIT;
  }

  return Math.min(Math.max(Math.trunc(limit), 1), MAX_ARTICLE_LIMIT);
}

function chunkValues(
  values: readonly string[],
  chunkSize: number,
): string[][] {
  const chunks: string[][] = [];

  for (let index = 0; index < values.length; index += chunkSize) {
    chunks.push(values.slice(index, index + chunkSize));
  }

  return chunks;
}

export async function listAnalyzedArticles(
  limit = DEFAULT_ARTICLE_LIMIT,
): Promise<AnalyzedArticle[]> {
  const { data, error } = await createAnalyzedArticlesQuery()
    .order("published_at", { ascending: false })
    .limit(normalizeArticleLimit(limit));

  if (error) {
    throwSupabaseDataError("list analyzed articles", error);
  }

  return data;
}

export async function getArticleById(
  articleId: string,
): Promise<ArticleWithOptionalAnalysis | null> {
  const { data, error } = await createArticleWithOptionalAnalysisQuery()
    .eq("id", articleId)
    .maybeSingle();

  if (error) {
    throwSupabaseDataError("get article by ID", error);
  }

  return data;
}

export async function findExistingArticleUrls(
  candidates: readonly ArticleUrlCandidate[],
): Promise<ExistingArticleUrls> {
  const candidateUrls = [
    ...new Set(
      candidates
        .flatMap(({ canonicalUrl, originalUrl }) => [
          canonicalUrl.trim(),
          originalUrl.trim(),
        ])
        .filter(Boolean),
    ),
  ];
  const existingOriginalUrls = new Set<string>();
  const existingCanonicalUrls = new Set<string>();

  for (const urlChunk of chunkValues(
    candidateUrls,
    URL_FILTER_CHUNK_SIZE,
  )) {
    const [originalResult, canonicalResult] = await Promise.all([
      getSupabaseServerClient()
        .from("articles")
        .select("original_url,canonical_url")
        .in("original_url", urlChunk),
      getSupabaseServerClient()
        .from("articles")
        .select("original_url,canonical_url")
        .in("canonical_url", urlChunk),
    ]);

    if (originalResult.error) {
      throwSupabaseDataError(
        "check existing original article URLs",
        originalResult.error,
      );
    }

    if (canonicalResult.error) {
      throwSupabaseDataError(
        "check existing canonical article URLs",
        canonicalResult.error,
      );
    }

    for (const row of [...originalResult.data, ...canonicalResult.data]) {
      existingOriginalUrls.add(row.original_url);
      existingCanonicalUrls.add(row.canonical_url);
    }
  }

  return {
    canonicalUrls: [...existingCanonicalUrls],
    originalUrls: [...existingOriginalUrls],
  };
}

export async function insertArticle(input: ArticleInput): Promise<Article> {
  const { data, error } = await getSupabaseServerClient()
    .from("articles")
    .insert(input)
    .select(ARTICLE_COLUMNS)
    .single();

  if (error) {
    throwSupabaseDataError("insert article", error);
  }

  return data;
}

export async function listPendingAnalysisCandidates(
  limit = DEFAULT_ARTICLE_LIMIT,
): Promise<PendingAnalysisCandidate[]> {
  const normalizedLimit = normalizeArticleLimit(limit);
  const pendingArticles: PendingAnalysisCandidate[] = [];
  let offset = 0;

  while (pendingArticles.length < normalizedLimit) {
    const { data, error } = await createPendingAnalysisQuery()
      .order("created_at", { ascending: true })
      .order("id", { ascending: true })
      .range(offset, offset + PENDING_SCAN_PAGE_SIZE - 1);

    if (error) {
      throwSupabaseDataError(
        "list pending analysis candidates",
        error,
      );
    }

    pendingArticles.push(
      ...data.filter((article) => article.analysis === null),
    );

    if (data.length < PENDING_SCAN_PAGE_SIZE) {
      break;
    }

    offset += PENDING_SCAN_PAGE_SIZE;
  }

  return pendingArticles.slice(0, normalizedLimit);
}
