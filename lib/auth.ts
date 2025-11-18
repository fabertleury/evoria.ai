import { verify } from '@/lib/jwt'

export type AuthedUser = { sub: string; role?: 'admin' | 'anfitriao' | 'convidado' }

export function getUserFromAuth(req: Request): AuthedUser | null {
  const auth = req.headers.get('authorization')
  const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null
  const payload = token ? verify<AuthedUser>(token) : null
  return payload || null
}

export function requireRole(req: Request, roles: AuthedUser['role'][]): AuthedUser | null {
  const user = getUserFromAuth(req)
  if (!user || !user.role || !roles.includes(user.role)) return null
  return user
}
