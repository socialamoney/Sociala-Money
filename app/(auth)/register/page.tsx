import { AuthCard } from "@/features/auth/components/AuthCard";
import { RegisterForm } from "@/features/auth/components/RegisterForm";

export const metadata = {
  title: "Inscription | Sociala Money",
};

export default function RegisterPage() {
  return (
    <AuthCard
      title="Créer un compte"
      description="Rejoignez Sociala Money en quelques secondes"
    >
      <RegisterForm />
    </AuthCard>
  );
}
