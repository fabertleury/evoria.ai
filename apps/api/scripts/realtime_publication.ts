import pg from 'pg'

const tables = [
  'events',
  'event_modules',
  'guests',
  'media_assets',
  'posts',
  'transactions',
  'broadcast_sessions'
]

async function main() {
  const url = process.env.DATABASE_URL as string
  if (!url) throw new Error('DATABASE_URL missing')
  const pool = new pg.Pool({ connectionString: url })
  try {
    for (const t of tables) {
      try {
        await pool.query(`alter publication supabase_realtime add table public.${t};`)
        console.log('Realtime publication added:', t)
      } catch (e: any) {
        if (String(e?.code) === '42710') {
          console.log('Already in publication:', t)
        } else {
          console.error('Publication error:', t, e?.message)
        }
      }
    }
  } finally {
    await pool.end()
  }
}

main()
