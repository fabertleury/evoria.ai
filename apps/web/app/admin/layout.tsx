"use client"
import Link from 'next/link'
import { getToken } from '@/lib/auth'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { apiFetch } from '@/lib/api'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const token = getToken()
  const router = useRouter()
  useEffect(() => {
    const guard = async () => {
      if (!token) { router.push('/admin/login'); return }
      const res = await apiFetch('/auth/me')
      const data = await res.json()
      if (!data.user || data.user.role !== 'admin') router.push('/admin/login')
    }
    guard()
  }, [])
  return (
    <div>
      <nav className="flex gap-4 p-4 border-b">
        <Link href="/admin/dashboard">Dashboard</Link>
        <Link href="/admin/usuarios">Usuários</Link>
        <Link href="/admin/planos">Planos</Link>
        <Link href="/admin/eventos">Eventos</Link>
        <Link href="/admin/config">Configurações</Link>
        <Link href="/admin/relatorios">Relatórios</Link>
        <Link href="/admin/whitelabel">White-Label</Link>
        {!token && <Link href="/admin/login" className="ml-auto">Login</Link>}
      </nav>
      {children}
    </div>
  )
}
