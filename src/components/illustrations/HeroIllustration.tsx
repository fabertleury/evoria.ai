export default function HeroIllustration({ className = 'w-80 h-80' }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 600" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="g" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#EC4899" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#f472b6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#EC4899" stopOpacity="0" />
        </radialGradient>
        <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="20" />
        </filter>
      </defs>
      <circle cx="300" cy="300" r="260" fill="url(#g)" filter="url(#blur)" />

      <rect x="90" y="180" width="180" height="180" rx="16" fill="#0f182c" stroke="#EC4899" strokeOpacity="0.3" />
      <g fill="#e5e7eb">
        <rect x="110" y="200" width="18" height="18" />
        <rect x="130" y="200" width="18" height="18" />
        <rect x="150" y="200" width="18" height="18" />
        <rect x="110" y="220" width="18" height="18" />
        <rect x="130" y="220" width="18" height="18" />
        <rect x="170" y="200" width="18" height="18" />
        <rect x="190" y="200" width="18" height="18" />
        <rect x="210" y="200" width="18" height="18" />
        <rect x="190" y="220" width="18" height="18" />
        <rect x="210" y="220" width="18" height="18" />
        <rect x="110" y="260" width="18" height="18" />
        <rect x="130" y="260" width="18" height="18" />
        <rect x="170" y="260" width="18" height="18" />
        <rect x="190" y="260" width="18" height="18" />
        <rect x="210" y="260" width="18" height="18" />
      </g>

      <g transform="rotate(-18 400 330)">
        <rect x="320" y="180" width="180" height="340" rx="38" fill="#0f182c" stroke="#333" />
        <rect x="335" y="230" width="150" height="230" rx="16" fill="#10172a" />
        <circle cx="410" cy="210" r="4" fill="#999" />
        <rect x="370" y="480" width="80" height="10" rx="5" fill="#1f2937" />
        <g>
          <circle cx="360" cy="260" r="8" fill="#EC4899" />
          <circle cx="410" cy="300" r="8" fill="#EC4899" />
          <circle cx="450" cy="340" r="8" fill="#EC4899" />
        </g>
      </g>

      <path d="M120 420c80-120 220-120 360 0" stroke="#f472b6" strokeWidth="14" fill="none" opacity="0.7" />
      <path d="M140 450c90-90 210-90 340 0" stroke="#EC4899" strokeWidth="10" fill="none" opacity="0.6" />

      <g>
        <circle cx="520" cy="160" r="18" fill="#f472b6" />
        <path d="M520 170c-6-6-12-12-12-18 0-10 12-12 12-2 0-10 12-8 12 2 0 6-6 12-12 18z" fill="#fff" opacity="0.9" />
      </g>
      <g>
        <circle cx="120" cy="140" r="14" fill="#EC4899" />
        <path d="M120 148c-5-5-10-10-10-15 0-8 10-9 10-1 0-8 10-7 10 1 0 5-5 10-10 15z" fill="#fff" opacity="0.9" />
      </g>
    </svg>
  )
}
