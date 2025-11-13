"use client"
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { apiFetch } from '@/lib/api'

type Org = { id: string; name: string; slug: string; domain?: string; logoUrl?: string; primaryColor?: string; billingModel: 'monthly'|'per_event'; monthlyPrice?: string; perEventPrice?: string }

export default function AdminWhiteLabelPage() {
  const [list, setList] = useState<Org[]>([])
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [domain, setDomain] = useState('')
  const [logoUrl, setLogoUrl] = useState('')
  const [primaryColor, setPrimaryColor] = useState('')
  const [billingModel, setBillingModel] = useState<'monthly'|'per_event'>('monthly')
  const [monthlyPrice, setMonthlyPrice] = useState('499')
  const [perEventPrice, setPerEventPrice] = useState('5')
  const load = async () => {
    const res = await apiFetch('/organizations')
    const data = await res.json()
    setList(data.organizations || [])
  }
  useEffect(() => { load() }, [])
  const create = async () => {
    await apiFetch('/organizations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, slug, domain, logoUrl, primaryColor, billingModel, monthlyPrice: parseFloat(monthlyPrice||'0'), perEventPrice: parseFloat(perEventPrice||'0') }) })
    setName(''); setSlug(''); setDomain(''); setLogoUrl(''); setPrimaryColor('');
    await load()
  }
  return (
    <main className="p-8 space-y-6 max-w-2xl">
      <h2 className="text-2xl font-semibold">White-Label</h2>
      <div className="grid grid-cols-2 gap-3">
        <Input value={name} onChange={e=>setName(e.target.value)} placeholder="Nome da empresa" />
        <Input value={slug} onChange={e=>setSlug(e.target.value)} placeholder="Slug" />
        <Input value={domain} onChange={e=>setDomain(e.target.value)} placeholder="Domínio" />
        <Input value={logoUrl} onChange={e=>setLogoUrl(e.target.value)} placeholder="Logo URL" />
        <Input value={primaryColor} onChange={e=>setPrimaryColor(e.target.value)} placeholder="Cor primária" />
        <select value={billingModel} onChange={e=>setBillingModel(e.target.value as any)} className="border rounded px-2">
          <option value="monthly">Mensal (R$499/mês)</option>
          <option value="per_event">Por evento (R$5/evento)</option>
        </select>
        <Input value={monthlyPrice} onChange={e=>setMonthlyPrice(e.target.value)} placeholder="Preço mensal" />
        <Input value={perEventPrice} onChange={e=>setPerEventPrice(e.target.value)} placeholder="Preço por evento" />
        <Button onClick={create}>Criar parceiro</Button>
      </div>
      <div className="space-y-3">
        {list.map(o => (
          <div key={o.id} className="border rounded p-3">
            <div className="font-medium">{o.name}</div>
            <div className="text-sm text-gray-500">{o.domain || '-'}</div>
            <div className="text-sm">Modelo: {o.billingModel} • Mensal: {o.monthlyPrice || '-'} • Por evento: {o.perEventPrice || '-'}</div>
          </div>
        ))}
        {!list.length && <div className="text-sm text-gray-500">Nenhum parceiro.</div>}
      </div>
    </main>
  )
}
