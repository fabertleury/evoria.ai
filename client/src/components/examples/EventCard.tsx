import EventCard from '../EventCard';
import coverImage from '@assets/generated_images/Event_cover_celebration_8822107b.png';

export default function EventCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <EventCard
        id="1"
        title="Festa de Aniversário Maria"
        date="15 de Dezembro, 2024"
        coverImage={coverImage}
        videoCount={45}
        guestCount={120}
        isActive={true}
        onManage={() => console.log('Manage event')}
      />
    </div>
  );
}
