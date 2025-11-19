"use client"
import { useEffect, useState } from 'react'
import { apiFetch } from '@/lib/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Users,
  Calendar,
  DollarSign,
  Image,
  TrendingUp,
  Activity,
  Zap,
  Eye
} from 'lucide-react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts'

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState<any>({ users: 0, events: 0, guests: 0, media: 0, pendingMedia: 0, transactions: 0 })
  const [revenue, setRevenue] = useState<number>(0)
  const [recentEvents, setRecentEvents] = useState<any[]>([])
  const [recentTx, setRecentTx] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await apiFetch('/admin/metrics')
        const d = await res.json()
        setCounts(d.counts || {})
        setRevenue(d.revenue || 0)
        setRecentEvents(d.recentEvents || [])
        setRecentTx(d.recentTransactions || [])
      } catch (error) {
        console.error('Erro ao carregar métricas:', error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const trendData = [
    { time: '00:00', usuarios: 120, receita: 1200, eventos: 15 },
    { time: '04:00', usuarios: 145, receita: 1850, eventos: 18 },
    { time: '08:00', usuarios: 189, receita: 2340, eventos: 22 },
    { time: '12:00', usuarios: 234, receita: 3100, eventos: 28 },
    { time: '16:00', usuarios: 276, receita: 3890, eventos: 31 },
    { time: '20:00', usuarios: 298, receita: 4200, eventos: 35 },
    { time: '23:59', usuarios: counts.users, receita: revenue, eventos: counts.events }
  ]

  const COLORS = {
    primary: '#8B5CF6', secondary: '#EC4899', accent: '#06B6D4',
    success: '#10B981', warning: '#F59E0B', danger: '#EF4444'
  }

  const CircularProgress = ({ percentage, color, size = 100 }: any) => {
    const data = [{ value: percentage }, { value: 100 - percentage }]
    return (
      <ResponsiveContainer width={size} height={size}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={size * 0.32} outerRadius={size * 0.45}
            startAngle={90} endAngle={-270} dataKey="value">
            <Cell fill={color} />
            <Cell fill="rgba(255,255,255,0.05)" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500 mb-4"></div>
          <p className="text-slate-400 text-lg">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  const userPercentage = Math.min((counts.users / 1000) * 100, 100)
  const eventPercentage = Math.min((counts.events / 100) * 100, 100)
  const mediaPercentage = Math.min((counts.media / 500) * 100, 100)
  const revenuePercentage = Math.min((revenue / 10000) * 100, 100)

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Dashboard / Analytics
          </h1>
          <p className="text-slate-500 mt-1">Sistema Evoria.ai - Painel de Controle</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700">
          <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-slate-300">Sistema Online</span>
        </div>
      </div>

      {/* Layout Principal: 2 Colunas */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Coluna Esquerda: KPIs */}
        <div className="xl:col-span-1 space-y-4">
          {/* Total de Usuários */}
          <Card className="border-slate-800 bg-gradient-to-br from-slate-900/90 to-slate-800/50 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Total de Usuários</p>
                  <p className="text-4xl font-bold text-white mb-1">{counts.users}</p>
                  <p className="text-xs text-purple-400">Meta: 1000</p>
                </div>
                <div className="relative">
                  <CircularProgress percentage={userPercentage} color={COLORS.primary} size={90} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-purple-400">{userPercentage.toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Eventos Ativos */}
          <Card className="border-slate-800 bg-gradient-to-br from-slate-900/90 to-slate-800/50 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Eventos Ativos</p>
                  <p className="text-4xl font-bold text-white mb-1">{counts.events}</p>
                  <p className="text-xs text-pink-400">Meta: 100</p>
                </div>
                <div className="relative">
                  <CircularProgress percentage={eventPercentage} color={COLORS.secondary} size={90} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-pink-400">{eventPercentage.toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mídias */}
          <Card className="border-slate-800 bg-gradient-to-br from-slate-900/90 to-slate-800/50 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Mídias</p>
                  <p className="text-4xl font-bold text-white mb-1">{counts.media}</p>
                  <p className="text-xs text-cyan-400">Meta: 500</p>
                </div>
                <div className="relative">
                  <CircularProgress percentage={mediaPercentage} color={COLORS.accent} size={90} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-cyan-400">{mediaPercentage.toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Receita Total */}
          <Card className="border-slate-800 bg-gradient-to-br from-slate-900/90 to-slate-800/50 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Receita Total</p>
                  <p className="text-4xl font-bold text-white mb-1">R$ {revenue.toFixed(0)}</p>
                  <p className="text-xs text-green-400">Meta: R$ 10k</p>
                </div>
                <div className="relative">
                  <CircularProgress percentage={revenuePercentage} color={COLORS.success} size={90} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-green-400">{revenuePercentage.toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coluna Direita: Gráficos e Métricas */}
        <div className="xl:col-span-2 space-y-6">

          {/* Gráficos de Tendência */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Crescimento de Usuários */}
            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
              <CardHeader className="border-b border-slate-800 pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-400" />
                    <span className="text-white">Crescimento de Usuários (24h)</span>
                  </CardTitle>
                  <div className="flex items-center gap-1 text-xs text-green-400">
                    <TrendingUp className="h-3 w-3" />
                    +12.5%
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <ResponsiveContainer width="100%" height={180}>
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="time" stroke="#64748b" style={{ fontSize: 11 }} />
                    <YAxis stroke="#64748b" style={{ fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: 8 }}
                      labelStyle={{ color: '#cbd5e1' }}
                    />
                    <Area type="monotone" dataKey="usuarios" stroke={COLORS.primary} strokeWidth={2} fillOpacity={1} fill="url(#colorUsers)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Tendência de Receita */}
            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
              <CardHeader className="border-b border-slate-800 pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-400" />
                    <span className="text-white">Tendência de Receita (24h)</span>
                  </CardTitle>
                  <div className="flex items-center gap-1 text-xs text-green-400">
                    <TrendingUp className="h-3 w-3" />
                    +18.3%
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <ResponsiveContainer width="100%" height={180}>
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS.success} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={COLORS.success} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="time" stroke="#64748b" style={{ fontSize: 11 }} />
                    <YAxis stroke="#64748b" style={{ fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: 8 }}
                      labelStyle={{ color: '#cbd5e1' }}
                    />
                    <Area type="monotone" dataKey="receita" stroke={COLORS.success} strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Métricas Rápidas em Grid Horizontal */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 bg-cyan-500/10 rounded-lg">
                    <Users className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Convidados</p>
                    <p className="text-2xl font-bold text-white">{counts.guests}</p>
                  </div>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all duration-500"
                    style={{ width: `${Math.min((counts.guests / counts.users) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Proporção: {counts.users > 0 ? (counts.guests / counts.users).toFixed(1) : 0}x por usuário
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 bg-green-500/10 rounded-lg">
                    <Activity className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Transações</p>
                    <p className="text-2xl font-bold text-white">{counts.transactions}</p>
                  </div>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-500"
                    style={{ width: `${Math.min((counts.transactions / 100) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 mt-2">Meta: 100 transações</p>
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 bg-amber-500/10 rounded-lg">
                    <Image className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Mídias Pendentes</p>
                    <p className="text-2xl font-bold text-white">{counts.pendingMedia}</p>
                  </div>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-500"
                    style={{ width: `${Math.min((counts.pendingMedia / counts.media) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  {counts.media > 0 ? ((counts.pendingMedia / counts.media) * 100).toFixed(1) : 0}% do total
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Atividades Recentes */}
          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
            <CardHeader className="border-b border-slate-800">
              <CardTitle className="text-base flex items-center gap-2">
                <Eye className="h-5 w-5 text-cyan-400" />
                <span className="text-white">Atividades Recentes</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {recentEvents.slice(0, 3).map((event, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors">
                    <Calendar className="h-4 w-4 text-purple-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{event.name}</p>
                      <p className="text-xs text-slate-400">{new Date(event.date).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                ))}
                {recentTx.slice(0, 3).map((tx, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors">
                    <DollarSign className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{tx.currency} {parseFloat(tx.amount).toFixed(2)}</p>
                      <p className="text-xs text-slate-400">
                        Status: <span className="capitalize">{tx.status === 'confirmed' ? 'Confirmada' : tx.status === 'pending' ? 'Pendente' : 'Reembolsada'}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-500">
        <p>Última atualização: {new Date().toLocaleString('pt-BR')}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-3 py-1.5 bg-purple-500/10 text-purple-400 rounded-lg hover:bg-purple-500/20 transition-colors font-medium"
        >
          Atualizar Dados
        </button>
      </div>
    </div>
  )
}
