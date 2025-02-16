<template>
  <div class="min-h-screen">
    <FirstSlide :images="carousellImages" />
    <BrandsCarousell />
    <Sliders
      class="my-3"
      :service="service"
      :filters="[]"
      :orders="[
        {
          field: 'sales',
          order: 0,
        },
      ]"
    >
      <template #header>
        <h6
          class="text-4xl text-center mt-6 decoration-black text-black uppercase"
        >
          {{ $t("best_sellers") }}
        </h6>
        <p
          class="underline text-center mb-6 text-zinc-800 decoration-black mt-4 cursor-pointer uppercase"
        >
          <router-link to="/product">
            {{ $t("see_all") }}
          </router-link>
        </p>
      </template>

      <template #item="{ item }">
        <ProductItem class="!w-80 !mx-auto !h-[26rem]" :product="item" />
      </template>
    </Sliders>
    <div class="overflow-hidden w-full h-[50dvh] my-12">
      <Img :src="promotionalImage" imageClass="w-full h-[50dvh] object-cover" />
    </div>
    <Sliders
      class="my-3"
      :service="service"
      :filters="[
        {
          field: 'created_at',
          matchMode: date_after,
          value: threeDaysAgo(),
        },
      ]"
      :orders="[
        {
          field: 'created_at',
          order: 0,
        },
      ]"
    >
      <template #header>
        <h6
          class="text-4xl text-center mt-6 decoration-black text-black uppercase"
        >
          {{ $t("recently_added") }}
        </h6>
        <p
          class="underline text-center mb-6 text-zinc-800 decoration-black mt-4 cursor-pointer uppercase"
        >
          <router-link to="/category">
            {{ $t("see_all") }}
          </router-link>
        </p>
      </template>

      <template #item="{ item }">
        <ProductItem class="!w-80 !mx-auto !h-[26rem]" :product="item" />
      </template>
    </Sliders>
    <MainCategories />
  </div>
</template>

<script lang="ts" setup>
import BrandsCarousell from "@/components/Brands/BrandsCarousell.vue";
import MainCategories from "@/components/Categories/MainCategories.vue";
import FirstSlide from "@/components/FirstSlide.vue";
import { useGeneralConfigService } from "@/composables/GeneralConfigs/useGeneralConfigService";
import { onMounted, ref } from "vue";

import { Pagination } from "@/utils/entities/Pagination";
import { useProductService } from "@/composables/Shop/Product/useProductService";
import ProductItem from "@/components/Product/ProductItem.vue";
import Sliders from "@/components/Sliders.vue";
const service = useProductService();

const gcService = useGeneralConfigService();
import { FilterMatchMode } from "@primevue/core/api";

const date_after = FilterMatchMode.DATE_AFTER;

const carousellImages = ref([]);
const promotionalImage = ref("");

onMounted(async () => {
  const resp = await gcService.getAll([], new Pagination(0, 1), []);
  if (resp.length > 0) {
    carousellImages.value = resp[0].carousell_images;
    promotionalImage.value = resp[0].promotional_image;
  }
});
function threeDaysAgo() {
  const today = new Date();
  const threeDaysAgo = new Date(today);

  // Resta tres días a la fecha actual
  threeDaysAgo.setMonth((today.getMonth() - 1) % 12);

  return threeDaysAgo;
}
</script>
