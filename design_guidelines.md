# Momentia - Diretrizes de Design

## Abordagem de Design

**Estratégia**: Reference-Based híbrida inspirada em:
- **Instagram/Stories**: Interface de vídeos verticais e telão ao vivo
- **Linear/Notion**: Dashboard administrativo limpo e eficiente
- **Stripe**: Checkout e fluxos de pagamento confiáveis
- **Airbnb**: Páginas de eventos e criação intuitiva

**Princípios Centrais**:
1. **Mobile-First PWA**: Design responsivo com foco em experiência mobile
2. **Hierarquia Clara**: Separação visual entre área pública (convidados) e administrativa (anfitriões)
3. **Feedback em Tempo Real**: Animações sutis apenas para estados de loading, upload e notificações
4. **Confiança Visual**: Interface profissional que transmite segurança para pagamentos

## Tipografia

**Famílias de Fonte** (Google Fonts):
- **Display/Headings**: Inter (weights: 600, 700, 800)
- **Body/UI**: Inter (weights: 400, 500, 600)
- **Monospace** (dados/códigos): JetBrains Mono (weight: 400)

**Hierarquia**:
- Hero/Landing: text-6xl md:text-7xl font-bold
- Page Titles: text-4xl font-bold
- Section Headers: text-2xl font-semibold
- Card Titles: text-lg font-semibold
- Body: text-base
- Captions/Meta: text-sm
- Tiny Labels: text-xs

## Sistema de Espaçamento

**Unidades Tailwind**: Usar consistentemente `2, 4, 6, 8, 12, 16, 24`
- Gaps/padding internos: `p-4, p-6, gap-4`
- Margens entre seções: `my-12, my-16, my-24`
- Containers: `max-w-7xl mx-auto px-4 md:px-6`

## Biblioteca de Componentes

### Navegação
**Header Anfitrião**:
- Fixa no topo, backdrop-blur
- Logo à esquerda, navegação central, avatar/menu à direita
- Height: h-16, padding: px-6

**Header Público** (página de convidados):
- Mínima: apenas logo do evento e título
- Height: h-14, centralizado

### Cards e Containers

**Event Cards**:
- Proporção 16:9 para imagem de capa
- Overlay gradient sutil com título sobre imagem
- Border radius: rounded-xl
- Hover: subtle scale (1.02) e shadow elevation

**Video Upload Card**:
- Área de drop com border dashed
- Ícone de upload centralizado
- Min-height: min-h-[400px] mobile, min-h-[500px] desktop

**Stats Cards** (Dashboard):
- Grid de 2-4 colunas: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Padding: p-6
- Número grande: text-3xl font-bold
- Label: text-sm opacity-70

### Formulários

**Input Fields**:
- Height: h-12
- Padding: px-4
- Border radius: rounded-lg
- Focus ring: ring-2 com offset

**Buttons**:
- Primary CTA: h-12 px-8 rounded-lg font-semibold
- Secondary: h-10 px-6 rounded-lg
- Icon-only: w-10 h-10 rounded-lg
- Sobre imagens: backdrop-blur-md com opacity

### Telão Ao Vivo

**Stories Container**:
- Full viewport: h-screen w-screen
- Vídeo centralizado com proporção 9:16
- Controles mínimos overlay (próximo/anterior)
- Progress bar no topo: h-1, animated width transition
- Nome do autor: absolute bottom com backdrop-blur

**Queue Display** (sidebar):
- Width: w-80 fixo em desktop
- Scroll vertical: overflow-y-auto
- Thumbnail: aspect-square, rounded-lg
- Posição na fila: badge com número

### Moderação

**Moderation Panel**:
- Layout de 3 colunas desktop: grid-cols-3 gap-4
- Video preview: aspect-video
- Action buttons abaixo: flex justify-between gap-2
- Approve (check), Reject (X), Skip (arrow)

### Pagamentos

**Checkout Card**:
- Max-width: max-w-md mx-auto
- Elevation shadow: shadow-2xl
- Border radius: rounded-2xl
- Padding generoso: p-8
- Stripe Elements: rounded-lg border

**Credits Display**:
- Badge format: rounded-full px-4 py-2
- Ícone de moeda + número
- Posição: top-right do header

## Landing Page

**Hero Section**:
- Height: min-h-[600px] md:min-h-[700px]
- Layout: 2-column grid (texto à esquerda, demo visual à direita)
- Headline: text-5xl md:text-7xl font-bold
- CTA buttons: dual (Primary + Secondary) com gap-4
- Hero Image: Mockup de celular mostrando interface de upload ou telão

**Sections**:
1. Hero (descrito acima)
2. Como Funciona (3 passos com ícones grandes)
3. Features Grid (2x2 ou 2x3 com ícones + descrições)
4. Telão Demo (vídeo ou screenshots do telão ao vivo)
5. Preços/Créditos (cards com planos)
6. Testimonials (2 colunas com fotos)
7. CTA Final (centrado, hero-style)
8. Footer (4 colunas: Produto, Empresa, Legal, Social)

**Layout Multi-coluna**:
- Features: lg:grid-cols-3
- Testimonials: md:grid-cols-2
- Footer: md:grid-cols-4

## Imagens

**Hero Image**: 
- Mockup de smartphone 3D mostrando a interface do Momentia
- Posição: lado direito do hero
- Proporção: vertical/retrato

**Features Section**:
- Ícones ilustrativos (Heroicons) em cada card
- Screenshots do produto em cards de demonstração

**Testimonials**:
- Fotos circulares dos usuários: rounded-full, w-16 h-16

**Event Cards**:
- Imagens de capa de eventos (placeholder ou stock photos de festas/eventos)

## Ícones

**Biblioteca**: Heroicons (via CDN)
- Upload: cloud-arrow-up
- QR Code: qr-code
- Video: video-camera
- Stats: chart-bar
- Credits: currency-dollar
- Moderation: shield-check

## PWA Específico

**Bottom Navigation** (mobile):
- Fixed bottom: h-16
- 4-5 ícones principais
- Active state: weight bold + indicator

**Touch Targets**:
- Mínimo: min-w-[44px] min-h-[44px]
- Espaçamento generoso em mobile

## Animações

**Usar apenas para**:
- Upload progress: animated progress bar
- Real-time notifications: slide-in from top
- Telão transitions: fade entre vídeos (300ms)
- Loading states: spinner ou skeleton screens

**Evitar**: Scroll animations, parallax, hover complexos