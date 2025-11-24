"use client"
import { useState } from 'react'
import { Save, Globe, Mail, Shield, Bell, Database } from 'lucide-react'

export default function AdminConfigPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Configurações do Sistema</h1>
                    <p className="text-slate-400">Gerencie as configurações globais da plataforma</p>
                </div>
                <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-lg shadow-purple-500/20">
                    <Save size={18} />
                    Salvar Alterações
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sidebar Navigation (Fake) */}
                <div className="lg:col-span-1 space-y-2">
                    {[
                        { icon: Globe, label: 'Geral', active: true },
                        { icon: Mail, label: 'Email & Notificações', active: false },
                        { icon: Shield, label: 'Segurança', active: false },
                        { icon: Database, label: 'Banco de Dados', active: false },
                        { icon: Bell, label: 'Integrações', active: false },
                    ].map((item, idx) => (
                        <button
                            key={idx}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${item.active
                                    ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Settings Form */}
                <div className="lg:col-span-2 space-y-6">
                    {/* General Settings */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <Globe size={20} className="text-purple-500" />
                            Informações Gerais
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Nome da Plataforma</label>
                                <input
                                    type="text"
                                    defaultValue="Evoria.ai"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">URL do Site</label>
                                <input
                                    type="text"
                                    defaultValue="https://evoria.ai"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Email de Suporte</label>
                                <input
                                    type="email"
                                    defaultValue="suporte@evoria.ai"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Maintenance Mode */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Modo de Manutenção</h3>
                                <p className="text-sm text-slate-400">Desativar o acesso público temporariamente</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}