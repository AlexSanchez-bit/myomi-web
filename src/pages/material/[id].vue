<template>
  <div class="min-h-screen text-center max-w-4xl mx-auto p-4">
    <h1 v-if="material" class="text-5xl mb-3">{{ material?.name }}</h1>
    <span v-if="material" v-html="material?.description"></span>
  </div>
  <Skeleton v-if="!material" class="!w-full !h-10" />
  <Skeleton v-if="!material" class="!w-full !h-full" />
</template>
<script setup lang="ts">
import SKeleton from "primevue/skeleton";
import {
  type IMaterial,
  useMaterialService,
} from "@/composables/Shop/Material/useMaterialService";
import { onMounted, ref } from "vue";

const props = defineProps<{ material_id: string }>();
const service = useMaterialService();

const material = ref<IMaterial>(null);

onMounted(async () => {
  const { data, error } = await service.getDetails(props.material_id);
  if (!error && data) {
    material.value = data;
  }
});
</script>
