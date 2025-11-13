"use client"
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type ScreenItem = { mediaId: string; guestId?: string; durationSec: number; bidCredits: number; ts: number }

export default function TelaoPage() {
  const [eventId, setEventId] = useState('')
  const [state, setState] = useState<{ queue: ScreenItem[]; currentIndex: number }>({ queue: [], currentIndex: 0 })
  const current = state.queue[state.currentIndex]
  const [readUrl, setReadUrl] = useState('')
  const [mediaType, setMediaType] = useState<'image'|'video'|'audio'|'none'>('none')
  const apiBase = ((process.env.NEXT_PUBLIC_API_BASE_URL as string) || 'http://localhost:8000/api').replace(/^"|"$/g, '')

  const load = async (id: string) => {
    try {
      const res = await fetch(`${apiBase}/screen/state?eventId=${encodeURIComponent(id)}`)
      if (!res.ok) return
      const data = await res.json()
      if (data?.state?.queue && typeof data?.state?.currentIndex === 'number') {
        setState(data.state)
      }
    } catch {}
  }

  useEffect(() => {
    if (!eventId) return
    load(eventId)
    const channel = supabase
      .channel(`screen_${eventId}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'broadcast_sessions', filter: `event_id=eq.${eventId}` }, (payload) => {
        const nextState = (payload as any)?.new?.state
        if (nextState?.queue && typeof nextState?.currentIndex === 'number') {
          setState(nextState)
        }
      })
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [eventId])

  useEffect(() => {
    const loadMedia = async () => {
      if (!current?.mediaId) { setReadUrl(''); setMediaType('none'); return }
      try {
        const r = await fetch(`${apiBase}/media/${current.mediaId}/read-url?expires=600`)
        if (!r.ok) { setReadUrl(''); setMediaType('none'); return }
        const d = await r.json()
        setReadUrl(d?.url || '')
        setMediaType((d?.type as any) || 'none')
      } catch {
        setReadUrl(''); setMediaType('none')
      }
    }
    loadMedia()
  }, [current?.mediaId])

  const advance = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/screen/advance`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ eventId }) })
  }

  return (
    <main className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Telão ao Vivo</h2>
      <div className="space-y-2 max-w-md">
        <Input value={eventId} onChange={(e)=>setEventId(e.target.value)} placeholder="eventId" />
      </div>
      <div className="border rounded p-4 min-h-[300px] flex items-center justify-center bg-black text-white">
        {current ? (
          <div className="text-center w-full">
            <div className="text-sm mb-2">Mídia: {current.mediaId}</div>
            <div className="text-sm mb-4">Duração: {current.durationSec}s • Créditos: {current.bidCredits}</div>
            {readUrl && mediaType === 'image' && <img src={readUrl} alt="" className="mx-auto max-h-[60vh]" />}
            {readUrl && mediaType === 'video' && <video src={readUrl} controls className="mx-auto max-h-[60vh]" />}
            {readUrl && mediaType === 'audio' && <audio src={readUrl} controls className="mx-auto" />}
            {!readUrl && <div className="text-xl">Carregando mídia…</div>}
          </div>
        ) : (<div>Fila vazia</div>)}
      </div>
      <div className="flex gap-3">
        <Button onClick={advance}>Avançar</Button>
      </div>
    </main>
  )
}
