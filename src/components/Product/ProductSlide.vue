<template>
  <div
    class="transition-all duration-1000 ease-in-out"
    ref="container"
    :class="{
      'translate-y-full opacity-0': !onscreen,
      'translate-y-0 opacity-100': onscreen,
    }"
  >
    <h6
      class="text-4xl text-center my-6 underline decoration-darkblue text-darkblue underline-offset-8"
    >
      {{ $t("best_sellers") }}
    </h6>
    <!-- Carrusel de carga con Skeleton -->
    <Carousel
      v-show="loading"
      :value="[1, 2, 3, 4, 5, 6]"
      :responsiveOptions="responsiveOptions"
      circular
      :autoplayInterval="3000"
      :numVisible="3"
      :numScroll="1"
      class="min-h-80 w-full max-w-screen"
    >
      <template #item>
        <Skeleton class="!w-11/12 !h-80"></Skeleton>
      </template>
    </Carousel>

    <!-- Carrusel de promociones -->
    <Carousel
      v-show="!loading"
      :value="promotions"
      :responsiveOptions="responsiveOptions"
      circular
      :autoplayInterval="promotions.length > 3 ? 3000 : null"
      :numVisible="3"
      :numScroll="1"
      class="w-full max-w-screen"
    >
      <template #item="slotProps">
        <ProductItem :product="slotProps.data" />
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
import ProductItem from "./ProductItem.vue";

const loading = ref(true);
const onscreen = ref(false);
const container = ref();
const { selected_currency } = storeToRefs(useCurrencyStore());
const service = useProductService();

// Variable para las promociones
const promotions = ref<IProduct[]>([]);

onMounted(async () => {
  const observer = new IntersectionObserver(() => (onscreen.value = true), {
    root: null, // Usa el viewport completo como área de visualización
    threshold: 0.8, // Ejecuta el callback cuando el 10% del elemento esté en pantalla
  });

  // Comenzamos a observar el elemento
  if (container.value) {
    observer.observe(container.value);
  }

  loading.value = true;
  // Llamada al servicio ajustada para obtener solo promociones
  const resp = await service.getAll(
    [], // Ajusta el filtro según tu API
    new Pagination(0, 10),
    [
      {
        field: "sales",
        order: 0, //orden descendiente
      },
    ],
  );
  loading.value = false;
  if (resp) {
    promotions.value = resp;
  }
});

const responsiveOptions = ref([
  {
    breakpoint: "2000px", // pantallas grandes
    numVisible: 5,
    numScroll: 1,
  },
  {
    breakpoint: "1600px", // pantallas grandes
    numVisible: 4,
    numScroll: 1,
  },
  {
    breakpoint: "1400px", // pantallas grandes
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "768px", // pantallas medianas
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "576px", // pantallas pequeñas
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
