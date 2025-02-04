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
  { label: "Más recientes", key: "recent" },
  { label: "Precio ascendente", key: "price_asc" },
  { label: "Precio descendente", key: "price_desc" },
]);

const handleFilterUpdate = (field: keyof Filters, value: any) => {
  const newFilters = { ...props.filters, [field]: value };
  emit("update:filters", newFilters);
};
</script>

<template>
  <div class="min-h-screen">
    <!-- Mobile Filters Button -->
    <div class="lg:hidden p-4 border-b">
      <Button
        icon="pi pi-filter"
        label="Filtros"
        class="w-full"
        @click="isFilterPanelOpen = true"
      />
    </div>

    <!-- Desktop Filters -->
    <div class="flex flex-row gap-1 justify-start">
      <div class="hidden lg:block w-1/3 h-full">
        <div class="sticky top-20 p-3">
          <div class="p-4 shadow-sm">
            <h3 class="text-lg font-semibold mb-4">Filtros</h3>

            <!-- Filtro por nombre -->
            <div class="mb-4">
              <label class="block text-sm font-medium mb-2">Nombre</label>
              <InputText
                v-model="filters.name"
                @update:modelValue="(v) => handleFilterUpdate('name', v)"
                placeholder="Buscar por nombre..."
                class="w-full"
              />
            </div>

            <!-- Filtro por rango de precios -->
            <div class="mb-4 overflow-hidden">
              <label class="block text-sm font-medium mb-2"
                >Rango de precios</label
              >
              <div class="flex flex-row gap-2">
                <InputNumber
                  v-model="filters.minPrice"
                  @update:modelValue="(v) => handleFilterUpdate('minPrice', v)"
                  placeholder="Mínimo"
                  mode="currency"
                  currency="USD"
                  class="w-1/2 overflow-hidden"
                />
                <InputNumber
                  v-model="filters.maxPrice"
                  @update:modelValue="(v) => handleFilterUpdate('maxPrice', v)"
                  placeholder="Máximo"
                  mode="currency"
                  currency="USD"
                  class="w-1/2"
                />
              </div>
            </div>

            <!-- Filtro por clases -->
            <div class="mb-4">
              <label class="block text-sm font-medium mb-2">Clases</label>
              <MultiSelect
                v-model="filters.classes"
                @update:modelValue="(v) => handleFilterUpdate('classes', v)"
                :options="availableClasses"
                placeholder="Seleccione clases"
                display="chip"
                class="w-full"
                optionLabel="name"
                optionValue="id"
              />
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium mb-2">Materiales</label>
              <MultiSelect
                v-model="filters.materials"
                @update:modelValue="(v) => handleFilterUpdate('materials', v)"
                :options="availableMaterials"
                placeholder="Seleccione Materiales"
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
      <div>
        <div class="w-full flex flex-row justify-end px-3">
          <Select
            v-model="filters.sort"
            :options="sortOptions"
            optionLabel="label"
            optionValue="key"
            selectionMode="checkbox"
            placeholder="Orden"
            class="md:w-80 w-full"
          />
        </div>
        <slot></slot>
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
      <h3 class="text-lg font-semibold">Filtros</h3>
    </template>

    <div class="p-4 space-y-4">
      <!-- Los mismos filtros que en la versión desktop -->
      <div class="mb-4">
        <label class="block text-sm font-medium mb-2">Nombre</label>
        <InputText
          v-model="filters.name"
          @update:modelValue="(v) => handleFilterUpdate('name', v)"
          placeholder="Buscar por nombre..."
          class="w-full"
        />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium mb-2">Rango de precios</label>
        <div class="flex gap-2">
          <InputNumber
            v-model="filters.minPrice"
            @update:modelValue="(v) => handleFilterUpdate('minPrice', v)"
            placeholder="Mínimo"
            mode="currency"
            currency="USD"
            class="w-1/2"
          />
          <InputNumber
            v-model="filters.maxPrice"
            @update:modelValue="(v) => handleFilterUpdate('maxPrice', v)"
            placeholder="Máximo"
            mode="currency"
            currency="USD"
            class="w-1/2"
          />
        </div>
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium mb-2">Clases</label>
        <MultiSelect
          v-model="filters.classes"
          @update:modelValue="(v) => handleFilterUpdate('classes', v)"
          :options="availableClasses"
          placeholder="Seleccione clases"
          optionLabel="name"
          optionValue="id"
          display="chip"
          class="w-full"
        />
      </div>
    </div>
  </Drawer>
</template>
