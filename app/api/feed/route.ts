import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { posts } from '@/lib/schema'
import { z } from 'zod'
import { eq } from 'drizzle-orm'

const createSchema = z.object({ eventId: z.string(), guestId: z.string(), content: z.string().optional(), mediaId: z.string().optional() })

export async function GET(req: Request) {
  const url = new URL(req.url)
  const eventId = url.searchParams.get('eventId')
  const db = getDb()
  const list = eventId ? await db.select().from(posts).where(eq(posts.eventId, eventId)) : await db.select().from(posts)
  return NextResponse.json(list)
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  const parsed = createSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid payload', issues: parsed.error.issues }, { status: 400 })
  const db = getDb()
  const inserted = await db.insert(posts).values(parsed.data).returning()
  return NextResponse.json(inserted[0])
}
