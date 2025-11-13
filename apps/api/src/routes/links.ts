import { Router } from 'express'
import { config } from 'dotenv'
config({ path: '../../.env' })

const router = Router()

router.get('/events/:id/link', (req, res) => {
  const id = req.params.id
  const base = process.env.WEB_BASE_URL || 'http://localhost:3000'
  const url = `${base}/convidado?eventId=${encodeURIComponent(id)}`
  res.json({ url })
})

export default router
