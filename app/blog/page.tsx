export default function BlogPage() {
  const posts = [
    { slug: 'como-usar-o-telao', title: 'Como usar o Telão ao Vivo', excerpt: 'Guia prático para começar com telão e engajar seu evento.' },
    { slug: 'lotties-e-emojis', title: 'Lotties e Emojis no seu evento', excerpt: 'Estilo moderno sem fotos reais: como ilustrar sua experiência.' },
    { slug: 'seo-para-eventos', title: 'SEO para eventos e conteúdos virais', excerpt: 'Dicas de SEO para atrair mais participantes e alcance.' },
  ]
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((p) => (
          <article key={p.slug} className="rounded-xl border border-slate-800 glass p-4">
            <h2 className="text-xl font-semibold">{p.title}</h2>
            <p className="text-muted mt-2 text-sm">{p.excerpt}</p>
          </article>
        ))}
      </div>
    </main>
  )
}
