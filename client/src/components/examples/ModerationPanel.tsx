import ModerationPanel from '../ModerationPanel';
import coverImage from '@assets/generated_images/Event_cover_celebration_8822107b.png';

export default function ModerationPanelExample() {
  const mockVideos = [
    {
      id: '1',
      guestName: 'João Silva',
      thumbnail: coverImage,
      uploadedAt: 'Há 2 minutos',
      flaggedByAI: false,
    },
    {
      id: '2',
      guestName: 'Maria Santos',
      thumbnail: coverImage,
      uploadedAt: 'Há 5 minutos',
      flaggedByAI: true,
    },
    {
      id: '3',
      guestName: 'Pedro Costa',
      thumbnail: coverImage,
      uploadedAt: 'Há 8 minutos',
      flaggedByAI: false,
    },
  ];

  return (
    <ModerationPanel
      videos={mockVideos}
      onApprove={(id) => console.log('Approved:', id)}
      onReject={(id) => console.log('Rejected:', id)}
      onSkip={(id) => console.log('Skipped:', id)}
    />
  );
}
