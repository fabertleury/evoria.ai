import EventDashboard from "@/components/EventDashboard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Video } from "lucide-react";
import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ModerationPanel from "@/components/ModerationPanel";
import eventCover from "@assets/generated_images/Event_cover_celebration_8822107b.png";

export default function EventDetail() {
  const [, setLocation] = useLocation();

  const mockStats = {
    totalVideos: 127,
    totalGuests: 245,
    creditsEarned: 385.50,
    totalViews: 1842,
  };

  const mockVideos = [
    {
      id: '1',
      guestName: 'João Silva',
      thumbnail: eventCover,
      uploadedAt: 'Há 2 minutos',
      flaggedByAI: false,
    },
    {
      id: '2',
      guestName: 'Maria Santos',
      thumbnail: eventCover,
      uploadedAt: 'Há 5 minutos',
      flaggedByAI: true,
    },
    {
      id: '3',
      guestName: 'Pedro Costa',
      thumbnail: eventCover,
      uploadedAt: 'Há 8 minutos',
      flaggedByAI: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation('/dashboard')}
            data-testid="button-back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Video className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Momentia</span>
          </div>
        </div>
      </header>

      <Tabs defaultValue="dashboard" className="container mx-auto px-4 py-6">
        <TabsList className="mb-6">
          <TabsTrigger value="dashboard" data-testid="tab-dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="moderation" data-testid="tab-moderation">Moderação</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <EventDashboard
            eventTitle="Casamento Ana & Pedro"
            eventLink="https://momentia.app/e/abc123xyz"
            stats={mockStats}
          />
        </TabsContent>

        <TabsContent value="moderation">
          <ModerationPanel
            videos={mockVideos}
            onApprove={(id) => console.log('Approved:', id)}
            onReject={(id) => console.log('Rejected:', id)}
            onSkip={(id) => console.log('Skipped:', id)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
