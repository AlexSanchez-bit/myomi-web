<template>
  <div class="relative w-full overflow-hidden">
    <!-- Se usan bindings para las propiedades que no sean strings -->
    <swiper-container
      v-if="items.length > 0"
      ref="swiperEl"
      :loop="true"
      :speed="2000"
      :autoplay="{
        delay: 0,
        disableOnInteraction: false,
      }"
      slides-per-view="auto"
      spaceBetween="10"
      :allow-touch-move="false"
      class="mySwiper"
    >
      <swiper-slide v-for="(item, index) in items" :key="index">
        <router-link :to="`/brand/${item.id}`">
          <img
            :src="item.icon"
            class="w-[90px] h-[90px] mx-[10px]"
            alt="Icono"
          />
        </router-link>
      </swiper-slide>
    </swiper-container>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";

import { useBrandService } from "@/composables/Shop/Brand/useBrandService";
import { Pagination } from "@/utils/entities/Pagination";

const items = ref([]);
const swiperEl = ref(null);
const service = useBrandService();

onMounted(async () => {
  const data = await service.getAll([], new Pagination(0, 100), []);
  if (data) {
    // Calcula cuántos iconos se necesitan para cubrir la pantalla (90px + 20px de margen)
    const iconWidth = 110;
    const requiredCount = Math.ceil(window.innerWidth / iconWidth) + 2;
    let finalData = [];

    if (data.length < requiredCount * 2) {
      while (finalData.length < requiredCount) {
        finalData.push(...data);
      }
      finalData = finalData.slice(0, requiredCount);
    } else {
      finalData = data;
    }
    items.value = finalData;
  }
  await nextTick();
  console.log(swiperEl.value.swiper);
});
</script>

<style scoped>
.mySwiper {
  /* Agrega estilos adicionales si lo requieres */
}

/* Asegura que cada slide se dimensione de forma automática */
swiper-slide {
  width: auto !important;
}
</style>
