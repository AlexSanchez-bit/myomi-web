<template>
  <div class="min-h-screen">
    <FirstSlide />
    <ProductSlide />
    <MainCategories />
  </div>
</template>

<script lang="ts" setup>
import MainCategories from "@/components/Categories/MainCategories.vue";
import FirstSlide from "@/components/FirstSlide.vue";
import ProductSlide from "@/components/Product/ProductSlide.vue";
</script>
