import { AuthCard } from "@/features/auth/components/AuthCard";
import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";

export const metadata = {
  title: "Mot de passe oublié | Sociala Money",
};

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Mot de passe oublié"
      description="Entrez votre adresse e-mail pour recevoir un lien de réinitialisation"
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
}
