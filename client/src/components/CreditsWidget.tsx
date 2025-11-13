import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CreditsWidgetProps {
  currentCredits: number;
  onBuyCredits?: () => void;
  onSkipQueue?: () => void;
}

export default function CreditsWidget({
  currentCredits,
  onBuyCredits,
  onSkipQueue,
}: CreditsWidgetProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Seus Créditos</CardTitle>
              <CardDescription>Use para aparecer no telão</CardDescription>
            </div>
            <Badge className="text-2xl px-4 py-2 rounded-full" data-testid="badge-credits">
              {currentCredits}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-4 bg-muted rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Pacote de 5 créditos</span>
              <span className="font-bold">R$ 5,00</span>
            </div>
            <p className="text-xs text-muted-foreground">
              1 crédito = 1 vídeo no telão (30 segundos)
            </p>
            <Button
              className="w-full mt-2"
              onClick={() => {
                console.log('Buy credits clicked');
                onBuyCredits?.();
              }}
              data-testid="button-buy-credits"
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Comprar Créditos
            </Button>
          </div>

          <div className="p-4 bg-primary/10 rounded-lg space-y-2 border-2 border-primary">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Furar Fila</span>
              <span className="font-bold text-primary">R$ 2,00</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Apareça imediatamente no telão ao vivo
            </p>
            <Button
              variant="default"
              className="w-full mt-2"
              onClick={() => {
                console.log('Skip queue clicked');
                onSkipQueue?.();
              }}
              data-testid="button-skip-queue"
            >
              <Zap className="h-4 w-4 mr-2" />
              Furar Fila Agora
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
