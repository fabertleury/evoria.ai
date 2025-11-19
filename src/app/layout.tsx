"use client"
import './globals.css'
import LogoEvoria from '@/components/brand/LogoEvoria'
import { usePathname } from 'next/navigation'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')
  return (
    <html lang="pt-BR">
      <head>
        <title>Evoria.ai</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning style={{ fontFamily: 'Outfit, Outfit Fallback, system-ui, Arial', background: '#0b0b12', color: '#f7f7f7' }}>
        {!isAdmin && (
          <header style={{ position: 'sticky', top: 0, background: 'rgba(12,12,20,0.6)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #1f1f2a', zIndex: 50 }}>
            <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1100, margin: '0 auto', padding: '14px 20px' }}>
              <a href="/"><LogoEvoria height={26} /></a>
              <div style={{ display: 'flex', gap: 18 }}>
                <a className="nav-link" href="#precos">Preços</a>
                <a className="nav-link" href="#faq">Perguntas Frequentes</a>
                <a className="nav-link" href="#como">Como Fazer</a>
                <a className="nav-link" href="/blog">Blog</a>
                <a className="nav-cta" href="/login">Login</a>
              </div>
            </nav>
          </header>
        )}
        <main style={{ minHeight: '70vh' }}>{children}</main>
        {!isAdmin && (
          <footer style={{ borderTop: '1px solid #1f1f2a', marginTop: 50 }}>
            <div className="footer-grid">
              <div>
                <LogoEvoria height={22} />
                <div style={{ marginTop: 10, opacity: .8 }}>Surpreenda no seu evento com QR Code e telão.</div>
                <div style={{ marginTop: 12 }}>Feito por Fabert Leury</div>
                <div style={{ marginTop: 12, display: 'flex', gap: 12 }}>
                  <a className="nav-link" href="https://instagram.com/fabertleury" target="_blank">Instagram</a>
                  <a className="nav-link" href="https://wa.me/5562981287058" target="_blank">WhatsApp</a>
                </div>
              </div>
              <div>
                <div className="footer-heading">NAVEGAR</div>
                <a className="footer-link" href="/blog">Blog</a>
              </div>
              <div>
                <div className="footer-heading">LEGAL</div>
                <a className="footer-link" href="/termos">Termos de uso</a>
                <a className="footer-link" href="/privacidade">Termos de privacidade</a>
              </div>
            </div>
          </footer>
        )}
      </body>
    </html>
  )
}