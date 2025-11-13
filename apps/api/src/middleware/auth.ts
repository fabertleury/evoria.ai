import { Request, Response, NextFunction, RequestHandler } from 'express'
import { verify } from '../utils/jwt'
import { db } from '../db'
import { users } from '@shared/schema'

export type AuthedRequest = Request & { user?: { id: string; role: string } }

export const requireAuth: RequestHandler = async (req, res, next) => {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''
  if (!token) return res.status(401).json({ message: 'Unauthorized' })
  try {
    const payload = verify(token) as { sub: string }
    const u = await db.query.users.findFirst({ where: (t, { eq }) => eq(t.id, payload.sub) })
    if (!u) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }
    (req as AuthedRequest).user = { id: u.id, role: u.role }
    next()
  } catch {
    res.status(401).json({ message: 'Unauthorized' })
  }
}

export function requireRole(roles: string[]): RequestHandler {
  return (req, res, next) => {
    const role = (req as AuthedRequest).user?.role
    if (!role || !roles.includes(role)) return res.status(403).json({ message: 'Forbidden' })
    next()
  }
}
