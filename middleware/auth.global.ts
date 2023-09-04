import { defineNuxtRouteMiddleware, navigateTo, useCookie } from "nuxt/app"
import { useAuthStore } from "@/stores/auth"

const publicPaths = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password'
]

const setUser = (newUser: any) => {
  useAuthStore().setUser(newUser)
}

export default defineNuxtRouteMiddleware((to) => {
  const hasToken = useCookie("token")

  if (!hasToken.value) {
    if (publicPaths.includes(to.path)) {
      return
    } else {
      if (to.path == '/') {
        return navigateTo('/login')
      } else return navigateTo({
        path: `/login`
      })
    }
  } else {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    setUser(user)
    if (to.path == '/login') {
      return navigateTo('/')
    }
    return
  }
})
