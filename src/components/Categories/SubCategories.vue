<template>
  <div
    class="transition-all duration-1000 ease-in-outflex flex flex-wrap gap-3 items-center justify-start px-3"
  >
    <div class="w-40 h-40" v-for="i in loading ? 6 : 0" :key="i">
      <Skeleton class="w-full !h-full" style=""></Skeleton>
    </div>

    <router-link
      :to="{ name: 'category.details', params: { id: category.id } }"
      class="w-40 h-40 rounded-xl overflow-hidden relative category cursor-pointer"
      v-for="category in categories"
      :key="category.id"
    >
      <picture>
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
    </router-link>
  </div>
</template>
<script setup lang="ts">
import { useCategoryService } from "@/composables/Shop/Category/useCategoryService";
import { type ICategory } from "@/services/Shops/Categories/Category.service";
import { Pagination } from "@/utils/entities/Pagination";
import Skeleton from "primevue/skeleton";
import { onMounted, ref } from "vue";
import { FilterMatchMode } from "@primevue/core/api";

const service = useCategoryService();
const categories = ref<ICategory[]>([]);
const loading = ref(false);

const props = defineProps<{
  parent_category: number;
}>();
const onscreen = ref(false);
const container = ref();

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

  const resp = await service.getAll(
    [
      {
        field: "parent",
        matchMode: FilterMatchMode.EQUALS,
        value: props.parent_category,
      },
    ],
    new Pagination(0, 100),
    [],
  );
  loading.value = false;

  if (resp) {
    categories.value = resp;
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
