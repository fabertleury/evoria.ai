import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, SkipForward, AlertTriangle } from "lucide-react";

interface VideoToModerate {
  id: string;
  guestName: string;
  thumbnail: string;
  uploadedAt: string;
  flaggedByAI?: boolean;
}

interface ModerationPanelProps {
  videos: VideoToModerate[];
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onSkip?: (id: string) => void;
}

export default function ModerationPanel({
  videos,
  onApprove,
  onReject,
  onSkip,
}: ModerationPanelProps) {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Moderação de Vídeos</h2>
          <p className="text-muted-foreground">{videos.length} vídeos aguardando aprovação</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <Card key={video.id} className="overflow-hidden" data-testid={`card-video-${video.id}`}>
            <div className="relative aspect-video bg-muted">
              <img
                src={video.thumbnail}
                alt={`Vídeo de ${video.guestName}`}
                className="w-full h-full object-cover"
              />
              {video.flaggedByAI && (
                <Badge
                  variant="destructive"
                  className="absolute top-2 right-2 flex items-center gap-1"
                  data-testid="badge-flagged"
                >
                  <AlertTriangle className="h-3 w-3" />
                  Sinalizado pela IA
                </Badge>
              )}
            </div>
            <CardContent className="p-4 space-y-4">
              <div>
                <p className="font-semibold" data-testid="text-guest-name">{video.guestName}</p>
                <p className="text-sm text-muted-foreground">{video.uploadedAt}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-green-600 hover:bg-green-50"
                  onClick={() => {
                    console.log('Approved video:', video.id);
                    onApprove?.(video.id);
                  }}
                  data-testid="button-approve"
                >
                  <Check className="h-4 w-4 mr-1" />
                  Aprovar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-red-600 hover:bg-red-50"
                  onClick={() => {
                    console.log('Rejected video:', video.id);
                    onReject?.(video.id);
                  }}
                  data-testid="button-reject"
                >
                  <X className="h-4 w-4 mr-1" />
                  Rejeitar
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    console.log('Skipped video:', video.id);
                    onSkip?.(video.id);
                  }}
                  data-testid="button-skip"
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
