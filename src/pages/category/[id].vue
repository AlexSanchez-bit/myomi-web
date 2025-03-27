<template>
  <div class="min-h-screen">
    <div class="w-full">
      <div class="flex flex-row items-center justify-center">
        <h6 class="text-4xl my-6 text-black underline-offset-8" ref="container">
          {{ $t(category?.name ?? "") }}
        </h6>
      </div>

      <ProductFilters
        :filters="{
          sort: 'recent',
          classes: [parseInt(route.params.id as string)],
        }"
        :default_filter="categoryFilter"
      >
        <div>
          <SubCategories
            :parent_category="parseInt(route.params.id as string)"
            class="w-full mb-3"
          />
        </div>
      </ProductFilters>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import Breadcrumb from "primevue/breadcrumb";

const route = useRoute();
import { onMounted, ref } from "vue";
import { useCategoryService } from "@/composables/Shop/Category/useCategoryService";
import { FilterMatchMode } from "@primevue/core/api";
import { Pagination } from "@/utils/entities/Pagination";
import type { ICategory } from "@/services/Shops/Categories/Category.service";
import { useToastStorage } from "@/stores/ToasterStorage";
import SubCategories from "@/components/Categories/SubCategories.vue";
import ProductFilters from "@/components/Product/ProductFilters.vue";

const service = useCategoryService();

const category = ref<ICategory | null>(null);
const sub_category = ref<ICategory[]>([]);

const toast = useToastStorage();

onMounted(async () => {
  category.value = await service.getDetails(
    parseInt(route.params.id as string),
  );

  if (!category.value) {
    toast.notify(
      "error",
      "Ocurrio un error",
      "No se encontro la categoría",
      4000,
    );
  }
  const resp = await service.getAll(
    [
      {
        field: "parent",
        matchMode: FilterMatchMode.EQUALS,
        value: route.params.id,
      },
    ],
    new Pagination(0, 100),
    [],
  );
  sub_category.value = resp;
});

const categoryFilter = [
  {
    field: "product_category.category_id",
    matchMode: FilterMatchMode.IN,
    value: [parseInt(route.params.id as string)],
  },
];
</script>
