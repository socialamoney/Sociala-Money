"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export type AuthActionResult = {
  error?: string;
  success?: string;
  message?: string;
};

export async function signUp(formData: FormData): Promise<AuthActionResult> {
  const supabase = await createClient();

  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const fullName = String(formData.get("full_name") || "").trim();

  if (!email || !password) {
    return { error: "L'email et le mot de passe sont obligatoires." };
  }

  if (password.length < 8) {
    return { error: "Le mot de passe doit contenir au moins 8 caractères." };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName || undefined,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/verify-email`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  // Profile and user_settings are created automatically by Supabase triggers (Domaine 1)
  if (data.user && !data.session) {
    return {
      success: "Inscription réussie",
      message:
        "Un email de confirmation vous a été envoyé. Veuillez vérifier votre boîte de réception.",
    };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signIn(formData: FormData): Promise<AuthActionResult> {
  const supabase = await createClient();

  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "L'email et le mot de passe sont obligatoires." };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.message.includes("Email not confirmed")) {
      return {
        error:
          "Votre adresse e-mail n'est pas encore confirmée. Veuillez vérifier votre boîte de réception.",
      };
    }
    return { error: "Email ou mot de passe incorrect." };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}

export async function requestPasswordReset(
  formData: FormData
): Promise<AuthActionResult> {
  const supabase = await createClient();
  const email = String(formData.get("email") || "").trim();

  if (!email) {
    return { error: "L'adresse e-mail est obligatoire." };
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
  });

  if (error) {
    return { error: error.message };
  }

  return {
    success: "Email envoyé",
    message:
      "Si un compte existe avec cette adresse, un lien de réinitialisation vous a été envoyé.",
  };
}

export async function updatePassword(
  formData: FormData
): Promise<AuthActionResult> {
  const supabase = await createClient();
  const password = String(formData.get("password") || "");
  const confirmPassword = String(formData.get("confirm_password") || "");

  if (!password || password.length < 8) {
    return { error: "Le mot de passe doit contenir au moins 8 caractères." };
  }

  if (password !== confirmPassword) {
    return { error: "Les mots de passe ne correspondent pas." };
  }

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return { error: error.message };
  }

  return {
    success: "Mot de passe mis à jour",
    message: "Votre mot de passe a été modifié avec succès.",
  };
}

export async function resendConfirmationEmail(
  formData: FormData
): Promise<AuthActionResult> {
  const supabase = await createClient();
  const email = String(formData.get("email") || "").trim();

  if (!email) {
    return { error: "L'adresse e-mail est obligatoire." };
  }

  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/verify-email`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return {
    success: "Email renvoyé",
    message: "Un nouvel email de confirmation a été envoyé.",
  };
}
