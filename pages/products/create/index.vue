<template>
  <div>
    <h1>Add products</h1>
    <el-form ref="ruleFormRef" :model="data" :rules="rules">
      <el-form-item prop="title">
        <el-input v-model="data.title" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          Create
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue"
import type { FormInstance, FormRules } from "element-plus"
import { useProduct } from "@/composables/useProducts"
import { ElMessage } from "element-plus"

interface RuleForm {
  title: string;
}

const { postProducts } = useProduct()
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules<RuleForm>>({
  title: [{ required: true, message: "Please input title", trigger: "blur" }],
})
const data = reactive<RuleForm>({
  title: ""
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
        createProduct()
    } else {
      console.log('error submit!', fields)
    }
  })
}

//api 
const createProduct = async () => {
    try {
        const body = {
            title: data.title
        }
        const response = await postProducts(body)
        if (response) {
            ElMessage.success("Created product")
        }
    } catch(error) {
        console.log(error)
    }
}
</script>
<style lang="scss" scoped></style>
