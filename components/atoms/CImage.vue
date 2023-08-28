<template>
  <img
    :src="props.src"
    :alt="props.alt"
    :class="[
      'image',
      props.className
    ]"
  >
</template>
<script lang="ts" setup>
import {defineProps} from 'vue'
const props = defineProps({
  src: {
    type: String,
    default: ""
  },
  alt: {
    type: String,
    default: ""
  },
  className: {
    type: String,
    default: ""
  }
})
</script>
<style lang="scss" scoped>
.image {
  border-radius: 10px;
  height: 252px;
}
</style>
