import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QrCode, Video, Shield, Zap, Users, TrendingUp } from "lucide-react";
import heroImage from "@assets/generated_images/Hero_smartphone_mockup_96f43f38.png";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Video className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Momentia</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#recursos" className="text-sm font-medium hover:text-primary transition-colors" data-testid="link-features">
              Recursos
            </a>
            <a href="#como-funciona" className="text-sm font-medium hover:text-primary transition-colors" data-testid="link-how-it-works">
              Como Funciona
            </a>
            <a href="#precos" className="text-sm font-medium hover:text-primary transition-colors" data-testid="link-pricing">
              Preços
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" data-testid="button-login">Entrar</Button>
            </Link>
            <Link href="/register">
              <Button data-testid="button-register">Começar Grátis</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="min-h-[700px] flex items-center py-24 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight" data-testid="text-hero-title">
                  Capture momentos do seu evento
                </h1>
                <p className="text-xl text-muted-foreground" data-testid="text-hero-subtitle">
                  Gere um QR Code e permita que seus convidados enviem vídeos curtos. Exiba tudo em um telão ao vivo incrível.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/register">
                  <Button size="lg" className="h-12 px-8" data-testid="button-cta-primary">
                    Criar Meu Evento
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="h-12 px-8" data-testid="button-cta-demo">
                  Ver Demo
                </Button>
              </div>
            </div>
            <div className="relative">
              <img src={heroImage} alt="Mockup do app Momentia" className="w-full max-w-md mx-auto" data-testid="img-hero" />
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" data-testid="text-how-it-works-title">Como Funciona</h2>
            <p className="text-muted-foreground text-lg" data-testid="text-how-it-works-subtitle">
              Em 3 passos simples, transforme seu evento
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: QrCode,
                title: "1. Crie seu evento",
                description: "Configure seu evento e gere um QR Code único para seus convidados",
              },
              {
                icon: Video,
                title: "2. Convidados enviam vídeos",
                description: "Eles escaneiam o QR Code e enviam vídeos curtos direto do celular",
              },
              {
                icon: Zap,
                title: "3. Exiba ao vivo",
                description: "Mostre os vídeos em tempo real no telão do seu evento",
              },
            ].map((step, idx) => (
              <Card key={idx} className="text-center p-6" data-testid={`card-step-${idx}`}>
                <CardContent className="space-y-4 pt-6">
                  <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="recursos" className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" data-testid="text-features-title">Recursos Poderosos</h2>
            <p className="text-muted-foreground text-lg">Tudo que você precisa para um evento inesquecível</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Moderação Inteligente", description: "IA detecta conteúdo inadequado automaticamente" },
              { icon: Zap, title: "Telão em Tempo Real", description: "Exibição instantânea dos vídeos aprovados" },
              { icon: Users, title: "Sistema de Créditos", description: "Convidados podem comprar destaque no telão" },
              { icon: TrendingUp, title: "Analytics Completo", description: "Estatísticas em tempo real do seu evento" },
              { icon: QrCode, title: "QR Code Único", description: "Link exclusivo para cada evento" },
              { icon: Video, title: "Upload Simples", description: "Envio fácil direto do smartphone" },
            ].map((feature, idx) => (
              <Card key={idx} className="p-6 hover-elevate" data-testid={`card-feature-${idx}`}>
                <CardContent className="space-y-3 p-0">
                  <feature.icon className="h-10 w-10 text-primary" />
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="precos" className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" data-testid="text-pricing-title">Preços Simples</h2>
            <p className="text-muted-foreground text-lg">Sistema de créditos para convidados</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-8">
              <CardContent className="space-y-6 p-0">
                <div>
                  <h3 className="font-bold text-2xl mb-2">Pacote de Créditos</h3>
                  <p className="text-4xl font-bold text-primary">R$ 5,00</p>
                  <p className="text-muted-foreground">= 5 créditos</p>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    1 crédito = 1 vídeo no telão
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Tempo de exibição: 30 segundos
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Fila gerenciada automaticamente
                  </li>
                </ul>
                <Button className="w-full" data-testid="button-buy-credits">Comprar Créditos</Button>
              </CardContent>
            </Card>
            <Card className="p-8 border-primary border-2">
              <CardContent className="space-y-6 p-0">
                <div>
                  <h3 className="font-bold text-2xl mb-2">Furar Fila</h3>
                  <p className="text-4xl font-bold text-primary">R$ 2,00</p>
                  <p className="text-muted-foreground">por skip</p>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Apareça imediatamente no telão
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Prioridade máxima na fila
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Ótimo para momentos especiais
                  </li>
                </ul>
                <Button className="w-full" data-testid="button-skip-queue">Furar Fila Agora</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-5xl font-bold mb-6">Pronto para começar?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Crie seu primeiro evento em menos de 1 minuto
          </p>
          <Link href="/register">
            <Button size="lg" className="h-12 px-12" data-testid="button-final-cta">
              Criar Meu Evento Agora
            </Button>
          </Link>
        </div>
      </section>

      <footer className="border-t py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Video className="h-5 w-5 text-primary" />
                <span className="font-bold">Momentia</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Transforme momentos em memórias inesquecíveis
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Produto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#recursos" className="hover:text-foreground transition-colors">Recursos</a></li>
                <li><a href="#precos" className="hover:text-foreground transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Termos</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2024 Momentia. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
