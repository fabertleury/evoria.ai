import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'evoria-dev-secret-2024'

export function sign(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' })
}

export function verify<T = any>(token: string): T | null {
  try {
    return jwt.verify(token, SECRET) as T
  } catch (error) {
    console.log('JWT verify failed:', error instanceof Error ? error.message : error)
    return null
  }
}
