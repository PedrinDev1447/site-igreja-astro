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

// Link ativo conforme a seção visível
const links = document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]");
const secoes = Array.from(links)
  .map((l) => document.querySelector(l.getAttribute("href") ?? ""))
  .filter((s): s is Element => s !== null);
const spy = new IntersectionObserver(
  (entries) => {
    for (const en of entries) {
      if (!en.isIntersecting) continue;
      links.forEach((l) =>
        l.setAttribute(
          "aria-current",
          l.getAttribute("href") === `#${en.target.id}` ? "location" : "false",
        ),
      );
    }
  },
  { rootMargin: "-45% 0px -50% 0px" },
);
secoes.forEach((s) => spy.observe(s));

// No fim da página a última seção é curta demais para cruzar a faixa central: marca-a à mão.
addEventListener(
  "scroll",
  () => {
    if (innerHeight + scrollY < document.body.scrollHeight - 4) return;
    const ultimo = links[links.length - 1];
    links.forEach((l) =>
      l.setAttribute("aria-current", l === ultimo ? "location" : "false"),
    );
  },
  { passive: true },
);

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
