## Diagnóstico Atual
- Repositório contém um client React com Vite e shadcn (`client/`) e um servidor Express/TS (`server/`), além de Drizzle + Postgres (Neon) (`drizzle.config.ts`, `server/db.ts`).
- A documentação em `site.md` define como alvo: Frontend Next.js PWA, Backend Laravel com REST + WebSocket, PostgreSQL, Storage S3/Supabase, Realtime Pusher/Supabase/Socket.IO, Workers BullMQ/RabbitMQ, Pagamentos Stripe + Pix (site.md:85–92,112).
- Há muitos componentes UI reutilizáveis já prontos em `client/src/components/ui/*` (shadcn), e telas de exemplo em `client/src/components/examples/*`.

## Decisões Técnicas Propostas
- Banco de dados: usar Supabase (PostgreSQL gerenciado) para DB + Storage + Realtime. Atualizar `site.md` de “PostgreSQL” para “Supabase (PostgreSQL gerenciado)” (site.md:112).
- Realtime: padronizar em Supabase Realtime para eventos, Telão e Feed; manter compatibilidade com Laravel Broadcasting/Pusher se necessário em admin, mas evitar múltiplos provedores.
- Workers: escolher RabbitMQ integrado ao Laravel Queue (via pacote AMQP), pois BullMQ exige Node; se necessário, manter um microserviço Node para tarefas específicas de IA, mas preferir centralizar na fila única.
- Pagamentos: usar Stripe (inclui Pix no Brasil) para unificar pagamentos e webhooks.
- Autenticação: centralizar no Laravel (Sanctum/Passport com JWT) para anfitriões/admin; convidados usam fluxos leves (guest token) sem criar contas formais. Evitar duplicidade com Supabase Auth; usar apenas Supabase Realtime/Storage.

## Ajustes no `site.md`
1. Substituir Banco de Dados por “Supabase (PostgreSQL gerenciado)” (site.md:112).
2. Fixar Realtime como “Supabase Realtime” (site.md:12,89) e citar integração com Laravel Broadcasting quando preciso.
3. Definir Workers como “RabbitMQ (Laravel Queue)” com possibilidade de microserviço Node opcional.
4. Detalhar regras do Sistema de Créditos e reconciliação (site.md:101,105): crédito por ação, estorno em moderação negativa, auditoria.
5. Adicionar matriz de permissões: Admin, Anfitrião, Convidado (site.md:31–39,42–51,54–61).
6. Especificar limites de mídia e moderação por IA (site.md:65–74): formatos, tamanhos, SLAs, fallback manual.

## Reutilização e Limpeza
- Reutilizar UI shadcn completa (`client/src/components/ui/*`), `tailwind.config.ts`, `postcss.config.js`, `index.css`.
- Migrar exemplos úteis (`client/src/components/examples/*`) para páginas/rotas Next.js.
- Após migração: remover `server/*` (Express) e Drizzle/Neon (`drizzle.config.ts`, `server/db.ts`) para evitar duplicidade.

## Estrutura Monorepo Proposta
- `apps/web` (Next.js PWA)
- `apps/api` (Laravel)
- `packages/ui` (design system shadcn)
- `packages/shared` (tipos, contratos de API, eventos de Realtime)
- `infra/` (IaC e pipelines)

## Backend (Laravel)
- Módulos: usuários/roles, eventos, convidados, créditos/transactions, posts (Feed), media, telão-queue, moderação, pagamentos.
- REST endpoints conforme módulos; WebSocket/Broadcast para atualizações (integração Supabase Realtime).
- Fila RabbitMQ para: moderação IA, geração de resumos, processamento de mídia, reconciliação de pagamentos.

## Frontend (Next.js PWA)
- Páginas: Admin Dashboard, Painel do Anfitrião, QR Code/Convidado, Telão ao Vivo, Feed.
- Estado: React Query; autenticação com tokens do Laravel; assinatura Supabase Realtime para Telão/Feed.
- Uploads direto para Supabase Storage com políticas; publicação após moderação.

## Banco de Dados Inicial (Laravel Migrations)
- `users`, `roles`, `events`, `event_modules`, `guests`, `posts`, `media_assets`, `interactions`, `credits_wallets`, `transactions`, `moderation_logs`, `broadcast_sessions`.
- Índices e chaves externas; auditoria (created_at/updated_at), soft delete em conteúdo.

## Pagamentos e Reconciliação
- Stripe: sessões, webhooks (`/api/payments/stripe/webhook`), Pix como método; mapear ordens → créditos → transações.
- Regras: estorno ao remover conteúdo impróprio; relatórios no Admin.

## Realtime e Telão
- Canal por evento em Supabase Realtime para: fila de telão, mudanças de estado, novos posts.
- Disputa de tela: mecanismo de ordenação por créditos/tempo; broadcast para clientes telão.

## DevOps e Deploy
- `.env.example` para web e api; scripts de instalação.
- Pipelines: build Next.js, deploy Laravel, migrations, chaves Supabase/Pusher.
- Observabilidade: logs estruturados, métricas de fila, rastreio de webhooks.

## Migração e Roadmap
1. Criar monorepo e apps `web` e `api`.
2. Portar UI e páginas de `client` para Next.js.
3. Gerar base Laravel e migrations.
4. Integrar Supabase (DB, Storage, Realtime).
5. Implementar autenticação e pagamentos.
6. Telão/Feed e moderação IA.
7. Limpeza de artefatos antigos e documentação/README.

Confirma seguir este plano? Ao aprovar, executo a migração, crio a estrutura e arquivos solicitados, e ajusto `site.md`.