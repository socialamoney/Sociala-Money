import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Send,
  ShieldCheck,
  Wallet,
} from "lucide-react";

export const metadata = {
  title: "Tableau de bord | Sociala Money",
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Real data from Domaine 1
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Try to fetch wallet if available (Domaine Transactions/Wallet)
  const { data: wallet } = await supabase
    .from("wallets")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  // Latest transactions if available
  const { data: recentTransactions } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  const kycStatus = (profile?.kyc_status as string) || "pending";

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Bonjour{profile?.full_name ? `, ${profile.full_name}` : ""} 👋
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Voici un aperçu de votre compte Sociala Money
        </p>
      </div>

      {/* Balance card */}
      <div className="rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 p-6 text-white shadow-lg">
        <div className="flex items-center gap-2 text-primary-100 text-sm font-medium">
          <Wallet className="h-4 w-4" />
          Solde disponible
        </div>
        <p className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
          {wallet && typeof wallet.balance !== "undefined"
            ? `${Number(wallet.balance).toLocaleString("fr-FR")} ${wallet.currency_code || ""}`
            : "—"}
        </p>
        <p className="mt-1 text-sm text-primary-200">
          {wallet
            ? "Solde réel de votre portefeuille"
            : "Le portefeuille sera affiché dès qu'il sera disponible"}
        </p>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Actions rapides
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link
            href="/dashboard/recharge"
            className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 hover:border-primary-300 hover:shadow-sm transition"
          >
            <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3">
              <ArrowDownToLine className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-sm font-medium">Recharger</span>
          </Link>

          <Link
            href="/dashboard/withdraw"
            className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 hover:border-primary-300 hover:shadow-sm transition"
          >
            <div className="rounded-full bg-orange-100 dark:bg-orange-900/30 p-3">
              <ArrowUpFromLine className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <span className="text-sm font-medium">Retirer</span>
          </Link>

          <Link
            href="/dashboard/transfers"
            className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 hover:border-primary-300 hover:shadow-sm transition"
          >
            <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3">
              <Send className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm font-medium">Transferer</span>
          </Link>

          <Link
            href="/dashboard/kyc"
            className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 hover:border-primary-300 hover:shadow-sm transition"
          >
            <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-3">
              <ShieldCheck className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-sm font-medium">KYC</span>
          </Link>
        </div>
      </div>

      {/* KYC status */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Vérification d'identité (KYC)
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Statut actuel :{" "}
              <span className="font-medium capitalize">{kycStatus}</span>
            </p>
          </div>
          <Link
            href="/dashboard/kyc"
            className="text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            Voir détails →
          </Link>
        </div>
      </div>

      {/* Recent transactions */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Dernières transactions
          </h3>
          <Link
            href="/dashboard/transactions"
            className="text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            Voir tout
          </Link>
        </div>

        {recentTransactions && recentTransactions.length > 0 ? (
          <ul className="divide-y divide-gray-200 dark:divide-gray-800">
            {recentTransactions.map((tx: Record<string, unknown>) => (
              <li key={String(tx.id)} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {String(tx.type || "Transaction")}
                  </p>
                  <p className="text-xs text-gray-500">
                    {tx.created_at
                      ? new Date(String(tx.created_at)).toLocaleDateString("fr-FR")
                      : ""}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">
                    {tx.amount !== undefined
                      ? `${Number(tx.amount).toLocaleString("fr-FR")}`
                      : "—"}
                  </p>
                  <p className="text-xs capitalize text-gray-500">
                    {String(tx.status || "")}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-6 py-12 text-center text-sm text-gray-500">
            Aucune transaction pour le moment
          </div>
        )}
      </div>
    </div>
  );
}
