"use client"
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { apiFetch } from '@/lib/api'

export default function AdminConfigPage() {
  const [settings, setSettings] = useState<Record<string,string>>({})
  const load = async () => {
    const res = await apiFetch('/admin/settings')
    const data = await res.json()
    const map: Record<string,string> = {}
    for (const kv of data.settings || []) map[kv.key] = kv.value
    setSettings(map)
  }
  useEffect(() => { load() }, [])
  const save = async () => {
    const arr = Object.entries(settings).map(([key,value]) => ({ key, value }))
    await apiFetch('/admin/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(arr) })
  }
  return (
    <main className="p-8 space-y-6 max-w-xl">
      <h2 className="text-2xl font-semibold">Configurações</h2>
      <div className="space-y-2">
        <div>Chave IA</div>
        <Input value={settings.AI_MODERATION_API_KEY || ''} onChange={e=>setSettings(prev=>({ ...prev, AI_MODERATION_API_KEY: e.target.value }))} />
        <div>Endpoint IA</div>
        <Input value={settings.AI_MODERATION_ENDPOINT || ''} onChange={e=>setSettings(prev=>({ ...prev, AI_MODERATION_ENDPOINT: e.target.value }))} />
        <div>Webhook Stripe</div>
        <Input value={settings.STRIPE_WEBHOOK_ENDPOINT || ''} onChange={e=>setSettings(prev=>({ ...prev, STRIPE_WEBHOOK_ENDPOINT: e.target.value }))} />
        <Button onClick={save}>Salvar</Button>
      </div>
    </main>
  )
}
