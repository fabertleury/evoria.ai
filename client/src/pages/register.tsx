import AuthForm from "@/components/AuthForm";
import { useLocation } from "wouter";

export default function Register() {
  const [, setLocation] = useLocation();

  const handleRegister = (email: string, password: string, name?: string) => {
    console.log('Register attempt:', { email, password, name });
    setLocation('/dashboard');
  };

  return <AuthForm mode="register" onSubmit={handleRegister} />;
}
