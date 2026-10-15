import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Fotos reais dos pastores vivem em src/assets/pastores/ (não em public/) para que o helper
// image() consiga otimizar via astro:assets — ver progress.md.
const pastores = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/pastores" }),
  schema: ({ image }) =>
    z.object({
      nome: z.string(),
      papel: z.string(),
      grupo: z.enum(["pastora", "pastor"]),
      foto: image(),
    }),
});

const historia = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/historia" }),
  schema: z.object({
    data: z.string(),
    titulo: z.string(),
    descricao: z.string(),
  }),
});

const cultos = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/cultos" }),
  schema: z.object({
    dia: z.string(),
    horaInicio: z.string().regex(/^\d{2}:\d{2}$/),
    horaFim: z.string().regex(/^\d{2}:\d{2}$/),
  }),
});

export const collections = { pastores, historia, cultos };
