"use client"
import { useEffect, useState } from 'react'

type LandingConfig = {
  hero: { title: string; subtitle: string; lottieSrc: string }
  novelty: { title: string; subtitle: string; lottieSrc: string }
  galleryLotties: string[]
  prices: {
    basic: { name: string; price: string; oldPrice?: string; items: string[] }
    premium: { name: string; price: string; oldPrice?: string; items: string[]; featured?: boolean }
  }
  videos: string[]
}

export default function AdminPage() {
  const [cfg, setCfg] = useState<LandingConfig | null>(null)
  const [status, setStatus] = useState<string>('')

  useEffect(() => {
    fetch('/api/landing').then((r) => r.json()).then(setCfg)
  }, [])

  if (!cfg) return <main className="p-8">Carregando…</main>

  function update<K extends keyof LandingConfig>(k: K, v: LandingConfig[K]) {
    setCfg((prev) => ({ ...(prev as LandingConfig), [k]: v }))
  }

  async function save() {
    setStatus('Salvando…')
    const res = await fetch('/api/landing', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(cfg) })
    setStatus(res.ok ? 'Alterações salvas' : 'Erro ao salvar')
  }

  return (
    <main className="container py-10 space-y-10">
      <h2 className="text-3xl font-bold">Painel da Landing</h2>

      <section id="precos" className="space-y-3">
        <h3 className="text-xl font-semibold">Hero ✨</h3>
        <input className="w-full border border-slate-800 glass rounded px-3 py-2" value={cfg.hero.title} onChange={(e) => update('hero', { ...cfg.hero, title: e.target.value })} placeholder="Título" />
        <input className="w-full border border-slate-800 glass rounded px-3 py-2" value={cfg.hero.subtitle} onChange={(e) => update('hero', { ...cfg.hero, subtitle: e.target.value })} placeholder="Subtítulo" />
        <input className="w-full border border-slate-800 glass rounded px-3 py-2" value={cfg.hero.lottieSrc} onChange={(e) => update('hero', { ...cfg.hero, lottieSrc: e.target.value })} placeholder="Lottie URL" />
      </section>

      <section id="videos" className="space-y-3">
        <h3 className="text-xl font-semibold">Novidade 🔥</h3>
        <input className="w-full border border-slate-800 glass rounded px-3 py-2" value={cfg.novelty.title} onChange={(e) => update('novelty', { ...cfg.novelty, title: e.target.value })} placeholder="Título" />
        <input className="w-full border border-slate-800 glass rounded px-3 py-2" value={cfg.novelty.subtitle} onChange={(e) => update('novelty', { ...cfg.novelty, subtitle: e.target.value })} placeholder="Subtítulo" />
        <input className="w-full border border-slate-800 glass rounded px-3 py-2" value={cfg.novelty.lottieSrc} onChange={(e) => update('novelty', { ...cfg.novelty, lottieSrc: e.target.value })} placeholder="Lottie URL" />
      </section>

      <section className="space-y-3">
        <h3 className="text-xl font-semibold">Galeria de Lotties 💫</h3>
        {cfg.galleryLotties.map((src, i) => (
          <div key={i} className="flex gap-2">
            <input className="w-full border border-slate-800 glass rounded px-3 py-2" value={src} onChange={(e) => {
              const list = [...cfg.galleryLotties]; list[i] = e.target.value; update('galleryLotties', list)
            }} />
            <button className="px-3 rounded border border-slate-800" onClick={() => update('galleryLotties', cfg.galleryLotties.filter((_, idx) => idx !== i))}>Remover</button>
          </div>
        ))}
        <button className="px-3 rounded border border-slate-800" onClick={() => update('galleryLotties', [...cfg.galleryLotties, ''])}>Adicionar</button>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Preços 💸</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {(['basic', 'premium'] as const).map((key) => (
            <div key={key} className="rounded-xl border border-slate-800 glass p-4 space-y-2">
              <input className="w-full border border-slate-800 glass rounded px-3 py-2" value={cfg.prices[key].name} onChange={(e) => update('prices', { ...cfg.prices, [key]: { ...cfg.prices[key], name: e.target.value } })} placeholder="Nome" />
              <div className="flex gap-2">
                <input className="w-full border border-slate-800 glass rounded px-3 py-2" value={cfg.prices[key].price} onChange={(e) => update('prices', { ...cfg.prices, [key]: { ...cfg.prices[key], price: e.target.value } })} placeholder="Preço" />
                <input className="w-full border border-slate-800 glass rounded px-3 py-2" value={cfg.prices[key].oldPrice || ''} onChange={(e) => update('prices', { ...cfg.prices, [key]: { ...cfg.prices[key], oldPrice: e.target.value } })} placeholder="Preço antigo" />
              </div>
              {cfg.prices[key].items.map((it, i) => (
                <div key={i} className="flex gap-2">
                  <input className="w-full border border-slate-800 glass rounded px-3 py-2" value={it} onChange={(e) => {
                    const items = [...cfg.prices[key].items]; items[i] = e.target.value
                    update('prices', { ...cfg.prices, [key]: { ...cfg.prices[key], items } })
                  }} />
                  <button className="px-3 rounded border border-slate-800" onClick={() => update('prices', { ...cfg.prices, [key]: { ...cfg.prices[key], items: cfg.prices[key].items.filter((_, idx) => idx !== i) } })}>Remover</button>
                </div>
              ))}
              <button className="px-3 rounded border border-slate-800" onClick={() => update('prices', { ...cfg.prices, [key]: { ...cfg.prices[key], items: [...cfg.prices[key].items, ''] } })}>Adicionar item</button>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-xl font-semibold">Vídeos virais 🎬</h3>
        {cfg.videos.map((v, i) => (
          <div key={i} className="flex gap-2">
            <input className="w-full border border-slate-800 glass rounded px-3 py-2" value={v} onChange={(e) => { const list = [...cfg.videos]; list[i] = e.target.value; update('videos', list) }} placeholder="Link do TikTok ou Reels" />
            <button className="px-3 rounded border border-slate-800" onClick={() => update('videos', cfg.videos.filter((_, idx) => idx !== i))}>Remover</button>
          </div>
        ))}
        <button className="px-3 rounded border border-slate-800" onClick={() => update('videos', [...cfg.videos, ''])}>Adicionar vídeo</button>
      </section>

      <div className="flex items-center gap-3">
        <button onClick={save} className="btn-primary px-5 py-3 rounded-md">Salvar alterações</button>
        <span className="text-muted">{status}</span>
      </div>
    </main>
  )
}
