<template>
  <div>
    <!-- Versión escritorio -->
    <IconField class="w-full flex-1 scale-80 hidden md:block">
      <InputIcon class="pi pi-search" />
      <AutoComplete
        class="!rounded-full !w-full"
        :suggestions="filteredData"
        @complete="onSearchComplete"
        optionLabel="name"
        optionGroupLabel="label"
        optionGroupChildren="items"
        :placeholder="$t('found_your_favorite_product')"
      >
        <template #optiongroup="slotProps">
          <div class="flex items-center country-item">
            <div>{{ $t(slotProps.option.label) }}</div>
          </div>
        </template>
        <template #option="{ option }">
          <div class="flex items-center">
            <router-link
              :to="{
                name:
                  option.type == 'products'
                    ? 'product.details'
                    : option.type == 'categories'
                      ? 'category.details'
                      : 'brand.details',
                params: { id: option.id },
              }"
            >
              <div>{{ option.name }}</div>
            </router-link>
          </div>
        </template>
      </AutoComplete>
    </IconField>

    <!-- Versión móvil -->
    <div class="w-full flex-1 scale-80 md:hidden">
      <i
        class="pi-search sm:!hidden pi scale-[150%] cursor-pointer"
        style="font-size: 0.8rem"
        @click="visibleTop = true"
      ></i>
      <Drawer
        v-model:visible="visibleTop"
        header="Top Drawer"
        position="top"
        style="height: auto"
      >
        <template #container="{ closeCallback }">
          <div class="min-h-[50dvh] p-4">
            <div class="flex flex-row gap-4 items-center mb-3">
              <i
                @click="closeCallback"
                class="pi pi-arrow-left text-xl cursor-pointer"
              ></i>
              <IconField class="w-full flex-1 scale-80">
                <InputIcon
                  :class="{
                    'pi pi-spin pi-spinner': loading,
                    'pi pi-search': !loading,
                  }"
                />
                <InputText
                  v-model="searchQuery"
                  @input="onInputSearch"
                  class="!w-full !rounded-full"
                  :loading="loading"
                />
              </IconField>
            </div>
            <ul
              v-for="segment in filteredData"
              :key="segment.label"
              class="min-h-20"
            >
              <p>{{ $t(segment.label) }}</p>
              <li
                class="ml-3 my-2 hover:bg-gray-200/50 p-2 rounded-lg bg-gray-200/20 text-sm text-zinc-700"
                v-for="item in segment.items"
                :key="item.id"
              >
                <router-link
                  :to="{
                    name:
                      item.type == 'products'
                        ? 'product.details'
                        : item.type == 'categories'
                          ? 'category.details'
                          : 'brand.details',
                    params: { id: item.id },
                  }"
                >
                  <div>{{ item.name }}</div>
                </router-link>
              </li>
            </ul>
          </div>
        </template>
      </Drawer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import AutoComplete from "primevue/autocomplete";
import Drawer from "primevue/drawer";
import InputText from "primevue/inputtext";
import { useProductService } from "@/composables/Shop/Product/useProductService";
import { useCategoryService } from "@/composables/Shop/Category/useCategoryService";
import { useBrandService } from "@/composables/Shop/Brand/useBrandService";
import { Pagination } from "@/utils/entities/Pagination";
import { FilterMatchMode } from "@primevue/core/api";

// Variables reactivas
const visibleTop = ref(false);
const searchQuery = ref("");
const filteredData = ref<Array<{ label: string; items: any[] }>>([]);

// Servicios
const productService = useProductService();
const categoryService = useCategoryService();
const brandService = useBrandService();

// Timeout para el debounce
let lastTimeout: number | null = null;

const loading = ref(false);

// Función que ejecuta la búsqueda
async function performSearch(query: string) {
  const newData = [
    {
      label: "products",
      items: [] as any[],
    },
    {
      label: "categories",
      items: [] as any[],
    },
    {
      label: "brands",
      items: [] as any[],
    },
  ];

  loading.value = true;

  newData[0].items =
    (await productService.getAll(
      [
        {
          field: "name",
          matchMode: FilterMatchMode.CONTAINS,
          value: query,
        },
      ],
      new Pagination(0, 10),
      [],
    )) ?? [];

  newData[1].items =
    (await categoryService.getAll(
      [
        {
          field: "name",
          matchMode: FilterMatchMode.CONTAINS,
          value: query,
        },
      ],
      new Pagination(0, 10),
      [],
    )) ?? [];

  newData[2].items =
    (await brandService.getAll(
      [
        {
          field: "name",
          matchMode: FilterMatchMode.CONTAINS,
          value: query,
        },
      ],
      new Pagination(0, 10),
      [],
    )) ?? [];

  for (let i = 0; i < 3; i++) {
    newData[i].items = newData[i].items.map((item: any) => {
      return {
        type: newData[i].label,
        ...item,
      };
    });
  }

  filteredData.value = newData;

  loading.value = false;
}

// Función para gestionar el debounce
function debounceSearch(query: string) {
  if (lastTimeout !== null) {
    clearTimeout(lastTimeout);
  }
  lastTimeout = window.setTimeout(() => {
    performSearch(query);
  }, 1000);
}

// Manejador para AutoComplete (versión escritorio)
function onSearchComplete(event: { query: string }) {
  debounceSearch(event.query);
}

// Manejador para InputText (versión móvil)
function onInputSearch() {
  debounceSearch(searchQuery.value);
}
</script>

<style scoped>
::v-deep .p-autocomplete-input {
  width: 100%;
  border-radius: 6rem;
}
</style>
