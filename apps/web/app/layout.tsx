"use client"
import './globals.css'
import type { ReactNode } from 'react'
import { Outfit } from 'next/font/google'

const outfit = Outfit({ subsets: ['latin'], fallback: ['Outfit Fallback', 'system-ui'] })

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${outfit.className} min-h-screen antialiased`} suppressHydrationWarning> 
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
          <div className="container py-10 text-sm text-muted">
            <div className="flex items-center gap-2">
              <span>© 2025 Evoria.ai</span>
              <span>•</span>
              <span>Eventos ao vivo interativos</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
