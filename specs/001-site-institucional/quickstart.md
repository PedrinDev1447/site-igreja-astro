# Quickstart: Site Institucional — Bíblica Vida

Guia de validação ponta a ponta para esta feature. Não é um manual de implementação (isso é
`tasks.md`, gerado por `/speckit-tasks`) — é como provar que o site funciona depois de
implementado.

## Pré-requisitos

- Node.js 20+ e npm instalados (confirmado disponível: Node 24.18.0)
- Repositório em `C:\projetos\site-igreja`, com `docs/dados-igreja.md` e `docs/arquitetura.md`
  como fonte de conteúdo e de design

## Setup

```powershell
cd C:\projetos\site-igreja
npm create astro@latest -- --template minimal --no-install   # ou equivalente, conforme tasks.md
npm install
npm install -D tailwindcss @tailwindcss/vite
npm install @fontsource/inter @fontsource/playfair-display
```

(Os comandos exatos de scaffold do Astro ficam detalhados em `tasks.md` — este guia assume que o
projeto já existe.)

## Rodar localmente

```powershell
npm run dev
```

Abrir `http://localhost:4321` (porta padrão do Astro).

## Cenários de validação (ligados aos Acceptance Scenarios do spec.md)

1. **Home mostra horários rapidamente (US1 / SC-001)**
   - Abrir `/` em viewport mobile (375px).
   - Confirmar que nome da igreja e horários de culto aparecem sem rolar além da primeira tela em
     desktop (1280×800) — SC-001.

2. **Rota até a igreja em poucos toques (US1 / SC-002)**
   - Abrir `/agenda`.
   - Clicar em "Como chegar" → deve abrir o Google Maps com a rota para
     `R. Santa Eudóxia, 562 - Parque Peruche, São Paulo - SP, 02533-010` em no máximo 2 cliques a
     partir de qualquer página (contando o clique no link do menu até o botão).

3. **Pastores agrupados sem referência a casamento (US2 / FR-003)**
   - Abrir `/pastores`.
   - Confirmar visualmente: pastoras de um lado, pastores do outro; nenhum texto, ícone ou layout
     indica casais; mini-bio de pastoras em `#6B2B3A`, de pastores em `#2E4A4A`.

4. **YouTube carrega só sob clique (US3 / FR-007)**
   - Abrir `/` com as devtools de rede abertas.
   - Confirmar que nenhuma requisição para `youtube-nocookie.com` ocorre antes do clique na
     miniatura; depois do clique, o player carrega.

5. **Build e qualidade (RNF03 / FR-011)**

   ```powershell
   npm run build
   npm run preview
   ```

   Rodar Lighthouse (Chrome DevTools, modo mobile) em `/`, `/pastores` e `/agenda`; todas as 4
   categorias ≥ 90.

6. **Sem dado inventado (Constituição II / SC-005)**
   - Conferir que todo texto exibido (nomes, papéis, horários, endereço, links) bate com
     `docs/dados-igreja.md`; único texto não rastreável permitido é a mini-bio Lorem ipsum,
     explicitamente autorizada.

## Critério de pronto

Todos os 6 cenários acima passam, `npm run build` roda sem erro, e o subagent `design-reviewer`
aprovou cada tela (ou aprovou com ajustes já aplicados).
