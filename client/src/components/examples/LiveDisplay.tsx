import LiveDisplay from '../LiveDisplay';
import coverImage from '@assets/generated_images/Event_cover_celebration_8822107b.png';

export default function LiveDisplayExample() {
  const mockVideos = [
    {
      id: '1',
      guestName: 'Ana Carolina',
      videoUrl: '#',
      thumbnail: coverImage,
    },
    {
      id: '2',
      guestName: 'Bruno Almeida',
      videoUrl: '#',
      thumbnail: coverImage,
    },
    {
      id: '3',
      guestName: 'Carla Mendes',
      videoUrl: '#',
      thumbnail: coverImage,
    },
  ];

  return <LiveDisplay videos={mockVideos} />;
}
