<template>
  <Sliders
    :service="service"
    :filters="filters"
    :orders="[]"
    class="max-h-24"
    :pages="100"
    :arrows="false"
  >
    <template #header> </template>
    <template #item="{ item: category }">
      <router-link
        :to="{ name: 'category.details', params: { id: category.id } }"
      >
        <div
          class="!w-24 !h-24 rounded-xl overflow-hidden relative category cursor-pointer"
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
            class="absolute top-0 left-0 w-full h-full bg-zinc-950/35 flex items-center justify-center"
          >
            <p class="text-white text-xl">
              {{ category.name }}
            </p>
          </div>
        </div>
      </router-link>
    </template>
    <template #skeletons>
      <div class="!w-24 !h-24">
        <Skeleton class="w-full !h-full" style=""></Skeleton>
      </div>
    </template>
  </Sliders>
</template>
<script setup lang="ts">
import { useCategoryService } from "@/composables/Shop/Category/useCategoryService";
import { type ICategory } from "@/services/Shops/Categories/Category.service";
import { Pagination } from "@/utils/entities/Pagination";
import Skeleton from "primevue/skeleton";
import { onMounted, ref } from "vue";
import { FilterMatchMode } from "@primevue/core/api";
import Sliders from "../Sliders.vue";

const service = useCategoryService();
const loading = ref(false);

const props = defineProps<{
  parent_category: number;
}>();
const onscreen = ref(false);
const container = ref();
const filters = ref([
  {
    field: "parent",
    matchMode: FilterMatchMode.EQUALS,
    value: props.parent_category,
  },
]);

onMounted(async () => {
  loading.value = true;

  const observer = new IntersectionObserver(() => (onscreen.value = true), {
    root: null, // Usa el viewport completo como área de visualización
    threshold: 0.9, // Ejecuta el callback cuando el 10% del elemento esté en pantalla
  });

  // Comenzamos a observar el elemento
  if (container.value) {
    observer.observe(container.value);
  }
});
</script>

<style scoped>
.category img {
  transition: all 0.3s ease-in-out;
}
.category:hover img {
  scale: 1.1;
}
</style>
