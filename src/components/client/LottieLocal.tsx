"use client"
import { useEffect, useRef } from 'react'
import lottie from 'lottie-web'

export default function LottieLocal({ data, className }: { data: any; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current || !data) return
    const anim = lottie.loadAnimation({ container: ref.current, renderer: 'svg', loop: true, autoplay: true, animationData: data })
    return () => { anim.destroy() }
  }, [data])
  return <div ref={ref} className={className} />
}