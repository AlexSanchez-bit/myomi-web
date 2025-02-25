<template>
  <div class="p-4 md:p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-2xl my-4">
    <h1 class="text-3xl font-bold text-pink-600 mb-6 text-center">
      {{ $t("shopping_cart") }} 🛍️
    </h1>

    <!-- Skeletons mientras carga -->
    <div v-if="loading" class="space-y-4">
      <Skeleton
        class="!h-24 w-full rounded-lg bg-pink-100/30"
        v-for="i in 6"
        :key="i"
      />
    </div>

    <!-- Contenido del carrito -->
    <div v-else>
      <div
        v-if="cart && cart.cart_items && cart.cart_items.length"
        class="space-y-6"
      >
        <!-- Lista de ítems -->
        <div
          v-for="item in cart.cart_items"
          :key="item.product.id"
          class="flex flex-col md:flex-row items-center justify-between p-4 border rounded-lg shadow-md bg-pink-100/30 backdrop-blur-md"
        >
          <div class="flex items-center w-full md:w-auto">
            <!-- Imagen del producto -->
            <img
              :src="item.product.images[0]"
              alt="Producto"
              class="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover border-2 border-pink-300/50"
            />
            <!-- Detalles del producto -->
            <div class="ml-4">
              <h2 class="text-lg font-semibold text-pink-700">
                {{ item.product.name }}
              </h2>
              <p class="text-sm text-pink-500 flex flex-row items-center my-1">
                {{ $t("price") }}:
                <img class="w-3 h-3" :src="selected_currency?.icon" alt="" />
                {{
                  (
                    item.product.price * selected_currency?.change_value
                  ).toFixed(2)
                }}
                {{ selected_currency?.name }}
              </p>
              <p class="text-sm text-pink-500 flex flex-row items-center">
                {{ $t("subtotal") }}:

                <img class="w-3 h-3" :src="selected_currency?.icon" alt="" />
                {{
                  (
                    item.product.price *
                    selected_currency?.change_value *
                    item.quantity
                  ).toFixed(2)
                }}
                {{ selected_currency?.name }}
              </p>
            </div>
          </div>

          <!-- Controles de cantidad -->
          <div class="flex items-center space-x-2 mt-4 md:mt-0">
            <Button
              icon="pi pi-minus"
              class="p-button-rounded pastel-btn"
              @click="updateQuantity(item, -1)"
              :disabled="
                processing || item.quantity <= 1 || updating == item.product.id
              "
            />
            <span class="text-lg font-semibold text-pink-700">
              {{ item.quantity }}
            </span>
            <Button
              icon="pi pi-plus"
              class="p-button-rounded pastel-btn"
              @click="updateQuantity(item, 1)"
              :disabled="processing || updating == item.product.id"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-danger p-button-text pastel-btn"
              @click="removeItem(item)"
              :disabled="processing || updating == item.product.id"
            />
          </div>
        </div>

        <!-- Selector de lugar de envío usando Dropdown de PrimeVue -->
        <div
          class="flex flex-col md:flex-row items-center justify-between p-4 border rounded-lg shadow-md bg-pink-100/30 backdrop-blur-md"
        >
          <label class="text-lg font-semibold text-pink-700 mb-2 md:mb-0">
            {{ $t("delivery_place") }}:
          </label>
          <Dropdown
            v-model="delivery_location"
            :options="locations"
            optionLabel="name"
            optionValue="id"
            :placeholder="$t('select_localization')"
            :disabled="processing"
            class="w-full md:w-auto"
          >
            <template #option="slotProps">
              <div class="flex flex-row items-center">
                {{ slotProps.option.name }}
                ({{ $t("cost") }}:
                <img class="w-3 h-3" :src="selected_currency?.icon" alt="" />
                {{
                  (
                    slotProps.option.delivery_price *
                    selected_currency?.change_value
                  ).toFixed(2)
                }}
                {{ selected_currency?.name }})
              </div>
            </template>
            <template #selectedOption="slotProps">
              <div class="flex flex-row items-center">
                {{ slotProps.option.name }}
                ({{ $t("cost") }}:
                <img class="w-3 h-3" :src="selected_currency?.icon" alt="" />
                {{
                  (
                    slotProps.option.delivery_price *
                    selected_currency?.change_value
                  ).toFixed(2)
                }}
                {{ selected_currency?.name }})
              </div>
            </template>
          </Dropdown>
        </div>

        <!-- Total del carrito (incluyendo envío) -->
        <div
          class="text-right text-xl font-semibold text-pink-700 flex flex-row items-center justify-end"
        >
          {{ $t("total") }}:

          <img class="w-5 h-5" :src="selected_currency?.icon" alt="" />
          {{ (computedTotal * selected_currency?.change_value).toFixed(2) }}
          {{ selected_currency?.name }}
        </div>

        <!-- Acciones del carrito -->
        <div class="flex flex-col md:flex-row gap-4 mt-4">
          <Button
            :label="$t('clean_cart')"
            class="p-button-danger pastel-btn w-full"
            @click="clearCart"
            :disabled="processing"
          />
          <Button
            :label="$t('pay')"
            class="p-button-success pastel-btn w-full"
            @click="handlePurchase"
            :disabled="processing"
          />
          <Button
            :label="$t('keep_shopping')"
            class="p-button-info pastel-btn w-full"
            @click="continueShopping"
            :disabled="processing"
          />
        </div>
      </div>

      <!-- Mensaje si el carrito está vacío -->
      <p v-else class="text-center text-pink-500">
        {{ $t("empty_cart") }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useCartStore } from "@/stores/cartStore";
import Button from "primevue/button";
import Skeleton from "primevue/skeleton";
import Dropdown from "primevue/dropdown";
import { useRouter } from "vue-router";
import { useLocationService } from "@/composables/Location/useLocationService";
import { type ILocation } from "@/services/Location/LocationService";
import { Pagination } from "@/utils/entities/Pagination";

import { useCurrencyStore } from "@/stores/currency";
import { storeToRefs } from "pinia";
const { selected_currency } = storeToRefs(useCurrencyStore());

const store = useCartStore();
const cart = ref<any>(null);
const loading = ref(true);
const updating = ref(null);
const processing = ref(false);
const router = useRouter();
const locations = ref<ILocation[]>([]);
const delivery_location = ref<number | null>(null);

const locationService = useLocationService();

onMounted(async () => {
  processing.value = true;
  const resp = await store.getMyCart();
  cart.value = resp?.data || null;
  const locResp = await locationService.getAll([], new Pagination(0, 100), []);
  // Suponiendo que la respuesta tiene la propiedad "data"
  locations.value = locResp || [];
  processing.value = false;
  loading.value = false;
});

// Propiedad computada para sumar el costo de envío al total
const computedTotal = computed(() => {
  let baseTotal = cart.value ? cart.value.total_price : 0;
  if (delivery_location.value) {
    const selected = locations.value.find(
      (loc) => loc.id === delivery_location.value,
    );
    if (selected) {
      baseTotal += selected.delivery_price;
    }
  }
  return baseTotal;
});

// Actualiza la cantidad de un producto
const updateQuantity = async (item: any, change: number) => {
  processing.value = true;
  updating.value = item.product.id;
  const resp = await store.updateProductQuantity(item.product.id, change);
  if (resp) {
    updating.value = null;
    // Actualiza el precio total base
    cart.value.total_price += change * item.product.price;
    if (change + item.quantity <= 0) {
      cart.value.cart_items = cart.value.cart_items.filter(
        (i: any) => i.product.id !== item.product.id,
      );
    } else {
      cart.value.cart_items = cart.value.cart_items.map((i: any) => {
        if (i.product.id === item.product.id) {
          return { ...i, quantity: item.quantity + change };
        }
        return i;
      });
    }
  }
  processing.value = false;
};

// Elimina un producto del carrito
const removeItem = async (item: any) => {
  await updateQuantity(item, -1 * item.quantity);
};

// Vacía el carrito
const clearCart = async () => {
  processing.value = true;
  await store.clearCart();
  cart.value = null;
  processing.value = false;
};

// Función placeholder para la acción de comprar
const handlePurchase = () => {
  alert("Función de compra aún no implementada.");
};

// Redirige a la página de productos para seguir comprando
const continueShopping = () => {
  router.push("/product");
};
</script>

<style scoped>
/* Botones con estilo pastel girly */
.pastel-btn {
  background-color: rgba(255, 182, 193, 0.2) !important;
  border: none !important;
  color: #d63384 !important;
  transition: all 0.3s ease-in-out;
}
.pastel-btn:hover {
  background-color: rgba(255, 182, 193, 0.4) !important;
}

/* Personalización del Skeleton */
:deep(.p-skeleton) {
  background-color: rgba(255, 182, 193, 0.2) !important;
}
</style>
