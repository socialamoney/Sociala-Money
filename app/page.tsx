export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="text-center space-y-6 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Sociala Money
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Plateforme fintech africaine pour recevoir, gérer, envoyer et utiliser
          de l'argent.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <a
            href="/login"
            className="rounded-lg bg-primary-600 px-6 py-3 text-white font-medium hover:bg-primary-700 transition"
          >
            Connexion
          </a>
          <a
            href="/register"
            className="rounded-lg border border-gray-300 px-6 py-3 font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition"
          >
            Inscription
          </a>
        </div>
        <p className="text-sm text-gray-500 pt-8">
          Fondation du projet en cours de construction
        </p>
      </div>
    </main>
  );
}
