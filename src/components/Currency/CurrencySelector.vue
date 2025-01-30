<template>
  <Button
    type="button"
    class="bg-transparent text-black border-none !p-0"
    @click="toggle"
    aria-haspopup="true"
    aria-controls="overlay_menu"
  >
    {{ selected_currency.name }}
  </Button>
  <Menu ref="menu" id="overlay_menu" :model="items" :popup="true">
    <template #item="{ item }">
      <span>
        {{ item.name }}
      </span>
    </template>
  </Menu>
</template>

<script setup lang="ts">
import Menu from "primevue/menu";
import Button from "primevue/button";
import { ref, onMounted } from "vue";
import type { ICurrency } from "@/services/Currency/Currency.service";
import { useCurrencyService } from "@/composables/Currency/useCurrencyService";
import { Pagination } from "@/utils/entities/Pagination";
import { useCurrencyStore } from "@/stores/currency";

const menu = ref();
const selected_currency = ref<ICurrency>({
  name: "USD",
  change_value: 1,
});
const items = ref<{ items: any[] }[]>([
  {
    items: [
      {
        name: "USD",
        change_value: 1,
      },
    ],
  },
]);

const service = useCurrencyService();

const store = useCurrencyStore();
onMounted(async () => {
  const resp = await service.getAll([], new Pagination(0, 100), []);
  selected_currency.value = resp[0];
  store.change_currency(resp[0]);
  items.value = [
    {
      items: [
        ...resp.map((item) => ({
          ...item,
          command: () => {
            selected_currency.value = item;
            store.change_currency(item);
          },
        })),
      ],
    },
  ];
});

const toggle = (event: any) => {
  menu.value.toggle(event);
};
</script>
