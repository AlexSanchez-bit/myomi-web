<template>
  <div class="min-h-screen overflow-hidden">
    <Tabs v-model:value="currentTab" class="w-full justify-center !text-md">
      <TabList class="!overflow-auto">
        <Tab :value="null">{{ $t("all") }}</Tab>
        <Tab value="CREATED">{{ $t("created") }}</Tab>
        <Tab value="PAID">{{ $t("paid") }}</Tab>
        <Tab value="CANCELED">{{ $t("canceled") }}</Tab>
      </TabList>
    </Tabs>
    <LazyLoadScroll
      ref="lazyScroll"
      :service="lazyLister"
      :filter="filter"
      display-class="flex flex-wrap gap-2 p-4 justify-center items-center"
    >
      <template #item="{ item }">
        <OrderCard :order="item" class="mx-auto w-full" />
      </template>
      <template #skeletons>
        <Skeleton class="w-full md:w-1/3 lg:w-1/4 xl:w-1/5 !h-80" />
      </template>
    </LazyLoadScroll>
  </div>
</template>

<script setup lang="ts">
import Tabs from "primevue/tabs";
import TabList from "primevue/tablist";
import Tab from "primevue/tab";
import LazyLoadScroll from "@/components/LazyLoadScroll.vue";
import { useOrderService } from "@/composables/Order/useOrderService";
import type { IOrder } from "@/services/Order/OrderService";
import type { IGenericLister } from "@/utils/entities/IGenericLister";
import { Pagination } from "@/utils/entities/Pagination";
import type { IResponseModel } from "@/utils/entities/ResponseModel";
import type { IListResponse } from "@/utils/entities/IListResponse";
import OrderCard from "@/components/Order/OrderCard.vue";
const service = useOrderService();
import { useAuthStore } from "@/stores/AuthStore";

const { userData, anonymous } = useAuthStore();
import { FilterMatchMode } from "@primevue/core/api";
import { Skeleton } from "primevue";
import { watch, ref } from "vue";

const lazyScroll = ref();

const currentTab = ref(null);
const filter = ref({});

watch(currentTab, async () => {
  const nv = currentTab.value;
  (filter.value = nv
    ? {
        field: "status",
        matchMode: FilterMatchMode.EQUALS,
        value: nv,
      }
    : {}),
    await lazyScroll.value.apply_filters(filter.value);
});

const lazyLister: IGenericLister<IOrder> = {
  GetAll: async (page: number, limit: number, filter: any) => {
    const default_filter = {
      field: anonymous ? "session_id" : "user_id",
      matchMode: FilterMatchMode.EQUALS,
      value: userData.id,
    };

    console.log(filter);
    const resp = await service.getAllTotalCount(
      [default_filter, filter],
      new Pagination(page, limit),
      [],
    );

    return {
      data: {
        items: resp.data,
        totalPages: Math.floor(resp.totalCount / limit),
      },
      error: resp == null ? {} : null,
    } as IResponseModel<IListResponse<IOrder>>;
  },
};
</script>
<style scoped>
:deep(.p-tab-active) {
  @apply !text-black !decoration-black !border-none;
}
</style>
