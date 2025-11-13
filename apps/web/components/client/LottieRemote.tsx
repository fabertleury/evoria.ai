"use client"
import { useEffect, useRef, useState } from 'react'
import lottie from 'lottie-web'

export default function LottieRemote({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [json, setJson] = useState<any | null>(null)
  useEffect(() => {
    const load = async () => {
      try {
        const r = await fetch(src)
        if (!r.ok) return
        const j = await r.json()
        setJson(j)
      } catch {}
    }
    load()
  }, [src])
  useEffect(() => {
    if (!ref.current || !json) return
    const anim = lottie.loadAnimation({ container: ref.current, renderer: 'svg', loop: true, autoplay: true, animationData: json })
    return () => { anim.destroy() }
  }, [json])
  return <div ref={ref} className={className} />
}
