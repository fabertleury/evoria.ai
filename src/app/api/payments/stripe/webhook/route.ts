import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

// Importar seu db e schema aqui
// import { db } from '@/lib/db'
// import { users, plans, transactions } from '@/lib/schema'
// import { eq } from 'drizzle-orm'

export async function POST(req: Request) {
    const body = await req.text()
    const signature = headers().get('Stripe-Signature') as string

    let event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error: any) {
        console.error(`Webhook Error: ${error.message}`)
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
    }

    const session = event.data.object as any

    if (event.type === 'checkout.session.completed') {
        // Recuperar metadados salvos na criação da sessão
        const { userId, planId, modules, affiliateCode } = session.metadata

        console.log('Pagamento confirmado para:', userId)
        console.log('Plano:', planId)
        console.log('Módulos:', modules)

        // 1. Atualizar status do usuário no banco de dados
        // Exemplo com Drizzle:
        /*
        await db.update(users)
          .set({ 
            planStatus: 'active',
            currentPlan: planId,
            modules: JSON.parse(modules || '[]')
          })
          .where(eq(users.id, userId))
        */

        // 2. Registrar transação
        /*
        await db.insert(transactions).values({
          userId,
          amount: session.amount_total / 100,
          status: 'paid',
          providerId: session.payment_intent
        })
        */

        // 3. Lógica de Afiliados (Se houver código de afiliado)
        if (affiliateCode) {
            console.log('Comissão para afiliado:', affiliateCode)
            // Calcular comissão (ex: 10% ou valor fixo)
            // Adicionar saldo à carteira do afiliado
        }
    }

    return new NextResponse(null, { status: 200 })
}
