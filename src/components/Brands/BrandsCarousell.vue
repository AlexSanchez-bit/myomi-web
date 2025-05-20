<template>
  <div class="brand-carousel">
    <div class="carousel-track">
      <router-link v-for="(item, index) in duplicatedItems" :key="index" :to="`/brand/${item.id}`"
        class="carousel-item relative">
        <img :src="item.icon" class="image-mask " :alt="`Brand ${item.id}`" />
        <!-- :style="`filter:${getColorFilter(index)}`" /> -->


      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useBrandService } from '@/composables/Shop/Brand/useBrandService';
import { Pagination } from '@/utils/entities/Pagination';
import { FilterMatchMode } from "@primevue/core/api";
const items = ref([]);
const service = useBrandService();

onMounted(async () => {
  const data = await service.getAll([
    {
      field: 'name',
      matchMode: FilterMatchMode.NOT_EQUALS,
      value: 'Otras'
    }
  ], new Pagination(0, 1000), []);
  console.log(data)
  if (data) {
    // Si hay muy pocos, duplicamos internamente también
    const iconWidth = 110;
    const requiredCount = Math.ceil(window.innerWidth / iconWidth) + 2;
    let finalData = [];
    if (data.length < requiredCount) {
      while (finalData.length < requiredCount) {
        finalData.push(...data);
      }
      finalData = finalData.slice(0, requiredCount);
    } else {
      finalData = [...data, ...data];
    }
    items.value = finalData;
  }
});

const duplicatedItems = computed(() => items.value.concat(items.value));

// Genera colores aleatorios
function getRandomColor() {
  const r = Math.floor(Math.random() * 255) + 24;
  const g = Math.floor(Math.random() * 255) + 24;
  const b = Math.floor(Math.random() * 255) + 24;
  return `rgb(${r}, ${b}, ${g})`;
}

// Este truco usa filtros CSS para recolorear imágenes negras
const colorCache = new Map();
function getColorFilter(index) {
  if (!colorCache.has(index)) {
    const color = getRandomColor();
    colorCache.set(index, `brightness(${Math.floor(Math.random() * 3) + 1}) saturate(${Math.floor(Math.random() * 5) + 1}%) sepia(${Math.floor(Math.random() * 5) + 1}%) hue-rotate(${Math.floor(Math.random() * 360)}deg)`);
  }
  return colorCache.get(index);
}


</script>

<style scoped>
.brand-carousel {
  overflow: hidden;
  width: 100%;
  position: relative;
}

.carousel-track {
  display: flex;
  animation: scroll 30s linear infinite;
  will-change: transform;
}

.carousel-item {
  flex: 0 0 auto;
  margin: 0 10px;
}

.carousel-item img {
  width: 90px;
  height: 90px;
  object-fit: contain;
}

@media (max-width: 575px) {
  .carousel-item img {
    width: 97px;
    height: 97px;
  }
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-100%);
  }
}
</style>
