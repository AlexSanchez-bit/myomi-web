<template>
  <!-- Placeholder para detectar cuando entra en pantalla -->
  <div ref="container" class="h-24" v-if="!onscreen" />

  <!-- Una vez cargado o si ya hay categorías, mostramos el carrusel -->
  <div
    v-if="loading || categories.length > 0"
    class="transition-all duration-1000 ease-in-out"
    :class="{
      'translate-y-full opacity-0': !onscreen,
      'translate-y-0 opacity-100': onscreen,
    }"
  >
    <!-- Header slot vacío (lo mismo que tenías) -->
    <slot name="header"></slot>

    <swiper-container
      :loop="true"
      :navigation="false"
      :pagination="{ clickable: true, dynamicBullets: true }"
      class="w-full"
      :slides-per-view="'auto'"
      :space-between="8"
    >
      <!-- Skeletons mientras carga -->
      <swiper-slide
        v-if="loading"
        v-for="(_, idx) in skeletonItems"
        :key="'skele-' + idx"
      >
        <div class="w-24 h-24">
          <Skeleton class="w-full h-full" />
        </div>
      </swiper-slide>

      <!-- Carrusel de categorías -->
      <swiper-slide
        v-else
        v-for="category in categories"
        :key="category.id"
        class="!w-24 !h-24"
      >
        <router-link
          :to="{ name: 'category.details', params: { id: category.id } }"
        >
          <div
            class="w-24 h-24 rounded-xl overflow-hidden relative category cursor-pointer"
          >
            <picture class="h-12">
              <img
                :src="category.icon ?? '/noimage.webp'"
                alt=""
                class="w-full h-full object-cover"
                @error="(e) => ((e.target as any).src = '/noimage.webp')"
              />
            </picture>
            <div
              class="absolute inset-0 bg-zinc-950/35 flex items-center justify-center"
            >
              <p class="text-white text-xl">{{ category.name }}</p>
            </div>
          </div>
        </router-link>
      </swiper-slide>

      <!-- Paginación (bullets) -->
      <swiper-pagination slot="pagination"></swiper-pagination>
    </swiper-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useCategoryService } from "@/composables/Shop/Category/useCategoryService";
import { Pagination } from "@/utils/entities/Pagination";
import { FilterMatchMode } from "@primevue/core/api";
import Skeleton from "primevue/skeleton";

const loading = ref(true);
const categories = ref<any[]>([]);
const onscreen = ref(false);
const container = ref<HTMLElement | null>(null);

// Props
const props = defineProps<{ parent_category: number }>();

// Filtros
const filters = [
  {
    field: "parent",
    matchMode: FilterMatchMode.EQUALS,
    value: props.parent_category,
  },
];

// Número de skeletons
const skeletonItems = Array(6).fill(0);

// Al montar, observamos la entrada en pantalla y cargamos datos
onMounted(async () => {
  // IntersectionObserver para animación
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        onscreen.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.9 },
  );
  if (container.value) observer.observe(container.value);

  // Carga de categorías
  loading.value = true;
  const svc = useCategoryService();
  const resp = await svc.getAll(filters, new Pagination(0, 100), []);
  categories.value = resp ?? [];
  loading.value = false;
});
</script>

<style scoped>
/* Cada slide mide 6rem (~24) y el espacio entre es 0.5rem (8px) */
swiper-slide {
  width: auto !important;
}

/* Hover suave en imagen */
.category img {
  transition: transform 0.3s ease-in-out;
}
.category:hover img {
  transform: scale(1.1);
}
</style>
