<template>
  <div class="min-h-screen">
    <Breadcrumb
      :home="home"
      class="bg-transparent py-2 mr-auto px-4"
      unstyled
      :model="items"
    ></Breadcrumb>
    <div class="w-full">
      <div class="flex flex-row items-center justify-center">
        <h6
          class="text-4xl my-6 underline decoration-darkblue text-darkblue underline-offset-8"
          ref="container"
        >
          {{ $t(category?.name ?? "") }}
        </h6>
      </div>

      <ProductFilters
        @update:filters="updateFilters"
        @update:sort="updateSort"
        :filters="{ sort: 'recent' }"
      >
        <div>
          <SubCategories
            :parent_category="parseInt(route.params.id as string)"
            class="w-full mb-3"
          />
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
      </ProductFilters>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import Breadcrumb from "primevue/breadcrumb";

const route = useRoute();
import { onMounted, ref } from "vue";
import { useCategoryService } from "@/composables/Shop/Category/useCategoryService";
import { FilterMatchMode } from "@primevue/core/api";
import { Pagination } from "@/utils/entities/Pagination";
import type { ICategory } from "@/services/Shops/Categories/Category.service";
import { useToastStorage } from "@/stores/ToasterStorage";
import { useProductService } from "@/composables/Shop/Product/useProductService";
import type { IGenericLister } from "@/utils/entities/IGenericLister";
import type { IProduct } from "@/services/Shops/Products/Products.service";
import LazyLoadScroll from "@/components/LazyLoadScroll.vue";
import type { IResponseModel } from "@/utils/entities/ResponseModel";
import type { IListResponse } from "@/utils/entities/IListResponse";
import { Skeleton } from "primevue";
import ProductItem from "@/components/Product/ProductItem.vue";
import SubCategories from "@/components/Categories/SubCategories.vue";
import ProductFilters from "@/components/Product/ProductFilters.vue";
import { Filters } from "@/components/Product/Filters";
import { Filter } from "@/utils/entities/Filter";
import type { Sorter } from "@/utils/entities/Sorters";
const home = ref({
  icon: "pi pi-home",
});
const items = ref([]);

const service = useCategoryService();

const category = ref<ICategory | null>(null);
const sub_category = ref<ICategory[]>([]);

const toast = useToastStorage();

const filter_array = ref<Filter[]>([]);
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
      sort.value = [{ field: "price", order: 1 }];
    }
    if (_sort == "price_desc") {
      sort.value = [{ field: "price", order: -1 }];
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
      field: "material",
      value: filters.materials,
      matchMode: FilterMatchMode.IN,
      condition: !!filters.materials?.length,
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

onMounted(async () => {
  category.value = await service.getDetails(
    parseInt(route.params.id as string),
  );

  if (!category.value) {
    toast.notify(
      "error",
      "Ocurrio un error",
      "No se encontro la categoría",
      4000,
    );
  }
  const resp = await service.getAll(
    [
      {
        field: "parent",
        matchMode: FilterMatchMode.EQUALS,
        value: route.params.id,
      },
    ],
    new Pagination(0, 100),
    [],
  );
  sub_category.value = resp;
});

const product_service = useProductService();

const lazyLister: IGenericLister<IProduct> = {
  GetAll: async (page: number, limit: number, filter: any) => {
    const resp = await product_service.getAllTotalCount(
      [
        {
          field: "product_category.category_id",
          matchMode: FilterMatchMode.IN,
          value: [route.params.id],
        },
        ...filter_array.value,
      ],
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
