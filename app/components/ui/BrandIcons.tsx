export function BrandIcon({ name, className = 'h-6 w-6' }: { name: 'tiktok' | 'instagram' | 'reddit' | 'whatsapp'; className?: string }) {
  switch (name) {
    case 'tiktok':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
          <path d="M16 3c1 2 2 3 4 3v3c-2 0-3-1-4-2v7a5 5 0 11-5-5h1v3a2 2 0 10-2 2 2 2 0 002-2V3h4z" />
        </svg>
      )
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17" cy="7" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'reddit':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <circle cx="12" cy="12" r="7" />
          <circle cx="9" cy="12" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="15" cy="12" r="1.5" fill="currentColor" stroke="none" />
          <path d="M8 15c2 2 6 2 8 0" />
          <circle cx="18" cy="6" r="2" />
          <path d="M16 6l-3-1 1 3" />
        </svg>
      )
    case 'whatsapp':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
          <path d="M20 12a8 8 0 11-14.7 4.6L4 21l4.5-1.3A8 8 0 1120 12zm-5.6-1.3c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.8.4-.3.3-1 .9-1 .9s-1.2-.6-1.7-1.1c-.5-.5-1.1-1.7-1.1-1.7s.6-.7.9-1c.3-.3.4-.6.4-.8V7c0-.2 0-.4-.4-.6-.4-.2-1-.5-1-.5s-.6-.2-1 .1c-.4.3-1.3 1.3-1.3 3s1.3 3.4 1.5 3.6c.2.2 2.6 2.7 5 3 .5.1 1.8.1 2.8-1s1-2.4 1-2.8c0-.4-.3-.6-.5-.7-.2-.1-1-.3-1-.3z" />
        </svg>
      )
  }
}
