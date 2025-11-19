import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { users, eq } from '@/lib/schema'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'evoria-dev-secret-2024'

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json()
    console.log('🔐 Login attempt for:', username)

    if (!username || !password) {
      console.log('❌ Missing credentials')
      return NextResponse.json({ error: 'missing credentials' }, { status: 400 })
    }

    const db = getDb()
    const rows = await db.select().from(users).where(eq(users.username, username))
    const user = rows[0]

    if (!user) {
      console.log('❌ User not found:', username)
      return NextResponse.json({ error: 'invalid credentials' }, { status: 401 })
    }

    console.log('✅ User found:', user.username)

    const ok = await bcrypt.compare(password, user.password)
    console.log('🔐 Password check:', ok)

    if (!ok) {
      console.log('❌ Invalid password')
      return NextResponse.json({ error: 'invalid credentials' }, { status: 401 })
    }

    // Gera o token JWT
    const token = jwt.sign(
      { sub: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    )
    console.log('✅ Token generated successfully')

    const res = NextResponse.json({
      token,
      user: { id: user.id, username: user.username, role: user.role }
    })

    res.headers.set('Set-Cookie', [
      `evoria_token=${token}; Path=/; HttpOnly; Max-Age=${7 * 24 * 60 * 60}`,
      `role=${user.role}; Path=/; Max-Age=${7 * 24 * 60 * 60}`
    ].join(', '))

    console.log('✅ Login successful for:', username, 'Role:', user.role)
    return res

  } catch (error: any) {
    console.error('❌ Login error:', error.message, error.stack)
    return NextResponse.json({
      error: 'login failed',
      details: error.message
    }, { status: 500 })
  }
}