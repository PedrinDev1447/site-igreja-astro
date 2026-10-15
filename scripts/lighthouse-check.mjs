// Falha (exit 1) se alguma categoria do relatório do Lighthouse ficar abaixo da nota mínima.
// Uso: node scripts/lighthouse-check.mjs <relatorio.json> [notaMinima=90]
import { readFileSync } from "node:fs";

const [arquivo, minimo = "90"] = process.argv.slice(2);
if (!arquivo) {
  console.error(
    "Uso: node scripts/lighthouse-check.mjs <relatorio.json> [notaMinima]",
  );
  process.exit(2);
}

const relatorio = JSON.parse(readFileSync(arquivo, "utf8"));
if (relatorio.runtimeError) {
  console.error(
    `Lighthouse não conseguiu medir a página: ${relatorio.runtimeError.message}`,
  );
  process.exit(1);
}

// Métricas-chave, para entender rapidamente uma nota baixa no log do CI.
const m = relatorio.audits;
const metrica = (id) => m[id]?.displayValue ?? "n/d";
console.log(
  `FCP ${metrica("first-contentful-paint")} · LCP ${metrica("largest-contentful-paint")} · TBT ${metrica("total-blocking-time")} · CLS ${metrica("cumulative-layout-shift")} · SI ${metrica("speed-index")}`,
);
const lcp =
  m["largest-contentful-paint-element"]?.details?.items?.[0]?.items?.[0]?.node
    ?.snippet;
if (lcp) console.log(`Elemento do LCP: ${lcp.slice(0, 120)}`);

const limite = Number(minimo);
let falhou = false;
for (const [id, categoria] of Object.entries(relatorio.categories)) {
  const nota = Math.round((categoria.score ?? 0) * 100);
  const ok = nota >= limite;
  console.log(`${ok ? "OK    " : "FALHOU"} ${id}: ${nota} (mínimo ${limite})`);
  if (!ok) falhou = true;
}
process.exit(falhou ? 1 : 0);
