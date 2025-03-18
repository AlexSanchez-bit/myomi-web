<template>
  <div
    :class="{
      'opacity-0': !visible,
      'opacity-100': visible,
    }"
    class="fixed z-50 bottom-0 left-6 -translate-y-1/2 rounded-full p-1 pb-2 px-2 bg-white shadow-xl transition-all duration-300"
  >
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="opacity-0 translate-y-0 top-0"
      enter-to-class="opacity-100 -translate-y-12"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100  -translate-y-12"
      leave-to-class="opacity-0 translate-y-0"
    >
      <Card
        v-if="menuVisible && !isMobile"
        class="hidden md:block absolute mt-2 left-0 bottom-full min-w-64 overflow-hidden !p-0 bg-white shadow-lg rounded-lg transition-all duration-300"
      >
        <template #title>
          <div class="flex flex-row justify-between items-center">
            <span>{{ $t("monthly_gifts") }}</span>
            <Button
              icon="pi pi-times"
              class="p-button-rounded p-button-text p-button-plain"
              @click="toggleMenu"
            />
          </div>
        </template>
        <template #content>
          <div v-html="promotions"></div>
        </template>
      </Card>
    </transition>

    <Sidebar
      class="md:!hidden !block"
      v-model:visible="menuVisible"
      v-if="isMobile"
      position="bottom"
      :style="{ height: '70dvh', borderRadius: '1rem 1rem 0 0' }"
      :header="$t('monthly_gifts')"
    >
      <div v-html="promotions"></div>
    </Sidebar>

    <Img
      src="/gift_box.png"
      class="h-10 md:h-16 cursor-pointer"
      imageClass="h-10 md:h-16"
      @click="toggleMenu"
    />

    <!-- Panel que se despliega debajo de la imagen -->
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import Card from "primevue/card";
import { Button } from "primevue";
import Sidebar from "primevue/sidebar";

const visible = ref(false);
const menuVisible = ref(false);

const isMobile = computed(() => window.innerWidth <= 768);

const props = defineProps<{
  promotions: string;
}>();

// Alterna la visibilidad del panel al hacer click en la imagen
const toggleMenu = () => {
  menuVisible.value = !menuVisible.value;
};

// Detecta el 65% de scroll para mostrar la imagen (y con ello la posibilidad de desplegar el panel)
onMounted(() => {
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const scrollPercentage =
      (scrollTop / (documentHeight - windowHeight)) * 100;

    visible.value = scrollPercentage >= 65;
  });
});
</script>

<style scoped>
:deep(.p-card-body) {
  padding: 0.4rem;
}
</style>
