<template>
  <div class="min-h-screen my-8">
    <div class="w-full">
      <ProductFilters :default_filter="[]" :filters="default_filter">
      </ProductFilters>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductFilters from "@/components/Product/ProductFilters.vue";
import { useRoute } from "vue-router";
import { ref } from "vue";

const route = useRoute();

const default_filter = ref({
  sort: "recent",
  concerns: [],
  materials: [],
  classes: [],
});

if (route.query?.concern) {
  default_filter.value.concerns = [parseInt(route.query?.concern as string)];
}
if (route.query?.materials) {
  default_filter.value.materials = [parseInt(route.query?.material as string)];
}
if (route.query?.category) {
  default_filter.value.classes = [parseInt(route.query?.category as string)];
}
</script>
