<template>
  <div class="flex flex-col gap-2 items-center py-3 px-20">
    <h6
      class="text-4xl my-6 underline decoration-darkblue text-darkblue underline-offset-8"
    >
      {{ $t("best_sellers") }}
    </h6>
    <Carousel
      v-show="loading"
      :value="[1, 2, 3, 4, 5, 6]"
      :responsiveOptions="responsiveOptions"
      circular
      :autoplayInterval="3000"
      :numVisible="3"
      :numScroll="1"
      class="min-h-80 w-full"
    >
      <template #item>
        <Skeleton class="!w-11/12 !h-80" style=""></Skeleton>
      </template>
    </Carousel>

    <Carousel
      v-show="!loading"
      :value="popular_products"
      :responsiveOptions="responsiveOptions"
      circular
      :autoplayInterval="popular_products.length > 3 ? 3000 : null"
      :numVisible="3"
      :numScroll="1"
      class="min-h-80"
    >
      <template #item="slotProps">
        <div
          class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4"
        >
          <div class="mb-4">
            <div class="relative mx-auto">
              <img
                :src="
                  slotProps.data.images.length > 0
                    ? slotProps.data.images[0]
                    : '/noimage.webp'
                "
                :alt="slotProps.data.name"
                class="w-full rounded h-80 object-contain"
                @error="(e) => (e.target.src = '/noimage.webp')"
              />
            </div>
          </div>
          <div class="mb-4 font-bold text-lg">{{ slotProps.data.name }}</div>
          <div class="mb-4 font-medium text-sm line-clamp-2 text-gray-600">
            {{ slotProps.data.short_description }}
          </div>
          <div class="flex justify-between items-center">
            <div
              class="mt-0 font-semibold text-xl flex flex-row items-center gap-2"
            >
              <img class="w-5 h-5" :src="selected_currency.icon" alt="" />
              {{ slotProps.data.price * selected_currency.change_value }}
              {{ selected_currency.name }}
            </div>
            <span>
              <Button icon="pi pi-heart" severity="secondary" outlined />
              <Button icon="pi pi-shopping-cart" class="ml-2" />
            </span>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>
<script setup lang="ts">
import { useProductService } from "@/composables/Shop/Product/useProductService";
import type { IProduct } from "@/services/Shops/Products/Products.service";
import { useCurrencyStore } from "@/stores/currency";
import { Pagination } from "@/utils/entities/Pagination";
import { storeToRefs } from "pinia";
import Carousel from "primevue/carousel";
import Skeleton from "primevue/skeleton";
import { onMounted, ref } from "vue";

const loading = ref(true);

const { selected_currency } = storeToRefs(useCurrencyStore());

const service = useProductService();
const popular_products = ref<IProduct[]>([]);

onMounted(async () => {
  loading.value = true;
  const resp = await service.getAll([], new Pagination(0, 10), [
    {
      field: "sales",
      order: 0,
    },
  ]);
  loading.value = false;
  if (resp) {
    popular_products.value = resp;
  }
});

const responsiveOptions = ref([
  {
    breakpoint: "1400px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 4,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
    numScroll: 1,
  },
]);
</script>

<style scoped>
.category img {
  transition: all 0.3s ease-in-out;
}
.category:hover img {
  scale: 1.1;
}
</style>
