<template>
  <div class="container">
    <div>
      <p class="name">{{ data?.title }}</p>
      <p class="brand">{{ data?.brand }}</p>
      <p class="price" style="color: red">
        {{ useNumberWithCommas(data?.price) }}VND
      </p>
      <img :src="data?.images[0]" alt="" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue"
import { useRoute } from "vue-router"
import { useProduct } from "~/composables/useProducts"
import { useNumberWithCommas } from "@/composables/useUtils"

const route = useRoute()
const { getProductDetail } = useProduct()

const data = ref<any | undefined>()
//api
const fetchData = async () => {
  try {
    const id = Number(route.params.id)
    const response = await getProductDetail(id)
    if (response) {
      data.value = response.value
    }
  } catch (error: any) {
    console.log(error)
  }
}
fetchData()
</script>
<style lang="scss" scoped></style>
