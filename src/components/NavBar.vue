<template>
  <nav
    class="p-4 z-40 box-border transition-all duration-500 font-albra-serif-bold flex flex-col header w-full top-0 opacity-95 !text-black"
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
    <div class="flex flex-row justify-between items-center">
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
      <span class="w-full flex-1 px-10 hidden sm:block">
        <SearchBar />
      </span>

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
      </div>
    </div>

    <span class="w-full flex-1 px-1 pt-3 sm:hidden block">
      <SearchBar />
    </span>

    <div
      class="flex-row gap-3 items-center w-full overflow-hidden transition-all duration-500 hidden sm:flex"
      :class="{
        'h-10 opacity-100': scrolled > 43 && scrolled_ammount >= 0,
        'h-0 opacity-0': scrolled <= 43 || scrolled_ammount < 0,
      }"
    >
      <BrandMenu />
      <CategoryMenu />

      <router-link
        class="hover:bg-gray-50/20 hover:text-zinc-950/40 text-black p-2 rounded-sm cursor-pointer text-xl hidden lg:block"
        to="/about_us"
        custom
      >
        <span>{{ $t("who_we_are") }}</span>
      </router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import LanguageSelector from "./LanguageSelector.vue";
import CurrencySelector from "@/components/Currency/CurrencySelector.vue";
import SearchBar from "./SearchBar.vue";
import Button from "primevue/button";
import CategoryMenu from "@/components/Categories/CategoryMenu.vue";
import BrandMenu from "@/components/Brands/BrandSubmenu.vue";
import { ref, onMounted } from "vue";

import { useCartStore } from "@/stores/cartStore";
const { quantity } = storeToRefs(useCartStore());

import { useRoute } from "vue-router";
import { OverlayBadge } from "primevue";
import { storeToRefs } from "pinia";

const route = useRoute();

const visible = ref(false);
const scrolled = ref<number>(0);

const scrolled_ammount = ref(-1);

onMounted(() => {
  window.addEventListener("scroll", (ev) => {
    if (Math.abs(scrolled.value - window.scrollY) >= 10) {
      scrolled_ammount.value = Math.round(scrolled.value - window.scrollY);
    }
    scrolled.value = window.scrollY;
  });
});
</script>

<style scoped>
a {
  text-transform: uppercase;
}
</style>
