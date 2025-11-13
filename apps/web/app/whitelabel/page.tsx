"use client"
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function WhiteLabelLandingPage() {
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [domain, setDomain] = useState('')
  const [plan, setPlan] = useState<'monthly'|'per_event'>('monthly')
  const submit = async () => {
    alert('Recebemos seu interesse. Entraremos em contato por e-mail para configurar o white-label.')
  }
  return (
    <main className="p-8 space-y-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">Plano White-Label — Evoria.ai for Business</h1>
      <p>Revenda o Evoria.ai com sua marca, domínio e painel próprio.</p>
      <div className="grid grid-cols-2 gap-3">
        <Input value={company} onChange={e=>setCompany(e.target.value)} placeholder="Nome da empresa" />
        <Input value={email} onChange={e=>setEmail(e.target.value)} placeholder="E-mail" />
        <Input value={domain} onChange={e=>setDomain(e.target.value)} placeholder="Domínio desejado (ex: app.suaempresa.com)" />
        <select value={plan} onChange={e=>setPlan(e.target.value as any)} className="border rounded px-2">
          <option value="monthly">Mensal (ex: R$499/mês)</option>
          <option value="per_event">Por evento (ex: R$5/evento)</option>
        </select>
      </div>
      <Button onClick={submit}>Quero contratar o White-Label</Button>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Recursos inclusos</h2>
        <ul className="list-disc pl-6 text-sm">
          <li>Logo, cores e domínio personalizados</li>
          <li>Painel de gestão de clientes e eventos</li>
          <li>Dashboard de faturamento e relatórios</li>
          <li>Customização de marca (cores, textos, favicon, QR Code com logo)</li>
          <li>Automação de cobrança</li>
          <li>Estatísticas gerais dos eventos dos clientes</li>
          <li>Suporte técnico via canal dedicado</li>
        </ul>
      </div>
    </main>
  )
}
