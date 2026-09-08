import { AuthCard } from "@/features/auth/components/AuthCard";
import { LoginForm } from "@/features/auth/components/LoginForm";

export const metadata = {
  title: "Connexion | Sociala Money",
};

export default function LoginPage() {
  return (
    <AuthCard
      title="Connexion"
      description="Accédez à votre compte Sociala Money"
    >
      <LoginForm />
    </AuthCard>
  );
}
