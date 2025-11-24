"use client"

import { useState } from 'react'

interface PricingCardProps {
    plan: any
    index: number
    whatsappNumber: string
}

export default function PricingCard({ plan, index, whatsappNumber }: PricingCardProps) {
    const [expanded, setExpanded] = useState(false)

    const planEmojis = ['🎊', '🎉', '🎭', '✨']
    const emoji = plan.emoji || planEmojis[index % planEmojis.length]
    const isEnterprise = plan.key === 'enterprise'
    const isHighlight = !!plan.badge

    // Mostrar apenas os 4 primeiros recursos inicialmente
    const visibleFeatures = expanded ? plan.features : plan.features?.slice(0, 4)
    const hasMoreFeatures = plan.features?.length > 4

    return (
        <div
            className={`pricing-card flex flex-col relative transition-all duration-300 ${isHighlight ? 'card-highlight md:scale-105 z-10 bg-slate-900/80' : 'bg-slate-900/40 hover:bg-slate-900/60'}`}
            style={{
                border: isHighlight ? '2px solid #EC4899' : '1px solid #23233a',
                boxShadow: isHighlight ? '0 20px 40px -10px rgba(236, 72, 153, 0.3)' : 'none',
                height: '100%' // Garante altura total no grid
            }}
        >
            {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg uppercase tracking-wider">
                    {plan.badge}
                </div>
            )}

            <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <div className="text-4xl mb-2">{emoji}</div>
                        <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                        <p className="text-sm text-slate-400">Para {isEnterprise ? 'grandes empresas' : 'seu evento'}</p>
                    </div>
                </div>

                <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                        {isEnterprise ? (
                            <span className="text-3xl font-bold text-white">Sob Consulta</span>
                        ) : (
                            <>
                                <span className="text-4xl font-bold text-white">R$ {plan.price}</span>
                                {plan.oldPrice && (
                                    <span className="text-lg text-slate-500 line-through font-medium">R$ {plan.oldPrice}</span>
                                )}
                            </>
                        )}
                    </div>
                    {!isEnterprise && plan.oldPrice && (
                        <p className="text-xs font-bold text-green-400 mt-2 bg-green-400/10 inline-block px-2 py-1 rounded">
                            Economize R$ {(plan.oldPrice - plan.price).toFixed(0)}
                        </p>
                    )}
                </div>

                <div className="space-y-4 mb-8 flex-1">
                    {visibleFeatures?.map((f: string, i: number) => {
                        const isNegative = f.toLowerCase().includes('sem')
                        return (
                            <div key={i} className="flex items-start gap-3 text-sm animate-in fade-in slide-in-from-top-1 duration-300">
                                <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${isNegative ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                                    {isNegative ? '✕' : '✓'}
                                </div>
                                <span className={isNegative ? 'text-slate-500' : 'text-slate-300'}>{f}</span>
                            </div>
                        )
                    })}

                    {hasMoreFeatures && (
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="text-xs font-bold text-pink-500 hover:text-pink-400 flex items-center gap-1 mt-2 transition-colors"
                        >
                            {expanded ? 'Mostrar menos' : `Ver mais ${plan.features.length - 4} benefícios`}
                            <span className={`transform transition-transform ${expanded ? 'rotate-180' : ''}`}>▼</span>
                        </button>
                    )}
                </div>

                <div className="mt-auto pt-6 border-t border-slate-800">
                    {isEnterprise ? (
                        <a
                            href={`https://wa.me/${whatsappNumber}?text=Olá! Gostaria de saber mais sobre o plano White Label para empresas.`}
                            target="_blank"
                            className="block w-full py-4 px-6 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-xl text-center transition-all shadow-lg shadow-green-500/20 hover:shadow-green-500/40 hover:-translate-y-1"
                        >
                            Falar com especialista 💬
                        </a>
                    ) : (
                        <a
                            href="/login"
                            className={`block w-full py-4 px-6 font-bold rounded-xl text-center transition-all hover:-translate-y-1 ${isHighlight
                                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50'
                                : 'bg-slate-800 hover:bg-slate-700 text-white'
                                }`}
                        >
                            Contratar Agora 🚀
                        </a>
                    )}
                    <p className="text-xs text-center text-slate-500 mt-3">
                        {isEnterprise ? 'Atendimento personalizado' : 'Acesso imediato • Cancelamento grátis'}
                    </p>
                </div>
            </div>
        </div>
    )
}
