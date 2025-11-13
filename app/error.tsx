"use client"
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])
  return (
    <div className="container py-20">
      <div className="rounded-2xl border border-slate-800 glass p-6">
        <h2 className="text-2xl font-semibold">Algo deu errado</h2>
        <p className="mt-2 text-muted">Tivemos um erro ao renderizar esta página.</p>
        <div className="mt-6 flex gap-3">
          <button className="btn-primary px-4 py-2 rounded-md" onClick={() => reset()}>Tentar novamente</button>
          <a className="px-4 py-2 rounded-md border border-slate-800 glass" href="/">Ir para a página inicial</a>
        </div>
      </div>
    </div>
  )
}

