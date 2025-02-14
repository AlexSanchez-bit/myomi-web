<template>
  <div
    class="transition-all duration-1000 ease-in-out"
    ref="container"
    :class="{
      'translate-y-full opacity-0': !onscreen,
      'translate-y-0 opacity-100': onscreen,
    }"
  >
    <slot name="header"> </slot>

    <!-- Carrusel de carga con Skeleton (mientras loading es true) -->
    <swiper-container
      v-if="loading"
      :loop="true"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      }"
      slides-per-view="auto"
      :breakpoints="skeletonBreakpoints"
      space-between="10"
      :pagination="{
        clickable: true,
        dynamicBullets: true,
      }"
      :navigation="true"
      class="min-h-80 w-full max-w-screen"
    >
      <swiper-slide v-for="(item, index) in skeletonItems" :key="index">
        <div class="relative w-80 h-[26rem]">
          <Skeleton class="!h-80" />
        </div>
      </swiper-slide>
      <!-- Botones de navegación y paginación para el carrusel de carga -->
      <swiper-button-prev slot="button-prev"></swiper-button-prev>
      <swiper-button-next slot="button-next"></swiper-button-next>
      <swiper-pagination slot="pagination"></swiper-pagination>
    </swiper-container>

    <!-- Carrusel de promociones (cuando loading es false) -->
    <swiper-container
      v-if="!loading"
      :loop="true"
      :autoplay="{
        delay: promotions.length > 3 ? 2000 : 10000,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      }"
      :breakpoints="promotionBreakpoints"
      space-between="10"
      :pagination="{
        clickable: true,
        dynamicBullets: true,
      }"
      :navigation="true"
      class="w-full max-w-screen"
    >
      <swiper-slide v-for="(promotion, index) in promotions" :key="index">
        <div class="relative w-80 h-[26rem]">
          <slot name="item" :item="promotion"> </slot>
        </div>
      </swiper-slide>
      <!-- Botones de navegación y paginación para el carrusel de promociones -->
      <swiper-button-prev slot="button-prev"></swiper-button-prev>
      <swiper-button-next slot="button-next"></swiper-button-next>
      <swiper-pagination slot="pagination"></swiper-pagination>
    </swiper-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Pagination } from "@/utils/entities/Pagination";
import Skeleton from "primevue/skeleton";
import { ListerService } from "@/utils/service/TableService";
import type { Sorter } from "@/utils/entities/Sorters";
import { Filter } from "@/utils/entities/Filter";
const loading = ref(true);
const onscreen = ref(false);
const container = ref<HTMLElement | null>(null);

const props = defineProps<{
  service: ListerService<any>;
  filters: Filter[];
  orders: Sorter[];
}>();

const service = props.service;

// Variable para almacenar las promociones
const promotions = ref<any[]>([]);

onMounted(async () => {
  // Usa IntersectionObserver para detectar cuando el contenedor está en pantalla
  const observer = new IntersectionObserver(() => (onscreen.value = true), {
    root: null, // viewport completo
    threshold: 0.8,
  });
  if (container.value) {
    observer.observe(container.value);
  }

  // Llamada al servicio para obtener las promociones
  loading.value = true;
  const resp = await service.getAll(
    [...props.filters], // Filtros si fueran necesarios
    new Pagination(0, 10),
    [...props.orders],
  );
  loading.value = false;
  if (resp) {
    promotions.value = resp;
  }
});

// Define los breakpoints para el carrusel de promociones (y el de Skeleton, usamos los mismos)
const promotionBreakpoints = {
  576: { slidesPerView: 1, spaceBetween: 10 },
  768: { slidesPerView: 2, spaceBetween: 10 },
  1000: { slidesPerView: 3, spaceBetween: 10 },
  1400: { slidesPerView: 5, spaceBetween: 10 },
  1600: { slidesPerView: 6, spaceBetween: 10 },
  2000: { slidesPerView: 6, spaceBetween: 10 },
};
const skeletonBreakpoints = promotionBreakpoints;

// Para el carrusel de Skeleton usamos un array estático de 6 elementos
const skeletonItems = [1, 2, 3, 4, 5, 6];
</script>

<style scoped>
/* Estilos personalizados para Swiper Element */
swiper-container {
  width: 100%;
}
swiper-slide {
  width: auto !important;
}
</style>
