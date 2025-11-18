"use client"
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { apiFetch } from '@/lib/api'

type Event = { id: string; name: string; feedPrice?: string; screenPrice?: string }

export default function AdminEventosPage() {
  const [list, setList] = useState<Event[]>([])
  const [editId, setEditId] = useState<string>('')
  const [feedPrice, setFeedPrice] = useState('0')
  const [screenPrice, setScreenPrice] = useState('0')
  const load = async () => {
    const res = await apiFetch('/admin/events')
    const data = await res.json()
    setList(data.events || [])
  }
  useEffect(() => { load() }, [])
  const pick = (ev: Event) => { setEditId(ev.id); setFeedPrice(ev.feedPrice || '0'); setScreenPrice(ev.screenPrice || '0') }
  const save = async () => {
    await apiFetch(`/events/${editId}/pricing`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ feedPrice: parseFloat(feedPrice||'0'), screenPrice: parseFloat(screenPrice||'0') }) })
    setEditId(''); setFeedPrice('0'); setScreenPrice('0')
    await load()
  }
  return (
    <main className="p-8 space-y-6">
      <h2 className="text-2xl font-semibold">Eventos</h2>
      <div className="space-y-3">
        {list.map(ev => (
          <div key={ev.id} className="border rounded p-3 flex items-center gap-3">
            <div className="flex-1">
              <div className="font-medium">{ev.name}</div>
              <div className="text-sm text-gray-500">Feed: {ev.feedPrice || '0'} • Telão: {ev.screenPrice || '0'}</div>
            </div>
            <Button onClick={()=>pick(ev)}>Editar preços</Button>
          </div>
        ))}
        {!list.length && <div className="text-sm text-gray-500">Sem eventos.</div>}
      </div>
      {editId && (
        <div className="space-y-3 max-w-md border rounded p-4">
          <div>Evento: {editId}</div>
          <div className="flex items-center gap-3">
            <div>🪙 Feed</div>
            <Input value={feedPrice} onChange={e=>setFeedPrice(e.target.value)} />
          </div>
          <div className="flex items-center gap-3">
            <div>🪙 Telão</div>
            <Input value={screenPrice} onChange={e=>setScreenPrice(e.target.value)} />
          </div>
          <Button onClick={save}>Salvar</Button>
        </div>
      )}
    </main>
  )
}
