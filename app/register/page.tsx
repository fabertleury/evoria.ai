"use client"
import AuthForm from '@/components/auth/AuthForm'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const submit = async (email: string, password: string, name?: string) => {
    const { error } = await supabase.auth.signUp({ email, password, options: { data: { name, role: 'host' } } })
    if (!error) router.push('/admin')
  }
  return <AuthForm mode="register" onSubmit={submit} />
}
