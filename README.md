# Evoria.ai

- Frontend: Next.js (PWA)
- Backend: Laravel (REST + WebSocket)
- Banco: Supabase (PostgreSQL gerenciado)
- Storage: Supabase Storage ou S3
- Realtime: Supabase Realtime
- Fila: RabbitMQ
- Pagamentos: Stripe + Pix

## Requisitos
- Node 18+
- PHP 8.2+, Composer
- Conta Supabase e Stripe

## Configuração
- Copie `.env.example` para `.env` e preencha variáveis.
- Crie projeto no Supabase e buckets necessários.
- Configure webhook do Stripe apontando para `/api/payments/stripe/webhook`.

### DATABASE_URL (Supabase)
Use a URL de conexão do Supabase, por exemplo:
`DATABASE_URL="postgresql://postgres.jrwzpkavlaxcweodumak:[YOUR-PASSWORD]@aws-1-sa-east-1.pooler.supabase.com:6543/postgres"`

## Frontend (apps/web)
- `cd apps/web`
- `npm install`
- `npm run dev`

## Backend (apps/api)
- `cd apps/api`
- `composer create-project laravel/laravel .`
- Configure `.env` com Supabase, Stripe e RabbitMQ.
- `php artisan serve`

## Estrutura
- `apps/web`: Next.js PWA com Supabase client.
- `apps/api`: Laravel, migrations e broadcasting.
- `packages/shared`: tipos e contratos de API.

## Módulos
- Admin, Anfitrião, Convidado, Telão, Feed, Créditos, Moderação, Pagamentos.

### Roles
- `admin`: controle do sistema
- `anfitriao`: cria/gerencia eventos
- `convidado`: interage via QR Code

## Deploy
- Configure chaves e variáveis de ambiente.
- Execute migrations e filas.
