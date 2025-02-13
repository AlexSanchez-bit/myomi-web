<template>
  <div>
    <IconField class="w-full flex-1 scale-80">
      <InputIcon class="pi pi-search" />
      <InputText
        v-model="value1"
        class="w-full !rounded-full"
        :placeholder="$t('found_your_favorite_product')"
        size="search"
      />
    </IconField>
  </div>
</template>
<script setup lang="ts">
import InputText from "primevue/inputtext";

import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
</script>
