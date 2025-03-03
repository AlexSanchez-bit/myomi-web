<script setup lang="ts">
import { onMounted, ref } from "vue";
import { loadStripe } from "@stripe/stripe-js";
import { stripeKey, supabase } from "@/setup";
import { Button } from "primevue";

const props = defineProps<{
  total: number;
  currency_name: string;
  order_id: number;
}>();

const loading = ref(false);

const stripe = ref(null);
const elements = ref(null);
const cardElement = ref(null);
const clientSecret = ref("");

onMounted(async () => {
  loading.value = true;
  stripe.value = await loadStripe(stripeKey);
  loading.value = false;
  elements.value = stripe.value.elements();
  cardElement.value = elements.value.create("card");
  cardElement.value.mount("#card-element");
});

const handlePayment = async () => {
  loading.value = true;
  const { data: payIntentData, error: payIntentError } =
    await supabase.functions.invoke("create-payment-intent", {
      method: "POST",
      body: {
        amount: props.total * 100, //stripe solo usa centavos
        currency: props.currency_name.toLowerCase(),
        order_id: props.order_id,
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
    if (error) {
      console.error("Error en el pago:", error);
      emit("error_on_payment");
    } else if (paymentIntent.status === "succeeded") {
      console.log("Payment succeeded:", paymentIntent);
      emit("created_payment", paymentIntent.id);
    }
  }
};

const emit = defineEmits(["created_payment", "error_on_payment"]);
</script>

<template>
  <form @submit.prevent="handlePayment" class="payment-form">
    <h2 class="form-title">{{ $t("secure_payment") }}</h2>
    <div class="form-group">
      <label for="card-element">{{ $t("credit_or_debit_card") }}</label>
      <div id="card-element" class="card-input"></div>
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
  @apply bg-red-400 text-white;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}

.btn-pay:hover {
  background-color: #0056b3;
}
</style>
