import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Video } from "lucide-react";

interface AuthFormProps {
  mode: "login" | "register";
  onSubmit?: (email: string, password: string, name?: string) => void;
}

export default function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${mode} triggered`, { email, password, name });
    onSubmit?.(email, password, name);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Video className="h-8 w-8 text-primary" />
            <span className="font-bold text-2xl">Momentia</span>
          </div>
          <div className="text-center">
            <CardTitle className="text-2xl">
              {mode === "login" ? "Bem-vindo de volta" : "Crie sua conta"}
            </CardTitle>
            <CardDescription>
              {mode === "login"
                ? "Entre para gerenciar seus eventos"
                : "Comece a criar eventos incríveis"}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="João Silva"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  data-testid="input-name"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="voce@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-testid="input-email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                data-testid="input-password"
              />
            </div>
            <Button type="submit" className="w-full" data-testid="button-submit">
              {mode === "login" ? "Entrar" : "Criar conta"}
            </Button>
            {mode === "login" && (
              <div className="text-center">
                <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Esqueceu sua senha?
                </a>
              </div>
            )}
            <div className="text-center text-sm text-muted-foreground">
              {mode === "login" ? (
                <>
                  Não tem uma conta?{" "}
                  <a href="/register" className="text-primary hover:underline" data-testid="link-register">
                    Registre-se
                  </a>
                </>
              ) : (
                <>
                  Já tem uma conta?{" "}
                  <a href="/login" className="text-primary hover:underline" data-testid="link-login">
                    Faça login
                  </a>
                </>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
