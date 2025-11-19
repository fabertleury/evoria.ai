"use client"
import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Save, Video, HelpCircle, Package, Plus, X, Check, Trash2 } from 'lucide-react'

export default function AdminLandingPage() {
    const [plans, setPlans] = useState<any[]>([])
    const [videos, setVideos] = useState<string[]>([])
    const [faq, setFaq] = useState<{ q: string; a: string }[]>([])
    const [whatsappNumber, setWhatsappNumber] = useState('')
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        const load = async () => {
            try {
                const [plansRes, landingRes] = await Promise.all([
                    fetch('/api/pricing'),
                    fetch('/api/landing')
                ])
                const plansData = await plansRes.json()
                const landingData = await landingRes.json()

                setPlans(plansData.plans || [])
                setVideos(landingData.videos || [])
                setFaq(landingData.faq || [])
                setWhatsappNumber(landingData.whatsappNumber || '5511999999999')
            } catch (error) {
                console.error('Erro ao carregar dados:', error)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    function updatePlan(i: number, field: string, value: any) {
        setPlans(prev => prev.map((p, idx) => idx === i ? { ...p, [field]: value } : p))
    }

    function addFeature(planIndex: number) {
        setPlans(prev => prev.map((p, idx) => {
            if (idx === planIndex) {
                const features = p.features || []
                return { ...p, features: [...features, ''] }
            }
            return p
        }))
    }

    function updateFeature(planIndex: number, featureIndex: number, value: string) {
        setPlans(prev => prev.map((p, idx) => {
            if (idx === planIndex) {
                const features = [...(p.features || [])]
                features[featureIndex] = value
                return { ...p, features }
            }
            return p
        }))
    }

    function removeFeature(planIndex: number, featureIndex: number) {
        setPlans(prev => prev.map((p, idx) => {
            if (idx === planIndex) {
                const features = [...(p.features || [])]
                features.splice(featureIndex, 1)
                return { ...p, features }
            }
            return p
        }))
    }

    // Funções para vídeos
    function addVideo() {
        setVideos(prev => [...prev, ''])
    }

    function updateVideo(index: number, value: string) {
        setVideos(prev => prev.map((v, idx) => idx === index ? value : v))
    }

    function removeVideo(index: number) {
        setVideos(prev => prev.filter((_, idx) => idx !== index))
    }

    // Funções para FAQ
    function addFaq() {
        setFaq(prev => [...prev, { q: '', a: '' }])
    }

    function updateFaq(index: number, field: 'q' | 'a', value: string) {
        setFaq(prev => prev.map((f, idx) => idx === index ? { ...f, [field]: value } : f))
    }

    function removeFaq(index: number) {
        setFaq(prev => prev.filter((_, idx) => idx !== index))
    }

    async function savePlans() {
        setSaving(true)
        try {
            await fetch('/api/pricing', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ plans })
            })
            alert('✅ Planos atualizados com sucesso!')
        } catch (error) {
            alert('❌ Erro ao salvar planos')
        } finally {
            setSaving(false)
        }
    }

    async function saveContent() {
        setSaving(true)
        try {
            const res = await fetch('/api/landing')
            const data = await res.json()
            await fetch('/api/landing', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, videos, faq, whatsappNumber })
            })
            alert('✅ Landing Page atualizada com sucesso!')
        } catch (error) {
            alert('❌ Erro ao salvar alterações')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                    <p className="text-slate-400">Carregando...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 lg:p-8 space-y-8 max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Configurar Landing Page
                </h1>
                <p className="text-slate-400">Atualize os planos, vídeos, FAQ e WhatsApp do site</p>
            </div>

            {/* WhatsApp */}
            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                <CardHeader className="border-b border-slate-800">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-white flex items-center gap-2">
                            <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                            Número do WhatsApp
                        </CardTitle>
                        <button
                            onClick={saveContent}
                            disabled={saving}
                            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors disabled:opacity-50 text-sm"
                        >
                            <Save className="h-4 w-4" />
                            Salvar
                        </button>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Número com DDI (ex: 5511999999999)
                    </label>
                    <input
                        type="text"
                        value={whatsappNumber}
                        onChange={e => setWhatsappNumber(e.target.value)}
                        placeholder="5511999999999"
                        className="w-full px-4 py-3 bg-white/10 border border-slate-700 rounded-lg 
                     text-white placeholder-slate-500
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                     transition-all duration-200"
                    />
                    <p className="text-xs text-slate-500 mt-2">
                        Usado no botão flutuante "Fale Conosco no WhatsApp"
                    </p>
                </CardContent>
            </Card>

            {/* Planos */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                        <Package className="h-5 w-5 text-purple-400" />
                        Planos de Preços
                    </h2>
                    <button
                        onClick={savePlans}
                        disabled={saving}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors disabled:opacity-50"
                    >
                        <Save className="h-4 w-4" />
                        Salvar Planos
                    </button>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {plans.map((p, i) => (
                        <Card key={p.key || i} className="border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                            <CardHeader className="border-b border-slate-800">
                                <CardTitle className="text-white">{p.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Preço (R$)
                                        </label>
                                        <input
                                            type="number"
                                            value={p.price}
                                            onChange={e => updatePlan(i, 'price', Number(e.target.value))}
                                            className="w-full px-4 py-3 bg-white/10 border border-slate-700 rounded-lg 
                               text-white placeholder-slate-500
                               focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                               transition-all duration-200"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Preço Antigo
                                        </label>
                                        <input
                                            type="number"
                                            value={p.oldPrice || ''}
                                            onChange={e => updatePlan(i, 'oldPrice', e.target.value ? Number(e.target.value) : null)}
                                            placeholder="Opcional"
                                            className="w-full px-4 py-3 bg-white/10 border border-slate-700 rounded-lg 
                               text-white placeholder-slate-500
                               focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                               transition-all duration-200"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Badge (opcional)
                                    </label>
                                    <input
                                        type="text"
                                        value={p.badge || ''}
                                        onChange={e => updatePlan(i, 'badge', e.target.value || null)}
                                        placeholder="Ex: Mais Popular"
                                        className="w-full px-4 py-3 bg-white/10 border border-slate-700 rounded-lg 
                             text-white placeholder-slate-500
                             focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                             transition-all duration-200"
                                    />
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <label className="text-sm font-medium text-slate-300">
                                            Recursos Incluídos
                                        </label>
                                        <button
                                            onClick={() => addFeature(i)}
                                            className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-500/20 text-purple-400 rounded hover:bg-purple-500/30 transition-colors"
                                        >
                                            <Plus className="h-3 w-3" />
                                            Adicionar
                                        </button>
                                    </div>
                                    <div className="space-y-2">
                                        {(p.features || []).map((feature: string, idx: number) => (
                                            <div key={idx} className="flex items-center gap-2">
                                                <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                                                <input
                                                    type="text"
                                                    value={feature}
                                                    onChange={e => updateFeature(i, idx, e.target.value)}
                                                    placeholder="Digite o recurso..."
                                                    className="flex-1 px-3 py-2 bg-white/10 border border-slate-700 rounded-lg 
                                   text-white placeholder-slate-500 text-sm
                                   focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                   transition-all duration-200"
                                                />
                                                <button
                                                    onClick={() => removeFeature(i, idx)}
                                                    className="p-2 text-red-400 hover:bg-red-500/10 rounded transition-colors"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                        {(!p.features || p.features.length === 0) && (
                                            <p className="text-sm text-slate-500 italic">Nenhum recurso adicionado</p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Vídeos */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                        <Video className="h-5 w-5 text-pink-400" />
                        Vídeos da Landing (TikTok / Reels)
                    </h2>
                    <div className="flex gap-2">
                        <button
                            onClick={addVideo}
                            className="flex items-center gap-2 px-3 py-2 bg-pink-500/20 text-pink-400 rounded-lg hover:bg-pink-500/30 transition-colors text-sm"
                        >
                            <Plus className="h-4 w-4" />
                            Adicionar Vídeo
                        </button>
                        <button
                            onClick={saveContent}
                            disabled={saving}
                            className="flex items-center gap-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors disabled:opacity-50 text-sm"
                        >
                            <Save className="h-4 w-4" />
                            Salvar
                        </button>
                    </div>
                </div>

                <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                    <CardContent className="p-6 space-y-4">
                        {videos.length === 0 && (
                            <div className="text-center py-8 text-slate-500">
                                <Video className="h-12 w-12 mx-auto mb-3 opacity-30" />
                                <p>Nenhum vídeo adicionado</p>
                                <p className="text-sm mt-2">Clique em "Adicionar Vídeo" para começar</p>
                            </div>
                        )}
                        {videos.map((v, i) => (
                            <div key={i} className="flex gap-2">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Vídeo {i + 1} - URL (TikTok ou Instagram Reels)
                                    </label>
                                    <input
                                        type="text"
                                        value={v}
                                        onChange={e => updateVideo(i, e.target.value)}
                                        placeholder="https://www.tiktok.com/@usuario/video/... ou https://www.instagram.com/reel/..."
                                        className="w-full px-4 py-3 bg-white/10 border border-slate-700 rounded-lg 
                             text-white placeholder-slate-500
                             focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent
                             transition-all duration-200"
                                    />
                                </div>
                                <button
                                    onClick={() => removeVideo(i)}
                                    className="mt-8 p-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                    title="Remover vídeo"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </div>
                        ))}

                        <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                            <p className="text-sm text-blue-300 font-medium mb-2">💡 Dicas de URLs:</p>
                            <ul className="text-xs text-blue-200 space-y-1">
                                <li>• <strong>TikTok:</strong> https://www.tiktok.com/@username/video/1234567890</li>
                                <li>• <strong>Instagram Reels:</strong> https://www.instagram.com/reel/ABC123xyz/</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* FAQ */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                        <HelpCircle className="h-5 w-5 text-cyan-400" />
                        Perguntas Frequentes (FAQ)
                    </h2>
                    <div className="flex gap-2">
                        <button
                            onClick={addFaq}
                            className="flex items-center gap-2 px-3 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors text-sm"
                        >
                            <Plus className="h-4 w-4" />
                            Adicionar Pergunta
                        </button>
                        <button
                            onClick={saveContent}
                            disabled={saving}
                            className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors disabled:opacity-50 text-sm"
                        >
                            <Save className="h-4 w-4" />
                            Salvar
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    {faq.length === 0 && (
                        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                            <CardContent className="p-12 text-center text-slate-500">
                                <HelpCircle className="h-12 w-12 mx-auto mb-3 opacity-30" />
                                <p>Nenhuma pergunta adicionada</p>
                                <p className="text-sm mt-2">Clique em "Adicionar Pergunta" para começar</p>
                            </CardContent>
                        </Card>
                    )}
                    {faq.map((item, i) => (
                        <Card key={i} className="border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                            <CardContent className="p-6 space-y-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                Pergunta {i + 1}
                                            </label>
                                            <input
                                                type="text"
                                                value={item.q}
                                                onChange={e => updateFaq(i, 'q', e.target.value)}
                                                placeholder="Digite a pergunta..."
                                                className="w-full px-4 py-3 bg-white/10 border border-slate-700 rounded-lg 
                                 text-white placeholder-slate-500
                                 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent
                                 transition-all duration-200"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                                Resposta {i + 1}
                                            </label>
                                            <textarea
                                                value={item.a}
                                                onChange={e => updateFaq(i, 'a', e.target.value)}
                                                placeholder="Digite a resposta..."
                                                rows={3}
                                                className="w-full px-4 py-3 bg-white/10 border border-slate-700 rounded-lg 
                                 text-white placeholder-slate-500
                                 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent
                                 transition-all duration-200 resize-none"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFaq(i)}
                                        className="ml-4 p-2 text-red-400 hover:bg-red-500/10 rounded transition-colors"
                                        title="Remover FAQ"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
