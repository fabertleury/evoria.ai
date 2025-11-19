import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { users, eq } from '@/lib/schema'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json()

        console.log('======================')
        console.log('🧪 TEST LOGIN ROUTE')
        console.log('Username:', username)
        console.log('Password:', password)

        const db = getDb()
        const rows = await db.select().from(users).where(eq(users.username, username))
        const user = rows[0]

        if (!user) {
            console.log('❌ User not found')
            return NextResponse.json({
                success: false,
                error: 'User not found',
                username
            })
        }

        console.log('✅ User found in DB')
        console.log('User ID:', user.id)
        console.log('Username:', user.username)
        console.log('Role:', user.role)
        console.log('Hash in DB:', user.password)

        // Testa o bcrypt
        const match = await bcrypt.compare(password, user.password)
        console.log('🔐 Bcrypt compare result:', match)

        // Testa gerando um novo hash
        const newHash = await bcrypt.hash(password, 10)
        console.log('🆕 New hash generated:', newHash)

        const testMatch = await bcrypt.compare(password, newHash)
        console.log('✅ Test with new hash:', testMatch)

        console.log('======================')

        return NextResponse.json({
            success: match,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            },
            test: {
                passwordMatch: match,
                hashInDB: user.password,
                newHashGenerated: newHash,
                newHashMatches: testMatch
            }
        })

    } catch (error: any) {
        console.error('❌ Error in test login:', error)
        return NextResponse.json({
            success: false,
            error: error.message,
            stack: error.stack
        }, { status: 500 })
    }
}
