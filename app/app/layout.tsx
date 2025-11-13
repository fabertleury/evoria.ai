import '../globals.css'
import type { ReactNode } from 'react'
import { Outfit } from 'next/font/google'
import { BrandIcon } from '@/components/ui/BrandIcons'

const outfit = Outfit({ subsets: ['latin'], fallback: ['Outfit Fallback', 'system-ui'] })

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${outfit.className} min-h-screen antialiased`}>
        <header className="sticky top-0 z-30 backdrop-blur border-b border-slate-800/60">
          <div className="container flex items-center justify-between h-14">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-pink-500">❤</span>
              <span className="font-semibold">Evoria.ai</span>
            </div>
            <nav className="flex items-center gap-6 text-sm">
              <a href="/#precos" className="hover:text-white text-muted">Preços</a>
              <a href="/#faq" className="hover:text-white text-muted">Perguntas Frequentes</a>
              <a href="/#como" className="hover:text-white text-muted">Como Fazer</a>
              <a href="/blog" className="hover:text-white text-muted">Blog</a>
              <a href="/login" className="hover:text-white text-muted">Login</a>
            </nav>
          </div>
        </header>
        <main className="neon-gradient">{children}</main>
        <footer className="border-t border-slate-800/60">
          <div className="container py-12 text-sm">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-pink-500">❤</span>
                  <span className="font-semibold">Evoria.ai</span>
                </div>
                <p className="text-muted">Surpreenda o seu público com telão ao vivo, feed social e créditos.</p>
                <div className="inline-flex items-center gap-2 rounded-md border border-slate-800 px-3 py-1">
                  <span>Feito por</span>
                  <span className="font-medium">Fabert Leury</span>
                </div>
                <div className="space-y-2">
                  <div className="text-muted">Me siga no</div>
                  <div className="flex items-center gap-3">
                    <a href="https://instagram.com/fabertleury" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100"><BrandIcon name="instagram" /></a>
                    <a href="https://wa.me/62981287058" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100"><BrandIcon name="whatsapp" /></a>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-semibold">NAVEGAR</div>
                <div className="flex flex-col">
                  <a href="/blog" className="text-muted hover:text-white">Blog</a>
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-semibold">LEGAL</div>
                <div className="flex flex-col">
                  <a href="/termos" className="text-muted hover:text-white">Termos de uso</a>
                  <a href="/privacidade" className="text-muted hover:text-white">Termos de privacidade</a>
                </div>
              </div>
            </div>
            <div className="mt-8 text-muted">© {new Date().getFullYear()} Evoria.ai — Todos os direitos reservados</div>
          </div>
        </footer>
      </body>
    </html>
  )
}
