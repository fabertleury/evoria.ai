export async function apiFetch(path: string, init?: RequestInit) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || ''
  const url = `${base}${path.startsWith('/api') ? path : `/api${path}`}`
  return fetch(url, init)
}
