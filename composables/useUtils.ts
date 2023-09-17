import { useCookie } from "nuxt/app"

export const NUXT_TOKEN_KEY = "x-renchan-app-access-token"
export function getToken() {
  return useCookie(NUXT_TOKEN_KEY)
}

export function setToken(token: string) {
  const cookie = useCookie(NUXT_TOKEN_KEY)
  cookie.value = token
}

export function setTokenExpires(token: string) {
  const cookie = useCookie(NUXT_TOKEN_KEY, { secure: true, maxAge: 60 * 60 * 24 * 30 })
  cookie.value = token
}

export function removeToken() {
  const cookie = useCookie(NUXT_TOKEN_KEY)
  cookie.value = ""
}
