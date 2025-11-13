# Estrutura do Projeto Evoria.ai

## Visão Geral
Projeto unificado com Next.js (App Router) rodando na raiz `app/`. API e Frontend no mesmo serviço, com validação forte e persistência em Postgres.

## Diretórios Principais
- `app/` — Aplicação Next.js
  - `layout.tsx`, `globals.css` — Layout global e estilos base
  - `page.tsx` — Landing page dinâmica
  - `api/` — Endpoints HTTP (Next.js Route Handlers)
    - `landing/route.ts` — GET/PUT da configuração da landing (Zod + Postgres)
  - Seções da UI: `admin/`, `anfitriao/`, `feed/`, `telao/`, `login/`, `register/`, `blog/`, `privacidade/`, `termos/`
- `components/` — Componentes reutilizáveis (importados via `@/components/...`)
  - `ui/` — Botões, cards, inputs, labels e ícones de marca
  - `client/` — Componentes client-only (Lottie, EmbedVideo)
  - `illustrations/` — SVGs como o `HeroIllustration`
- `lib/` — Código compartilhado
  - `db.ts` — Conexão Postgres com `pg`/`drizzle-orm`
  - `schema.ts` — Esquemas de tabelas (ex.: `landing_config`)
  - `landingSchema.ts` — Validação com `zod` da configuração da landing
- `shared/` — Tipos/contratos compartilhados (compatível com libs externas)
- `public/` — Manifesto e ícones públicos

## Principais Dependências
- Next.js 14 (App Router), React 18
- Tailwind CSS (tema escuro + gradientes neon)
- Zod (validação)
- Drizzle ORM + pg (persistência Postgres)
- Supabase JS (auth cliente)
- Lottie (animações client-side)

## Convenções
- Imports absolutos com alias `@/*` resolvendo a partir de `app/`
- APIs sempre validadas com `zod` e retornos padronizados (`NextResponse.json`)
- UI com classes utilitárias Tailwind e tokens CSS (`--primary`, `--card`, etc.)
- Middleware protege rotas (`/admin`, `/anfitriao`) e redireciona para `/login` quando não autenticado

## Deploy
- Serviço único (Frontend + API) utilizando variáveis `.env`
- Postgres configurado via `DATABASE_URL`

## Migração da Pasta `api/`
- Endpoints foram centralizados em `app/api/`. A pasta antiga `api/` pode ser removida após revisão.
- Contratos podem ser extraídos novamente no futuro (separação por serviços) sem quebrar a UI graças aos schemas `zod` e `drizzle`.

## Próximos Passos
- Portar endpoints restantes para `app/api/`
- Adicionar logging estruturado e rate limit básico
- Consolidar testes e smoke tests para rotas críticas
