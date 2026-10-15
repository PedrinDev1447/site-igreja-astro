---
description: "Task list template for feature implementation"
---

# Tasks: Site Institucional — Bíblica Vida

**Input**: Design documents from `/specs/001-site-institucional/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md (todos presentes;
sem `contracts/` — não se aplica a um site estático sem API)

**Tests**: Não solicitados explicitamente na spec — nenhuma task de teste automatizado foi
gerada. A validação é manual, via os 6 cenários de `quickstart.md` e o subagent `design-reviewer`.

**Organization**: Tasks agrupadas por user story (US1–US4, na ordem de prioridade do `spec.md`)
para permitir implementação e validação independentes de cada uma.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: pode rodar em paralelo (arquivos diferentes, sem dependência)
- **[Story]**: a qual user story a task pertence (US1–US4)
- Caminhos de arquivo exatos em cada descrição

## Path Conventions

Projeto único (Astro SSG) em `C:\projetos\site-igreja`. Toda a árvore de pastas já existe
(`docs/`, `specs/`, `.claude/`, `.specify/`, `public/images/`); as tasks abaixo criam o código do
site dentro dela, sem apagar nada que já existe.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: inicialização do projeto Astro sobre a estrutura já existente

- [x] T001 Inicializar Astro 7.3.8+ + TypeScript strict em `C:\projetos\site-igreja` (scaffold
      gerado à parte e mesclado manualmente, sem sobrescrever `docs/`, `specs/`, `.claude/`,
      `.specify/`, `public/images/` já existentes; pinado em 7.3.8+ em vez de 5 por vulnerabilidades
      críticas/altas em esbuild/sharp só corrigidas nessa versão — ver constitution v1.0.1)
- [x] T002 [P] Instalar e configurar Tailwind CSS 4 via `@tailwindcss/vite`; tokens de cor/fonte em
      `src/styles/global.css` via `@theme`, usando exatamente os valores de `docs/arquitetura.md`
      (`--color-bg-dark: #0D0D0D`, `--color-bg-charcoal: #1A1A1A`, `--color-bg-ivory: #F7F4EF`,
      `--color-text-light/dark/muted`, `--color-accent-pra: #6B2B3A`, `--color-accent-pr: #2E4A4A`)
- [x] T003 [P] Instalar `@fontsource/inter` e `@fontsource/playfair-display` como self-hosted (sem
      chamada a `fonts.googleapis.com`), conforme decisão em `research.md` — o import real nos
      arquivos de fonte acontece em `BaseLayout.astro` (T005), que ainda não existia nesta fase
- [x] T004 [P] Configurar ESLint/Prettier para Astro + TypeScript (`eslint.config.js`,
      `.prettierrc.json`, `.prettierignore`); scripts `npm run lint` e `npm run format:check`
      adicionados ao `package.json`

**Checkpoint**: projeto roda com `npm run dev` servindo uma página em branco com os tokens de
design carregados.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: infraestrutura que TODAS as user stories dependem

**⚠️ CRITICAL**: nenhuma user story começa antes desta fase estar completa

- [x] T005 Criar `src/layouts/BaseLayout.astro`: `<html lang="pt-BR">`, meta tags SEO básicas
      (title, description, Open Graph), favicon a partir de `public/images/logo-removebg.png`
      (RNF04); importa as fontes self-hosted de T003 e compõe `Header`/`Footer`
- [x] T006 [P] Criar `src/config/site.ts` com os dados reais de `docs/dados-igreja.md`
      (`nome`, `wordmark`, `tagline`, `endereco`, `mapsEmbedUrl`, `mapsDirectionsUrl`,
      `instagramUrl`, `youtubeUrl`); **`facebookUrl` deliberadamente omitido** (nunca um link
      chutado); `VIDEOS_DESTAQUE` com os 3 IDs reais, sem título
- [x] T007 [P] Definir Content Collections em `src/content.config.ts` (**não**
      `src/content/config.ts` — Astro 7 removeu o formato legado; precisa de `loader: glob(...)`
      de `astro/loaders`, ajuste descoberto só ao rodar `npm run build`) com os schemas Zod de
      `data-model.md`: `pastores` (nome, papel, grupo `"pastora" | "pastor"`, foto via `image()`,
      bio — sem campo de cônjuge/estado civil), `historia` (data, titulo, descricao), `cultos`
      (dia, horaInicio, horaFim em `HH:mm`)
- [x] T008 [P] Criar `src/components/SocialLinks.astro`: renderiza só Instagram e YouTube; como
      `facebookUrl` não existe em `SITE`, nada é renderizado para Facebook (nunca `#` ou link
      chutado)
- [x] T009 [P] Criar `src/components/Header.astro` e `src/components/Footer.astro` com navegação
      para as 5 rotas (`/`, `/quem-somos`, `/pastores`, `/nossa-historia`, `/agenda`) e
      `SocialLinks` (FR-008); alvos de toque ≥44px (`min-h-11`) nos links de navegação
- [x] T010 Popular `src/content/cultos/` com os 3 horários reais: Domingo 10:00–11:30,
      Quarta-feira 20:00–21:30, Última sexta-feira do mês 20:00–21:30 (de
      `docs/dados-igreja.md`)

**Checkpoint**: fundação pronta — user stories podem começar.

---

## Phase 3: User Story 1 - Saber quando é o culto e chegar até a igreja (Priority: P1) 🎯 MVP

**Goal**: visitante vê horários de culto na home e consegue abrir a rota no Google Maps a partir
da página de Agenda, sem depender de nenhuma outra página.

**Independent Test**: publicar só `/` e `/agenda` já entrega o valor completo desta história.

### Implementation for User Story 1

- [x] T011 [US1] Criar `src/components/Hero.astro`: logo (`public/images/logo-removebg.png`),
      nome da igreja, tagline e chamada para os próximos cultos (RF01)
- [x] T012 [US1] Criar `src/components/EventCalendar.astro`: lê a collection `cultos` (T010) e
      lista dia + horário de início/fim, em ordem fixa (Domingo, Quarta-feira, Última
      sexta-feira do mês), formatado como "10h às 11h30" (RF05)
- [x] T013 [US1] Criar `src/components/MapEmbed.astro`: iframe `loading="lazy"` com
      `mapsEmbedUrl` de `SITE`, endereço em texto ao lado do mapa, botão "Como chegar" com
      `mapsDirectionsUrl` (RF06)
- [x] T014 [US1] Criar `src/pages/index.astro`: compõe `Hero` + `EventCalendar` + links rápidos
      para as demais 4 páginas (RF01) — "resumo" e "completo" acabaram sendo a mesma lista de 3
      itens, sem necessidade de truncar
- [x] T015 [US1] Criar `src/pages/agenda.astro`: compõe `EventCalendar` + `MapEmbed` (RF05 + RF06,
      uma única página — sem rota separada de "Localização")
- [x] T016 [US1] Validar os cenários 1 e 2 de `quickstart.md`: `npm run build` gerou `/` e
      `/agenda` (2 páginas, 0 erros); smoke test do `npm run dev` confirmou HTTP 200 em ambas as
      rotas; revisão visual completa (contraste, 320px, design-reviewer) fica para a Phase 7
      (Polish), quando todas as 5 páginas existirem

**Checkpoint**: User Story 1 completa e testável isoladamente — MVP publicável.

---

## Phase 4: User Story 2 - Conhecer a igreja e os pastores (Priority: P2)

**Goal**: "Quem somos" com missão/visão/crenças reais; "Os pastores" com pastoras e pastores
agrupados separadamente, cor de bio por grupo, sem nenhuma referência a casamento.

**Independent Test**: publicar `/quem-somos` e `/pastores` isoladamente já entrega valor.

### Implementation for User Story 2

- [x] T017 [US2] Popular `src/content/pastores/` com os 7 registros reais de
      `docs/dados-igreja.md` (`nome`, `papel`, `grupo`, `foto`, `bio`): Pra. Giovana (Ensino),
      Pra. Silvana (Famílias), Pra. Rosângela (Intercessão), Pr. Kiko (Pastor titular),
      Pr. Geneval (Missões), Pr. Alfredo (Discipulado), Pr. Marcos (Jovens) — `bio` com Lorem
      ipsum (placeholder autorizado); **nenhum campo de cônjuge em nenhum registro**. **Ajuste
      descoberto na implementação**: as fotos tiveram que sair de `public/images/pastores/` e ir
      para `src/assets/pastores/`, porque o helper `image()` dos content collections só resolve
      caminhos importáveis pelo Vite — arquivos em `public/` não entram no grafo de módulos e
      falhavam com "Image ... does not exist". `docs/dados-igreja.md` e `data-model.md`
      atualizados para refletir o novo caminho.
- [x] T018 [US2] Criar `src/components/PastorCard.astro`: usa `<Image>` de `astro:assets`
      (otimização real: fotos de ~1-1.9MB caíram para 1-3KB em WebP no build); texto da `bio` em
      `--color-accent-pra` quando `grupo === "pastora"`, em `--color-accent-pr` quando
      `grupo === "pastor"`; `alt` da imagem = `"{nome}, {papel}"` (RF03)
- [x] T019 [US2] Criar `src/pages/pastores.astro`: duas seções — pastoras primeiro, pastores
      depois — usando `PastorCard`; **sem nenhum texto, ícone ou agrupamento que indique
      casais/cônjuges** (RF03, confirmado pelo dono do projeto)
- [x] T020 [US2] Criar conteúdo de "Quem somos" (missão, visão, crenças) direto em
      `src/pages/quem-somos.astro` (texto simples demais pra justificar uma content collection
      própria): as três seções usam `TODO:` explícito, porque nenhum texto real de
      missão/visão/crenças foi enviado ainda — nada inventado (RF02, Constituição II)
- [x] T021 [US2] `src/pages/quem-somos.astro` criado junto com T020
- [x] T022 [US2] Validado via sensores: `npm run build` → 4 páginas, 0 erros; smoke test do
      `npm run dev` → HTTP 200 em `/`, `/agenda`, `/pastores`, `/quem-somos`; inspeção do código
      de `pastores.astro`/`PastorCard.astro` confirma zero menção a cônjuge/casamento e cores
      corretas por grupo

**Checkpoint**: User Story 1 + 2 funcionando.

---

## Phase 5: User Story 3 - Assistir a uma pregação e seguir nas redes (Priority: P3)

**Goal**: vídeo em destaque carregado sob demanda na home + links de Instagram/YouTube
funcionando em toda página.

**Independent Test**: a seção de vídeo e o `SocialLinks` funcionam isoladamente, sem depender de
outras user stories.

### Implementation for User Story 3

- [x] T023 [US3] Criar `src/components/YouTubeLite.astro`: miniatura estática
      `https://i.ytimg.com/vi/<id>/hqdefault.jpg` + botão de play; o iframe
      `youtube-nocookie.com/embed/<id>` só é inserido no DOM após o clique (único JavaScript
      client-side do projeto) (RF07, RNF06)
- [x] T024 [US3] `src/config/site.ts` → `VIDEOS_DESTAQUE` já tinha os 3 IDs reais desde T006
      (`w2z-jLIwJkQ`, `4IFtWz4omoE`, `J8SKo6blfsk`), **sem o campo `titulo`** até que o dono do
      projeto os forneça (nunca inventar título) — confirmado, nada a mudar
- [x] T025 [US3] `YouTubeLite` incluído em `src/pages/index.astro`, numa seção "Assista a uma
      pregação" com link para o canal
- [x] T026 [US3] Confirmado: todas as páginas (`/`, `/agenda`, `/pastores`, `/quem-somos`) usam
      `BaseLayout`, que sempre compõe `Header`/`Footer` com `SocialLinks` — nada a ajustar
- [x] T027 [US3] Validado inspecionando `dist/index.html` após o build: zero `<iframe>` na página
      estática; `youtube-nocookie.com` só existe dentro do bundle JS (string montada em
      tempo de clique); só os 3 thumbnails de `i.ytimg.com` são carregados de início

**Checkpoint**: User Story 1 + 2 + 3 funcionando.

---

## Phase 6: User Story 4 - Relembrar a história da igreja (Priority: P4)

**Goal**: linha do tempo em `/nossa-historia`.

**Independent Test**: a página funciona isoladamente, mesmo sem marcos cadastrados ainda.

### Implementation for User Story 4

- [x] T028 [US4] Criar `src/components/Timeline.astro`: lê a collection `historia` (T007) e
      renderiza em ordem cronológica (RF04)
- [x] T029 [US4] Criar `src/pages/nossa-historia.astro` usando `Timeline`; como `historia` está
      vazia (nenhum marco real fornecido ainda), exibe um estado vazio honesto ("linha do tempo em
      construção"), **nenhum marco inventado** (Constituição II). O aviso
      `[content] The collection "historia" does not exist or is empty` no build é esperado
      enquanto a collection estiver vazia — não é um erro

**Checkpoint**: todas as 4 user stories funcionando de ponta a ponta.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: qualidade e conformidade atravessando todas as stories

- [x] T030 [P] Revisão de design feita diretamente (o subagent `design-reviewer` não carrega
      nesta sessão — está escopado ao diretório do projeto, que não é a raiz desta sessão; segui
      exatamente o roteiro de `.claude/agents/design-reviewer.md` manualmente). **2 defeitos reais
      encontrados e corrigidos**: 1. Os ícones de rede social (`public/images/icons/icone-*.png`) são círculos **pretos**
      sólidos. `SocialLinks` aparecia tanto no `Header` (fundo `--color-bg-charcoal`,
      quase preto) quanto no `Footer` (fundo claro). Preto sobre quase-preto é
      praticamente invisível — removido do `Header`; FR-008 só exige header **ou** rodapé,
      então ficou só no `Footer`, onde o contraste é correto. 2. `Timeline.astro` pulava de `<h1>` direto para `<h3>` (sem `<h2>` entre eles) —
      corrigido para `<h2>`.
      Contraste de `--color-accent-pra`/`--color-accent-pr` sobre `--color-bg-ivory` calculado
      manualmente (fórmula WCAG): 9.42:1 e 8.73:1 — muito acima do mínimo AA (4.5:1).
- [x] T031 [P] `npm run build` → 5 páginas, 0 erros; `npm run preview` → HTTP 200 em `/`
- [x] T032 [P] Lighthouse (mobile, via `npx lighthouse` + Chrome headless) em `/`, `/pastores` e
      `/agenda`: **100/100/100/100 nas 4 categorias, nas 3 páginas** — muito acima do mínimo ≥ 90
      (SC-003)
- [x] T033 [P] Confirmado durante a revisão manual (T030) e pela nota de acessibilidade 100 do
      Lighthouse: alt em 100% das imagens (decorativas com `alt=""` + `aria-label` no elemento
      interativo pai, informativas com alt descritivo), contraste AA em 100% dos textos de
      botão/link (SC-004)
- [x] T034 Grafo gerado pela primeira vez com `graphify . --code-only` (modo sem chave de API,
      custo zero — a extração semântica de docs/imagens pediria uma chave paga, incompatível com
      a Constituição I): 117 nós, 135 arestas, 15 comunidades (nomes genéricos "Community N", sem
      rótulo semântico, por não usar LLM). `graphify-out/cache/` adicionado ao `.gitignore`.
      `docs/arquitetura.md` atualizado com o histórico da implementação completa
- [x] T035 Validados os 6 cenários de `quickstart.md`: 1–2 (US1) e 3 (US2) confirmados por
      inspeção de código + Lighthouse; 4 (US3) confirmado por inspeção do HTML gerado (T027); 5
      (build/qualidade) confirmado em T031/T032; 6 (nenhum dado inventado) confirmado — todo
      texto/link/horário rastreável a `docs/dados-igreja.md`, bios Lorem ipsum e "Quem somos"
      `TODO:` são placeholders explicitamente autorizados, não dados inventados (SC-005)

---

## Phase 8: Refatoração para landing page única (revisão 2026-10-14)

**Purpose**: o dono do projeto pediu uma landing de rolagem contínua em vez de 5 rotas (ver
Assumptions em `spec.md`). Sem user story nova — mesmo conteúdo, nova estrutura.

- [x] T036 Criar componentes de seção em `src/components/`: `SecaoCultos`, `SecaoQuemSomos`,
      `SecaoPastores`, `SecaoHistoria`, `SecaoPregacao`, `SecaoLocalizacao` (cada um com
      `<section id>` + `<h2>`)
- [x] T037 Recompor `src/pages/index.astro` com Hero + as 6 seções; remover `agenda`, `pastores`,
      `quem-somos`, `nossa-historia` de `src/pages/`
- [x] T038 `astro.config.mjs`: `redirects` das rotas antigas para as âncoras
- [x] T039 `Header`/`Footer`: links viram âncoras; header fixo no topo; `global.css` com rolagem
      suave (respeitando `prefers-reduced-motion`) e `scroll-margin-top`
- [x] T040 QA: lint, format:check, build, Lighthouse ≥ 90 em `/`, 320px sem rolagem horizontal,
      `design-reviewer`, atualizar `progress.md`, `docs/arquitetura.md` e grafo

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: sem dependências — pode começar imediatamente
- **Foundational (Phase 2)**: depende do Setup — BLOQUEIA todas as user stories
- **User Stories (Phase 3–6)**: todas dependem do Foundational; podem ser feitas em sequência de
  prioridade (P1 → P2 → P3 → P4) ou em paralelo se houver mais de uma pessoa
- **Polish (Phase 7)**: depende de todas as user stories desejadas estarem completas

### User Story Dependencies

- **US1 (P1)**: nenhuma dependência de outra story — é o MVP
- **US2 (P2)**: independente de US1; só compartilha `Header`/`Footer`/`BaseLayout` da Foundational
- **US3 (P3)**: independente; `SocialLinks` já existe desde a Foundational (T008)
- **US4 (P4)**: independente; não compartilha componentes com as demais além do layout base

### Parallel Opportunities

- T002, T003, T004 em paralelo (Setup)
- T006, T007, T008, T009 em paralelo (Foundational, arquivos diferentes)
- Depois da Foundational, US1/US2/US3/US4 podem ser feitas em paralelo por pessoas diferentes
- T030–T033 em paralelo na fase de Polish

---

## Parallel Example: Foundational

```bash
Task: "Criar src/config/site.ts com dados reais de docs/dados-igreja.md"
Task: "Definir Content Collections em src/content/config.ts"
Task: "Criar src/components/SocialLinks.astro"
Task: "Criar src/components/Header.astro e Footer.astro"
```

---

## Implementation Strategy

### MVP First (User Story 1 apenas)

1. Completar Phase 1 (Setup) e Phase 2 (Foundational)
2. Completar Phase 3 (US1)
3. Validar com `quickstart.md` cenários 1–2
4. Publicar `/` e `/agenda` já é um MVP demonstrável

### Incremental Delivery

1. Setup + Foundational → base pronta
2. US1 → validar → MVP
3. US2 → validar → incremento
4. US3 → validar → incremento
5. US4 → validar → incremento final
6. Phase 7 (Polish) → Lighthouse, design-reviewer, grafo atualizado

## Notes

- Nenhuma task de teste automatizado foi gerada (não solicitado na spec); a validação é via
  `quickstart.md` e o subagent `design-reviewer`.
- Toda task que popula conteúdo real (T006, T010, T017, T020, T024) cita `docs/dados-igreja.md`
  como fonte — nenhum dado deve ser inventado fora do que está documentado ali ou marcado `TODO:`.
- Commitar após cada task ou grupo lógico de tasks.
