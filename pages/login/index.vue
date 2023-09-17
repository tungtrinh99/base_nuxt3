<template>
  <Login />
</template>
<script lang="ts" setup>
import Login from "@/components/templates/Login/index.vue"
import { setPageLayout } from "nuxt/app"
setPageLayout("auth")
</script>
