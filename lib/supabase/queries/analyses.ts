import "server-only";

import { throwSupabaseDataError } from "@/lib/supabase/errors";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type {
  Tables,
  TablesInsert,
} from "@/lib/supabase/types";

const ANALYSIS_COLUMNS =
  "id,article_id,summary,sentiment_score,sentiment_label,bias_score,bias_label,left_percentage,center_percentage,right_percentage,confidence,framing_notes,loaded_terms,disclaimer,model,created_at,updated_at";

export type ArticleAnalysis = Tables<"article_analyses">;
export type ArticleAnalysisInput = TablesInsert<"article_analyses">;

export async function getAnalysisByArticleId(
  articleId: string,
): Promise<ArticleAnalysis | null> {
  const { data, error } = await getSupabaseServerClient()
    .from("article_analyses")
    .select(ANALYSIS_COLUMNS)
    .eq("article_id", articleId)
    .maybeSingle();

  if (error) {
    throwSupabaseDataError("get article analysis", error);
  }

  return data;
}

export async function saveArticleAnalysis(
  input: ArticleAnalysisInput,
): Promise<ArticleAnalysis> {
  const { data: analysis, error: analysisError } =
    await getSupabaseServerClient()
      .from("article_analyses")
      .upsert(input, { onConflict: "article_id" })
      .select(ANALYSIS_COLUMNS)
      .single();

  if (analysisError) {
    throwSupabaseDataError("save article analysis", analysisError);
  }

  const { error: articleError } = await getSupabaseServerClient()
    .from("articles")
    .update({ analyzed_at: new Date().toISOString() })
    .eq("id", analysis.article_id)
    .select("id")
    .single();

  if (articleError) {
    throwSupabaseDataError(
      "mark article analysis complete",
      articleError,
    );
  }

  return analysis;
}
