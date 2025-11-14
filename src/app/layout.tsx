export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <title>Evoria.ai</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ fontFamily: 'Inter, system-ui, Arial', background: '#0b0b12', color: '#f7f7f7' }}>
        <header style={{ position: 'sticky', top: 0, background: 'rgba(12,12,20,0.6)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #1f1f2a', zIndex: 50 }}>
          <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1100, margin: '0 auto', padding: '14px 20px' }}>
            <a href="/" style={{ fontWeight: 700, letterSpacing: 0.5 }}>Evoria.ai</a>
            <div style={{ display: 'flex', gap: 18 }}>
              <a href="#precos">Preços</a>
              <a href="#faq">Perguntas Frequentes</a>
              <a href="#como">Como Fazer</a>
              <a href="/blog">Blog</a>
              <a href="/login" style={{ padding: '8px 14px', borderRadius: 10, background: '#EC4899', color: '#0b0b12', fontWeight: 600 }}>Login</a>
            </div>
          </nav>
        </header>
        <main style={{ minHeight: '70vh' }}>{children}</main>
        <footer style={{ borderTop: '1px solid #1f1f2a', marginTop: 40 }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Feito por Fabert Leury</span>
            <div style={{ display: 'flex', gap: 16 }}>
              <a href="https://instagram.com/fabertleury" target="_blank">Instagram</a>
              <a href="https://wa.me/5562981287058" target="_blank">WhatsApp</a>
              <a href="/blog">NAVEGAR</a>
              <a href="/termos">Termos de Uso</a>
              <a href="/privacidade">Privacidade</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}