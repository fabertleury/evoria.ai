import AuthForm from "@/components/AuthForm";
import { useLocation } from "wouter";

export default function Login() {
  const [, setLocation] = useLocation();

  const handleLogin = (email: string, password: string) => {
    console.log('Login attempt:', { email, password });
    setLocation('/dashboard');
  };

  return <AuthForm mode="login" onSubmit={handleLogin} />;
}
