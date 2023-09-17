import { defineStore } from "pinia"
import { ref } from "vue"
import { Admin } from "@/types/user"

export const useAuthStore = defineStore("auth", () => {
  const user = ref<Admin | null>(null)
  const setUser = (newUser: Admin | null) => {
    user.value = newUser
  }

  return {
    user,
    setUser,
  }
})
