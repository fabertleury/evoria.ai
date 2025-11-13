"use client"
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { apiFetch } from '@/lib/api'

export default function ConvidadoPage() {
  const [eventId, setEventId] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [guestId, setGuestId] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [type, setType] = useState<'feed'|'screen'>('feed')
  const [amount, setAmount] = useState(10)
  const [mediaId, setMediaId] = useState('')
  const [bidCredits, setBidCredits] = useState(10)
  const [durationSec, setDurationSec] = useState(30)
  const [balance, setBalance] = useState(0)
  const [feedPrice, setFeedPrice] = useState(0)
  const [screenPrice, setScreenPrice] = useState(0)

  const registerGuest = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/guests`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ eventId, displayName }) })
    const data = await res.json()
    setGuestId(data.guest.id)
    const wb = await apiFetch(`/wallet?guestId=${data.guest.id}`)
    const wbd = await wb.json()
    setBalance(wbd.balance || 0)
  }

  const uploadMedia = async () => {
    if (!file) return
    const path = `events/${eventId}/media/${Date.now()}_${file.name}`
    const r1 = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/storage/signed-upload`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ path, contentType: file.type }) })
    const { url } = await r1.json()
    await fetch(url, { method: 'PUT', headers: { 'Content-Type': file.type }, body: file })
    const mediaType = file.type.startsWith('image') ? 'image' : file.type.startsWith('video') ? 'video' : 'audio'
    const r2 = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/media`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ eventId, guestId, type: mediaType, url: path }) })
    const d2 = await r2.json()
    setMediaId(d2.media.id)
  }

  const pay = async () => {
    const r = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/payments/checkout`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount, currency: 'BRL', eventId, guestId }) })
    const data = await r.json()
    if (data.url) window.location.href = data.url
  }

  const loadPricing = async () => {
    const r = await apiFetch(`/pricing?eventId=${encodeURIComponent(eventId)}`)
    const d = await r.json()
    setFeedPrice(d.feedPrice || 0)
    setScreenPrice(d.screenPrice || 0)
  }

  useEffect(() => { if (eventId) loadPricing() }, [eventId])

  return (
    <main className="p-8 space-y-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold">Convidados</h2>
      <div className="space-y-2">
        <Label>Evento</Label>
        <Input value={eventId} onChange={e=>setEventId(e.target.value)} placeholder="eventId" />
      </div>
      {guestId && (
        <div className="flex items-center gap-3">
          <div className="text-2xl">🪙</div>
          <div>Saldo: {balance} créditos</div>
          <Button onClick={pay}>Comprar créditos</Button>
        </div>
      )}
      <div className="space-y-2">
        <Label>Seu nome</Label>
        <Input value={displayName} onChange={e=>setDisplayName(e.target.value)} placeholder="Seu nome" />
        <Button onClick={registerGuest}>Entrar no evento</Button>
      </div>
      <div className="space-y-2">
        <Label>Mídia</Label>
        <Input type="file" onChange={e=>setFile(e.target.files?.[0]||null)} />
        <div className="flex gap-4">
          <Button onClick={uploadMedia}>Enviar mídia</Button>
          <select value={type} onChange={e=>setType(e.target.value as any)} className="border rounded px-2">
            <option value="feed">Feed</option>
            <option value="screen">Telão</option>
          </select>
        </div>
        <div className="text-sm text-gray-500">Preço Feed: {feedPrice} • Preço Telão: {screenPrice}</div>
        {type === 'screen' && (
          <div className="flex gap-3 items-center mt-2">
            <Label>Créditos</Label>
            <Input type="number" value={bidCredits} onChange={e=>setBidCredits(parseInt(e.target.value||'0'))} />
            <Label>Duração</Label>
            <Input type="number" value={durationSec} onChange={e=>setDurationSec(parseInt(e.target.value||'0'))} />
            <Button onClick={async ()=>{
              if (!mediaId) return
              await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/screen/enqueue`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ eventId, mediaId, guestId, durationSec, bidCredits }) })
            }}>Entrar no Telão</Button>
          </div>
        )}
      </div>
      <div className="space-y-2">
        <Label>Pagamento (BRL)</Label>
        <Input type="number" value={amount} onChange={e=>setAmount(parseInt(e.target.value||'0'))} />
        <Button onClick={pay}>Comprar créditos 🪙</Button>
      </div>
    </main>
  )
}
