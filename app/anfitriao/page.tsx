"use client"
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { apiFetch } from '@/lib/api'

export default function HostPage() {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [eventId, setEventId] = useState('')
  const [screen, setScreen] = useState(false)
  const [feed, setFeed] = useState(false)

  const createEvent = async () => {
    const res = await apiFetch('/events', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, date, modules: [] }) })
    const data = await res.json()
    setEventId(data.event.id)
  }

  const buyModules = async () => {
    const modules = [screen && 'screen', feed && 'feed'].filter(Boolean)
    if (!eventId || !modules.length) return
    const res = await apiFetch(`/events/${eventId}/modules/checkout`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ modules }) })
    const data = await res.json()
    if (data.url) window.location.href = data.url
  }

  return (
    <main className="p-8 space-y-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold">Anfitrião</h2>
      <div className="space-y-2">
        <Label>Nome do evento</Label>
        <Input value={name} onChange={e=>setName(e.target.value)} />
        <Label>Data</Label>
        <Input type="datetime-local" value={date} onChange={e=>setDate(e.target.value)} />
        <Button onClick={createEvent}>Criar evento</Button>
      </div>
      {eventId && (
        <div className="space-y-3">
          <div className="font-medium">Módulos</div>
          <label className="flex items-center gap-2"><input type="checkbox" checked={screen} onChange={e=>setScreen(e.target.checked)} /> Telão</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={feed} onChange={e=>setFeed(e.target.checked)} /> Feed</label>
          <Button onClick={buyModules}>Comprar módulos</Button>
        </div>
      )}
    </main>
  )
}
