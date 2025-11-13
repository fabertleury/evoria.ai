import LiveDisplay from "@/components/LiveDisplay";
import eventCover from "@assets/generated_images/Event_cover_celebration_8822107b.png";

export default function Live() {
  const mockVideos = [
    {
      id: '1',
      guestName: 'Ana Carolina Silva',
      videoUrl: '#',
      thumbnail: eventCover,
    },
    {
      id: '2',
      guestName: 'Bruno Almeida Costa',
      videoUrl: '#',
      thumbnail: eventCover,
    },
    {
      id: '3',
      guestName: 'Carla Mendes Oliveira',
      videoUrl: '#',
      thumbnail: eventCover,
    },
    {
      id: '4',
      guestName: 'Daniel Santos',
      videoUrl: '#',
      thumbnail: eventCover,
    },
    {
      id: '5',
      guestName: 'Elena Rodrigues',
      videoUrl: '#',
      thumbnail: eventCover,
    },
  ];

  return <LiveDisplay videos={mockVideos} />;
}
