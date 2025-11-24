"use client"
import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Package, Layers, Check, Save } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'

// Tipos Mockados
type Module = {
    id: number
    name: string
    description: string
    price: number
}

type Plan = {
    id: number
    key?: string // Adicionado para compatibilidade com pricing.json
    name: string
    price: number
    features: string[]
    includedModules: number[] // IDs dos módulos inclusos
    badge?: string | null
    emoji?: string
    oldPrice?: number | null
}

export default function AdminPlansPage() {
    // Mock Data inicial para módulos (estes ainda são locais/mockados pois a API de pricing foca em plans)
    // Idealmente, módulos também viriam de uma API, mas vamos focar em persistir os Planos que é o pedido principal.
    const [modules, setModules] = useState<Module[]>([
        { id: 1, name: 'Feed Ao Vivo', description: 'Feed de fotos em tempo real', price: 150 },
        { id: 2, name: 'Telão Interativo', description: 'Exibição de fotos no telão', price: 200 }
    ])

    const [plans, setPlans] = useState<Plan[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    // Carregar planos da API
    useEffect(() => {
        fetch('/api/pricing')
            .then(res => res.json())
            .then(data => {
                if (data.plans) {
                    // Mapear o formato do JSON para o formato interno
                    const mappedPlans = data.plans.map((p: any, index: number) => ({
                        id: index + 1, // Gerar ID numérico temporário
                        key: p.key,
                        name: p.name,
                        price: p.price,
                        features: p.features || [],
                        includedModules: [], // A API atual não salva includedModules explicitamente no JSON de pricing, 
                        // mas vamos manter a estrutura para o admin funcionar.
                        // Se quisermos persistir isso, teríamos que alterar a estrutura do JSON.
                        // Por enquanto, vamos inferir ou deixar vazio.
                        // O usuário pediu para "refletir os dados e valores".
                        badge: p.badge,
                        emoji: p.emoji,
                        oldPrice: p.oldPrice
                    }))

                    // Tentar inferir módulos inclusos baseado nas features (hack temporário para manter consistência visual)
                    mappedPlans.forEach((p: Plan) => {
                        if (p.features.includes('Feed Ao Vivo')) p.includedModules.push(1);
                        if (p.features.includes('Telão Interativo')) p.includedModules.push(2);
                    });

                    setPlans(mappedPlans)
                }
            })
            .catch(err => console.error('Erro ao carregar planos:', err))
            .finally(() => setLoading(false))
    }, [])

    // Estados dos Modais
    const [isModuleModalOpen, setIsModuleModalOpen] = useState(false)
    const [isPlanModalOpen, setIsPlanModalOpen] = useState(false)
    const [editingModule, setEditingModule] = useState<Module | null>(null)
    const [editingPlan, setEditingPlan] = useState<Plan | null>(null)

    // Salvar na API
    const handleSaveToApi = async () => {
        setSaving(true)
        try {
            // Converter de volta para o formato do pricing.json
            const apiPlans = plans.map(p => ({
                key: p.key || p.name.toLowerCase().replace(/\s+/g, '-'),
                name: p.name,
                price: p.price,
                oldPrice: p.oldPrice || null,
                badge: p.badge || null,
                emoji: p.emoji || "✨",
                features: p.features
                // Nota: includedModules não é salvo diretamente no JSON de pricing atual,
                // mas as features são. O admin adiciona os nomes dos módulos nas features
                // se eles estiverem selecionados, para garantir que apareçam no site.
            }))

            const res = await fetch('/api/pricing', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ plans: apiPlans })
            })

            if (res.ok) {
                alert('Planos atualizados com sucesso! A Landing Page foi atualizada.')
            } else {
                throw new Error('Falha ao salvar')
            }
        } catch (error) {
            console.error(error)
            alert('Erro ao salvar alterações.')
        } finally {
            setSaving(false)
        }
    }

    // Handlers para Módulos
    const handleSaveModule = (e: React.FormEvent) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const newModule = {
            id: editingModule ? editingModule.id : Date.now(),
            name: formData.get('name') as string,
            description: formData.get('description') as string,
            price: Number(formData.get('price'))
        }

        if (editingModule) {
            setModules(modules.map(m => m.id === editingModule.id ? newModule : m))
        } else {
            setModules([...modules, newModule])
        }
        setIsModuleModalOpen(false)
        setEditingModule(null)
    }

    const handleDeleteModule = (id: number) => {
        if (confirm('Excluir este módulo?')) {
            setModules(modules.filter(m => m.id !== id))
        }
    }

    // Handlers para Planos
    const handleSavePlan = (e: React.FormEvent) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)

        // Coletar módulos selecionados
        const selectedModules = modules
            .filter(m => formData.get(`module_${m.id}`) === 'on')
            .map(m => m.id)

        // Atualizar features baseadas nos módulos selecionados
        // Remove features que são nomes de módulos para evitar duplicação antes de readicionar
        let currentFeatures = (formData.get('features') as string).split('\n').filter(f => f.trim() !== '')
        const moduleNames = modules.map(m => m.name)
        currentFeatures = currentFeatures.filter(f => !moduleNames.includes(f))

        // Adiciona os nomes dos módulos selecionados como features
        selectedModules.forEach(id => {
            const mod = modules.find(m => m.id === id)
            if (mod) currentFeatures.push(mod.name)
        })

        const newPlan = {
            id: editingPlan ? editingPlan.id : Date.now(),
            key: editingPlan?.key,
            name: formData.get('name') as string,
            price: Number(formData.get('price')),
            features: currentFeatures,
            includedModules: selectedModules,
            badge: editingPlan?.badge,
            emoji: editingPlan?.emoji,
            oldPrice: editingPlan?.oldPrice
        }

        if (editingPlan) {
            setPlans(plans.map(p => p.id === editingPlan.id ? newPlan : p))
        } else {
            setPlans([...plans, newPlan])
        }
        setIsPlanModalOpen(false)
        setEditingPlan(null)
    }

    const handleDeletePlan = (id: number) => {
        if (confirm('Excluir este plano?')) {
            setPlans(plans.filter(p => p.id !== id))
        }
    }

    if (loading) return <div className="text-white">Carregando planos...</div>

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Gerenciar Planos e Módulos</h1>
                <button
                    onClick={handleSaveToApi}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-bold shadow-lg shadow-green-900/20"
                >
                    <Save size={18} />
                    {saving ? 'Salvando...' : 'Salvar Alterações no Site'}
                </button>
            </div>

            {/* Seção de Módulos */}
            <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                        <Layers className="text-blue-500" />
                        Módulos Adicionais
                    </h2>
                    <button
                        onClick={() => { setEditingModule(null); setIsModuleModalOpen(true) }}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                    >
                        <Plus size={16} />
                        Novo Módulo
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {modules.map(module => (
                        <div key={module.id} className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex flex-col justify-between hover:border-blue-500/50 transition-colors">
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-white">{module.name}</h3>
                                    <span className="text-green-400 font-mono text-sm">R$ {module.price}</span>
                                </div>
                                <p className="text-sm text-slate-400 mb-4">{module.description}</p>
                            </div>
                            <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                                <button
                                    onClick={() => { setEditingModule(module); setIsModuleModalOpen(true) }}
                                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                                >
                                    <Edit size={16} />
                                </button>
                                <button
                                    onClick={() => handleDeleteModule(module.id)}
                                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Seção de Planos */}
            <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                        <Package className="text-purple-500" />
                        Planos de Assinatura
                    </h2>
                    <button
                        onClick={() => { setEditingPlan(null); setIsPlanModalOpen(true) }}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm font-medium"
                    >
                        <Plus size={16} />
                        Novo Plano
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {plans.map(plan => (
                        <div key={plan.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col relative overflow-hidden group hover:border-purple-500/50 transition-colors">
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                <button
                                    onClick={() => { setEditingPlan(plan); setIsPlanModalOpen(true) }}
                                    className="p-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700"
                                >
                                    <Edit size={14} />
                                </button>
                                <button
                                    onClick={() => handleDeletePlan(plan.id)}
                                    className="p-2 bg-slate-800 text-red-400 rounded-lg hover:bg-slate-700"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                            <div className="text-3xl font-bold text-white mb-6">
                                R$ {plan.price}
                                <span className="text-sm font-normal text-slate-400">/evento</span>
                            </div>

                            <div className="space-y-4 flex-1">
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase mb-2">Recursos</p>
                                    <ul className="space-y-2">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="text-sm text-slate-300 flex items-center gap-2">
                                                <Check size={14} className="text-green-500" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {plan.includedModules.length > 0 && (
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase mb-2">Módulos Inclusos</p>
                                        <div className="flex flex-wrap gap-2">
                                            {plan.includedModules.map(moduleId => {
                                                const module = modules.find(m => m.id === moduleId)
                                                return module ? (
                                                    <span key={moduleId} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded border border-blue-500/30">
                                                        {module.name}
                                                    </span>
                                                ) : null
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Modal de Módulo */}
            <Dialog.Root open={isModuleModalOpen} onOpenChange={setIsModuleModalOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 border border-slate-800 p-6 rounded-xl w-full max-w-md z-50 shadow-2xl">
                        <Dialog.Title className="text-xl font-bold text-white mb-4">
                            {editingModule ? 'Editar Módulo' : 'Novo Módulo'}
                        </Dialog.Title>
                        <form onSubmit={handleSaveModule} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Nome do Módulo</label>
                                <input
                                    name="name"
                                    defaultValue={editingModule?.name}
                                    required
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Descrição</label>
                                <textarea
                                    name="description"
                                    defaultValue={editingModule?.description}
                                    required
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:ring-2 focus:ring-blue-500 outline-none h-24 resize-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Preço (R$)</label>
                                <input
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    defaultValue={editingModule?.price}
                                    required
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModuleModalOpen(false)}
                                    className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                                >
                                    Salvar Módulo
                                </button>
                            </div>
                        </form>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

            {/* Modal de Plano */}
            <Dialog.Root open={isPlanModalOpen} onOpenChange={setIsPlanModalOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 border border-slate-800 p-6 rounded-xl w-full max-w-lg z-50 shadow-2xl max-h-[90vh] overflow-y-auto">
                        <Dialog.Title className="text-xl font-bold text-white mb-4">
                            {editingPlan ? 'Editar Plano' : 'Novo Plano'}
                        </Dialog.Title>
                        <form onSubmit={handleSavePlan} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Nome do Plano</label>
                                <input
                                    name="name"
                                    defaultValue={editingPlan?.name}
                                    required
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Preço (R$)</label>
                                <input
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    defaultValue={editingPlan?.price}
                                    required
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Recursos (um por linha)</label>
                                <textarea
                                    name="features"
                                    defaultValue={editingPlan?.features.join('\n')}
                                    required
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:ring-2 focus:ring-purple-500 outline-none h-32 resize-none"
                                    placeholder="Ex: Até 100 convidados&#10;Suporte 24/7"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Módulos Inclusos</label>
                                <div className="space-y-2 bg-slate-950 p-3 rounded-lg border border-slate-800">
                                    {modules.map(module => (
                                        <label key={module.id} className="flex items-center gap-3 cursor-pointer hover:bg-slate-900 p-2 rounded transition-colors">
                                            <input
                                                type="checkbox"
                                                name={`module_${module.id}`}
                                                defaultChecked={editingPlan?.includedModules.includes(module.id)}
                                                className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-purple-600 focus:ring-purple-500"
                                            />
                                            <div>
                                                <span className="text-sm font-medium text-white block">{module.name}</span>
                                                <span className="text-xs text-slate-500 block">{module.description}</span>
                                            </div>
                                        </label>
                                    ))}
                                    {modules.length === 0 && (
                                        <p className="text-xs text-slate-500 text-center py-2">Nenhum módulo cadastrado.</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsPlanModalOpen(false)}
                                    className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                                >
                                    Salvar Plano
                                </button>
                            </div>
                        </form>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    )
}