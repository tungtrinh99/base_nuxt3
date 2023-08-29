import { createI18n } from "vue-i18n"
import ja from "@/locales/ja.json"
import en from "@/locales/en.json"

export default defineNuxtPlugin(({ vueApp }) => {
  const env = useRuntimeConfig()
  const locale = localStorage.getItem("locale") || env.public.NUXT_APP_I18N_LOCALE
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    localePath: "locales",
    locale: locale,
    fallbackLocale: "ja",
    messages: {
      ja,
      en
    }
  })

  vueApp.use(i18n)
})
