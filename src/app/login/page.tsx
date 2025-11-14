export default function LoginPage() {
  async function handleSubmit(formData: FormData) {
    'use server'
    const email = String(formData.get('email') || '')
    const password = String(formData.get('password') || '')
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email, password }),
    })
    if (res.ok) return { ok: true }
    return { ok: false }
  }

  return (
    <div style={{ maxWidth: 420, margin: '80px auto', padding: 20, border: '1px solid #1f1f2a', borderRadius: 16 }}>
      <h1 style={{ marginBottom: 18 }}>Entrar</h1>
      <form action={handleSubmit}>
        <div style={{ display: 'grid', gap: 12 }}>
          <input name="email" placeholder="Email" style={{ padding: 10, borderRadius: 12, border: '1px solid #27273a' }} />
          <input name="password" type="password" placeholder="Senha" style={{ padding: 10, borderRadius: 12, border: '1px solid #27273a' }} />
          <button type="submit" style={{ padding: 10, borderRadius: 12, background: '#EC4899', color: '#0b0b12', fontWeight: 700 }}>Acessar</button>
        </div>
      </form>
    </div>
  )
}