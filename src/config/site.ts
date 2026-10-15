export type VideoDestaque = {
  id: string;
  titulo?: string;
};

export const SITE = {
  nome: "Bíblica Vida",
  wordmark: "BÍBLICA VIDA",
  tagline: "Igreja Protestante Evangélica · São Paulo",
  endereco: "R. Santa Eudóxia, 562 - Parque Peruche, São Paulo - SP, 02533-010",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=R.+Santa+Eud%C3%B3xia,+562+-+Parque+Peruche,+S%C3%A3o+Paulo+-+SP&z=16&output=embed",
  mapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=R.+Santa+Eud%C3%B3xia,+562+-+Parque+Peruche,+S%C3%A3o+Paulo+-+SP",
  // Rota no Waze, montada a partir do mesmo endereço (abre o aplicativo ou o site do Waze).
  wazeUrl:
    "https://waze.com/ul?q=R.%20Santa%20Eud%C3%B3xia%2C%20562%20-%20Parque%20Peruche%2C%20S%C3%A3o%20Paulo%20-%20SP&navigate=yes",
  instagramUrl: "https://www.instagram.com/biblicavidasp",
  youtubeUrl: "https://www.youtube.com/@BiblicaVidaSP",
  // facebookUrl deliberadamente ausente — ver docs/dados-igreja.md (decisão de escopo, não falta
  // de dado). SocialLinks.astro não deve renderizar nada para Facebook enquanto este campo não
  // existir.
} as const;

export type Site = typeof SITE & { facebookUrl?: string };

// IDs reais do canal (docs/dados-igreja.md). Títulos ainda não definidos — ver TODO lá.
export const VIDEOS_DESTAQUE: VideoDestaque[] = [
  { id: "w2z-jLIwJkQ" },
  { id: "4IFtWz4omoE" },
  { id: "J8SKo6blfsk" },
];
