import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { LandingSchema } from '@/lib/landingSchema'
import { getPool } from '@/lib/db'
import { landingConfig } from '@/lib/schema'
import { sql } from 'drizzle-orm'

const filePath = path.join(process.cwd(), 'data', 'landing.json')

async function readConfig() {
  try {
    const buf = await fs.readFile(filePath, 'utf8')
    return JSON.parse(buf)
  } catch {
    const defaults = {
      hero: { title: '✨ Surpreenda seu público', subtitle: 'Eventos com telão, feed e créditos em tempo real. Mais emojis, menos fotos reais.', lottieSrc: 'https://lottie.host/4b0b3e8c-ec6d-4e19-8f8f-f1229b15d1d1/5hXK4oEwfe.json' },
      novelty: { title: 'Novidade', subtitle: 'Feed social em tempo real', lottieSrc: 'https://lottie.host/b8d12f1f-8e7a-4c1c-9b7e-b3f7b8a3f3e2/2bC1VgkzqM.json' },
      galleryLotties: [
        'https://lottie.host/6c2a8b57-6f7f-4dc7-b3fc-2bb996e1e2fa/6Jp0h2yM4h.json',
        'https://lottie.host/7a1a7e61-3b2e-46e1-9dfb-1e2d9d87baf9/3nVvCqfQKf.json',
        'https://lottie.host/2f5c01e9-3f4d-4cc9-9e2a-5a0f3a8c9b1e/JKfEwQyN1p.json',
      ],
      prices: {
        basic: { name: 'Básico 🧸', price: 'R$29', items: ['1 ano de acesso', '1 lottie', 'Estilo Ghibli', 'Sem música'] },
        premium: { name: 'Premium 💖', price: 'R$49', oldPrice: 'R$59', items: ['Pra sempre', '3 lotties', 'Estilo Ghibli', 'Com música'], featured: true },
      },
      videos: [],
      featured: {
        leftText: 'Em destaque no',
        rightText: '+4516 casais felizes',
        links: [
          { icon: 'tiktok', label: 'TikTok', href: 'https://tiktok.com/@seuperfil' },
          { icon: 'instagram', label: 'Instagram', href: 'https://instagram.com/seuperfil' },
          { icon: 'reddit', label: 'Reddit', href: 'https://reddit.com/r/seusub' },
        ],
      },
    }
    await fs.mkdir(path.dirname(filePath), { recursive: true })
    await fs.writeFile(filePath, JSON.stringify(defaults, null, 2), 'utf8')
    return defaults
  }
}

export async function GET() {
  const pool = getPool()
  await pool.query(`CREATE TABLE IF NOT EXISTS landing_config (id text PRIMARY KEY, data jsonb NOT NULL, updated_at timestamp DEFAULT now())`)
  const res = await pool.query(`SELECT data FROM landing_config WHERE id = 'default' LIMIT 1`)
  if (res.rows.length) return NextResponse.json(res.rows[0].data)
  const defaults = await readConfig()
  await pool.query(`INSERT INTO landing_config (id, data) VALUES ('default', $1)`, [defaults])
  return NextResponse.json(defaults)
}

export async function PUT(req: Request) {
  const body = await req.json().catch(() => null)
  const parsed = LandingSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Validation failed', issues: parsed.error.issues }, { status: 400 })
  const pool = getPool()
  await pool.query(`CREATE TABLE IF NOT EXISTS landing_config (id text PRIMARY KEY, data jsonb NOT NULL, updated_at timestamp DEFAULT now())`)
  await pool.query(`INSERT INTO landing_config (id, data) VALUES ('default', $1)
    ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = now()`, [parsed.data])
  return NextResponse.json({ ok: true })
}
