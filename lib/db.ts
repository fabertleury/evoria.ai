import { Pool } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'

const globalForDb = global as unknown as { pool?: Pool }

export function getPool() {
  if (!globalForDb.pool) {
    const url = process.env.DATABASE_URL as string
    globalForDb.pool = new Pool({ connectionString: url })
  }
  return globalForDb.pool
}

export function getDb() {
  return drizzle(getPool())
}
