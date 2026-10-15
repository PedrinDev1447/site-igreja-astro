// Seções que se empilham ao rolar: cada seção fica fixa (position: sticky) e a próxima sobe por cima.
// Também cuida do que depende da posição "natural" das seções: link ativo do menu, cliques nas
// âncoras e seções totalmente cobertas (inert, para não receberem foco nem clique por baixo).
//
// Posição natural = onde a seção estaria sem o sticky: soma das alturas das seções anteriores.
// (offsetTop/getBoundingClientRect de uma seção grudada mostram a posição grudada, não a natural.)

const reduzMovimento = matchMedia("(prefers-reduced-motion: reduce)");

export function iniciarEmpilha() {
  const secoes = Array.from(document.querySelectorAll<HTMLElement>(".empilha"));
  if (secoes.length === 0) return;

  const principal = secoes[0].parentElement as HTMLElement;
  const raiz = document.documentElement;
  const links = document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]");

  let topos: number[] = [];
  let altura = innerHeight;

  function medir() {
    altura = innerHeight;
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
    // Seção mais alta que a tela gruda pela base (o fim dela fica à vista até a próxima cobrir);
    // a mais baixa gruda no topo. O CSS só usa isto depois da classe "empilha-pronta".
    secoes.forEach((s) =>
      s.style.setProperty(
        "--empilha-top",
        `${Math.min(0, altura - s.offsetHeight)}px`,
      ),
    );
    raiz.classList.add("empilha-pronta");
    atualizar();
  }

  function atualizar() {
    const y = scrollY;
    const empilhando = !reduzMovimento.matches;

    secoes.forEach((s, i) => {
      const proximo = topos[i + 1];
      if (proximo === undefined) return;
      // 0 = a próxima ainda nem apareceu; 1 = a próxima já chegou ao topo da tela.
      const progresso = Math.min(1, Math.max(0, 1 - (proximo - y) / altura));
      s.style.setProperty("--cobertura", (progresso * 0.55).toFixed(3));
      // Totalmente coberta: sai da ordem de foco e dos cliques (senão o teclado entra "por baixo").
      // (Nunca deixa inert uma seção com um card em tela cheia aberto: o diálogo ficaria morto.)
      s.inert =
        empilhando && proximo - y <= 0 && !s.querySelector("dialog[open]");
    });

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

  // Âncoras (#cultos etc.): rola até a posição natural da seção; a seção grudada "já está no topo"
  // para o navegador e o clique não faria nada.
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
  reduzMovimento.addEventListener("change", medir);

  medir();
}
