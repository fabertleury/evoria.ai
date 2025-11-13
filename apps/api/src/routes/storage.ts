import { Router } from 'express'
import { ensureBucket, supabaseAdmin, SUPABASE_STORAGE_BUCKET } from '../services/supabase'
import { z } from 'zod'

const router = Router()

router.post('/signed-upload', async (req, res) => {
  const body = z.object({ path: z.string(), contentType: z.string().optional() }).safeParse(req.body)
  if (!body.success) return res.status(400).json({ message: 'Invalid payload' })
  await ensureBucket()
  const { data, error } = await supabaseAdmin.storage.from(SUPABASE_STORAGE_BUCKET).createSignedUploadUrl(body.data.path)
  if (error) return res.status(500).json({ message: error.message })
  res.json({ url: data?.signedUrl, path: body.data.path })
})

export default router
