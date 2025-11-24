"use client"
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Shield, Trash2, UserX, AlertTriangle, Smartphone } from 'lucide-react'

export default function AdminFeedSupervisionPage({ params }: { params: { slug: string } }) {
    // Mock Data: Feed (Posts Permanentes)
    const [posts, setPosts] = useState([
        {
            id: 1,
            user: 'Carlos Silva',
            avatar: 'C',
            image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&q=80',
            caption: 'Festa incrível! 🥂',
            time: '2 min atrás',
            status: 'approved',
            aiScore: 0.98,
            aiReason: 'Conteúdo seguro'
        },
        {
            id: 2,
            user: 'Mariana Costa',
            avatar: 'M',
            image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&q=80',
            caption: 'Adorei a decoração! 😍',
            time: '5 min atrás',
            status: 'approved',
            aiScore: 0.95,
            aiReason: 'Conteúdo seguro'
        },
        {
            id: 4,
            user: 'Julia Lima',
            avatar: 'J',
            image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80',
            caption: 'Melhor dia! ✨',
            time: '12 min atrás',
            status: 'approved',
            aiScore: 0.99,
            aiReason: 'Conteúdo seguro'
        }
    ])

    const handleDeletePost = (id: number) => {
        if (confirm('Excluir este post do feed permanentemente?')) {
            setPosts(posts.filter(p => p.id !== id))
        }
    }

    const handleBanUser = (user: string) => {
        if (confirm(`Banir o usuário ${user} deste evento?`)) {
            alert(`Usuário ${user} banido.`)
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Admin Header */}
            <div className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                    <Link href="/admin/eventos" className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                        <ArrowLeft size={20} className="text-slate-400" />
                    </Link>
                    <div>
                        <h1 className="font-bold text-sm flex items-center gap-2">
                            <Shield size={14} className="text-blue-500" />
                            Supervisão de Feed
                        </h1>
                        <p className="text-xs text-slate-400">Evento: {params.slug}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-xs font-medium text-green-400">Ao Vivo</span>
                </div>
            </div>

            <div className="p-4 max-w-7xl mx-auto space-y-8">
                {/* Seção Feed */}
                <div>
                    <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Smartphone className="text-blue-500" size={20} />
                        Feed Social
                        <span className="text-xs font-normal text-slate-400 ml-2">({posts.length} posts)</span>
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className={`bg-slate-900 rounded-xl overflow-hidden border-2 transition-all flex flex-col ${post.status === 'flagged' ? 'border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.2)]' : 'border-slate-800'
                                    }`}
                            >
                                {/* Header do Post */}
                                <div className="p-3 flex items-center justify-between bg-slate-800/50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold">
                                            {post.avatar}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">{post.user}</p>
                                            <p className="text-xs text-slate-400">{post.time}</p>
                                        </div>
                                    </div>
                                    {post.status === 'flagged' && (
                                        <AlertTriangle size={14} className="text-yellow-500" title="Sinalizado" />
                                    )}
                                </div>

                                {/* Imagem */}
                                <div className="relative aspect-square bg-black group">
                                    <img src={post.image} alt="Post" className="w-full h-full object-cover" />

                                    {/* Admin Overlay Actions */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                                        <button
                                            onClick={() => handleDeletePost(post.id)}
                                            className="flex flex-col items-center gap-1 text-red-400 hover:text-red-300 hover:scale-110 transition-transform"
                                        >
                                            <div className="p-2 bg-red-500/20 rounded-full">
                                                <Trash2 size={20} />
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => handleBanUser(post.user)}
                                            className="flex flex-col items-center gap-1 text-slate-400 hover:text-white hover:scale-110 transition-transform"
                                        >
                                            <div className="p-2 bg-slate-700 rounded-full">
                                                <UserX size={20} />
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                {/* Caption & AI Info */}
                                <div className="p-3 flex-1 flex flex-col justify-between">
                                    <p className="text-xs text-slate-200 mb-2 line-clamp-2">{post.caption}</p>
                                    <div className="pt-2 border-t border-slate-800">
                                        <div className="flex items-center gap-1 text-xs text-slate-400 mb-1">
                                            <span>🤖 Motivo IA:</span>
                                        </div>
                                        <p className={`text-xs font-medium ${post.status === 'flagged' ? 'text-yellow-400' : 'text-green-400'}`}>
                                            {post.aiReason}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
