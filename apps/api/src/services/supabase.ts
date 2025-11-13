import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
config({ path: '../../.env' })

export const SUPABASE_URL = process.env.SUPABASE_URL as string
export const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY as string
export const SUPABASE_STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || 'evoria-media'

export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

export async function ensureBucket() {
  const { data: list } = await supabaseAdmin.storage.listBuckets()
  const exists = list?.some(b => b.name === SUPABASE_STORAGE_BUCKET)
  if (!exists) {
    await supabaseAdmin.storage.createBucket(SUPABASE_STORAGE_BUCKET, { public: false })
  }
}
