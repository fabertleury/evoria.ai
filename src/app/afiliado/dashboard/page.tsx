"use client"
import { useState, useEffect } from 'react'
import { DollarSign, Users, Copy, CheckCircle, TrendingUp, ArrowUpRight } from 'lucide-react'

export default function AfiliadoDashboard() {
    const [copied, setCopied] = useState(false)
    const [affiliateCode, setAffiliateCode] = useState('')

    // Mock Data
    const stats = {
        balance: 150.00,
        totalEarnings: 450.00,
        referrals: 12,
        conversionRate: '8.5%'
    }

    const recentReferrals = [
        { id: 1, user: 'Ana Silva', date: '19/11/2025', status: 'Convertido', commission: 15.00 },
        { id: 2, user: 'Carlos Oliveira', date: '18/11/2025', status: 'Pendente', commission: 0.00 },
        { id: 3, user: 'Mariana Santos', date: '15/11/2025', status: 'Convertido', commission: 15.00 },
        { id: 4, user: 'Pedro Costa', date: '12/11/2025', status: 'Convertido', commission: 15.00 },
    ]

    useEffect(() => {
        // Gerar ou recuperar código de afiliado
        const userProfile = JSON.parse(localStorage.getItem('evoria_user_profile') || '{}')
        const code = userProfile.username || 'USER123' // Fallback
        setAffiliateCode(code.toUpperCase())
    }, [])

    const affiliateLink = `https://evoria.ai/?ref=${affiliateCode}`

    const copyToClipboard = () => {
        navigator.clipboard.writeText(affiliateLink)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleWithdraw = () => {
        if (stats.balance < 100) {
            alert('O valor mínimo para saque é R$ 100,00')
            return
        }
        alert('Solicitação de saque enviada com sucesso! O pagamento será processado em até 2 dias úteis.')
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Painel do Parceiro 🚀</h1>
                <p className="text-slate-400">Acompanhe seus ganhos e indicações em tempo real.</p>
            </div>

            {/* Affiliate Link Card */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 p-6 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="relative z-10">
                    <h3 className="text-lg font-bold text-white mb-4">Seu Link Exclusivo</h3>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-300 font-mono text-sm flex items-center">
                            {affiliateLink}
                        </div>
                        <button
                            onClick={copyToClipboard}
                            className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${copied
                                    ? 'bg-green-500 text-white'
                                    : 'bg-white text-slate-900 hover:bg-slate-100'
                                }`}
                        >
                            {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
                            {copied ? 'Copiado!' : 'Copiar Link'}
                        </button>
                    </div>
                    <p className="text-slate-400 text-sm mt-3">
                        Compartilhe este link e ganhe <span className="text-green-400 font-bold">10% de comissão</span> em cada venda realizada.
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-green-500/10 rounded-xl text-green-400">
                            <DollarSign size={24} />
                        </div>
                        <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded-full">+12%</span>
                    </div>
                    <p className="text-slate-400 text-sm mb-1">Saldo Disponível</p>
                    <h3 className="text-3xl font-bold text-white">R$ {stats.balance.toFixed(2)}</h3>
                    <button
                        onClick={handleWithdraw}
                        className="mt-4 w-full py-2 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={stats.balance < 100}
                    >
                        {stats.balance >= 100 ? 'Solicitar Saque' : 'Mínimo R$ 100,00'}
                    </button>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                            <TrendingUp size={24} />
                        </div>
                    </div>
                    <p className="text-slate-400 text-sm mb-1">Total Ganho</p>
                    <h3 className="text-3xl font-bold text-white">R$ {stats.totalEarnings.toFixed(2)}</h3>
                    <p className="text-slate-500 text-xs mt-2">Desde o início</p>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
                            <Users size={24} />
                        </div>
                    </div>
                    <p className="text-slate-400 text-sm mb-1">Indicações Ativas</p>
                    <h3 className="text-3xl font-bold text-white">{stats.referrals}</h3>
                    <p className="text-slate-500 text-xs mt-2">Usuários cadastrados</p>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-orange-500/10 rounded-xl text-orange-400">
                            <ArrowUpRight size={24} />
                        </div>
                    </div>
                    <p className="text-slate-400 text-sm mb-1">Taxa de Conversão</p>
                    <h3 className="text-3xl font-bold text-white">{stats.conversionRate}</h3>
                    <p className="text-slate-500 text-xs mt-2">Cliques vs Vendas</p>
                </div>
            </div>

            {/* Recent Referrals Table */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                    <h3 className="font-bold text-white text-lg">Últimas Indicações</h3>
                    <button className="text-sm text-green-400 hover:text-green-300 font-medium">Ver todas</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-400">
                        <thead className="bg-slate-900/50 text-slate-200 uppercase text-xs font-bold">
                            <tr>
                                <th className="px-6 py-4">Usuário</th>
                                <th className="px-6 py-4">Data</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Comissão</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {recentReferrals.map((ref) => (
                                <tr key={ref.id} className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4 font-medium text-white">{ref.user}</td>
                                    <td className="px-6 py-4">{ref.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${ref.status === 'Convertido'
                                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                                : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                                            }`}>
                                            {ref.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-green-400">
                                        {ref.commission > 0 ? `+ R$ ${ref.commission.toFixed(2)}` : '-'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
