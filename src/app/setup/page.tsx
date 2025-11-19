"use client"
import { useState } from 'react'

export default function CreateAdminPage() {
    const [username, setUsername] = useState('admin')
    const [password, setPassword] = useState('admin123')
    const [message, setMessage] = useState('')
    const [users, setUsers] = useState<any[]>([])

    async function createAdmin() {
        setMessage('Criando usuário...')
        try {
            const res = await fetch('/api/admin/create-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })
            const data = await res.json()

            if (res.ok) {
                setMessage(`✅ Usuário criado com sucesso! Username: ${data.user.username}, Role: ${data.user.role}`)
            } else {
                setMessage(`❌ Erro: ${data.error}`)
            }
        } catch (error: any) {
            setMessage(`❌ Erro: ${error.message}`)
        }
    }

    async function listUsers() {
        setMessage('Carregando usuários...')
        try {
            const res = await fetch('/api/admin/create-user')
            const data = await res.json()

            if (res.ok) {
                setUsers(data.users)
                setMessage(`📋 ${data.users.length} usuário(s) encontrado(s)`)
            } else {
                setMessage(`❌ Erro: ${data.error}`)
            }
        } catch (error: any) {
            setMessage(`❌ Erro: ${error.message}`)
        }
    }

    async function resetPassword() {
        if (!username || !password) {
            setMessage('❌ Preencha username e password')
            return
        }

        setMessage('Resetando senha...')
        try {
            const res = await fetch('/api/admin/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, newPassword: password })
            })
            const data = await res.json()

            if (res.ok) {
                setMessage(`✅ Senha resetada com sucesso! Username: ${data.user.username} agora tem a nova senha definida.`)
            } else {
                setMessage(`❌ Erro: ${data.error}`)
            }
        } catch (error: any) {
            setMessage(`❌ Erro: ${error.message}`)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-xl">
                    <h1 className="text-3xl font-bold text-white mb-2">Setup - Gerenciar Usuários</h1>
                    <p className="text-slate-400 mb-8">Crie novos usuários ou resete senhas existentes</p>

                    <div className="space-y-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 bg-white/10 border border-slate-700 rounded-lg 
                         text-white placeholder-slate-500
                         focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Digite o username"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                            <input
                                type="text"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-white/10 border border-slate-700 rounded-lg 
                         text-white placeholder-slate-500
                         focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Digite a senha"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                        <button
                            onClick={createAdmin}
                            className="px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 
                       hover:from-purple-600 hover:to-pink-600 
                       text-white font-semibold rounded-lg 
                       transition-all duration-200 shadow-lg shadow-purple-500/25"
                        >
                            Criar Novo
                        </button>

                        <button
                            onClick={resetPassword}
                            className="px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 
                       hover:from-amber-600 hover:to-orange-600 
                       text-white font-semibold rounded-lg 
                       transition-all duration-200 shadow-lg shadow-amber-500/25"
                        >
                            Resetar Senha
                        </button>

                        <button
                            onClick={listUsers}
                            className="px-4 py-3 bg-slate-700 hover:bg-slate-600 
                       text-white font-semibold rounded-lg 
                       transition-all duration-200"
                        >
                            Listar Usuários
                        </button>
                    </div>

                    {message && (
                        <div className="bg-slate-800/50 border border-slate-700 text-white px-4 py-3 rounded-lg mb-4">
                            {message}
                        </div>
                    )}

                    {users.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-white mb-3">Usuários no Sistema:</h3>
                            <div className="space-y-2">
                                {users.map((user) => (
                                    <div key={user.id} className="bg-slate-800/30 border border-slate-700 rounded-lg p-4">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <span className="text-white font-medium text-lg">{user.username}</span>
                                                <span className="ml-3 text-xs px-2 py-1 rounded bg-purple-500/20 text-purple-300">
                                                    {user.role}
                                                </span>
                                            </div>
                                            <div className="text-xs text-slate-500">ID: {user.id.slice(0, 8)}...</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-8 pt-6 border-t border-slate-800">
                        <a
                            href="/login"
                            className="text-sm text-slate-400 hover:text-white transition-colors"
                        >
                            ← Voltar para o login
                        </a>
                    </div>
                </div>

                {/* Instruções */}
                <div className="mt-6 bg-blue-900/20 border border-blue-800/30 rounded-xl p-6">
                    <h3 className="text-blue-300 font-semibold mb-3">💡 Como usar:</h3>
                    <ul className="text-blue-200 text-sm space-y-2">
                        <li>• <strong>Criar Novo:</strong> Cria um novo usuário com o username e senha informados</li>
                        <li>• <strong>Resetar Senha:</strong> Atualiza a senha de um usuário existente</li>
                        <li>• <strong>Listar Usuários:</strong> Mostra todos os usuários cadastrados</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
