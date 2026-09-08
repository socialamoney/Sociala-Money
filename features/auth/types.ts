/**
 * Types for the Auth feature.
 * Based on Domaine 1 (profiles + user_settings).
 * Do not invent columns. Align with the real Supabase schema.
 */

export type AuthFormState = {
  error?: string;
  success?: string;
  message?: string;
};

export type Profile = {
  id: string;
  // Common fields expected from Domaine 1 - adjust when types are generated
  full_name?: string | null;
  phone?: string | null;
  country_id?: string | null;
  avatar_url?: string | null;
  referral_code?: string | null;
  account_status?: string | null;
  kyc_status?: "pending" | "verified" | "rejected" | "requires_action" | null;
  created_at?: string;
  updated_at?: string;
  [key: string]: unknown;
};

export type UserSettings = {
  id?: string;
  user_id?: string;
  language?: string | null;
  currency_id?: string | null;
  notifications_enabled?: boolean | null;
  [key: string]: unknown;
};

export type AuthUser = {
  id: string;
  email?: string;
  email_confirmed_at?: string | null;
  phone?: string;
};
