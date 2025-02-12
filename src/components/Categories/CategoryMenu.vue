<template>
  <div>
    <Menubar
      breakpoint="2px"
      :model="items"
      class="!bg-transparent custom-menubar text-sm sm:text-xl"
    >
      <template #item="{ item, props, hasSubmenu }">
        <router-link
          class="hover:bg-gray-50/20"
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
            class="text-white"
          >
            <span>{{ $t(item.label) }}</span>
            <span class="pi pi-angle-right" v-if="item.items?.length > 0" />
          </a>
        </router-link>
        <a
          v-else
          v-ripple
          :href="item.url"
          :target="item.target"
          v-bind="props.action"
          class="text-white"
        >
          <span>{{ $t(item.label) }}</span>
          <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
        </a>
      </template>
    </Menubar>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Menubar from "primevue/menubar";
import Menu from "primevue/menu";
import { useCategoryService } from "@/composables/Shop/Category/useCategoryService";
const router = useRouter();

const service = useCategoryService();
import { Pagination } from "@/utils/entities/Pagination";

onMounted(async () => {
  const data = await service.getAll([], new Pagination(0, 100), []);
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
  color: white !important;
}

::v-deep(.p-menubar-submenu) {
  background-color: #4da0ab;
  color: white !important;
  border: none;
}
::v-deep(.p-menubar-item-content:hover) {
  background-color: transparent;
  color: white !important;
}

::v-deep(.p-menubar-item-content) {
  background-color: transparent !important;
  color: white !important;
}

::v-deep(.p-menubar-item-link:hover) {
  background-color: rgba(255, 255, 255, 0.27) !important;

  color: rgba(0, 0, 0, 0.47) !important;
}
::v-deep(.p-menuitem-link) {
  background-color: transparent !important;
  color: white !important;
}

::v-deep .p-menubar .p-menuitem.p-highlight > .p-menuitem-content {
  background: transparent; /* Fondo transparente */
  color: white !important;
}

::v-deep .p-menubar .p-menuitem.p-highlight > .p-menuitem-content {
  background: transparent !important;
  color: white !important;
}
</style>
