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

      <div class="flex flex-row items-center justify-between">
        <div>
          <SubCategories
            :parent_category="parseInt(route.params.id as string)"
          />
          <LazyLoadScroll
            :service="lazyLister"
            :filter="{}"
            display-class="transition-all duration-1000 ease-in-out flex flex-wrap  gap-2 px-1"
          >
            <template #item="{ item }">
              <ProductItem :product="item" class="w-full md:w-1/3 lg:w-1/5" />
            </template>
            <template #skeletons>
              <Skeleton class="!w-11/12 !h-80" />
            </template>
          </LazyLoadScroll>
        </div>
      </div>
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
const home = ref({
  icon: "pi pi-home",
});
const items = ref([]);

const service = useCategoryService();

const category = ref<ICategory | null>(null);
const sub_category = ref<ICategory[]>([]);

const toast = useToastStorage();

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
          matchMode: FilterMatchMode.EQUALS,
          value: route.params.id,
        },
      ],
      new Pagination(page, limit),
      [],
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
