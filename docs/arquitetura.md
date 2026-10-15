# Arquitetura

## Stack

- Astro 7 (7.3.8+, SSG, zero JS por padrão) + TypeScript (strict) + Tailwind CSS — atualizado de Astro 5 em 2026-10-14 por vulnerabilidades críticas só corrigidas a partir do 7.3.8 (ver `.specify/memory/constitution.md` v1.0.1)
- Conteúdo em Astro Content Collections (Markdown/JSON) — sem banco de dados, sem backend
- CI/CD: GitHub Actions (`.github/workflows/ci-cd.yml`) — lint, Prettier, testes, build e Lighthouse ≥ 90 em todo push/PR; deploy automático no Cloudflare Pages só em push na `main` com o CI verde (segredos e variável descritos no README)
- Hospedagem: Cloudflare Pages (plano free, banda ilimitada) com GitHub Pages como plano B
- Integrações sem chave de API: iframe do Google Maps, iframe do Google Calendar (agenda pública), YouTube via embed `youtube-nocookie.com` com carregamento sob demanda (lite embed), redes sociais como links
- Domínio: subdomínio gratuito (`*.pages.dev` ou `*.github.io`); domínio próprio é pago, só entra se o dono do projeto decidir depois

## Camadas (Astro islands, sem JS no cliente exceto onde necessário)

- `src/pages/` — **uma única rota, `index.astro` (landing de rolagem contínua)**. Seções na ordem, com âncoras: `#inicio` (Hero), `#cultos`, `#quem-somos`, `#pastores`, `#historia`, `#pregacao`, `#localizacao` (mapa + endereço + "Como chegar"). Cada seção é um componente `Secao*.astro`. As rotas antigas (`/agenda`, `/pastores`, `/quem-somos`, `/nossa-historia`) são redirects em `astro.config.mjs`. Sem rota `contato` — RF09 está suspenso (ver `docs/dados-igreja.md`); redes sociais ficam no rodapé. Cabeçalho **flutuante**: pílula escura (`fixed`, fora do fluxo da página, com blur e sombra) centralizada no topo; no desktop acompanha o conteúdo (`w-max`), no celular ocupa a largura da tela e o menu hambúrguer abre como um cartão arredondado logo abaixo; o JS mede a faixa que ele ocupa (`--header-h`) para as telas centralizarem o conteúdo abaixo dele; todas as seções usam o container `max-w-6xl`; menu por âncoras com rolagem suave (desligada em `prefers-reduced-motion`).
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
- Bebas Neue (`font-logo`) — só o logotipo "BÍBLICA VIDA" (topo e hero), com brilho neon e leve movimento ao passar o mouse (`titulo-neon`)
- Outfit 600 (`font-display`) — títulos e destaques; os títulos de seção levam um sublinhado clarinho (`titulo-sublinhado`), exceto o logotipo "BÍBLICA VIDA" (topo e hero)

### Seção "Os pastores" (RF03)

Layout "Retratos escuros" (direção H do Claude Design): fundo `--color-bg-charcoal`, retrato 4:5 com nome e função sobre a foto (degradê escuro) e a mini-bio embaixo. **Pastores** aparecem acima das **Pastoras**, cada grupo com seu título, sem referência a casamento/cônjuge. O pastor titular vem primeiro dentro do grupo. Todos os cartões têm o mesmo tamanho em qualquer tela (2, 3 ou 4 por linha); linha incompleta fica centralizada.

As fotos ficam em `src/assets/pastores/` (JPG/PNG quadrados com fundo preto de estúdio, sem círculo nem marca d'água); o Astro as otimiza no build.

Os acentos `--color-accent-pra` (`#6B2B3A`) e `--color-accent-pr` (`#2E4A4A`) **não são mais usados** nesta seção: sobre o charcoal eles dão ~1,7:1 e reprovam AA. Se voltarem a ser usados, só em fundo claro (ivory ou branco, ~10:1).

### Seção "Como chegar" (RF06)

Direção L (painel escuro único) do Claude Design: seção em `--color-bg-ivory` com um painel `--color-bg-charcoal` de cantos arredondados. À esquerda, o mapa do Google embutido com filtro CSS (`grayscale` + `invert`) que o deixa preto com rótulos claros; o iframe sobe 10rem além da área visível para esconder o cartão "Open in Maps" do Google (os créditos do Google no rodapé do mapa continuam visíveis). O mapa é fixo (`pointer-events-none`, sem arrastar) e o pin branco com brilho é um SVG desenhado por cima, na ponta exata do marcador do Google (50% da altura visível menos 5rem, por causa do deslocamento do iframe); se o deslocamento do iframe mudar, esse valor precisa mudar junto. À direita, centralizados: "Venha nos visitar", o endereço, o botão grande "Como chegar" (rota no Google Maps) e, ao lado dele, um quadradinho só com o ícone de copiar o endereço (vira um check por 2 s; o resultado é anunciado por texto oculto). Os botões de rota por tipo de deslocamento (carro, transporte, a pé, Waze) da direção K foram descartados pelo dono do projeto; estão no histórico do Git.

### Rodapé

Direção O do Claude Design (marca gigante): fundo `--color-bg-dark`; à esquerda "Venha nos visitar", o endereço e os ícones das redes (Instagram e YouTube em SVG com contorno, `SocialLinks.astro`); à direita os seis links em duas colunas (Outfit); abaixo, direito autoral e a linha "Igreja Protestante Evangélica · São Paulo". Na base, a frase **"JESUS SALVA"** em Bebas Neue gigante e apagada, cortada na borda: é decorativa (`aria-hidden`), pintada com degradê recortado no texto (`bg-clip-text`) para o verificador de contraste do Lighthouse não tratá-la como texto comum, e há um `sr-only` "Jesus salva" para leitores de tela. A frase foi escolhida pelo dono do projeto (não é texto inventado).

### Rolagem com seções empilhadas

Inspirado em cloudstudio.es: ao rolar, cada seção (`.empilha`: hero, cultos, quem somos, pastores, história, pregações e como chegar) fica grudada (`position: sticky`) e a próxima sobe por cima, com cantos superiores arredondados e sombra; a seção coberta escurece (`--cobertura`, 0 a 0,55). Sem biblioteca: CSS em `global.css` + `src/scripts/empilha.ts`.

- Seção mais alta que a tela gruda pela base (`top = min(0, altura da tela - altura da seção)`, em px, calculado no JS), para o fim dela continuar à vista até a próxima cobrir; as mais baixas grudam no topo.
- O CSS só liga depois da classe `empilha-pronta` (sem JS a página rola normal) e **só sem `prefers-reduced-motion: reduce`**.
- Como o sticky muda a posição "visível" das seções, `empilha.ts` calcula a **posição natural** (soma das alturas) e a usa para: link ativo do menu, cliques nas âncoras (`#cultos` etc. rolam até a posição natural; sem isso o clique "não faria nada" numa seção grudada) e `inert` nas seções totalmente cobertas (não recebem foco nem clique por baixo).
- **Cada seção é uma tela:** `.tela` (`min-height: 100svh`, conteúdo centralizado abaixo do cabeçalho fixo, cuja altura o JS publica em `--header-h`); o hero usa `.tela-hero` (hero + cabeçalho = uma tela). Seções com mais conteúdo (pastores, pregações) crescem além da tela. Com isso o escurecimento começa só quando a próxima seção de fato chega.
- Ao incluir uma seção nova, dê a ela as classes `empilha tela` e um `id`; mantenha seções filhas diretas do mesmo contêiner (`<main>`), sem margens entre elas.

### "Quem somos": cards que abrem em tela cheia

Cada card (Missão, Visão, Crenças) mostra 3 linhas do texto e "Ler mais"; ao clicar em qualquer parte do card, um `<dialog>` nativo abre ocupando a tela inteira, com o título grande, o texto completo e um botão "X" dentro da coluna do texto (alinhado à direita, logo acima do título, e grudado no topo enquanto o texto rola — fica perto de quem lê, não no canto da tela). A abertura "cresce" a partir do retângulo do card (animação de `clip-path`) e o fechamento volta para ele. O `<dialog>` cuida de foco (vai para o "X" e volta para o "Ler mais"), tecla Esc e leitor de tela; a rolagem da página é travada enquanto aberto (`html.travado`). Sem JS o texto completo aparece no fluxo da página; com "reduzir movimento" não há animação. Textos em `SecaoQuemSomos.astro` (`paragrafos`); lógica em `interacoes.ts`; estilos `.tela-cheia` em `global.css`.

## Histórico de mudanças estruturais

- 2026-10-14: scaffold inicial do projeto criado (pastas, AGENTS.md, CLAUDE.md, docs, specs, .claude/agents/design-reviewer.md).
- 2026-10-14 (revisão): site convertido de 5 rotas para landing page única com seções ancoradas (spec.md Assumptions + tasks.md Phase 8).
- 2026-10-14: implementação completa das 4 user stories (specs/001-site-institucional/tasks.md, Phases 1–7). 5 rotas reais (`/`, `/quem-somos`, `/pastores`, `/nossa-historia`, `/agenda`), Astro 7.3.8+, Tailwind 4, Content Collections (`pastores`, `historia`, `cultos`). `graphify-out/` gerado em modo `--code-only` (sem chave de API, custo zero) — comunidades ficam com nomes genéricos "Community N" em vez de rótulos semânticos, trade-off aceito para manter RNF01.
- 2026-10-14 (noite): polimento visual/responsivo — `LogoMark.astro` e `src/scripts/interacoes.ts` criados; Header sticky + menu mobile; Hero em 2 colunas; pastores em grade flex centralizada; vídeos em carrossel no celular; mapa sem cartão do Google; textos `TODO:` visíveis viraram "Em breve". Lighthouse 99–100 em mobile e desktop.
