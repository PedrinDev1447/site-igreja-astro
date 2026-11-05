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

## Nossa história (RF04)

Contada pelo dono do projeto em 2026-11-05 (mensagem + print de WhatsApp). Não temos os anos, por isso as etiquetas são texto livre; os textos publicados estão em `src/content/historia/`.

1. **O começo:** em uma sala, na casa do pastor Cláudio, onde as pessoas se reuniam para adorar a Deus e viver em comunhão.
2. **Depois:** à procura de um local para a igreja, chegaram à Avenida Imirim, São Paulo.
3. **Na pandemia:** mudança para a Dr. Zuquim, onde ficaram por bons anos.
4. **Hoje:** R. Santa Eudóxia, 562, vivendo em comunhão com os irmãos, louvando ao Senhor e fazendo trabalhos voluntários.

TODO: confirmar com o dono: (a) como apresentar o pastor Cláudio, que ele descreveu como "representante da igreja", mas não está na lista de pastores acima, onde o titular é o Pr. Kiko (o site cita só "pastor Cláudio", sem cargo); (b) os anos de cada marco; (c) o endereço completo da Dr. Zuquim, se quiser mostrar.

## Quem somos (RF02)

Texto original enviado pelo dono (print de WhatsApp):

> Nascemos do desejo de VIVER o Verdadeiro Evangelho de Cristo. Do desejo de ser um lugar de cura e comunhão, proveniente de um ambiente de adoração e entrega. Queremos ser um lugar de descanso, de paz e refrigério. Ser um lugar onde o amor é nossa essência, especialmente o amor pela Palavra de Deus e por um evangelho genuíno.

Esse texto foi dividido entre os cards Missão, Visão e Crenças em `src/content/quem-somos/`; a Missão também usa o trecho sobre comunhão, louvor e trabalhos voluntários da história acima.

TODO: o card Crenças fala do amor pela Palavra, mas não é uma declaração de fé completa; trocar se a igreja tiver uma.

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
