# Site da Igreja Bíblica Vida

Site institucional da igreja Bíblica Vida (São Paulo): uma página única, estática, rápida, acessível e
**100% gratuita** de hospedar. Mostra os horários dos cultos (com o "próximo culto" calculado na hora),
quem somos, os pastores, a história, pregações do YouTube e como chegar.

[![CI/CD](https://github.com/PedrinDev1447/site-igreja-astro/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/PedrinDev1447/site-igreja-astro/actions/workflows/ci-cd.yml)

## Tecnologias

| Tecnologia                          | Para que serve aqui                                                                                                                                          |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Astro 7**                         | Gera o site como HTML estático e entrega JavaScript só onde precisa (menu, próximo culto). Resultado: carrega rápido, mesmo em celular com internet fraca.   |
| **TypeScript** (modo estrito)       | Tipagem no código e nos dados do conteúdo; erros aparecem antes de ir para o ar.                                                                             |
| **Tailwind CSS 4**                  | Estilos feitos direto no HTML, com a identidade visual (cores e fontes) definida num só lugar: `src/styles/global.css`.                                      |
| **Astro Content Collections + Zod** | Pastores, cultos e história ficam em arquivos JSON validados (`src/content/`). Editar o conteúdo não exige mexer em código, e um dado errado quebra o build. |
| **Fontsource** (Inter e Outfit)     | Fontes hospedadas junto com o site, sem pedir nada ao Google Fonts (mais rápido e melhor para a privacidade, LGPD).                                          |
| **ESLint + Prettier**               | Padronizam e verificam o código a cada mudança.                                                                                                              |
| **node:test** (nativo do Node)      | Testes automatizados do cálculo do "próximo culto", sem dependência extra.                                                                                   |
| **Lighthouse**                      | Mede desempenho, acessibilidade, boas práticas e SEO; o pipeline exige nota mínima 90.                                                                       |
| **GitHub Actions**                  | Integração contínua (CI) e entrega contínua (CD): verifica e publica automaticamente.                                                                        |
| **Cloudflare Pages**                | Hospedagem gratuita com banda ilimitada, onde o site é publicado.                                                                                            |
| **Spec Kit (SDD)**                  | Fluxo de Spec-Driven Development: o que será feito fica descrito em `specs/` antes de ser codificado.                                                        |

Integrações sem chave de API e sem custo: Google Maps (iframe), YouTube no modo privacidade avançada
(`youtube-nocookie.com`, carregado só quando a pessoa clica no vídeo), Instagram e YouTube como links.

## Estrutura

```
src/
  pages/index.astro        página única (landing de rolagem contínua)
  components/              Hero, Header, Secao*, PastorCard, PainelCultos, MapEmbed, LogoMark...
  content/                 pastores, cultos e história (JSON) — conteúdo editável
  config/site.ts           dados globais: nome, endereço, links, vídeos em destaque
  scripts/                 JavaScript do navegador (interações e cálculo do próximo culto)
  styles/global.css        identidade visual e efeito de luz da marca
tests/                     testes automatizados
scripts/                   ferramentas de CI (verificação do Lighthouse)
docs/                      requisitos, arquitetura e dados da igreja
specs/                     especificações (Spec-Driven Development)
```

## Como rodar

Precisa de Node 20 ou superior (o CI usa Node 24; os testes precisam de Node 22.18+).

```bash
npm install        # instala as dependências
npm run dev        # servidor de desenvolvimento
npm run build      # gera o site em dist/
npm run preview    # serve o build para conferir
npm run lint       # ESLint
npm run format:check   # confere o Prettier (npx prettier --write . para corrigir)
npm test           # testes do próximo culto
```

## Como editar o conteúdo

- **Horários dos cultos:** `src/content/cultos/*.json`. Culto novo também precisa de uma regra de
  repetição em `src/components/PainelCultos.astro` (mapa `REGRAS`) para entrar no "próximo culto".
- **Pastores:** `src/content/pastores/*.json` e as fotos em `src/assets/pastores/`.
- **História:** arquivos em `src/content/historia/` (campos `data`, `titulo`, `descricao`). Enquanto a
  pasta estiver vazia, o site mostra "Em breve".
- **Endereço, redes sociais e vídeos:** `src/config/site.ts`.

## Integração e entrega contínuas (CI/CD)

O pipeline está em `.github/workflows/ci-cd.yml`.

**CI** (em todo push e pull request), na ordem: instala dependências com `npm ci` → lint → Prettier →
testes → build → Lighthouse (3 medições; falha se a mediana de alguma categoria ficar abaixo de 90). O site gerado fica guardado
como artefato por 7 dias.

**CD** (só em push na `main`, depois do CI passar): publica a pasta `dist/` no Cloudflare Pages.
Um commit que quebra o lint, os testes, o build ou a nota do Lighthouse **não vai para o ar**.

### Configuração única do deploy

1. Crie um projeto no Cloudflare Pages (plano gratuito) com upload direto, sem conectar ao Git.
2. No GitHub, em **Settings → Secrets and variables → Actions**, cadastre:
   - Secret `CLOUDFLARE_API_TOKEN`: token com permissão **Cloudflare Pages: Edit**;
   - Secret `CLOUDFLARE_ACCOUNT_ID`: ID da conta Cloudflare;
   - Variable `CLOUDFLARE_PROJECT_NAME`: nome do projeto criado no passo 1.
3. Em **Settings → Environments**, crie o ambiente `production` (opcional: exigir aprovação manual).

Enquanto os segredos não existirem, o CI funciona normalmente e só o job de deploy falha.

## Documentação

- `AGENTS.md` — regras para qualquer agente de IA que trabalhar neste repositório
- `CLAUDE.md` — regras específicas para o Claude Code
- `docs/requisitos.md` — requisitos funcionais e não funcionais
- `docs/arquitetura.md` — arquitetura e identidade visual
- `docs/dados-igreja.md` — dados reais da igreja e o que ainda falta
- `specs/` — specs do Spec-Driven Development (GitHub Spec Kit)
- `progress.md` — registro do que foi feito em cada sessão
