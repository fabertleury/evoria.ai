"use client"
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { apiFetch } from '@/lib/api'

type Plan = { id: string; name: string; price: string; currency: string; bundledEvents?: number }

export default function HostPlanosPage() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [quota, setQuota] = useState(0)
  useEffect(() => {
    const load = async () => {
      const ps = await apiFetch('/admin/plans')
      const pd = await ps.json()
      setPlans(pd.plans || [])
      const qs = await apiFetch('/host/quota')
      const qd = await qs.json()
      setQuota(qd.remainingEvents || 0)
    }
    load()
  }, [])
  const buy = async (planId: string, bundledEvents?: number) => {
    const res = await apiFetch('/payments/plan/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ planId, bundledEvents }) })
    const data = await res.json()
    if (data.url) window.location.href = data.url
  }
  return (
    <main className="p-8 space-y-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold">Planos</h2>
      <div className="text-sm text-gray-600">Sua quota de eventos: {quota}</div>
      <div className="space-y-3">
        {plans.map(p => (
          <div key={p.id} className="border rounded p-3 flex items-center gap-3">
            <div className="flex-1">
              <div className="font-medium">{p.name}</div>
              <div className="text-sm text-gray-500">{p.currency} {p.price} • Eventos inclusos: {p.bundledEvents || 1}</div>
            </div>
            <Button onClick={()=>buy(p.id, p.bundledEvents)}>Comprar</Button>
          </div>
        ))}
        {!plans.length && <div className="text-sm text-gray-500">Nenhum plano disponível.</div>}
      </div>
    </main>
  )
}
