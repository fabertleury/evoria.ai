import pg from 'pg'

const tables = [
  'users',
  'events',
  'event_modules',
  'guests',
  'media_assets',
  'posts',
  'credits_wallets',
  'transactions',
  'moderation_logs',
  'broadcast_sessions',
]

async function main() {
  const url = process.env.DATABASE_URL as string
  if (!url) throw new Error('DATABASE_URL missing')
  const pool = new pg.Pool({ connectionString: url })
  try {
    const existing = await pool.query(`select tablename from pg_tables where schemaname='public'`)
    const set = new Set(existing.rows.map((r: any) => r.tablename as string))
    for (const t of tables) {
      if (!set.has(t)) continue
      try {
        await pool.query(`alter table if exists public.${t} enable row level security;`)
        await pool.query(`alter table if exists public.${t} force row level security;`)
        const { rows } = await pool.query(`select policyname from pg_policies where schemaname='public' and tablename=$1`, [t])
        for (const r of rows as { policyname: string }[]) {
          await pool.query(`drop policy if exists ${r.policyname} on public.${t};`)
        }
        console.log('RLS applied on', t)
      } catch (e: any) {
        console.error('RLS error on', t, e?.message)
      }
    }
  } finally {
    await pool.end()
  }
}

main()
