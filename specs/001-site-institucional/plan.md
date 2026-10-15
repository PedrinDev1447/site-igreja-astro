# Implementation Plan: Site Institucional — Bíblica Vida

**Branch**: `001-site-institucional` | **Date**: 2026-10-14 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-site-institucional/spec.md`

## Summary

Site institucional estático de página única por rota (5 rotas) para a Igreja Bíblica Vida:
home, quem-somos, pastores, nossa-história e agenda (horários + localização). Conteúdo real vem
de `docs/dados-igreja.md`; o que falta usa placeholder explicitamente autorizado (Lorem ipsum nas
bios). Abordagem técnica: Astro 7 (7.3.8+) em modo SSG puro, zero JavaScript no cliente por padrão,
conteúdo em Content Collections, hospedagem gratuita, identidade visual preto & branco /
ivory-charcoal (Inter + Playfair Display) conforme `docs/arquitetura.md`.

## Technical Context

**Language/Version**: TypeScript 5 (strict) + Astro 7 (7.3.8+ — pinado a partir dessa versão por
corrigir vulnerabilidades críticas/altas em esbuild e sharp presentes em toda a linha 5.x)

**Primary Dependencies**: Astro 7 (SSG), Tailwind CSS (via `@astrojs/tailwind` ou integração
nativa do Tailwind 4), Astro Content Collections (nativo, sem dependência extra)

**Storage**: N/A — sem banco de dados; conteúdo em arquivos Markdown/JSON versionados em
`src/content/`

**Testing**: Sem suíte de testes unitários (não há lógica de negócio/backend). Validação via:
(1) `npm run build` sem erros, (2) Lighthouse (performance/acessibilidade/boas práticas/SEO) ≥ 90,
(3) checklist manual dos Acceptance Scenarios do `spec.md`, (4) revisão do subagent
`design-reviewer` em toda tela

**Target Platform**: Web estático — Cloudflare Pages (plano free) como alvo principal, GitHub
Pages como plano B

**Project Type**: Static site (SSG), projeto único (não há frontend/backend separados)

**Performance Goals**: Lighthouse ≥ 90 em performance/acessibilidade/boas práticas/SEO; zero JS no
carregamento inicial de qualquer página (único JS client-side permitido: o clique que carrega o
iframe do YouTube sob demanda)

**Constraints**: Custo zero (sem API paga, sem cartão de crédito, sem domínio próprio);
responsivo a partir de 320px; iframes com `loading="lazy"`; imagens via `astro:assets`

**Scale/Scope**: 5 rotas (`/`, `/quem-somos`, `/pastores`, `/nossa-historia`, `/agenda`), ~8
componentes reutilizáveis (Hero, Header, Footer, PastorCard, EventCalendar, MapEmbed, YouTubeLite,
SocialLinks), sem autenticação, sem painel administrativo

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Princípio da Constituição      | Status                              | Nota                                                                                                                                                                                   |
| ------------------------------ | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| I. Custo Zero                  | PASS                                | Astro + Cloudflare Pages/GitHub Pages, sem API paga; Maps/YouTube via embed público                                                                                                    |
| II. Sem Alucinação de Conteúdo | PASS                                | Todo conteúdo rastreável a `docs/dados-igreja.md`; bios Lorem ipsum são placeholder explicitamente autorizado, registrado como tal                                                     |
| III. Acessibilidade            | PASS (a verificar na implementação) | HTML semântico, alt obrigatório, contraste AA — incluindo as duas cores de destaque por gênero na página de pastores, que precisam ser validadas em ambos os fundos (ivory e charcoal) |
| IV. Performance                | PASS (a verificar na implementação) | Zero JS por padrão; único JS é o clique do YouTube lite embed; imagens otimizadas via `astro:assets`                                                                                   |

Nenhuma violação a justificar — **Complexity Tracking** fica vazio.

## Project Structure

### Documentation (this feature)

```text
specs/001-site-institucional/
├── plan.md              # Este arquivo
├── research.md          # Fase 0
├── data-model.md        # Fase 1
├── quickstart.md         # Fase 1
└── tasks.md             # Fase 2 (/speckit-tasks — ainda não criado)
```

Sem `contracts/`: o projeto não expõe nenhuma API/interface externa (site estático sem backend),
então essa pasta é omitida por não se aplicar.

### Source Code (repository root)

```text
site-igreja/
├── src/
│   ├── pages/
│   │   ├── index.astro
│   │   ├── quem-somos.astro
│   │   ├── pastores.astro
│   │   ├── nossa-historia.astro
│   │   └── agenda.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── PastorCard.astro
│   │   ├── EventCalendar.astro
│   │   ├── MapEmbed.astro
│   │   ├── YouTubeLite.astro
│   │   └── SocialLinks.astro
│   ├── content/
│   │   ├── pastores/        # 1 arquivo por pastor/pastora (frontmatter: nome, papel, grupo, imagem, bio)
│   │   ├── historia/        # 1 arquivo por marco da linha do tempo
│   │   └── cultos/          # dias/horários de culto
│   ├── config/
│   │   └── site.ts          # nome, endereço, redes sociais, link de vídeos em destaque
│   └── styles/
└── public/
    └── images/
        ├── logo-removebg.png
        ├── icons/
        └── pastores/
```

**Structure Decision**: Projeto único (Astro SSG), sem separação frontend/backend — não se aplica
nenhuma das opções 2/3 do template. Rotas e componentes seguem exatamente a árvore definida em
`docs/arquitetura.md`. A página de Agenda cobre RF05 (horários) e RF06 (localização) juntas,
sem rota separada para "Localização"; não há rota `/contato` nesta versão (RF09 suspenso).

## Complexity Tracking

Vazio — nenhuma violação da Constitution Check a justificar.
