<template>
  <div class="flex flex-col gap-2 items-center py-3 md:px-20 px-6 mb-4">
    <h6
      class="text-4xl my-6 underline decoration-darkblue text-darkblue underline-offset-8"
    >
      {{ $t("all_categories") }}
    </h6>
    <div class="flex flex-wrap gap-3 items-center">
      <div class="w-60 h-60" v-for="i in loading ? 6 : 0" :key="i">
        <Skeleton class="w-full !h-full" style=""></Skeleton>
      </div>

      <router-link
        :to="{ name: 'category.details', params: { id: category.id } }"
        class="md:w-60 md:h-60 h-80 w-full rounded-xl overflow-hidden relative category cursor-pointer"
        v-for="category in categories"
        :key="category.id"
      >
        <picture>
          <img
            :src="category.icon ?? '/noimage.webp'"
            alt=""
            class="w-full h-full object-cover"
            @error="(e) => (e.target.src = '/noimage.webp')"
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
  </div>
</template>
<script setup lang="ts">
import { useCategoryService } from "@/composables/Shop/Category/useCategoryService";
import { ICategory } from "@/services/Shops/Categories/Category.service";
import { Pagination } from "@/utils/entities/Pagination";
import Skeleton from "primevue/skeleton";
import { onMounted, ref } from "vue";

const service = useCategoryService();
const categories = ref<ICategory[]>([]);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  const resp = await service.getAll(
    [
      {
        field: "parent",
        matchMode: "IS",
        value: null,
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
