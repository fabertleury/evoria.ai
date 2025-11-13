"use client"
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type Post = { id: string; eventId: string; guestId: string; content?: string; mediaId?: string; likes: number; createdAt: string }

export default function FeedPage() {
  const [eventId, setEventId] = useState('')
  const [posts, setPosts] = useState<Post[]>([])

  const load = async (id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/feed/posts?eventId=${encodeURIComponent(id)}`)
    const data = await res.json()
    setPosts(data.posts || [])
  }

  useEffect(() => {
    if (!eventId) return
    load(eventId)
    const channel = supabase
      .channel(`feed_${eventId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts', filter: `event_id=eq.${eventId}` }, (payload) => {
        const row = payload.new as any
        setPosts((prev) => [{ id: row.id, eventId: row.event_id, guestId: row.guest_id, content: row.content, mediaId: row.media_id, likes: row.likes, createdAt: row.created_at }, ...prev])
      })
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [eventId])

  return (
    <main className="p-8 space-y-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold">Feed do Evento</h2>
      <div className="space-y-2">
        <Label>Evento</Label>
        <Input value={eventId} onChange={(e)=>setEventId(e.target.value)} placeholder="eventId" />
      </div>
      <div className="space-y-4">
        {posts.map((p) => (
          <div key={p.id} className="border rounded p-3">
            <div className="text-sm text-gray-500">{new Date(p.createdAt).toLocaleString()}</div>
            {p.content && <div className="mt-2">{p.content}</div>}
            {p.mediaId && <div className="mt-2 text-sm">Mídia #{p.mediaId}</div>}
            <div className="mt-2 text-sm">Likes: {p.likes}</div>
          </div>
        ))}
        {!posts.length && <div className="text-sm text-gray-500">Sem posts ainda.</div>}
      </div>
    </main>
  )
}
