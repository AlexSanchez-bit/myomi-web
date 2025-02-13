<template>
  <div></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Menubar from "primevue/menubar";
import Menu from "primevue/menu";
import { useBrandService } from "@/composables/Shop/Brand/useBrandService";
const router = useRouter();

const service = useBrandService();
import { Pagination } from "@/utils/entities/Pagination";

onMounted(async () => {
  const data = await service.getAll([], new Pagination(0, 100), []);
  items.value = [...data];
});

const items = ref([]);

function buildMenuItems(brands) {
  const map = {};

  const menuItems = [];

  brands.forEach((br) => {
    map[br.id] = {
      label: br.name,
      // Se usa el icon proporcionado; en tu caso es una URL, pero
      // podrías asignar iconos de PrimeVue u otro formato si lo requieres.
      icon: br.icon,
      // Opcional: podrías agregar una propiedad de ruta o comando,
      // por ejemplo: route: `/category/${cat.id}`
      items: [], // Se llenará con los hijos, si existen.
      route: `/brand/${br.id}`,
    };
    menuItems.push(map[br.id]);
  });

  return menuItems;
}
</script>

<style scoped></style>
