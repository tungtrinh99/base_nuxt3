<template>
  <div class="container">
    <el-row>
      <el-col
        v-for="item in products"
        :key="item.id"
        :span="8"
        :offset="2"
      >
        <el-card :body-style="{ padding: '0px' }">
          <img :src="item.images[0]" class="image" />
          <div style="padding: 14px">
            <span>{{ item.title }}</span>
            <div class="bottom">
              <p class="description">{{ item.description }}</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <CPagination
      :limit="pagination.limit"
      :total="pagination.total"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue"
import { useProducts } from "@/composables/useProduct"
import CPagination from "~/components/atoms/CPagination.vue"

const { useGetProducts } = useProducts()
const products = ref<any>([])
const pagination = reactive<{
  page: number
  limit: number
  total: number
}>({
  page: 1,
  limit: 10,
  total: 0,
})

const fetchData = async () => {
  try {
    const response = await useGetProducts()
    if (response) {
      products.value = response.value.products
      pagination.total = response.value.total
      pagination.limit = response.value.limit
    }
  } catch (e) {
    console.log(e)
  }
}
fetchData()
</script>
<style lang="scss" scoped>
.image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.description {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
}

.bottom {
  min-height: 52px;
  margin: 12px 0;
}
</style>