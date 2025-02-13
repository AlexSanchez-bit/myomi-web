<template>
  <div class="min-h-screen">
    <FirstSlide />
    <BrandsCarousell />
    <ProductSlide />
    <MainCategories />
  </div>
</template>

<script lang="ts" setup>
import BrandsCarousell from "@/components/Brands/BrandsCarousell.vue";
import MainCategories from "@/components/Categories/MainCategories.vue";
import FirstSlide from "@/components/FirstSlide.vue";
import ProductSlide from "@/components/Product/ProductSlide.vue";
</script>
