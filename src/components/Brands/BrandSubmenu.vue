<template>
  <div>
    <!-- Menubar para vista de escritorio -->
    <Menubar
      v-if="!isMobile"
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

    <!-- PanelMenu para vista móvil -->
    <PanelMenu
      v-else
      :model="items"
      v-model:expandedKeys="expandedKeys"
      class="custom-panelmenu text-sm lg:text-md uppercase !border-none"
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
        >
          <span>{{ $t(item.label) }}</span>
          <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
        </a>
      </template>
    </PanelMenu>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, computed } from "vue";
import { useRouter } from "vue-router";
import Menubar from "primevue/menubar";
import PanelMenu from "primevue/panelmenu";
import { useBrandService } from "@/composables/Shop/Brand/useBrandService";
import { Pagination } from "@/utils/entities/Pagination";

const router = useRouter();
const service = useBrandService();

// Creamos una propiedad reactiva para el ancho de la ventana
const windowWidth = ref(window.innerWidth);
const isMobile = computed(() => windowWidth.value < 768); // threshold de 768px para móvil

// Listener para actualizar el ancho de la ventana
const onResize = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(async () => {
  window.addEventListener("resize", onResize);
  const data = await service.getAll([], new Pagination(0, 100), []);
  items.value = [
    {
      key: "root",
      label: "brands",
      items: buildMenuItems(data),
      expanded: true,
    },
  ];
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize);
});

const items = ref([{ key: "root", label: "brands" }]);

function buildMenuItems(brands) {
  const menuItems = [];
  brands.forEach((br) => {
    menuItems.push({
      label: br.name,
      icon: br.icon,
      items: [], // Puedes agregar sub-items si los tienes
      route: `/brand/${br.id}`,
      expanded: true,
    });
  });
  return menuItems;
}

const expandedKeys = ref({ root: true });
</script>

<style scoped>
.custom-menubar {
  background-color: transparent;
  border: none !important;
  color: black !important;
}

.custom-panelmenu {
  background-color: transparent;
  border: none !important;
  color: black !important;
}

::v-deep(.p-panelmenu-panel) {
  background-color: #ffffff;
  color: black !important;
  border: none;
}
/* Estilos para Menubar y PanelMenu (ejemplo) */
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
  background: transparent;
  color: black !important;
}
</style>
