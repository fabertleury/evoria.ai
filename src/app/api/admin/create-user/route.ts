import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { users, eq } from '@/lib/schema'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json()

        if (!username || !password) {
            return NextResponse.json({ error: 'Username and password required' }, { status: 400 })
        }

        const db = getDb()

        // Verifica se já existe
        const existing = await db.select().from(users).where(eq(users.username, username))

        if (existing.length > 0) {
            return NextResponse.json({ error: 'User already exists', user: { username: existing[0].username, role: existing[0].role } }, { status: 409 })
        }

        // Cria o hash da senha
        const hash = await bcrypt.hash(password, 10)

        // Insere o usuário
        const result = await db.insert(users).values({
            username,
            password: hash,
            role: 'admin'
        }).returning({ id: users.id, username: users.username, role: users.role })

        return NextResponse.json({
            success: true,
            user: result[0],
            message: 'Admin user created successfully'
        })
    } catch (error: any) {
        console.error('Create admin error:', error)
        return NextResponse.json({ error: error.message || 'Failed to create admin user' }, { status: 500 })
    }
}

// GET para listar usuários (apenas para debug)
export async function GET() {
    try {
        const db = getDb()
        const allUsers = await db.select({
            id: users.id,
            username: users.username,
            role: users.role
        }).from(users)

        return NextResponse.json({ users: allUsers })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
