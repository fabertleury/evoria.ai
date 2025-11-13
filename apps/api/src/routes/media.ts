import { Router } from 'express'
import { z } from 'zod'
import { db } from '../db'
import { mediaAssets } from '@shared/schema'
import { supabaseAdmin, SUPABASE_STORAGE_BUCKET } from '../services/supabase'
import { moderateMedia } from '../services/moderation'
import { moderationLogs } from '@shared/schema'
import { eq } from '@shared/schema'

const router = Router()

router.post('/', async (req, res) => {
  const body = z.object({ eventId: z.string(), guestId: z.string().optional(), type: z.enum(['image','video','audio']), url: z.string().url() }).safeParse(req.body)
  if (!body.success) return res.status(400).json({ message: 'Invalid payload' })
  const [asset] = await db.insert(mediaAssets).values({ eventId: body.data.eventId, guestId: body.data.guestId, type: body.data.type, url: body.data.url, status: 'pending' }).returning()
  const mod = await moderateMedia(asset.url, asset.type as any)
  await db.insert(moderationLogs).values({ eventId: asset.eventId, mediaId: asset.id, decision: mod.approved ? 'approved' : 'rejected', reason: mod.reason })
  if (mod.approved) {
    await db.update(mediaAssets).set({ status: 'approved' }).where(eq(mediaAssets.id, asset.id))
  } else {
    await db.update(mediaAssets).set({ status: 'rejected' }).where(eq(mediaAssets.id, asset.id))
  }
  res.json({ media: { ...asset, status: mod.approved ? 'approved' : 'rejected' } })
})

export default router
router.get('/:id', async (req, res) => {
  const id = req.params.id
  const asset = await db.query.mediaAssets.findFirst({ where: (t, { eq }) => eq(t.id, id) })
  if (!asset) return res.status(404).json({ message: 'Not found' })
  res.json({ media: asset })
})

router.get('/:id/read-url', async (req, res) => {
  const id = req.params.id
  const expires = parseInt((req.query.expires as string) || '3600', 10)
  const asset = await db.query.mediaAssets.findFirst({ where: (t, { eq }) => eq(t.id, id) })
  if (!asset) return res.status(404).json({ message: 'Not found' })
  const { data, error } = await supabaseAdmin.storage.from(SUPABASE_STORAGE_BUCKET).createSignedUrl(asset.url, expires)
  if (error) return res.status(500).json({ message: error.message })
  res.json({ url: data?.signedUrl, type: asset.type })
})
