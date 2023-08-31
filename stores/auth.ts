interface User {
  id: string,
  email: string,
  username: string,
  firstName: string,
  lastName: string,
  avatarUrl: string
}
export const useAuthStore = defineStore('auth', () => {
  // ref() become state properties
  // computed() become getters
  // function() become actions
  const token = ref<string>("")
  const user = ref<User | null>(null)
  const isLoggedIn = computed(() => !!token.value)

  const setToken = (newToken: string) => {
    token.value = newToken
  }

  const setUser = (newUser: User) => {
    user.value = newUser
  }

  const resetState = () => {
    token.value = ""
    user.value = null
  }

  return {
    token,
    user,
    isLoggedIn,
    setToken,
    setUser,
    resetState
  }
})
