<template>
  <div class="h-screen">
    <Breadcrumb :home="home" :model="items">
      <template #item="{ item, props }">
        <router-link
          v-if="item.route"
          v-slot="{ href, navigate }"
          :to="item.route"
          custom
        >
          <a :href="href" v-bind="props.action" @click="navigate">
            <span :class="[item.icon, 'text-color']" />
            <span class="text-primary font-semibold">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
          <span class="text-surface-700 dark:text-surface-0">{{
            item.label
          }}</span>
        </a>
      </template>
    </Breadcrumb>
    <div class="w-full h-96 bg-lime-300">
      {{ route.params.id }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import Breadcrumb from "primevue/breadcrumb";

const route = useRoute();
import { ref } from "vue";

const home = ref({
  icon: "pi pi-home",
});
const items = ref([
  { label: "Electronics" },
  { label: "Computer" },
  { label: "Accessories" },
  { label: "Keyboard" },
  { label: "Wireless" },
]);
</script>
