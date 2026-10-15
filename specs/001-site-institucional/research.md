# Research: Site Institucional — Bíblica Vida

Nenhum `NEEDS CLARIFICATION` ficou pendente no Technical Context do `plan.md` — todas as decisões
abaixo já tinham um caminho claro a partir de `docs/arquitetura.md`, `docs/dados-igreja.md` e das
restrições de custo zero. Este documento registra o porquê de cada escolha, para que decisões não
precisem ser re-justificadas durante a implementação.

## Conteúdo: Astro Content Collections vs. arquivos soltos

- **Decision**: usar Astro Content Collections (`src/content/pastores`, `src/content/historia`,
  `src/content/cultos`), com schema Zod simples por coleção.
- **Rationale**: dá validação de frontmatter em build-time (ex.: um pastor sem `nome` quebra o
  build em vez de publicar silenciosamente um card vazio) — reforça o princípio "Sem Alucinação de
  Conteúdo" da constituição. É nativo do Astro, sem dependência extra, custo zero.
- **Alternatives considered**: JSON solto em `src/config/` — mais simples, mas sem validação de
  schema; descartado porque facilita publicar conteúdo incompleto sem erro visível.

## Estilização: Tailwind CSS 4

- **Decision**: Tailwind CSS 4 via `@tailwindcss/vite` (integração oficial com Vite/Astro), tokens
  de cor/fonte centralizados em `src/styles/global.css` via `@theme`.
- **Rationale**: mesma abordagem usada no projeto de referência anterior (`@theme` em vez de
  `tailwind.config.ts` espalhado); evita duplicar fonte de verdade de cor, problema que o projeto
  anterior teve (`@theme` e `tailwind.config.ts` com os mesmos valores em paralelo).
- **Alternatives considered**: CSS puro — descartado, mais lento para iterar em um projeto com
  várias seções estilizadas; `tailwind.config.ts` + `@theme` duplicados — descartado pelo motivo
  acima.

## Tipografia: Inter + Playfair Display sem custo

- **Decision**: carregar as duas fontes via `@fontsource/inter` e `@fontsource/playfair-display`
  (pacotes npm, self-hosted, sem chamada a Google Fonts em runtime) ou `astro:assets` com arquivos
  de fonte locais.
- **Rationale**: self-hosting evita uma requisição de terceiro (Google Fonts) no carregamento da
  página, o que ajuda a meta de performance (RNF03/FR-011) e evita dependência de disponibilidade
  externa — tudo isso sem custo, só pacotes npm gratuitos.
- **Alternatives considered**: `<link>` direto para `fonts.googleapis.com` (usado por padrão em
  muitos projetos) — descartado por adicionar uma conexão de terceiro e não se alinhar com "zero
  JS/zero dependência externa desnecessária" quando existe alternativa self-hosted igualmente
  gratuita.

## Google Maps sem API key

- **Decision**: iframe `https://www.google.com/maps?q=<endereço URL-encoded>&z=16&output=embed`,
  `loading="lazy"`, conforme já validado em produção no projeto de referência anterior.
- **Rationale**: não exige chave de API nem conta Google Cloud — mantém o princípio de Custo Zero.
  Endereço real confirmado em `docs/dados-igreja.md`.
- **Alternatives considered**: Google Maps Embed API com chave — descartado por exigir cadastro de
  cobrança (mesmo dentro da cota gratuita, viola a regra "nenhuma chave de API paga/com cartão de
  crédito" da constituição).

## YouTube: lite embed sob demanda

- **Decision**: miniatura estática (`https://i.ytimg.com/vi/<id>/hqdefault.jpg`) com um botão de
  play; o iframe `youtube-nocookie.com/embed/<id>` só é inserido no DOM após o clique do visitante
  (pequeno script inline, único JS client-side do projeto).
- **Rationale**: evita carregar o player do YouTube (e os scripts dele) antes da interação,
  preservando a meta de zero JS por padrão (FR-011/Constituição IV) e reduzindo dados trafegados
  para quem não assiste ao vídeo. `youtube-nocookie.com` evita cookies de rastreamento antes do
  consentimento implícito do clique (RNF06/LGPD).
- **Alternatives considered**: iframe direto sem lite embed — descartado por carregar JS pesado do
  YouTube em toda visita à home, mesmo sem intenção de assistir.

## Hospedagem: Cloudflare Pages vs. GitHub Pages

- **Decision**: Cloudflare Pages como alvo principal (banda ilimitada no plano free), GitHub Pages
  como plano B documentado.
- **Rationale**: ambos gratuitos; Cloudflare Pages tem build integrado e preview por PR sem
  configuração extra, adequado a um projeto mantido por uma pessoa não especialista em DevOps.
- **Alternatives considered**: Vercel/Netlify free tier — também gratuitos, mas o projeto de
  referência anterior já usava Vercel; manter Cloudflare Pages como primário evita repetir a mesma
  escolha e dá um plano B real (GitHub Pages) caso o deploy padrão falhe.

## Cor por gênero na página de pastores: contraste AA

- **Decision**: `--color-accent-pra` (`#6B2B3A`) e `--color-accent-pr` (`#2E4A4A`) aplicadas só ao
  texto da mini-bio, nunca como fundo de bloco inteiro.
- **Rationale**: aplicadas como cor de texto sobre `--color-bg-ivory` (`#F7F4EF`) ambas passam
  WCAG AA para texto normal (razão de contraste > 4.5:1); como o card de pastor é sempre claro
  (fundo ivory, não charcoal, conforme o padrão do `PastorCard`), não é necessário um par de cores
  adicional para fundo escuro. O `design-reviewer` confere isso visualmente antes de aprovar a
  tela.
- **Alternatives considered**: usar apenas `--color-text-muted` para todas as bios (sem
  diferenciação por grupo) — rejeitado porque não atende ao pedido explícito do dono do projeto de
  diferenciar visualmente pastoras e pastores por cor.
