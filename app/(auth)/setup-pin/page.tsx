import { AuthCard } from "@/features/auth/components/AuthCard";

export const metadata = {
  title: "Configurer le PIN | Sociala Money",
};

export default function SetupPinPage() {
  return (
    <AuthCard
      title="Configurer votre PIN"
      description="Cette étape sera disponible prochainement"
    >
      <div className="text-center space-y-4">
        <div className="rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-4 py-4 text-sm text-amber-800 dark:text-amber-300">
          <p>
            La configuration du PIN transactionnel sera activée une fois le
            domaine sécurité finalisé côté Supabase.
          </p>
        </div>
        <p className="text-sm text-gray-500">
          Vous pourrez continuer à utiliser votre compte sans PIN pour le moment.
        </p>
      </div>
    </AuthCard>
  );
}
