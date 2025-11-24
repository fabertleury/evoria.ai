"use client"
import { useState } from 'react'
import { Search, Filter, MoreVertical, User, Shield, Mail, Calendar, Phone, PartyPopper, Edit, Trash, Eye, X, CheckCircle, BarChart3, Smartphone, Monitor } from 'lucide-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as Dialog from '@radix-ui/react-dialog'

// Tipo para usuário
type UserType = {
    id: number
    name: string
    email: string
    role: string
    status: string
    joined: string
    whatsapp: string | null
    eventType: string | null
    eventDate: string | null
    metrics: {
        stories: number
        interactions: number
        modules: ('feed' | 'screen')[]
    }
}

export default function AdminUsuariosPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
    const [isViewOpen, setIsViewOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    // Mock data atualizado com métricas
    const [users, setUsers] = useState<UserType[]>([
        {
            id: 1,
            name: 'Admin User',
            email: 'admin@evoria.ai',
            role: 'admin',
            status: 'active',
            joined: '2023-10-01',
            whatsapp: '11999999999',
            eventType: null,
            eventDate: null,
            metrics: { stories: 0, interactions: 0, modules: [] }
        },
        {
            id: 2,
            name: 'Cliente Teste',
            email: 'cliente@teste.com',
            role: 'anfitriao',
            status: 'active',
            joined: '2023-11-15',
            whatsapp: '11988888888',
            eventType: 'wedding',
            eventDate: '2024-05-20',
            metrics: { stories: 150, interactions: 450, modules: ['feed', 'screen'] }
        },
        {
            id: 3,
            name: 'Novo Usuário',
            email: 'novo@email.com',
            role: 'anfitriao',
            status: 'pending',
            joined: '2023-11-18',
            whatsapp: '11977777777',
            eventType: 'birthday',
            eventDate: '2024-01-15',
            metrics: { stories: 45, interactions: 120, modules: ['feed'] }
        },
    ])

    const getEventIcon = (type: string) => {
        switch (type) {
            case 'birthday': return '🎂';
            case 'wedding': return '💍';
            case 'corporate': return '💼';
            default: return '📅';
        }
    }

    const handleView = (user: UserType) => {
        setSelectedUser(user)
        setIsViewOpen(true)
    }

    const handleEdit = (user: UserType) => {
        setSelectedUser(user)
        setIsEditOpen(true)
    }

    const handleDelete = (user: UserType) => {
        setSelectedUser(user)
        setIsDeleteOpen(true)
    }

    const confirmDelete = () => {
        if (selectedUser) {
            setUsers(users.filter(u => u.id !== selectedUser.id))
            setIsDeleteOpen(false)
            setSelectedUser(null)
        }
    }

    const saveEdit = (e: React.FormEvent) => {
        e.preventDefault()
        // Lógica de salvar (mock)
        setIsEditOpen(false)
        setSelectedUser(null)
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Gerenciar Usuários</h1>
                    <p className="text-slate-400">Visualize e gerencie todos os usuários e leads</p>
                </div>
                <button className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Exportar Leads
                </button>
            </div>

            {/* Filters & Search */}
            <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por nome, email ou telefone..."
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors">
                    <Filter size={18} />
                    Filtros
                </button>
            </div>

            {/* Users Table */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-800/50 border-b border-slate-700">
                                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Usuário</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Contato</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Evento / Lead</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-white">{user.name}</p>
                                                <div className="flex items-center gap-1 text-xs text-slate-500">
                                                    <Calendar size={12} />
                                                    Cadastrado em {new Date(user.joined).toLocaleDateString('pt-BR')}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-sm text-slate-300">
                                                <Mail size={14} className="text-slate-500" />
                                                {user.email}
                                            </div>
                                            {user.whatsapp && (
                                                <div className="flex items-center gap-2 text-sm text-slate-300">
                                                    <Phone size={14} className="text-green-500" />
                                                    {user.whatsapp}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.eventType ? (
                                            <div className="flex flex-col">
                                                <span className="text-sm text-white flex items-center gap-1">
                                                    {getEventIcon(user.eventType)}
                                                    {user.eventType === 'birthday' ? 'Aniversário' :
                                                        user.eventType === 'wedding' ? 'Casamento' :
                                                            user.eventType === 'corporate' ? 'Corporativo' : 'Outro'}
                                                </span>
                                                <span className="text-xs text-slate-500">
                                                    Data: {new Date(user.eventDate!).toLocaleDateString('pt-BR')}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-slate-600 italic">Sem dados de evento</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${user.status === 'active'
                                            ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                            : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                            }`}>
                                            {user.status === 'active' ? 'Ativo' : 'Pendente'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <DropdownMenu.Root>
                                            <DropdownMenu.Trigger asChild>
                                                <button className="text-slate-400 hover:text-white p-2 hover:bg-slate-800 rounded-lg transition-colors outline-none focus:ring-2 focus:ring-purple-500/50">
                                                    <MoreVertical size={18} />
                                                </button>
                                            </DropdownMenu.Trigger>

                                            <DropdownMenu.Portal>
                                                <DropdownMenu.Content
                                                    className="min-w-[160px] bg-slate-900 border border-slate-800 rounded-lg shadow-xl p-1 z-50 animate-in fade-in zoom-in-95 duration-200"
                                                    sideOffset={5}
                                                    align="end"
                                                >
                                                    <DropdownMenu.Item
                                                        onClick={() => handleView(user)}
                                                        className="flex items-center gap-2 px-2 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-md cursor-pointer outline-none"
                                                    >
                                                        <Eye size={16} />
                                                        Ver Detalhes
                                                    </DropdownMenu.Item>
                                                    <DropdownMenu.Item
                                                        onClick={() => handleEdit(user)}
                                                        className="flex items-center gap-2 px-2 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-md cursor-pointer outline-none"
                                                    >
                                                        <Edit size={16} />
                                                        Editar Usuário
                                                    </DropdownMenu.Item>
                                                    <DropdownMenu.Separator className="h-px bg-slate-800 my-1" />
                                                    <DropdownMenu.Item
                                                        onClick={() => handleDelete(user)}
                                                        className="flex items-center gap-2 px-2 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-md cursor-pointer outline-none"
                                                    >
                                                        <Trash size={16} />
                                                        Excluir
                                                    </DropdownMenu.Item>
                                                </DropdownMenu.Content>
                                            </DropdownMenu.Portal>
                                        </DropdownMenu.Root>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal: Ver Detalhes */}
            <Dialog.Root open={isViewOpen} onOpenChange={setIsViewOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-200" />
                    <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-xl bg-slate-900 border border-slate-800 p-6 shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between mb-6">
                            <Dialog.Title className="text-xl font-bold text-white flex items-center gap-2">
                                <User className="text-purple-400" />
                                Detalhes do Usuário
                            </Dialog.Title>
                            <Dialog.Close className="text-slate-400 hover:text-white">
                                <X size={20} />
                            </Dialog.Close>
                        </div>

                        {selectedUser && (
                            <div className="space-y-6">
                                {/* Info Básica */}
                                <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl font-bold text-white">
                                        {selectedUser.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-lg">{selectedUser.name}</h3>
                                        <p className="text-slate-400 text-sm">{selectedUser.email}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs px-2 py-0.5 bg-slate-700 rounded-full text-slate-300">
                                                {selectedUser.role}
                                            </span>
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${selectedUser.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                                {selectedUser.status === 'active' ? 'Ativo' : 'Pendente'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Métricas do Evento */}
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">Métricas do Evento</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-slate-800/30 border border-slate-700/50 rounded-lg">
                                            <div className="flex items-center gap-2 text-slate-400 mb-2">
                                                <Smartphone size={16} className="text-pink-400" />
                                                <span className="text-xs">Stories Postados</span>
                                            </div>
                                            <p className="text-2xl font-bold text-white">{selectedUser.metrics.stories}</p>
                                        </div>
                                        <div className="p-4 bg-slate-800/30 border border-slate-700/50 rounded-lg">
                                            <div className="flex items-center gap-2 text-slate-400 mb-2">
                                                <BarChart3 size={16} className="text-cyan-400" />
                                                <span className="text-xs">Interações Totais</span>
                                            </div>
                                            <p className="text-2xl font-bold text-white">{selectedUser.metrics.interactions}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Módulos Contratados */}
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">Módulos Contratados</h4>
                                    <div className="flex gap-3">
                                        <div className={`flex-1 p-3 rounded-lg border flex items-center gap-3 ${selectedUser.metrics.modules.includes('feed')
                                            ? 'bg-purple-500/10 border-purple-500/30 text-white'
                                            : 'bg-slate-800/30 border-slate-700/50 text-slate-500 opacity-50'
                                            }`}>
                                            <Smartphone size={20} />
                                            <div>
                                                <p className="font-medium text-sm">Feed Social</p>
                                                <p className="text-xs opacity-70">{selectedUser.metrics.modules.includes('feed') ? 'Ativo' : 'Não contratado'}</p>
                                            </div>
                                            {selectedUser.metrics.modules.includes('feed') && <CheckCircle size={16} className="ml-auto text-purple-400" />}
                                        </div>

                                        <div className={`flex-1 p-3 rounded-lg border flex items-center gap-3 ${selectedUser.metrics.modules.includes('screen')
                                            ? 'bg-blue-500/10 border-blue-500/30 text-white'
                                            : 'bg-slate-800/30 border-slate-700/50 text-slate-500 opacity-50'
                                            }`}>
                                            <Monitor size={20} />
                                            <div>
                                                <p className="font-medium text-sm">Telão Interativo</p>
                                                <p className="text-xs opacity-70">{selectedUser.metrics.modules.includes('screen') ? 'Ativo' : 'Não contratado'}</p>
                                            </div>
                                            {selectedUser.metrics.modules.includes('screen') && <CheckCircle size={16} className="ml-auto text-blue-400" />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

            {/* Modal: Editar Usuário */}
            <Dialog.Root open={isEditOpen} onOpenChange={setIsEditOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
                    <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] rounded-xl bg-slate-900 border border-slate-800 p-6 shadow-2xl">
                        <Dialog.Title className="text-xl font-bold text-white mb-4">Editar Usuário</Dialog.Title>
                        {selectedUser && (
                            <form onSubmit={saveEdit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Nome</label>
                                    <input type="text" defaultValue={selectedUser.name} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                                    <input type="email" defaultValue={selectedUser.email} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">WhatsApp</label>
                                    <input type="text" defaultValue={selectedUser.whatsapp || ''} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white" />
                                </div>
                                <div className="flex justify-end gap-3 mt-6">
                                    <button type="button" onClick={() => setIsEditOpen(false)} className="px-4 py-2 text-slate-300 hover:text-white">Cancelar</button>
                                    <button type="submit" className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg">Salvar Alterações</button>
                                </div>
                            </form>
                        )}
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

            {/* Modal: Excluir Usuário */}
            <Dialog.Root open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
                    <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-sm translate-x-[-50%] translate-y-[-50%] rounded-xl bg-slate-900 border border-slate-800 p-6 shadow-2xl">
                        <Dialog.Title className="text-xl font-bold text-white mb-2">Excluir Usuário?</Dialog.Title>
                        <Dialog.Description className="text-slate-400 mb-6">
                            Tem certeza que deseja excluir <strong>{selectedUser?.name}</strong>? Esta ação não pode ser desfeita.
                        </Dialog.Description>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setIsDeleteOpen(false)} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg">Cancelar</button>
                            <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg">Excluir Permanentemente</button>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    )
}