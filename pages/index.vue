<template>
    <div>index</div>
    <div>{{ data }}</div>
</template>
<script lang="ts" setup>
import { useApi } from "@/composables/useApi"
const data = ref()
// api
const fetchData = async () => {
    try {
        const response = await useApi("/echo/get/json")
        if (response) {
            data.value = response.data
        }
    } catch (error) {
        console.log(error)
    }
}
fetchData()
</script>
