import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="text-center space-y-8 max-w-2xl">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
            Sociala Money
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            La plateforme fintech africaine pour recevoir, gérer, envoyer et
            utiliser de l'argent simplement et en toute sécurité.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/login"
            className="rounded-xl bg-primary-600 hover:bg-primary-700 px-8 py-3.5 text-white font-semibold transition shadow-lg shadow-primary-600/20"
          >
            Se connecter
          </Link>
          <Link
            href="/register"
            className="rounded-xl border border-gray-300 dark:border-gray-700 px-8 py-3.5 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            Créer un compte
          </Link>
        </div>

        <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-gray-500">
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Collecte</p>
            <p>Payment Links</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Carte</p>
            <p>Virtuelle</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Transfert</p>
            <p>Rapide & sûr</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Boutique</p>
            <p>Jusqu'à 3 gratuites</p>
          </div>
        </div>
      </div>
    </main>
  );
}
