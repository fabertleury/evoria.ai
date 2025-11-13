import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import DashboardStats from "./DashboardStats";
import { QrCode, Share2, Video, Settings } from "lucide-react";
import { useState } from "react";

interface EventDashboardProps {
  eventTitle: string;
  eventLink: string;
  stats: {
    totalVideos: number;
    totalGuests: number;
    creditsEarned: number;
    totalViews: number;
  };
}

export default function EventDashboard({ eventTitle, eventLink, stats }: EventDashboardProps) {
  const [liveEnabled, setLiveEnabled] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold" data-testid="text-event-title">{eventTitle}</h1>
          <p className="text-muted-foreground">Painel de controle do evento</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" data-testid="button-qr-code">
            <QrCode className="h-4 w-4 mr-2" />
            Ver QR Code
          </Button>
          <Button variant="outline" data-testid="button-share">
            <Share2 className="h-4 w-4 mr-2" />
            Compartilhar
          </Button>
          <Button variant="outline" data-testid="button-settings">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <DashboardStats stats={stats} />

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Telão Ao Vivo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="live-toggle" className="font-medium">
                  Status do Telão
                </Label>
                <p className="text-sm text-muted-foreground">
                  {liveEnabled ? "Telão está ativo" : "Telão está pausado"}
                </p>
              </div>
              <Switch
                id="live-toggle"
                checked={liveEnabled}
                onCheckedChange={(checked) => {
                  setLiveEnabled(checked);
                  console.log('Live display toggled:', checked);
                }}
                data-testid="switch-live-display"
              />
            </div>
            <Button className="w-full" variant={liveEnabled ? "default" : "outline"} data-testid="button-open-live">
              <Video className="h-4 w-4 mr-2" />
              Abrir Telão em Tela Cheia
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Link do Evento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-muted rounded-lg font-mono text-sm break-all" data-testid="text-event-link">
              {eventLink}
            </div>
            <Button
              className="w-full"
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(eventLink);
                console.log('Link copied to clipboard');
              }}
              data-testid="button-copy-link"
            >
              Copiar Link
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
