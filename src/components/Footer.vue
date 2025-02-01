<template>
  <footer class="bg-darkblue text-white py-6 px-4">
    <div
      class="container mx-auto flex flex-col md:flex-row justify-between items-center"
    >
      <!-- Sección de marca/información -->
      <div class="mb-4 md:mb-0 text-center md:text-left">
        <h3 class="text-2xl font-bold">Myomi cuida tu piel</h3>
        <p class="mt-2 text-sm"></p>
      </div>

      <!-- Sección de redes sociales -->
      <div class="mb-4 md:mb-0 text-center">
        <h4 class="text-xl font-semibold mb-2">Redes Sociales</h4>
        <div class="flex justify-center gap-4">
          <Button
            icon="pi pi-facebook"
            class="p-button-rounded p-button-secondary"
            aria-label="Facebook"
          />
          <Button
            icon="pi pi-instagram"
            class="p-button-rounded p-button-secondary"
            aria-label="Instagram"
          />
          <Button
            icon="pi pi-twitter"
            class="p-button-rounded p-button-secondary"
            aria-label="Twitter"
          />
          <Button
            icon="pi pi-youtube"
            class="p-button-rounded p-button-secondary"
            aria-label="Youtube"
          />
        </div>
      </div>

      <!-- Sección de información de contacto -->
      <div class="text-center md:text-right">
        <h4 class="text-xl font-semibold mb-2">Contacto</h4>
        <p class="text-sm">123 Calle Principal, Ciudad, País</p>
        <p class="text-sm">Tel: +123 456 7890</p>
        <p class="text-sm">Email: contacto@koreanskincare.com</p>
      </div>
    </div>

    <!-- Indicador de copyright -->
    <div class="mt-6 border-t border-gray-700 pt-4 text-center text-xs">
      <p>&copy; 2025 Korean Skincare Store. Todos los derechos reservados.</p>
    </div>
  </footer>
</template>

<script setup>
import Button from "primevue/button";
</script>

<style scoped>
footer {
  /* Opcional: puedes ajustar los colores o agregar más estilos personalizados */
}
</style>
