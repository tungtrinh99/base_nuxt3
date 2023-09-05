<template>
  <el-card class="box-card">
    <div v-for="item in data" :key="item" class="text item" @click="$router.push(`products/${item.id}`)">
      {{ item.title }} <span style="color: red">{{ useNumberWithCommas(item.price) }}USD</span>
    </div>
  </el-card>
  <CButton
    :type="'primary'"
    @on-click="$router.push('products/create')"
  >
    Add products
  </CButton>
  <CPagination :total="pagination.total" :limit="pagination.limit"></CPagination>
</template>
<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue"
import { useProduct } from "@/composables/useProducts"
import { useRoute } from "vue-router"
import { useNumberWithCommas } from "~/composables/useUtils"
import CPagination from "~/components/atoms/CPagination.vue"
import CButton from "~/components/atoms/CButton.vue"

const { getListProduct } = useProduct()
const route = useRoute()
const data = ref<any[]>([])
const pagination = reactive<{ limit: number; total: number }>({
  limit: 10,
  total: 0,
})
const currentPage = computed(() => Number(route.query.page ?? 1))
watch(
    route,
    () => {
        fetchData()
    }
)
//api
const fetchData = async () => {
  try {
    const response = await getListProduct({
      limit: pagination.limit,
      skip: (currentPage.value - 1) * pagination.limit,
    })
    if (response) {
      data.value = response.value.products
      pagination.total = response.value.total
    }
  } catch (e: any) {
    console.log(e)
  }
}
fetchData()
</script>
<style lang="scss" scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
  cursor: pointer;
  &:hover {
    color: blue;
    opacity: 0.7;
  }
}

.box-card {
  width: 480px;
}
</style>
