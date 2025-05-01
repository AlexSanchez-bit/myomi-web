<template>
  <div class="min-h-screen my-8">
    <div class="w-full">
      <ProductFilters :default_filter="filter_list" :filters="default_filter">
      </ProductFilters>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductFilters from "@/components/Product/ProductFilters.vue";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { Filter } from "@/utils/entities/Filter";
import { FilterMatchMode } from "@primevue/core/api";

const route = useRoute();

const filter_list = ref<Filter[]>([]);

const default_filter = ref({
  sort: "recent",
  concerns: [],
  materials: [],
  classes: [],
});

if (route.query?.concern) {
  default_filter.value.concerns = [parseInt(route.query?.concern as string)];
  filter_list.value.push({
    field: "product_concern.concern_id",
    matchMode: FilterMatchMode.IN,
    value: [parseInt(route.query.concern as string)],
  });
}
if (route.query?.materials) {
  default_filter.value.materials = [parseInt(route.query?.material as string)];
}
if (route.query?.category) {
  default_filter.value.classes = [parseInt(route.query?.category as string)];
}
</script>
