"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Shield, SkipForward, Pause, Play, XCircle, AlertOctagon, Monitor } from 'lucide-react'

export default function AdminScreenSupervisionPage({ params }: { params: { slug: string } }) {
    const [isPlaying, setIsPlaying] = useState(true)
    const [currentImage, setCurrentImage] = useState(0)

    const images = [
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920&q=80',
        'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1920&q=80',
        'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80'
    ]

    useEffect(() => {
        let interval: NodeJS.Timeout
        if (isPlaying) {
            interval = setInterval(() => {
                setCurrentImage((prev) => (prev + 1) % images.length)
            }, 5000)
        }
        return () => clearInterval(interval)
    }, [isPlaying, images.length])

    const handleSkip = () => {
        setCurrentImage((prev) => (prev + 1) % images.length)
    }

    const handleEmergency = () => {
        if (confirm('Ativar MODO DE EMERGÊNCIA? Isso irá ocultar todas as fotos e exibir apenas o logo do evento.')) {
            setIsPlaying(false)
            alert('Modo de emergência ativado. Telão bloqueado.')
        }
    }

    return (
        <div className="h-screen bg-black overflow-hidden relative flex flex-col">
            {/* Admin Header Overlay */}
            <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link href="/admin/eventos" className="p-2 bg-black/50 hover:bg-slate-800 rounded-full text-white transition-colors backdrop-blur-sm">
                        <ArrowLeft size={20} />
                    </Link>
                    <div className="bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                        <h1 className="font-bold text-sm text-white flex items-center gap-2">
                            <Monitor size={14} className="text-pink-500" />
                            Supervisão de Telão
                        </h1>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                    <span className={`flex h-2 w-2 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></span>
                    <span className="text-xs font-medium text-white">{isPlaying ? 'Reproduzindo' : 'Pausado'}</span>
                </div>
            </div>

            {/* Screen Content */}
            <div className="flex-1 relative flex items-center justify-center">
                <img
                    src={images[currentImage]}
                    alt="Telão"
                    className="max-w-full max-h-full object-contain transition-opacity duration-500"
                />

                {/* Info Overlay */}
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-black/60 px-4 py-2 rounded-full backdrop-blur-md">
                    <p className="text-white text-sm font-medium">Exibindo foto {currentImage + 1} de {images.length}</p>
                </div>
            </div>

            {/* Admin Controls Footer */}
            <div className="bg-slate-900 border-t border-slate-800 p-4 z-50">
                <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors border border-slate-700"
                        >
                            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                            {isPlaying ? 'Pausar' : 'Retomar'}
                        </button>
                        <button
                            onClick={handleSkip}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors border border-slate-700"
                        >
                            <SkipForward size={18} />
                            Pular Foto
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => alert('Tela limpa. Exibindo QR Code padrão.')}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-yellow-400 rounded-lg font-medium transition-colors border border-slate-700"
                        >
                            <XCircle size={18} />
                            Limpar Tela
                        </button>
                        <button
                            onClick={handleEmergency}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg font-medium transition-colors border border-red-500/30"
                        >
                            <AlertOctagon size={18} />
                            Emergência
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
