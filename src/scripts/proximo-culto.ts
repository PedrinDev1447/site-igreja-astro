// Cálculo do "próximo culto". Funções puras (sem DOM), para poderem ser testadas com qualquer data.
// O fuso é sempre o de São Paulo, não o do aparelho de quem visita.

export type Culto = {
  dia: string;
  /** "semanal:<0-6>" (0 = domingo) ou "ultima-sexta". */
  regra: string;
  /** "HH:MM" */
  inicio: string;
  /** "HH:MM" */
  fim: string;
  /** Ex.: "20h" ou "20h30" */
  inicioTexto: string;
};

export type Relogio = {
  ano: number;
  mes: number; // 1-12
  dia: number;
  hora: number;
  minuto: number;
};

export type Proximo = { texto: string; detalhe: string };

const DIA_MS = 86400000;

function horaTexto(hhmm: string): string {
  const [h, m] = hhmm.split(":");
  return m === "00" ? `${Number(h)}h` : `${Number(h)}h${m}`;
}

/** Hora de parede de São Paulo para um instante qualquer. */
export function relogioSaoPaulo(instante: Date): Relogio {
  const partes = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(instante);
  const n = (t: string) => Number(partes.find((p) => p.type === t)?.value);
  return {
    ano: n("year"),
    mes: n("month"),
    dia: n("day"),
    hora: n("hour"),
    minuto: n("minute"),
  };
}

function minutosEmMs(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return (h * 60 + m) * 60000;
}

function ocorre(regra: string, dia: Date): boolean {
  const semana = dia.getUTCDay();
  if (regra.startsWith("semanal:")) return semana === Number(regra.slice(8));
  if (regra === "ultima-sexta") {
    const ultimoDiaDoMes = new Date(
      Date.UTC(dia.getUTCFullYear(), dia.getUTCMonth() + 1, 0),
    ).getUTCDate();
    return semana === 5 && dia.getUTCDate() + 7 > ultimoDiaDoMes;
  }
  return false;
}

export function proximoCulto(
  cultos: Culto[],
  relogio: Relogio,
): Proximo | null {
  // Datas em "UTC de parede": só servem para comparar e somar dias, sem mexer em fuso.
  const agora = Date.UTC(
    relogio.ano,
    relogio.mes - 1,
    relogio.dia,
    relogio.hora,
    relogio.minuto,
  );
  const hoje = Date.UTC(relogio.ano, relogio.mes - 1, relogio.dia);

  for (let offset = 0; offset <= 62; offset++) {
    const dia = new Date(hoje + offset * DIA_MS);
    const candidatos = cultos
      .filter((c) => ocorre(c.regra, dia))
      .map((culto) => ({
        culto,
        inicio: dia.getTime() + minutosEmMs(culto.inicio),
        fim: dia.getTime() + minutosEmMs(culto.fim),
      }))
      .filter((o) => o.fim > agora)
      .sort((a, b) => a.inicio - b.inicio);
    if (candidatos.length === 0) continue;

    const { culto, inicio } = candidatos[0];
    const diaSemana = new Intl.DateTimeFormat("pt-BR", {
      timeZone: "UTC",
      weekday: "long",
    }).format(dia);
    const data = new Intl.DateTimeFormat("pt-BR", {
      timeZone: "UTC",
      day: "numeric",
      month: "long",
    }).format(dia);
    const quando = offset === 0 ? "Hoje" : offset === 1 ? "Amanhã" : diaSemana;
    return {
      texto:
        inicio <= agora
          ? `Acontecendo agora · ${culto.inicioTexto}`
          : `${quando}, ${culto.inicioTexto}`,
      detalhe: `${offset <= 1 ? `${diaSemana}, ${data}` : data} · até as ${horaTexto(culto.fim)}`,
    };
  }
  return null;
}
