<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from "vue";
import Button from "primevue/button";
import Drawer from "primevue/drawer";
import { type Filters } from "./Filters";
import Select from "primevue/select";
import MultiSelect from "primevue/multiselect";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import { useCategoryService } from "@/composables/Shop/Category/useCategoryService";
import { useMaterialService } from "@/composables/Shop/Material/useMaterialService";
import { Pagination } from "@/utils/entities/Pagination";
import { useBrandService } from "@/composables/Shop/Brand/useBrandService";
import { useConcernsService } from "@/composables/Shop/Concerns/useConcernsService";

type SortOption = {
  label: string;
  key: string;
};

const materialService = useMaterialService();
const classService = useCategoryService();
const brandService = useBrandService();
const concernService = useConcernsService();

onMounted(async () => {
  availableMaterials.value = await materialService.getAll(
    [],
    new Pagination(0, 100),
    [],
  );
  availableConcerns.value = await concernService.getAll(
    [],
    new Pagination(0, 100),
    [],
  );

  availableBrands.value = await brandService.getAll(
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
  default_filter: Filter[];
}>();

const filter = ref({ ...props.filters });
const availableMaterials = ref<string[]>([]);
const availableConcerns = ref<number[]>([]);
const availableClasses = ref<string[]>([]);
const availableBrands = ref<string[]>([]);

const emit = defineEmits<{
  (e: "update:filters", value: Filters): void;
  (e: "update:sort", value: string): void;
}>();

const isFilterPanelOpen = ref(false);

const sortOptions = ref<SortOption[]>([
  { label: "recent", key: "recent" },
  { label: "price_asc", key: "price_asc" },
  { label: "price_desc", key: "price_desc" },
]);

const handleFilterUpdate = (field: keyof Filters, value: any) => {
  const newFilters = { ...filter.value, [field]: value };
  filter.value = newFilters;
  updateFilters(newFilters);
  emit("update:filters", newFilters);
};

//filtering
import { FilterMatchMode } from "@primevue/core/api";
import { useProductService } from "@/composables/Shop/Product/useProductService";
import type { IGenericLister } from "@/utils/entities/IGenericLister";
import type { IProduct } from "@/services/Shops/Products/Products.service";
import LazyLoadScroll from "@/components/LazyLoadScroll.vue";
import type { IResponseModel } from "@/utils/entities/ResponseModel";
import type { IListResponse } from "@/utils/entities/IListResponse";
import { Skeleton } from "primevue";
import ProductItem from "@/components/Product/ProductItem.vue";
import { Filter } from "@/utils/entities/Filter";
import type { Sorter } from "@/utils/entities/Sorters";

const filter_array = ref<Filter[]>(props.default_filter);
const lazyScroll = ref<any>();
const sort = ref<Sorter[]>([]);

const lastTimeout = ref<any>(-1);

const reloadProducts = () => {
  if (lastTimeout) {
    clearTimeout(lastTimeout.value);
  }
  lastTimeout.value = setTimeout(() => {
    lazyScroll.value.apply_filters();
  }, 500);
};

function updateSort(_sort: string | null) {
  if (!_sort) {
    sort.value = [];
  } else {
    if (_sort == "recent") {
      sort.value = [{ field: "created_at", order: 1 }];
    }
    if (_sort == "price_asc") {
      sort.value = [{ field: "price", order: -1 }];
    }
    if (_sort == "price_desc") {
      sort.value = [{ field: "price", order: 1 }];
    }
  }
  reloadProducts();
}

function updateFilters(filters: Filters) {
  const filterConfig = [
    {
      field: "name",
      value: filters.name,
      matchMode: FilterMatchMode.CONTAINS,
      condition: !!filters.name?.trim(),
    },
    {
      field: "price",
      value: filters.minPrice,
      matchMode: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO,
      condition: filters.minPrice !== null && filters.minPrice !== undefined,
    },
    {
      field: "price",
      value: filters.maxPrice,
      matchMode: FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
      condition: filters.maxPrice !== null && filters.maxPrice !== undefined,
    },
    {
      field: "product_category.category_id",
      value: filters.classes,
      matchMode: FilterMatchMode.IN,
      condition: !!filters.classes?.length,
    },
    {
      field: "product_materials.material_id",
      value: filters.materials,
      matchMode: FilterMatchMode.IN,
      condition: !!filters.materials?.length,
    },
    {
      field: "product_concern.concern_id",
      value: filters.concerns,
      matchMode: FilterMatchMode.IN,
      condition: !!filters.concerns?.length,
    },
    {
      field: "brand",
      value: filters.brands,
      matchMode: FilterMatchMode.IN,
      condition: !!filters.brands?.length,
    },
  ];

  filterConfig.forEach((config) => {
    const existingIndex = filter_array.value.findIndex(
      (e) => e.field === config.field && e.matchMode === config.matchMode,
    );

    if (config.condition) {
      const newEntry = {
        field: config.field,
        value: config.value,
        matchMode: config.matchMode,
      };

      if (existingIndex >= 0) {
        filter_array.value[existingIndex] = newEntry;
      } else {
        filter_array.value.push(newEntry);
      }
    } else if (existingIndex >= 0) {
      filter_array.value.splice(existingIndex, 1);
    }
  });
  reloadProducts();
}

const product_service = useProductService();

const lazyLister: IGenericLister<IProduct> = {
  GetAll: async (page: number, limit: number, filter: any) => {
    const resp = await product_service.getAllTotalCount(
      [...filter_array.value].filter((e) => e != null && e.value != null),
      new Pagination(page, limit),
      [...sort.value],
    );

    return {
      data: {
        items: resp.data,
        totalPages: Math.floor(resp.totalCount / limit),
      },
      error: resp == null ? {} : null,
    } as IResponseModel<IListResponse<IProduct>>;
  },
};
</script>

<template>
  <div class="min-h-screen">
    <!-- Mobile Filters Button -->
    <!-- Desktop Filters -->
    <div class="flex flex-row gap-1 justify-start">
      <div class="hidden lg:block w-1/4 h-full sticky top-32">
        <div class="p-3">
          <div class="p-4 shadow-sm">
            <h3 class="text-lg font-semibold mb-4">{{ $t("filters") }}</h3>

            <!-- Filtro por nombre -->
            <div class="mb-4">
              <label class="block text-sm font-medium mb-2">{{
                $t("name")
              }}</label>
              <InputText
                v-model="filter.name"
                @update:modelValue="(v) => handleFilterUpdate('name', v)"
                class="w-full"
              />
            </div>

            <!-- Filtro por rango de precios -->
            <div class="mb-4">
              <label class="block text-sm font-medium mb-2">{{
                $t("price_range")
              }}</label>
              <div class="flex flex-row gap-2">
                <InputNumber
                  v-model="filter.minPrice"
                  @update:modelValue="(v) => handleFilterUpdate('minPrice', v)"
                  :placeholder="$t('minimun')"
                  mode="currency"
                  currency="USD"
                  class="w-1/2 overflow-hidden"
                />
                <InputNumber
                  v-model="filter.maxPrice"
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
                v-model="filter.classes"
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
                v-model="filter.materials"
                @update:modelValue="(v) => handleFilterUpdate('materials', v)"
                :options="availableMaterials"
                display="chip"
                class="w-full"
                optionLabel="name"
                optionValue="id"
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium mb-2">{{
                $t("concerns")
              }}</label>
              <MultiSelect
                v-model="filter.concerns"
                @update:modelValue="(v) => handleFilterUpdate('concerns', v)"
                :options="availableConcerns"
                display="chip"
                class="w-full"
                optionLabel="name"
                optionValue="id"
              />
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium mb-2">{{
                $t("brands")
              }}</label>
              <MultiSelect
                v-model="filter.brands"
                @update:modelValue="(v) => handleFilterUpdate('brands', v)"
                :options="availableBrands"
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
              :label="$t('filters')"
              class="w-full !border-none pastel-btn"
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
            @update:modelValue="(v) => updateSort(v)"
          />
        </div>
        <div class="p-2">
          <div>
            <slot></slot>
            <LazyLoadScroll
              ref="lazyScroll"
              :service="lazyLister"
              :filter="{}"
              display-class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2"
            >
              <template #item="{ item }">
                <ProductItem :product="item" />
              </template>
              <template #skeletons>
                <Skeleton class="w-full md:w-1/3 lg:w-1/4 xl:w-1/5 !h-80" />
              </template>
            </LazyLoadScroll>
          </div>
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
            v-model="filter.name"
            @update:modelValue="(v) => handleFilterUpdate('name', v)"
            class="w-full"
          />
        </div>

        <!-- Filtro por rango de precios -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">{{
            $t("price_range")
          }}</label>
          <div class="grid grid-cols-2 gap-2">
            <InputNumber
              v-model="filter.minPrice"
              @update:modelValue="(v) => handleFilterUpdate('minPrice', v)"
              :placeholder="$t('minimun')"
              mode="currency"
              currency="USD"
              class="!w-full"
            />
            <InputNumber
              v-model="filter.maxPrice"
              @update:modelValue="(v) => handleFilterUpdate('maxPrice', v)"
              :placeholder="$t('maximun')"
              mode="currency"
              currency="USD"
              class=""
            />
          </div>
        </div>

        <!-- Filtro por clases -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">{{
            $t("categories")
          }}</label>
          <MultiSelect
            v-model="filter.classes"
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
            v-model="filter.materials"
            @update:modelValue="(v) => handleFilterUpdate('materials', v)"
            :options="availableMaterials"
            display="chip"
            class="w-full"
            optionLabel="name"
            optionValue="id"
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">{{
            $t("concerns")
          }}</label>
          <MultiSelect
            v-model="filter.concerns"
            @update:modelValue="(v) => handleFilterUpdate('concerns', v)"
            :options="availableConcerns"
            display="chip"
            class="w-full"
            optionLabel="name"
            optionValue="id"
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">{{
            $t("brands")
          }}</label>
          <MultiSelect
            v-model="filter.brands"
            @update:modelValue="(v) => handleFilterUpdate('brands', v)"
            :options="availableBrands"
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

<style scoped>
:deep(.p-select-option.p-select-option-selected.p-focus) {
  @apply !bg-lime-50 !text-black !border-none;
}

.pastel-btn {
  background-color: rgba(68, 156, 168, 1) !important;
  border: none !important;
  color: white !important;
  transition: all 0.3s ease-in-out;
}
.pastel-btn:hover {
  background-color: rgba(68, 156, 168, 0.4) !important;
}

:deep(.p-inputtext) {
  width: 100% !important;
}
</style>
