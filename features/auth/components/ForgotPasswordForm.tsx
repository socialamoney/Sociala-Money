"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { requestPasswordReset } from "../services/auth";

export function ForgotPasswordForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    setError(null);
    setSuccess(null);
    setMessage(null);

    startTransition(async () => {
      const result = await requestPasswordReset(formData);
      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        setSuccess(result.success);
        setMessage(result.message || null);
      }
    });
  }

  if (success) {
    return (
      <div className="space-y-4 text-center">
        <div className="rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 px-4 py-4 text-sm text-green-800 dark:text-green-300">
          <p className="font-semibold">{success}</p>
          {message && <p className="mt-1">{message}</p>}
        </div>
        <Link
          href="/login"
          className="inline-block text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          Retour à la connexion
        </Link>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
        >
          Adresse e-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
          placeholder="vous@exemple.com"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-primary-600 hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 transition"
      >
        {isPending ? "Envoi en cours..." : "Envoyer le lien"}
      </button>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        <Link
          href="/login"
          className="font-semibold text-primary-600 hover:text-primary-700"
        >
          Retour à la connexion
        </Link>
      </p>
    </form>
  );
}
