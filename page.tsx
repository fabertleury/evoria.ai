"use client"
import Link from 'next/link'
import Image from 'next/image'
import LottieRemote from '@/components/client/LottieRemote'
import EmbedVideo from '@/components/client/EmbedVideo'
import { useEffect, useState } from 'react'
import { BrandIcon } from '@/components/ui/BrandIcons'
import HeroIllustration from '@/components/illustrations/HeroIllustration'

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
      {subtitle ? <p className="mt-2 text-muted">{subtitle}</p> : null}
    </div>
  )
}

function PriceCard({ name, price, oldPrice, items, featured }: { name: string; price: string; oldPrice?: string; items: string[]; featured?: boolean }) {
  return (
    <div className={`relative rounded-2xl p-6 flex flex-col gap-4 ${featured ? 'border border-pink-500/60' : 'border border-slate-800'} glass`}>
      {featured ? <span className="absolute -top-3 left-6 px-3 py-1 text-xs rounded-full bg-[var(--primary)] text-white">★ Mais escolhido</span> : null}
      <div className="flex items-baseline gap-2">
        <span className="text-xl font-semibold">{name}</span>
        {oldPrice ? <span className="text-sm line-through text-muted">{oldPrice}</span> : null}
      </div>
      <div className="text-4xl font-bold">{price}</div>
      <ul className="space-y-2 text-sm">
        {items.map((i) => (
          <li key={i} className="flex items-center gap-2">
            <span>•</span>
            <span className="text-muted">{i}</span>
          </li>
        ))}
      </ul>
      <Link href="/register" className="btn-primary px-4 py-2 rounded-md text-center">Quero fazer meu site</Link>
    </div>
  )
}

function FAQ() {
  const data = [
    { q: 'O que é o Evoria.ai?', a: 'Plataforma para eventos interativos com Telão ao Vivo, Feed e gamificação.' },
    { q: 'Como funcionam os créditos?', a: 'Participantes compram créditos para enviar interações e conteúdos ao telão.' },
    { q: 'Preciso instalar algo?', a: 'Tudo roda no navegador, com link do seu evento.' },
    { q: 'Tem suporte?', a: 'Suporte por chat e guia rápido dentro do painel.' },
  ]
  return (
    <div className="space-y-3">
      {data.map((item, idx) => (
        <details key={idx} className="rounded-lg border border-slate-800 glass">
          <summary className="cursor-pointer list-none px-4 py-3 flex items-center justify-between">
            <span className="font-medium">{item.q}</span>
            <span className="text-muted">+</span>
          </summary>
          <div className="px-4 pb-4 text-sm text-muted">{item.a}</div>
        </details>
      ))}
    </div>
  )
}

export default function Page() {
  const [cfg, setCfg] = useState<any | null>(null)
  useEffect(() => {
    const load = async () => {
      try {
        const r = await fetch('/api/landing')
        if (r.ok) {
          const j = await r.json()
          setCfg(j)
        }
      } catch { }
    }
    load()
  }, [])
  const hero = cfg?.hero ?? { title: '✨ Surpreenda seu público', subtitle: 'Eventos com telão, feed e créditos em tempo real. Mais emojis, menos fotos reais.', lottieSrc: 'https://lottie.host/4b0b3e8c-ec6d-4e19-8f8f-f1229b15d1d1/5hXK4oEwfe.json' }
  const novelty = cfg?.novelty ?? { title: 'Novidade', subtitle: 'Feed social em tempo real', lottieSrc: 'https://lottie.host/b8d12f1f-8e7a-4c1c-9b7e-b3f7b8a3f3e2/2bC1VgkzqM.json' }
  const gallery: string[] = cfg?.galleryLotties ?? ['https://lottie.host/6c2a8b57-6f7f-4dc7-b3fc-2bb996e1e2fa/6Jp0h2yM4h.json', 'https://lottie.host/7a1a7e61-3b2e-46e1-9dfb-1e2d9d87baf9/3nVvCqfQKf.json', 'https://lottie.host/2f5c01e9-3f4d-4cc9-9e2a-5a0f3a8c9b1e/JKfEwQyN1p.json']
  const prices = cfg?.prices ?? { basic: { name: 'Básico 🧸', price: 'R$29', items: ['1 ano de acesso', '1 lottie', 'Estilo Ghibli', 'Sem música'] }, premium: { name: 'Premium 💖', price: 'R$49', oldPrice: 'R$59', items: ['Pra sempre', '3 lotties', 'Estilo Ghibli', 'Com música'], featured: true } }
  const videos: string[] = cfg?.videos ?? []
  const featured = cfg?.featured ?? { leftText: 'Em destaque no', rightText: '+4516 casais felizes', links: [{ icon: 'tiktok', label: 'TikTok', href: '#' }, { icon: 'instagram', label: 'Instagram', href: '#' }, { icon: 'reddit', label: 'Reddit', href: '#' }] }
  return (
    <div className="relative">
      <section className="container pt-16 md:pt-24 pb-16 md:pb-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">{hero.title}</h1>
            <p className="text-lg text-muted">{hero.subtitle}</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/register" className="btn-primary px-5 py-3 rounded-md">Quero fazer meu evento</Link>
              <Link href="/telao" className="px-5 py-3 rounded-md border border-slate-800 glass">Ver Telão</Link>
            </div>
          </div>
          <div className="relative h-[420px] md:h-[520px]">
            <div className="absolute -right-10 -top-10 w-80 h-80 md:w-96 md:h-96 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(255,141,210,0.35) 0%, rgba(138,108,255,0.25) 40%, transparent 70%)' }} />
            <div className="absolute inset-0 rounded-2xl border border-slate-800 glass flex items-center justify-center bg-[#0f182c]">
              <HeroIllustration className="w-[360px] h-[360px]" />
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-20">
        <SectionTitle title="Surpresas que viralizaram" subtitle="Resultados reais de quem usou" />
        <div className="grid md:grid-cols-3 gap-6">
          {gallery.map((src) => (
            <div key={src} className="rounded-xl border border-slate-800 glass overflow-hidden flex items-center justify-center bg-[#0f182c] h-72">
              <LottieRemote src={src} className="w-40 h-40" />
            </div>
          ))}
        </div>
      </section>

      <section id="como" className="container pb-20">
        <SectionTitle title="Como fazer?" subtitle="É rápido, simples e divertido" />
        <div className="grid md:grid-cols-3 gap-8">
          <div className="rounded-2xl border border-slate-800 glass p-8 text-center hover:border-pink-500/50 transition-colors group">
            <div className="w-16 h-16 mx-auto bg-slate-900 rounded-full flex items-center justify-center text-2xl font-bold text-pink-500 mb-6 group-hover:scale-110 transition-transform">1</div>
            <h3 className="text-xl font-bold mb-3">Crie sua conta</h3>
            <p className="text-muted">Cadastre-se em segundos e tenha acesso ao painel de controle.</p>
          </div>
          <div className="rounded-2xl border border-slate-800 glass p-8 text-center hover:border-purple-500/50 transition-colors group">
            <div className="w-16 h-16 mx-auto bg-slate-900 rounded-full flex items-center justify-center text-2xl font-bold text-purple-500 mb-6 group-hover:scale-110 transition-transform">2</div>
            <h3 className="text-xl font-bold mb-3">Cadastre seu evento</h3>
            <p className="text-muted">Personalize o telão, escolha os módulos e configure tudo do seu jeito.</p>
          </div>
          <div className="rounded-2xl border border-slate-800 glass p-8 text-center hover:border-blue-500/50 transition-colors group">
            <div className="w-16 h-16 mx-auto bg-slate-900 rounded-full flex items-center justify-center text-2xl font-bold text-blue-500 mb-6 group-hover:scale-110 transition-transform">3</div>
            <h3 className="text-xl font-bold mb-3">Compartilhe o QR Code</h3>
            <p className="text-muted">Comece a receber interações e veja seu evento viralizar.</p>
          </div>
        </div>
      </section>

      <section className="container pb-12">
        <div className="flex items-center justify-between text-muted">
          <span>{featured.leftText}</span>
          <div className="flex items-center gap-8">
            {featured.links.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity">
                <BrandIcon name={l.icon as any} className="h-8 w-8" />
              </a>
            ))}
          </div>
          <span>{featured.rightText}</span>
        </div>
      </section>

      <section className="container pb-20">
        <SectionTitle title={novelty.title} subtitle={novelty.subtitle} />
        <div className="rounded-xl border border-slate-800 glass overflow-hidden flex items-center justify-center bg-[#0f182c] h-[420px]">
          <LottieRemote src={novelty.lottieSrc} className="w-72 h-72" />
        </div>
      </section>

      <section id="precos" className="container pb-20">
        <SectionTitle title="Preços" subtitle="Escolha a melhor opção" />
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <PriceCard name={prices.basic.name} price={prices.basic.price} items={prices.basic.items} />
          <PriceCard name={prices.premium.name} price={prices.premium.price} oldPrice={prices.premium.oldPrice} items={prices.premium.items} featured={prices.premium.featured} />
        </div>

        {cfg?.modules?.length ? (
          <>
            <SectionTitle title="Módulos Adicionais" subtitle="Turbine seu evento com extras" />
            <div className="grid md:grid-cols-3 gap-6">
              {cfg.modules.map((m: any) => (
                <div key={m.id} className="rounded-xl border border-slate-800 glass p-6 flex flex-col justify-between hover:border-slate-700 transition-colors">
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-white">{m.name}</h3>
                    <p className="text-sm text-muted mb-4">{m.description}</p>
                  </div>
                  <div className="text-xl font-bold text-blue-400">R$ {m.price}</div>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </section>

      {videos.length ? (
        <section className="container pb-20">
          <SectionTitle title="Conteúdos do TikTok e Reels" subtitle="Veja o que estão falando" />
          <div className="grid md:grid-cols-3 gap-6">
            {videos.map((u) => (
              <div key={u} className="rounded-xl border border-slate-800 glass overflow-hidden">
                <iframe src={u.includes('tiktok.com') ? u.replace(/.*video\/(\d+).*/, 'https://www.tiktok.com/embed/v2/$1') : u.includes('instagram.com/reel') ? u.replace(/.*reel\/([\w-]+).*/, 'https://www.instagram.com/reel/$1/embed') : u} className="w-full h-72" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section id="faq" className="container pb-20">
        <SectionTitle title="Perguntas Frequentes" />
        <FAQ />
        <div className="mt-8 flex justify-center">
          <Link href="/register" className="btn-primary px-5 py-3 rounded-md">Quero fazer meu evento</Link>
        </div>
      </section>
    </div>
  )
}
