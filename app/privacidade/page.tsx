export default function PrivacyPage() {
  return (
    <main className="container py-12 space-y-6">
      <h1 className="text-3xl font-bold">Termos de privacidade</h1>
      <p className="text-muted">Como tratamos dados pessoais e informações coletadas pela Evoria.ai.</p>
      <ul className="list-disc pl-6 space-y-2 text-sm text-muted">
        <li>Coletamos dados mínimos necessários para operar o serviço.</li>
        <li>Você pode solicitar a exclusão de dados entrando em contato com o suporte.</li>
        <li>Dados podem ser armazenados em provedores como Supabase, seguindo boas práticas de segurança.</li>
      </ul>
    </main>
  )
}
