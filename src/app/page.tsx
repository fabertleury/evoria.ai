import HeroIllustration from '@/components/illustrations/HeroIllustration'
import LottieLocal from '@/components/client/LottieLocal'
import purpleParty from '../../Purple party.json'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import SocialEmbed from '@/components/client/SocialEmbed'
import WhatsAppButton from '@/components/client/WhatsAppButton'

export default async function Page() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000'
  const res = await fetch(`${base}/api/pricing`, { cache: 'no-store' })
  const pricing = await res.json().catch(() => ({ plans: [] }))
  const landingRes = await fetch(`${base}/api/landing`, { cache: 'no-store' })
  const landing = await landingRes.json().catch(() => ({ videos: [] }))

  return (
    <>
      <div style={{ maxWidth: 1100, margin: '40px auto', padding: '0 20px' }}>
        <section className="hero">
          <div>
            <h1 style={{ fontSize: 46, marginTop: 12, marginBottom: 8, lineHeight: 1.1 }}>Transforme qualquer evento em uma experiência inesquecível.</h1>
            <p style={{ opacity: 0.9 }}>Stories, feed e telão ao vivo — tudo reunido em um único QR Code.</p>
            <p style={{ opacity: 0.8 }}>O jeito mais fácil e divertido de registrar a festa pela visão dos convidados.</p>
            <p style={{ opacity: 0.8 }}>Crie seu link, personalize, e deixe a magia acontecer. 🎉📱✨</p>
            <div style={{ marginTop: 22, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="/checkout" className="btn-primary">Comprar agora 💖</a>
              <a href="#precos" className="nav-link">Ver planos 🔖</a>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }} className="hidden md:flex">
            <div style={{ border: '1px solid #1f1f2a', borderRadius: 18, padding: 16, background: 'rgba(255,255,255,0.02)' }}>
              <LottieLocal data={purpleParty as any} className="w-[300px] h-[300px] md:w-[420px] md:h-[420px]" />
            </div>
          </div>
        </section>

        <section id="precos" style={{ marginTop: 70 }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2 style={{ fontSize: 36, marginBottom: 12 }}>Escolha seu Plano</h2>
            <p style={{ opacity: 0.8, fontSize: 18 }}>Transforme seus eventos em experiências inesquecíveis</p>
          </div>
          <div className="pricing-grid">
            {pricing.plans?.map((p: any, idx: number) => {
              // Define emojis baseados no índice ou nome do plano
              const planEmojis = ['🎊', '🎉', '🎭', '✨']
              const emoji = p.emoji || planEmojis[idx % planEmojis.length]

              return (
                <Card key={p.key} className={`pricing-card ${p.badge ? 'card-highlight' : ''}`}>
                  {p.badge && <span className="pricing-badge">★ {p.badge}</span>}
                  <CardHeader>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: '#EC4899' }}>{p.name}</div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
                          <span style={{ fontSize: 42, fontWeight: 800, lineHeight: 1 }}>R${p.price}</span>
                          {p.oldPrice && (
                            <span style={{ fontSize: 18, textDecoration: 'line-through', opacity: 0.5, fontWeight: 600 }}>
                              R${p.oldPrice}
                            </span>
                          )}
                        </div>
                        {p.oldPrice && (
                          <div style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 6, background: 'rgba(16,185,129,0.15)', color: '#10B981', fontSize: 13, fontWeight: 700 }}>
                            Economia de R${(p.oldPrice - p.price).toFixed(0)}
                          </div>
                        )}
                      </div>
                      <div style={{ fontSize: 56, lineHeight: 1 }}>{emoji}</div>
                    </div>
                    <div style={{ height: 2, background: p.badge ? 'rgba(236,72,153,0.6)' : '#27273a', margin: '16px 0' }} />
                  </CardHeader>
                  <CardContent>
                    <div style={{ background: '#0b0e19', border: '1px solid #23233a', borderRadius: 14, padding: 20 }}>
                      {p.features && p.features.length > 0 ? (
                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0', display: 'grid', gap: 10 }}>
                          {p.features.map((f: string, i: number) => {
                            const isNegative = f.toLowerCase().includes('sem')
                            return (
                              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 600 }}>
                                <span style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: 22,
                                  height: 22,
                                  borderRadius: 999,
                                  border: `1px solid ${isNegative ? 'rgba(239,68,68,0.6)' : 'rgba(16,185,129,0.6)'}`,
                                  color: isNegative ? '#EF4444' : '#10B981'
                                }}>
                                  {isNegative ? '✖' : '✔'}
                                </span>
                                <span style={{ opacity: isNegative ? 0.6 : 0.95 }}>{f}</span>
                              </li>
                            )
                          })}
                        </ul>
                      ) : (
                        <div style={{ marginBottom: 20, textAlign: 'center', opacity: 0.6, fontSize: 14 }}>
                          Consulte os recursos incluídos
                        </div>
                      )}
                      <a
                        href="/login"
                        className="pricing-cta-button"
                        style={{
                          display: 'block',
                          width: '100%',
                          textAlign: 'center',
                          padding: '14px 18px',
                          borderRadius: 14,
                          background: '#EC4899',
                          color: '#0b0b12',
                          fontWeight: 800,
                          fontSize: 16,
                          letterSpacing: '0.3px',
                          boxShadow: '0 0 0 2px rgba(255,255,255,0.08), 0 8px 26px rgba(236,72,153,0.35), inset 0 -4px 0 rgba(224,60,130,0.45)',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        Contratar para meu evento! 🎉
                      </a>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Módulos Adicionais - Seção Persuasiva */}
        <section id="modulos" style={{ marginTop: 60 }}>
          <div style={{ textAlign: 'center', marginBottom: 40, padding: '0 16px' }}>
            <div style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(236,72,153,0.15)', border: '1px solid rgba(236,72,153,0.3)', borderRadius: 20, marginBottom: 12, fontSize: 11, fontWeight: 700, color: '#EC4899', textTransform: 'uppercase', letterSpacing: 1 }} className="text-xs md:text-sm">
              ✨ Turbine seu Evento
            </div>
            <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
              Leve seu evento para o <span style={{ background: 'linear-gradient(135deg, #EC4899, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>próximo nível</span>
            </h2>
            <p className="text-base md:text-lg opacity-85 max-w-2xl mx-auto">
              Adicione recursos premium que vão fazer seus convidados ficarem <strong>impressionados</strong>
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 40 }} className="px-4">
            {/* Telão ao Vivo */}
            <div style={{ position: 'relative', background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(99,102,241,0.15))', border: '2px solid rgba(139,92,246,0.3)', borderRadius: 24, padding: 32, overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -50, right: -50, width: 150, height: 150, background: 'radial-gradient(circle, rgba(139,92,246,0.3), transparent)', borderRadius: '50%', filter: 'blur(40px)' }}></div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>📺</div>
                <h3 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12, color: '#8B5CF6' }}>Telão ao Vivo</h3>
                <p style={{ fontSize: 16, opacity: 0.9, marginBottom: 24, lineHeight: 1.6 }}>
                  Transforme qualquer TV em um <strong>telão interativo</strong> que exibe as fotos e vídeos em tempo real
                </p>

                <div style={{ background: 'rgba(0,0,0,0.3)', padding: 20, borderRadius: 12, marginBottom: 24 }}>
                  <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Perfeito para:</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                      <span style={{ color: '#8B5CF6' }}>→</span> Casamentos e festas grandes
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                      <span style={{ color: '#8B5CF6' }}>→</span> Aniversários de 15 anos
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                      <span style={{ color: '#8B5CF6' }}>→</span> Eventos corporativos
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                      <span style={{ color: '#8B5CF6' }}>→</span> Formaturas e confraternizações
                    </li>
                  </ul>
                </div>

                <div style={{ display: 'grid', gap: 12, marginBottom: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 600 }}>
                    <span style={{ width: 24, height: 24, background: 'rgba(139,92,246,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>✓</span>
                    Atualização em tempo real
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 600 }}>
                    <span style={{ width: 24, height: 24, background: 'rgba(139,92,246,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>✓</span>
                    Efeitos de transição profissionais
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 600 }}>
                    <span style={{ width: 24, height: 24, background: 'rgba(16,185,129,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>🤖</span>
                    <div>
                      <div>Moderação por Inteligência Artificial</div>
                      <div style={{ fontSize: 11, opacity: 0.7, fontWeight: 500 }}>Filtra automaticamente nudez e conteúdo +18</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 600 }}>
                    <span style={{ width: 24, height: 24, background: 'rgba(139,92,246,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>✓</span>
                    Compatível com qualquer TV/Projetor
                  </div>
                </div>

                <a href="/login" style={{ display: 'block', textAlign: 'center', padding: '16px 24px', background: 'linear-gradient(135deg, #8B5CF6, #6366F1)', color: 'white', fontWeight: 800, fontSize: 16, borderRadius: 12, boxShadow: '0 8px 24px rgba(139,92,246,0.4)', border: 'none', cursor: 'pointer', transition: 'transform 0.2s ease' }} className="module-cta">
                  Adicionar ao meu evento 🚀
                </a>
              </div>
            </div>

            {/* Feed Interativo */}
            <div style={{ position: 'relative', background: 'linear-gradient(135deg, rgba(236,72,153,0.15), rgba(219,39,119,0.15))', border: '2px solid rgba(236,72,153,0.3)', borderRadius: 24, padding: 32, overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -50, right: -50, width: 150, height: 150, background: 'radial-gradient(circle, rgba(236,72,153,0.3), transparent)', borderRadius: '50%', filter: 'blur(40px)' }}></div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>📱</div>
                <h3 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12, color: '#EC4899' }}>Feed Interativo</h3>
                <p style={{ fontSize: 16, opacity: 0.9, marginBottom: 24, lineHeight: 1.6 }}>
                  Crie um <strong>feed estilo Instagram</strong> onde todos os convidados podem curtir, comentar e interagir
                </p>

                <div style={{ background: 'rgba(0,0,0,0.3)', padding: 20, borderRadius: 12, marginBottom: 24 }}>
                  <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Perfeito para:</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                      <span style={{ color: '#EC4899' }}>→</span> Aumentar engajamento dos convidados
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                      <span style={{ color: '#EC4899' }}>→</span> Criar memórias compartilhadas
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                      <span style={{ color: '#EC4899' }}>→</span> Gamificação do evento
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                      <span style={{ color: '#EC4899' }}>→</span> Ranking de fotos favoritas
                    </li>
                  </ul>
                </div>

                <div style={{ display: 'grid', gap: 12, marginBottom: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 600 }}>
                    <span style={{ width: 24, height: 24, background: 'rgba(236,72,153,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>✓</span>
                    Curtidas e reações em tempo real
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 600 }}>
                    <span style={{ width: 24, height: 24, background: 'rgba(236,72,153,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>✓</span>
                    Comentários e interações
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 600 }}>
                    <span style={{ width: 24, height: 24, background: 'rgba(16,185,129,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>🤖</span>
                    <div>
                      <div>Moderação por Inteligência Artificial</div>
                      <div style={{ fontSize: 11, opacity: 0.7, fontWeight: 500 }}>Filtra automaticamente nudez e conteúdo +18</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 600 }}>
                    <span style={{ width: 24, height: 24, background: 'rgba(236,72,153,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>✓</span>
                    Ranking das mais curtidas
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 600 }}>
                    <span style={{ width: 24, height: 24, background: 'rgba(236,72,153,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>✓</span>
                    Compartilhamento facilitado
                  </div>
                </div>

                <a href="/login" style={{ display: 'block', textAlign: 'center', padding: '16px 24px', background: 'linear-gradient(135deg, #EC4899, #DB2777)', color: 'white', fontWeight: 800, fontSize: 16, borderRadius: 12, boxShadow: '0 8px 24px rgba(236,72,153,0.4)', border: 'none', cursor: 'pointer', transition: 'transform 0.2s ease' }} className="module-cta">
                  Adicionar ao meu evento 💖
                </a>
              </div>
            </div>
          </div>

          {/* CTA Combo */}
          <div style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.1), rgba(16,185,129,0.1))', border: '2px solid rgba(6,182,212,0.3)', borderRadius: 24, textAlign: 'center' }} className="p-6 md:p-10 mx-4">
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎁</div>
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Combo <span style={{ color: '#06B6D4' }}>Telão + Feed</span>
            </h3>
            <p className="text-base md:text-lg opacity-90 mb-2">
              Ative os dois módulos juntos e ganhe <strong style={{ color: '#10B981' }}>desconto especial!</strong>
            </p>
            <p className="text-sm md:text-base opacity-75 mb-6">
              A experiência completa para um evento inesquecível
            </p>

            <div className="flex justify-center gap-2 md:gap-3 flex-wrap mb-6">
              <span className="text-xs md:text-sm px-3 md:px-4 py-2 rounded-full font-bold" style={{ background: 'rgba(6,182,212,0.15)', color: '#06B6D4' }}>
                💰 Economia garantida
              </span>
              <span className="text-xs md:text-sm px-3 md:px-4 py-2 rounded-full font-bold" style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981' }}>
                🔥 Mais vendido
              </span>
              <span className="text-xs md:text-sm px-3 md:px-4 py-2 rounded-full font-bold" style={{ background: 'rgba(236,72,153,0.15)', color: '#EC4899' }}>
                ⚡ Setup rápido
              </span>
            </div>

            <a href="/checkout" className="module-cta inline-block text-base md:text-lg px-8 py-3 md:px-10 md:py-4 font-bold rounded-xl" style={{ background: 'linear-gradient(135deg, #06B6D4, #10B981)', color: 'white', boxShadow: '0 12px 32px rgba(6,182,212,0.4)', transition: 'transform 0.2s ease' }}>
              Quero o Combo Completo! 🎉
            </a>
          </div>
        </section>

        {/* Seção White-Label */}
        <section id="whitelabel" className="mt-12 md:mt-20 mx-4">
          <div style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(236,72,153,0.1))', borderRadius: 24, border: '1px solid rgba(139,92,246,0.2)' }} className="p-8 md:p-16">
            <div style={{ textAlign: 'center', marginBottom: 32 }} className="px-4">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                Solução <span style={{ background: 'linear-gradient(135deg, #8B5CF6, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>White-Label</span> para Empresas
              </h2>
              <p className="text-base md:text-lg opacity-90 max-w-2xl mx-auto">
                Perfeito para buffets, produtoras de eventos, fotógrafos profissionais e empresas que querem oferecer esta experiência com sua própria marca
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 40 }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: 24, borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>🎨</div>
                <h3 style={{ fontSize: 20, marginBottom: 8, color: '#EC4899' }}>Sua Marca</h3>
                <p style={{ opacity: 0.8, fontSize: 14 }}>Logotipo, cores e domínio personalizados. Tudo com a identidade visual da sua empresa.</p>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.3)', padding: 24, borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>💼</div>
                <h3 style={{ fontSize: 20, marginBottom: 8, color: '#8B5CF6' }}>Multi-Cliente</h3>
                <p style={{ opacity: 0.8, fontSize: 14 }}>Gerencie múltiplos eventos de diferentes clientes em um único painel administrativo.</p>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.3)', padding: 24, borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>📊</div>
                <h3 style={{ fontSize: 20, marginBottom: 8, color: '#06B6D4' }}>Relatórios</h3>
                <p style={{ opacity: 0.8, fontSize: 14 }}>Analytics completos, relatórios de engajamento e métricas de cada evento.</p>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.3)', padding: 24, borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>🚀</div>
                <h3 style={{ fontSize: 20, marginBottom: 8, color: '#10B981' }}>Suporte Premium</h3>
                <p style={{ opacity: 0.8, fontSize: 14 }}>Suporte prioritário, onboarding personalizado e atualizações exclusivas.</p>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 16, opacity: 0.9, marginBottom: 20 }}>
                Ideal para: <strong>Buffets</strong> • <strong>Produtoras de Eventos</strong> • <strong>Fotógrafos Profissionais</strong> • <strong>Empresas de Entretenimento</strong>
              </p>
              <a href="#contato" className="btn-primary" style={{ display: 'inline-block', fontSize: 18, padding: '14px 32px' }}>
                Solicitar Demonstração 🎯
              </a>
            </div>
          </div>
        </section>

        <section id="faq" style={{ marginTop: 60 }}>
          <h2 className="section-title">Perguntas Frequentes</h2>
          <div className="faq-wrap">
            {landing.faq?.map((f: { q: string; a: string }, i: number) => (
              <details key={i} className="faq-item" {...(i === 0 ? { open: true } : {})}>
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
          <h2 className="section-title">Eventos que <span style={{ color: '#EC4899' }}>viralizaram</span></h2>
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

      {/* Botão Flutuante WhatsApp */}
      <WhatsAppButton />
    </>
  )
}