"use client"
import { useEffect, useState } from 'react'
import { apiFetch } from '@/lib/api'

export default function AdminDashboardPage() {
  const [users, setUsers] = useState<number>(0)
  const [events, setEvents] = useState<number>(0)
  useEffect(() => {
    const load = async () => {
      const u = await apiFetch('/admin/users')
      const e = await apiFetch('/admin/events')
      const ud = await u.json()
      const ed = await e.json()
      setUsers((ud.users || []).length)
      setEvents((ed.events || []).length)
    }
    load()
  }, [])
  return (
    <main className="p-8 space-y-6">
      <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
      <div className="grid grid-cols-2 gap-6 max-w-xl">
        <div className="border rounded p-4">
          <div className="text-sm text-gray-500">Usuários</div>
          <div className="text-3xl font-bold">{users}</div>
        </div>
        <div className="border rounded p-4">
          <div className="text-sm text-gray-500">Eventos</div>
          <div className="text-3xl font-bold">{events}</div>
        </div>
      </div>
    </main>
  )
}
