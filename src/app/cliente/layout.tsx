"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    Calendar,
    Settings,
    LogOut,
    Menu,
    X,
    HelpCircle,
    PlusCircle
} from 'lucide-react'
import LogoEvoria from '@/components/brand/LogoEvoria'

export default function ClienteLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)

        // Verificar autenticação básica
        const token = localStorage.getItem('evoria_token')
        if (!token) {
            window.location.href = '/login'
        }
    }, [])

    if (!mounted) return null

    const menuItems = [
        {
            title: 'Visão Geral',
            href: '/cliente/dashboard',
            icon: LayoutDashboard
        },
        {
            title: 'Meus Eventos',
            href: '/cliente/eventos',
            icon: Calendar
        },
        {
            title: 'Novo Evento',
            href: '/cliente/novo-evento',
            icon: PlusCircle
        },
        {
            title: 'Configurações',
            href: '/cliente/config',
            icon: Settings
        },
        {
            title: 'Ajuda e Suporte',
            href: '/cliente/suporte',
            icon: HelpCircle
        }
    ]

    const handleLogout = () => {
        localStorage.removeItem('evoria_token')
        window.location.href = '/login'
    }

    return (
        <div className="h-screen bg-slate-950 text-white flex overflow-hidden">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed inset-y-0 left-0 z-50
        w-64 bg-slate-900 border-r border-slate-800
        transform transition-transform duration-200 ease-in-out
        lg:relative lg:translate-x-0 flex flex-col
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="h-full flex flex-col">
                    {/* Logo Area */}
                    <div className="h-16 flex items-center px-6 border-b border-slate-800">
                        <LogoEvoria height={24} />
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                        <div className="mb-4 px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Menu Principal
                        </div>

                        {menuItems.map((item) => {
                            const isActive = pathname === item.href
                            const Icon = item.icon

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActive
                                            ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                                            : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}
                  `}
                                >
                                    <Icon size={18} />
                                    {item.title}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* User Profile & Logout */}
                    <div className="p-4 border-t border-slate-800 bg-slate-900/50">
                        <div className="flex items-center gap-3 mb-4 px-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold">
                                CL
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">Cliente</p>
                                <p className="text-xs text-slate-500 truncate">Painel do Cliente</p>
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                            <LogOut size={16} />
                            Sair da Conta
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Bar */}
                <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800">
                    <div className="flex items-center justify-between px-4 lg:px-6 py-4">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                            >
                                <Menu size={24} />
                            </button>
                            <div className="lg:hidden">
                                <LogoEvoria height={24} />
                            </div>
                        </div>

                        <div className="flex items-center gap-4 ml-auto">
                            <Link
                                href="/"
                                className="text-sm text-slate-400 hover:text-white transition-colors hidden sm:block"
                            >
                                Ir para o site
                            </Link>
                            <div className="w-px h-4 bg-slate-800 hidden sm:block" />
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold">
                                    CL
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
