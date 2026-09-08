"use client";

import { useState, useTransition, useEffect } from "react";
import Link from "next/link";
import { signUp } from "../services/auth";
import { createClient } from "@/lib/supabase/client";

type Country = {
  id: string;
  name: string;
  iso_code?: string;
  phone_code?: string;
};

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [countries, setCountries] = useState<Country[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(true);

  useEffect(() => {
    async function loadCountries() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("countries")
          .select("id, name, iso_code, phone_code")
          .order("name");

        if (!error && data) {
          setCountries(data as Country[]);
        }
      } catch (e) {
        console.error("Failed to load countries", e);
      } finally {
        setLoadingCountries(false);
      }
    }
    loadCountries();
  }, []);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setSuccess(null);
    setMessage(null);

    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirm_password") || "");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    startTransition(async () => {
      const result = await signUp(formData);
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
    <form action={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Nom complet
        </label>
        <input
          id="full_name"
          name="full_name"
          type="text"
          required
          autoComplete="name"
          className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
          placeholder="Jean Dupont"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
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

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Téléphone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
          placeholder="+225 07 00 00 00 00"
        />
      </div>

      <div>
        <label htmlFor="country_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Pays
        </label>
        <select
          id="country_id"
          name="country_id"
          required
          disabled={loadingCountries}
          className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition disabled:opacity-60"
        >
          <option value="">
            {loadingCountries ? "Chargement des pays..." : "Sélectionnez votre pays"}
          </option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}{country.phone_code ? ` (${country.phone_code})` : ""}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
          placeholder="Minimum 8 caractères"
        />
      </div>

      <div>
        <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Confirmer le mot de passe
        </label>
        <input
          id="confirm_password"
          name="confirm_password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
          placeholder="Répétez le mot de passe"
        />
      </div>

      <div>
        <label htmlFor="referral_code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Code de parrainage <span className="text-gray-400 font-normal">(facultatif)</span>
        </label>
        <input
          id="referral_code"
          name="referral_code"
          type="text"
          className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
          placeholder="Code de parrainage"
        />
      </div>

      <button
        type="submit"
        disabled={isPending || loadingCountries}
        className="w-full rounded-xl bg-primary-600 hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 transition focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        {isPending ? "Création en cours..." : "Créer mon compte"}
      </button>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Déjà un compte ?{" "}
        <Link href="/login" className="font-semibold text-primary-600 hover:text-primary-700">
          Se connecter
        </Link>
      </p>
    </form>
  );
}
