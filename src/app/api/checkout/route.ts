import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

const PLAN_PRICES = {
    'basic': 2990, // R$ 29,90
    'premium': 5990, // R$ 59,90
}

const MODULE_PRICES = {
    'screen': 2990, // R$ 29,90
    'feed': 2490, // R$ 24,90
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { planId, modules, userId } = body

        const lineItems = []

        // Adicionar Plano
        if (planId && PLAN_PRICES[planId as keyof typeof PLAN_PRICES]) {
            lineItems.push({
                price_data: {
                    currency: 'brl',
                    product_data: {
                        name: planId === 'basic' ? 'Plano Básico' : 'Plano Premium',
                        description: 'Assinatura por evento Evoria.ai',
                    },
                    unit_amount: PLAN_PRICES[planId as keyof typeof PLAN_PRICES],
                },
                quantity: 1,
            })
        }

        // Adicionar Módulos
        if (modules && Array.isArray(modules)) {
            modules.forEach((modId: string) => {
                if (MODULE_PRICES[modId as keyof typeof MODULE_PRICES]) {
                    lineItems.push({
                        price_data: {
                            currency: 'brl',
                            product_data: {
                                name: modId === 'screen' ? 'Módulo Telão' : 'Módulo Feed',
                                description: 'Funcionalidade extra para seu evento',
                            },
                            unit_amount: MODULE_PRICES[modId as keyof typeof MODULE_PRICES],
                        },
                        quantity: 1,
                    })
                }
            })
        }

        // Aplicar desconto combo (se tiver os 2 módulos) - Lógica simplificada
        // O Stripe suporta cupons, mas para simplificar aqui, vamos deixar sem desconto automático no checkout session por enquanto
        // ou criar um item de desconto negativo se necessário, mas o ideal é usar Coupons do Stripe.

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'], // Adicionar 'pix' se ativado no painel do Stripe
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/cliente/dashboard?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/cliente/planos?canceled=true`,
            metadata: {
                userId: userId || 'guest',
                planId: planId,
                modules: JSON.stringify(modules),
            },
        })

        return NextResponse.json({ url: session.url })
    } catch (error) {
        console.error('Erro ao criar sessão de checkout:', error)
        return NextResponse.json({ error: 'Erro interno ao processar pagamento' }, { status: 500 })
    }
}
