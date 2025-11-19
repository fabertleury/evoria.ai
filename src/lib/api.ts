import { getToken } from './clientAuth'

export async function apiFetch(path: string, init?: RequestInit): Promise<Response> {
  const base = (process.env.NEXT_PUBLIC_BASE_URL as string) || ''
  const url = `${base ? base.replace(/^"|"$/g, '') : ''}/api${path}`
  const token = getToken()
  const headers: Record<string, string> = { ...(init?.headers as Record<string,string> || {}) }
  if (token && !headers['Authorization']) headers['Authorization'] = `Bearer ${token}`
  return fetch(url, { ...init, headers })
}