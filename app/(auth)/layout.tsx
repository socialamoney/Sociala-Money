import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <header className="py-6 px-4">
        <div className="max-w-7xl mx-auto flex justify-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Sociala Money
            </span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        {children}
      </main>

      <footer className="py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Sociala Agency. Tous droits réservés.
      </footer>
    </div>
  );
}
