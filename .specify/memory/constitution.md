<!--
Sync Impact Report
- Version change: 1.0.0 → 1.0.1 (patch — correção de versão de stack, sem mudança de princípio)
- Modified: Stack e Restrições Técnicas — "Astro 5" → "Astro 7 (7.3.8+)"
- Rationale: Astro 5.x só está disponível com esbuild/sharp em versões com vulnerabilidades
  conhecidas (RCE via otimização de imagem AVIF, XSS, SSRF, leitura arbitrária de arquivo no dev
  server no Windows); o patch só existe a partir do Astro 7.3.8. Decisão aprovada explicitamente
  pelo dono do projeto em 2026-10-14.
- Added sections (v1.0.0): Core Principles (I–IV), Stack e Restrições Técnicas, Fluxo de
  Desenvolvimento (SDD), Governance
- Removed sections: none
- Follow-up TODOs: none
-->

# Bíblica Vida — Site Institucional Constitution

## Core Principles

### I. Custo Zero (NON-NEGOTIABLE)
Toda ferramenta, serviço, hospedagem ou dependência usada neste projeto DEVE ser gratuita.
Nenhuma chave de API paga, nenhum cartão de crédito, nenhum plano pago. Integrações externas
(Google Maps, Google Calendar, YouTube) DEVEM usar embeds públicos sem autenticação, nunca APIs
pagas ou com cobrança por uso.
Rationale: o projeto é mantido por uma igreja sem orçamento de tecnologia; qualquer custo
recorrente inviabiliza a manutenção de longo prazo.

### II. Sem Alucinação de Conteúdo (NON-NEGOTIABLE)
Nomes, horários, endereços, textos institucionais e links DEVEM vir de `docs/dados-igreja.md` ou
de instrução explícita do dono do projeto. Na ausência de um dado, o código DEVE usar um
placeholder marcado `TODO:` em vez de inventar informação. Texto placeholder (ex.: Lorem ipsum)
só é aceitável quando o dono do projeto autorizou explicitamente seu uso temporário — e isso deve
estar registrado em `docs/dados-igreja.md`.
Rationale: é o site institucional de uma igreja real; um dado errado (horário, endereço, nome de
pastor) é um erro de confiança pública, não um bug cosmético.

### III. Acessibilidade (NON-NEGOTIABLE)
HTML semântico, texto alternativo em toda imagem, contraste mínimo AA, navegação por teclado e
alvos de toque de pelo menos 44px DEVEM ser garantidos em toda tela antes de ela ser considerada
pronta.
Rationale: a maioria dos visitantes acessa pelo celular e inclui pessoas de todas as idades e
capacidades; acessibilidade aqui é parte do acolhimento da igreja, não um extra técnico.

### IV. Performance (NON-NEGOTIABLE)
O site DEVE manter Lighthouse ≥ 90 em performance, acessibilidade, boas práticas e SEO. Zero
JavaScript no cliente é o padrão; JS só é introduzido quando estritamente necessário, com
justificativa registrada. Imagens DEVEM ser otimizadas via `astro:assets`; iframes DEVEM usar
`loading="lazy"`.
Rationale: conexões móveis no Brasil variam muito em qualidade; um site lento ou pesado exclui
parte da congregação que ele deveria servir.

## Stack e Restrições Técnicas

Astro 7 (7.3.8+, SSG) + TypeScript strict + Tailwind CSS. Conteúdo em Astro Content Collections
(Markdown/JSON) — sem backend, sem banco de dados, sem API própria. Hospedagem: Cloudflare Pages
(plano free), com GitHub Pages como plano B. Domínio: subdomínio gratuito (`*.pages.dev` ou
`*.github.io`); domínio próprio é pago e só entra se o dono do projeto decidir depois. Trocar
qualquer item desta stack exige aprovação explícita do dono do projeto antes da implementação.

## Fluxo de Desenvolvimento (SDD)

O projeto segue Spec-Driven Development: spec → plan → tasks → implementação, nessa ordem.
Nenhuma implementação começa sem uma task correspondente em `specs/`. Toda tela, seção ou
componente visual DEVE ser criado com a skill `frontend-design` e revisado pelo subagent
`design-reviewer` antes de ser considerado pronto. Mudanças que tocam mais de 3 arquivos usam
Plan Mode. Identidade visual e decisões de design seguem `docs/arquitetura.md`.

## Governance

Esta constituição tem precedência sobre `AGENTS.md`, `CLAUDE.md` e qualquer outra instrução de
estilo em caso de conflito. Emendas exigem: proposta por escrito, aprovação do dono do projeto,
atualização de versão conforme semver (MAJOR: remoção/redefinição incompatível de princípios;
MINOR: novo princípio ou seção; PATCH: redação/clareza) e um Sync Impact Report registrando a
mudança. Toda spec, plano e lista de tasks gerada DEVE ser verificada quanto à conformidade com os
princípios acima antes de seguir para implementação. Use `docs/arquitetura.md` para orientação de
execução visual e `docs/requisitos.md` + `docs/dados-igreja.md` para escopo e conteúdo.

**Version**: 1.0.1 | **Ratified**: 2026-10-14 | **Last Amended**: 2026-10-14
