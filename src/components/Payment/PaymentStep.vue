<script setup lang="ts">
import { onMounted, ref } from "vue";
import { loadStripe } from "@stripe/stripe-js";
import { stripeKey, supabase } from "@/setup";
import { Button } from "primevue";

const props = defineProps<{
  contact: any;
  currency_id: string;
  payment_type_id: string;
  change: number;
  location_id: string;
  currency_name: string;
  total: number;
}>();

const loading = ref(false);

const stripe = ref(null);
const elements = ref(null);
const cardElement = ref(null);
const clientSecret = ref("");
const messagingElement = ref(null);

onMounted(async () => {
  loading.value = true;
  stripe.value = await loadStripe(stripeKey);
  loading.value = false;
  elements.value = stripe.value.elements({
    appearance: { theme: "flat" },
  });
  cardElement.value = elements.value.create("card");
  cardElement.value.mount("#card-element");

  messagingElement.value = elements.value.create("paymentMethodMessaging", {
    paymentMethodType: "card", // Puedes ajustar este valor según el método principal
    layout: "horizontal", // Opciones: "auto", "horizontal" o "vertical"
    iconStyle: "default", // Opciones: "default" o "minimal"
    currency: props.currency_name.toUpperCase(),
    countryCode: "US",
    amount: 100,
    // Otras opciones de configuración según la documentación
  });
  messagingElement.value.mount("#payment-messaging");
});

const handlePayment = async () => {
  loading.value = true;
  const { data: payIntentData, error: payIntentError } =
    await supabase.functions.invoke("create-payment-intent", {
      method: "POST",
      body: {
        ...props,
      },
    });
  loading.value = false;
  if (!payIntentError) {
    clientSecret.value = payIntentData.clientSecret;

    loading.value = true;
    const { paymentIntent, error } = await stripe.value.confirmCardPayment(
      clientSecret.value,
      {
        payment_method: {
          card: cardElement.value,
        },
      },
    );

    loading.value = false;
    if (error || paymentIntent.status !== "succeeded") {
      console.error("Error en el pago:", error);
      emit("error_on_payment");
    } else if (paymentIntent.status === "succeeded") {
      console.log("Payment succeeded:", paymentIntent);
      emit("created_payment", paymentIntent.id);
    }
  }
};

const emit = defineEmits([
  "created_payment",
  "error_on_payment",
  "create_order",
]);
</script>

<template>
  <form @submit.prevent="handlePayment" class="payment-form">
    <h2 class="form-title">{{ $t("secure_payment") }}</h2>
    <div class="form-group">
      <label for="card-element">{{ $t("credit_or_debit_card") }}</label>
      <div id="card-element" class="card-input"></div>
      <div id="payment-messaging" class="messaging-input"></div>
      <p class="form-hint">{{ $t("data_will_be_secure_and_encrypted") }}</p>
    </div>
    <Button
      type="submit"
      class="btn-pay"
      :loading="loading"
      :label="`💳 ${$t('make_pay')} ${props.total.toFixed(2)} ${props.currency_name.toUpperCase()}`"
    >
    </Button>
  </form>
</template>

<style scoped>
/* Contenedor del formulario */
.payment-form {
  max-width: 400px;
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
  margin: auto;
}

/* Título del formulario */
.form-title {
  text-align: center;
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 15px;
}

/* Grupo de formulario */
.form-group {
  margin-bottom: 15px;
}

/* Etiquetas */
label {
  font-weight: bold;
  font-size: 14px;
  display: block;
  margin-bottom: 5px;
}

/* Campo de tarjeta */
.card-input {
  background: #f8f8f8;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

/* Texto de ayuda */
.form-hint {
  font-size: 12px;
  color: #777;
  margin-top: 5px;
}

/* Botón de pago */
.btn-pay {
  width: 100%;
  padding: 12px;
  @apply !bg-blue-400/60 !text-black;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}

.btn-pay:hover {
  @apply !bg-blue-500/60 text-black;
}
</style>
