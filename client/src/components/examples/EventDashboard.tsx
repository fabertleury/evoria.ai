import EventDashboard from '../EventDashboard';

export default function EventDashboardExample() {
  const mockStats = {
    totalVideos: 127,
    totalGuests: 245,
    creditsEarned: 385.50,
    totalViews: 1842,
  };

  return (
    <EventDashboard
      eventTitle="Casamento Ana & Pedro"
      eventLink="https://momentia.app/e/abc123"
      stats={mockStats}
    />
  );
}
