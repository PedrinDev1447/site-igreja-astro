# Arquitetura

## Stack

- Astro 7 (7.3.8+, SSG, zero JS por padrão) + TypeScript (strict) + Tailwind CSS — atualizado de Astro 5 em 2026-10-14 por vulnerabilidades críticas só corrigidas a partir do 7.3.8 (ver `.specify/memory/constitution.md` v1.0.1)
- Conteúdo em Astro Content Collections (Markdown/JSON) — sem banco de dados, sem backend
- CI/CD: GitHub Actions (`.github/workflows/ci-cd.yml`) — lint, Prettier, testes, build e Lighthouse ≥ 90 em todo push/PR; deploy automático no Cloudflare Pages só em push na `main` com o CI verde (segredos e variável descritos no README)
- Hospedagem: Cloudflare Pages (plano free, banda ilimitada) com GitHub Pages como plano B
- Integrações sem chave de API: iframe do Google Maps, iframe do Google Calendar (agenda pública), YouTube via embed `youtube-nocookie.com` com carregamento sob demanda (lite embed), redes sociais como links
- Domínio: subdomínio gratuito (`*.pages.dev` ou `*.github.io`); domínio próprio é pago, só entra se o dono do projeto decidir depois

## Camadas (Astro islands, sem JS no cliente exceto onde necessário)

- `src/pages/` — **uma única rota, `index.astro` (landing de rolagem contínua)**. Seções na ordem, com âncoras: `#inicio` (Hero), `#cultos`, `#quem-somos`, `#pastores`, `#historia`, `#pregacao`, `#localizacao` (mapa + endereço + "Como chegar"). Cada seção é um componente `Secao*.astro`. As rotas antigas (`/agenda`, `/pastores`, `/quem-somos`, `/nossa-historia`) são redirects em `astro.config.mjs`. Sem rota `contato` — RF09 está suspenso (ver `docs/dados-igreja.md`); redes sociais ficam no rodapé. Header fixo (sticky, com blur) em todas as telas, com hambúrguer abaixo de `lg`; todas as seções usam o container `max-w-6xl`; menu por âncoras com rolagem suave (desligada em `prefers-reduced-motion`).
- `src/layouts/` — layout base (SEO, meta, acessibilidade)
- `src/components/` — UI reutilizável sem lógica de negócio: Hero, Header, Footer, PastorCard, EventCalendar, MapEmbed, YouTubeLite (player + lista de vídeos, iframe sob demanda), SocialLinks, LogoMark (símbolo com halo/brilho/feixe de luz branca, estilos `.logo-mark` em `global.css`)
- `src/scripts/proximo-culto.ts` — cálculo puro do "próximo culto" (fuso America/Sao_Paulo, regras `semanal:N` e `ultima-sexta`), coberto por `npm test` (`tests/`)
- `src/scripts/interacoes.ts` — JS mínimo sem dependências: menu mobile, link ativo, entrada suave ao rolar (`data-reveal`), luz do hero que segue o mouse, copiar endereço
- `src/content/` — fonte única de verdade do conteúdo (pastores, história, cultos)
- `src/config/site.ts` — dados globais da igreja (nome, endereço, links)
- `public/` — imagens e ícones estáticos

## Identidade visual

**Decisão confirmada pelo dono do projeto: tratamento preto & branco / ivory-charcoal**, o mesmo caminho explorado no projeto anterior (`C:\Projetos-Pessoais\VidaChurch\site-igreja`), não a paleta azul do logo original. A marca (pomba estilizada) é usada em traço claro sobre fundo escuro ou escuro sobre fundo claro — nunca colorida.

Assets:

- `public/images/logo-removebg.png` — marca isolada, fundo transparente, traço claro (para fundo escuro)
- `public/images/logo.jpeg` — logo original com fundo azul-marinho, guardado só como referência histórica da marca, não usado nas telas

### Paleta base (neutra)

| Token                      | Valor     | Uso                               |
| -------------------------- | --------- | --------------------------------- |
| `--color-bg-dark`          | `#0D0D0D` | fundo escuro base                 |
| `--color-bg-charcoal`      | `#1A1A1A` | fundo escuro principal das seções |
| `--color-bg-charcoal-deep` | `#141414` | gradiente escuro                  |
| `--color-bg-ivory`         | `#F7F4EF` | fundo claro principal             |
| `--color-bg-ivory-deep`    | `#EDE8E0` | gradiente claro                   |
| `--color-text-light`       | `#FFFFFF` | texto sobre fundo escuro          |
| `--color-text-dark`        | `#1A1A1A` | texto sobre fundo claro           |
| `--color-text-muted`       | `#5C5C5C` | texto secundário                  |

### Tipografia

- Inter (`font-sans`) — corpo e UI
- Playfair Display (`font-serif` / headings) — títulos e destaques

### Cor por gênero (seção "Os pastores", RF03)

A página separa pastoras de um lado e pastores do outro (sem referência a casamento/cônjuge). Cada mini-bio usa uma cor de destaque diferente por gênero, dentro do mesmo espírito sóbrio/neutro — não são tons "rosa/azul" genéricos, são dois acentos escuros equivalentes em peso visual e contraste:

| Grupo           | Token                | Valor     | Observação                                                                                                                                 |
| --------------- | -------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Pastoras (Pra.) | `--color-accent-pra` | `#6B2B3A` | vinho/bordô escuro — contraste AA em `--color-bg-ivory` e em branco (~10:1). **Não usar sobre `--color-bg-charcoal`** (~1,7:1, reprova AA) |
| Pastores (Pr.)  | `--color-accent-pr`  | `#2E4A4A` | petróleo/verde-azulado escuro — mesmo peso visual, par equivalente ao bordô                                                                |

Essas duas cores valem só para o texto da mini-bio (e talvez um detalhe de borda/ícone) em cada card; o resto do card (nome, foto, layout) continua nos tokens neutros acima. O subagent `design-reviewer` confere contraste AA dessas duas cores em qualquer fundo onde aparecerem antes de aprovar.

## Histórico de mudanças estruturais

- 2026-10-14: scaffold inicial do projeto criado (pastas, AGENTS.md, CLAUDE.md, docs, specs, .claude/agents/design-reviewer.md).
- 2026-10-14 (revisão): site convertido de 5 rotas para landing page única com seções ancoradas (spec.md Assumptions + tasks.md Phase 8).
- 2026-10-14: implementação completa das 4 user stories (specs/001-site-institucional/tasks.md, Phases 1–7). 5 rotas reais (`/`, `/quem-somos`, `/pastores`, `/nossa-historia`, `/agenda`), Astro 7.3.8+, Tailwind 4, Content Collections (`pastores`, `historia`, `cultos`). `graphify-out/` gerado em modo `--code-only` (sem chave de API, custo zero) — comunidades ficam com nomes genéricos "Community N" em vez de rótulos semânticos, trade-off aceito para manter RNF01.
- 2026-10-14 (noite): polimento visual/responsivo — `LogoMark.astro` e `src/scripts/interacoes.ts` criados; Header sticky + menu mobile; Hero em 2 colunas; pastores em grade flex centralizada; vídeos em carrossel no celular; mapa sem cartão do Google; textos `TODO:` visíveis viraram "Em breve". Lighthouse 99–100 em mobile e desktop.
