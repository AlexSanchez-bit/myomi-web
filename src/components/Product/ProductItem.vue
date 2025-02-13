<template>
  <div
    class="border rounded w-full p-2 h-full flex flex-col justify-between relative pb-3"
  >
    <!-- Imagen y badge -->
    <router-link :to="{ name: 'product.details', params: { id: product?.id } }">
      <picture class="relative w-full cursor-pointer overflow-hidden">
        <img
          :src="
            product?.images.length > 0 ? product?.images[0] : '/noimage.webp'
          "
          :alt="product?.name"
          class="rounded object-cover mx-auto max-h-60 w-full"
          @error="(e) => (e.target.src = '/noimage.webp')"
        />
        <!-- Badge posicionado en la esquina superior izquierda si el producto es reciente -->
        <Badge
          v-if="isRecent"
          :value="$t('recently_added')"
          severity="success"
          class="absolute top-2 left-2"
        />
      </picture>
    </router-link>

    <!-- Información del producto -->
    <div class="flex flex-col justify-between pt-3 h-full">
      <div>
        <div class="mb-2 font-bold text-lg text-zinc-700 line-clamp-2">
          {{ product?.name }}
        </div>
        <div class="font-medium text-sm line-clamp-2 text-gray-600">
          {{ product?.short_description }}
        </div>
      </div>
      <div class="flex justify-between items-center">
        <div
          class="mt-0 font-semibold text-xl flex text-zinc-800 flex-row items-center gap-2"
        >
          <img class="w-5 h-5" :src="selected_currency?.icon" alt="" />
          {{ (product?.price * selected_currency?.change_value).toFixed(2) }}
          {{ selected_currency?.name }}
        </div>
        <span>
          <!-- <Button icon="pi pi-heart" severity="secondary" outlined /> -->
          <CartAddButton :product_id="product?.id" />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import type { IProduct } from "@/interfaces/IProduct";
import CartAddButton from "../Cart/CartAddButton.vue";

// Importa componentes de PrimeVue (si no están registrados globalmente)
import Badge from "primevue/badge";
import Button from "primevue/button";

import { useCurrencyStore } from "@/stores/currency";
import { storeToRefs } from "pinia";
const { selected_currency } = storeToRefs(useCurrencyStore());

// Definir la interfaz para la moneda seleccionada
interface Currency {
  name: string;
  icon: string;
  change_value: number;
}

const props = defineProps<{
  product: IProduct;
}>();

// Computed para determinar si el producto fue creado hace menos de 1 día
const isRecent = computed(() => {
  const createdAt = new Date(props.product?.created_at);
  const now = new Date();
  const diff = now.getTime() - createdAt.getTime();
  // 86,400,000 ms equivalen a 1 día
  return diff <= 86400000;
});
</script>

<style scoped>
/* Puedes agregar estilos adicionales aquí si es necesario */
</style>
