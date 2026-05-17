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
      articles: {
        Row: {
          author_name: string | null;
          cover_image: string | null;
          created_at: string;
          id: string;
          published_at: string | null;
          slug: string;
          status: string;
          translations: Json;
          updated_at: string;
        };
        Insert: {
          author_name?: string | null;
          cover_image?: string | null;
          created_at?: string;
          id?: string;
          published_at?: string | null;
          slug: string;
          status?: string;
          translations?: Json;
          updated_at?: string;
        };
        Update: {
          author_name?: string | null;
          cover_image?: string | null;
          created_at?: string;
          id?: string;
          published_at?: string | null;
          slug?: string;
          status?: string;
          translations?: Json;
          updated_at?: string;
        };
        Relationships: [];
      };
      events: {
        Row: {
          cover_image: string | null;
          created_at: string;
          date_end: string | null;
          date_start: string;
          helloasso_ticket_url: string | null;
          id: string;
          location: string | null;
          slug: string;
          status: string;
          translations: Json;
          updated_at: string;
        };
        Insert: {
          cover_image?: string | null;
          created_at?: string;
          date_end?: string | null;
          date_start: string;
          helloasso_ticket_url?: string | null;
          id?: string;
          location?: string | null;
          slug: string;
          status?: string;
          translations?: Json;
          updated_at?: string;
        };
        Update: {
          cover_image?: string | null;
          created_at?: string;
          date_end?: string | null;
          date_start?: string;
          helloasso_ticket_url?: string | null;
          id?: string;
          location?: string | null;
          slug?: string;
          status?: string;
          translations?: Json;
          updated_at?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          created_at: string;
          full_name: string | null;
          id: string;
          role: string;
        };
        Insert: {
          created_at?: string;
          full_name?: string | null;
          id: string;
          role?: string;
        };
        Update: {
          created_at?: string;
          full_name?: string | null;
          id?: string;
          role?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<never, never>;
    Functions: {
      has_role: { Args: { required: string }; Returns: boolean };
      is_admin: { Args: Record<never, never>; Returns: boolean };
    };
    Enums: Record<never, never>;
    CompositeTypes: Record<never, never>;
  };
};

type PublicTables = Database["public"]["Tables"];
export type Event = PublicTables["events"]["Row"];
export type Article = PublicTables["articles"]["Row"];
export type Profile = PublicTables["profiles"]["Row"];

/** Per-locale content stored in the `translations` JSONB column. */
export type Translation = { title?: string; summary?: string; body?: string };
export type Translations = Record<string, Translation>;
