"use client"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginRedirect() {
    const router = useRouter()

    useEffect(() => {
        // Redireciona para a página de login principal
        router.replace('/login')
    }, [router])

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-slate-400">Redirecionando para login...</div>
        </div>
    )
}