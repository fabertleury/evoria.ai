import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { users } from '@/lib/schema'
import { requireRole } from '@/lib/auth'

export async function GET(req: Request) {
  const me = requireRole(req, ['admin'])
  if (!me) return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  const db = getDb()
  const rows = await db.select({ id: users.id, username: users.username, role: users.role }).from(users)
  return NextResponse.json({ users: rows })
}