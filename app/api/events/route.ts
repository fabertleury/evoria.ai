import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { events } from '@/lib/schema'
import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { rateLimit, rateKey } from '@/lib/rateLimit'
import { requireRole } from '@/lib/auth'

const createSchema = z.object({ hostId: z.string(), name: z.string(), date: z.string().transform((s) => new Date(s)) })

export async function GET(req: Request) {
  const url = new URL(req.url)
  const hostId = url.searchParams.get('hostId')
  const db = getDb()
  const list = hostId ? await db.select().from(events).where(eq(events.hostId, hostId)) : await db.select().from(events)
  return NextResponse.json(list)
}

export async function POST(req: Request) {
  const user = requireRole(req, ['anfitriao','admin'])
  if (!user) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const key = rateKey('POST', '/api/events', req.headers.get('x-forwarded-for') || 'local')
  if (!rateLimit(key, 30, 60_000)) return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
  const body = await req.json().catch(() => null)
  const parsed = createSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid payload', issues: parsed.error.issues }, { status: 400 })
  const db = getDb()
  const inserted = await db.insert(events).values({ hostId: parsed.data.hostId, name: parsed.data.name, date: parsed.data.date }).returning()
  return NextResponse.json(inserted[0])
}
