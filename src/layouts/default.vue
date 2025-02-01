<template>
  <NavBar />
  <router-view v-slot="{ Component }">
    <transition name="page-opacity" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  <Footer />
</template>
<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
</script>

<style scoped>
/* La clase para la fase activa de la transición en la entrada y salida */
.page-opacity-enter-active,
.page-opacity-leave-active {
  transition: opacity 0.5s ease; /* Puedes ajustar la duración y el timing-function según necesites */
}

/* Estado inicial de la entrada y estado final de la salida (transparente) */
.page-opacity-enter-from,
.page-opacity-leave-to {
  opacity: 0;
}

/* Estado final de la entrada y estado inicial de la salida (visible) */
.page-opacity-enter-to,
.page-opacity-leave-from {
  opacity: 1;
}
</style>
