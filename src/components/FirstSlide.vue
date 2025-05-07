<script setup lang="ts">
import { Skeleton } from "primevue";
import Carousel from "primevue/carousel";
import { onMounted, ref, toRefs } from "vue";

const props = defineProps({
  images: {
    type: Array,
  },
});

const { images: image_list } = toRefs(props);

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
    <div class="absolute z-10 overflow-hidden w-full h-[70dvh]">
      <Carousel
        v-if="image_list.length > 0"
        :value="image_list"
        :numScroll="1"
        :showNavigators="false"
        circular
        :autoplayInterval="3000"
        class="flex-1 transform w-full"
      >
        <template #item="{ data }">
          <div class="w-full img-background"
            :style="`background-image:url('${data}');background-color:rgba(10,10,10,0.4);`"
          >
            <Img
              :src="data"
              :draggable="false"
              imageClass=" object-scale-down  z-10 w-full h-[70dvh] img-backlog"
            />
          </div>
        </template>
      </Carousel>
      <Skeleton class="flex-1 w-full !h-full" v-else />
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

.img-background{
  background-size:cover;
  background-repeat: no-repeat;
  backdrop-filter: blur(40px);
  background-color:rgba(10,10,10,0.4) 
}
:deep(.img-backlog){
    backdrop-filter: blur(3px)!important;
}
</style>
