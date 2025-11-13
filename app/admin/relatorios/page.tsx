"use client"
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function AdminRelatoriosPage() {
  const [eventId, setEventId] = useState('')
  const [report, setReport] = useState<any>(null)
  const load = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/summary/event/${encodeURIComponent(eventId)}`)
    const data = await res.json()
    setReport(data)
  }
  return (
    <main className="p-8 space-y-6 max-w-xl">
      <h2 className="text-2xl font-semibold">Relatórios</h2>
      <div className="flex gap-3">
        <Input value={eventId} onChange={e=>setEventId(e.target.value)} placeholder="eventId" />
        <Button onClick={load}>Gerar</Button>
      </div>
      {report && (
        <div className="space-y-2 border rounded p-3">
          <div>Interações: {report.interactions}</div>
          <div>Mídia mais curtida: {report.mostLikedMediaId || '-'}</div>
          <div>Convidado mais ativo: {report.mostActiveGuestId || '-'}</div>
          <div>Pico de horário: {report.peakHour ?? '-'}</div>
        </div>
      )}
    </main>
  )
}
