import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { users, eq } from '@/lib/schema'
import { getUserFromAuth } from '@/lib/auth'

export async function GET(req: Request) {
  try {
    const userPayload = getUserFromAuth(req)
    if (!userPayload?.sub) return NextResponse.json({ user: null }, { status: 401 })
    const db = getDb()
    const rows = await db.select().from(users).where(eq(users.id, userPayload.sub))
    const u = rows[0]
    if (!u) return NextResponse.json({ user: null }, { status: 404 })
    return NextResponse.json({ user: { id: u.id, username: u.username, role: u.role } })
  } catch {
    return NextResponse.json({ user: null }, { status: 500 })
  }
}