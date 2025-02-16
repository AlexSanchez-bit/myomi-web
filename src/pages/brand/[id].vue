<template>
  <div class="min-h-screen">
    <div class="w-full">
      <div class="h-60 mb-4 w-full relative">
        <Img
          :src="brand?.layer_image ?? ''"
          imageClass="w-full h-60 object-contain"
        >
        </Img>
        <a
          :href="brand.brand_link"
          v-if="brand && brand.brand_link"
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        >
          <button class="bg-zinc-900 text-white rounded-full px-4 py-2 text-sm">
            {{ $t("see_more") }}
          </button>
        </a>
      </div>

      <ProductFilters
        :filters="{ sort: 'recent' }"
        :default_filter="brandFilter"
      >
      </ProductFilters>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import Breadcrumb from "primevue/breadcrumb";

const route = useRoute();
import { onMounted, ref } from "vue";
import { FilterMatchMode } from "@primevue/core/api";
import { useToastStorage } from "@/stores/ToasterStorage";
import LazyLoadScroll from "@/components/LazyLoadScroll.vue";
import { Skeleton } from "primevue";
import ProductItem from "@/components/Product/ProductItem.vue";
import ProductFilters from "@/components/Product/ProductFilters.vue";
import { useBrandService } from "@/composables/Shop/Brand/useBrandService";
import type { IBrand } from "@/services/Shops/Brand/Brand.service";
const home = ref({
  icon: "pi pi-home",
});
const items = ref([]);

const service = useBrandService();
const brand = ref<IBrand | null>(null);

const toast = useToastStorage();

const brandFilter = {
  field: "brand",
  matchMode: FilterMatchMode.IN,
  value: [route.params.id],
};

onMounted(async () => {
  brand.value = await service.getDetails(parseInt(route.params.id as string));

  if (!brand.value) {
    toast.notify("danger", "Ocurrio un error", "No se encontro la marca", 4000);
  }
});
</script>
