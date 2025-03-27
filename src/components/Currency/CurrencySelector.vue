<template>
  <Button
    type="button"
    class="bg-transparent text-black border-none !p-0"
    @click="toggle"
    aria-haspopup="true"
    aria-controls="overlay_menu"
    unstyled
  >
    <span class="flex flex-row items-center gap-0.5 font-sans">
      <!-- <img :src="selected_currency.icon" alt="" class="w-3 h-3 object-fill" /> -->
      {{ selected_currency.name }}
    </span>
  </Button>
  <Menu
    ref="menu"
    id="overlay_menu"
    :model="items"
    :popup="true"
    unstyled
    class="left-1 bg-darkblue rounded-xl w-24"
  >
    <template #item="{ item }">
      <span
        class="m-0 flex flex-row items-center gap-0.5 bg-darkblue !px-4 !py-1 rounded border-none cursor-pointer min-w-24 hover:bg-gray-50/20"
      >
        <!-- <img :src="item.icon" alt="" class="w-3 h-3 object-fill" /> -->
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
  icon: "",
});
const items = ref<{ items: any[] }[]>([
  {
    items: [],
  },
]);

const service = useCurrencyService();

const store = useCurrencyStore();
onMounted(async () => {
  const resp = await service.getAll([], new Pagination(0, 100), []);
  console.log(resp);
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
