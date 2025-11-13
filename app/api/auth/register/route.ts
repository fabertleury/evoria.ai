import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { users } from '@/lib/schema'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { sign } from '@/lib/jwt'

const schema = z.object({ username: z.string().min(3), password: z.string().min(6) })

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid payload', issues: parsed.error.issues }, { status: 400 })
  const db = getDb()
  const hash = await bcrypt.hash(parsed.data.password, 10)
  const inserted = await db.insert(users).values({ username: parsed.data.username, password: hash }).returning()
  const token = sign({ sub: inserted[0].id })
  return NextResponse.json({ token, user: inserted[0] })
}
