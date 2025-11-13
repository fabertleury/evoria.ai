"use client"
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { apiFetch } from '@/lib/api'

type Plan = { id: string; name: string; price: string; currency: string; modules: string[] }

export default function AdminPlanosPage() {
  const [list, setList] = useState<Plan[]>([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('0')
  const [modules, setModules] = useState<string[]>([])
  const load = async () => {
    const res = await apiFetch('/admin/plans')
    const data = await res.json()
    setList(data.plans || [])
  }
  useEffect(() => { load() }, [])
  const save = async () => {
    await apiFetch('/admin/plans', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, price: parseFloat(price || '0'), currency: 'BRL', modules }) })
    setName(''); setPrice('0'); setModules([])
    await load()
  }
  return (
    <main className="p-8 space-y-6">
      <h2 className="text-2xl font-semibold">Planos</h2>
      <div className="space-y-2 max-w-md">
        <Input value={name} onChange={e=>setName(e.target.value)} placeholder="Nome do plano" />
        <Input value={price} onChange={e=>setPrice(e.target.value)} placeholder="Preço" />
        <div className="flex gap-3">
          <Button onClick={()=>setModules(prev=> prev.includes('screen') ? prev.filter(m=>m!=='screen') : [...prev,'screen'])}>Telão</Button>
          <Button onClick={()=>setModules(prev=> prev.includes('feed') ? prev.filter(m=>m!=='feed') : [...prev,'feed'])}>Feed</Button>
        </div>
        <Button onClick={save}>Salvar plano</Button>
      </div>
      <div className="space-y-3">
        {list.map(p => (
          <div key={p.id} className="border rounded p-3">
            <div className="font-medium">{p.name}</div>
            <div className="text-sm text-gray-500">{p.currency} {p.price}</div>
            <div className="text-sm">Módulos: {p.modules.join(', ')}</div>
          </div>
        ))}
        {!list.length && <div className="text-sm text-gray-500">Sem planos.</div>}
      </div>
    </main>
  )
}
