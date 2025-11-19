import { getDb } from '../src/lib/db'
import { users, eq } from '../src/lib/schema'
import bcrypt from 'bcryptjs'

async function main() {
  const username = (process.env.ADMIN_USERNAME as string) || 'admin'
  const password = (process.env.ADMIN_PASSWORD as string) || 'admin123'
  const db = getDb()
  const existing = await db.select().from(users).where(eq(users.username, username))
  if (existing[0]) { process.stdout.write('exists\n'); return }
  const hash = await bcrypt.hash(password, 10)
  const rows = await db.insert(users).values({ username, password: hash, role: 'admin' }).returning({ id: users.id })
  process.stdout.write((rows[0]?.id || '') + '\n')
}

main().then(()=>process.exit(0)).catch((e)=>{ process.stderr.write(String(e)+'\n'); process.exit(1) })