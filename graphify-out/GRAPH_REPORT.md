# Graph Report - site-igreja  (2026-11-05)

## Corpus Check
- 91 files · ~54,961 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 3, .css 1)

## Summary
- 595 nodes · 659 edges · 39 communities (36 shown, 3 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 28 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b0233a93`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- BaseLayout.astro
- common.ps1
- with
- package.json
- Implementation Plan: Site Institucional — Bíblica Vida
- Tasks: [FEATURE NAME]
- tsconfig.json
- steps
- PainelCultos.astro
- speckit-analyze/SKILL.md
- Tasks: Site Institucional — Bíblica Vida
- Execution Steps
- Dados da igreja
- Feature Specification: [FEATURE NAME]
- speckit-plan/SKILL.md
- speckit-specify/SKILL.md
- speckit-tasks/SKILL.md
- Core Principles
- Bíblica Vida — Site Institucional Constitution
- AGENTS.md
- Identidade visual
- Implementation Plan: [FEATURE]
- Research: Site Institucional — Bíblica Vida
- speckit-checklist/SKILL.md
- speckit-clarify/SKILL.md
- speckit-implement/SKILL.md
- Sessão 2026-10-14 (noite) — polimento visual e responsivo
- Data Model: Site Institucional — Bíblica Vida
- Quickstart: Site Institucional — Bíblica Vida
- speckit-constitution/SKILL.md
- speckit-taskstoissues/SKILL.md
- Requisitos
- Site da Igreja Bíblica Vida
- [CHECKLIST TYPE] Checklist: [FEATURE NAME]
- CLAUDE.md
- .prettierrc.json
- interacoes.ts
- lighthouse-check.mjs

## God Nodes (most connected - your core abstractions)
1. `Sessão 2026-10-14 (noite) — polimento visual e responsivo` - 23 edges
2. `Tasks: Site Institucional — Bíblica Vida` - 15 edges
3. `Tasks: [FEATURE NAME]` - 13 edges
4. `Dados da igreja` - 12 edges
5. `with` - 11 edges
6. `Site` - 11 edges
7. `Resolve-TemplateContent()` - 9 edges
8. `steps` - 9 edges
9. `proximoCulto()` - 9 edges
10. `Identidade visual` - 9 edges

## Surprising Connections (you probably didn't know these)
- `Implementation for User Story 1` --references--> `Site`  [INFERRED]
  specs/001-site-institucional/tasks.md → src/config/site.ts
- `Phase 2: Foundational (Blocking Prerequisites)` --references--> `Site`  [INFERRED]
  specs/001-site-institucional/tasks.md → src/config/site.ts
- `Contagem regressiva (painel de cultos)` --references--> `proximoCulto()`  [INFERRED]
  docs/arquitetura.md → src/scripts/proximo-culto.ts
- `"Quem somos": cards que abrem em tela cheia` --references--> `limparAnimacoes()`  [INFERRED]
  docs/arquitetura.md → src/scripts/interacoes.ts
- `Quem somos: card em tela cheia com botão "X" (substitui o "Ler mais" que expandia no lugar)` --references--> `limparAnimacoes()`  [INFERRED]
  progress.md → src/scripts/interacoes.ts

## Import Cycles
- None detected.

## Communities (39 total, 3 thin omitted)

### Community 0 - "BaseLayout.astro"
Cohesion: 0.09
Nodes (12): ano, NAV_LINKS, NAV_LINKS, Props, itens, links, Props, raiz (+4 more)

### Community 1 - "common.ps1"
Cohesion: 0.16
Nodes (19): Find-SpecifyRoot(), Format-SpecKitCommand(), Get-CurrentBranch(), Get-FeaturePathsEnv(), Get-InvokeSeparator(), Get-NormalizedPriority(), Get-Python3Command(), Get-RepoRoot() (+11 more)

### Community 2 - "with"
Cohesion: 0.06
Nodes (38): name, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group, environment (+30 more)

### Community 3 - "package.json"
Cohesion: 0.06
Nodes (38): dependencies, astro@^7.3.8, @fontsource/bebas-neue@^5.3.0, @fontsource/inter@^5.3.0, @fontsource/outfit@^5.3.0, tailwindcss@^4.3.3, @tailwindcss/vite@^4.3.3, devDependencies (+30 more)

### Community 4 - "Implementation Plan: Site Institucional — Bíblica Vida"
Cohesion: 0.07
Nodes (26): Content Quality, Feature Readiness, Notes, Requirement Completeness, Specification Quality Checklist: Site Institucional — Bíblica Vida, Complexity Tracking, Constitution Check, Documentation (this feature) (+18 more)

### Community 5 - "Tasks: [FEATURE NAME]"
Cohesion: 0.07
Nodes (26): Dependencies & Execution Order, Format: `[ID] [P?] [Story] Description`, Implementation for User Story 1, Implementation for User Story 2, Implementation for User Story 3, Implementation Strategy, Incremental Delivery, MVP First (User Story 1 Only) (+18 more)

### Community 6 - "tsconfig.json"
Cohesion: 0.40
Nodes (4): astro/tsconfigs/strict, exclude, extends, include

### Community 7 - "steps"
Cohesion: 0.06
Nodes (30): args, inputs, integration, spec, default, prompt, type, any (+22 more)

### Community 8 - "PainelCultos.astro"
Cohesion: 0.09
Nodes (14): cultos, ORDEM_DIAS, cultos, formatarHora(), REGRAS, Props, grupos, pastoras (+6 more)

### Community 15 - "speckit-analyze/SKILL.md"
Cohesion: 0.08
Nodes (25): 1. Initialize Analysis Context, 2. Load Artifacts (Progressive Disclosure), 3. Build Semantic Models, 4. Detection Passes (Token-Efficient Analysis), 5. Severity Assignment, 6. Produce Compact Analysis Report, 7. Provide Next Actions, 8. Offer Remediation (+17 more)

### Community 16 - "Tasks: Site Institucional — Bíblica Vida"
Cohesion: 0.08
Nodes (24): Dependencies & Execution Order, Format: `[ID] [P?] [Story] Description`, Implementation for User Story 1, Implementation for User Story 2, Implementation for User Story 3, Implementation for User Story 4, Implementation Strategy, Incremental Delivery (+16 more)

### Community 17 - "Execution Steps"
Cohesion: 0.12
Nodes (15): 1. Initialize Convergence Context, 2. Load Artifacts (Progressive Disclosure), 3. Build the Intent Inventory, 4. Assess the Codebase and Classify Findings, 5. Assign Severity, 6. Present the In-Session Findings Summary, 7. Append Convergence Tasks (or report converged), 8. Provide Next Actions (Handoff) (+7 more)

### Community 18 - "Dados da igreja"
Cohesion: 0.13
Nodes (14): Contato (RF09), Dados da igreja, Dias e horários de culto (RF05), Endereço, Identidade visual, Identificação, Ministérios, Nossa história (RF04) (+6 more)

### Community 19 - "Feature Specification: [FEATURE NAME]"
Cohesion: 0.15
Nodes (12): Assumptions, Edge Cases, Feature Specification: [FEATURE NAME], Functional Requirements, Key Entities *(include if feature involves data)*, Measurable Outcomes, Requirements *(mandatory)*, Success Criteria *(mandatory)* (+4 more)

### Community 20 - "speckit-plan/SKILL.md"
Cohesion: 0.18
Nodes (10): Completion Report, Done When, Key rules, Mandatory Post-Execution Hooks, Outline, Phase 0: Outline & Research, Phase 1: Design & Contracts, Phases (+2 more)

### Community 21 - "speckit-specify/SKILL.md"
Cohesion: 0.18
Nodes (10): Completion Report, Done When, For AI Generation, Mandatory Post-Execution Hooks, Outline, Pre-Execution Checks, Quick Guidelines, Section Requirements (+2 more)

### Community 22 - "speckit-tasks/SKILL.md"
Cohesion: 0.18
Nodes (10): Checklist Format (REQUIRED), Completion Report, Done When, Mandatory Post-Execution Hooks, Outline, Phase Structure, Pre-Execution Checks, Task Generation Rules (+2 more)

### Community 23 - "Core Principles"
Cohesion: 0.18
Nodes (10): Core Principles, Governance, [PRINCIPLE_1_NAME], [PRINCIPLE_2_NAME], [PRINCIPLE_3_NAME], [PRINCIPLE_4_NAME], [PRINCIPLE_5_NAME], [PROJECT_NAME] Constitution (+2 more)

### Community 24 - "Bíblica Vida — Site Institucional Constitution"
Cohesion: 0.20
Nodes (9): Bíblica Vida — Site Institucional Constitution, Core Principles, Fluxo de Desenvolvimento (SDD), Governance, I. Custo Zero (NON-NEGOTIABLE), II. Sem Alucinação de Conteúdo (NON-NEGOTIABLE), III. Acessibilidade (NON-NEGOTIABLE), IV. Performance (NON-NEGOTIABLE) (+1 more)

### Community 25 - "AGENTS.md"
Cohesion: 0.22
Nodes (7): Comandos, Definição de pronto, Estrutura e convenções, Harness Engineering (fluxo por tarefa), Projeto, Regras inegociáveis, Stack

### Community 26 - "Identidade visual"
Cohesion: 0.15
Nodes (12): Arquitetura, Camadas (Astro islands, sem JS no cliente exceto onde necessário), Contagem regressiva (painel de cultos), Histórico de mudanças estruturais, Identidade visual, Paleta base (neutra), Rodapé, Rolagem com seções empilhadas (+4 more)

### Community 27 - "Implementation Plan: [FEATURE]"
Cohesion: 0.22
Nodes (8): Complexity Tracking, Constitution Check, Documentation (this feature), Implementation Plan: [FEATURE], Project Structure, Source Code (repository root), Summary, Technical Context

### Community 28 - "Research: Site Institucional — Bíblica Vida"
Cohesion: 0.22
Nodes (8): Conteúdo: Astro Content Collections vs. arquivos soltos, Cor por gênero na página de pastores: contraste AA, Estilização: Tailwind CSS 4, Google Maps sem API key, Hospedagem: Cloudflare Pages vs. GitHub Pages, Research: Site Institucional — Bíblica Vida, Tipografia: Inter + Playfair Display sem custo, YouTube: lite embed sob demanda

### Community 29 - "speckit-checklist/SKILL.md"
Cohesion: 0.25
Nodes (7): Anti-Examples: What NOT To Do, Checklist Purpose: "Unit Tests for English", Example Checklist Types & Sample Items, Execution Steps, Post-Execution Checks, Pre-Execution Checks, User Input

### Community 30 - "speckit-clarify/SKILL.md"
Cohesion: 0.29
Nodes (6): Completion Report, Done When, Mandatory Post-Execution Hooks, Outline, Pre-Execution Checks, User Input

### Community 31 - "speckit-implement/SKILL.md"
Cohesion: 0.29
Nodes (6): Completion Report, Done When, Mandatory Post-Execution Hooks, Outline, Pre-Execution Checks, User Input

### Community 32 - "Sessão 2026-10-14 (noite) — polimento visual e responsivo"
Cohesion: 0.07
Nodes (27): Cabeçalho flutuante (pedido do dono), Cada seção é uma tela + Lorem ipsum de preenchimento (pedido do dono), Cards de "Quem somos" que expandem (pedido do dono), CI/CD e README, Como chegar: K com as cores da J, Como chegar: painel escuro único (direção L, aprovada pelo dono), Concluído, Cultos: painel único (direção E do Claude Design) (+19 more)

### Community 33 - "Data Model: Site Institucional — Bíblica Vida"
Cohesion: 0.29
Nodes (6): Configuração: SiteConfig (`src/config/site.ts`, não é uma collection), Data Model: Site Institucional — Bíblica Vida, Entidade: Culto, Entidade: MarcoHistorico, Entidade: Pastor, Relacionamentos

### Community 34 - "Quickstart: Site Institucional — Bíblica Vida"
Cohesion: 0.29
Nodes (6): Cenários de validação (ligados aos Acceptance Scenarios do spec.md), Critério de pronto, Pré-requisitos, Quickstart: Site Institucional — Bíblica Vida, Rodar localmente, Setup

### Community 35 - "speckit-constitution/SKILL.md"
Cohesion: 0.33
Nodes (5): Outline, Post-Execution Checks, Pre-Execution Checks, Scope Guard, User Input

### Community 36 - "speckit-taskstoissues/SKILL.md"
Cohesion: 0.33
Nodes (5): Deprecation Notice, Outline, Post-Execution Checks, Pre-Execution Checks, User Input

### Community 37 - "Requisitos"
Cohesion: 0.40
Nodes (4): Fora de escopo (por ora), Funcionais, Não funcionais, Requisitos

### Community 38 - "Site da Igreja Bíblica Vida"
Cohesion: 0.20
Nodes (9): Como editar o conteúdo, Como rodar, Configuração única do deploy, Documentação, Estrutura, Integração e entrega contínuas (CI/CD), O que o site tem, Site da Igreja Bíblica Vida (+1 more)

### Community 39 - "[CHECKLIST TYPE] Checklist: [FEATURE NAME]"
Cohesion: 0.40
Nodes (4): [Category 1], [Category 2], [CHECKLIST TYPE] Checklist: [FEATURE NAME], Notes

### Community 43 - "interacoes.ts"
Cohesion: 0.09
Nodes (26): "Quem somos": cards que abrem em tela cheia, Contagem regressiva no lugar do relógio de ponteiros (pedido do dono), Quem somos: card em tela cheia com botão "X" (substitui o "Ler mais" que expandia no lugar), iniciarEmpilha(), atualizar(), medir(), reduzMovimento, abrir() (+18 more)

### Community 44 - "lighthouse-check.mjs"
Cohesion: 0.25
Nodes (4): comErro, limite, [minimo, ...arquivos], relatorios

## Knowledge Gaps
- **1 isolated node(s):** `astro/tsconfigs/strict`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 397 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Site` connect `BaseLayout.astro` to `Tasks: Site Institucional — Bíblica Vida`, `PainelCultos.astro`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **What connects `astro/tsconfigs/strict` to the rest of the system?**
  _1 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `BaseLayout.astro` be split into smaller, more focused modules?**
  _Cohesion score 0.0873440285204991 - nodes in this community are weakly interconnected._
- **Why does `Phase 2: Foundational (Blocking Prerequisites)` connect `Tasks: Site Institucional — Bíblica Vida` to `BaseLayout.astro`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Should `with` be split into smaller, more focused modules?**
  _Cohesion score 0.0553306342780027 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06463414634146342 - nodes in this community are weakly interconnected._
- **Should `Implementation Plan: Site Institucional — Bíblica Vida` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._