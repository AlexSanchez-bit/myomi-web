<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold text-pink-600 mb-4">
      {{ $t("payment_method") }}
    </h2>

    <!-- Opciones de pago -->
    <div
      class="p-4 border rounded-lg shadow-md bg-pink-100/30 backdrop-blur-md"
    >
      <div
        v-for="payment in paymentTypes"
        :key="payment.id"
        class="flex items-center mb-2"
      >
        <RadioButton
          v-model="selectedPayment"
          :value="payment"
          class="mr-2 pastel-btn"
        />
        <span class="text-pink-700">
          <img class="w-5 h-5 inline-block" :src="payment.icon" alt="" />
          {{ payment.name }}
        </span>
      </div>
    </div>

    <!-- Botones de navegación -->
    <div class="flex justify-between mt-6">
      <Button
        :label="$t('back')"
        class="p-button-secondary pastel-btn"
        @click="$emit('back')"
      />
      <Button
        :label="$t('confirm_payment')"
        class="p-button-success pastel-btn"
        @click="$emit('confirm')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";
import RadioButton from "primevue/radiobutton";

defineProps({
  paymentTypes: { type: Array, required: true },
});

defineEmits(["confirm", "back"]);

const selectedPayment = ref(null);
</script>
