"use client"
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { setToken } from '@/lib/auth'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const submit = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) })
    const data = await res.json()
    if (data.token) {
      setToken(data.token)
      if (data.user?.role === 'admin') router.push('/admin/dashboard')
      else router.push('/anfitriao')
    }
  }
  return (
    <main className="p-8 space-y-4 max-w-sm mx-auto">
      <h2 className="text-2xl font-semibold">Login Admin</h2>
      <Input value={username} onChange={e=>setUsername(e.target.value)} placeholder="username" />
      <Input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" />
      <Button onClick={submit}>Entrar</Button>
    </main>
  )
}
