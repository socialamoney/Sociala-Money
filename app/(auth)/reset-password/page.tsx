import { AuthCard } from "@/features/auth/components/AuthCard";
import { ResetPasswordForm } from "@/features/auth/components/ResetPasswordForm";

export const metadata = {
  title: "Réinitialiser le mot de passe | Sociala Money",
};

export default function ResetPasswordPage() {
  return (
    <AuthCard
      title="Nouveau mot de passe"
      description="Choisissez un nouveau mot de passe sécurisé"
    >
      <ResetPasswordForm />
    </AuthCard>
  );
}
