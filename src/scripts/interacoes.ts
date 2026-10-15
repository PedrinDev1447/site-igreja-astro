import { iniciarEmpilha } from "./empilha";
import { proximoCulto, relogioSaoPaulo, type Culto } from "./proximo-culto";

// Interações da landing: menu mobile, link ativo, entrada ao rolar, luz do hero e copiar endereço.
// Sem dependências; tudo degrada bem sem JS (o conteúdo só fica escondido se a classe .js existir).

// Menu mobile
const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu-principal");

function setMenu(open: boolean) {
  if (!toggle || !menu) return;
  menu.classList.toggle("hidden", !open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.querySelector(".menu-open")?.classList.toggle("hidden", open);
  toggle.querySelector(".menu-close")?.classList.toggle("hidden", !open);
}

toggle?.addEventListener("click", () =>
  setMenu(toggle.getAttribute("aria-expanded") !== "true"),
);
menu
  ?.querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape" || toggle?.getAttribute("aria-expanded") !== "true")
    return;
  setMenu(false);
  toggle.focus();
});
// Ao ampliar para o menu horizontal (lg), zera o estado do botão.
matchMedia("(min-width: 64rem)").addEventListener("change", (e) => {
  if (e.matches) setMenu(false);
});

// Seções empilhadas ao rolar, link ativo do menu e âncoras (ver empilha.ts)
iniciarEmpilha();

// Entrada suave ao rolar
const reveal = new IntersectionObserver(
  (entries) => {
    for (const en of entries) {
      if (!en.isIntersecting) continue;
      en.target.classList.add("is-visible");
      reveal.unobserve(en.target);
    }
  },
  { threshold: 0.12 },
);
document.querySelectorAll("[data-reveal]").forEach((el) => reveal.observe(el));

// Luz que segue o ponteiro no hero (só mouse, e só sem preferência por menos movimento)
const hero = document.querySelector<HTMLElement>("[data-hero]");
if (
  hero &&
  matchMedia("(pointer: fine)").matches &&
  !matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  hero.addEventListener("pointermove", (e) => {
    const r = hero.getBoundingClientRect();
    hero.style.setProperty("--mx", `${e.clientX - r.left}px`);
    hero.style.setProperty("--my", `${e.clientY - r.top}px`);
  });
}

// Copiar endereço: botão só com ícone; troca o ícone de copiar por um check por 2 s e anuncia o
// resultado num texto oculto (role="status") para leitores de tela.
document
  .querySelectorAll<HTMLButtonElement>("[data-copy-address]")
  .forEach((btn) => {
    const iconeCopiar = btn.querySelector<SVGElement>("[data-icon-copy]");
    const iconeOk = btn.querySelector<SVGElement>("[data-icon-ok]");
    const status =
      btn.parentElement?.querySelector("[data-copy-status]") ?? new Text();
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copyAddress ?? "");
        status.textContent = "Endereço copiado";
        iconeCopiar?.setAttribute("hidden", "");
        iconeOk?.removeAttribute("hidden");
      } catch {
        status.textContent = "Não foi possível copiar";
      }
      setTimeout(() => {
        status.textContent = "";
        iconeOk?.setAttribute("hidden", "");
        iconeCopiar?.removeAttribute("hidden");
      }, 2000);
    });
  });

// Cards de "Quem somos": o clique abre um <dialog> em tela cheia. A abertura "cresce" a partir do
// próprio card (clip-path animado do retângulo do card até a tela toda) e o fechamento volta para
// ele. O <dialog> nativo cuida de foco, Esc e leitor de tela; aqui só animamos e travamos a rolagem.
document.querySelectorAll<HTMLElement>("[data-card-abrir]").forEach((card) => {
  const botao = card.querySelector<HTMLButtonElement>("[data-abrir]");
  const dialogo = card.querySelector<HTMLDialogElement>("[data-tela-cheia]");
  const fechar = card.querySelector<HTMLButtonElement>("[data-fechar]");
  if (!botao || !dialogo || !fechar) return;

  const conteudo = dialogo.querySelector<HTMLElement>(".tela-cheia__conteudo");
  if (!conteudo) return;
  // Só o MOVIMENTO é lento; a reação ao clique é imediata (a curva já começa andando, sem
  // arrancada suave que pareceria atraso).
  const DURACAO_ABRIR = 800;
  const DURACAO_FECHAR = 600;
  const CURVA = "cubic-bezier(0.4, 0, 0.2, 1)";
  let fechando = false;

  const semMovimento = () =>
    matchMedia("(prefers-reduced-motion: reduce)").matches;
  const tela = "inset(0px 0px 0px 0px round 0px)";
  const recorteDoCard = () => {
    const r = card.getBoundingClientRect();
    return `inset(${r.top}px ${innerWidth - r.right}px ${innerHeight - r.bottom}px ${r.left}px round 8px)`;
  };

  // As animações de fechar usam fill: forwards (seguram o último quadro até o diálogo fechar).
  // Se ficassem penduradas, ao reabrir o mesmo card elas voltariam a valer quando a animação de
  // abrir terminasse e recortariam o diálogo no tamanho do card, com o texto invisível.
  function limparAnimacoes() {
    dialogo!.getAnimations({ subtree: true }).forEach((a) => a.cancel());
  }

  function abrir() {
    limparAnimacoes();
    fechando = false;
    botao!.focus({ preventScroll: true }); // o foco volta para o botão quando o diálogo fecha
    document.documentElement.classList.add("travado");
    dialogo!.showModal();
    if (!semMovimento()) {
      // O card cresce a partir do próprio lugar...
      dialogo!.animate([{ clipPath: recorteDoCard() }, { clipPath: tela }], {
        duration: DURACAO_ABRIR,
        easing: CURVA,
      });
      // ...e o texto aparece só depois que ele já cresceu, subindo um pouco.
      conteudo!.animate(
        [
          { opacity: 0, transform: "translateY(24px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        {
          duration: 500,
          delay: DURACAO_ABRIR * 0.4,
          easing: "ease-out",
          fill: "backwards",
        },
      );
    }
  }

  function sair() {
    if (!dialogo!.open || fechando) return;
    fechando = true;
    const terminar = () => {
      dialogo!.close(); // primeiro fecha (some da tela) e só depois solta as animações
      limparAnimacoes();
      document.documentElement.classList.remove("travado");
      fechando = false;
    };
    if (semMovimento()) return terminar();
    // O texto some logo no começo; o card encolhe de volta para o lugar de onde saiu.
    conteudo!.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 250,
      easing: "ease-in",
      fill: "forwards",
    });
    dialogo!
      .animate([{ clipPath: tela }, { clipPath: recorteDoCard() }], {
        duration: DURACAO_FECHAR,
        easing: CURVA,
        fill: "forwards",
      })
      .finished.then(terminar, terminar);
  }

  card.addEventListener("click", (e) => {
    if (dialogo.contains(e.target as Node)) return; // cliques dentro do diálogo não reabrem
    abrir();
  });
  fechar.addEventListener("click", sair);
  // Esc: em vez de fechar de uma vez, fecha com a animação de volta.
  dialogo.addEventListener("cancel", (e) => {
    e.preventDefault();
    sair();
  });
});

// Próximo culto: calcula ao abrir e recalcula a cada 30 s (e ao voltar para a aba),
// para o "Acontecendo agora" aparecer na hora certa mesmo com a página já aberta.
const cartao = document.querySelector<HTMLElement>("[data-proximo-culto]");
if (cartao) {
  const cultos: Culto[] = JSON.parse(cartao.dataset.proximoCulto ?? "[]");
  const bloco = cartao.querySelector<HTMLElement>("[data-proximo-bloco]");
  const texto = cartao.querySelector<HTMLElement>("[data-proximo-texto]");
  const detalhe = cartao.querySelector<HTMLElement>("[data-proximo-detalhe]");

  const atualizar = () => {
    const proximo = proximoCulto(cultos, relogioSaoPaulo(new Date()));
    if (!proximo || !bloco || !texto || !detalhe) return;
    // Só escreve se mudou: o texto é aria-live e não deve ser reanunciado à toa.
    if (texto.textContent !== proximo.texto) texto.textContent = proximo.texto;
    if (detalhe.textContent !== proximo.detalhe)
      detalhe.textContent = proximo.detalhe;
    bloco.classList.remove("invisible");
    bloco.removeAttribute("aria-hidden");
  };

  atualizar();
  setInterval(atualizar, 30000);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) atualizar();
  });
}
