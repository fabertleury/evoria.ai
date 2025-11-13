# TODO Evoria.ai

## Arquitetura
- [x] Frontend com Next.js (base funcionando)
- [ ] PWA completo (service worker, offline, ícones, caching)
- [x] API Node/Express (apps/api)
- [ ] Backend Laravel (planejado no site.md)
- [x] Supabase integrado (URL/anon) no web
- [x] Supabase Storage para mídia
- [x] Supabase Realtime para Telão
- [ ] Workers em RabbitMQ
- [x] Stripe básico (checkout)
- [ ] Pix + webhooks

## Módulos Principais
- [x] QR Code do Evento (rotas de link/QRCode)
- [x] Telão ao Vivo (página /telao + API /screen)
- [x] Feed do Evento (página /feed + API /feed/posts)
- [ ] Resumo Inteligente (IA)
- [ ] Moderação Automática (IA) — parcial
- [ ] Painel do Admin — parcial
- [ ] Painel do Anfitrião — parcial
- [ ] Sistema de Créditos — parcial (schema e transações)

## PWA — Tarefas
- [x] Manifest JSON referenciado no layout
- [ ] Ícones (png/ico em múltiplos tamanhos e apple-touch-icon)
- [ ] Service Worker (`sw.js`) e registro no cliente
- [ ] Estratégias de cache (assets, páginas e fallback offline)
- [ ] Meta tags complementares (theme-color, apple-mobile-web-app-capable)
- [ ] Auditoria Lighthouse PWA e correções

## Deploy / Infra
- [ ] Pipeline de deploy pronto para produção
- [ ] Configuração de ambientes e variáveis (dev/staging/prod)

## Referências
- Manifest link: apps/web/app/layout.tsx:11
- Manifest: apps/web/public/manifest.json:1
- Telão (cliente): apps/web/app/telao/page.tsx:9
- Supabase client: apps/web/lib/supabaseClient.ts:3
- API Realtime/Telão: apps/api/src/routes/screen.ts:6
- API Feed: apps/api/src/routes/feed.ts:6
- QRCode/Links: apps/api/src/routes/qrcode.ts:6, apps/api/src/routes/links.ts:5
