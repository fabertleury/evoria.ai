"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, User, Phone, PartyPopper, Briefcase, Heart, Star } from 'lucide-react'

export default function OnboardingPage() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        fullName: '',
        whatsapp: '',
        eventType: '',
        eventDate: ''
    })

    const eventTypes = [
        { id: 'birthday', label: 'Aniversário', icon: PartyPopper, color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
        { id: 'wedding', label: 'Casamento', icon: Heart, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
        { id: 'corporate', label: 'Corporativo', icon: Briefcase, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
        { id: 'other', label: 'Outro', icon: Star, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    ]

    const handleNext = () => {
        if (step < 3) setStep(step + 1)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Aqui enviaríamos para a API
            // await apiFetch('/api/user/profile', { method: 'POST', body: formData })

            // Simulando salvamento no localStorage para persistência imediata no frontend
            localStorage.setItem('evoria_user_profile', JSON.stringify(formData))

            // Redirecionar para a seleção de planos
            router.push('/cliente/planos')
        } catch (error) {
            console.error('Erro ao salvar perfil', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="w-full max-w-lg">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between text-sm text-slate-400 mb-2">
                        <span>Passo {step} de 3</span>
                        <span>{Math.round((step / 3) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                            style={{ width: `${(step / 3) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 backdrop-blur-xl">
                    <form onSubmit={handleSubmit}>
                        {/* Step 1: Dados Pessoais */}
                        {step === 1 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                                <div className="text-center mb-8">
                                    <h1 className="text-3xl font-bold text-white mb-2">Vamos nos conhecer! 👋</h1>
                                    <p className="text-slate-400">Precisamos de alguns dados para personalizar sua experiência.</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Nome Completo</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                                        <input
                                            type="text"
                                            required
                                            value={formData.fullName}
                                            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                            placeholder="Como você quer ser chamado?"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">WhatsApp</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                                        <input
                                            type="tel"
                                            required
                                            value={formData.whatsapp}
                                            onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                                            placeholder="(00) 00000-0000"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleNext}
                                    disabled={!formData.fullName || !formData.whatsapp}
                                    className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                                >
                                    Continuar
                                </button>
                            </div>
                        )}

                        {/* Step 2: Tipo de Evento */}
                        {step === 2 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                                <div className="text-center mb-8">
                                    <h1 className="text-3xl font-bold text-white mb-2">Qual o seu evento? 🎉</h1>
                                    <p className="text-slate-400">Selecione o tipo de evento que você está planejando.</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {eventTypes.map((type) => (
                                        <button
                                            key={type.id}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, eventType: type.id })}
                                            className={`p-4 rounded-xl border-2 transition-all text-left flex flex-col gap-3 ${formData.eventType === type.id
                                                    ? `border-purple-500 bg-purple-500/10`
                                                    : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                                                }`}
                                        >
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${type.bg} ${type.color}`}>
                                                <type.icon size={20} />
                                            </div>
                                            <span className={`font-medium ${formData.eventType === type.id ? 'text-white' : 'text-slate-400'}`}>
                                                {type.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    onClick={handleNext}
                                    disabled={!formData.eventType}
                                    className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all"
                                >
                                    Continuar
                                </button>
                            </div>
                        )}

                        {/* Step 3: Data */}
                        {step === 3 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                                <div className="text-center mb-8">
                                    <h1 className="text-3xl font-bold text-white mb-2">Quando será? 📅</h1>
                                    <p className="text-slate-400">
                                        {formData.eventType === 'birthday'
                                            ? 'Informe sua data de nascimento para ganharmos presentes!'
                                            : 'Informe a data do evento para nos prepararmos.'}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Data</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                                        <input
                                            type="date"
                                            required
                                            value={formData.eventDate}
                                            onChange={e => setFormData({ ...formData, eventDate: e.target.value })}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all [color-scheme:dark]"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || !formData.eventDate}
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-purple-500/25"
                                >
                                    {loading ? 'Salvando...' : 'Finalizar Cadastro'}
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}
