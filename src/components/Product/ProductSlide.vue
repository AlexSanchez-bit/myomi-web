<template>
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
        <router-link to="/category">
          {{ $t("see_all") }}
        </router-link>
      </p>
    </template>

    <template #item="{ item }">
      <ProductItem class="w-32" :product="item" />
    </template>
  </Sliders>
</template>

<script setup lang="ts">
import { useProductService } from "@/composables/Shop/Product/useProductService";
import Sliders from "../Sliders.vue";
import ProductItem from "./ProductItem.vue";
const service = useProductService();
</script>

<style scoped></style>
