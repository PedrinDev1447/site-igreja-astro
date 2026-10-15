# Feature Specification: Site Institucional — Bíblica Vida

**Feature Branch**: `001-site-institucional`

**Created**: 2026-10-14

**Status**: Draft

**Input**: User description: "Site institucional estático para a Igreja Bíblica Vida, a partir dos requisitos em `docs/requisitos.md` (RF01–RF09) e dos dados reais em `docs/dados-igreja.md`."

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Saber quando é o culto e chegar até a igreja (Priority: P1)

Um visitante que nunca foi à igreja acessa o site pelo celular e, em poucos segundos, entende o
nome da igreja, quando acontecem os cultos e como chegar até o endereço físico.

**Why this priority**: é a ação de maior valor do site — decidir ir a um culto. Sem isso, o site
não cumpre sua função básica.

**Independent Test**: publicar só a home e a página de Agenda (que inclui horários e localização)
já entrega valor completo — o visitante vê horários e endereço e consegue abrir a rota no Google
Maps, sem depender de nenhuma outra página.

**Acceptance Scenarios**:

1. **Given** um visitante na home pelo celular, **When** ele rola a página, **Then** ele vê os dias
   e horários de culto antes de precisar navegar para outra página.
2. **Given** a página de Agenda aberta, **When** o visitante toca "Como chegar", **Then** o
   Google Maps abre com a rota até o endereço da igreja.

---

### User Story 2 - Conhecer a igreja e os pastores (Priority: P2)

Um visitante curioso quer saber quem lidera a igreja e o que ela acredita antes de decidir
visitar.

**Why this priority**: constrói confiança antes da primeira visita presencial — mas o visitante
já consegue decidir ir ao culto sem ler isso primeiro (por isso P2, não P1).

**Independent Test**: publicar "Quem somos" e "Os pastores" isoladamente já entrega valor —
missão/visão/crenças e os cards de pastoras e pastores funcionam sem nenhuma outra página.

**Acceptance Scenarios**:

1. **Given** a página "Quem somos", **When** o visitante lê o conteúdo, **Then** ele encontra
   missão, visão e crenças reais da igreja, sem texto genérico de template.
2. **Given** a página "Os pastores", **When** o visitante visualiza a lista, **Then** pastoras e
   pastores aparecem em grupos separados, cada um com foto, nome, papel e mini-bio, sem nenhuma
   referência a casamento ou cônjuge.

---

### User Story 3 - Assistir a uma pregação e seguir nas redes (Priority: P3)

Alguém que não pôde comparecer quer assistir à última pregação disponível e seguir a igreja no
Instagram ou YouTube.

**Why this priority**: mantém o vínculo com quem não está presente fisicamente e amplia alcance,
mas não é necessário para a decisão inicial de visitar a igreja.

**Independent Test**: a seção de vídeo em destaque e os links de redes sociais funcionam de forma
isolada, carregando o player apenas sob interação do visitante.

**Acceptance Scenarios**:

1. **Given** a home, **When** o visitante toca a miniatura do vídeo, **Then** o player do YouTube
   carrega em modo privacidade (`youtube-nocookie.com`) somente depois do clique, nunca
   automaticamente.
2. **Given** qualquer página, **When** o visitante toca o ícone do Instagram ou do YouTube,
   **Then** ele é levado ao perfil/canal oficial em uma nova aba.

---

### User Story 4 - Relembrar a história da igreja (Priority: P4)

Um membro ou visitante antigo quer relembrar os marcos da trajetória da igreja.

**Why this priority**: reforça identidade e pertencimento, mas é a informação menos crítica para
quem está decidindo visitar a igreja pela primeira vez.

**Independent Test**: a página "Nossa história" exibe uma linha do tempo de forma independente de
qualquer outra página.

**Acceptance Scenarios**:

1. **Given** a página "Nossa história", **When** o visitante rola a linha do tempo, **Then** ele
   vê marcos em ordem cronológica, com datas e descrições reais.

---

### Edge Cases

- O que acontece quando um dado ainda não foi fornecido (ex.: link de Facebook, biografia real de
  um pastor)? O elemento correspondente simplesmente não aparece (ex. ícone do Facebook oculto) ou
  usa o placeholder explicitamente autorizado (Lorem ipsum nas bios) — nunca um dado inventado.
- Como o site se comporta sem JavaScript habilitado? Todo conteúdo essencial (texto, horários,
  endereço, fotos) continua visível; só o player de vídeo sob demanda depende de interação.
- O que acontece se o iframe do Google Maps não carregar (sem internet, bloqueio de terceiros)?
  O endereço em texto ao lado do mapa continua visível, então a informação não se perde.
- Como o site se comporta em uma tela muito pequena (320px) ou em desktop widescreen? O layout
  mobile-first permanece legível e sem scroll horizontal em qualquer largura testada.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: O sistema MUST exibir uma home com hero, chamada para os próximos cultos e links
  rápidos para as demais páginas.
- **FR-002**: O sistema MUST exibir uma página "Quem somos" com missão, visão e crenças, com texto
  vindo de `src/content/`.
- **FR-003**: O sistema MUST exibir uma página "Os pastores" com cards de pastoras e pastores
  agrupados separadamente (pastoras de um lado, pastores do outro), cada um com foto, nome, papel
  e mini-bio, sem nenhuma referência a casamento/cônjuge entre eles.
- **FR-004**: O sistema MUST exibir uma página "Nossa história" com uma linha do tempo de marcos
  reais da igreja.
- **FR-005**: O sistema MUST exibir uma página de Agenda com os dias e horários de culto (Domingo
  10h–11h30; Quarta-feira 20h–21h30; última sexta-feira do mês 20h–21h30).
- **FR-006**: A mesma página de Agenda MUST exibir a localização da igreja com um Google Maps
  embutido sem chave de API, o endereço em texto, e um botão "Como chegar" que leva à rota no
  Google Maps — não há uma rota separada para "Localização" (ver Assumptions sobre rotas).
- **FR-007**: O sistema MUST exibir ao menos um vídeo em destaque do canal do YouTube, carregado
  sob demanda (lite embed, modo privacidade), e um link para o canal.
- **FR-008**: O sistema MUST exibir links para Instagram e YouTube no cabeçalho ou rodapé de toda
  página.
- **FR-009**: O sistema MUST NOT incluir link de Facebook nem canal de contato com backend
  (formulário, WhatsApp, e-mail) nesta versão — ambos fora de escopo por decisão do dono do
  projeto (ver Assumptions).
- **FR-010**: O sistema MUST funcionar sem nenhum custo de hospedagem, API ou domínio além do
  gratuito.
- **FR-011**: O sistema MUST manter Lighthouse ≥ 90 em performance, acessibilidade, boas práticas
  e SEO.
- **FR-012**: O sistema MUST ser responsivo e utilizável a partir de 320px de largura.

### Key Entities

- **Pastor/Pastora**: nome, papel/função na igreja, foto, mini-bio, grupo (pastora | pastor) —
  sem atributo de cônjuge ou estado civil.
- **Culto**: dia da semana (ou regra, ex. "última sexta do mês"), horário de início e fim.
- **Vídeo em destaque**: ID do YouTube, título (quando definido — ver Assumptions).
- **Marco histórico**: data ou período, título, descrição.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Um visitante identifica o nome da igreja e os horários de culto em até 5 segundos na
  home, sem precisar rolar a página no desktop.
- **SC-002**: Um visitante consegue abrir a rota no Google Maps em no máximo 2 toques/cliques a
  partir de qualquer página.
- **SC-003**: O site atinge Lighthouse ≥ 90 nas quatro categorias (performance, acessibilidade,
  boas práticas, SEO) em simulação de dispositivo móvel.
- **SC-004**: 100% das imagens têm texto alternativo e 100% dos textos de botão/link mantêm
  contraste AA.
- **SC-005**: Nenhum dado de nome, horário, endereço ou link publicado no site é inventado — todo
  dado é rastreável a `docs/dados-igreja.md` ou a um placeholder explicitamente autorizado.

## Assumptions

- Facebook e canal de contato (WhatsApp/e-mail) estão fora de escopo desta versão por decisão do
  dono do projeto, não por falta de dado — podem entrar em uma spec futura.
- A seção de Ministérios não faz parte desta versão (decisão de escopo do dono do projeto).
- As mini-bios dos pastores usam texto placeholder (Lorem ipsum) até que o dono do projeto
  forneça texto real — uso autorizado explicitamente e registrado em `docs/dados-igreja.md`.
- Os títulos dos 3 vídeos em destaque ainda não foram definidos; a seção de mídia pode exibir
  apenas a miniatura até que os títulos sejam fornecidos.
- Identidade visual segue o tratamento preto & branco / ivory-charcoal (Inter + Playfair Display)
  definido em `docs/arquitetura.md`, não a paleta azul do logo original.
- Não há Google Calendar público configurado ainda; a lista de horários em texto é a fonte
  principal de agenda até que um calendário público exista.
- **Revisão 2026-10-14 (decisão do dono do projeto):** o site é uma **landing page única de
  rolagem contínua**, sem autenticação e sem painel administrativo. Onde este documento diz
  "página" (FR-001..FR-006, cenários de aceitação), leia **"seção"** da rota `/`. Seções, na ordem,
  com suas âncoras: `#inicio` (hero), `#cultos` (horários), `#quem-somos`, `#pastores`,
  `#historia`, `#pregacao` (vídeos), `#localizacao` (mapa + endereço + "Como chegar"). O menu do
  cabeçalho leva a cada seção por âncora. As rotas antigas (`/quem-somos`, `/pastores`,
  `/nossa-historia`, `/agenda`) redirecionam para a âncora correspondente. Não há rota `/contato`
  — RF09 está suspenso (ver acima); os links de redes sociais (FR-008) ficam no rodapé.
