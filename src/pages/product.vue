<template>
  <div class="min-h-screen my-8">
    <div class="w-full">
      <ProductFilters :default_filter="{}" :filters="{ sort: 'recent' }">
      </ProductFilters>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductFilters from "@/components/Product/ProductFilters.vue";
</script>
