/**
 * Database types for SOCIALA MONEY
 * 
 * These types will be generated from Supabase once the schema is stable.
 * For now, we keep placeholders and domain-related interfaces.
 * 
 * Do not invent tables or columns here.
 * Claude is responsible for the Supabase schema.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// Placeholder - will be replaced by generated types later
export interface Database {
  public: {
    Tables: {
      // Tables will be added progressively as Claude builds the schema
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
