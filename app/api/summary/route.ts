import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { events, guests, posts, mediaAssets } from '@/lib/schema'
import { eq } from 'drizzle-orm'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const eventId = url.searchParams.get('eventId')
  if (!eventId) return NextResponse.json({ error: 'Missing eventId' }, { status: 400 })
  const db = getDb()
  const ev = await db.query.events.findFirst({ where: eq(events.id, eventId) })
  const [guestCount, postCount, mediaCount] = await Promise.all([
    db.select({ count: events.id }).from(guests).where(eq(guests.eventId, eventId)),
    db.select({ count: events.id }).from(posts).where(eq(posts.eventId, eventId)),
    db.select({ count: events.id }).from(mediaAssets).where(eq(mediaAssets.eventId, eventId)),
  ])
  return NextResponse.json({ event: ev, guests: guestCount.length, posts: postCount.length, media: mediaCount.length })
}
