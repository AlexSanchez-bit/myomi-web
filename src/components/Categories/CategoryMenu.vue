<template>
  <Menubar :model="items" class="!bg-transparent custom-menubar">
    <template #item="{ item, props, hasSubmenu }">
      <router-link
        v-if="item.route"
        v-slot="{ href, navigate }"
        :to="item.route"
        custom
      >
        <a
          v-ripple
          :href="href"
          v-bind="props.action"
          @click="navigate"
          class="text-black"
        >
          <span>{{ item.label }}</span>
          <span class="pi pi-angle-right" v-if="item.items?.length > 0" />
        </a>
      </router-link>
      <a
        v-else
        v-ripple
        :href="item.url"
        :target="item.target"
        v-bind="props.action"
      >
        <span :class="item.icon" />
        <span>{{ item.label }}</span>
        <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
      </a>
    </template>
  </Menubar>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Menubar from "primevue/menubar";
import { useCategoryService } from "@/composables/Shop/Category/useCategoryService";
const router = useRouter();

const service = useCategoryService();
import { Pagination } from "@/utils/entities/Pagination";

onMounted(async () => {
  const data = await service.getAll([], new Pagination(0, 100), []);
  console.log(data);
  items.value = [
    {
      label: "categories",
      items: buildMenuItems(data),
    },
  ];
});

const items = ref([]);

function buildMenuItems(categories) {
  // Mapa para almacenar cada categoría transformada por su id
  const map = {};

  // Arreglo donde se guardarán los elementos de primer nivel
  const menuItems = [];

  // Primero, creamos un objeto para cada categoría en el formato deseado.
  categories.forEach((cat) => {
    map[cat.id] = {
      label: cat.name,
      // Se usa el icon proporcionado; en tu caso es una URL, pero
      // podrías asignar iconos de PrimeVue u otro formato si lo requieres.
      icon: cat.icon,
      // Opcional: podrías agregar una propiedad de ruta o comando,
      // por ejemplo: route: `/category/${cat.id}`
      items: [], // Se llenará con los hijos, si existen.
      route: `/category/${cat.id}`,
    };
  });

  // Ahora recorremos nuevamente el arreglo para anidar los elementos.
  categories.forEach((cat) => {
    if (cat.parent) {
      // Si la categoría tiene un padre, se anida dentro de su objeto padre.
      if (map[cat.parent]) {
        map[cat.parent].items.push(map[cat.id]);
      }
    } else {
      // Si no tiene padre, es un elemento de primer nivel.
      menuItems.push(map[cat.id]);
    }
  });

  // (Opcional) Limpiar la propiedad "items" de aquellos objetos que no tienen hijos.
  menuItems.forEach(function removeEmptyItems(item) {
    if (item.items && item.items.length === 0) {
      delete item.items;
    } else if (item.items && item.items.length > 0) {
      item.items.forEach(removeEmptyItems);
    }
  });

  return menuItems;
}
</script>

<style scoped>
.custom-menubar {
  background-color: transparent;
  border: none;
}

::v-deep(.p-submenu-list) {
  background-color: #4da0ab;
  border: none;
}
::v-deep(.p-menuitem-content:hover) {
  background-color: transparent;
}

::v-deep(.p-menuitem-content) {
  background-color: transparent !important;
}

::v-deep(.p-menuitem-link:hover) {
  background-color: transparent;
  color: #111101 !important;
}
::v-deep(.p-menuitem-link) {
  background-color: transparent !important;
  color: white !important;
}

::v-deep .p-menubar .p-menuitem.p-highlight > .p-menuitem-content {
  background: transparent; /* Fondo transparente */
}

::v-deep .p-menubar .p-menuitem.p-highlight > .p-menuitem-content {
  background: transparent !important;
}
</style>
