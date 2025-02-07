<template>
  <nav
    class="p-4 z-40 box-border transition-all duration-500 font-albra-serif-bold flex flex-row justify-between items-center header w-full top-0 opacity-95 !text-black"
    :class="{
      'text-white': scrolled <= 60 && route.path == '/',
      'text-black': scrolled > 43,
      'py-4 ': scrolled <= 43 && route.path == '/',
      'py-2 ': scrolled > 43 || route.path != '/',
      'bg-darkblue ': scrolled > 43 || route.path != '/',
      'bg-transparent ': scrolled < 43 && route.path === '/',
      fixed: route.path == '/',
      sticky: route.path != '/',
    }"
  >
    <router-link
      to="/"
      class="flex flex-col z-10 gap-2 justify-center items-center bg-white rounded-full"
    >
      <img
        src="/logo/logo.png"
        :class="{
          hidden: scrolled > 43 || route.path != '/',
          block: scrolled <= 43,
        }"
        class="h-16 opacity-1 transition-all duration-200"
      />
      <img
        src="/logo/logo.png"
        class="h-16 opacity-1 transition-all duration-200"
        :class="{
          hidden: scrolled <= 43 && route.path === '/',
          block: scrolled > 43 || route.path != '/',
        }"
      />
    </router-link>
    <div class="flex flex-row gap-3 items-center">
      <CategoryMenu class="hidden lg:block" />

      <router-link
        class="hover:bg-gray-50/20 hover:text-zinc-950/40 text-white p-2 rounded-sm cursor-pointer text-xl hidden lg:block"
        to="/about_us"
        custom
      >
        <span>{{ $t("who_we_are") }}</span>
      </router-link>
    </div>

    <div class="flex-row items-center gap-3 flex">
      <span class="!mb-0">
        <LanguageSelector class="brightness-200" />
      </span>
      <CurrencySelector />
      <router-link :to="{ name: 'cart' }">
        <OverlayBadge
          :value="quantity"
          class="scale-75"
          size="small"
          severity="danger"
        >
          <i
            class="pi-shopping-cart pi scale-[150%]"
            style="font-size: 1.3rem"
          ></i>
        </OverlayBadge>
      </router-link>
      <div class="lg:hidden text-white ml-6">
        <Button
          icon="pi pi-bars"
          class="bg-transparent border-none text-xl"
          variant="text"
          unstyled
          @click="visible = true"
        />
      </div>
    </div>
  </nav>
  <Sidebar
    v-model:visible="visible"
    position="top"
    header="Sidebar"
    class="h-fit z-50"
  >
    <template #container="{ closeCallback }">
      <div
        class="bg-darkblue h-full sm:pt-16 pb-3 flex flex-row gap-3 justify-between z-50 items-center px-5 pt-10 sm:px-20 box-border"
      >
        <picture class="overflow-hidden rounded-full bg-white">
          <img src="/logo/logo.png" class="h-20 z-50" />
        </picture>
        <Button
          type="button"
          @click="closeCallback"
          icon="pi pi-times"
          rounded
          outlined
          unstyled
          class="h-3rem w-3rem"
        ></Button>
      </div>

      <div
        class="sm:px-32 px-10 bg-darkblue text-xl text-white pt-10 box-border font-albra-serif-bold uppercase"
      >
        {{ $t("slogan") }}
      </div>
      <div class="w-full bg-darkblue pt-2">
        <div class="mx-10 bg-white text-xl pt-0.5 box-border"></div>
      </div>

      <div
        class="bg-darkblue flex flex-col justify-start items-start pt-8 pb-4 gap-2 text-white px-3"
      >
        <CategoryMenu />
      </div>
    </template>
  </Sidebar>
</template>

<script setup lang="ts">
import LanguageSelector from "./LanguageSelector.vue";
import CurrencySelector from "@/components/Currency/CurrencySelector.vue";
import Sidebar from "primevue/sidebar";
import Button from "primevue/button";
import CategoryMenu from "@/components/Categories/CategoryMenu.vue";
import { ref, onMounted } from "vue";

import { useCartStore } from "@/stores/cartStore";
const { quantity } = storeToRefs(useCartStore());

import { useRoute } from "vue-router";
import { OverlayBadge } from "primevue";
import { storeToRefs } from "pinia";

const route = useRoute();

const visible = ref(false);
const scrolled = ref<number>(0);

onMounted(() => {
  window.addEventListener("scroll", (ev) => {
    scrolled.value = window.scrollY;
  });
});
</script>

<style scoped>
a {
  text-transform: uppercase;
}
</style>
