import { Pool } from 'pg'
import bcrypt from 'bcryptjs'

async function resetAllAdminPasswords() {
    const DATABASE_URL = "postgresql://postgres.jrwzpkavlaxcweodumak:@Sucesso2026@aws-1-sa-east-1.pooler.supabase.com:6543/postgres"

    const pool = new Pool({
        connectionString: DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    })

    try {
        console.log('🔌 Conectando ao Supabase...')

        // Gera o hash da nova senha
        const newPassword = '123456789'
        const hash = await bcrypt.hash(newPassword, 10)
        console.log('🔐 Hash gerado para senha: 123456789')

        // Busca todos os usuários admin
        const { rows: admins } = await pool.query(
            "SELECT id, username, role FROM users WHERE role = 'admin'"
        )

        console.log(`\n📋 Encontrados ${admins.length} usuário(s) admin:`)
        admins.forEach(admin => {
            console.log(`   - ${admin.username} (${admin.role})`)
        })

        // Atualiza a senha de todos os admins
        const result = await pool.query(
            "UPDATE users SET password = $1 WHERE role = 'admin' RETURNING username, role",
            [hash]
        )

        console.log(`\n✅ Senha atualizada para ${result.rowCount} usuário(s)!`)
        console.log('\n🔑 Credenciais atualizadas:')
        result.rows.forEach(user => {
            console.log(`   Username: ${user.username}`)
            console.log(`   Password: 123456789`)
            console.log(`   Role: ${user.role}\n`)
        })

        await pool.end()
        console.log('✅ Concluído com sucesso!')

    } catch (error: any) {
        console.error('❌ Erro:', error.message)
        await pool.end()
        process.exit(1)
    }
}

resetAllAdminPasswords()
