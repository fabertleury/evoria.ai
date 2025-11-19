export function setToken(token: string) {
  try { localStorage.setItem('evoria_token', token) } catch {}
}

export function getToken(): string | null {
  try { return localStorage.getItem('evoria_token') } catch { return null }
}

export function clearToken() {
  try { localStorage.removeItem('evoria_token') } catch {}
}