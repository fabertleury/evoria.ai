import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { users } from '@/lib/schema'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { sign } from '@/lib/jwt'
import { eq } from 'drizzle-orm'

const schema = z.object({ username: z.string(), password: z.string() })

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  const db = getDb()
  const found = await db.query.users.findFirst({ where: eq(users.username, parsed.data.username) })
  if (!found) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  const ok = await bcrypt.compare(parsed.data.password, found.password)
  if (!ok) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  const token = sign({ sub: found.id })
  return NextResponse.json({ token, user: found })
}
