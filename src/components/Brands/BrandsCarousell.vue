<template>
  <div class="marquee">
    <div class="marquee__inner">
      <!-- Primera copia de la lista -->
      <router-link
        v-for="(item, index) in items"
        :key="'original-' + index"
        :to="`/brand/${item.id}`"
        class="marquee-item"
      >
        <img :src="item.icon" alt="Icono" />
      </router-link>
      <!-- Segunda copia para lograr el efecto continuo -->
      <router-link
        v-for="(item, index) in items"
        :key="'duplicate-' + index"
        :to="`/brand/${item.id}`"
        class="marquee-item"
      >
        <img :src="item.icon" alt="Icono" />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useBrandService } from "@/composables/Shop/Brand/useBrandService";
import { Pagination } from "@/utils/entities/Pagination";

const items = ref([]);
const service = useBrandService();

onMounted(async () => {
  const data = await service.getAll([], new Pagination(0, 100), []);
  if (data) {
    // Se asume que cada icono ocupa 90px de ancho + 20px de margen = 110px
    const iconWidth = 110;
    const requiredCount = Math.ceil(window.innerWidth / iconWidth) + 2;
    let finalData = [];
    // Si la cantidad de datos es insuficiente para cubrir el ancho, se replica la lista.
    if (data.length < requiredCount) {
      while (finalData.length < requiredCount) {
        finalData.push(...data);
      }
      finalData = finalData.slice(0, requiredCount);
    } else {
      finalData = data;
    }
    items.value = finalData;
  }
});
</script>

<style scoped>
.marquee {
  width: 100%;
  overflow: hidden;
  position: relative;
}

/* Usamos inline-block y white-space: nowrap para evitar espacios adicionales */
.marquee__inner {
  display: inline-block;
  white-space: nowrap;
  animation: marquee 30s linear infinite;
  font-size: 0; /* Elimina espacios en blanco entre inline-blocks */
}

.marquee-item {
  display: inline-block;
  margin: 0 10px;
  font-size: initial; /* Restaura el tamaño de fuente para el contenido */
}

.marquee-item img {
  width: 90px;
  height: 90px;
  object-fit: contain;
}

@media (max-width: 575px) {
  .marquee-item img {
    width: 97px;
    height: 97px;
  }
}

/* La animación mueve el contenedor desde 0 hasta -50% de su ancho total, 
   es decir, el ancho de una copia completa, lo que permite un loop sin espacios */
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
