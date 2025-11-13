import { getToken } from './auth'

export async function apiFetch(path: string, init?: RequestInit) {
  const token = getToken()
  const headers = { ...(init?.headers || {}), Authorization: token ? `Bearer ${token}` : '' }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`, { ...init, headers })
  return res
}
