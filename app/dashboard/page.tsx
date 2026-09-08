import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { signOut } from "@/features/auth/services/auth";

export const metadata = {
  title: "Dashboard | Sociala Money",
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch profile from Domaine 1
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Fetch user settings from Domaine 1
  const { data: settings } = await supabase
    .from("user_settings")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-lg font-bold">Sociala Money</h1>
          <form action={signOut}>
            <button
              type="submit"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Déconnexion
            </button>
          </form>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Bienvenue{profile?.full_name ? `, ${profile.full_name}` : ""}
            </h2>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              {user.email}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                Profil
              </h3>
              {profile ? (
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">ID</dt>
                    <dd className="font-mono text-xs">{profile.id.slice(0, 8)}...</dd>
                  </div>
                  {profile.kyc_status && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Statut KYC</dt>
                      <dd className="capitalize">{String(profile.kyc_status)}</dd>
                    </div>
                  )}
                  {profile.account_status && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Compte</dt>
                      <dd className="capitalize">{String(profile.account_status)}</dd>
                    </div>
                  )}
                  {profile.referral_code && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Code de parrainage</dt>
                      <dd className="font-medium">{String(profile.referral_code)}</dd>
                    </div>
                  )}
                </dl>
              ) : (
                <p className="text-sm text-gray-500">
                  Profil en cours de synchronisation...
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                Paramètres
              </h3>
              {settings ? (
                <dl className="space-y-2 text-sm">
                  {settings.language && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Langue</dt>
                      <dd>{String(settings.language)}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Notifications</dt>
                    <dd>
                      {settings.notifications_enabled ? "Activées" : "Désactivées"}
                    </dd>
                  </div>
                </dl>
              ) : (
                <p className="text-sm text-gray-500">
                  Paramètres par défaut appliqués.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-8 text-center">
            <p className="text-sm text-gray-500">
              Les modules Wallet, Collecte, Transfert, Boutiques, etc. seront
              ajoutés progressivement.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
