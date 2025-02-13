<template>
  <div class="relative w-full overflow-hidden">
    <swiper-container speed="500" loop="true" css-mode="true">
      <swiper-slide v-for="(item, index) in items" :key="index">
        <Img
          :src="item.icon"
          class="w-[90px] h-[90px] mx-[10px]"
          :style="{ transform: `translateX(${offset}px)` }"
        />
      </swiper-slide>
    </swiper-container>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useBrandService } from "@/composables/Shop/Brand/useBrandService";
import { Pagination } from "@/utils/entities/Pagination";

const service = useBrandService();
const items = ref([]);
const offset = ref(0);
const elementWidth = 100; // Ancho de cada elemento
const speed = 1000 / 60; // Velocidad de animación (más FPS = más fluido)
const step = 2; // Cantidad de píxeles por frame

const lastInterval = ref(null);
const total_squares = ref(0);

onMounted(async () => {
  const data = await service.getAll([], new Pagination(0, 100), []);
  initInterval(data);
  window.onresize = () => {
    initInterval(data);
  };
});

function initInterval(data) {
  const screenWidth = window.innerWidth;
  total_squares.value = Math.floor(screenWidth / elementWidth) + 10;
  if (!data) {
  } else {
    if (data.length < total_squares.value) {
      const aux = new Array(total_squares.value);
      for (let i = 0; i < total_squares; i++) {
        aux[i] = data[i % data.length];
      }
      items.value = aux;
    } else {
      items.value = data;
    }

    if (lastInterval.value) {
      clearInterval(lastInterval.value);
    }

    lastInterval.value = setInterval(() => {
      offset.value -= step;
      if (Math.abs(offset.value) >= elementWidth * 3) {
        offset.value = 0;
        items.value.push(items.value.shift()); // Mueve el primer elemento al final
      }
    }, speed);
  }
}
</script>

<style scoped>
.transition-transform {
  transition: transform 0.2s linear;
}
</style>
