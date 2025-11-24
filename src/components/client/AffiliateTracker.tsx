"use client"
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function AffiliateTracker() {
    const searchParams = useSearchParams()

    useEffect(() => {
        const ref = searchParams.get('ref')
        if (ref) {
            localStorage.setItem('evoria_affiliate_code', ref)
            console.log('Afiliado registrado:', ref)
        }
    }, [searchParams])

    return null // Componente invisível
}
