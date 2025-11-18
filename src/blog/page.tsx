export default function BlogPage() {
  return (
    <div style={{ maxWidth: 1100, margin: '40px auto', padding: '0 20px' }}>
      <h1 style={{ marginBottom: 18 }}>Blog</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16 }}>
        <article style={{ border: '1px solid #1f1f2a', borderRadius: 16, padding: 16 }}>
          <b>Como usar o QR Code em eventos</b>
          <div style={{ opacity: 0.8 }}>Passo a passo para anfitriões</div>
        </article>
        <article style={{ border: '1px solid #1f1f2a', borderRadius: 16, padding: 16 }}>
          <b>Dicas para engajamento</b>
          <div style={{ opacity: 0.8 }}>Transforme participação em experiência</div>
        </article>
        <article style={{ border: '1px solid #1f1f2a', borderRadius: 16, padding: 16 }}>
          <b>Integrações e mídia</b>
          <div style={{ opacity: 0.8 }}>Fotos, vídeos e mural social</div>
        </article>
      </div>
    </div>
  )
}