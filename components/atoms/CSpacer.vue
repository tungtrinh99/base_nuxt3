<template>
  <div
    class="spacer"
    :style="{
      height: props.size + 'px',
      width: props.size + 'px'
    }"
  ></div>
</template>
<script lang="ts" setup>
import { defineProps } from "vue"
const props = defineProps({
  size: {
    type: Number,
    default: 0,
    required: true
  }
})
</script>
