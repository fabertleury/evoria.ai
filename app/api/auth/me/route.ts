import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { users } from '@/lib/schema'
import { eq } from 'drizzle-orm'
import { verify } from '@/lib/jwt'

export async function GET(req: Request) {
  const auth = req.headers.get('authorization')
  const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null
  const payload = token ? verify<{ sub: string }>(token) : null
  if (!payload?.sub) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const db = getDb()
  const user = await db.query.users.findFirst({ where: eq(users.id, payload.sub) })
  return NextResponse.json({ user })
}
