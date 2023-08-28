// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    strict: true
  },
  app: {
    head: {
      title: '',
      htmlAttrs: {
        lang: 'ja',
      },
      "meta": [
        {
          "name": "viewport",
          "content": "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        },
        {
          "charset": "utf-8"
        }
      ],
      "link": [], //fontsize
      "style": [],
      "script": [],
      "noscript": []
    }
  },
  modules: ['@element-plus/nuxt'],
  plugins: ['@/plugins/i18n'],
  ssr: false,
  css: ['@/assets/scss/index.scss'],
  runtimeConfig: {
    public: {
      NUXT_APP_I18N_LOCALE: process.env.NUXT_APP_I18N_LOCALE,
    }
  }
})
