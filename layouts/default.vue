<template>
  <div class="app d-flex flex-column">
    <Navbar />
    <Sidebar />
    <NuxtPage />
    <Footer />
  </div>
</template>
<script lang="ts" setup>
import Sidebar from "@/components/organisms/Sidebar/index.vue"
import Footer from "@/components/organisms/Footer/index.vue"
import Navbar from "@/components/organisms/Navbar/index.vue"
</script>
