import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { users, insertUserSchema, eq } from '@/lib/schema'
import bcrypt from 'bcryptjs'
import { requireRole } from '@/lib/auth'

export async function POST(req: Request) {
  const me = requireRole(req, ['admin'])
  if (!me) return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  try {
    const body = await req.json()
    const parsed = insertUserSchema.safeParse(body)
    if (!parsed.success) return NextResponse.json({ error: 'invalid payload' }, { status: 400 })
    const db = getDb()
    const exists = await db.select().from(users).where(eq(users.username, parsed.data.username))
    if (exists[0]) return NextResponse.json({ error: 'username taken' }, { status: 409 })
    const hash = await bcrypt.hash(parsed.data.password, 10)
    const role = (typeof (body?.role) === 'string' && ['admin','anfitriao','convidado'].includes(body.role)) ? body.role : 'anfitriao'
    const rows = await db.insert(users).values({ username: parsed.data.username, password: hash, role }).returning({ id: users.id, username: users.username, role: users.role })
    const u = rows[0]
    return NextResponse.json({ user: u }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'register failed' }, { status: 500 })
  }
}