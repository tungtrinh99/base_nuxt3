// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    strict: true,
  },
  app: {
    head: {
      title: "Base Nuxt.js Apollo AdminLTE3",
      htmlAttrs: {
        lang: "ja",
      },
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
        },
        {
          charset: "utf-8",
        },
      ],
      link: [], //fontsize
      script: [],
    },
  },
  modules: ["@pinia/nuxt", "@nuxtjs/apollo"],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      "defineStore", // import { defineStore } from 'pinia'
      ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  plugins: ["@/plugins/i18n", "@/plugins/apollo", "@/plugins/vuelidate"],
  ssr: false,
  css: [
    "@fortawesome/fontawesome-svg-core/styles.css",
    "admin-lte/dist/css/adminlte.min.css",
    "@/assets/scss/main.scss",
  ],
  runtimeConfig: {
    public: {
      NUXT_APP_I18N_LOCALE: process.env.NUXT_APP_I18N_LOCALE,
      NUXT_APP_I18N_FALLBACK_LOCALE: process.env.NUXT_APP_I18N_FALLBACK_LOCALE,
      NUXT_API_URL: process.env.NUXT_API_URL,
      NUXT_TOKEN_KEY: process.env.NUXT_TOKEN_KEY,
    },
  },
  vite: {
    server: {
      hmr: {
        protocol: "ws",
        host: "localhost",
      },
    },
  },
  apollo: {
    autoImports: true,
    authType: "Bearer",
    authHeader: "Authorization",
    tokenStorage: "cookie",
    proxyCookies: true,
    clients: {
      default: {
        httpEndpoint: process.env.NUXT_API_URL || "",
      },
    },
  }
})
