export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      account_deletion_jobs: {
        Row: {
          auth_delete_status: string | null
          completed_at: string | null
          created_at: string
          db_cleanup_status: string | null
          email_hash: string
          failed_at: string | null
          freemius_cancelled_at: string | null
          freemius_status: string | null
          freemius_subscription_id: string | null
          id: string
          kit_deleted_at: string | null
          kit_status: string | null
          kit_subscriber_id: string | null
          last_error: string | null
          manual_action_reason: string | null
          manual_action_required: boolean
          metadata: Json
          processing_started_at: string | null
          request_source: string
          requested_at: string
          retained_data_note: string | null
          status: string
          storage_deleted_count: number
          storage_status: string | null
          updated_at: string
          user_id: string | null
          verified_at: string | null
        }
        Insert: {
          auth_delete_status?: string | null
          completed_at?: string | null
          created_at?: string
          db_cleanup_status?: string | null
          email_hash: string
          failed_at?: string | null
          freemius_cancelled_at?: string | null
          freemius_status?: string | null
          freemius_subscription_id?: string | null
          id?: string
          kit_deleted_at?: string | null
          kit_status?: string | null
          kit_subscriber_id?: string | null
          last_error?: string | null
          manual_action_reason?: string | null
          manual_action_required?: boolean
          metadata?: Json
          processing_started_at?: string | null
          request_source: string
          requested_at?: string
          retained_data_note?: string | null
          status?: string
          storage_deleted_count?: number
          storage_status?: string | null
          updated_at?: string
          user_id?: string | null
          verified_at?: string | null
        }
        Update: {
          auth_delete_status?: string | null
          completed_at?: string | null
          created_at?: string
          db_cleanup_status?: string | null
          email_hash?: string
          failed_at?: string | null
          freemius_cancelled_at?: string | null
          freemius_status?: string | null
          freemius_subscription_id?: string | null
          id?: string
          kit_deleted_at?: string | null
          kit_status?: string | null
          kit_subscriber_id?: string | null
          last_error?: string | null
          manual_action_reason?: string | null
          manual_action_required?: boolean
          metadata?: Json
          processing_started_at?: string | null
          request_source?: string
          requested_at?: string
          retained_data_note?: string | null
          status?: string
          storage_deleted_count?: number
          storage_status?: string | null
          updated_at?: string
          user_id?: string | null
          verified_at?: string | null
        }
        Relationships: []
      }
      account_deletion_requests: {
        Row: {
          email: string | null
          id: string
          processed_at: string | null
          reason: string | null
          requested_at: string
          status: string
          user_id: string | null
        }
        Insert: {
          email?: string | null
          id?: string
          processed_at?: string | null
          reason?: string | null
          requested_at?: string
          status?: string
          user_id?: string | null
        }
        Update: {
          email?: string | null
          id?: string
          processed_at?: string | null
          reason?: string | null
          requested_at?: string
          status?: string
          user_id?: string | null
        }
        Relationships: []
      }
      account_deletion_verifications: {
        Row: {
          consumed_at: string | null
          created_at: string
          deletion_job_id: string | null
          email: string
          email_hash: string | null
          expires_at: string
          id: string
          last_error: string | null
          request_source: string
          requested_at: string
          status: string
          token_hash: string
          updated_at: string
          verified_at: string | null
        }
        Insert: {
          consumed_at?: string | null
          created_at?: string
          deletion_job_id?: string | null
          email: string
          email_hash?: string | null
          expires_at: string
          id?: string
          last_error?: string | null
          request_source?: string
          requested_at?: string
          status?: string
          token_hash: string
          updated_at?: string
          verified_at?: string | null
        }
        Update: {
          consumed_at?: string | null
          created_at?: string
          deletion_job_id?: string | null
          email?: string
          email_hash?: string | null
          expires_at?: string
          id?: string
          last_error?: string | null
          request_source?: string
          requested_at?: string
          status?: string
          token_hash?: string
          updated_at?: string
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "account_deletion_verifications_deletion_job_id_fkey"
            columns: ["deletion_job_id"]
            isOneToOne: false
            referencedRelation: "account_deletion_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_requests: {
        Row: {
          action: string
          completed_at: string | null
          created_at: string
          error_message: string | null
          id: string
          input_context: Json | null
          model: string | null
          output: Json | null
          practice_id: string | null
          status: string
          system_prompt_version: string | null
          user_id: string
          user_prompt: string | null
        }
        Insert: {
          action: string
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          input_context?: Json | null
          model?: string | null
          output?: Json | null
          practice_id?: string | null
          status?: string
          system_prompt_version?: string | null
          user_id: string
          user_prompt?: string | null
        }
        Update: {
          action?: string
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          input_context?: Json | null
          model?: string | null
          output?: Json | null
          practice_id?: string | null
          status?: string
          system_prompt_version?: string | null
          user_id?: string
          user_prompt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_requests_practice_id_fkey"
            columns: ["practice_id"]
            isOneToOne: false
            referencedRelation: "practices"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_suggestions: {
        Row: {
          ai_request_id: string
          applied_at: string | null
          created_at: string
          id: string
          payload: Json
          practice_id: string
          priority: string
          reason: string | null
          status: string
          suggestion_type: string
          target_id: string | null
          target_type: string
          title: string
          user_id: string
        }
        Insert: {
          ai_request_id: string
          applied_at?: string | null
          created_at?: string
          id?: string
          payload?: Json
          practice_id: string
          priority?: string
          reason?: string | null
          status?: string
          suggestion_type: string
          target_id?: string | null
          target_type: string
          title: string
          user_id: string
        }
        Update: {
          ai_request_id?: string
          applied_at?: string | null
          created_at?: string
          id?: string
          payload?: Json
          practice_id?: string
          priority?: string
          reason?: string | null
          status?: string
          suggestion_type?: string
          target_id?: string | null
          target_type?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_suggestions_ai_request_id_fkey"
            columns: ["ai_request_id"]
            isOneToOne: false
            referencedRelation: "ai_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_suggestions_practice_id_fkey"
            columns: ["practice_id"]
            isOneToOne: false
            referencedRelation: "practices"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_usage_events: {
        Row: {
          action: string
          ai_request_id: string | null
          cached_input_tokens: number | null
          created_at: string
          estimated_cost: number | null
          id: string
          input_tokens: number | null
          model: string | null
          output_tokens: number | null
          practice_id: string | null
          provider_latency_ms: number | null
          total_tokens: number | null
          user_id: string
        }
        Insert: {
          action: string
          ai_request_id?: string | null
          cached_input_tokens?: number | null
          created_at?: string
          estimated_cost?: number | null
          id?: string
          input_tokens?: number | null
          model?: string | null
          output_tokens?: number | null
          practice_id?: string | null
          provider_latency_ms?: number | null
          total_tokens?: number | null
          user_id: string
        }
        Update: {
          action?: string
          ai_request_id?: string | null
          cached_input_tokens?: number | null
          created_at?: string
          estimated_cost?: number | null
          id?: string
          input_tokens?: number | null
          model?: string | null
          output_tokens?: number | null
          practice_id?: string | null
          provider_latency_ms?: number | null
          total_tokens?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_usage_events_ai_request_id_fkey"
            columns: ["ai_request_id"]
            isOneToOne: false
            referencedRelation: "ai_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_usage_events_practice_id_fkey"
            columns: ["practice_id"]
            isOneToOne: false
            referencedRelation: "practices"
            referencedColumns: ["id"]
          },
        ]
      }
      app_admins: {
        Row: {
          created_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          user_id?: string
        }
        Relationships: []
      }
      billing_webhook_events: {
        Row: {
          error_message: string | null
          event_name: string
          id: string
          payload: Json
          processed_at: string
          processing_status: string
          provider: string
          provider_event_id: string | null
          provider_license_id: string | null
          provider_subscription_id: string | null
          provider_user_id: string | null
          user_id: string | null
        }
        Insert: {
          error_message?: string | null
          event_name: string
          id?: string
          payload: Json
          processed_at?: string
          processing_status?: string
          provider?: string
          provider_event_id?: string | null
          provider_license_id?: string | null
          provider_subscription_id?: string | null
          provider_user_id?: string | null
          user_id?: string | null
        }
        Update: {
          error_message?: string | null
          event_name?: string
          id?: string
          payload?: Json
          processed_at?: string
          processing_status?: string
          provider?: string
          provider_event_id?: string | null
          provider_license_id?: string | null
          provider_subscription_id?: string | null
          provider_user_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          subject: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          subject: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          subject?: string
        }
        Relationships: []
      }
      drills: {
        Row: {
          age_group_max: number | null
          age_group_min: number | null
          category: string | null
          coaching_cues: string | null
          created_at: string
          difficulty: string | null
          duration_minutes: number | null
          equipment: string | null
          id: string
          image_url: string | null
          instructions: string | null
          is_published: boolean
          max_players: number | null
          min_players: number | null
          objective: string | null
          setup: string | null
          short_description: string | null
          subcategory: string | null
          title: string
          updated_at: string
          variations: string | null
          video_url: string | null
        }
        Insert: {
          age_group_max?: number | null
          age_group_min?: number | null
          category?: string | null
          coaching_cues?: string | null
          created_at?: string
          difficulty?: string | null
          duration_minutes?: number | null
          equipment?: string | null
          id?: string
          image_url?: string | null
          instructions?: string | null
          is_published?: boolean
          max_players?: number | null
          min_players?: number | null
          objective?: string | null
          setup?: string | null
          short_description?: string | null
          subcategory?: string | null
          title: string
          updated_at?: string
          variations?: string | null
          video_url?: string | null
        }
        Update: {
          age_group_max?: number | null
          age_group_min?: number | null
          category?: string | null
          coaching_cues?: string | null
          created_at?: string
          difficulty?: string | null
          duration_minutes?: number | null
          equipment?: string | null
          id?: string
          image_url?: string | null
          instructions?: string | null
          is_published?: boolean
          max_players?: number | null
          min_players?: number | null
          objective?: string | null
          setup?: string | null
          short_description?: string | null
          subcategory?: string | null
          title?: string
          updated_at?: string
          variations?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      external_erasure_tasks: {
        Row: {
          action: string
          attempted_at: string | null
          completed_at: string | null
          created_at: string
          deletion_job_id: string
          email_hash: string | null
          external_id: string | null
          id: string
          last_error: string | null
          manual_instructions: string | null
          metadata: Json
          provider: string
          status: string
          updated_at: string
        }
        Insert: {
          action: string
          attempted_at?: string | null
          completed_at?: string | null
          created_at?: string
          deletion_job_id: string
          email_hash?: string | null
          external_id?: string | null
          id?: string
          last_error?: string | null
          manual_instructions?: string | null
          metadata?: Json
          provider: string
          status?: string
          updated_at?: string
        }
        Update: {
          action?: string
          attempted_at?: string | null
          completed_at?: string | null
          created_at?: string
          deletion_job_id?: string
          email_hash?: string | null
          external_id?: string | null
          id?: string
          last_error?: string | null
          manual_instructions?: string | null
          metadata?: Json
          provider?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "external_erasure_tasks_deletion_job_id_fkey"
            columns: ["deletion_job_id"]
            isOneToOne: false
            referencedRelation: "account_deletion_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      favorite_drills: {
        Row: {
          created_at: string
          drill_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          drill_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          drill_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorite_drills_drill_id_fkey"
            columns: ["drill_id"]
            isOneToOne: false
            referencedRelation: "drills"
            referencedColumns: ["id"]
          },
        ]
      }
      practice_drills: {
        Row: {
          created_at: string
          drill_id: string
          id: string
          order_index: number
          practice_id: string
        }
        Insert: {
          created_at?: string
          drill_id: string
          id?: string
          order_index?: number
          practice_id: string
        }
        Update: {
          created_at?: string
          drill_id?: string
          id?: string
          order_index?: number
          practice_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "practice_drills_drill_id_fkey"
            columns: ["drill_id"]
            isOneToOne: false
            referencedRelation: "drills"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "practice_drills_practice_id_fkey"
            columns: ["practice_id"]
            isOneToOne: false
            referencedRelation: "practices"
            referencedColumns: ["id"]
          },
        ]
      }
      practice_section_drills: {
        Row: {
          adaptation_notes: string | null
          created_at: string
          custom_drill_data: Json | null
          drill_id: string | null
          drill_slug: string | null
          drill_source: string
          duration_snapshot: number | null
          id: string
          is_ai_adapted: boolean
          order_index: number
          practice_id: string
          practice_section_id: string
          title_snapshot: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          adaptation_notes?: string | null
          created_at?: string
          custom_drill_data?: Json | null
          drill_id?: string | null
          drill_slug?: string | null
          drill_source?: string
          duration_snapshot?: number | null
          id?: string
          is_ai_adapted?: boolean
          order_index?: number
          practice_id: string
          practice_section_id: string
          title_snapshot?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          adaptation_notes?: string | null
          created_at?: string
          custom_drill_data?: Json | null
          drill_id?: string | null
          drill_slug?: string | null
          drill_source?: string
          duration_snapshot?: number | null
          id?: string
          is_ai_adapted?: boolean
          order_index?: number
          practice_id?: string
          practice_section_id?: string
          title_snapshot?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "practice_section_drills_drill_id_fkey"
            columns: ["drill_id"]
            isOneToOne: false
            referencedRelation: "drills"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "practice_section_drills_practice_id_fkey"
            columns: ["practice_id"]
            isOneToOne: false
            referencedRelation: "practices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "practice_section_drills_section_practice_fkey"
            columns: ["practice_section_id", "practice_id"]
            isOneToOne: false
            referencedRelation: "practice_sections"
            referencedColumns: ["id", "practice_id"]
          },
        ]
      }
      practice_sections: {
        Row: {
          ai_metadata: Json
          coach_notes: string | null
          coaching_cues: string | null
          constraints: Json
          created_at: string
          duration_minutes: number
          id: string
          instructions: string | null
          objective: string | null
          order_index: number
          practice_id: string
          progressions: Json
          regressions: Json
          section_type: string | null
          title: string
          updated_at: string
        }
        Insert: {
          ai_metadata?: Json
          coach_notes?: string | null
          coaching_cues?: string | null
          constraints?: Json
          created_at?: string
          duration_minutes?: number
          id?: string
          instructions?: string | null
          objective?: string | null
          order_index?: number
          practice_id: string
          progressions?: Json
          regressions?: Json
          section_type?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          ai_metadata?: Json
          coach_notes?: string | null
          coaching_cues?: string | null
          constraints?: Json
          created_at?: string
          duration_minutes?: number
          id?: string
          instructions?: string | null
          objective?: string | null
          order_index?: number
          practice_id?: string
          progressions?: Json
          regressions?: Json
          section_type?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "practice_sections_practice_id_fkey"
            columns: ["practice_id"]
            isOneToOne: false
            referencedRelation: "practices"
            referencedColumns: ["id"]
          },
        ]
      }
      practice_versions: {
        Row: {
          created_at: string
          id: string
          label: string | null
          practice_id: string
          snapshot: Json
          source_ai_request_id: string | null
          user_id: string
          version_type: string
        }
        Insert: {
          created_at?: string
          id?: string
          label?: string | null
          practice_id: string
          snapshot: Json
          source_ai_request_id?: string | null
          user_id: string
          version_type: string
        }
        Update: {
          created_at?: string
          id?: string
          label?: string | null
          practice_id?: string
          snapshot?: Json
          source_ai_request_id?: string | null
          user_id?: string
          version_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "practice_versions_practice_id_fkey"
            columns: ["practice_id"]
            isOneToOne: false
            referencedRelation: "practices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "practice_versions_source_ai_request_id_fkey"
            columns: ["source_ai_request_id"]
            isOneToOne: false
            referencedRelation: "ai_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      practices: {
        Row: {
          age_group: string | null
          created_at: string
          duration_minutes: number
          equipment_notes: string | null
          id: string
          is_archived: boolean
          is_shareable: boolean
          level: string | null
          notes: string | null
          player_count: number | null
          practice_date: string | null
          reflections: string | null
          share_token: string
          title: string
          topic: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          age_group?: string | null
          created_at?: string
          duration_minutes?: number
          equipment_notes?: string | null
          id?: string
          is_archived?: boolean
          is_shareable?: boolean
          level?: string | null
          notes?: string | null
          player_count?: number | null
          practice_date?: string | null
          reflections?: string | null
          share_token?: string
          title: string
          topic?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          age_group?: string | null
          created_at?: string
          duration_minutes?: number
          equipment_notes?: string | null
          id?: string
          is_archived?: boolean
          is_shareable?: boolean
          level?: string | null
          notes?: string | null
          player_count?: number | null
          practice_date?: string | null
          reflections?: string | null
          share_token?: string
          title?: string
          topic?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          email_marketing: boolean
          email_preferences_updated_at: string | null
          email_product_updates: boolean
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          email_marketing?: boolean
          email_preferences_updated_at?: string | null
          email_product_updates?: boolean
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          email_marketing?: boolean
          email_preferences_updated_at?: string | null
          email_product_updates?: boolean
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      subscription_cancellation_feedback: {
        Row: {
          created_at: string
          current_period_end: string | null
          id: string
          note: string | null
          plan_id: string | null
          provider: string | null
          provider_license_id: string | null
          provider_subscription_id: string | null
          reason: string
          source: string
          status: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          current_period_end?: string | null
          id?: string
          note?: string | null
          plan_id?: string | null
          provider?: string | null
          provider_license_id?: string | null
          provider_subscription_id?: string | null
          reason: string
          source?: string
          status?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          current_period_end?: string | null
          id?: string
          note?: string | null
          plan_id?: string | null
          provider?: string | null
          provider_license_id?: string | null
          provider_subscription_id?: string | null
          reason?: string
          source?: string
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan: string
          provider: string
          provider_customer_id: string | null
          provider_subscription_id: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan?: string
          provider?: string
          provider_customer_id?: string | null
          provider_subscription_id?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan?: string
          provider?: string
          provider_customer_id?: string | null
          provider_subscription_id?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      support_requests: {
        Row: {
          category: string | null
          created_at: string
          current_path: string | null
          email: string | null
          id: string
          message: string | null
          name: string | null
          source: string | null
          status: string
          subject: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          current_path?: string | null
          email?: string | null
          id?: string
          message?: string | null
          name?: string | null
          source?: string | null
          status?: string
          subject?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          current_path?: string | null
          email?: string | null
          id?: string
          message?: string | null
          name?: string | null
          source?: string | null
          status?: string
          subject?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      usage_events: {
        Row: {
          created_at: string
          credits_used: number
          event_type: string
          id: string
          metadata: Json
          user_id: string
        }
        Insert: {
          created_at?: string
          credits_used?: number
          event_type: string
          id?: string
          metadata?: Json
          user_id: string
        }
        Update: {
          created_at?: string
          credits_used?: number
          event_type?: string
          id?: string
          metadata?: Json
          user_id?: string
        }
        Relationships: []
      }
      user_ai_credit_periods: {
        Row: {
          ai_credits_used: number
          created_at: string
          id: string
          period_end: string
          period_start: string
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_credits_used?: number
          created_at?: string
          id?: string
          period_end: string
          period_start: string
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_credits_used?: number
          created_at?: string
          id?: string
          period_end?: string
          period_start?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_email_sync: {
        Row: {
          created_at: string
          kit_last_synced_at: string | null
          kit_subscriber_id: string | null
          kit_sync_error: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          kit_last_synced_at?: string | null
          kit_subscriber_id?: string | null
          kit_sync_error?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          kit_last_synced_at?: string | null
          kit_subscriber_id?: string | null
          kit_sync_error?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_email_sync_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_storage_usage: {
        Row: {
          storage_bytes_used: number
          updated_at: string
          user_id: string
        }
        Insert: {
          storage_bytes_used?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          storage_bytes_used?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          cancel_at_period_end: boolean
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan_id: string
          provider: string
          provider_customer_id: string | null
          provider_license_id: string | null
          provider_metadata: Json
          provider_plan_id: string | null
          provider_pricing_id: string | null
          provider_subscription_id: string | null
          provider_user_id: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_id?: string
          provider?: string
          provider_customer_id?: string | null
          provider_license_id?: string | null
          provider_metadata?: Json
          provider_plan_id?: string | null
          provider_pricing_id?: string | null
          provider_subscription_id?: string | null
          provider_user_id?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_id?: string
          provider?: string
          provider_customer_id?: string | null
          provider_license_id?: string | null
          provider_metadata?: Json
          provider_plan_id?: string | null
          provider_pricing_id?: string | null
          provider_subscription_id?: string | null
          provider_user_id?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_usage_monthly: {
        Row: {
          ai_credits_used: number
          created_at: string
          id: string
          pdf_exports_used: number
          updated_at: string
          usage_month: string
          user_id: string
        }
        Insert: {
          ai_credits_used?: number
          created_at?: string
          id?: string
          pdf_exports_used?: number
          updated_at?: string
          usage_month: string
          user_id: string
        }
        Update: {
          ai_credits_used?: number
          created_at?: string
          id?: string
          pdf_exports_used?: number
          updated_at?: string
          usage_month?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_billing_months: {
        Args: { p_months?: number; p_start: string }
        Returns: string
      }
      assert_can_create_practice_plan: { Args: never; Returns: undefined }
      can_create_practice_plan: { Args: never; Returns: boolean }
      can_export_pdf: { Args: never; Returns: boolean }
      can_upload_media: { Args: { p_upload_bytes: number }; Returns: boolean }
      can_use_ai_credits: {
        Args: { p_required_credits: number; p_user_id: string }
        Returns: boolean
      }
      can_use_ai_credits_in_current_period: {
        Args: { p_required_credits: number; p_user_id: string }
        Returns: boolean
      }
      ensure_user_storage_usage: {
        Args: { p_user_id: string }
        Returns: {
          storage_bytes_used: number
          updated_at: string
          user_id: string
        }
        SetofOptions: {
          from: "*"
          to: "user_storage_usage"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      get_ai_credit_period_bounds: {
        Args: { p_now?: string; p_user_id: string }
        Returns: {
          monthly_limit: number
          period_end: string
          period_start: string
          plan_id: string
        }[]
      }
      get_ai_credit_usage_snapshot: {
        Args: { p_user_id: string }
        Returns: {
          credits_remaining: number
          credits_used: number
          monthly_limit: number
          period_start: string
          plan_id: string
          reset_at: string
        }[]
      }
      get_current_ai_credit_usage: {
        Args: never
        Returns: {
          credits_remaining: number
          credits_used: number
          monthly_limit: number
          period_start: string
          plan_id: string
          reset_at: string
        }[]
      }
      get_current_month_start: { Args: never; Returns: string }
      get_effective_media_storage_limit_bytes: {
        Args: { p_user_id: string }
        Returns: number
      }
      get_effective_practice_plan_limit: {
        Args: { p_user_id: string }
        Returns: number
      }
      get_or_create_current_ai_credit_period: {
        Args: { p_user_id: string }
        Returns: {
          ai_credits_used: number
          created_at: string
          id: string
          period_end: string
          period_start: string
          updated_at: string
          user_id: string
        }
        SetofOptions: {
          from: "*"
          to: "user_ai_credit_periods"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      get_or_create_current_month_usage: {
        Args: { p_user_id: string }
        Returns: {
          ai_credits_used: number
          created_at: string
          id: string
          pdf_exports_used: number
          updated_at: string
          usage_month: string
          user_id: string
        }
        SetofOptions: {
          from: "*"
          to: "user_usage_monthly"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      get_shared_practice: {
        Args: { share_token_param: string }
        Returns: {
          age_group: string | null
          created_at: string
          duration_minutes: number
          equipment_notes: string | null
          id: string
          is_archived: boolean
          is_shareable: boolean
          level: string | null
          notes: string | null
          player_count: number | null
          practice_date: string | null
          reflections: string | null
          share_token: string
          title: string
          topic: string | null
          updated_at: string
          user_id: string
        }[]
        SetofOptions: {
          from: "*"
          to: "practices"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      get_shared_practice_section_drills: {
        Args: { share_token_param: string }
        Returns: {
          adaptation_notes: string | null
          created_at: string
          custom_drill_data: Json | null
          drill_id: string | null
          drill_slug: string | null
          drill_source: string
          duration_snapshot: number | null
          id: string
          is_ai_adapted: boolean
          order_index: number
          practice_id: string
          practice_section_id: string
          title_snapshot: string | null
          updated_at: string
          user_id: string
        }[]
        SetofOptions: {
          from: "*"
          to: "practice_section_drills"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      get_shared_practice_sections: {
        Args: { share_token_param: string }
        Returns: {
          ai_metadata: Json
          coach_notes: string | null
          coaching_cues: string | null
          constraints: Json
          created_at: string
          duration_minutes: number
          id: string
          instructions: string | null
          objective: string | null
          order_index: number
          practice_id: string
          progressions: Json
          regressions: Json
          section_type: string | null
          title: string
          updated_at: string
        }[]
        SetofOptions: {
          from: "*"
          to: "practice_sections"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      has_paid_subscription_access: {
        Args: {
          p_current_period_end?: string
          p_now?: string
          p_plan_id: string
          p_status: string
        }
        Returns: boolean
      }
      hash_normalized_email: { Args: { p_email: string }; Returns: string }
      initialize_user_billing: {
        Args: { p_user_id: string }
        Returns: undefined
      }
      owns_practice: {
        Args: { _practice_id: string; _user_id: string }
        Returns: boolean
      }
      record_ai_credit_usage: {
        Args: {
          p_credits_used: number
          p_event_type: string
          p_metadata?: Json
          p_user_id: string
        }
        Returns: {
          ai_credits_used: number
          created_at: string
          id: string
          period_end: string
          period_start: string
          updated_at: string
          user_id: string
        }
        SetofOptions: {
          from: "*"
          to: "user_ai_credit_periods"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      record_ai_usage: {
        Args: {
          p_credits_used: number
          p_event_type: string
          p_metadata?: Json
          p_user_id: string
        }
        Returns: {
          ai_credits_used: number
          created_at: string
          id: string
          pdf_exports_used: number
          updated_at: string
          usage_month: string
          user_id: string
        }
        SetofOptions: {
          from: "*"
          to: "user_usage_monthly"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      record_media_delete: {
        Args: { p_deleted_bytes: number; p_metadata?: Json }
        Returns: {
          storage_bytes_used: number
          updated_at: string
          user_id: string
        }
        SetofOptions: {
          from: "*"
          to: "user_storage_usage"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      record_media_upload: {
        Args: { p_metadata?: Json; p_upload_bytes: number }
        Returns: {
          storage_bytes_used: number
          updated_at: string
          user_id: string
        }
        SetofOptions: {
          from: "*"
          to: "user_storage_usage"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      record_pdf_export: {
        Args: { p_metadata?: Json }
        Returns: {
          ai_credits_used: number
          created_at: string
          id: string
          pdf_exports_used: number
          updated_at: string
          usage_month: string
          user_id: string
        }
        SetofOptions: {
          from: "*"
          to: "user_usage_monthly"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      reset_current_ai_credit_usage: {
        Args: { p_user_id: string }
        Returns: {
          ai_credits_used: number
          created_at: string
          id: string
          period_end: string
          period_start: string
          updated_at: string
          user_id: string
        }
        SetofOptions: {
          from: "*"
          to: "user_ai_credit_periods"
          isOneToOne: true
          isSetofReturn: false
        }
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
