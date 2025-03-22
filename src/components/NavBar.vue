<template>
  <nav
    class="p-2 sticky z-40 box-border transition-all duration-500 font-albra-serif-bold flex flex-col header w-full top-0 opacity-95 !text-black bg-white"
    :class="{
      'text-white': scrolled <= 60 && route.path == '/',
      'text-black': scrolled > 43,
    }"
  >
    <div class="flex flex-row justify-between items-center">
      <router-link
        to="/"
        class="flex flex-row z-10 justify-center items-center bg-white rounded-full"
      >
        <img
          src="/logo/logo.png"
          class="h-12 sm:h-20 opacity-1 transition-all duration-200"
        />
      </router-link>

      <span class="w-full flex-1 px-3 hidden sm:block">
        <SearchBar />
      </span>

      <div class="flex-row items-center gap-3 sm:!text-xl flex">
        <span class="w-full flex-1 px-3 md:hidden">
          <SearchBar />
        </span>
        <!-- <LanguageSelector class="brightness-200 mb-0" /> -->
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
        <router-link :to="{ name: 'user.profile' }">
          <i class="pi pi-user sm:scale-150 ml-1"></i>
        </router-link>
        <Button
          icon="pi pi-ellipsis-v"
          @click="sidebarVisible = true"
          class="p-button-rounded p-button-text p-button-plain !block md:!hidden"
        />
      </div>
    </div>

    <div
      class="flex-row gap-3 items-center w-full overflow-hidden transition-all duration-500 hidden md:flex"
      :class="{
        'h-8 opacity-100': scrolled_ammount >= 0,
        'h-0 opacity-0': scrolled_ammount < 0 && scrolled > 50,
      }"
    >
      <BrandMenu />
      <CategoryMenu />
      <ConcernMenu />

      <router-link
        class="hover:bg-gray-50/20 hover:text-zinc-950/40 text-black p-2 rounded-sm cursor-pointer lg:text-md hidden sm:block uppercase"
        to="/about_us"
        custom
      >
        <span>{{ $t("who_we_are") }}</span>
      </router-link>
    </div>
  </nav>

  <SideBar v-model:visible="sidebarVisible" position="right" class="md:hidden">
    <BrandMenu />
    <CategoryMenu />
    <ConcernMenu />

    <router-link
      class="hover:bg-gray-50/20 hover:text-zinc-950/40 text-black rounded-sm cursor-pointer uppercase"
      to="/about_us"
      custom
    >
      <span>{{ $t("who_we_are") }}</span>
    </router-link>
  </SideBar>
</template>

<script setup lang="ts">
import LanguageSelector from "./LanguageSelector.vue";
import CurrencySelector from "@/components/Currency/CurrencySelector.vue";
import SearchBar from "./SearchBar.vue";
import ConcernMenu from "@/components/Concerns/ConcernsMenu.vue";
import Button from "primevue/button";
import CategoryMenu from "@/components/Categories/CategoryMenu.vue";
import BrandMenu from "@/components/Brands/BrandSubmenu.vue";
import { watch, ref, onMounted } from "vue";
import SideBar from "primevue/sidebar";

const sidebarVisible = ref(false);

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

watch(
  () => route.path,
  () => {
    sidebarVisible.value = false;
  },
);
</script>

<style scoped>
a {
  text-transform: uppercase;
}
</style>
