# Dados da igreja

Fonte única de verdade para os dados reais da Igreja Bíblica Vida. A maior parte vem do projeto
anterior em Next.js (`C:\Projetos-Pessoais\VidaChurch\site-igreja`), que já está em produção com
conteúdo real; nada aqui é inventado. O que ainda falta está marcado `TODO:`. Quando a implementação
do site Astro começar, estes dados migram para `src/config/site.ts` e `src/content/`.

## Identificação

- Nome: Bíblica Vida
- Wordmark: BÍBLICA VIDA
- Tagline usada no projeto anterior: "Igreja Protestante · São Paulo"
- Denominação: Protestante Evangélica
- Cidade: São Paulo - SP

## Endereço

R. Santa Eudóxia, 562 - Parque Peruche, São Paulo - SP, 02533-010

Link de rota (Google Maps, para o botão "Como chegar"):
`https://www.google.com/maps/dir/?api=1&destination=R.+Santa+Eud%C3%B3xia,+562+-+Parque+Peruche,+S%C3%A3o+Paulo+-+SP`

Link de embed sem API key (para o `MapEmbed`, RF06) — confirmado funcionando no projeto anterior:
`https://www.google.com/maps?q=R.+Santa+Eud%C3%B3xia,+562+-+Parque+Peruche,+S%C3%A3o+Paulo+-+SP&z=16&output=embed`

## Redes sociais e YouTube

- Instagram: https://www.instagram.com/biblicavidasp
- YouTube: https://www.youtube.com/@BiblicaVidaSP
- Facebook: **decidido não incluir por enquanto** — não é falta de dado, é decisão de escopo. Não renderizar o ícone/link de Facebook no `SocialLinks`.

## Dias e horários de culto (RF05)

- Domingo — 10h às 11h30
- Quarta-feira — 20h às 21h30
- Última sexta-feira do mês — 20h às 21h30

## Pastores e pastoras (RF03)

**Decisão confirmada:** a página não faz nenhuma referência a casamento/cônjuge entre pastores — cada pessoa aparece só com nome, papel, foto e mini-bio. O layout separa as pastoras de um lado e os pastores do outro (ver `docs/arquitetura.md` para as cores de destaque por grupo).

**Decisão confirmada:** as mini-bios ficam como Lorem ipsum por enquanto (placeholder intencional, não um erro a corrigir) — trocar por texto real é tarefa futura, não bloqueia a implementação atual.

### Pastoras

| Nome           | Papel       | Foto                                                                                                        |
| -------------- | ----------- | ----------------------------------------------------------------------------------------------------------- |
| Pra. Giovana   | Ensino      | `src/assets/pastores/PraGiovana.png`                                                                        |
| Pra. Silvana   | Famílias    | `src/assets/pastores/PrSilvana.png` (nome do arquivo sem o "a" de "Pra", mantido igual ao projeto anterior) |
| Pra. Rosângela | Intercessão | `src/assets/pastores/PraRosangela.png`                                                                      |

### Pastores

| Nome                     | Papel          | Foto                                |
| ------------------------ | -------------- | ----------------------------------- |
| Pr. Kiko (Luiz Henrique) | Pastor titular | `src/assets/pastores/PrKiko.png`    |
| Pr. Geneval              | Missões        | `src/assets/pastores/PrGeneval.png` |
| Pr. Alfredo              | Discipulado    | `src/assets/pastores/PrAlfredo.png` |
| Pr. Marcos               | Jovens         | `src/assets/pastores/PrMarcos.png`  |

Nota interna (não vai pro site): Pr. Marcos é casado, mas a esposa não é pastora — por isso não entra nesta lista nem em nenhuma outra referência de casamento no site.

## Vídeos em destaque (RF07)

IDs reais do canal, usados no projeto anterior. Títulos ficam para depois (decisão: não bloquear a implementação por isso agora):

- `w2z-jLIwJkQ` — TODO: título, resolver depois
- `4IFtWz4omoE` — TODO: título, resolver depois
- `J8SKo6blfsk` — TODO: título, resolver depois

## Identidade visual

Decisão confirmada: seguir o tratamento preto & branco / ivory-charcoal do projeto anterior, não a paleta azul do logo original. Detalhes completos (tokens de cor, tipografia, cores de destaque por gênero na página de pastores) estão em `docs/arquitetura.md`.

## Ministérios

**Decidido: não incluir seção de Ministérios por enquanto.** Fica fora do escopo atual (RF01–RF09 continuam sem essa página).

## Contato (RF09)

**Decidido: não incluir WhatsApp/e-mail por enquanto.** RF09 fica suspenso — a página de Contato pode cair fora do v1 ou ficar só com redes sociais + endereço, ver nota em `docs/requisitos.md`.
