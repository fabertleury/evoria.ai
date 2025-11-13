import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { guests } from '@/lib/schema'
import { z } from 'zod'
import { eq } from 'drizzle-orm'

const schema = z.object({ eventId: z.string(), displayName: z.string() })

export async function GET(req: Request) {
  const url = new URL(req.url)
  const eventId = url.searchParams.get('eventId')
  const db = getDb()
  const list = eventId ? await db.select().from(guests).where(eq(guests.eventId, eventId)) : await db.select().from(guests)
  return NextResponse.json(list)
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  const db = getDb()
  const inserted = await db.insert(guests).values(parsed.data).returning()
  return NextResponse.json(inserted[0])
}
