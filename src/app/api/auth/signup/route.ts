import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { users } from '@/lib/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { username, email, password, affiliateCode } = body

        if (!username || !password) {
            return NextResponse.json(
                { error: 'Username e senha são obrigatórios' },
                { status: 400 }
            )
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: 'A senha deve ter no mínimo 6 caracteres' },
                { status: 400 }
            )
        }

        const db = getDb()

        // Verifica se usuário já existe
        const existingUsers = await db
            .select()
            .from(users)
            .where(eq(users.username, username))
            .limit(1)

        if (existingUsers.length > 0) {
            return NextResponse.json(
                { error: 'Nome de usuário já está em uso' },
                { status: 409 }
            )
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(password, 10)

        // Criar usuário como anfitrião
        const newUser = await db
            .insert(users)
            .values({
                username,
                password: hashedPassword,
                role: 'anfitriao',
                referredBy: affiliateCode || null // Salva quem indicou
            })
            .returning()

        return NextResponse.json({
            success: true,
            user: {
                id: newUser[0].id,
                username: newUser[0].username,
                role: newUser[0].role
            }
        })
    } catch (error) {
        console.error('Erro ao registrar usuário:', error)
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        )
    }
}
