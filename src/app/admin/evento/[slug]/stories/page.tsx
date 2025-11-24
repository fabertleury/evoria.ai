"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Shield, Trash2, AlertTriangle, XCircle, PlayCircle, PauseCircle, SkipForward, SkipBack } from 'lucide-react'

export default function AdminStoriesSupervisionPage({ params }: { params: { slug: string } }) {
    const [isViewerOpen, setIsViewerOpen] = useState(false)
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
    const [storyProgress, setStoryProgress] = useState(0)
    const [isPlaying, setIsPlaying] = useState(true)

    // Mock Data: Stories do Evento
    const [stories, setStories] = useState([
        {
            id: 101,
            user: 'Carlos Silva',
            avatar: 'C',
            image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&q=80',
            time: '2 min atrás',
            status: 'approved',
            aiReason: 'Conteúdo seguro'
        },
        {
            id: 102,
            user: 'Mariana Costa',
            avatar: 'M',
            image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&q=80',
            time: '5 min atrás',
            status: 'approved',
            aiReason: 'Conteúdo seguro'
        },
        {
            id: 103,
            user: 'Pedro Santos',
            avatar: 'P',
            image: 'https://images.unsplash.com/photo-1519225468359-696330f998cd?w=400&q=80',
            time: '10 min atrás',
            status: 'flagged',
            aiReason: 'Possível bebida alcoólica'
        },
        {
            id: 104,
            user: 'Julia Lima',
            avatar: 'J',
            image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80',
            time: '15 min atrás',
            status: 'approved',
            aiReason: 'Conteúdo seguro'
        }
    ])

    const handleDeleteStory = (id: number) => {
        if (confirm('Excluir este story permanentemente?')) {
            const newStories = stories.filter(s => s.id !== id)
            setStories(newStories)
            if (newStories.length === 0) {
                closeViewer()
            } else if (currentStoryIndex >= newStories.length) {
                setCurrentStoryIndex(newStories.length - 1)
                setStoryProgress(0)
            }
        }
    }

    const openViewer = (index = 0) => {
        if (stories.length > 0) {
            setIsViewerOpen(true)
            setCurrentStoryIndex(index)
            setStoryProgress(0)
            setIsPlaying(true)
        }
    }

    const closeViewer = () => {
        setIsViewerOpen(false)
        setCurrentStoryIndex(0)
        setStoryProgress(0)
    }

    const nextStory = () => {
        if (currentStoryIndex < stories.length - 1) {
            setCurrentStoryIndex(prev => prev + 1)
            setStoryProgress(0)
        } else {
            closeViewer()
        }
    }

    const prevStory = () => {
        if (currentStoryIndex > 0) {
            setCurrentStoryIndex(prev => prev - 1)
            setStoryProgress(0)
        }
    }

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying)
    }

    // Lógica de progresso automático
    useEffect(() => {
        let interval: NodeJS.Timeout
        if (isViewerOpen && isPlaying) {
            interval = setInterval(() => {
                setStoryProgress(prev => {
                    if (prev >= 100) {
                        nextStory()
                        return 0
                    }
                    return prev + 1 // Velocidade do progresso
                })
            }, 50) // 5 segundos por story (100 * 50ms = 5000ms)
        }
        return () => clearInterval(interval)
    }, [isViewerOpen, isPlaying, currentStoryIndex])

    const currentStory = stories[currentStoryIndex]

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Header */}
            <div className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                    <Link href="/admin/eventos" className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                        <ArrowLeft size={20} className="text-slate-400" />
                    </Link>
                    <div>
                        <h1 className="font-bold text-sm flex items-center gap-2">
                            <Shield size={14} className="text-pink-500" />
                            Supervisão de Stories
                        </h1>
                        <p className="text-xs text-slate-400">Evento: {params.slug}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-xs font-medium text-green-400">Ao Vivo</span>
                </div>
            </div>

            <div className="p-6 max-w-7xl mx-auto">
                {/* Grid de Stories para Moderação Rápida */}
                <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        Todos os Stories
                        <span className="px-2 py-0.5 bg-slate-800 text-slate-400 rounded-full text-xs font-normal">
                            {stories.length}
                        </span>
                    </h2>
                    <button
                        onClick={() => openViewer(0)}
                        className="flex items-center gap-2 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-pink-500/20"
                    >
                        <PlayCircle size={18} />
                        Reproduzir Tudo
                    </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {stories.map((story, index) => (
                        <div key={story.id} className="group relative aspect-[9/16] bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-pink-500/50 transition-all">
                            <img
                                src={story.image}
                                alt={`Story de ${story.user}`}
                                className="w-full h-full object-cover"
                            />

                            {/* Overlay Info */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 opacity-100 transition-opacity flex flex-col justify-between p-3">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-[10px] font-bold border border-white/20">
                                            {story.avatar}
                                        </div>
                                        <span className="text-xs font-medium text-white shadow-black drop-shadow-md truncate max-w-[80px]">{story.user}</span>
                                    </div>
                                    {story.status === 'flagged' && (
                                        <div className="bg-yellow-500 text-black p-1 rounded-full" title="Sinalizado pela IA">
                                            <AlertTriangle size={12} />
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] text-slate-300">{story.time}</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openViewer(index)}
                                            className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-colors"
                                            title="Visualizar"
                                        >
                                            <PlayCircle size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteStory(story.id)}
                                            className="p-2 bg-red-500/80 hover:bg-red-600 backdrop-blur-sm rounded-full text-white transition-colors"
                                            title="Excluir"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Viewer Modal (Instagram Style) */}
            {isViewerOpen && currentStory && (
                <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center">
                    <div className="relative w-full max-w-md h-full md:h-[90vh] md:rounded-2xl overflow-hidden bg-black shadow-2xl border border-slate-800 flex flex-col">

                        {/* Progress Bars */}
                        <div className="absolute top-0 left-0 right-0 z-20 p-3 flex gap-1.5">
                            {stories.map((_, idx) => (
                                <div key={idx} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-white transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                                        style={{
                                            width: idx < currentStoryIndex ? '100%' :
                                                idx === currentStoryIndex ? `${storyProgress}%` : '0%'
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Header Overlay */}
                        <div className="absolute top-6 left-0 right-0 z-20 px-4 py-2 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold text-white border-2 border-white/20">
                                    {currentStory.avatar}
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm shadow-black drop-shadow-md">{currentStory.user}</p>
                                    <p className="text-slate-300 text-xs shadow-black drop-shadow-md">{currentStory.time}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={togglePlayPause}
                                    className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                                >
                                    {isPlaying ? <PauseCircle size={24} /> : <PlayCircle size={24} />}
                                </button>
                                <button
                                    onClick={closeViewer}
                                    className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <XCircle size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Main Image */}
                        <div className="flex-1 relative bg-black flex items-center justify-center">
                            <img
                                src={currentStory.image}
                                alt="Story Fullscreen"
                                className="max-w-full max-h-full object-contain"
                            />

                            {/* Click Areas for Navigation */}
                            <div className="absolute inset-0 flex">
                                <div className="w-1/3 h-full cursor-pointer" onClick={prevStory}></div>
                                <div className="w-1/3 h-full cursor-pointer" onClick={togglePlayPause}></div>
                                <div className="w-1/3 h-full cursor-pointer" onClick={nextStory}></div>
                            </div>
                        </div>

                        {/* Footer Controls */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-xs text-slate-300 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10">
                                    <span>🤖 IA: {currentStory.aiReason}</span>
                                    {currentStory.status === 'flagged' && <AlertTriangle size={12} className="text-yellow-500" />}
                                </div>

                                <button
                                    onClick={() => handleDeleteStory(currentStory.id)}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-full transition-colors backdrop-blur-md border border-red-500/30 font-medium text-sm"
                                >
                                    <Trash2 size={16} />
                                    Excluir Story
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}
