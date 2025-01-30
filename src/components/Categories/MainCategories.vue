<template>
  <div class="flex flex-col gap-2 items-center py-3 px-20">
    <h6
      class="text-4xl my-6 underline decoration-darkblue text-darkblue underline-offset-8"
    >
      {{ $t("all_categories") }}
    </h6>
    <div class="flex flex-wrap gap-3">
      <div
        class="w-60 h-60 rounded-xl overflow-hidden"
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
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useCategoryService } from "@/composables/Shop/Category/useCategoryService";
import { ICategory } from "@/services/Shops/Categories/Category.service";
import { Pagination } from "@/utils/entities/Pagination";
import { onMounted, ref } from "vue";

const service = useCategoryService();
const categories = ref<ICategory[]>([]);

onMounted(async () => {
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
  if (resp) {
    categories.value = resp;
  }
});
</script>
