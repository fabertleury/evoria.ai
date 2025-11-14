import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json().catch(() => null) as any
  const username = body?.username || ''
  const password = body?.password || ''
  if (username === 'fabert@evoria.ai' && password === 'fab0312ert') {
    const res = NextResponse.json({ ok: true, role: 'admin' })
    res.cookies.set('evoria_token', 'ok', { httpOnly: true, path: '/' })
    res.cookies.set('role', 'admin', { path: '/' })
    return res
  }
  return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 })
}