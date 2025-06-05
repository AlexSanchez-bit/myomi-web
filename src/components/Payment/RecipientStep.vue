<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold text-pink-600 mb-4">
      {{ $t("receiver_data") }}
    </h2>

    <!-- Formulario de destinatario -->
    <div class="p-4 border rounded-lg shadow-md bg-pink-100/30 backdrop-blur-md">
      <!-- Nombre con icono de usuario -->
      <div class="mb-4">
        <div class="relative">
          <InputText v-model="recipient.name" :placeholder="$t('name_lastname')" class="w-full pl-10"
            @input="validate" />
          <i v-if="!anonymous"
            class="pi pi-user absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-500 cursor-pointer rounded-full bg-blue-100/60 p-2"
            @click="openContactDialog" v-tooltip.bottom="$t('select_a_contact')"></i>
        </div>
        <small v-if="isNameError" class="p-error">
          Indique su nombre y apellidos
        </small>
      </div>

      <!-- Teléfono -->
      <div class="mb-4">
        <InputText v-model="recipient.phone_number" :placeholder="$t('phone')" class="w-full" @input="validate" />
        <small v-if="isPhoneError" class="p-error">{{
          $t("field_required")
          }}</small>
      </div>

      <!-- Dirección -->
      <div class="mb-4">
        <InputText v-model="recipient.address" :placeholder="$t('address')" class="w-full" @input="validate" />
        <small v-if="isAddressError" class="p-error">{{
          $t("field_required")
          }}</small>
      </div>

      <!-- Municipio (fijado según la localización) -->
      <div class="mb-4">
        <InputText v-if="recipient.municipality" v-model="recipient.municipality.name" :placeholder="$t('municipality')"
          class="w-full" disabled @input="validate" />
        <Skeleton class="w-full" v-else />
        <small v-if="isMunicipalityError" class="p-error">{{
          $t("field_required")
          }}</small>
      </div>
    </div>

    <!-- Botones de navegación mejorados -->
    <div class="flex justify-between mt-6">
      <Button :label="$t('back')" icon="pi pi-arrow-left" class="p-button-secondary pastel-btn"
        @click="$emit('back')" />
      <Button :label="$t('pay')" icon="pi pi-arrow-right" iconPos="right" class="p-button-primary pastel-btn"
        :loading="loading" @click="validateAndNext" :disabled="!isValid" />
    </div>

    <!-- Dialog/SlideOver para seleccionar contactos -->
    <ContactDialog v-model="contactDialogVisible" :locationId="locationId" @select-contact="handleSelectContact" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount } from "vue";
import { useLocationService } from "@/composables/Location/useLocationService";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { Pagination } from "@/utils/entities/Pagination";
import ContactDialog from "@/components/Payment/ContactDialog.vue";
import type { IContact } from "@/services/Users/User.service";
import { useAuthStore } from "@/stores/AuthStore";

const props = defineProps({
  locationId: { type: Number, required: true },
});

const loading = ref(false);

const { anonymous } = useAuthStore();

const emit = defineEmits(["next", "back"]);

// Datos del destinatario
const recipient = defineModel<Partial<IContact>>();
// Errores de validación
const isNameError = ref(false);
const isPhoneError = ref(false);
const isAddressError = ref(false);
const isMunicipalityError = ref(false);


const isValid = computed(() => {
  return !isNameError.value && !isNameError.value && !isAddressError.value && !isMunicipalityError.value
})

// Estado del Dialog/SlideOver
const contactDialogVisible = ref(false);

// Abrir el Dialog/SlideOver
const openContactDialog = () => {
  contactDialogVisible.value = true;
};

// Manejar la selección de un contacto
const handleSelectContact = (contact) => {
  recipient.value.name = contact.name;
  recipient.value.phone_number = contact.phone_number;
  recipient.value.address = contact.address;
  contactDialogVisible.value = false;
};

// Cargar la localización y fijar el municipio
onBeforeMount(async () => {
  if (props.locationId) {
    const location = await useLocationService().getAll(
      [
        {
          field: "id",
          matchMode: "equals",
          value: props.locationId,
        },
      ],
      new Pagination(0, 1),
      [],
    );
    if (location && location.length > 0) {
      recipient.value.municipality = location[0];
    }
  }
});

const regex = /^(([A-Za-zÁÉÍÓÚáéíóúñÑ]+ )+)[A-Za-zÁÉÍÓÚáéíóúñÑ]+$/
const validate = () => {
  isNameError.value = !(!!recipient.value.name ? regex.test(recipient.value.name) : false)
  isPhoneError.value = !recipient.value.phone_number;
  isAddressError.value = !recipient.value.address;
  isMunicipalityError.value = !recipient.value.municipality;
}

// Validar y avanzar al siguiente paso
const validateAndNext = () => {
  isNameError.value = !recipient.value.name;
  isPhoneError.value = !recipient.value.phone_number;
  isAddressError.value = !recipient.value.address;
  isMunicipalityError.value = !recipient.value.municipality;

  if (
    !isNameError.value &&
    !isPhoneError.value &&
    !isAddressError.value &&
    !isMunicipalityError.value
  ) {
    loading.value = true;
    emit("next");
  }
};
</script>

<style scoped>
/* Estilo para el icono de usuario */
.pi-user {
  font-size: 1.25rem;
}

.p-steps-title {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #4a5568;
}

/* Estilo para el botón de retroceso */
.pastel-btn {
  background-color: rgba(68, 156, 168, 0.2) !important;
  border: none !important;
  color: black !important;
  transition: all 0.3s ease-in-out;
}

.pastel-btn:hover {
  background-color: rgba(68, 156, 168, 0.4) !important;
}

.p-error {
  @apply text-red-500;
}
</style>
