import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { plans } from '@/lib/schema'
import { z } from 'zod'
import { rateLimit, rateKey } from '@/lib/rateLimit'
import { log } from '@/lib/logger'
import { requireRole } from '@/lib/auth'

const schema = z.object({ name: z.string(), price: z.string(), currency: z.string().default('BRL') })

export async function GET() {
  const db = getDb()
  const list = await db.select().from(plans)
  return NextResponse.json(list)
}

export async function POST(req: Request) {
  const user = requireRole(req, ['admin'])
  if (!user) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const key = rateKey('POST', '/api/pricing', req.headers.get('x-forwarded-for') || 'local')
  if (!rateLimit(key, 20, 60_000)) return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  const db = getDb()
  const inserted = await db.insert(plans).values(parsed.data).returning()
  log('pricing:create', 'plan-created', { id: inserted[0].id })
  return NextResponse.json(inserted[0])
}
