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

const limite = Number(minimo);
let falhou = false;
for (const [id, categoria] of Object.entries(relatorio.categories)) {
  const nota = Math.round((categoria.score ?? 0) * 100);
  const ok = nota >= limite;
  console.log(`${ok ? "OK    " : "FALHOU"} ${id}: ${nota} (mínimo ${limite})`);
  if (!ok) falhou = true;
}
process.exit(falhou ? 1 : 0);
