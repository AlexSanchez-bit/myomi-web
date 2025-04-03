<template>
  <footer class="bg-yellow-50 text-black py-3 px-2 lg:p-6 text-md">
    <div
      class="container mx-auto flex flex-col gap-1 md:flex-row justify-between items-center"
    >
      <!-- Sección de marca/información -->
      <div class="md:mb-0 text-sm text-center md:text-left">
        <h3 class="text-md lg:text-xl font-bold hover-animation">
          MYOMːI ✨Cuida tu piel✨
        </h3>
      </div>

      <!-- Sección de redes sociales -->
      <div class="md:mb-0 text-center">
        <h4 class="font-semibold text-sm mb-0 hover-animation">
          Redes Sociales
        </h4>
        <div class="flex justify-center gap-1">
          <a href="https://www.facebook.com/share/18dgr1AL12/">
            <Button
              icon="pi pi-facebook"
              size="normal"
              class="p-button-rounded p-button-secondary !bg-transparent hover-animation"
              aria-label="Facebook"
            />
          </a>
          <a
            href="https://www.instagram.com/myomi_cuba?igsh=MTh4azN5dHJtY2ZmZg%3D%3D&utm_source=qr"
          >
            <Button
              icon="pi pi-instagram"
              class="p-button-rounded p-button-secondary !bg-transparent hover-animation"
              aria-label="Instagram"
            />
          </a>
        </div>
      </div>

      <!-- Sección de información de contacto -->
      <div class="text-center md:text-right">
        <h4 class="text-sm font-semibold hover-animation">Contacto</h4>
        <a href="https://wa.me/5350272812/">
          <p class="text-sm hover-animation">Tel: +53 50272812</p>
        </a>
      </div>
    </div>

    <!-- Indicador de copyright -->
    <div
      class="mt-2 border-gray-700 pt-1 text-center text-xs flex flex-row justify-center w-full"
    >
      <small class="md:translate-x-[22px] lg:translate-x-1/3"
        >&copy; {{ new Date().getFullYear() }} MYOMːI.
        {{ $t("all_rights_reserved") }}.</small
      >
    </div>
  </footer>
</template>

<script setup>
import Button from "primevue/button";
</script>

<style scoped>
.hover-animation {
  /* Opcional: puedes ajustar los colores o agregar más estilos personalizados */
  @apply hover:scale-105;
  @apply transition-all;
  @apply duration-300;
}
</style>
