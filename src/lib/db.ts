import { Pool } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'

const globalForDb = global as unknown as { pool?: Pool }

export function getPool() {
  if (!globalForDb.pool) {
    const raw = (process.env.DATABASE_URL as string) || ''
    const s = raw.replace(/^"|"$/g, '')
    const re = /^postgres(?:ql)?:\/\/([^:]+):(.+)@([^\/:]+)(?::(\d+))?\/([^?]+)/
    const m = s.match(re)
    if (m) {
      const [, user, password, host, port, database] = m
      globalForDb.pool = new Pool({ user, password, host, port: port ? parseInt(port, 10) : 5432, database, ssl: { rejectUnauthorized: false } })
    } else {
      globalForDb.pool = new Pool({ connectionString: s, ssl: { rejectUnauthorized: false } })
    }
  }
  return globalForDb.pool
}

export function getDb() {
  return drizzle(getPool())
}
