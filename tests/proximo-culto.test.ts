// Rodar com: npm test  (node:test nativo, sem dependências)
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  proximoCulto,
  relogioSaoPaulo,
  type Culto,
} from "../src/scripts/proximo-culto.ts";

const CULTOS: Culto[] = [
  {
    dia: "Domingo",
    regra: "semanal:0",
    inicio: "10:00",
    fim: "11:30",
    inicioTexto: "10h",
  },
  {
    dia: "Quarta-feira",
    regra: "semanal:3",
    inicio: "20:00",
    fim: "21:30",
    inicioTexto: "20h",
  },
  {
    dia: "Última sexta-feira do mês",
    regra: "ultima-sexta",
    inicio: "20:00",
    fim: "21:30",
    inicioTexto: "20h",
  },
];

// Atalho: relógio de São Paulo (mês 1-12). Em 2026-10-14 é quarta-feira.
const em = (ano: number, mes: number, dia: number, hora: number, minuto = 0) =>
  proximoCulto(CULTOS, { ano, mes, dia, hora, minuto });

test("durante o culto: acontecendo agora", () => {
  assert.equal(em(2026, 10, 14, 20, 57)?.texto, "Acontecendo agora · 20h");
  assert.equal(em(2026, 10, 14, 20, 0)?.texto, "Acontecendo agora · 20h"); // início exato
  assert.equal(em(2026, 10, 18, 10, 30)?.texto, "Acontecendo agora · 10h");
});

test("no fim exato do culto já passa para o seguinte", () => {
  const r = em(2026, 10, 14, 21, 30);
  assert.equal(r?.texto, "domingo, 10h");
  assert.equal(r?.detalhe, "18 de outubro");
});

test("no dia, antes do culto: hoje", () => {
  assert.equal(em(2026, 10, 18, 8, 0)?.texto, "Hoje, 10h");
  assert.equal(em(2026, 10, 14, 0, 5)?.texto, "Hoje, 20h");
});

test("na véspera: amanhã", () => {
  const r = em(2026, 10, 17, 15, 0);
  assert.equal(r?.texto, "Amanhã, 10h");
  assert.equal(r?.detalhe, "domingo, 18 de outubro");
  assert.equal(em(2026, 10, 13, 10, 0)?.texto, "Amanhã, 20h");
});

test("dias antes: nome do dia e data", () => {
  const r = em(2026, 10, 15, 9, 0); // quinta -> domingo
  assert.equal(r?.texto, "domingo, 10h");
  assert.equal(r?.detalhe, "18 de outubro");
});

test("última sexta do mês entra, as outras sextas não", () => {
  // Outubro/2026: sextas 2, 9, 16, 23, 30. Só a 30 é a última.
  assert.equal(em(2026, 10, 29, 22, 0)?.texto, "Amanhã, 20h");
  assert.equal(em(2026, 10, 30, 20, 30)?.texto, "Acontecendo agora · 20h");
  assert.equal(em(2026, 10, 23, 12, 0)?.texto, "domingo, 10h"); // sexta 23 não conta
});

test("virada de mês: novembro/2026, última sexta é 27", () => {
  assert.equal(em(2026, 11, 26, 22, 0)?.texto, "Amanhã, 20h");
  assert.equal(em(2026, 11, 20, 12, 0)?.texto, "domingo, 10h"); // sexta 20 não conta
});

test("fevereiro de ano não bissexto: última sexta de fev/2027 é 26", () => {
  const r = proximoCulto(
    CULTOS.filter((c) => c.regra === "ultima-sexta"),
    {
      ano: 2027,
      mes: 2,
      dia: 20,
      hora: 12,
      minuto: 0,
    },
  );
  assert.equal(r?.detalhe, "26 de fevereiro");
});

test("virada de ano", () => {
  // 2026-12-23 (quarta) 21h40 -> sexta 25/12 é a última sexta de dezembro.
  const natal = em(2026, 12, 23, 21, 40);
  assert.equal(natal?.texto, "sexta-feira, 20h");
  assert.equal(natal?.detalhe, "25 de dezembro");
  // 2026-12-31 (quinta) 22h -> 01/01/2027 não é última sexta; vai para domingo 03/01.
  const ano = em(2026, 12, 31, 22, 0);
  assert.equal(ano?.texto, "domingo, 10h");
  assert.equal(ano?.detalhe, "3 de janeiro");
});

test("fuso: usa a hora de São Paulo, não a do aparelho", () => {
  // 23:57 UTC = 20:57 em São Paulo (UTC-3)
  assert.deepEqual(relogioSaoPaulo(new Date("2026-10-14T23:57:00Z")), {
    ano: 2026,
    mes: 10,
    dia: 14,
    hora: 20,
    minuto: 57,
  });
  // 02:30 UTC do dia 15 ainda é dia 14 em São Paulo
  const r = relogioSaoPaulo(new Date("2026-10-15T02:30:00Z"));
  assert.equal(r.dia, 14);
  assert.equal(r.hora, 23);
});

test("sem cultos cadastrados: null", () => {
  assert.equal(
    proximoCulto([], { ano: 2026, mes: 10, dia: 14, hora: 12, minuto: 0 }),
    null,
  );
});
