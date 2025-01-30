<template>
  <nav
    class="fixed px-4 z-40 box-border transition-all duration-500 font-albra-serif-bold flex flex-row justify-between items-center header w-full top-0 opacity-95"
    :class="{
      'text-white': scrolled <= 60 && route.path == '/',
      'text-black': scrolled > 43,
      'pt-2 ': scrolled <= 43 && route.path == '/',
      'pt-1 ': scrolled > 43 || route.path != '/',
      'bg-darkblue': scrolled > 43 || route.path != '/',
      'bg-transparent': scrolled < 43 && route.path === '/',
      fixed: scrolled > 100 || route.path != '/',
    }"
  >
    <div
      class="flex flex-col z-10 gap-2 justify-center items-center bg-white rounded-full"
    >
      <img
        src="/logo/logo.png"
        :class="{
          hidden: scrolled > 43 || route.path != '/',
          block: scrolled <= 43,
        }"
        class="h-20 opacity-1 transition-all duration-200"
      />
      <img
        src="/logo/logo.png"
        class="h-20 opacity-1 transition-all duration-200"
        :class="{
          hidden: scrolled <= 43 && route.path === '/',
          block: scrolled > 43 || route.path != '/',
        }"
      />
    </div>
    <div class="flex flex-row items-center gap-3">
      <span class="">
        <LanguageSelector />
      </span>
      <CurrencySelector />
      <Button
        icon="pi pi-bars"
        class="block sm:hidden"
        @click="visible = true"
      />
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
        class="bg-yellow-200 h-full sm:pt-16 flex flex-row gap-3 justify-between z-50 items-center px-5 pt-10 sm:px-20 box-border"
      >
        <img src="/logo/logo.png" class="h-20 z-50 brightness-0" />
        <div class="sm:flex flex-row items-center gap-3 hidden">
          <LanguageSelector />
          <Button icon="pi pi-bars" @click="closeCallback" />
        </div>
        <Button
          type="button"
          @click="closeCallback"
          icon="pi pi-times"
          rounded
          outlined
          class="h-2rem w-2rem sm:hidden"
        ></Button>
      </div>

      <div
        class="sm:px-32 px-10 bg-wood text-xl text-darkblue pt-10 box-border font-albra-serif-bold uppercase"
      >
        {{ $t("slogan") }}
      </div>
      <div class="w-full bg-wood pt-2">
        <div class="sm:mx-32 mx-10 bg-darkblue text-xl pt-0.5 box-border"></div>
      </div>

      <div
        class="bg-wood sm:px-32 px-10 flex flex-col justify-start items-start pt-8 pb-4 gap-2 text-darkblue"
      >
        <router-link to="/">
          <div @click="closeCallback" class="flex flex-row gap-1 items-center">
            <a
              class="font-albra-serif-regular text-lg decoration-brick hover:text-grass hover:underline"
              >{{ $t("menu.main") }}</a
            >
            <i class="pi pi-angle-right text-lg mt-1"></i>
          </div>
        </router-link>
        <router-link to="/#rooms">
          <div @click="closeCallback" class="flex flex-row gap-1 items-center">
            <a
              href="#rooms"
              class="font-albra-serif-regular text-lg decoration-brick hover:text-grass hover:underline"
              >{{ $t("menu.rooms") }}</a
            >
            <i class="pi pi-angle-right text-lg mt-1"></i>
          </div>
        </router-link>
        <router-link to="/#activities">
          <div @click="closeCallback" class="flex flex-row gap-1 items-center">
            <a
              href="#activities"
              class="font-albra-serif-regular text-lg decoration-brick hover:text-grass hover:underline"
              >{{ $t("menu.activities") }}</a
            >
            <i class="pi pi-angle-right text-lg mt-1"></i>
          </div>
        </router-link>
        <router-link to="/#excursions">
          <div @click="closeCallback" class="flex flex-row gap-1 items-center">
            <a
              href="#excursions"
              class="font-albra-serif-regular text-lg decoration-brick hover:text-grass hover:underline"
              >{{ $t("menu.excursions") }}</a
            >
            <i class="pi pi-angle-right text-lg mt-1"></i>
          </div>
        </router-link>

        <router-link to="/#events">
          <div @click="closeCallback" class="flex flex-row gap-1 items-center">
            <a
              href="#retreats"
              class="font-albra-serif-regular text-lg decoration-brick hover:text-grass hover:underline"
              >{{ $t("menu.events") }}</a
            >
            <i class="pi pi-angle-right text-lg mt-1"></i>
          </div>
        </router-link>

        <router-link to="/#retreats">
          <div @click="closeCallback" class="flex flex-row gap-1 items-center">
            <a
              href="#retreats"
              class="font-albra-serif-regular text-lg decoration-brick hover:text-grass hover:underline"
              >{{ $t("menu.retreats") }}</a
            >
            <i class="pi pi-angle-right text-lg mt-1"></i>
          </div>
        </router-link>

        <router-link to="/#team_building">
          <div @click="closeCallback" class="flex flex-row gap-1 items-center">
            <a
              href="#team_building"
              class="font-albra-serif-regular text-lg decoration-brick hover:text-grass hover:underline"
              >{{ $t("menu.team_building") }}</a
            >
            <i class="pi pi-angle-right text-lg mt-1"></i>
          </div>
        </router-link>

        <router-link to="/#eco_friendly">
          <div @click="closeCallback" class="flex flex-row gap-1 items-center">
            <a
              href="#eco_friendly"
              class="font-albra-serif-regular text-lg decoration-brick hover:text-grass hover:underline"
              >{{ $t("menu.eco_friendly") }}</a
            >
            <i class="pi pi-angle-right text-lg mt-1"></i>
          </div>
        </router-link>

        <router-link to="/#rosario_comunity">
          <div @click="closeCallback" class="flex flex-row gap-1 items-center">
            <a
              class="font-albra-serif-regular text-lg decoration-brick hover:text-grass hover:underline"
              >{{ $t("menu.rosario_comunity") }}</a
            >
            <i class="pi pi-angle-right text-lg mt-1"></i>
          </div>
        </router-link>

        <router-link to="/#our_values">
          <div @click="closeCallback" class="flex flex-row gap-1 items-center">
            <a
              href="#our_values"
              class="font-albra-serif-regular text-lg decoration-brick hover:text-grass hover:underline"
              >{{ $t("menu.our_values") }}</a
            >
            <i class="pi pi-angle-right text-lg mt-1"></i>
          </div>
        </router-link>

        <router-link to="/#pricings">
          <div @click="closeCallback" class="flex flex-row gap-1 items-center">
            <a
              class="font-albra-serif-regular text-lg decoration-brick hover:text-grass hover:underline"
              >{{ $t("menu.prices") }}</a
            >
            <i class="pi pi-angle-right text-lg mt-1"></i>
          </div>
        </router-link>

        <router-link to="/#directions">
          <div @click="closeCallback" class="flex flex-row gap-1 items-center">
            <a
              class="font-albra-serif-regular text-lg decoration-brick hover:text-grass hover:underline"
              >{{ $t("menu.directions") }}</a
            >
            <i class="pi pi-angle-right text-lg mt-1"></i>
          </div>
        </router-link>
      </div>
    </template>
  </Sidebar>
</template>

<script setup lang="ts">
import LanguageSelector from "./LanguageSelector.vue";
import CurrencySelector from "@/components/Currency/CurrencySelector.vue";
import Sidebar from "primevue/sidebar";
import Button from "primevue/button";

import { ref, onMounted } from "vue";

import { useRoute } from "vue-router";

const route = useRoute();

console.log(route.path);

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
