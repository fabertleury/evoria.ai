"use client"
import { useMemo, useState } from 'react'

function parse(url: string) {
  try {
    const u = new URL(url)
    if (u.hostname.includes('tiktok.com')) {
      const id = u.pathname.split('/').find((p) => /^\d+$/.test(p))
      if (id) return { kind: 'tiktok', src: `https://www.tiktok.com/embed/v2/${id}` }
    }
    if (u.hostname.includes('instagram.com')) {
      const parts = u.pathname.split('/').filter(Boolean)
      const type = parts[0]
      const id = parts[1]
      if (type === 'reel' && id) return { kind: 'instagram', src: `https://www.instagram.com/reel/${id}/embed` }
    }
  } catch {}
  return null
}

export default function EmbedVideo({ className }: { className?: string }) {
  const [url, setUrl] = useState('')
  const embed = useMemo(() => parse(url), [url])
  return (
    <div className={className}>
      <div className="flex gap-3">
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Cole um link do TikTok ou Reels" className="w-full border border-slate-800 glass rounded px-3 py-2" />
        <button className="btn-primary px-4 rounded">Adicionar</button>
      </div>
      {embed ? (
        <div className="mt-4 aspect-[9/16] w-full max-w-sm mx-auto rounded-xl overflow-hidden border border-slate-800 glass">
          <iframe src={embed.src} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" />
        </div>
      ) : null}
    </div>
  )
}
