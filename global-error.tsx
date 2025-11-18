"use client"
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen antialiased">
        <div className="container py-20">
          <div className="rounded-2xl border border-slate-800 glass p-6">
            <h2 className="text-2xl font-semibold">Erro inesperado</h2>
            <p className="mt-2 text-muted">Detectamos um problema ao renderizar o app.</p>
            <div className="mt-6 flex gap-3">
              <button className="btn-primary px-4 py-2 rounded-md" onClick={() => reset()}>Recarregar</button>
              <a className="px-4 py-2 rounded-md border border-slate-800 glass" href="/">Página inicial</a>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}

