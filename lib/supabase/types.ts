// Generated-style snapshot for supabase/schema.sql.
// After applying the schema remotely, regenerate and review this file with:
// npx supabase gen types typescript --project-id <project-ref> --schema public

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      article_analyses: {
        Row: {
          article_id: string;
          bias_label: "left" | "center" | "right" | "mixed" | "unclear";
          bias_score: number;
          center_percentage: number;
          confidence: number;
          created_at: string;
          disclaimer: string;
          framing_notes: string;
          id: string;
          left_percentage: number;
          loaded_terms: string[];
          model: string;
          right_percentage: number;
          sentiment_label: "positive" | "neutral" | "negative";
          sentiment_score: number;
          summary: string;
          updated_at: string;
        };
        Insert: {
          article_id: string;
          bias_label: "left" | "center" | "right" | "mixed" | "unclear";
          bias_score?: never;
          center_percentage: number;
          confidence: number;
          created_at?: string;
          disclaimer: string;
          framing_notes: string;
          id?: string;
          left_percentage: number;
          loaded_terms?: string[];
          model: string;
          right_percentage: number;
          sentiment_label: "positive" | "neutral" | "negative";
          sentiment_score: number;
          summary: string;
          updated_at?: string;
        };
        Update: {
          article_id?: string;
          bias_label?: "left" | "center" | "right" | "mixed" | "unclear";
          bias_score?: never;
          center_percentage?: number;
          confidence?: number;
          created_at?: string;
          disclaimer?: string;
          framing_notes?: string;
          id?: string;
          left_percentage?: number;
          loaded_terms?: string[];
          model?: string;
          right_percentage?: number;
          sentiment_label?: "positive" | "neutral" | "negative";
          sentiment_score?: number;
          summary?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "article_analyses_article_id_fkey";
            columns: ["article_id"];
            isOneToOne: true;
            referencedRelation: "articles";
            referencedColumns: ["id"];
          },
        ];
      };
      articles: {
        Row: {
          analyzed_at: string | null;
          canonical_url: string;
          created_at: string;
          id: string;
          image_url: string;
          original_url: string;
          published_at: string;
          raw_text: string;
          scraped_at: string;
          source_id: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          analyzed_at?: string | null;
          canonical_url: string;
          created_at?: string;
          id?: string;
          image_url: string;
          original_url: string;
          published_at: string;
          raw_text: string;
          scraped_at?: string;
          source_id: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          analyzed_at?: string | null;
          canonical_url?: string;
          created_at?: string;
          id?: string;
          image_url?: string;
          original_url?: string;
          published_at?: string;
          raw_text?: string;
          scraped_at?: string;
          source_id?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "articles_source_id_fkey";
            columns: ["source_id"];
            isOneToOne: false;
            referencedRelation: "sources";
            referencedColumns: ["id"];
          },
        ];
      };
      logs: {
        Row: {
          context: Json;
          correlation_id: string | null;
          created_at: string;
          event: string;
          id: string;
          level: "debug" | "info" | "warn" | "error";
          message: string;
        };
        Insert: {
          context?: Json;
          correlation_id?: string | null;
          created_at?: string;
          event: string;
          id?: string;
          level: "debug" | "info" | "warn" | "error";
          message: string;
        };
        Update: {
          context?: Json;
          correlation_id?: string | null;
          created_at?: string;
          event?: string;
          id?: string;
          level?: "debug" | "info" | "warn" | "error";
          message?: string;
        };
        Relationships: [];
      };
      oxylabs_schedule_runs: {
        Row: {
          created_at: string;
          discovered_at: string;
          error_message: string | null;
          id: string;
          processed_at: string | null;
          processing_status:
            | "pending"
            | "processing"
            | "processed"
            | "failed"
            | "skipped";
          remote_job_id: string;
          remote_run_id: string;
          result_status: "pending" | "done" | "faulted";
          schedule_id: string;
          summary: Json;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          discovered_at?: string;
          error_message?: string | null;
          id?: string;
          processed_at?: string | null;
          processing_status?:
            | "pending"
            | "processing"
            | "processed"
            | "failed"
            | "skipped";
          remote_job_id: string;
          remote_run_id: string;
          result_status: "pending" | "done" | "faulted";
          schedule_id: string;
          summary?: Json;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          discovered_at?: string;
          error_message?: string | null;
          id?: string;
          processed_at?: string | null;
          processing_status?:
            | "pending"
            | "processing"
            | "processed"
            | "failed"
            | "skipped";
          remote_job_id?: string;
          remote_run_id?: string;
          result_status?: "pending" | "done" | "faulted";
          schedule_id?: string;
          summary?: Json;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "oxylabs_schedule_runs_schedule_id_fkey";
            columns: ["schedule_id"];
            isOneToOne: false;
            referencedRelation: "oxylabs_schedules";
            referencedColumns: ["id"];
          },
        ];
      };
      oxylabs_schedules: {
        Row: {
          created_at: string;
          id: string;
          is_active: boolean;
          last_sync_error: string | null;
          last_synced_at: string | null;
          remote_state: string;
          schedule_id: string;
          source_id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          is_active?: boolean;
          last_sync_error?: string | null;
          last_synced_at?: string | null;
          remote_state?: string;
          schedule_id: string;
          source_id: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          is_active?: boolean;
          last_sync_error?: string | null;
          last_synced_at?: string | null;
          remote_state?: string;
          schedule_id?: string;
          source_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "oxylabs_schedules_source_id_fkey";
            columns: ["source_id"];
            isOneToOne: true;
            referencedRelation: "sources";
            referencedColumns: ["id"];
          },
        ];
      };
      sources: {
        Row: {
          created_at: string;
          id: string;
          is_active: boolean;
          listing_url: string;
          logo_url: string | null;
          name: string;
          parser_strategy: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          is_active?: boolean;
          listing_url: string;
          logo_url?: string | null;
          name: string;
          parser_strategy?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          is_active?: boolean;
          listing_url?: string;
          logo_url?: string | null;
          name?: string;
          parser_strategy?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<never, never>;
    Functions: Record<never, never>;
    Enums: Record<never, never>;
    CompositeTypes: Record<never, never>;
  };
};

type PublicSchema = Database["public"];

export type Tables<
  TableName extends keyof PublicSchema["Tables"],
> = PublicSchema["Tables"][TableName]["Row"];

export type TablesInsert<
  TableName extends keyof PublicSchema["Tables"],
> = PublicSchema["Tables"][TableName]["Insert"];

export type TablesUpdate<
  TableName extends keyof PublicSchema["Tables"],
> = PublicSchema["Tables"][TableName]["Update"];
