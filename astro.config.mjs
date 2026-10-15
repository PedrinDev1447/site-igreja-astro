// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // O site é uma landing page única; as rotas antigas levam à seção equivalente.
  redirects: {
    "/agenda": "/#localizacao",
    "/pastores": "/#pastores",
    "/quem-somos": "/#quem-somos",
    "/nossa-historia": "/#historia",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
