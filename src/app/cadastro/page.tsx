"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react'

export default function CadastroPage() {
    const router = useRouter()
    const [isLogin, setIsLogin] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            if (!isLogin) {
                // Registro
                if (formData.password !== formData.confirmPassword) {
                    setError('As senhas não coincidem')
                    setLoading(false)
                    return
                }

                if (formData.password.length < 6) {
                    setError('A senha deve ter no mínimo 6 caracteres')
                    setLoading(false)
                    return
                }

                // Recuperar código de afiliado se existir
                const affiliateCode = localStorage.getItem('evoria_affiliate_code')

                // Criar novo usuário (anfitrião/cliente)
                const registerRes = await fetch('/api/auth/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: formData.username,
                        email: formData.email,
                        password: formData.password,
                        affiliateCode // Enviar código de afiliado
                    })
                })

                if (!registerRes.ok) {
                    const data = await registerRes.json()
                    throw new Error(data.error || 'Erro ao criar conta')
                }
            }

            // Login (tanto para registro quanto para login direto)
            const loginRes = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                })
            })

            if (!loginRes.ok) {
                throw new Error('Credenciais inválidas')
            }

            const data = await loginRes.json()

            // Salvar token
            localStorage.setItem('evoria_token', data.token)

            // Redirecionar baseado no role e contexto
            if (data.user?.role === 'admin') {
                router.push('/admin/dashboard')
            } else {
                // Se for registro novo, vai para onboarding
                if (!isLogin) {
                    router.push('/cliente/onboarding')
                } else {
                    // Se for login, vai direto para dashboard
                    router.push('/cliente/dashboard')
                }
            }

        } catch (err: any) {
            setError(err.message || 'Erro ao processar solicitação')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo/Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Evoria.ai
                    </h1>
                    <p className="text-slate-400">
                        {isLogin ? 'Entre na sua conta' : 'Crie sua conta para continuar'}
                    </p>
                </div>

                {/* Card de Login/Cadastro */}
                <div className="bg-slate-900/50 backdrop-blur-xl border-2 border-slate-800 rounded-2xl p-8 shadow-2xl">
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Username */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Usuário
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                                <input
                                    type="text"
                                    value={formData.username}
                                    onChange={e => setFormData({ ...formData, username: e.target.value })}
                                    placeholder="Seu nome de usuário"
                                    required
                                    className="w-full pl-11 pr-4 py-3 bg-white/10 border border-slate-700 rounded-lg 
                           text-white placeholder-slate-500
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                           transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Email (apenas no cadastro) */}
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Email (opcional)
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="seu@email.com"
                                        className="w-full pl-11 pr-4 py-3 bg-white/10 border border-slate-700 rounded-lg 
                             text-white placeholder-slate-500
                             focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                             transition-all duration-200"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Senha
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="••••••••"
                                    required
                                    className="w-full pl-11 pr-12 py-3 bg-white/10 border border-slate-700 rounded-lg 
                           text-white placeholder-slate-500
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                           transition-all duration-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password (apenas no cadastro) */}
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Confirmar Senha
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.confirmPassword}
                                        onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        placeholder="••••••••"
                                        required
                                        className="w-full pl-11 pr-4 py-3 bg-white/10 border border-slate-700 rounded-lg 
                             text-white placeholder-slate-500
                             focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                             transition-all duration-200"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg
                       hover:from-purple-600 hover:to-pink-600 transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    Processando...
                                </>
                            ) : (
                                isLogin ? 'Entrar' : 'Criar Conta e Continuar'
                            )}
                        </button>
                    </form>

                    {/* Toggle Login/Cadastro */}
                    <div className="mt-6 text-center">
                        <button
                            onClick={() => {
                                setIsLogin(!isLogin)
                                setError('')
                            }}
                            className="text-purple-400 hover:text-purple-300 text-sm font-medium"
                        >
                            {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça login'}
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-slate-500 text-sm mt-6">
                    Ao continuar, você concorda com nossos Termos e Política de Privacidade
                </p>
            </div>
        </div>
    )
}
