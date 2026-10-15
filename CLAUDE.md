# CLAUDE.md

@AGENTS.md

## Regras específicas do Claude Code

- No início de TODA sessão: leia AGENTS.md, docs/requisitos.md, docs/arquitetura.md e a spec ativa. Resuma em 3 linhas o que entendeu antes de editar qualquer coisa.
- Se `graphify-out/GRAPH_REPORT.md` existir, consulte o grafo (`/graphify query ...`) antes de varrer arquivos com Glob/Grep.
- Nunca alucine arquivos, rotas ou componentes: confirme que existem (Read/Glob) antes de referenciar.
- DESIGN (obrigatório): o dono do projeto é de back-end e não tem olho de designer, então o critério visual é seu. Toda tela, seção ou componente visual deve ser (1) criado usando a skill `frontend-design` e (2) revisado pelo subagent `design-reviewer` ANTES de dizer que está pronto. Siga a identidade visual definida em `docs/arquitetura.md`.
- Ao entregar uma tela, mostre o veredito do `design-reviewer` (aprovado / ajustes feitos / pontos que dependem da decisão do dono do projeto) em linguagem simples, sem jargão de design.
- Se for pedido algo que prejudique legibilidade, contraste ou usabilidade mobile, discorde e explique o motivo, em vez de simplesmente obedecer.
- Use Plan Mode para mudanças que toquem mais de 3 arquivos.
- Após mudanças relevantes, rode `npm run build` e informe o resultado.
- Depois de alterar a estrutura do projeto, atualize o grafo (`/graphify --update`) e a seção correspondente em docs/arquitetura.md.
- Siga o fluxo de Harness Engineering descrito em AGENTS.md para toda tarefa de implementação: contrato (specs/) → código → QA automático (build/lint/Lighthouse/Acceptance Scenarios) → corrigir até passar → atualizar `progress.md`. Nunca pule a fase de QA automático nem o registro em `progress.md` no fim da sessão.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:

- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
