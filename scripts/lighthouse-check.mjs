// Falha (exit 1) se a nota (mediana das medições) de alguma categoria do Lighthouse ficar abaixo do mínimo.
// Várias medições + mediana evitam falso alarme: máquinas compartilhadas de CI oscilam bastante.
// Uso: node scripts/lighthouse-check.mjs <nota-minima> <relatorio1.json> [relatorio2.json ...]
import { readFileSync } from "node:fs";

const [minimo, ...arquivos] = process.argv.slice(2);
if (!minimo || arquivos.length === 0) {
  console.error(
    "Uso: node scripts/lighthouse-check.mjs <nota-minima> <relatorio.json> [...]",
  );
  process.exit(2);
}

const relatorios = arquivos.map((a) => JSON.parse(readFileSync(a, "utf8")));
const comErro = relatorios.find((r) => r.runtimeError);
if (comErro) {
  console.error(
    `Lighthouse não conseguiu medir a página: ${comErro.runtimeError.message}`,
  );
  process.exit(1);
}

const mediana = (valores) => {
  const ordenados = [...valores].sort((a, b) => a - b);
  const meio = Math.floor(ordenados.length / 2);
  return ordenados.length % 2
    ? ordenados[meio]
    : Math.round((ordenados[meio - 1] + ordenados[meio]) / 2);
};
const nota = (r, id) => Math.round((r.categories[id].score ?? 0) * 100);

// Métricas-chave de cada medição, para entender uma nota baixa no log do CI.
relatorios.forEach((r, i) => {
  const m = (id) => r.audits[id]?.displayValue ?? "n/d";
  console.log(
    `Medição ${i + 1}: performance ${nota(r, "performance")} · FCP ${m("first-contentful-paint")} · LCP ${m("largest-contentful-paint")} · TBT ${m("total-blocking-time")} · CLS ${m("cumulative-layout-shift")}`,
  );
});

const limite = Number(minimo);
let falhou = false;
for (const id of Object.keys(relatorios[0].categories)) {
  const final = mediana(relatorios.map((r) => nota(r, id)));
  const ok = final >= limite;
  console.log(
    `${ok ? "OK    " : "FALHOU"} ${id}: ${final} (mediana de ${relatorios.length}, mínimo ${limite})`,
  );
  if (!ok) falhou = true;
}
process.exit(falhou ? 1 : 0);
