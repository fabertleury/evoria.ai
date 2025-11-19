export function setToken(token: string) {
  try { localStorage.setItem('evoria_token', token) } catch { }
}

export function getToken(): string | null {
  try { return localStorage.getItem('evoria_token') } catch { return null }
}

export function clearToken() {
  try { localStorage.removeItem('evoria_token') } catch { }
}

import { verify } from './jwt'

export type AuthedUser = { sub: string; role?: 'admin' | 'anfitriao' | 'convidado' }

export function getUserFromAuth(req: Request): AuthedUser | null {
  const auth = req.headers.get('authorization')
  console.log('🔍 Authorization header:', auth ? auth.substring(0, 20) + '...' : 'MISSING')

  const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null
  console.log('🎫 Token extracted:', token ? 'YES' : 'NO')

  const payload = token ? verify<AuthedUser>(token) : null
  console.log('👤 Payload decoded:', payload ? { sub: payload.sub, role: payload.role } : 'NULL')

  return payload || null
}

export function requireRole(req: Request, roles: AuthedUser['role'][]): AuthedUser | null {
  const user = getUserFromAuth(req)
  console.log('🔐 requireRole check - User:', user, 'Required roles:', roles)

  if (!user || !user.role || !roles.includes(user.role)) {
    console.log('❌ Access denied - user role:', user?.role, 'required:', roles)
    return null
  }

  console.log('✅ Access granted for role:', user.role)
  return user
}