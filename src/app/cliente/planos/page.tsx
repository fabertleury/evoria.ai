"use client"
import { useState } from 'react'
import { Check, Star, Zap, Shield, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function PlanosPage() {
    const router = useRouter()
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
    const [selectedModules, setSelectedModules] = useState<string[]>([])

    const plans = [
        {
            id: 'basic',
            name: 'Plano Básico',
            price: 29.90,
            features: ['Até 50 convidados', 'Galeria de fotos', 'QR Code exclusivo'],
            highlight: false
        },
        {
            id: 'premium',
            name: 'Plano Premium',
            price: 59.90,
            features: ['Convidados ilimitados', 'Moderação por IA', 'Download em alta resolução', 'Suporte prioritário'],
            highlight: true
        }
    ]

    const modules = [
        {
            id: 'screen',
            name: 'Telão ao Vivo',
            price: 29.90,
            icon: '📺',
            description: 'Exiba as fotos em tempo real no telão do evento.'
        },
        {
            id: 'feed',
            name: 'Feed Interativo',
            price: 24.90,
            icon: '💬',
            description: 'Permita que convidados comentem e curtam as fotos.'
        }
    ]

    const toggleModule = (moduleId: string) => {
        if (selectedModules.includes(moduleId)) {
            setSelectedModules(selectedModules.filter(id => id !== moduleId))
        } else {
            setSelectedModules([...selectedModules, moduleId])
        }
    }

    const calculateTotal = () => {
        let total = 0
        if (selectedPlan) {
            const plan = plans.find(p => p.id === selectedPlan)
            if (plan) total += plan.price
        }

        selectedModules.forEach(modId => {
            const mod = modules.find(m => m.id === modId)
            if (mod) total += mod.price
        })

        // Desconto combo (se selecionar os dois módulos)
        if (selectedModules.length === 2) {
            total -= 10 // Desconto de exemplo
        }

        return total
    }

    const handleCheckout = async () => {
        if (!selectedPlan) return

        try {
            // Recuperar usuário do localStorage (se houver)
            // const userProfile = JSON.parse(localStorage.getItem('evoria_user_profile') || '{}')

            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    planId: selectedPlan,
                    modules: selectedModules,
                    userId: 'user_123', // Idealmente pegar do contexto de autenticação
                }),
            })

            const data = await response.json()

            if (data.url) {
                // Salvar pedido pendente para referência
                const order = {
                    planId: selectedPlan,
                    planName: plans.find(p => p.id === selectedPlan)?.name,
                    modules: selectedModules,
                    total: calculateTotal()
                }
                localStorage.setItem('evoria_order', JSON.stringify(order))

                // Redirecionar para o Stripe
                window.location.href = data.url
            } else {
                alert('Erro ao iniciar pagamento. Tente novamente.')
            }
        } catch (error) {
            console.error('Erro no checkout:', error)
            alert('Erro ao conectar com o servidor de pagamento.')
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 py-12 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">Escolha o plano ideal para seu evento 🚀</h1>
                    <p className="text-slate-400 text-lg">Comece gratuitamente ou desbloqueie todo o potencial do Evoria.</p>
                </div>

                {/* Planos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            onClick={() => setSelectedPlan(plan.id)}
                            className={`relative rounded-2xl p-8 border-2 cursor-pointer transition-all duration-300 ${selectedPlan === plan.id
                                    ? 'bg-slate-900/80 border-purple-500 shadow-2xl shadow-purple-500/20 scale-[1.02]'
                                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                                }`}
                        >
                            {plan.highlight && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg">
                                    Mais Popular
                                </div>
                            )}

                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                                    <div className="flex items-baseline gap-1 mt-2">
                                        <span className="text-3xl font-bold text-purple-400">R$ {plan.price.toFixed(2)}</span>
                                        <span className="text-slate-500 text-sm">/evento</span>
                                    </div>
                                </div>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedPlan === plan.id
                                        ? 'border-purple-500 bg-purple-500 text-white'
                                        : 'border-slate-600'
                                    }`}>
                                    {selectedPlan === plan.id && <Check size={14} />}
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm">
                                        <Check size={16} className="text-green-400 mt-0.5 shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Módulos Extras */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">Turbine seu evento com módulos extras ✨</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {modules.map((mod) => (
                            <div
                                key={mod.id}
                                onClick={() => toggleModule(mod.id)}
                                className={`flex items-center gap-4 p-6 rounded-xl border-2 cursor-pointer transition-all ${selectedModules.includes(mod.id)
                                        ? 'bg-slate-900/80 border-purple-500/50 shadow-lg shadow-purple-500/10'
                                        : 'bg-slate-900/30 border-slate-800 hover:bg-slate-900/50'
                                    }`}
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${selectedModules.includes(mod.id) ? 'bg-purple-500/20' : 'bg-slate-800'
                                    }`}>
                                    {mod.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="font-bold text-white">{mod.name}</h3>
                                        <span className="text-purple-400 font-bold">R$ {mod.price.toFixed(2)}</span>
                                    </div>
                                    <p className="text-sm text-slate-400">{mod.description}</p>
                                </div>
                                <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${selectedModules.includes(mod.id)
                                        ? 'border-purple-500 bg-purple-500 text-white'
                                        : 'border-slate-600'
                                    }`}>
                                    {selectedModules.includes(mod.id) && <Check size={14} />}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Fixo Mobile / Bottom Bar */}
                <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 p-4 lg:static lg:bg-transparent lg:border-0 lg:p-0">
                    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="hidden md:block">
                            <p className="text-slate-400 text-sm">Total a pagar</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-white">R$ {calculateTotal().toFixed(2)}</span>
                                {selectedModules.length === 2 && (
                                    <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                                        Combo aplicado!
                                    </span>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={handleCheckout}
                            disabled={!selectedPlan}
                            className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2"
                        >
                            {selectedPlan ? 'Ir para Pagamento' : 'Selecione um Plano'}
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Espaçador para mobile */}
                <div className="h-24 lg:hidden" />
            </div>
        </div>
    )
}
