<template>
  <!-- Dialog para desktop -->
  <Dialog
    v-model:visible="visible"
    header="Seleccionar Contacto"
    :modal="true"
    class="p-fluid"
    v-if="!isMobile && !loading"
  >
    <!-- Lista de contactos -->
    <div v-if="loading" class="text-center">
      <ProgressSpinner />
    </div>
    <div v-else>
      <div
        v-for="contact in contacts"
        :key="contact.id"
        class="p-1 border rounded-xl cursor-pointer hover:bg-pink-50"
        @click="selectContact(contact)"
      >
        <p class="font-semibold">{{ contact.name }}</p>
        <p class="text-sm text-gray-600">{{ contact.phone_number }}</p>
        <p class="text-sm text-gray-600">
          {{ contact.address }}- {{ contact.municipality.name }}
        </p>
      </div>
      <div
        v-if="!contacts || contacts.length == 0"
        class="flex flex-col items-center justify-center"
      >
        <h5>{{ $t("no_contacts") }}</h5>
      </div>
    </div>
  </Dialog>

  <!-- SlideOver para móvil -->
  <Sidebar
    v-model:visible="visible"
    position="bottom"
    :style="{ height: '70dvh', borderRadius: '1rem 1rem 0 0' }"
    header="Seleccionar Contacto"
    v-if="isMobile && !loading"
  >
    <!-- Lista de contactos -->
    <div v-if="loading" class="text-center">
      <ProgressSpinner />
    </div>
    <div v-else>
      <div
        v-for="contact in contacts"
        :key="contact.id"
        class="p-1 border rounded-xl cursor-pointer hover:bg-pink-50"
        @click="selectContact(contact)"
      >
        <p class="font-semibold">{{ contact.name }}</p>
        <p class="text-sm text-gray-600">{{ contact.phone_number }}</p>
        <p class="text-sm text-gray-600">
          {{ contact.address }}- {{ contact.municipality.name }}
        </p>
      </div>
      <div
        v-if="!contacts || contacts.length == 0"
        class="flex flex-col items-center justify-center"
      >
        <h5>{{ $t("no_contacts") }}</h5>
      </div>
    </div>
  </Sidebar>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

import Dialog from "primevue/dialog";
import Sidebar from "primevue/sidebar";
import ProgressSpinner from "primevue/progressspinner";
import { useUserService } from "@/composables/Users/useUserService";
import { useAuthStore } from "@/stores/AuthStore";

const props = defineProps({
  locationId: { type: Number, required: true },
});

const visible = defineModel<boolean>();

const emit = defineEmits(["update:visible", "select-contact"]);

// Estado del componente
const contacts = ref<any[]>([]);
const loading = ref(true);

// Detectar si es móvil
const isMobile = computed(() => window.innerWidth <= 768);

// Cargar contactos
onMounted(async () => {
  const contactService = useUserService();
  const { userData } = useAuthStore();
  const { data } = await contactService.getContacts(
    userData.id,
    props.locationId,
  );

  contacts.value = data ?? [];
  loading.value = false;
});

// Seleccionar un contacto
const selectContact = (contact) => {
  emit("select-contact", contact);
  emit("update:visible", false);
};
</script>

<style scoped>
/* Estilo para el SlideOver en móvil */
.p-sidebar-bottom {
  border-radius: 1rem 1rem 0 0;
}
</style>
