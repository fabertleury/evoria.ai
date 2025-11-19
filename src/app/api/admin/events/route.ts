import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { events } from '@/lib/schema'
import { requireRole } from '@/lib/auth'

export async function GET(req: Request) {
  const me = requireRole(req, ['admin'])
  if (!me) return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  const db = getDb()
  const rows = await db.select({ id: events.id, name: events.name, date: events.date, feedPrice: events.feedPrice, screenPrice: events.screenPrice }).from(events)
  return NextResponse.json({ events: rows })
}