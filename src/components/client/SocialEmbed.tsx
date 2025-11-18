"use client"
import { useEffect, useRef } from 'react'

function ensureScript(src: string) {
  if (document.querySelector(`script[src="${src}"]`)) return
  const s = document.createElement('script')
  s.src = src
  s.async = true
  document.body.appendChild(s)
}

export default function SocialEmbed({ url, className }: { url: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isTikTok = /tiktok\.com/.test(url)
  const isInstagram = /instagram\.com/.test(url)
  useEffect(() => {
    if (isTikTok) ensureScript('https://www.tiktok.com/embed.js')
    if (isInstagram) ensureScript('https://www.instagram.com/embed.js')
    const id = setTimeout(() => { (window as any).instgrm?.Embeds?.process?.() }, 300)
    return () => clearTimeout(id)
  }, [url])
  return (
    <div ref={ref} className={`social-embed ${className||''}`}>
      {isTikTok && (
        <blockquote className="tiktok-embed" cite={url} data-video-id="" style={{ width: '100%', height: '100%' }}>
          <section>
            <a target="_blank" rel="noopener" href={url}>Ver no TikTok</a>
          </section>
        </blockquote>
      )}
      {isInstagram && (
        <blockquote className="instagram-media" data-instgrm-permalink={url} data-instgrm-version="14" style={{ background: 'transparent', width: '100%', height: '100%' }}>
          <a target="_blank" rel="noopener" href={url}>Ver no Instagram</a>
        </blockquote>
      )}
      {!isTikTok && !isInstagram && (
        <a target="_blank" rel="noopener" href={url}>Abrir vídeo</a>
      )}
    </div>
  )
}