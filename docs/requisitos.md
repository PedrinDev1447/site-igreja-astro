# Requisitos

## Funcionais

- RF01 Home/landing com hero, chamada para os cultos e links rápidos
- RF02 "Quem somos" (missão, visão, crenças) — texto vem de `src/content/`
- RF03 "Os pastores": cards com foto, nome, cargo e mini-bio
- RF04 "Nossa história": linha do tempo
- RF05 Agenda: Google Calendar público embutido + lista de cultos (dias/horários)
- RF06 Localização: Google Maps embutido + endereço + botão "Como chegar"
- RF07 YouTube: último vídeo/transmissão e link para o canal (embed sob demanda)
- RF08 Redes sociais: links no header/footer e na página de contato — apenas Instagram e YouTube por enquanto; Facebook decidido fora de escopo
- RF09 Contato (links WhatsApp/e-mail; sem formulário com backend) — **suspenso**: sem WhatsApp/e-mail definidos, a página fica fora do v1 ou reduzida a endereço + redes sociais (ver `docs/dados-igreja.md`)

## Não funcionais

- RNF01 Custo zero (hospedagem, ferramentas, serviços)
- RNF02 Mobile-first e responsivo
- RNF03 Lighthouse ≥ 90 (performance, acessibilidade, boas práticas, SEO)
- RNF04 SEO básico (title, description, Open Graph, sitemap, robots)
- RNF05 Conteúdo editável por arquivo, sem código
- RNF06 LGPD: embeds do YouTube em modo privacidade avançada; sem cookies de rastreamento; sem analytics pago
- RNF07 Português do Brasil

## Fora de escopo (por ora)

Doações online, login, painel admin, blog, transmissão ao vivo própria, seção de Ministérios, link de Facebook, formulário/canal de contato (WhatsApp/e-mail).
