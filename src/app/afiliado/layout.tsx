"use client"
import { ReactNode, useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
    LayoutDashboard,
    Users,
    DollarSign,
    Settings,
    LogOut,
    Menu,
    X,
    Wallet
} from 'lucide-react'

export default function AfiliadoLayout({ children }: { children: ReactNode }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const pathname = usePathname()
    const router = useRouter()

    // Verificar autenticação (simples)
    useEffect(() => {
        const token = localStorage.getItem('evoria_token')
        // Idealmente verificar se o usuário tem role 'afiliado' ou se habilitou o programa
        if (!token) {
            router.push('/login')
        }
    }, [router])

    const menuItems = [
        { href: '/afiliado/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/afiliado/indicacoes', label: 'Minhas Indicações', icon: Users },
        { href: '/afiliado/financeiro', label: 'Financeiro & Saques', icon: Wallet },
        { href: '/afiliado/config', label: 'Configurações', icon: Settings },
    ]

    const handleLogout = () => {
        localStorage.removeItem('evoria_token')
        localStorage.removeItem('evoria_user_profile')
        router.push('/login')
    }

    return (
        <div className="h-screen bg-slate-950 flex overflow-hidden">
            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-slate-900/50 border-r border-slate-800 backdrop-blur-xl transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 flex flex-col
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="h-full flex flex-col p-6">
                    {/* Logo */}
                    <div className="flex items-center gap-2 mb-10 px-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-green-500/20">
                            $
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">Evoria<span className="text-green-400">Partners</span></span>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="md:hidden ml-auto text-slate-400"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-2 flex-1">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${isActive
                                        ? 'bg-green-500/10 text-green-400 font-semibold border border-green-500/20 shadow-lg shadow-green-500/5'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                                        }`}
                                >
                                    <item.icon size={20} className={isActive ? 'text-green-400' : 'text-slate-500 group-hover:text-white transition-colors'} />
                                    {item.label}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* User Profile / Logout */}
                    <div className="pt-6 border-t border-slate-800 mt-6">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all group"
                        >
                            <LogOut size={20} className="group-hover:text-red-400 transition-colors" />
                            <span className="font-medium">Sair da Conta</span>
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
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                            >
                                <Menu size={24} />
                            </button>
                            <div className="lg:hidden flex items-center gap-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center font-bold text-white">
                                    $
                                </div>
                                <span className="font-bold text-white">Parceiros</span>
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
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-xs font-bold text-white">
                                    AF
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
