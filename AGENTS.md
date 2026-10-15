# AGENTS.md

## Projeto

Site institucional gratuito da igreja Bíblica Vida. Estático, rápido, acessível, mobile-first, em português do Brasil.

## Regras inegociáveis

1. 100% gratuito: nenhuma dependência, serviço ou hospedagem paga.
2. Antes de qualquer tarefa, leia `docs/requisitos.md`, `docs/arquitetura.md` e a spec ativa em `specs/`. Se `graphify-out/GRAPH_REPORT.md` existir, leia-o ANTES de buscar arquivos.
3. Não invente: se não houver informação (horários, nomes, textos, links), pergunte ou use placeholder marcado `TODO:`. Nunca fabricar dados da igreja.
4. Não adicione bibliotecas sem justificar e sem minha aprovação.
5. Não crie backend, banco de dados nem API paga.
6. Siga SDD: spec → plan → tasks → implementação. Não implemente algo que não esteja na spec.

## Stack

Astro 7 (7.3.8+), TypeScript strict, Tailwind CSS, Content Collections. Deploy: Cloudflare Pages.

## Estrutura e convenções

- Conteúdo editável só em `src/content/` e `src/config/site.ts`.
- Componentes em PascalCase (`PastorCard.astro`), páginas em kebab-case.
- Acessibilidade: HTML semântico, alt em toda imagem, contraste AA, navegação por teclado.
- Performance: imagens otimizadas (`astro:assets`), iframes com `loading="lazy"`.
- Comentários e commits em português; commits no padrão Conventional Commits.

## Harness Engineering (fluxo por tarefa)

Toda tarefa de implementação segue este ciclo, sem exceção:

1. **Contrato**: antes de codificar, precisa existir um contrato com entregas e critérios de
   aceitação. Aqui o contrato é `specs/<feature>/{spec.md,plan.md,tasks.md}` (Spec Kit). Não
   começar a codificar sem um contrato correspondente.
2. **Implementação**: codificar exatamente conforme o contrato, mantendo modularidade (ver
   Estrutura e convenções acima).
3. **QA automático**: depois de implementar, rodar os sensores externos disponíveis —
   `npm run build`, lint/typecheck, e Lighthouse — e comparar o resultado com os Acceptance
   Scenarios do `spec.md` e os cenários de `quickstart.md`. Como o projeto não tem lógica de
   backend, não há testes de unidade/integração tradicionais; os "sensores" aqui são build,
   lint/typecheck, Lighthouse e a checagem manual de cada Acceptance Scenario — nunca declarar
   uma tela pronta só por leitura de código.
4. **Loop de correção**: se um sensor falhar ou um critério do contrato não for atendido, corrigir
   e repetir o passo 3 até 100% dos sensores passarem e todos os critérios serem atendidos.
5. **Relatório de estado**: ao final de cada sessão, atualizar `progress.md` na raiz do projeto
   com o que foi concluído, o que falhou (e por quê) e o que está pendente — garante continuidade
   entre sessões.

Regra geral: priorizar sempre o resultado de um sensor externo (build, lint, Lighthouse,
Acceptance Scenarios testados) sobre a avaliação subjetiva de "parece que está certo".

## Comandos

- `npm install` · `npm run dev` · `npm run build` · `npm run preview`

## Definição de pronto

Build sem erros, Lighthouse ≥ 90 em todas as categorias, sem texto inventado, conteúdo vindo de `src/content/`.
