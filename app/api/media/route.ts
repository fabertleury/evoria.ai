import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { mediaAssets } from '@/lib/schema'
import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { requireRole } from '@/lib/auth'
import { rateLimit, rateKey } from '@/lib/rateLimit'

const schema = z.object({ eventId: z.string(), guestId: z.string().optional(), type: z.enum(['image','video','audio']), url: z.string().url() })

export async function GET(req: Request) {
  const url = new URL(req.url)
  const eventId = url.searchParams.get('eventId')
  const db = getDb()
  const list = eventId ? await db.select().from(mediaAssets).where(eq(mediaAssets.eventId, eventId)) : await db.select().from(mediaAssets)
  return NextResponse.json(list)
}

export async function POST(req: Request) {
  const user = requireRole(req, ['anfitriao','admin'])
  if (!user) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const key = rateKey('POST', '/api/media', req.headers.get('x-forwarded-for') || 'local')
  if (!rateLimit(key, 60, 60_000)) return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  const db = getDb()
  const inserted = await db.insert(mediaAssets).values(parsed.data).returning()
  return NextResponse.json(inserted[0])
}
