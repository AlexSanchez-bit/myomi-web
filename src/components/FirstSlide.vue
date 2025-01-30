<script setup lang="ts">
import Carousel from "primevue/carousel";
import { onMounted, ref } from "vue";
const image_list: string[] = [
  "/extas/main1.png",
  "/extas/main2.png",
  "/extas/main3.png",
];

const scroll_second = () => {
  document.getElementById("second")?.scrollIntoView({
    behavior: "smooth",
  });
};
const changing = ref(false);
onMounted(() => {});
</script>

<template>
  <div class="relative w-full h-[75dvh]" id="main">
    <div class="absolute z-10 overflow-hidden w-full h-[75dvh]">
      <Carousel
        :value="image_list"
        :numScroll="1"
        :showNavigators="false"
        circular
        :autoplayInterval="3000"
        class="flex-1 transform w-full"
      >
        <template #item="{ data }">
          <div class="w-full">
            <img
              :src="data"
              class="object-cover hidden lg:block z-10 w-full h-full"
            />
            <img
              :src="data"
              class="object-cover block lg:hidden z-10 w-full h-full"
            />
          </div>
        </template>
      </Carousel>
    </div>
  </div>
</template>

<style scoped>
.see_more {
  animation: mover 2s infinite alternate;
}

@keyframes mover {
  0% {
    transform: translate(-50%, 0%);
    /* Escala normal */
  }

  50% {
    transform: translate(-50%, -75%);
    /* Escala a la mitad y mueve hacia arriba */
  }

  100% {
    transform: translate(-50%, 0%);
    /* Vuelve a la normalidad */
  }
}

:deep .p-carousel-content {
  overflow: hidden;
}
@media (max-width: 1024px) {
  .h-mid-screen {
    height: 50vh !important;
  }
}
</style>
