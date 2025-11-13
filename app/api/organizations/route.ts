import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { organizations } from '@/lib/schema'
import { z } from 'zod'
import { requireRole } from '@/lib/auth'
import { rateLimit, rateKey } from '@/lib/rateLimit'

const schema = z.object({ name: z.string(), slug: z.string(), domain: z.string().optional() })

export async function GET() {
  const db = getDb()
  const list = await db.select().from(organizations)
  return NextResponse.json(list)
}

export async function POST(req: Request) {
  const user = requireRole(req, ['admin'])
  if (!user) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const key = rateKey('POST', '/api/organizations', req.headers.get('x-forwarded-for') || 'local')
  if (!rateLimit(key, 10, 60_000)) return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  const db = getDb()
  const inserted = await db.insert(organizations).values(parsed.data).returning()
  return NextResponse.json(inserted[0])
}
