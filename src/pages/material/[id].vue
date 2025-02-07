<template>
  <div class="min-h-screen max-w-4xl mx-auto p-4">
    {{ props }}
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{ material_id: string }>();
</script>
