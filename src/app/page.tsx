import HeroIllustration from '@/components/illustrations/HeroIllustration'
import LottieLocal from '@/components/client/LottieLocal'
import purpleParty from '../../Purple party.json'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import SocialEmbed from '@/components/client/SocialEmbed'

export default async function Page() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000'
  const res = await fetch(`${base}/api/pricing`, { cache: 'no-store' })
  const pricing = await res.json().catch(() => ({ plans: [] }))
  const landingRes = await fetch(`${base}/api/landing`, { cache: 'no-store' })
  const landing = await landingRes.json().catch(() => ({ videos: [] }))
  return (
    <div style={{ maxWidth: 1100, margin: '40px auto', padding: '0 20px' }}>
      <section style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 46, marginTop: 12, marginBottom: 8, lineHeight: 1.1 }}>Transforme qualquer evento em uma experiência inesquecível.</h1>
          <p style={{ opacity: 0.9 }}>Stories, feed e telão ao vivo — tudo reunido em um único QR Code.</p>
          <p style={{ opacity: 0.8 }}>O jeito mais fácil e divertido de registrar a festa pela visão dos convidados.</p>
          <p style={{ opacity: 0.8 }}>Crie seu link, personalize, e deixe a magia acontecer. 🎉📱✨</p>
          <div style={{ marginTop: 22, display:'flex', gap:12 }}>
            <a href="/login" className="btn-primary">Comprar agora 💖</a>
            <a href="#precos" className="nav-link">Ver planos 🔖</a>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ border: '1px solid #1f1f2a', borderRadius: 18, padding: 16, background: 'rgba(255,255,255,0.02)' }}>
            <LottieLocal data={purpleParty as any} className="w-[420px] h-[420px]" />
          </div>
        </div>
      </section>

      <section id="precos" style={{ marginTop: 70 }}>
        <h2 style={{ marginBottom: 18, fontSize: 28 }}>Preços</h2>
        <div className="pricing-grid">
          {pricing.plans?.map((p: any) => (
            <Card key={p.key} className={`pricing-card ${p.badge ? 'card-highlight' : ''}`}>
              {p.badge && <span className="pricing-badge">★ {p.badge}</span>}
              <CardHeader>
                <div className="pricing-header">
                  <div>
                    <div className="pricing-name">{p.name}</div>
                    <div className="pricing-price">R${p.price}{p.oldPrice && <span className="old-price">R${p.oldPrice}</span>}</div>
                  </div>
                  <div className="pricing-icon">{p.emoji || ''}</div>
                </div>
                <div className="pricing-split" />
              </CardHeader>
              <CardContent>
                <div className="pricing-body">
                  <ul className="features">
                    {p.features?.map((f: string, i: number) => (
                      <li key={i} className="feature"><i>{f.toLowerCase().includes('sem') ? '✖️' : '✔️'}</i> {f}</li>
                    ))}
                  </ul>
                  <a href="/login" className="btn-primary btn-block">Quero fazer meu site</a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="faq" style={{ marginTop: 60 }}>
        <h2 className="section-title">Perguntas Frequentes</h2>
        <div className="faq-wrap">
          {landing.faq?.map((f: { q: string; a: string }, i: number) => (
            <details key={i} className="faq-item" {...(i===0 ? { open: true } : {})}>
              <summary>
                <span>{f.q}</span>
                <span>+</span>
              </summary>
              <div className="faq-a">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section id="como" style={{ marginTop: 60 }}>
        <h2 style={{ marginBottom: 12 }}>Como Fazer</h2>
        <ol style={{ lineHeight: 1.8 }}>
          <li>Crie sua conta</li>
          <li>Cadastre seu evento</li>
          <li>Compartilhe o QR Code e comece a receber interações</li>
        </ol>
      </section>

      <section id="virais" style={{ marginTop: 60 }}>
        <h2 className="section-title">Surpresas que <span style={{ color: '#EC4899' }}>viralizaram</span></h2>
        <div className="social-grid">
          {landing.videos?.map((u: string, i: number) => (
            <div key={i} className="phone-card">
              <SocialEmbed url={u} />
              <div className="phone-foot" />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}