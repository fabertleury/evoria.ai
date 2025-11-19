"use client"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminIndexPage() {
  const router = useRouter()

  useEffect(() => {
    // Redireciona para o dashboard
    router.replace('/admin/dashboard')
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p className="text-slate-400">Redirecionando...</p>
      </div>
    </div>
  )
}