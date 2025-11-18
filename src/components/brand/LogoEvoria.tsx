export default function LogoEvoria({ height = 28 }: { height?: number }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <svg width={height} height={height} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="evoriaHeart" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#EC4899" />
            <stop offset="60%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          <filter id="evoriaGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        <path d="M32 58l-3-2C14 44 6 36 6 26 6 17 13 10 22 10c6 0 10 3 12 7 2-4 6-7 12-7 9 0 16 7 16 16 0 10-8 18-23 30l-7 5z" fill="url(#evoriaHeart)" opacity="0.95" />
        <path d="M32 58l-3-2C14 44 6 36 6 26 6 17 13 10 22 10c6 0 10 3 12 7 2-4 6-7 12-7 9 0 16 7 16 16 0 10-8 18-23 30l-7 5z" fill="#EC4899" opacity="0.25" filter="url(#evoriaGlow)" />
      </svg>
      <span style={{ fontWeight: 800, letterSpacing: 0.8, fontSize: 18 }}>EVORIA</span>
    </div>
  )
}