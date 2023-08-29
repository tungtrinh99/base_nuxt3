export const useAuthStore = defineStore('auth', () => {
  // ref() become state properties
  // computed() become getters
  // function() become actions
  const token = ref('token')
  const user = ref({})
  const isLoggedIn = computed(() => !!token.value)

  return {
    token,
    user,
    isLoggedIn
  }
})
