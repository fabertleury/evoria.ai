import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Video, QrCode } from "lucide-react";

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  coverImage: string;
  videoCount: number;
  guestCount: number;
  isActive: boolean;
  onManage?: () => void;
}

export default function EventCard({
  title,
  date,
  coverImage,
  videoCount,
  guestCount,
  isActive,
  onManage,
}: EventCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate group" data-testid="card-event">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-semibold text-xl text-white mb-1" data-testid="text-event-title">
            {title}
          </h3>
          <div className="flex items-center gap-2 text-white/90 text-sm">
            <Calendar className="h-4 w-4" />
            <span data-testid="text-event-date">{date}</span>
          </div>
        </div>
        {isActive && (
          <Badge className="absolute top-4 right-4 bg-green-500" data-testid="badge-active">
            Ao Vivo
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            <span data-testid="text-video-count">{videoCount} vídeos</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span data-testid="text-guest-count">{guestCount} convidados</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => console.log('QR Code clicked')}
          data-testid="button-qr-code"
        >
          <QrCode className="h-4 w-4 mr-2" />
          QR Code
        </Button>
        <Button
          className="flex-1"
          onClick={() => {
            console.log('Manage clicked');
            onManage?.();
          }}
          data-testid="button-manage"
        >
          Gerenciar
        </Button>
      </CardFooter>
    </Card>
  );
}
