// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["nuxt-typed-router"],
  css: ["./app/assets/css/main.css"],
  runtimeConfig: {
    public: {
      pocketbaseUrl: "http://127.0.0.1:8091", //NUXT_PUBLIC_POCKETBASE_URL
    },
  },
  vite: {
    plugins: [
      // @ts-ignore
      tailwindcss(),
    ],
  },
});
