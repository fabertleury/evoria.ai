"use client"
import { useEffect, useState } from 'react'
import { apiFetch } from '@/lib/api'

type User = { id: string; username: string; role: string }

export default function AdminUsuariosPage() {
  const [list, setList] = useState<User[]>([])
  useEffect(() => {
    const load = async () => {
      const res = await apiFetch('/admin/users')
      const data = await res.json()
      setList(data.users || [])
    }
    load()
  }, [])
  return (
    <main className="p-8 space-y-6">
      <h2 className="text-2xl font-semibold">Usuários</h2>
      <div className="space-y-3">
        {list.map(u => (
          <div key={u.id} className="border rounded p-3">
            <div>{u.username}</div>
            <div className="text-sm text-gray-500">{u.role}</div>
          </div>
        ))}
        {!list.length && <div className="text-sm text-gray-500">Sem usuários.</div>}
      </div>
    </main>
  )
}
