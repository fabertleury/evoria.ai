import { useState } from "react";
import EventCard from "@/components/EventCard";
import CreateEventDialog from "@/components/CreateEventDialog";
import { Button } from "@/components/ui/button";
import { Video, LogOut } from "lucide-react";
import { useLocation } from "wouter";
import eventCover1 from "@assets/generated_images/Event_cover_celebration_8822107b.png";
import eventCover2 from "@assets/generated_images/Conference_event_cover_f9cad781.png";
import eventCover3 from "@assets/generated_images/Wedding_event_cover_192ce108.png";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  
  const mockEvents = [
    {
      id: "1",
      title: "Festa de Aniversário Maria",
      date: "15 de Dezembro, 2024",
      coverImage: eventCover1,
      videoCount: 45,
      guestCount: 120,
      isActive: true,
    },
    {
      id: "2",
      title: "Conferência Tech 2024",
      date: "20 de Dezembro, 2024",
      coverImage: eventCover2,
      videoCount: 89,
      guestCount: 340,
      isActive: false,
    },
    {
      id: "3",
      title: "Casamento Ana & Pedro",
      date: "28 de Dezembro, 2024",
      coverImage: eventCover3,
      videoCount: 127,
      guestCount: 245,
      isActive: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Video className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Momentia</span>
          </div>
          <Button variant="ghost" onClick={() => setLocation('/')} data-testid="button-logout">
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Meus Eventos</h1>
            <p className="text-muted-foreground">Gerencie todos os seus eventos em um só lugar</p>
          </div>
          <CreateEventDialog
            onCreateEvent={(title, date, cover) => {
              console.log('New event created:', { title, date, coverName: cover?.name });
            }}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockEvents.map((event) => (
            <EventCard
              key={event.id}
              {...event}
              onManage={() => {
                console.log('Manage event:', event.id);
                setLocation(`/event/${event.id}`);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
