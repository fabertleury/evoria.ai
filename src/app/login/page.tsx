"use client"
import { useState } from 'react'

export default function LoginPage() {
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement).value
    const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: email, password }) })
    if (res.ok) {
      window.location.href = '/admin'
      return
    }
    setError('Credenciais inválidas')
  }

  return (
    <div style={{ maxWidth: 420, margin: '80px auto', padding: 20, border: '1px solid #1f1f2a', borderRadius: 16 }}>
      <h1 style={{ marginBottom: 18 }}>Entrar</h1>
      <form onSubmit={onSubmit}>
        <div style={{ display: 'grid', gap: 12 }}>
          <input name="email" placeholder="Email" style={{ padding: 10, borderRadius: 12, border: '1px solid #27273a' }} />
          <input name="password" type="password" placeholder="Senha" style={{ padding: 10, borderRadius: 12, border: '1px solid #27273a' }} />
          <button type="submit" style={{ padding: 10, borderRadius: 12, background: '#EC4899', color: '#0b0b12', fontWeight: 700 }}>Acessar</button>
          {error && <div style={{ color: '#EC4899' }}>{error}</div>}
        </div>
      </form>
    </div>
  )
}