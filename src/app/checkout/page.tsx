"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Package, Tv, MessageSquare, Check, ArrowRight } from 'lucide-react'

export default function CheckoutPage() {
    const router = useRouter()
    const [selectedPlan, setSelectedPlan] = useState<any>(null)
    const [selectedModules, setSelectedModules] = useState<string[]>([])
    const [plans, setPlans] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    // Preços dos módulos (em reais)
    const modulesPricing = {
        telao: 29.90,
        feed: 24.90,
        combo: 44.90 // desconto quando compra os dois
    }

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch('/api/pricing')
                const data = await res.json()
                setPlans(data.plans || [])
                if (data.plans && data.plans.length > 0) {
                    setSelectedPlan(data.plans[0]) // Seleciona o primeiro plano por padrão
                }
            } catch (error) {
                console.error('Erro ao carregar planos:', error)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    const toggleModule = (module: string) => {
        setSelectedModules(prev => {
            if (prev.includes(module)) {
                return prev.filter(m => m !== module)
            } else {
                return [...prev, module]
            }
        })
    }

    const calculateTotal = () => {
        if (!selectedPlan) return 0

        let total = parseFloat(selectedPlan.price || 0)

        // Se selecionou ambos os módulos, aplica preço combo
        if (selectedModules.includes('telao') && selectedModules.includes('feed')) {
            total += modulesPricing.combo
        } else {
            // Senão, soma individualmente
            if (selectedModules.includes('telao')) total += modulesPricing.telao
            if (selectedModules.includes('feed')) total += modulesPricing.feed
        }

        return total
    }

    const getDiscount = () => {
        if (selectedModules.includes('telao') && selectedModules.includes('feed')) {
            const individual = modulesPricing.telao + modulesPricing.feed
                < div className = "animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4" ></div>
                    <p className="text-slate-400">Carregando...</p>
                </div >
            </div >
        )
}

return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4">
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Monte seu Pacote Personalizado
                </h1>
                <p className="text-slate-400 text-lg">
                    Escolha seu plano e adicione os módulos que precisa
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Coluna Esquerda: Seleção */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Planos */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <Package className="h-6 w-6 text-purple-400" />
                            1. Escolha seu Plano
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {plans.map((plan, idx) => (
                                <button
                                    key={plan.key || idx}
                                    onClick={() => setSelectedPlan(plan)}
                                    className={`text-left p-6 rounded-xl border-2 transition-all ${selectedPlan?.key === plan.key
                                        ? 'border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20'
                                        : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                                            <p className="text-3xl font-bold text-purple-400">
                                                R$ {parseFloat(plan.price).toFixed(2)}
                                            </p>
                                        </div>
                                        {selectedPlan?.key === plan.key && (
                                            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                                                <Check className="h-5 w-5 text-white" />
                                            </div>
                                        )}
                                    </div>
                                    {plan.features && plan.features.length > 0 && (
                                        <ul className="space-y-1 text-sm">
                                            {plan.features.slice(0, 3).map((feature: string, i: number) => (
                                                <li key={i} className="text-slate-400 flex items-center gap-2">
                                                    <span className="text-green-400">✓</span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Módulos Adicionais */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <Tv className="h-6 w-6 text-pink-400" />
                            2. Adicione Módulos (Opcional)
                        </h2>
                        <div className="space-y-3">
                            {/* Telão */}
                            <button
                                onClick={() => toggleModule('telao')}
                                className={`w-full text-left p-6 rounded-xl border-2 transition-all ${selectedModules.includes('telao')
                                    ? 'border-purple-500 bg-purple-500/10'
                                    : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                                    }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-3xl">📺</span>
                                            <div>
                                                <h3 className="text-lg font-bold text-white">Telão ao Vivo</h3>
                                                <p className="text-sm text-slate-400">Exibição em tempo real na TV</p>
                                            </div>
                                        </div>
                                        <p className="text-2xl font-bold text-purple-400">
                                            +R$ {modulesPricing.telao.toFixed(2)}
                                        </p>
                                    </div>
                                    {selectedModules.includes('telao') && (
                                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Check className="h-5 w-5 text-white" />
                                        </div>
                                    )}
                                </div>
                            </button>

                            {/* Feed */}
                            <button
                                onClick={() => toggleModule('feed')}
                                className={`w-full text-left p-6 rounded-xl border-2 transition-all ${selectedModules.includes('feed')
                                    ? 'border-pink-500 bg-pink-500/10'
                                    : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                                    }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-3xl">📱</span>
                                            <div>
                                                <h3 className="text-lg font-bold text-white">Feed Interativo</h3>
                                                <p className="text-sm text-slate-400">Curtidas, comentários e ranking</p>
                                            </div>
                                        </div>
                                        <p className="text-2xl font-bold text-pink-400">
                                            +R$ {modulesPricing.feed.toFixed(2)}
                                        </p>
                                    </div>
                                    {selectedModules.includes('feed') && (
                                        <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Check className="h-5 w-5 text-white" />
                                        </div>
                                    )}
                                </div>
                            </button>

                            {/* Badge de Desconto se Combo */}
                            {selectedModules.includes('telao') && selectedModules.includes('feed') && (
                                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                                    <p className="text-green-400 font-bold text-center">
                                        🎉 Desconto Combo Ativo! Economize R$ {getDiscount().toFixed(2)}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Coluna Direita: Resumo */}
                <div className="lg:col-span-1">
                    <div className="sticky top-6 bg-slate-900/50 backdrop-blur-xl border-2 border-slate-800 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-white mb-6">Resumo do Pedido</h3>

                        <div className="space-y-4 mb-6">
                            {/* Plano */}
                            {selectedPlan && (
                                <div className="pb-4 border-b border-slate-800">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="text-sm text-slate-400">Plano</p>
                                            <p className="text-white font-semibold">{selectedPlan.name}</p>
                                        </div>
                                        <p className="text-white font-bold">R$ {parseFloat(selectedPlan.price).toFixed(2)}</p>
                                    </div>
                                </div>
                            )}

                            {/* Módulos */}
                            {selectedModules.length > 0 && (
                                <div className="pb-4 border-b border-slate-800 space-y-2">
                                    <p className="text-sm text-slate-400 mb-2">Módulos Adicionais</p>
                                    {selectedModules.includes('telao') && selectedModules.includes('feed') ? (
                                        <div className="flex justify-between">
                                            <p className="text-white">Combo (Telão + Feed)</p>
                                            <p className="text-white font-bold">R$ {modulesPricing.combo.toFixed(2)}</p>
                                        </div>
                                    ) : (
                                        <>
                                            {selectedModules.includes('telao') && (
                                                <div className="flex justify-between">
                                                    <p className="text-white">Telão ao Vivo</p>
                                                    <p className="text-white font-bold">R$ {modulesPricing.telao.toFixed(2)}</p>
                                                </div>
                                            )}
                                            {selectedModules.includes('feed') && (
                                                <div className="flex justify-between">
                                                    <p className="text-white">Feed Interativo</p>
                                                    <p className="text-white font-bold">R$ {modulesPricing.feed.toFixed(2)}</p>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            )}

                            {/* Total */}
                            <div className="pt-2">
                                <div className="flex justify-between items-center">
                                    <p className="text-lg font-bold text-white">Total</p>
                                    <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                        R$ {calculateTotal().toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Botão de Checkout */}
                        <button
                            onClick={handleCheckout}
                            disabled={!selectedPlan}
                            className="w-full py-4 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl 
                         hover:from-purple-600 hover:to-pink-600 transition-all duration-200 
                         disabled:opacity-50 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                        >
                            Finalizar Compra
                            <ArrowRight className="h-5 w-5" />
                        </button>

                        <p className="text-xs text-slate-500 text-center mt-4">
                            Pagamento seguro via PIX ou Cartão
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}
