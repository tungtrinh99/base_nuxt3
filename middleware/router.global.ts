import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app"

export default defineNuxtRouteMiddleware((to, from) => {
  // const auth = useState('auth')

  // if (!auth.value.isAuthenticated) {
  //   return navigateTo('/login')
  // }
  if (to.path == '/') {
    return navigateTo('/dashboard')
  }
})
