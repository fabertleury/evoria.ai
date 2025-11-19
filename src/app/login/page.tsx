"use client"
import { useState } from 'react'
import LogoEvoria from '@/components/brand/LogoEvoria'

export default function LoginPage() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const form = e.currentTarget
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement).value

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email, password })
    })

    if (res.ok) {
      const data = await res.json()

      // Salva o token no localStorage
      if (data.token) {
        localStorage.setItem('evoria_token', data.token)
      }

      // Redireciona baseado no role
      if (data.user?.role === 'admin') {
        window.location.href = '/admin/dashboard'
      } else if (data.user?.role === 'anfitriao') {
        window.location.href = '/anfitriao'
      } else {
        window.location.href = '/'
      }
      return
    }

    setLoading(false)
    setError('Credenciais inválidas')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <LogoEvoria height={32} />
        </div>

        {/* Card de Login */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-xl">
          <h1 className="text-2xl font-bold text-white mb-2">Bem-vindo de volta</h1>
          <p className="text-slate-400 mb-8">Entre com suas credenciais para acessar o sistema</p>

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email ou Usuário
              </label>
              <input
                id="email"
                name="email"
                type="text"
                required
                placeholder="seu@email.com"
                className="w-full px-4 py-3 bg-white/10 border border-slate-700 rounded-lg 
                         text-white placeholder-slate-500
                         focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                         transition-all duration-200"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white/10 border border-slate-700 rounded-lg 
                         text-white placeholder-slate-500
                         focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                         transition-all duration-200"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 
                       hover:from-purple-600 hover:to-pink-600 
                       text-white font-semibold rounded-lg 
                       transition-all duration-200 
                       disabled:opacity-50 disabled:cursor-not-allowed
                       shadow-lg shadow-purple-500/25"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-slate-400 hover:text-white transition-colors">
              ← Voltar para o site
            </a>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm mt-8">
          © 2025 Evoria.ai - Todos os direitos reservados
        </p>
      </div>
    </div>
  )
}