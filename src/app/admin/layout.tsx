"use client"
import Link from 'next/link'
import { getToken } from '@/lib/clientAuth'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { apiFetch } from '@/lib/api'
import LogoEvoria from '@/components/brand/LogoEvoria'
import {
  LayoutDashboard,
  Users,
  Package,
  Calendar,
  Settings,
  FileText,
  Palette,
  LogOut,
  X
} from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const storedToken = getToken()
    setToken(storedToken)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const guard = async () => {
      if (!token) { router.push('/login'); return }
      const res = await apiFetch('/auth/me')
      const data = await res.json()
      if (!data.user || data.user.role !== 'admin') router.push('/login')
    }
    guard()
  }, [token, mounted, router])

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'text-purple-400' },
    { href: '/admin/landing-page', label: 'Landing Page', icon: FileText, color: 'text-blue-400' },
    { href: '/admin/usuarios', label: 'Clientes', icon: Users, color: 'text-cyan-400' },
    { href: '/admin/planos', label: 'Planos', icon: Package, color: 'text-pink-400' },
    { href: '/admin/eventos', label: 'Eventos', icon: Calendar, color: 'text-green-400' },
    { href: '/admin/config', label: 'Configurações', icon: Settings, color: 'text-amber-400' },
    { href: '/admin/relatorios', label: 'Relatórios', icon: FileText, color: 'text-orange-400' },
    { href: '/admin/whitelabel', label: 'White-Label', icon: Palette, color: 'text-rose-400' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Always visible on desktop, overlay on mobile */}
      <aside
        className={`fixed left-0 top-0 h-full bg-slate-900/95 backdrop-blur-xl border-r border-slate-800 transition-transform duration-300 z-50 w-72
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo Header */}
          <div className="flex items-center justify-between mb-8">
            <LogoEvoria height={28} />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-slate-400" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 shadow-lg shadow-purple-500/10'
                    : 'hover:bg-slate-800/50 border border-transparent'
                    }`}
                >
                  <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? item.color : 'text-slate-400'}`} />
                  <span className={`font-medium ${isActive ? 'text-white' : 'text-slate-300'}`}>
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </nav>

          {/* Logout Button */}
          {token && (
            <button
              onClick={() => {
                localStorage.removeItem('token')
                router.push('/login')
              }}
              className="mt-4 w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 transition-all duration-200"
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              <span className="font-medium">Sair do Painel</span>
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-72">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800">
          <div className="flex items-center justify-between px-4 lg:px-6 py-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <svg className="h-6 w-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Logo on mobile */}
            <div className="lg:hidden">
              <LogoEvoria height={24} />
            </div>

            {/* Right side links */}
            <div className="flex items-center gap-4 ml-auto">
              <Link
                href="/"
                className="text-sm text-slate-400 hover:text-white transition-colors hidden sm:block"
              >
                Ver site
              </Link>
              <Link
                href="/login"
                className="text-sm text-slate-400 hover:text-white transition-colors hidden sm:block"
              >
                Trocar usuário
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main>
          {children}
        </main>
      </div>
    </div>
  )
}