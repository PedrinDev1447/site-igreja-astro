// Seções da página (classe `.empilha`, nome que ficou de quando elas se empilhavam ao rolar; hoje
// rolam normalmente, uma depois da outra, sem sobreposição). Este script cuida de: medir a faixa do
// cabeçalho flutuante (--header-h), marcar o link ativo do menu e rolar suavemente até as âncoras.
//
// Posição da seção = soma das alturas das seções anteriores a partir do início do <main>.

const reduzMovimento = matchMedia("(prefers-reduced-motion: reduce)");

export function iniciarEmpilha() {
  const secoes = Array.from(document.querySelectorAll<HTMLElement>(".empilha"));
  if (secoes.length === 0) return;

  const principal = secoes[0].parentElement as HTMLElement;
  const raiz = document.documentElement;
  const links = document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]");

  let topos: number[] = [];

  // Altura "pequena" da tela (100svh), igual à do CSS (.tela). No celular, innerHeight muda quando a
  // barra do navegador aparece ou some, o que fazia as seções "pularem" ao rolar; 100svh não muda.
  const sonda = document.createElement("div");
  sonda.setAttribute("aria-hidden", "true");
  sonda.style.cssText =
    "position:fixed;top:0;left:0;width:0;height:100svh;visibility:hidden;pointer-events:none";
  document.body.appendChild(sonda);
  let altura = sonda.offsetHeight || innerHeight;

  function medir() {
    altura = sonda.offsetHeight || innerHeight;
    // Faixa de cima da tela ocupada pelo cabeçalho flutuante (distância do topo até a base dele +
    // um respiro): as telas descontam isso para centralizar o conteúdo.
    const cabecalho = document.querySelector("header");
    if (cabecalho)
      raiz.style.setProperty(
        "--header-h",
        `${Math.round(cabecalho.getBoundingClientRect().bottom) + 8}px`,
      );
    let y = principal.offsetTop;
    topos = secoes.map((s) => {
      const topo = y;
      y += s.offsetHeight;
      return topo;
    });
    atualizar();
  }

  function atualizar() {
    const y = scrollY;

    // Link ativo do menu: a última seção cujo topo já passou de 40% da altura da tela.
    let atual = -1;
    secoes.forEach((_, i) => {
      if (topos[i] <= y + altura * 0.4) atual = i;
    });
    const id = atual >= 0 ? secoes[atual].id : "";
    const noFim = innerHeight + y >= document.body.scrollHeight - 4;
    links.forEach((l, k) => {
      const ativo = noFim
        ? k === links.length - 1
        : l.getAttribute("href") === `#${id}`;
      l.setAttribute("aria-current", ativo ? "location" : "false");
    });
  }

  // Âncoras (#cultos etc.): rola até o topo da seção (suave, ou direto para quem prefere menos movimento).
  document.addEventListener("click", (e) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href")?.slice(1) ?? "";
    const i = secoes.findIndex((s) => s.id === id);
    if (i < 0) return;
    e.preventDefault();
    scrollTo({
      top: i === 0 ? 0 : topos[i],
      behavior: reduzMovimento.matches ? "auto" : "smooth",
    });
    history.replaceState(null, "", `#${id}`);
  });

  // O evento de rolagem já é agrupado por quadro pelo navegador; a conta é pequena (7 seções).
  addEventListener("scroll", atualizar, { passive: true });
  addEventListener("resize", medir);
  addEventListener("load", medir);
  document.fonts?.ready.then(medir);
  // Imagens, mapa e fontes mudam a altura das seções depois do primeiro desenho.
  new ResizeObserver(medir).observe(principal);

  medir();
}
