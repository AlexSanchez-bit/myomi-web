<template>
  {{ route.params.id }}
  aa
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
</script>
