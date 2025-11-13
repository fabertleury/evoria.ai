import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const src = url.searchParams.get('src') || ''
    if (!src) return NextResponse.json({ error: 'src missing' }, { status: 400 })
    const u = new URL(src)
    const allowedHosts = new Set(['lottie.host'])
    if (!allowedHosts.has(u.hostname)) return NextResponse.json({ error: 'host not allowed' }, { status: 400 })
    const r = await fetch(src, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
      },
      cache: 'no-store',
    })
    if (!r.ok) return NextResponse.json({ error: 'upstream error', status: r.status }, { status: r.status })
    const j = await r.json()
    return new NextResponse(JSON.stringify(j), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch {
    return NextResponse.json({ error: 'fetch failed' }, { status: 500 })
  }
}
