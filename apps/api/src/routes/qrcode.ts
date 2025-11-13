import { Router } from 'express'
import QRCode from 'qrcode'
import { config } from 'dotenv'
config({ path: '../../.env' })

const router = Router()

router.get('/events/:id/qrcode', async (req, res) => {
  const id = req.params.id
  const base = process.env.WEB_BASE_URL || 'http://localhost:3000'
  const url = `${base}/convidado?eventId=${encodeURIComponent(id)}`
  const dataUrl = await QRCode.toDataURL(url, { margin: 1, width: 512 })
  res.json({ url, qrcode: dataUrl })
})

export default router
