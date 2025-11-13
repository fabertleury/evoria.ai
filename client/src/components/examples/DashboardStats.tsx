import DashboardStats from '../DashboardStats';

export default function DashboardStatsExample() {
  const mockStats = {
    totalVideos: 127,
    totalGuests: 245,
    creditsEarned: 385.50,
    totalViews: 1842,
  };

  return (
    <div className="p-8">
      <DashboardStats stats={mockStats} />
    </div>
  );
}
