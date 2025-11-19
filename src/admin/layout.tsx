"use client"
import Link from 'next/link'
import { getToken } from '@/lib/clientAuth'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { apiFetch } from '@/lib/api'
import {
  LayoutDashboard,
  Users,
  Package,
  Calendar,
  Settings,
  FileText,
  Palette,
  LogOut,
  Menu,
  X
} from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const token = getToken()
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    const guard = async () => {
      if (!token) { router.push('/admin/login'); return }
      const res = await apiFetch('/auth/me')
      const data = await res.json()
      if (!data.user || data.user.role !== 'admin') router.push('/admin/login')
    }
    guard()
  }, [])

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'text-purple-400' },
    { href: '/admin/usuarios', label: 'Usuários', icon: Users, color: 'text-cyan-400' },
    { href: '/admin/planos', label: 'Planos', icon: Package, color: 'text-pink-400' },
    { href: '/admin/eventos', label: 'Eventos', icon: Calendar, color: 'text-green-400' },
    { href: '/admin/config', label: 'Configurações', icon: Settings, color: 'text-amber-400' },
    { href: '/admin/relatorios', label: 'Relatórios', icon: FileText, color: 'text-blue-400' },
    { href: '/admin/whitelabel', label: 'White-Label', icon: Palette, color: 'text-rose-400' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-slate-900/80 backdrop-blur-xl border-r border-slate-800 transition-all duration-300 z-50 ${sidebarOpen ? 'w-64' : 'w-0 -translate-x-full'
          }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Evoria Admin
            </h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-slate-400" />
            </button>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                      ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 shadow-lg shadow-purple-500/10'
                      : 'hover:bg-slate-800/50 border border-transparent'
                    }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? item.color : 'text-slate-400'}`} />
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
                router.push('/admin/login')
              }}
              className="mt-8 w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 transition-all duration-200"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Sair</span>
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
        {/* Top Bar */}
        <div className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 px-6 py-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Menu className="h-6 w-6 text-slate-400" />
          </button>
        </div>

        {/* Page Content */}
        <div className="min-h-screen">
          {children}
        </div>
      </div>
    </div>
  )
}
