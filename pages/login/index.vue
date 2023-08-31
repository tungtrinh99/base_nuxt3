<template>
  <el-form
    ref="formRef"
    :model="dynamicValidateForm"
    label-width="120px"
    class="login-form"
    :rules="rules"
  >
    <el-form-item
      prop="username"
      label="Username"
    >
      <el-input v-model="dynamicValidateForm.username"/>
    </el-form-item>
    <el-form-item
      prop="password"
      label="Password"
      type="password"
    >
      <el-input v-model="dynamicValidateForm.password"/>
    </el-form-item>
    <el-form-item>
      <el-checkbox label="Keep" v-model="isSaveLogin"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue"
import {useAuth} from "@/composables/useAuth"
import {useAuthStore} from "~/stores/auth"
import type {FormInstance, FormRules} from 'element-plus'

interface RuleForm {
  username: string
  password: string
}

const {useLogin} = useAuth()
const {
  setToken,
  setUser
} = useAuthStore()

const formRef = ref<FormInstance>()
const dynamicValidateForm = reactive<RuleForm>({
  password: '',
  username: '',
})
const rules = reactive<FormRules<RuleForm>>({
  username: [
    {
      required: true,
      message: 'Please input username',
      trigger: 'blur',
    }
  ],
  password: [
    {
      required: true,
      message: 'Please input password',
      trigger: 'blur',
    },
  ],
})
const isSaveLogin = ref<boolean>(false)
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      login()
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const login = async () => {
  try {
    const data = await useLogin(dynamicValidateForm)
    if (data) {
      let token
      if (isSaveLogin.value) {
        token = useCookie("token", {maxAge: 60 * 60 * 24 * 7, secure: true}) // 7 days
      } else {
        token = useCookie("token", {secure: true})
      }
      token.value = data.value.token
      setToken(token.value)
      const user = Object.assign({}, {
        id: data.value.id,
        username: data.value.username,
        email: data.value.email,
        firstName: data.value.firstName,
        lastName: data.value.lastName,
        avatarUrl: data.value.image
      })
      setUser(user)
    }
  } catch (e) {
    console.log(e)
  }
}

</script>
<style lang="scss" scoped>
.login-form {
  width: 300px;
  margin: 100px auto;
}
</style>
