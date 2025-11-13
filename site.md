# 🪩 Evoria.ai — Sistema de Experiências Interativas para Eventos

## 📜 CHANGELOG

### v1.0.0 (MVP)
**Status:** Em desenvolvimento  
**Tecnologias:**  
- **Frontend:** Next.js (React) com PWA  
- **Backend:** Laravel (PHP) — APIs REST + WebSocket  
- **Banco de Dados:** Supabase (PostgreSQL gerenciado)  
- **Storage:** Supabase Storage ou AWS S3  
- **Realtime:** Supabase Realtime (compatível com Broadcasting/Pusher)  
- **Workers:** RabbitMQ (Laravel Queue)  
- **Pagamentos:** Stripe + Pix (com webhook para reconciliação)

#### 🔹 Funcionalidades Gerais
- Criação de eventos personalizados com QR Code único.  
- Convidados podem enviar mensagens, vídeos, fotos ou áudios para o evento.  
- IA realiza moderação automática (remove nudez, violência ou conteúdo ofensivo).  
- Painel completo para o anfitrião gerenciar e visualizar interações.  
- Sistema de créditos para convidados participarem em recursos pagos.  
- Resumo Inteligente gerado pela IA com estatísticas e destaques do evento.  
- Feed social do evento (modo opcional).  
- Telão ao Vivo (módulo adicional).  
- Painel administrativo completo para controle do sistema.

---

## 🧩 RESUMO DETALHADO

### 🧑‍💻 **Painel do Admin (Sistema)**
- Gerencia usuários (anfitriões e convidados).  
- Define planos e preços (ex: evento básico, com Telão, com Feed).  
- Controla se haverá **repasse de créditos** ao anfitrião ou se o valor fica 100% com o sistema.  
- Visualiza estatísticas gerais: total de eventos, interações e faturamento.  
- Moderação centralizada (caso IA falhe, pode revisar manualmente).  
- Define políticas de uso e limites (tamanho de mídia, tempo de exibição, etc.).  
- Painel financeiro (ganhos, extratos, e controle de repasses).  

---

### 🧍‍♂️ **Painel do Anfitrião**
- Cria e personaliza o evento (nome, capa, data, tema).  
- Gera QR Code exclusivo para convidados.  
- Pode contratar módulos extras no pagamento inicial:
  - **Telão ao Vivo:** exibição em tempo real com disputas de tela entre convidados.
  - **Feed do Evento:** um mini “Instagram do evento”, onde convidados postam (pagando por post).
- Visualiza todas as mensagens e mídias enviadas.
- Tem um painel para moderar ou excluir conteúdo (caso algo passe pela IA).  
- Acesso ao **Resumo Inteligente**, com relatórios e destaques gerados automaticamente.  

---

### 🥳 **Experiência do Convidado**
- Escaneia o QR Code e entra na página do evento.  
- Pode enviar mensagens, fotos, vídeos ou áudios (pagos ou gratuitos dependendo da configuração).  
- No **modo Telão**, pode pagar para aparecer por mais tempo na tela do evento.  
- Outros convidados podem pagar para “pular” o conteúdo atual e exibir o deles (mecânica de disputa).  
- No **modo Feed**, pode fazer posts pagos que ficam visíveis para todos os convidados.  
- Pode curtir, comentar e interagir como em uma rede social temporária.  

---

### ⚙️ **Sistemática**
- Todos os uploads passam por verificação de conteúdo com IA antes da publicação.  
- Caso algo impróprio seja publicado, o anfitrião pode excluir o conteúdo e o autor perde os créditos.  
- O sistema registra todas as transações e interações em tempo real.  
- Módulos extras podem ser contratados individualmente no momento da criação do evento.  
- As métricas de engajamento alimentam o **Resumo Inteligente**, exibindo:
  - Número total de interações.
  - Mídia mais curtida.
  - Convidado mais ativo.
  - Horário de pico de engajamento.

---

## 💬 PROMPT PARA IA DEV (GitHub Copilot ou outra IA)

Crie um sistema chamado **Evoria.ai**, um SaaS de eventos interativos.

**Objetivo:**  
Permitir que anfitriões criem eventos com QR Code, onde convidados possam enviar mensagens, fotos, vídeos e participar de interações em tempo real (como Telão e Feed pago).

**Arquitetura técnica:**  
- Frontend: React (Next.js) com PWA.  
- Backend: Laravel (PHP) com APIs REST e WebSocket.  
- DB: Supabase (PostgreSQL gerenciado).  
- Storage: Supabase Storage ou AWS S3.  
- Realtime: Supabase Realtime (compatível com Broadcasting/Pusher).  
- Workers: RabbitMQ (Laravel Queue).  
- Pagamentos: Stripe + Pix (com webhooks).  

**Módulos principais:**
1. **QR Code do Evento:** página única onde convidados interagem.
2. **Telão ao Vivo:** exibe conteúdo pago em tempo real; convidados podem pagar para aparecer mais tempo ou pular o conteúdo atual.
3. **Feed do Evento:** feed social interno onde os convidados postam pagando.
4. **Resumo Inteligente:** IA gera relatórios automáticos com destaques do evento.
5. **Moderação Automática:** IA detecta nudez, violência e conteúdo proibido antes da publicação.
6. **Painel do Admin:** controle total de planos, finanças, moderação e repasses.
7. **Painel do Anfitrião:** criação e gestão do evento, módulos extras e moderação.
8. **Sistema de Créditos:** cada ação paga é convertida em créditos controlados pelo sistema.

**Regras:**
- O anfitrião **não define** se recebe repasse; isso é controlado pelo admin.  
- Todos os pagamentos e créditos são reconciliados via webhook.  
- Módulos extras são opcionais e cobrados separadamente.  

**Entrega esperada:**  
- Estrutura de backend com APIs REST e WebSocket.  
- Dashboard do admin e do anfitrião.  
- Frontend responsivo com PWA.  
- Banco de dados relacional (Supabase - PostgreSQL gerenciado).  
- Sistema de pagamento funcional e seguro.  
- Pipeline de deploy pronto para produção.

---

**Domínio:** evoria.ai  
**Missão:** Transformar momentos em experiências digitais memoráveis e interativas.
