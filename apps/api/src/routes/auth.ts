import { Router } from 'express'
import { db } from '../db'
import { users, insertUserSchema } from '@shared/schema'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { sign } from '../utils/jwt'
import { requireAuth, AuthedRequest } from '../middleware/auth'

const router = Router()

router.post('/register', async (req, res) => {
  const parsed = insertUserSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ message: 'Invalid payload' })
  const { username, password } = parsed.data
  const hash = await bcrypt.hash(password, 10)
  const inserted = await db.insert(users).values({ username, password: hash }).returning()
  const token = sign({ sub: inserted[0].id })
  res.json({ token, user: inserted[0] })
})

router.post('/login', async (req, res) => {
  const body = z.object({ username: z.string(), password: z.string() }).parse(req.body)
  const found = await db.query.users.findFirst({ where: (u, { eq }) => eq(u.username, body.username) })
  if (!found) return res.status(401).json({ message: 'Invalid credentials' })
  const ok = await bcrypt.compare(body.password, found.password)
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' })
  const token = sign({ sub: found.id })
  res.json({ token, user: found })
})

router.get('/me', requireAuth, async (req, res) => {
  const user = await db.query.users.findFirst({ where: (u, { eq }) => eq(u.id, (req as AuthedRequest).user!.id) })
  res.json({ user })
})

export default router
