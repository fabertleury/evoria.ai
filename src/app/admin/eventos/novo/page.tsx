"use client"
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, MapPin, User, Type, Link as LinkIcon, Save, Package, Layers } from 'lucide-react'

export default function NewEventPage() {
    const [formData, setFormData] = useState({
        title: '',
        host: '',
        date: '',
        location: '',
        slug: '',
        plan: 'basic',
        modules: {
            feed: true,
            screen: false,
            stories: true
        }
    })

    const [loading, setLoading] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleModuleChange = (moduleName: string) => {
        setFormData(prev => ({
            ...prev,
            modules: {
                ...prev.modules,
                [moduleName]: !prev.modules[moduleName as keyof typeof prev.modules]
            }
        }))
    }

    const generateSlug = () => {
        const slug = formData.title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')

        setFormData(prev => ({ ...prev, slug }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Simulação de salvamento
        await new Promise(resolve => setTimeout(resolve, 1500))

        alert('Evento criado com sucesso! (Mock)')
        setLoading(false)
        // Redirecionar ou limpar formulário seria o próximo passo
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/admin/eventos" className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white">
                    <ArrowLeft size={24} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-white">Novo Evento</h1>
                    <p className="text-slate-400">Crie um novo evento para um cliente</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Informações Básicas */}
                <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 space-y-6">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2 border-b border-slate-800 pb-4">
                        <Type className="text-purple-500" size={20} />
                        Informações Básicas
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Título do Evento</label>
                            <div className="relative">
                                <Type className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    onBlur={generateSlug}
                                    placeholder="Ex: Casamento Ana & João"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Anfitrião (Cliente)</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    type="text"
                                    name="host"
                                    value={formData.host}
                                    onChange={handleInputChange}
                                    placeholder="Nome do cliente responsável"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Data do Evento</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all [color-scheme:dark]"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Local</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    placeholder="Ex: Villa Bisutti, SP"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-slate-300">URL Personalizada (Slug)</label>
                            <div className="relative">
                                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    type="text"
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleInputChange}
                                    placeholder="casamento-ana-joao"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all font-mono text-sm"
                                    required
                                />
                            </div>
                            <p className="text-xs text-slate-500">O evento será acessível em: evoria.ai/evento/{formData.slug || '...'}</p>
                        </div>
                    </div>
                </section>

                {/* Plano e Módulos */}
                <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 space-y-6">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2 border-b border-slate-800 pb-4">
                        <Package className="text-blue-500" size={20} />
                        Plano e Recursos
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="text-sm font-medium text-slate-300">Plano Contratado</label>
                            <div className="grid gap-3">
                                {['basic', 'premium', 'enterprise'].map((plan) => (
                                    <label
                                        key={plan}
                                        className={`
                                            relative flex items-center p-4 rounded-lg border cursor-pointer transition-all
                                            ${formData.plan === plan
                                                ? 'bg-purple-600/10 border-purple-500 ring-1 ring-purple-500'
                                                : 'bg-slate-950 border-slate-800 hover:border-slate-700'}
                                        `}
                                    >
                                        <input
                                            type="radio"
                                            name="plan"
                                            value={plan}
                                            checked={formData.plan === plan}
                                            onChange={handleInputChange}
                                            className="w-4 h-4 text-purple-600 border-slate-700 focus:ring-purple-500 bg-slate-900"
                                        />
                                        <div className="ml-3">
                                            <span className="block text-sm font-medium text-white capitalize">{plan}</span>
                                            <span className="block text-xs text-slate-400">
                                                {plan === 'basic' && 'Recursos essenciais para pequenos eventos'}
                                                {plan === 'premium' && 'Experiência completa com todos os módulos'}
                                                {plan === 'enterprise' && 'Soluções personalizadas para grandes eventos'}
                                            </span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                <Layers size={16} />
                                Módulos Ativos
                            </label>
                            <div className="space-y-3 bg-slate-950 p-4 rounded-lg border border-slate-800">
                                <label className="flex items-center justify-between cursor-pointer group">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-6 rounded-full transition-colors ${formData.modules.stories ? 'bg-pink-600' : 'bg-slate-700'}`}>
                                            <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform mt-1 ml-1 ${formData.modules.stories ? 'translate-x-4' : ''}`} />
                                        </div>
                                        <div>
                                            <span className="block text-sm font-medium text-white">Stories Compartilhados</span>
                                            <span className="text-xs text-slate-500">Álbum colaborativo estilo Instagram</span>
                                        </div>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={formData.modules.stories}
                                        onChange={() => handleModuleChange('stories')}
                                        className="hidden"
                                    />
                                </label>

                                <div className="h-px bg-slate-800 my-2" />

                                <label className="flex items-center justify-between cursor-pointer group">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-6 rounded-full transition-colors ${formData.modules.feed ? 'bg-blue-600' : 'bg-slate-700'}`}>
                                            <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform mt-1 ml-1 ${formData.modules.feed ? 'translate-x-4' : ''}`} />
                                        </div>
                                        <div>
                                            <span className="block text-sm font-medium text-white">Feed Ao Vivo</span>
                                            <span className="text-xs text-slate-500">Timeline de fotos em tempo real</span>
                                        </div>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={formData.modules.feed}
                                        onChange={() => handleModuleChange('feed')}
                                        className="hidden"
                                    />
                                </label>

                                <div className="h-px bg-slate-800 my-2" />

                                <label className="flex items-center justify-between cursor-pointer group">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-6 rounded-full transition-colors ${formData.modules.screen ? 'bg-green-600' : 'bg-slate-700'}`}>
                                            <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform mt-1 ml-1 ${formData.modules.screen ? 'translate-x-4' : ''}`} />
                                        </div>
                                        <div>
                                            <span className="block text-sm font-medium text-white">Telão Interativo</span>
                                            <span className="text-xs text-slate-500">Exibição em telões e projetores</span>
                                        </div>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={formData.modules.screen}
                                        onChange={() => handleModuleChange('screen')}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="flex justify-end gap-4">
                    <Link
                        href="/admin/eventos"
                        className="px-6 py-3 text-slate-400 hover:text-white font-medium transition-colors"
                    >
                        Cancelar
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold shadow-lg shadow-purple-500/20 transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Criando...
                            </>
                        ) : (
                            <>
                                <Save size={20} />
                                Criar Evento
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}
