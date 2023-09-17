<template>
  <div>
    login
    <label for="username"></label>
    <input id="email" v-model="email" type="text" />
    <label for="password"></label>
    <input id="password" v-model="password" type="text" />
    <button @click="submit">submit</button>
  </div>
</template>
<script lang="ts" setup>
setPageLayout("auth")
import { ref } from "vue"
import { useAuth } from "@/composables/useAuth"
import { setPageLayout } from "nuxt/app"
import { useRouter, useRoute } from "vue-router"

const router = useRouter()
const route = useRoute()
const { signIn } = useAuth()
const email = ref("")
const password = ref("")
const redirect = ref<string>("")

watch(
  route,
  async (to) => {
    redirect.value = (to?.query?.redirect || "/") as string
  },
  { immediate: true },
)

const submit = async () => {
  const request = {
    email: email.value,
    password: password.value,
  }
  await signIn(request)
  router.push({
    path: redirect.value ?? "/",
  })
}
</script>
