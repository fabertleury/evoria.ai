"use client"
import { useState } from 'react'
import Link from 'next/link'
import { Search, Filter, MoreVertical, Calendar, MapPin, Users, Circle, Monitor, Smartphone, Layers, PlayCircle } from 'lucide-react'

export default function AdminEventosPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('todos')

    // Mock Data
    const events = [
        {
            id: 1,
            title: 'Casamento Ana & João',
            host: 'Ana Silva',
            date: '2024-03-15',
            location: 'Villa Bisutti, SP',
            status: 'active', // active, scheduled, finished
            guests: 150,
            slug: 'casamento-ana-joao',
            plan: 'Premium',
            modules: {
                feed: true,
                screen: true,
                stories: true
            }
        },
        {
            id: 2,
            title: 'Formatura Medicina USP',
            host: 'Comissão de Formatura',
            date: '2024-04-20',
            location: 'Expo Center Norte, SP',
            status: 'scheduled',
            guests: 500,
            slug: 'medicina-usp-24',
            plan: 'Enterprise',
            modules: {
                feed: true,
                screen: true,
                stories: true
            }
        },
        {
            id: 3,
            title: 'Aniversário 15 Anos Bia',
            host: 'Beatriz Costa',
            date: '2024-02-10',
            location: 'Buffet Infantil, RJ',
            status: 'finished',
            guests: 80,
            slug: 'bia-15-anos',
            plan: 'Básico',
            modules: {
                feed: false,
                screen: false,
                stories: true
            }
        }
    ]

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.host.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === 'todos' || event.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'text-green-400 bg-green-400/10 border-green-400/20'
            case 'scheduled': return 'text-blue-400 bg-blue-400/10 border-blue-400/20'
            case 'finished': return 'text-slate-400 bg-slate-400/10 border-slate-400/20'
            default: return 'text-slate-400'
        }
    }

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'active': return 'Ao Vivo'
            case 'scheduled': return 'Agendado'
            case 'finished': return 'Finalizado'
            default: return status
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Gerenciar Eventos</h1>
                    <p className="text-slate-400">Visualize e modere todos os eventos da plataforma</p>
                </div>
                <Link href="/admin/eventos/novo" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-center">
                    Novo Evento
                </Link>
            </div>

            {/* Filtros */}
            <div className="flex flex-col md:flex-row gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por evento ou anfitrião..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                    <Filter size={20} className="text-slate-400" />
                    {['todos', 'active', 'scheduled', 'finished'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${statusFilter === status
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-slate-800 text-slate-400 hover:text-white'
                                }`}
                        >
                            {status === 'todos' ? 'Todos' : getStatusLabel(status)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Lista de Eventos */}
            <div className="grid gap-4">
                {filteredEvents.map((event) => (
                    <div key={event.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all group">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

                            {/* Info Principal */}
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                                        {event.title}
                                    </h3>
                                    <span className={`px-2 py-0.5 rounded text-xs font-bold border ${getStatusColor(event.status)}`}>
                                        {getStatusLabel(event.status)}
                                    </span>
                                </div>
                                <p className="text-slate-400 text-sm mb-4">Anfitrião: <span className="text-slate-300">{event.host}</span></p>

                                <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar size={16} />
                                        {new Date(event.date).toLocaleDateString('pt-BR')}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <MapPin size={16} />
                                        {event.location}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Users size={16} />
                                        {event.guests} convidados
                                    </div>
                                </div>
                            </div>

                            {/* Plano e Módulos */}
                            <div className="flex flex-col gap-2 min-w-[200px]">
                                <div className="text-xs font-bold text-slate-500 uppercase mb-1">Plano & Módulos</div>
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-1 bg-purple-500/10 text-purple-400 rounded text-xs font-bold border border-purple-500/20">
                                        {event.plan}
                                    </span>
                                </div>
                                <div className="flex gap-2 mt-1">
                                    {event.modules.stories && (
                                        <div className="flex items-center gap-1 text-xs text-pink-400 bg-pink-500/10 px-2 py-1 rounded border border-pink-500/20" title="Stories Ativo">
                                            <PlayCircle size={12} /> Stories
                                        </div>
                                    )}
                                    {event.modules.feed && (
                                        <div className="flex items-center gap-1 text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20" title="Feed Ao Vivo">
                                            <Smartphone size={12} /> Feed
                                        </div>
                                    )}
                                    {event.modules.screen && (
                                        <div className="flex items-center gap-1 text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded border border-green-500/20" title="Telão Interativo">
                                            <Monitor size={12} /> Telão
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Ações */}
                            <div className="flex items-center gap-3 border-t lg:border-t-0 lg:border-l border-slate-800 pt-4 lg:pt-0 lg:pl-6">
                                <Link
                                    href={`/admin/eventos/${event.id}`}
                                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors"
                                >
                                    Gerenciar
                                </Link>

                                {event.status === 'active' && (
                                    <div className="flex gap-2">
                                        {event.modules.stories && (
                                            <Link
                                                href={`/admin/evento/${event.slug}/stories`}
                                                className="p-2 bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 rounded-lg transition-colors border border-pink-500/30"
                                                title="Supervisão Stories"
                                            >
                                                <PlayCircle size={18} />
                                            </Link>
                                        )}
                                        {event.modules.feed && (
                                            <Link
                                                href={`/admin/evento/${event.slug}/feed`}
                                                className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors border border-blue-500/30"
                                                title="Supervisão Feed"
                                            >
                                                <Smartphone size={18} />
                                            </Link>
                                        )}
                                        {event.modules.screen && (
                                            <Link
                                                href={`/admin/evento/${event.slug}/telao`}
                                                className="p-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-lg transition-colors border border-green-500/30"
                                                title="Supervisão Telão"
                                            >
                                                <Monitor size={18} />
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}