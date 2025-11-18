"use client"
import { useEffect, useState } from 'react'

export default function AdminPage() {
  const [plans, setPlans] = useState<any[]>([])
  const [videos, setVideos] = useState<string[]>([])
  const [faq, setFaq] = useState<{ q: string; a: string }[]>([])
  useEffect(() => {
    fetch('/api/pricing').then(r=>r.json()).then(d=>setPlans(d.plans||[]))
    fetch('/api/landing').then(r=>r.json()).then(d=>{ setVideos(d.videos||[]); setFaq(d.faq||[]) })
  }, [])
  function updatePlan(i: number, field: string, value: any) { setPlans(prev => prev.map((p, idx) => idx===i ? { ...p, [field]: value } : p)) }
  async function savePlans() { await fetch('/api/pricing', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ plans }) }); alert('Preços atualizados') }
  async function saveVideos() {
    const res = await fetch('/api/landing')
    const data = await res.json()
    await fetch('/api/landing', { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ ...data, videos, faq }) })
    alert('Vídeos atualizados')
  }
  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 20px' }}>
      <h1 style={{ marginBottom: 12 }}>Painel Admin</h1>
      <div style={{ opacity: 0.8, marginBottom: 18 }}>Atualize valores e vídeos da landing.</div>
      <div style={{ display:'grid', gap: 16 }}>
        {plans.map((p, i) => (
          <div key={p.key} style={{ border:'1px solid #26263a', borderRadius: 14, padding: 14 }}>
            <div style={{ fontWeight: 700, marginBottom: 10 }}>{p.name}</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap: 12 }}>
              <label>Preço<br/><input type="number" value={p.price} onChange={e=>updatePlan(i,'price', Number(e.target.value))} /></label>
              <label>Preço antigo<br/><input type="number" value={p.oldPrice || ''} onChange={e=>updatePlan(i,'oldPrice', e.target.value ? Number(e.target.value) : null)} /></label>
              <label>Badge<br/><input type="text" value={p.badge || ''} onChange={e=>updatePlan(i,'badge', e.target.value || null)} /></label>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12 }}>
        <button className="btn-primary" onClick={savePlans}>Salvar preços</button>
      </div>
      <div style={{ marginTop: 28 }}>
        <h2 style={{ marginBottom: 10 }}>Vídeos virais</h2>
        <div style={{ display:'grid', gap: 8 }}>
          {videos.map((v, i) => (
            <div key={i} style={{ display:'flex', gap: 8 }}>
              <input className="px-3 py-2 border border-slate-800 rounded" style={{ flex:1 }} value={v} onChange={e=>setVideos(prev=>prev.map((x,idx)=>idx===i?e.target.value:x))} placeholder="Link do TikTok ou Instagram" />
              <button className="px-3 rounded border border-slate-800" onClick={()=>setVideos(prev=>prev.filter((_,idx)=>idx!==i))}>Remover</button>
            </div>
          ))}
          <button className="px-3 rounded border border-slate-800" onClick={()=>setVideos(prev=>[...prev,''])}>Adicionar vídeo</button>
        </div>
        <div style={{ marginTop: 12 }}>
          <button className="btn-primary" onClick={saveVideos}>Salvar vídeos</button>
        </div>
      </div>

      <div style={{ marginTop: 28 }}>
        <h2 style={{ marginBottom: 10 }}>Perguntas Frequentes</h2>
        <div style={{ display:'grid', gap: 8 }}>
          {faq.map((f, i) => (
            <div key={i} style={{ border:'1px solid #26263a', borderRadius: 14, padding: 12, display:'grid', gap:8 }}>
              <input className="px-3 py-2 border border-slate-800 rounded" value={f.q} onChange={e=>setFaq(prev=>prev.map((x,idx)=>idx===i?{...x,q:e.target.value}:x))} placeholder="Pergunta" />
              <textarea className="px-3 py-2 border border-slate-800 rounded" value={f.a} onChange={e=>setFaq(prev=>prev.map((x,idx)=>idx===i?{...x,a:e.target.value}:x))} placeholder="Resposta" rows={3} />
              <button className="px-3 rounded border border-slate-800" onClick={()=>setFaq(prev=>prev.filter((_,idx)=>idx!==i))}>Remover</button>
            </div>
          ))}
          <button className="px-3 rounded border border-slate-800" onClick={()=>setFaq(prev=>[...prev,{ q:'', a:'' }])}>Adicionar pergunta</button>
        </div>
        <div style={{ marginTop: 12 }}>
          <button className="btn-primary" onClick={saveVideos}>Salvar FAQ</button>
        </div>
      </div>
    </div>
  )
}