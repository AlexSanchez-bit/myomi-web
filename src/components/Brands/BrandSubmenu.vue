<template>
  <div>
    <Menubar
      breakpoint="2px"
      :model="items"
      class="!bg-transparent custom-menubar text-sm lg:text-md uppercase"
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
import { useBrandService } from "@/composables/Shop/Brand/useBrandService";
const router = useRouter();

const service = useBrandService();
import { Pagination } from "@/utils/entities/Pagination";

onMounted(async () => {
  const data = await service.getAll([], new Pagination(0, 100), []);
  items.value = [
    {
      label: "brands",
      items: buildMenuItems(data),
    },
  ];
});

const items = ref([{ label: "brands" }]);

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

<style scoped>
.custom-menubar {
  background-color: transparent;
  border: none;
  color: black !important;
}

::v-deep(.p-menubar-submenu) {
  background-color: #ffffff;
  color: black !important;
  border: none;
}
::v-deep(.p-menubar-item-content:hover) {
  background-color: transparent;
  color: black !important;
}

::v-deep(.p-menubar-item-content) {
  background-color: transparent !important;
  color: black !important;
}

::v-deep(.p-menubar-item-link:hover) {
  background-color: rgba(255, 255, 255, 0.27) !important;

  color: rgba(0, 0, 0, 0.47) !important;
}
::v-deep(.p-menuitem-link) {
  background-color: transparent !important;
  color: black !important;
}

::v-deep .p-menubar .p-menuitem.p-highlight > .p-menuitem-content {
  background: transparent; /* Fondo transparente */
  color: black !important;
}

::v-deep .p-menubar .p-menuitem.p-highlight > .p-menuitem-content {
  background: transparent !important;
  color: black !important;
}
</style>
