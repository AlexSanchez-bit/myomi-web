<template>
  <div class="min-h-screen text-center max-w-4xl mx-auto p-4" v-if="material">
    <h1 class="text-5xl mb-3">{{ material?.name }}</h1>
    <span v-html="material?.description"></span>
  </div>
</template>
<script setup lang="ts">
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
