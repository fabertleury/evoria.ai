"use client"
import { useState } from 'react'
import Link from 'next/link'
import {
    ArrowLeft, Calendar, MapPin, Users, Smartphone, Monitor,
    Trash2, MessageSquare, Image as ImageIcon, AlertTriangle, CheckCircle, XCircle
} from 'lucide-react'
import * as Tabs from '@radix-ui/react-tabs'

export default function AdminEventoDetalhesPage({ params }: { params: { id: string } }) {
    // Mock Data do Evento (simulando fetch pelo ID)
    const [event, setEvent] = useState({
        id: params.id,
        title: 'Casamento Ana & João',
        host: 'Ana Silva',
        date: '2023-12-15',
        location: 'Villa Garden',
        guests: 150,
        status: 'live',
        plan: 'Premium',
        modules: ['feed', 'screen'],
        slug: 'casamento-ana-joao',
        cover: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80'
    })

    // Mock Data de Conteúdo (Stories/Fotos)
    const [mediaItems, setMediaItems] = useState([
        { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&q=80', user: 'Carlos', time: '10 min atrás', status: 'approved' },
        { id: 2, type: 'image', url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&q=80', user: 'Mariana', time: '15 min atrás', status: 'approved' },
        { id: 3, type: 'image', url: 'https://images.unsplash.com/photo-1519225468359-696330f998cd?w=400&q=80', user: 'Pedro', time: '20 min atrás', status: 'flagged' },
        { id: 4, type: 'image', url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80', user: 'Julia', time: '30 min atrás', status: 'approved' },
    ])

    // Mock Data de Comentários
    const [comments, setComments] = useState([
        { id: 1, user: 'Carlos', text: 'Festa incrível! Parabéns aos noivos! 🥂', time: '5 min atrás' },
        { id: 2, user: 'Mariana', text: 'Tudo muito lindo! 😍', time: '12 min atrás' },
        { id: 3, user: 'Pedro', text: 'Onde é o bar? 😂', time: '18 min atrás' },
    ])

    const deleteMedia = (id: number) => {
        if (confirm('Tem certeza que deseja excluir esta mídia?')) {
            setMediaItems(mediaItems.filter(item => item.id !== id))
        }
    }

    const deleteComment = (id: number) => {
        if (confirm('Tem certeza que deseja excluir este comentário?')) {
            setComments(comments.filter(item => item.id !== id))
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4">
                <Link href="/admin/eventos" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors w-fit">
                    <ArrowLeft size={16} />
                    Voltar para Eventos
                </Link>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden border border-slate-700">
                            <img src={event.cover} alt={event.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                                {event.title}
                                {event.status === 'live' && (
                                    <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded animate-pulse">AO VIVO</span>
                                )}
                            </h1>
                            <p className="text-slate-400 flex items-center gap-2 text-sm">
                                <span className="font-medium text-white">{event.host}</span> • {new Date(event.date).toLocaleDateString('pt-BR')} • {event.location}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        {event.modules.includes('feed') && (
                            <Link href={`/admin/evento/${event.slug}/feed`} className="px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition-colors flex items-center gap-2 text-sm font-medium">
                                <Smartphone size={16} /> Supervisão Feed
                            </Link>
                        )}
                        {event.modules.includes('screen') && (
                            <Link href={`/admin/evento/${event.slug}/telao`} className="px-4 py-2 bg-pink-500/10 text-pink-400 border border-pink-500/20 rounded-lg hover:bg-pink-500/20 transition-colors flex items-center gap-2 text-sm font-medium">
                                <Monitor size={16} /> Supervisão Telão
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <Tabs.Root defaultValue="moderation" className="space-y-6">
                <Tabs.List className="flex border-b border-slate-800">
                    <Tabs.Trigger value="overview" className="px-6 py-3 text-sm font-medium text-slate-400 hover:text-white border-b-2 border-transparent data-[state=active]:border-purple-500 data-[state=active]:text-purple-400 transition-colors">
                        Visão Geral
                    </Tabs.Trigger>
                    <Tabs.Trigger value="moderation" className="px-6 py-3 text-sm font-medium text-slate-400 hover:text-white border-b-2 border-transparent data-[state=active]:border-purple-500 data-[state=active]:text-purple-400 transition-colors">
                        Moderação de Conteúdo
                    </Tabs.Trigger>
                    <Tabs.Trigger value="comments" className="px-6 py-3 text-sm font-medium text-slate-400 hover:text-white border-b-2 border-transparent data-[state=active]:border-purple-500 data-[state=active]:text-purple-400 transition-colors">
                        Comentários
                    </Tabs.Trigger>
                    <Tabs.Trigger value="settings" className="px-6 py-3 text-sm font-medium text-slate-400 hover:text-white border-b-2 border-transparent data-[state=active]:border-purple-500 data-[state=active]:text-purple-400 transition-colors">
                        Configurações
                    </Tabs.Trigger>
                </Tabs.List>

                {/* Tab: Visão Geral */}
                <Tabs.Content value="overview" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
                            <h3 className="text-slate-400 text-sm font-medium mb-2">Plano Contratado</h3>
                            <p className="text-2xl font-bold text-white">{event.plan}</p>
                            <div className="mt-4 flex gap-2">
                                {event.modules.map(m => (
                                    <span key={m} className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300 uppercase">
                                        {m === 'feed' ? 'Feed Social' : 'Telão Interativo'}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
                            <h3 className="text-slate-400 text-sm font-medium mb-2">Total de Mídia</h3>
                            <p className="text-2xl font-bold text-white">{mediaItems.length}</p>
                            <p className="text-xs text-slate-500 mt-1">Fotos e vídeos compartilhados</p>
                        </div>
                        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
                            <h3 className="text-slate-400 text-sm font-medium mb-2">Total de Comentários</h3>
                            <p className="text-2xl font-bold text-white">{comments.length}</p>
                            <p className="text-xs text-slate-500 mt-1">Interações no feed</p>
                        </div>
                    </div>
                </Tabs.Content>

                {/* Tab: Moderação */}
                <Tabs.Content value="moderation" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-white">Galeria de Mídia</h2>
                        <div className="flex gap-2">
                            <button className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-sm hover:bg-slate-700">Selecionar Tudo</button>
                            <button className="px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-sm hover:bg-red-500/20">Excluir Selecionados</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {mediaItems.map((item) => (
                            <div key={item.id} className="group relative aspect-[9/16] bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
                                <img src={item.url} alt={`Foto de ${item.user}`} className="w-full h-full object-cover" />

                                {/* Overlay de Informações */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                                    <p className="text-white text-sm font-medium">{item.user}</p>
                                    <p className="text-slate-400 text-xs">{item.time}</p>

                                    <div className="flex gap-2 mt-3">
                                        <button
                                            onClick={() => deleteMedia(item.id)}
                                            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1.5 rounded text-xs font-medium transition-colors flex items-center justify-center gap-1"
                                        >
                                            <Trash2 size={12} /> Excluir
                                        </button>
                                    </div>
                                </div>

                                {/* Badge de Status */}
                                {item.status === 'flagged' && (
                                    <div className="absolute top-2 right-2 bg-yellow-500 text-black p-1 rounded-full" title="Conteúdo Sinalizado">
                                        <AlertTriangle size={14} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </Tabs.Content>

                {/* Tab: Comentários */}
                <Tabs.Content value="comments" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-slate-800/50 border-b border-slate-700">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase">Usuário</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase">Comentário</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {comments.map((comment) => (
                                    <tr key={comment.id} className="hover:bg-slate-800/30">
                                        <td className="px-6 py-4">
                                            <p className="text-white font-medium">{comment.user}</p>
                                            <p className="text-xs text-slate-500">{comment.time}</p>
                                        </td>
                                        <td className="px-6 py-4 text-slate-300">
                                            {comment.text}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => deleteComment(comment.id)}
                                                className="text-slate-400 hover:text-red-400 p-2 hover:bg-red-500/10 rounded transition-colors"
                                                title="Excluir Comentário"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Tabs.Content>

                {/* Tab: Configurações */}
                <Tabs.Content value="settings" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl max-w-2xl">
                        <h3 className="text-lg font-semibold text-white mb-6">Editar Detalhes do Evento</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Nome do Evento</label>
                                <input type="text" defaultValue={event.title} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Anfitrião</label>
                                <input type="text" defaultValue={event.host} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Data</label>
                                    <input type="date" defaultValue={event.date} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Local</label>
                                    <input type="text" defaultValue={event.location} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white" />
                                </div>
                            </div>
                            <div className="pt-4 flex justify-end">
                                <button className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium">
                                    Salvar Alterações
                                </button>
                            </div>
                        </div>
                    </div>
                </Tabs.Content>
            </Tabs.Root>
        </div>
    )
}
