import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Users, DollarSign, Eye } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
}

function StatCard({ title, value, icon, trend }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold" data-testid={`stat-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {value}
        </div>
        {trend && (
          <p className="text-xs text-muted-foreground mt-1">{trend}</p>
        )}
      </CardContent>
    </Card>
  );
}

interface DashboardStatsProps {
  stats: {
    totalVideos: number;
    totalGuests: number;
    creditsEarned: number;
    totalViews: number;
  };
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total de Vídeos"
        value={stats.totalVideos}
        icon={<Video className="h-4 w-4 text-muted-foreground" />}
        trend="+12 hoje"
      />
      <StatCard
        title="Convidados"
        value={stats.totalGuests}
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
        trend="+8 novos"
      />
      <StatCard
        title="Créditos Vendidos"
        value={`R$ ${stats.creditsEarned.toFixed(2)}`}
        icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        trend="+R$ 45 hoje"
      />
      <StatCard
        title="Visualizações"
        value={stats.totalViews}
        icon={<Eye className="h-4 w-4 text-muted-foreground" />}
        trend="No telão ao vivo"
      />
    </div>
  );
}
