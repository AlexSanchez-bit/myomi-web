<template>
  <div class="p-4 md:p-6 max-w-4xl mx-auto bg-white rounded-2xl my-4">
    <!-- Stepper de PrimeVue -->
    <Steps :model="steps" :activeIndex="currentStep - 1" :readonly="true">
      <template #item="{ item }">
        <div class="flex flex-col bg-white items-center">
          <span
            class="p-steps-number bg-[#449ca8] z-30"
            :class="{
              'bg-[#30a3af] text-white': currentStep >= item.step,
              'bg-[#449ca8] text-white': currentStep < item.step,
            }"
          >
            {{ item.step }}
          </span>
          <span class="p-steps-title !w-24 text-center">{{
            $t(item.label as string)
          }}</span>
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
        v-model:change="needed_change"
      />

      <!-- Paso 2: Información del destinatario -->
      <RecipientStep
        v-else-if="currentStep === 2"
        v-model="receiver"
        :location-id="locationId"
        @next="handlePayment"
        @back="currentStep--"
      />

      <!-- Paso 3: Efectuar el pago -->
      <PaymentStep
        v-else-if="currentStep === 3"
        :contact="receiver"
        :currency_id="selected_currency.id"
        :payment_type_id="selected_payment_type.id"
        :change="needed_change"
        :currency_name="selected_currency.name"
        :location_id="selected_location.id"
        :total="cart.total_price + selected_location.delivery_price"
        @created_payment="create_payment"
        @create_order="create_order"
        @error_on_payment="error_on_payment"
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

import { Pagination } from "@/utils/entities/Pagination";
import type { IContact } from "@/services/Users/User.service";
import { useAuthStore } from "@/stores/AuthStore";
import { useI18n } from "vue-i18n";
import { useToastStorage } from "@/stores/ToasterStorage";
import { useOrderService } from "@/composables/Order/useOrderService";

const route = useRoute();
const router = useRouter();
const store = useCartStore();
const locationService = useLocationService();
const paymentTypeService = usePaymentTypeService();
const { t } = useI18n();
const { notify } = useToastStorage();
const orderService = useOrderService();

// Datos del carrito y selecciones
const cart = ref<any>(null);
const receiver = ref<Partial<IContact>>({});
const loading = ref(true);
const processing = ref(false);
const locations = ref<any[]>([]);
const payment_types = ref<any[]>([]);
const selected_payment_type = ref<any>(null);
const selected_currency = ref();
const delivery_location = ref<number | null>(null);

const needed_change = ref(0);

// Obtener el ID de la localización desde los query params
const locationId = computed(() => parseInt(route.query.location_id as string));

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

  if (cart.value.cart_items.some((ci) => ci.product.stock < ci.quantity)) {
    router.push("/cart");
    notify("error", t("we_are_sorry"), `${t("a_product_is_off_stock")}`, 3000);
  }

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

const order_id = ref(null);

async function create_payment(payment_id: string) {
  router.push("/");
  store.getMyCart();
  notify("success", t("puchase_successfull"), "", 3000);
}

function error_on_payment() {
  notify("error", t("there_was_an_error_paying"), "", 3000);
  router.push("/");
  store.getMyCart();
}

async function create_order() {
  const { anonymous, userData: user } = useAuthStore();

  const resp = await orderService.createOrder({
    contact: receiver.value,
    currency_id: selected_currency.value.id,
    user_id: anonymous ? null : user.id,
    session_id: !anonymous ? null : user.id,
    payment_type_id: selected_payment_type.value.id,
    change: needed_change.value,
    location_id: selected_location.value.id,
  });
  if (resp.data.success) {
    console.log(resp);
    order_id.value = resp.data.order_id;
  } else {
    notify("error", resp.data.error, "", 3000);
    router.push("/cart");
    return;
  }
  return resp;
}

// Manejar el pago
const handlePayment = async () => {
  if (selected_payment_type.value.external) {
    currentStep.value = 3;
    return;
  }
  const resp = await create_order();
  if (resp.data.success) {
    router.push("/");
    store.getMyCart();
    window.location.href = `https://wa.me/5352058774/?text=${encodeURIComponent(whatsapp_message())}`;
    notify("success", t("puchase_successfull"), "", 3000);
  } else {
    notify("error", resp.data.error, "", 3000);
    router.push("/cart");
  }
};

function whatsapp_message() {
  const total = selected_payment_type.value.delivery_included
    ? cart.value.total_price + cart.value.delivery_price
    : cart.value.total_price;

  const delivery_payment = selected_payment_type.value.delivery_included
    ? null
    : selected_location.value.delivery_price;

  return `
 ${t("buy_resume")}
 ${t("client")}:
 ${t("name")} ${receiver.value.name}
 ${t("address")} ${receiver.value.address}
 ${t("phone")} ${receiver.value.phone_number}
-----------------------------------
${t("products")}:
${cart.value.cart_items.map((item) => `\t${item.product.name} x ${item.quantity}`).join("\n")}
-----------------------------------
${t("total")}: ${total} ${selected_currency.value.name}
  ${selected_payment_type.value.may_have_change ? (needed_change.value > 0 ? `${t("requested_change")}: ${needed_change.value} ${selected_currency.value.name}` : "") : ""}
  ${selected_payment_type.value.delivery_included ? "" : `${t("delivery_price")}: ${delivery_payment} ${selected_payment_type.value.delivery_currency?.name}`}
`;
}
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
  color: #449ca8 !important;
  transition: all 0.3s ease-in-out;
}
.pastel-btn:hover {
  background-color: rgba(255, 182, 193, 0.4) !important;
}
</style>
