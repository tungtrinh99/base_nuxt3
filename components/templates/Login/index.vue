<template>
  <div>
    login
    <label for="username"></label>
    <input
      id="email"
      v-model="formData.email"
      type="text"
      name="email"
      placeholder="e.g. example@email.com"
      @change="v$.email.$touch"
    />
    <div v-if="v$.email.$error || v$.email.$invalid">
      <div v-if="v$.email.required.$invalid" class="error">{{ v$.email.required.$message }}</div>
      <div v-if="v$.email.email.$invalid" class="error">{{ v$.email.email.$message }}</div>
    </div>
    <label for="password"></label>
    <input
      id="password"
      v-model="formData.password"
      type="password"
      name="password"
      placeholder="e.g. example@email.com"
      @change="v$.password.$touch"
    />
    <div v-if="v$.password.$error || v$.password.$invalid">
      <div v-if="v$.password.required.$invalid" class="error">Password required</div>
      <div v-if="v$.password.minLength.$invalid" class="error">{{ v$.password.required.$message }}</div>
      <div v-if="v$.password.maxLength.$invalid" class="error">{{ v$.password.maxLength.$message }}</div>
      <div v-if="v$.password.minLength.$invalid" class="error">{{ v$.password.minLength.$message }}</div>
    </div>
    <button class="border border-solid border bg-indigo-500 px-1 py-2 rounded" @click="submitForm">submit</button>
  </div>
</template>
<script lang="ts" setup>
setPageLayout("auth")
import { ref, watch, reactive, computed } from "vue"
import { useAuth } from "@/composables/useAuth"
import { setPageLayout } from "nuxt/app"
import { useRouter, useRoute } from "vue-router"
import { required, minLength, helpers, email, maxLength } from "@vuelidate/validators"
import { useVuelidate } from "@vuelidate/core"
import { SignInInput } from "~/types/user"

const router = useRouter()
const route = useRoute()
const { signIn } = useAuth()
const redirect = ref<string>("")
const formData = reactive<SignInInput>({
  email: "",
  password: "",
})

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage("The email field is required", required),
      email: helpers.withMessage("Invalid email format", email),
    },
    password: {
      required: helpers.withMessage("The password field is required", required),
      minLength: helpers.withMessage("Min length", minLength(8)),
      maxLength: helpers.withMessage("Max length", maxLength(20)),
    },
  }
})
const v$ = useVuelidate(rules, formData)

watch(
  route,
  async (to) => {
    redirect.value = (to?.query?.redirect || "/") as string
  },
  { immediate: true },
)

const submitForm = () => {
  v$.value.$validate()
  if (!v$.value.$error) {
    login()
  }
}

const login = async () => {
  await signIn(formData)
  router.push({
    path: redirect.value ?? "/",
  })
}
</script>
<style lang="scss" scoped></style>
