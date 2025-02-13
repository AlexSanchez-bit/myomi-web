<template>
  <div class="relative flex items-center justify-center">
    <img
      :src="src ?? '/noimage.webp'"
      :alt="alt"
      @load="(e) => (loading = false)"
      @error="(e) => (e.target.src = '/noimage.webp')"
      class="w-full h-full object-contain"
    />
    <Skeleton v-if="!src" class="absolute top-0 left-0 w-full h-full" />
  </div>
</template>

<script setup lang="ts">
import { Skeleton } from "primevue";
import { ref } from "vue";

const loading = ref(true);
const props = defineProps<{ alt?: string; src: string | null }>();
</script>
