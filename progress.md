# Progress — Site Institucional Bíblica Vida

Atualizado a cada sessão, conforme o fluxo de Harness Engineering em `AGENTS.md`. Objetivo:
continuidade entre sessões — qualquer um (ou qualquer agente) consegue retomar o trabalho lendo
só este arquivo + `specs/001-site-institucional/tasks.md`.

## Sessão 2026-10-14

### Concluído

- Scaffold do projeto (pastas, `AGENTS.md`, `CLAUDE.md`, `README.md`, `.gitignore`, `docs/`)
- `docs/requisitos.md`, `docs/arquitetura.md`, `docs/dados-igreja.md` com dados reais e decisões
  de escopo confirmadas (denominação, horários, endereço, redes sociais, pastores agrupados sem
  referência a casamento, identidade visual preto & branco)
- Assets reais copiados para `public/images/` (logo, ícones, 7 fotos de pastores)
- GitHub Spec Kit instalado e configurado (`.specify/`, `.claude/skills/speckit-*`)
- `.specify/memory/constitution.md` v1.0.0 — 4 princípios (Custo Zero, Sem Alucinação,
  Acessibilidade, Performance)
- `specs/001-site-institucional/spec.md` — 4 user stories (P1–P4), 12 requisitos funcionais, 5
  critérios de sucesso, checklist de qualidade 100% aprovado
- `specs/001-site-institucional/plan.md` — stack Astro 7 + Tailwind 4 + Content Collections,
  Constitution Check PASS
- `specs/001-site-institucional/research.md` — 7 decisões técnicas justificadas
- `specs/001-site-institucional/data-model.md` — schemas de Pastor, MarcoHistorico, Culto,
  SiteConfig
- `specs/001-site-institucional/quickstart.md` — 6 cenários de validação
- `specs/001-site-institucional/tasks.md` — 35 tasks em 7 fases (Setup → Foundational → US1 MVP
  → US2 → US3 → US4 → Polish)
- Processo de Harness Engineering (contrato → implementação → QA automático → progress.md)
  documentado em `AGENTS.md`/`CLAUDE.md`
- **Phase 1: Setup completa (T001–T004)**:
  - T001 Astro inicializado — **pinado em 7.3.8+, não 5** (decisão aprovada pelo dono do projeto:
    `npm audit` achou vulnerabilidades críticas/altas em esbuild/sharp em toda a linha 5.x, sem
    patch nessa linha; constitution atualizada para v1.0.1)
  - T002 Tailwind CSS 4 via `@tailwindcss/vite`, tokens em `src/styles/global.css` (`@theme`)
  - T003 `@fontsource/inter` + `@fontsource/playfair-display` instalados (self-hosted)
  - T004 ESLint + Prettier configurados (`eslint.config.js`, `.prettierrc.json`,
    `.prettierignore`), scripts `npm run lint` / `npm run format:check`
  - **Sensores rodados e passando**: `npm run lint` (0 erros), `npm run format:check` (0
    problemas, depois de rodar `prettier --write .` nos arquivos próprios do projeto — vendored
    `.claude/skills/` e `.specify/` ficaram de fora via `.prettierignore`), `npm run build` (0
    erros, 0 páginas — esperado, ainda não há rotas)
- **Phase 2: Foundational completa (T005–T010)**:
  - T005 `src/layouts/BaseLayout.astro` — HTML lang pt-BR, SEO/Open Graph, favicon, fontes,
    compõe Header/Footer
  - T006 `src/config/site.ts` — dados reais, `facebookUrl` ausente de propósito, `VIDEOS_DESTAQUE`
    com os 3 IDs reais sem título
  - T007 `src/content.config.ts` — **ajuste descoberto só ao rodar o build**: Astro 7 removeu o
    formato legado de content collections (`src/content/config.ts` sem `loader` não funciona
    mais); migrado para a Content Layer API (`glob()` de `astro/loaders`), um loader por coleção
  - T008 `SocialLinks.astro`, T009 `Header.astro`/`Footer.astro` (alvos de toque ≥44px), T010
    3 arquivos JSON reais em `src/content/cultos/`
  - **Sensores**: `npm run lint` (0 erros), `npm run format:check` (0 problemas, depois de
    `prettier --write`), `npm run build` (0 erros — avisos esperados de "nenhum arquivo
    encontrado" para `pastores`/`historia`, ainda vazias até a Phase 4/6)

### Falhou

- Nada permanece falho. Durante o Setup, `npm audit` encontrou 3 vulnerabilidades (1 crítica: RCE
  via otimização AVIF; 1 alta: libs do sharp; 1 baixa: leitura arbitrária de arquivo no dev server
  do esbuild no Windows) ao instalar Astro 5.18.2. Resolvido trocando para Astro 7.3.8+ (aprovado
  pelo dono do projeto) — `npm audit` agora reporta 0 vulnerabilidades.
- Durante a Phase 2, `npm run build` falhou na primeira tentativa (`LegacyContentConfigError` —
  Astro 7 exige `loader` explícito). Corrigido movendo para `src/content.config.ts` com `glob()`.

- **Phase 3: User Story 1 / MVP completa (T011–T016)**:
  - T011 `Hero.astro`, T012 `EventCalendar.astro` (lê a collection `cultos`, ordem fixa,
    formato "10h às 11h30"), T013 `MapEmbed.astro`, T014 `src/pages/index.astro`, T015
    `src/pages/agenda.astro`
  - T016 validado via sensores: `npm run build` → 2 páginas (`/`, `/agenda`), 0 erros; smoke test
    do `npm run dev` → HTTP 200 em ambas as rotas
  - **MVP publicável**: home mostra horários de culto e a página de agenda tem mapa + endereço +
    botão "Como chegar", sem depender de Quem somos/Pastores/História (ainda não existem)
  - Revisão visual formal (contraste AA, 320px, subagent `design-reviewer`) fica para a Phase 7
    (Polish), quando as 5 páginas existirem — nada impede abrir o projeto no Cursor agora para
    olhar visualmente o que já existe

- **Phase 4: User Story 2 completa (T017–T022)**:
  - T017 7 registros reais em `src/content/pastores/` (Lorem ipsum autorizado nas bios)
  - **Ajuste descoberto na implementação**: fotos dos pastores tiveram que sair de
    `public/images/pastores/` para `src/assets/pastores/` — o helper `image()` dos content
    collections só resolve caminhos que o Vite consegue importar como módulo; `public/` fica de
    fora do grafo de módulos e o build falhava com "Image ... does not exist". Movido, e
    `docs/dados-igreja.md`/`data-model.md` atualizados para o novo caminho.
  - T018 `PastorCard.astro` com `<Image>` de `astro:assets` — otimização real confirmada no
    build: fotos de 1.1–1.9MB cada caíram para 1–3KB em WebP
  - T019 `src/pages/pastores.astro` — pastoras e pastores em seções separadas, zero menção a
    cônjuge/casamento
  - T020/T021 `src/pages/quem-somos.astro` — três seções (Missão/Visão/Crenças) marcadas `TODO:`
    porque nenhum texto real foi enviado ainda; nada inventado
  - T022 validado: `npm run build` → 4 páginas, 0 erros; smoke test `npm run dev` → HTTP 200 em
    `/`, `/agenda`, `/pastores`, `/quem-somos`

- **Phase 5: User Story 3 completa (T023–T027)**:
  - T023 `YouTubeLite.astro` — thumbnail + botão de play; único `<script>` client-side do projeto,
    cria o iframe só no clique
  - T024 `VIDEOS_DESTAQUE` já tinha os 3 IDs reais desde a Phase 2 (T006) — confirmado, sem título
    (não inventado)
  - T025 seção "Assista a uma pregação" na home, com link para o canal
  - T026 confirmado: `SocialLinks` aparece em todas as 4 páginas via `BaseLayout`
  - T027 validado inspecionando `dist/index.html`: **zero `<iframe>` no HTML estático**;
    `youtube-nocookie.com` só existe dentro do bundle JS, montado em tempo de clique; só os 3
    thumbnails de `i.ytimg.com` carregam de início

- **Phase 6: User Story 4 completa (T028–T029)**:
  - T028 `Timeline.astro` — lê a collection `historia`, ordena por data
  - T029 `/nossa-historia` — como a collection está vazia (nenhum marco real enviado), mostra
    estado vazio honesto ("linha do tempo em construção"); nada inventado. O aviso de build
    `[content] The collection "historia" does not exist or is empty` é esperado e não é erro —
    `npm run build` terminou com 0 erros e gerou as 5 páginas
  - Smoke test `npm run dev` → HTTP 200 nas 5 rotas (`/`, `/agenda`, `/pastores`, `/quem-somos`,
    `/nossa-historia`)

- **Phase 7: Polish completa (T030–T035) — site pronto, nenhuma task restante em `tasks.md`**:
  - T030 revisão de design manual (seguindo o roteiro de `.claude/agents/design-reviewer.md`
    diretamente, já que o subagent não carrega fora do diretório do projeto nesta sessão).
    **2 defeitos reais encontrados e corrigidos**: (1) ícones de rede social são círculos pretos
    sólidos, invisíveis sobre o `Header` quase-preto — removidos de lá, mantidos só no `Footer`
    (FR-008 só exige header **ou** rodapé); (2) `Timeline.astro` pulava de `<h1>` pra `<h3>` sem
    `<h2>` — corrigido. Contraste das cores por gênero confirmado manualmente: 9.42:1
    (`--color-accent-pra`) e 8.73:1 (`--color-accent-pr`) sobre `--color-bg-ivory`
  - T031 `npm run build` → 5 páginas, 0 erros; `npm run preview` → HTTP 200
  - T032 **Lighthouse: 100/100/100/100 nas 4 categorias, em `/`, `/pastores` e `/agenda`**
  - T033 alt em 100% das imagens, contraste AA em 100% dos textos (confirmado manualmente +
    acessibilidade 100 no Lighthouse)
  - T034 primeiro grafo gerado: `graphify . --code-only` (sem chave de API — extração semântica
    pediria chave paga, incompatível com Custo Zero) → 117 nós, 135 arestas, 15 comunidades sem
    nome semântico; `graphify-out/cache/` no `.gitignore`
  - T035 todos os 6 cenários de `quickstart.md` validados

- **Phase 8: refatoração para landing page única (T036–T040)** — pedido do dono do projeto:
  site de rolagem contínua em vez de 5 rotas
  - Contrato atualizado antes do código (`spec.md` Assumptions, `tasks.md` Phase 8,
    `docs/arquitetura.md`)
  - 6 componentes `Secao*.astro` + `index.astro` compondo Hero + seções com âncoras (`#inicio`,
    `#cultos`, `#quem-somos`, `#pastores`, `#historia`, `#pregacao`, `#localizacao`); 4 páginas
    antigas removidas e viradas `redirects` em `astro.config.mjs`; menu do Header/Footer por
    âncoras, rolagem suave com `prefers-reduced-motion`, header fixo só a partir de `lg`
  - `design-reviewer` rodou e achou **1 bug real que existia desde a Phase 1**: `--font-sans`/
    `--font-serif` apontavam para variáveis inexistentes, então Inter e Playfair nunca eram
    aplicadas. Corrigido. Também aplicados: link "Pular para o conteúdo", foco visível, horários
    maiores, h4 no nome do pastor, borda no card, hero mais baixo no celular, fontes 700 não
    usadas removidas, endereço e rodapé maiores
  - **Sensores**: lint 0 erros, format:check ok, build 1 página + 4 redirects 0 erros, Lighthouse
    `/` = 99/100/100/100
  - **Não feito (sugestões do revisor, ficam para decisão do dono)**: esconder "Quem somos"
    enquanto for só `TODO:`; botão de play do YouTube vermelho (fora da paleta); alinhar larguras
    dos contêineres das seções; mostrar próximo culto no Hero; deduplicar `NAV_LINKS`;
    rodapé charcoal

### Pendente (próxima sessão)

- [x] Phase 1: Setup (T001–T004)
- [x] Phase 2: Foundational (T005–T010)
- [x] Phase 3: User Story 1 / MVP (T011–T016)
- [x] Phase 4: User Story 2 (T017–T022)
- [x] Phase 5: User Story 3 (T023–T027)
- [x] Phase 6: User Story 4 (T028–T029)
- [x] Phase 7: Polish (T030–T035)

**Todas as 35 tasks de `tasks.md` concluídas.** O site funciona de ponta a ponta com dados reais
onde existem e placeholders honestos (`TODO:`, Lorem ipsum autorizado) onde não existem.

- Dados ainda faltando (não bloqueiam nada, só completam conteúdo — ver `docs/dados-igreja.md`):
  títulos dos 3 vídeos, texto real de "Quem somos" (missão/visão/crenças), marcos reais de
  "Nossa história", bios reais dos pastores (hoje Lorem ipsum, autorizado)
- Deploy ainda não feito: Cloudflare Pages (principal) ou GitHub Pages (plano B), ambos
  decididos mas nenhum configurado ainda

### Notas para a próxima sessão

- Não há mais tasks pendentes em `tasks.md` — a próxima sessão é sobre conteúdo real (acima) ou
  sobre configurar o deploy, não sobre `/speckit-tasks` novas.
- Se o dono do projeto mandar textos/títulos/marcos reais, substituir os placeholders
  diretamente nos arquivos listados acima — não precisa de spec nova pra isso.
- Qualquer tela ou componente visual **novo** (não apenas preenchimento de texto) continua
  exigindo passar pelo subagent `design-reviewer` antes de ser marcado pronto (ver `CLAUDE.md`).
- Sensores de referência pra manter passando: `npm run lint`, `npm run format:check`,
  `npm run build`, Lighthouse ≥ 90 (hoje em 100 nas 3 páginas testadas).

## Sessão 2026-10-14 (noite) — polimento visual e responsivo

Feito (pedido direto do dono do projeto, fora das tasks da spec 001):

- Símbolo da marca com luz branca: halo pulsante, brilho no traço e feixe de luz atravessando o desenho (`LogoMark.astro` + `.logo-mark` em `global.css`). Recorte do PNG (muita margem transparente) para o símbolo aparecer grande. Respeita `prefers-reduced-motion`. Luz sempre branca (marca nunca colorida).
- Hero em duas colunas (símbolo grande à direita, centralizado no celular), luz que segue o mouse (só ponteiro fino), CTA secundário "Como chegar".
- Header sticky em todas as telas com blur, menu hambúrguer abaixo de `lg`, link ativo conforme a seção.
- Container único `max-w-6xl` em todas as seções (bordas alinhadas).
- Pastores: grade flex centralizada (sem card órfão), pastor titular primeiro; hover nos cards.
- Pregações: carrossel com snap no celular, play branco discreto (sem vermelho) fora do título.
- Mapa: iframe deslocado para esconder o cartão "Open in Maps"; botão "Copiar endereço".
- Textos `TODO:` visíveis trocados por "Em breve" (o `TODO:` segue como comentário no código). Rodapé: espaço em "© 2026 Bíblica Vida".
- Entrada suave ao rolar (`data-reveal`), `src/scripts/interacoes.ts` (sem dependências novas).

Sensores: `npm run lint` OK, `npm run format:check` OK, `npm run build` OK. Verificado no navegador (desktop e 375px): menu, mapa, grade de pastores, sem overflow horizontal.

Pendente: Lighthouse não foi rodado nesta sessão; `design-reviewer` não foi acionado; `graphify update .` e atualização de docs/arquitetura.md (novos arquivos LogoMark.astro, interacoes.ts); conferir ícones sociais do rodapé no site publicado (no código estão corretos, `loading="lazy"` removido).

### Revisão design-reviewer (mesma noite) — APROVADO COM AJUSTES, ajustes aplicados

- Foco de teclado: anel duplo branco + charcoal (visível em fundo claro e escuro); carrossel de vídeos com folga para o foco; foco vai para o player ao abrir o vídeo (título inclui o do vídeo, se houver).
- Menu mobile: rótulo fixo "Menu" (estado via `aria-expanded`), Escape devolve o foco ao botão, reset ao ampliar para `lg`, `aria-current="location"`.
- "Copiar endereço": anúncio via `role="status"` e largura fixa. Links `target="_blank"` avisam "abre em nova aba".
- Pastores: grupo vazio não renderiza título. `docs/arquitetura.md`: corrigida a frase de contraste AA dos acentos (não usar sobre charcoal).
- Sensores após ajustes: lint, format:check e build OK; Lighthouse mobile reexecutado.
- Decisões do dono (não aplicadas): esconder ou manter os cards "Em breve" em Quem somos; intensidade do efeito de luz; indicador no carrossel; marca no rodapé (exigiria variante escura sem glow); layout da seção Cultos no desktop.

### Seção Cultos: cartão ao lado da tabela (pedido do dono)

- Novo `PainelCultos.astro`: cartão charcoal com "Próximo culto" (calculado no navegador em `interacoes.ts`, fuso America/Sao_Paulo, inclui "Acontecendo agora", "Hoje", "Amanhã" e a regra da última sexta do mês), endereço e botão "Ver como chegar" (âncora `#localizacao`). Sem JS o bloco do próximo culto fica oculto.
- Regras de recorrência ficam em `PainelCultos.astro` (mapa `REGRAS` por nome do dia). Culto novo em `src/content/cultos/` precisa de uma regra ali para entrar no cálculo.
- Tabela: horário não quebra mais em duas linhas no celular.
- Verificado no navegador (desktop e 375px): cálculo conferido com a hora real de São Paulo, sem overflow horizontal.

### Próximo culto: atualização automática e testes

- Cálculo extraído para `src/scripts/proximo-culto.ts` (funções puras, sem DOM); `interacoes.ts` só liga ao cartão. O texto se recalcula a cada 30 s e ao voltar para a aba, e só é reescrito se mudou (é `aria-live`).
- Novo sensor: `npm test` (node:test nativo, sem dependências, `tests/proximo-culto.test.ts`): 11 cenários — acontecendo agora (início exato), fim exato, hoje, amanhã, dias antes, última sexta (inclusive sextas que NÃO contam), virada de mês, fevereiro, virada de ano, fuso de São Paulo, lista vazia. 11/11 passam.
- Verificado no navegador com hora simulada: sábado 15h mostra "Amanhã, 10h"; domingo 10h05 passa sozinho para "Acontecendo agora" após o intervalo.

### CI/CD e README

- README reescrito: tecnologias explicadas (o que cada uma faz no projeto), estrutura, comandos, como editar conteúdo e como configurar o deploy.
- `.github/workflows/ci-cd.yml`: CI (npm ci, lint, format:check, test, build, Lighthouse ≥ 90 via `scripts/lighthouse-check.mjs`) e CD (Cloudflare Pages, só push na `main` com CI verde). Só actions oficiais (checkout, setup-node, upload/download-artifact) e `cloudflare/wrangler-action`.
- Pendente: criar o repositório no GitHub, cadastrar `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` e a variável `CLOUDFLARE_PROJECT_NAME`, e fazer o primeiro push. O workflow ainda não rodou de verdade no GitHub.

### Repositório no GitHub e primeiro pipeline

- Publicado em https://github.com/PedrinDev1447/site-igreja-astro (público, branch `main`). O repositório `site-igreja` já existia na conta com o projeto antigo em Next.js e não foi tocado.
- Primeira execução do CI: lint, Prettier, testes e build passaram; o Lighthouse oscilou (84 numa execução, 94–100 nas seguintes, com o mesmo código) por ruído da máquina do CI. Solução: 3 medições e mediana (`scripts/lighthouse-check.mjs`), mantendo o mínimo de 90. O relatório fica como artefato `lighthouse-report`.
- CI verde. O job de deploy falha de propósito até os segredos do Cloudflare existirem (erro esperado: falta `CLOUDFLARE_API_TOKEN`). Pendente: criar o projeto no Cloudflare Pages e cadastrar `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` e a variável `CLOUDFLARE_PROJECT_NAME`.

### Pregações: player + lista (direção B do Claude Design)

- `YouTubeLite.astro` reescrito: vídeo escolhido em destaque (16:9) com play branco, três miniaturas clicáveis embaixo (`aria-pressed`, selo "Assistindo"), botão "Ver todas no canal". O iframe `youtube-nocookie` só nasce no clique no play; trocar de vídeo durante a reprodução continua tocando o escolhido; o foco vai para o player. Capa em alta resolução (`maxresdefault`) com fallback para `hqdefault`.
- Título do vídeo só aparece se existir em `VIDEOS_DESTAQUE` (`src/config/site.ts`); hoje não existe, então nada é mostrado (sem placeholder em produção). Para exibir, basta preencher `titulo`.
- `SecaoPregacao.astro`: fundo `bg-bg-dark`, cabeçalho centralizado com "Pregações", container `max-w-4xl`.
- Sensores: lint, format:check, test (11/11), build OK; Lighthouse mediana de 3 = 99/100/100/100; verificado no navegador (desktop e 375px).
- Mockups: tela privada no Claude Design (https://claude.ai/artifact/YShPd3mJSNfsRB8Ro65ym6), 3 direções; escolhida a B.

### Cultos: painel único (direção E do Claude Design)

- `PainelCultos.astro` (antes `ProximoCulto.astro`) vira o bloco único da seção: painel escuro com "Próximo culto" em destaque (ex.: "domingo, 10h" + "18 de outubro · até as 11h30"), lista de horários e endereço com o botão "Ver como chegar". No celular o próximo culto vem primeiro; o hero já era centralizado no celular (símbolo, nome, botões empilhados) e à esquerda com símbolo à direita no desktop, então não mudou.
- `EventCalendar.astro` em tema escuro. O detalhe do próximo culto agora inclui "até as HHhMM" (`proximo-culto.ts`; testes atualizados, 11/11).
- O espaço do próximo culto fica `invisible` até o JS calcular (evita salto de layout); sem JS, esse espaço fica vazio e o resto continua completo.
- Sensores: lint, format:check, test, build OK; Lighthouse mediana de 3 = 99/100/100/100; conferido no navegador (desktop e 375px).

### Pastores: layout H (retratos escuros) e fotos novas

- `SecaoPastores.astro` e `PastorCard.astro` reescritos: seção `bg-bg-charcoal`, cabeçalho centralizado ("Liderança" / "Os pastores"), **Pastores acima das Pastoras**, retrato 4:5 com nome/função sobre a foto e mini-bio embaixo. Cartões todos do mesmo tamanho (2/3/4 por linha); linha incompleta centralizada. Pastor titular primeiro no grupo. Grupo vazio não renderiza.
- Fotos trocadas por versões com fundo preto de estúdio, quadradas e sem círculo branco (Giovana, Rosângela, Silvana, Alfredo, Geneval; origem: `Downloads\Images Claude`); os PNG antigos foram removidos e os JSON apontam para os `.jpg`. Kiko e Marcos mantêm as fotos anteriores (já estavam boas).
- Acentos de cor por gênero deixaram de ser usados (sem contraste AA sobre charcoal); registrado em `docs/arquitetura.md`.
- Mini-bios continuam com o texto de exemplo (Lorem ipsum, autorizado) até o dono enviar os textos reais.

### Como chegar: K com as cores da J

- `MapEmbed.astro` reescrito e `SecaoLocalizacao.astro` em fundo escuro: mapa preto (filtro CSS sobre o iframe do Google: pin e rótulos claros), endereço em destaque, quatro botões de rota (carro, transporte público e a pé no Google Maps via `travelmode`; Waze via `SITE.wazeUrl` em `src/config/site.ts`) e "Copiar endereço". 2 botões por linha no celular.
- O iframe sobe 10rem para esconder o cartão "Open in Maps" (conferido no navegador em ~475 px e 1100 px); os créditos do Google continuam visíveis.
- A seção fica logo depois de "Pregações" (também escura): separada por uma linha fina (`border-t`) e pela diferença de tom (#0d0d0d / #1a1a1a).
- Sensores: lint, format:check, test (11/11), build OK; Lighthouse conferido.

- Ajuste (pedido do dono): "Como chegar" voltou ao fundo claro (ivory) com cartões brancos em 2×2, como no protótipo K; o mapa continua escuro (filtro CSS). Resolve também as duas seções escuras seguidas (pregações → localização).

- Pin do mapa: branco com brilho "neon" (SVG por cima do iframe, alinhado à ponta do marcador do Google). Para isso o mapa ficou fixo (`pointer-events-none`, `tabindex=-1`): sem arrastar/zoom, mas também sem prender a rolagem da página no celular. O deslocamento do iframe (-10rem) e a posição do pin (`50% - 5rem`) andam juntos.

### Como chegar: painel escuro único (direção L, aprovada pelo dono)

- `MapEmbed.astro` reescrito no layout L: painel escuro com mapa (preto, fixo, pin branco neon) à esquerda e, à direita e centralizados, endereço + botão grande "Como chegar" com o quadradinho de copiar ao lado (só ícone; vira check por 2 s). `SecaoLocalizacao.astro` volta ao ivory, só com o título.
- Removidos os quatro botões de rota (carro/transporte/a pé/Waze) e `SITE.wazeUrl`: o dono preferiu o L (recuperáveis no Git).
- `interacoes.ts`: o handler de copiar agora troca ícones em vez de texto e anuncia via `role="status"`.
- Verificado: layout e medidas em desktop e 375 px (pin alinhado ao centro esperado, botões na mesma linha, sem overflow); lógica de copiar validada com a área de transferência simulada (copia o endereço exato; check; anúncio; reverte). O clique real não pôde ser validado no navegador de teste porque ele trava no pedido de permissão da área de transferência — vale testar uma vez num navegador comum.

### Tipografia global: Outfit nos títulos (direção 1 do Claude Design)

- Fonte dos títulos trocada de Playfair Display (serifada, "culta" demais para o dono) para **Outfit 600**. Pacote `@fontsource/outfit` no lugar de `@fontsource/playfair-display` (Inter continua no corpo). Token `--font-display` (classe `font-display`) substitui `font-serif`; peso 600 e tracking -0.01em na camada de componentes (utilitários ainda sobrescrevem).
- Sublinhado clarinho (`titulo-sublinhado`: 2 px, cor do título a 22 % de opacidade) nos títulos de seção (Quem somos, Os pastores, Assista a uma pregação, Como chegar, Nossa história). **Não** vai no logotipo "BÍBLICA VIDA" (topo e hero).
- Sensores: lint, format:check, test (11/11), build OK; Lighthouse mediana de 3 conferida; fonte e sublinhado conferidos no navegador.

### Logotipo em Bebas Neue com brilho neon (pedido do dono, testado por ele na tela de design)

- Logotipo "BÍBLICA VIDA" (hero e nome no topo) agora em **Bebas Neue** (`@fontsource/bebas-neue`, token `--font-logo`/classe `font-logo`): 76 px no desktop, line-height 1,1, espaçamento ~2 px (valores que o dono ajustou na tela de design). Os demais títulos continuam em Outfit.
- Efeito ao passar o mouse (`titulo-neon` em `global.css`): brilho neon branco que "respira" + letras se abrem (espaçamento dobra) + aumento de 3 %. No cabeçalho vai só o brilho (`--suave`). Só em dispositivos com mouse (`hover: hover`); com "reduzir movimento" fica só o brilho, sem mexer nas letras.
- Verificado no navegador: fonte carregada, medidas em repouso e no hover (letter-spacing 2,28 → 4,56 px, escala 1,03, animação ativa); sem overflow.

- Ajuste (pedido do dono): título "BÍBLICA VIDA" do hero mais próximo da linha "Igreja Protestante Evangélica · São Paulo": os dois ficam num grupo com `gap-1` e o h1 passa de `leading-[1.1]` para `leading-none` (a Bebas Neue não tem letras que descem). Folga entre as caixas: 24 px → 4 px; botões mantêm o espaçamento de antes.

### Rodapé: marca gigante "JESUS SALVA" (direção O, aprovada pelo dono)

- `Footer.astro` reescrito: fundo escuro, "Venha nos visitar" + endereço + redes à esquerda, links em 2 colunas à direita, direito autoral e tagline, e **"JESUS SALVA"** em Bebas Neue gigante e apagada na base (frase escolhida pelo dono, no lugar do nome da igreja da proposta). `SocialLinks.astro` agora usa ícones SVG com contorno (os PNG pretos não apareciam em fundo escuro; os arquivos em `public/images/icons/` ficaram sem uso).
- Frase gigante: `aria-hidden` + `sr-only` "Jesus salva". O verificador de contraste do Lighthouse ignora `aria-hidden` e reprovou o texto apagado (acessibilidade 96); corrigido pintando o texto com degradê recortado (`bg-clip-text`, cor transparente): volta a 100 com o mesmo visual. Tamanho `clamp(80px, 20vw, 240px)` (cabe em 375 px: 318 px de texto).
- Verificado: lint, format, test, build; Lighthouse mediana de 3 = 97/100/100/100; navegador em desktop e 375 px, sem overflow.
