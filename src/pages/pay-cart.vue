<template>
  <div class="p-4 md:p-6 max-w-4xl mx-auto bg-white rounded-2xl my-4">
    <!-- Stepper de PrimeVue -->
    <Steps :model="steps" :activeIndex="currentStep - 1" :readonly="true">
      <template #item="{ item }">
        <div class="flex flex-col items-center bg-white">
          <span
            class="p-steps-number bg-red-100 z-30"
            :class="{
              'bg-red-300 text-black': currentStep >= item.step,
              'bg-red-100 text-red-400': currentStep < item.step,
            }"
          >
            {{ item.step }}
          </span>
          <span class="p-steps-title">{{ $t(item.label) }}</span>
        </div>
      </template>
    </Steps>

    <!-- Contenido del paso actual -->
    <div class="mt-8">
      <!-- Paso 1: Confirmación de la compra -->
      <ConfirmationStep
        v-if="currentStep === 1"
        :cart="cart"
        :selected_payment_type="selected_payment_type"
        :selected_currency="selected_currency"
        :selected_location="selected_location"
        @next="currentStep++"
        @back="goBack"
      />

      <!-- Paso 2: Información del destinatario -->
      <RecipientStep
        v-else-if="currentStep === 2"
        v-model="receiver"
        :location-id="locationId"
        @next="currentStep++"
        @back="currentStep--"
      />

      <!-- Paso 3: Efectuar el pago -->
      <PaymentStep
        v-else-if="currentStep === 3"
        :payment-types="payment_types"
        @confirm="handlePayment"
        @back="currentStep--"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Steps from "primevue/steps";
import ConfirmationStep from "@/components/Payment/ConfirmationStep.vue";
import RecipientStep from "@/components/Payment/RecipientStep.vue";
import PaymentStep from "@/components/Payment/PaymentStep.vue";
import { useCartStore } from "@/stores/cartStore";
import { useLocationService } from "@/composables/Location/useLocationService";
import { usePaymentTypeService } from "@/composables/PaymentTypes/usePaymentTypes";
import { useCurrencyStore } from "@/stores/currency";
import { Pagination } from "@/utils/entities/Pagination";
import type { IContact } from "@/services/Users/User.service";

const route = useRoute();
const router = useRouter();
const store = useCartStore();
const locationService = useLocationService();
const paymentTypeService = usePaymentTypeService();
const currencyStore = useCurrencyStore();

const receiver = ref<Partial<IContact>>({});

// Datos del carrito y selecciones
const cart = ref<any>(null);
const loading = ref(true);
const processing = ref(false);
const locations = ref<any[]>([]);
const payment_types = ref<any[]>([]);
const selected_payment_type = ref<any>(null);
const selected_currency = ref();
const delivery_location = ref<number | null>(null);

// Obtener el ID de la localización desde los query params
const locationId = computed(() => route.query.location_id as string);

// Paso actual
const currentStep = ref(1);

// Definir los pasos del stepper
const steps = ref([
  { step: 1, label: "confirmation" },
  { step: 2, label: "receiver" },
  { step: 3, label: "payment" },
]);

// Cargar el carrito y la información adicional
const loadCart = async () => {
  processing.value = true;
  const resp = await store.getMyCart();
  processing.value = false;
  cart.value = resp?.data || null;

  // Cargar ubicaciones
  const locResp = await locationService.getAll([], new Pagination(0, 100), []);
  locations.value = locResp || [];

  // Cargar métodos de pago
  const paymentResp = await paymentTypeService.getAll(
    [
      {
        field: "id",
        matchMode: "equals",
        value: route.query.payment_type_id,
      },
    ],
    new Pagination(0, 100),
    [],
  );
  processing.value = false;
  loading.value = false;
  payment_types.value = paymentResp || [];
  if (payment_types.value.length > 0) {
    selected_payment_type.value = payment_types.value[0];
    console.log(selected_payment_type.value);
    selected_currency.value =
      selected_payment_type.value.allowed_currencies.find(
        (curr) =>
          curr.currency.id == parseInt(route.query.pay_currency as string),
      )?.currency;
  }
};

onMounted(() => {
  loadCart();
  delivery_location.value = parseInt(route.query.location_id as string);
});

// Obtener la ubicación seleccionada
const selected_location = computed(() => {
  if (delivery_location.value) {
    return locations.value.find((loc) => loc.id === delivery_location.value);
  }
  return null;
});

// Navegación
const goBack = () => {
  if (currentStep.value > 1) currentStep.value--;
  else router.push("/cart");
};

// Manejar el pago
const handlePayment = () => {
  router.push({
    name: "payment-success",
    query: {
      payment_type_id: selected_payment_type.value.id,
      pay_currency: selected_currency.value.id,
      location_id: selected_location.value.id,
    },
  });
};
</script>

<style scoped>
/* Personalización del Stepper */
.p-steps-number {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: bold;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

.p-steps-title {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #4a5568;
}

/* Estilo para el botón de retroceso */
.pastel-btn {
  background-color: rgba(255, 182, 193, 0.2) !important;
  border: none !important;
  color: #d63384 !important;
  transition: all 0.3s ease-in-out;
}
.pastel-btn:hover {
  background-color: rgba(255, 182, 193, 0.4) !important;
}
</style>
