import './globals.css'

export default function Page() {
  return (
    <div>
      <section className="hero">
        <div>
          <div className="badge">✨ Em destaque no • links editáveis</div>
          <h1 style={{ fontSize: 42, marginTop: 12, marginBottom: 8 }}>Transforme seus eventos com Evoria.ai</h1>
          <p style={{ opacity: 0.8 }}>QR Code, Mural de Mensagens, Vídeos, Fotos e muito mais — tudo em um só lugar.</p>
          <div style={{ marginTop: 16 }}>
            <a className="cta" href="/login">Começar agora 🚀</a>
          </div>
        </div>
        <div className="card">
          <div style={{ width: '100%', height: 260, borderRadius: 16, background: 'radial-gradient(1200px 400px at 20% 0%, rgba(236,72,153,0.25), transparent 65%)', border: '1px solid #26263a' }} />
          <div style={{ marginTop: 12, opacity: 0.8 }}>Ilustração hero</div>
        </div>
      </section>

      <section id="precos" className="section">
        <h2 style={{ marginBottom: 12 }}>Preços</h2>
        <div className="grid">
          <div className="card"><b>Plano Básico</b><div style={{ opacity: 0.8 }}>Ideal para pequenos eventos</div></div>
          <div className="card"><b>Plano Pro</b><div style={{ opacity: 0.8 }}>Recursos avançados</div></div>
          <div className="card"><b>Plano Empresarial</b><div style={{ opacity: 0.8 }}>Customizado</div></div>
        </div>
      </section>

      <section id="faq" className="section">
        <h2 style={{ marginBottom: 12 }}>Perguntas Frequentes</h2>
        <div className="grid">
          <div className="card"><b>Como funciona?</b><div style={{ opacity: 0.8 }}>Criar evento, compartilhar QR e aproveitar!</div></div>
          <div className="card"><b>Tem limite?</b><div style={{ opacity: 0.8 }}>Planos se ajustam ao seu tamanho</div></div>
          <div className="card"><b>Suporte?</b><div style={{ opacity: 0.8 }}>Atendimento humano via WhatsApp</div></div>
        </div>
      </section>

      <section id="como" className="section">
        <h2 style={{ marginBottom: 12 }}>Como Fazer</h2>
        <ol style={{ lineHeight: 1.8 }}>
          <li>Crie sua conta</li>
          <li>Cadastre seu evento</li>
          <li>Compartilhe o QR Code e comece a receber interações</li>
        </ol>
      </section>
    </div>
  )
}