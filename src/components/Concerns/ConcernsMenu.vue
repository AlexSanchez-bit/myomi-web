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
          v-if="item.route"
          class="hover:bg-gray-50/20"
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
      v-model:expandedKeys="expandedKeys"
      :model="items"
      class="custom-panelmenu text-sm lg:text-md uppercase !border-none"
    >
      <template #item="{ item, props, hasSubmenu }">
        <router-link
          v-if="item.route"
          class="hover:bg-gray-50/20"
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
          class="text-black"
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
import { useConcernsService } from "@/composables/Shop/Concerns/useConcernsService";
import { Pagination } from "@/utils/entities/Pagination";

const router = useRouter();
const service = useConcernsService();

// Propiedad reactiva para detectar el ancho de la ventana
const windowWidth = ref(window.innerWidth);
const isMobile = computed(() => windowWidth.value < 768); // Umbral de 768px para móvil

const onResize = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(async () => {
  window.addEventListener("resize", onResize);
  const data = await service.getAll([], new Pagination(0, 100), []);
  items.value = [
    {
      key: "root",
      label: "concerns",
      items: buildMenuItems(data),
    },
  ];
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize);
});

const items = ref([
  {
    key: "root",
    label: "concerns",
  },
]);

function buildMenuItems(concerns) {
  const map = {};
  const menuItems = [];

  // Se crea un objeto para cada concern
  concerns.forEach((concern) => {
    map[concern.id] = {
      label: concern.name,
      icon: concern.icon,
      route: `/product?concern=${concern.id}`,
    };
  });

  // Se recorre el arreglo para formar el listado de primer nivel
  concerns.forEach((concern) => {
    menuItems.push(map[concern.id]);
  });
  return menuItems;
}

const expandedKeys = ref({ root: true });
</script>

<style scoped>
.custom-menubar {
  background-color: transparent;
  border: none;
  color: black !important;
}

.custom-panelmenu {
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
  background: transparent;
  color: black !important;
}

::v-deep(.p-panelmenu-panel) {
  background-color: #ffffff;
  color: black !important;
  border: none;
}
</style>
