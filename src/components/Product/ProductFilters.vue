<script setup lang="ts">
import { ref, onMounted } from "vue";
import Button from "primevue/button";
import Drawer from "primevue/drawer";
import { Filters } from "./Filters";
import Select from "primevue/select";
import MultiSelect from "primevue/multiselect";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import { useCategoryService } from "@/composables/Shop/Category/useCategoryService";
import { useMaterialService } from "@/composables/Shop/Material/useMaterialService";
import { Pagination } from "@/utils/entities/Pagination";

type SortOption = {
  label: string;
  key: string;
};

const materialService = useMaterialService();
const classService = useCategoryService();
onMounted(async () => {
  availableMaterials.value = await materialService.getAll(
    [],
    new Pagination(0, 100),
    [],
  );
  availableClasses.value = await classService.getAll(
    [],
    new Pagination(0, 100),
    [],
  );
});

const props = defineProps<{
  filters: Filters;
}>();
const availableMaterials = ref<string[]>([]);
const availableClasses = ref<string[]>([]);

const emit = defineEmits<{
  (e: "update:filters", value: Filters): void;
  (e: "update:sort", value: string): void;
}>();

const isFilterPanelOpen = ref(false);

const sortOptions = ref<SortOption[]>([
  { label: "none", key: null },
  { label: "recent", key: "recent" },
  { label: "price_asc", key: "price_asc" },
  { label: "price_desc", key: "price_desc" },
]);

const handleFilterUpdate = (field: keyof Filters, value: any) => {
  const newFilters = { ...props.filters, [field]: value };
  emit("update:filters", newFilters);
};
</script>

<template>
  <div class="min-h-screen">
    <!-- Mobile Filters Button -->

    <!-- Desktop Filters -->
    <div class="flex flex-row gap-1 justify-start">
      <div class="hidden lg:block w-1/4 h-full sticky top-16">
        <div class="p-3">
          <div class="p-4 shadow-sm">
            <h3 class="text-lg font-semibold mb-4">{{ $t("filters") }}</h3>

            <!-- Filtro por nombre -->
            <div class="mb-4">
              <label class="block text-sm font-medium mb-2">{{
                $t("name")
              }}</label>
              <InputText
                v-model="filters.name"
                @update:modelValue="(v) => handleFilterUpdate('name', v)"
                class="w-full"
              />
            </div>

            <!-- Filtro por rango de precios -->
            <div class="mb-4 overflow-hidden">
              <label class="block text-sm font-medium mb-2">{{
                $t("price_range")
              }}</label>
              <div class="flex flex-row gap-2">
                <InputNumber
                  v-model="filters.minPrice"
                  @update:modelValue="(v) => handleFilterUpdate('minPrice', v)"
                  :placeholder="$t('minimun')"
                  mode="currency"
                  currency="USD"
                  class="w-1/2 overflow-hidden"
                />
                <InputNumber
                  v-model="filters.maxPrice"
                  @update:modelValue="(v) => handleFilterUpdate('maxPrice', v)"
                  :placeholder="$t('maximun')"
                  mode="currency"
                  currency="USD"
                  class="w-1/2"
                />
              </div>
            </div>

            <!-- Filtro por clases -->
            <div class="mb-4">
              <label class="block text-sm font-medium mb-2">{{
                $t("categories")
              }}</label>
              <MultiSelect
                v-model="filters.classes"
                @update:modelValue="(v) => handleFilterUpdate('classes', v)"
                :options="availableClasses"
                display="chip"
                class="w-full"
                optionLabel="name"
                optionValue="id"
              />
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium mb-2">{{
                $t("materials")
              }}</label>
              <MultiSelect
                v-model="filters.materials"
                @update:modelValue="(v) => handleFilterUpdate('materials', v)"
                :options="availableMaterials"
                display="chip"
                class="w-full"
                optionLabel="name"
                optionValue="id"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Content Area -->
      <div class="w-full">
        <div class="w-full flex flex-row items-center justify-between px-3">
          <div class="lg:hidden">
            <Button
              icon="pi pi-filter"
              label="Filtros"
              class="w-full"
              @click="isFilterPanelOpen = true"
            />
          </div>
          <span></span>

          <Select
            v-model="filters.sort"
            :options="sortOptions"
            :optionLabel="(e) => $t(e.label)"
            optionValue="key"
            selectionMode="checkbox"
            placeholder="Orden"
            class="md:w-80"
            @update:modelValue="(v) => emit('update:sort', v)"
          />
        </div>
        <div class="p-2">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile Filters SlideOver -->
  <Drawer
    v-model:visible="isFilterPanelOpen"
    position="left"
    class="w-full max-w-xs"
    @hide="isFilterPanelOpen = false"
  >
    <template #header>
      <h3 class="text-lg font-semibold">{{ $t("filters") }}</h3>
    </template>

    <div class="sticky top-20">
      <div class="shadow-sm">
        <!-- Filtro por nombre -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">{{ $t("name") }}</label>
          <InputText
            v-model="filters.name"
            @update:modelValue="(v) => handleFilterUpdate('name', v)"
            class="w-full"
          />
        </div>

        <!-- Filtro por rango de precios -->
        <div class="mb-4 overflow-hidden">
          <label class="block text-sm font-medium mb-2">{{
            $t("price_range")
          }}</label>
          <div class="flex flex-row gap-2">
            <InputNumber
              v-model="filters.minPrice"
              @update:modelValue="(v) => handleFilterUpdate('minPrice', v)"
              :placeholder="$t('minimun')"
              mode="currency"
              currency="USD"
              class="w-1/2 overflow-hidden"
            />
            <InputNumber
              v-model="filters.maxPrice"
              @update:modelValue="(v) => handleFilterUpdate('maxPrice', v)"
              :placeholder="$t('maximun')"
              mode="currency"
              currency="USD"
              class="w-1/2"
            />
          </div>
        </div>

        <!-- Filtro por clases -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">{{
            $t("categories")
          }}</label>
          <MultiSelect
            v-model="filters.classes"
            @update:modelValue="(v) => handleFilterUpdate('classes', v)"
            :options="availableClasses"
            display="chip"
            class="w-full"
            optionLabel="name"
            optionValue="id"
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">{{
            $t("materials")
          }}</label>
          <MultiSelect
            v-model="filters.materials"
            @update:modelValue="(v) => handleFilterUpdate('materials', v)"
            :options="availableMaterials"
            display="chip"
            class="w-full"
            optionLabel="name"
            optionValue="id"
          />
        </div>
      </div>
    </div>
  </Drawer>
</template>
