export function getToken() {
  if (typeof window === 'undefined') return ''
  return localStorage.getItem('evoria_token') || ''
}

export function setToken(t: string) {
  if (typeof window === 'undefined') return
  localStorage.setItem('evoria_token', t)
}
