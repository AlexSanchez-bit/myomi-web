<template>
  <div
    class="space-y-6"
    v-if="
      cart && selected_currency && selected_payment_type && selected_location
    "
  >
    <h2 class="text-xl md:text-2xl font-bold text-pink-600 mb-4">
      {{ $t("confirm_payment_information") }}
    </h2>

    <!-- Resumen del carrito -->
    <div class="p-4 border rounded-lg shadow-md backdrop-blur-md">
      <h3 class="text-lg font-semibold mb-2">
        {{ $t("cart_summary") }}
      </h3>
      <div v-for="item in cart.cart_items" :key="item.product.id" class="mb-4">
        <p class="">
          <span class="line-clamp-1 font-medium">
            {{ item.product.name }}
          </span>
          <small class="">
            {{ item.quantity }} x
            <!-- <img -->
            <!--   class="w-3 h-3 inline-block" -->
            <!--   :src="selected_currency?.icon" -->
            <!--   alt="" -->
            <!-- /> -->
            {{
              (item.product.price * selected_currency?.change_value).toFixed(2)
            }}
            <span>{{ selected_currency?.name }}</span>
          </small>
        </p>
      </div>
      <p class="text-pink-700 font-semibold">
        {{ $t("total") }}:
        <!-- <img -->
        <!--   class="w-3 h-3 inline-block" -->
        <!--   :src="selected_currency?.icon" -->
        <!--   alt="" -->
        <!-- /> -->
        {{ (cart.total_price * selected_currency?.change_value).toFixed(2) }}
        <span>{{ selected_currency?.name }}</span>
      </p>
    </div>

    <!-- Resumen del método de pago y envío -->
    <div
      class="p-4 border rounded-lg shadow-md bg-pink-100/30 backdrop-blur-md flex flex-col gap-3"
    >
      <h3 class="text-lg font-semibold text-pink-700">
        {{ $t("payment_and_shipping_summary") }}
      </h3>
      <p class="font-medium">
        {{ $t("payment_method") }}:
        {{ selected_payment_type?.name }}
      </p>
      <p class="font-medium">
        {{ $t("delivery_location") }}: {{ selected_location?.name }}
      </p>
      <p class="font-medium" v-if="selected_payment_type.delivery_included">
        {{ $t("delivery_price") }}:
        <!-- <img -->
        <!--   class="w-5 h-5 inline-block" -->
        <!--   :src="selected_currency?.icon" -->
        <!--   alt="" -->
        <!-- /> -->
        {{ selected_location?.delivery_price }}
        <span>{{ selected_currency?.name }}</span>
      </p>
      <p class="text-pink-700" v-if="!selected_payment_type.delivery_included">
        {{ $t("delivery_price") }}:
        <!-- <img -->
        <!--   class="w-3 h-3 inline-block" -->
        <!--   :src="selected_payment_type.delivery_currency?.icon" -->
        <!--   alt="" -->
        <!-- /> -->
        {{
          selected_location?.delivery_price *
          selected_payment_type.delivery_currency?.change_value
        }}
        <span>{{ selected_payment_type.delivery_currency?.name }}</span>
      </p>
    </div>

    <!-- Total del carrito (incluyendo envío) -->
    <div
      class="flex flex-row items-center justify-center text-lg md:text-2xl text-justify"
    >
      <div
        class="font-semibold flex flex-row items-center justify-end sm:text-xl"
        v-if="selected_payment_type.delivery_included"
      >
        <span class="mr-2"> {{ $t("total_to_pay") }}: </span>
        <!-- <img class="w-3 h-3" :src="selected_currency?.icon" alt="" /> -->
        <span>
          {{ (computedTotal * selected_currency?.change_value).toFixed(2) }}
          {{ selected_currency?.name }}
        </span>
      </div>
      <div
        v-else
        class="text-center font-semibold flex flex-wrap items-center justify-center"
      >
        <span class="mr-2"> {{ $t("total_to_pay") }}: </span>
        <span class="flex flex-row items-center gap-1">
          <span class="flex flex-row items-center gap-1">
            <!-- <img class="w-3 h-3" :src="selected_currency?.icon" alt="" /> -->
            {{
              (cart.total_price * selected_currency?.change_value).toFixed(2)
            }}
            {{ selected_currency?.name }}
          </span>
          <span
            v-if="selected_location"
            class="flex flex-row items-center gap-1"
          >
            <i class="pi pi-plus px-1"></i>
            <!-- <img -->
            <!--   v-if="selected_payment_type.delivery_currency?.icon" -->
            <!--   class="w-3 h-3" -->
            <!--   :src="selected_payment_type.delivery_currency?.icon" -->
            <!--   alt="" -->
            <!-- /> -->
            {{
              (
                selected_location?.delivery_price *
                selected_payment_type.delivery_currency?.change_value
              ).toFixed(2)
            }}
            {{ selected_payment_type.delivery_currency?.name }}
          </span>
        </span>
      </div>
    </div>

    <div
      v-if="selected_payment_type.may_have_change"
      class="w-full flex flex-row justify-center md:justify-end"
    >
      <div class="flex flex-col">
        <label for="mile" class="font-bold block mb-0.5 text-sm">
          {{ $t("change_needed") }}
        </label>
        <InputNumber
          v-model="change"
          input-id="mile"
          size="small"
          :suffix="` ${selected_currency.name}`"
        />
        <small class="text-zinc-400">{{ $t("in_case_is_needed") }}</small>
      </div>
    </div>

    <!-- Botones de navegación -->
    <div class="flex justify-between mt-6">
      <Button
        :label="$t('receiver_data')"
        class="p-button-primary pastel-btn w-full !border-none !focus:border-none"
        @click="$emit('next')"
      />
    </div>
  </div>
  <div v-else class="flex flex-col gap-2">
    <Skeleton v-for="i in 3" :key="i" class="w-full !h-32" />
  </div>
</template>

<script setup lang="ts">
import { InputNumber, Skeleton } from "primevue";
import Button from "primevue/button";
import { computed } from "vue";

const props = defineProps({
  cart: { type: Object, required: true },
  selected_payment_type: { type: Object, required: true },
  selected_currency: { type: Object, required: true },
  selected_location: { type: Object, required: true },
});

const change = defineModel<number>("change");

const computedTotal = computed(() => {
  let baseTotal = props.cart ? props.cart.total_price : 0;
  baseTotal += props.selected_location.delivery_price;
  return baseTotal;
});

const emit = defineEmits(["next", "backt", "update:change"]);
</script>

<style scoped>
.pastel-btn {
  background-color: rgba(68, 156, 168, 0.2) !important;
  border: none !important;
  color: black !important;
  transition: all 0.3s ease-in-out;
}

@media (max-width: 431px) {
  .super-small-screen {
    font-size: 0.8rem !important;
  }
}
</style>
