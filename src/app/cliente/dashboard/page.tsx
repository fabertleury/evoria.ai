"use client"
import { useEffect, useState } from 'react'
import { Plus, Calendar, BarChart3, ArrowRight, Clock, Package, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function ClienteDashboard() {
    const [pendingOrder, setPendingOrder] = useState<any>(null)
    const [userProfile, setUserProfile] = useState<any>(null)
    const [activePlan, setActivePlan] = useState<any>(null)

    useEffect(() => {
        // Recuperar perfil do usuário
        const profileStr = localStorage.getItem('evoria_user_profile')
        if (profileStr) {
            try {
                setUserProfile(JSON.parse(profileStr))
            } catch (e) {
                console.error('Erro ao ler perfil', e)
            }
        }

        // Verificar se há pedido pendente
        const orderStr = localStorage.getItem('evoria_order')
        if (orderStr) {
            try {
                const order = JSON.parse(orderStr)
                setPendingOrder(order)
            } catch (e) {
                console.error('Erro ao ler pedido pendente', e)
            }
        }

        // Simular plano ativo (vazio por enquanto)
        // setActivePlan({ name: 'Plano Básico', modules: ['Telão'] })
    }, [])

    const userName = userProfile?.fullName?.split(' ')[0] || 'Cliente'

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Olá, {userName}! 👋
                    </h1>
                    <p className="text-slate-400">
                        {userProfile?.eventType
                            ? `Preparando tudo para o seu ${userProfile.eventType === 'birthday' ? 'aniversário' : 'evento'}!`
                            : 'Bem-vindo ao seu painel de controle.'}
                    </p>
                </div>

                <Link
                    href={activePlan ? "/cliente/novo-evento" : "/cliente/planos"}
                    className="flex items-center justify-center gap-2 bg-white text-slate-900 hover:bg-slate-100 px-6 py-3 rounded-xl font-bold transition-all shadow-lg"
                >
                    <Plus size={20} />
                    Criar Novo Evento
                </Link>
            </div>

            {/* Plan Status Card */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Card de Plano */}
                <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <Package className="text-purple-400" size={20} />
                                Seu Plano Atual
                            </h3>
                            <p className="text-slate-400 text-sm mt-1">Gerencie sua assinatura e recursos</p>
                        </div>
                        {activePlan ? (
                            <span className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-xs font-bold uppercase tracking-wider">
                                Ativo
                            </span>
                        ) : (
                            <span className="px-3 py-1 bg-slate-800 text-slate-400 border border-slate-700 rounded-full text-xs font-bold uppercase tracking-wider">
                                Nenhum Plano
                            </span>
                        )}
                    </div>

                    {activePlan ? (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                                <div>
                                    <h4 className="font-bold text-white">{activePlan.name}</h4>
                                    <p className="text-sm text-slate-500">Renova em 15/12/2025</p>
                                </div>
                                <button className="text-sm text-purple-400 hover:text-purple-300 font-medium">
                                    Gerenciar
                                </button>
                            </div>

                            <div className="flex gap-2 flex-wrap">
                                {activePlan.modules?.map((mod: string) => (
                                    <span key={mod} className="px-3 py-1.5 bg-purple-500/10 text-purple-300 rounded-lg text-xs font-medium border border-purple-500/20 flex items-center gap-1">
                                        <CheckCircle size={12} /> {mod}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-4">
                            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                <AlertCircle className="text-slate-500" size={32} />
                            </div>
                            <h4 className="text-white font-bold mb-2">Você não tem um plano ativo</h4>
                            <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
                                Para criar eventos e usar os recursos exclusivos como Telão e Feed, você precisa contratar um plano.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Link href="/cliente/planos" className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-colors">
                                    Ver Planos
                                </Link>
                                <Link href="/cliente/planos" className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors">
                                    Conhecer Módulos
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Card de Módulos Adicionais */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Módulos Extras</h3>
                    <div className="space-y-3">
                        <div className="p-3 rounded-xl bg-slate-800/30 border border-slate-800 flex items-center justify-between group hover:border-purple-500/30 transition-all">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                                    📺
                                </div>
                                <div>
                                    <p className="font-bold text-white text-sm">Telão ao Vivo</p>
                                    <p className="text-xs text-slate-500">R$ 29,90/evento</p>
                                </div>
                            </div>
                            <button className="p-2 bg-slate-800 hover:bg-purple-600 text-slate-400 hover:text-white rounded-lg transition-colors">
                                <Plus size={16} />
                            </button>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-800/30 border border-slate-800 flex items-center justify-between group hover:border-pink-500/30 transition-all">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400">
                                    💬
                                </div>
                                <div>
                                    <p className="font-bold text-white text-sm">Feed Interativo</p>
                                    <p className="text-xs text-slate-500">R$ 24,90/evento</p>
                                </div>
                            </div>
                            <button className="p-2 bg-slate-800 hover:bg-pink-600 text-slate-400 hover:text-white rounded-lg transition-colors">
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pending Order Alert (Mantido) */}
            {pendingOrder && !activePlan && (
                <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-2xl p-6 relative overflow-hidden animate-in fade-in slide-in-from-bottom-4">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 text-purple-400 font-semibold mb-2">
                                <Clock size={18} />
                                <span>Pedido Pendente</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                Finalize a contratação do {pendingOrder.planName}
                            </h3>
                            <p className="text-slate-300 max-w-xl text-sm">
                                Você iniciou a contratação mas ainda não finalizou o pagamento.
                                Garanta o preço promocional de <strong>R$ {pendingOrder.total.toFixed(2)}</strong>.
                            </p>
                        </div>

                        <button
                            onClick={() => alert('Integração de pagamento será implementada aqui!')}
                            className="whitespace-nowrap px-6 py-3 bg-white text-purple-900 font-bold rounded-xl hover:bg-purple-50 transition-colors shadow-lg"
                        >
                            Pagar Agora
                        </button>
                    </div>
                </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                            <Calendar size={24} />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">Total de Eventos</p>
                            <h3 className="text-2xl font-bold text-white">0</h3>
                        </div>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full w-0" />
                    </div>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
                            <BarChart3 size={24} />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">Interações Totais</p>
                            <h3 className="text-2xl font-bold text-white">0</h3>
                        </div>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full w-0" />
                    </div>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                            <Clock size={24} />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">Próximo Evento</p>
                            <h3 className="text-lg font-bold text-white">Nenhum agendado</h3>
                        </div>
                    </div>
                    <Link
                        href={activePlan ? "/cliente/novo-evento" : "/cliente/planos"}
                        className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
                    >
                        Agendar agora <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </div>
    )
}
