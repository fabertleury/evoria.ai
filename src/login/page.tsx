"use client"
import AuthForm from '@/components/auth/AuthForm'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const submit = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (!error) {
      const { data } = await supabase.auth.getUser()
      const role = (data.user?.user_metadata as any)?.role || 'host'
      router.push(role === 'admin' ? '/admin' : '/anfitriao')
    }
  }
  return <AuthForm mode="login" onSubmit={submit} />
}
