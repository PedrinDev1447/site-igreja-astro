# Data Model: Site Institucional — Bíblica Vida

Todo o "modelo de dados" aqui é conteúdo estático validado por schema em build-time (Astro
Content Collections + Zod), não um banco de dados. Fonte de verdade dos valores reais:
`docs/dados-igreja.md`.

## Entidade: Pastor

Representa uma pessoa do time pastoral, exibida na página `/pastores`.

| Campo   | Tipo                         | Obrigatório | Regra                                                                                  |
| ------- | ---------------------------- | ----------- | -------------------------------------------------------------------------------------- |
| `nome`  | string                       | sim         | Ex.: "Pr. Kiko", "Pra. Giovana" — inclui o título (Pr./Pra.)                           |
| `papel` | string                       | sim         | Função na igreja, ex.: "Pastor titular", "Ensino"                                      |
| `grupo` | enum `"pastora" \| "pastor"` | sim         | Usado só para agrupar/estilizar (cor de destaque da bio); nunca exibido como texto cru |
| `foto`  | image (`astro:assets`)       | sim         | Caminho em `src/assets/pastores/`                                                      |
| `bio`   | string                       | sim         | Mini-biografia; placeholder Lorem ipsum autorizado até texto real existir              |

**Validação**: nenhum campo além dos listados acima (em particular, **sem** campo de cônjuge,
estado civil ou "casado com") — reforça FR-003 (sem referência a casamento) e a decisão do dono do
projeto.

**Instâncias reais** (de `docs/dados-igreja.md`):

- Pastoras: Pra. Giovana (Ensino), Pra. Silvana (Famílias), Pra. Rosângela (Intercessão)
- Pastores: Pr. Kiko / Luiz Henrique (Pastor titular), Pr. Geneval (Missões), Pr. Alfredo
  (Discipulado), Pr. Marcos (Jovens)

## Entidade: MarcoHistorico

Representa um ponto na linha do tempo da página `/nossa-historia`.

| Campo       | Tipo                                | Obrigatório | Regra                                                                                             |
| ----------- | ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------- |
| `data`      | string (ano ou período, ex. "2010") | sim         | Texto livre para permitir imprecisão ("início dos anos 2000") quando a data exata não é conhecida |
| `titulo`    | string                              | sim         | Título curto do marco                                                                             |
| `descricao` | string                              | sim         | Texto descritivo                                                                                  |

**Nota**: nenhum marco real foi fornecido ainda — esta coleção fica vazia até o dono do projeto
enviar a história real; **não deve ser preenchida com conteúdo inventado** (Constituição II).

## Entidade: Culto

Representa um horário de culto recorrente, exibido na página `/agenda`.

| Campo        | Tipo           | Obrigatório | Regra                                                       |
| ------------ | -------------- | ----------- | ----------------------------------------------------------- |
| `dia`        | string         | sim         | Ex.: "Domingo", "Quarta-feira", "Última sexta-feira do mês" |
| `horaInicio` | string (HH:mm) | sim         | Ex.: "10:00"                                                |
| `horaFim`    | string (HH:mm) | sim         | Ex.: "11:30"                                                |

**Instâncias reais**: Domingo 10:00–11:30; Quarta-feira 20:00–21:30; Última sexta-feira do mês
20:00–21:30.

## Configuração: SiteConfig (`src/config/site.ts`, não é uma collection)

| Campo               | Tipo                                       | Regra                                                                                                                    |
| ------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `nome`              | string                                     | "Bíblica Vida"                                                                                                           |
| `wordmark`          | string                                     | "BÍBLICA VIDA"                                                                                                           |
| `tagline`           | string                                     | "Igreja Protestante Evangélica · São Paulo"                                                                              |
| `endereco`          | string                                     | Endereço completo (ver `docs/dados-igreja.md`)                                                                           |
| `mapsEmbedUrl`      | string                                     | URL de embed sem API key                                                                                                 |
| `mapsDirectionsUrl` | string                                     | URL de rota                                                                                                              |
| `instagramUrl`      | string                                     | obrigatório                                                                                                              |
| `youtubeUrl`        | string                                     | obrigatório                                                                                                              |
| `facebookUrl`       | string \| undefined                        | **ausente de propósito** — quando `undefined`, o `SocialLinks` não renderiza o ícone (nunca aponta para um link chutado) |
| `videosDestaque`    | array de `{ id: string; titulo?: string }` | `titulo` opcional — quando ausente, o card de vídeo mostra só a miniatura, sem `<h3>` vazio nem texto inventado          |

## Relacionamentos

Nenhuma entidade se relaciona com outra via referência (sem foreign keys) — cada coleção é
independente e renderizada na sua própria página/secção. `grupo` em `Pastor` só controla
agrupamento visual, não gera uma relação com outra entidade.
