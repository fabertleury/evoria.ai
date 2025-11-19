import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { users, eq } from '@/lib/schema'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
    try {
        const { username, newPassword } = await req.json()

        if (!username || !newPassword) {
            return NextResponse.json({ error: 'Username and newPassword required' }, { status: 400 })
        }

        const db = getDb()

        // Busca o usuário
        const existing = await db.select().from(users).where(eq(users.username, username))

        if (existing.length === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        // Gera novo hash
        const hash = await bcrypt.hash(newPassword, 10)

        // Atualiza a senha
        await db.update(users)
            .set({ password: hash })
            .where(eq(users.username, username))

        return NextResponse.json({
            success: true,
            message: `Password updated for user: ${username}`,
            user: {
                username: existing[0].username,
                role: existing[0].role
            }
        })
    } catch (error: any) {
        console.error('Reset password error:', error)
        return NextResponse.json({ error: error.message || 'Failed to reset password' }, { status: 500 })
    }
}
