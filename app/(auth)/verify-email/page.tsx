import Link from "next/link";
import { AuthCard } from "@/features/auth/components/AuthCard";

export const metadata = {
  title: "Vérification e-mail | Sociala Money",
};

export default function VerifyEmailPage() {
  return (
    <AuthCard
      title="Vérifiez votre e-mail"
      description="Nous vous avons envoyé un lien de confirmation"
    >
      <div className="space-y-6 text-center">
        <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 px-4 py-4 text-sm text-blue-800 dark:text-blue-300">
          <p>
            Cliquez sur le lien reçu par e-mail pour activer votre compte.
            Pensez à vérifier vos spams.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Une fois confirmé, vous pourrez vous connecter.
          </p>
          <Link
            href="/login"
            className="inline-block w-full rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3.5 transition text-center"
          >
            Aller à la connexion
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}
