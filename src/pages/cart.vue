<template>
  <div class="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-2xl my-4">
    <h1 class="text-3xl font-bold text-pink-600 mb-6 text-center">
      Carrito de Compras 🛍️
    </h1>

    <!-- Skeletons mientras carga -->
    <div v-if="loading" class="space-y-4">
      <Skeleton
        class="!h-24 w-full rounded-lg bg-pink-100/30"
        v-for="i in 3"
        :key="i"
      />
    </div>

    <!-- Contenido del carrito -->
    <div v-else>
      <div v-if="cart" class="space-y-4">
        <div
          v-for="item in cart.cart_items"
          :key="item.product.id"
          class="flex items-center justify-between p-4 border rounded-lg shadow-md bg-pink-100/30 backdrop-blur-md"
        >
          <!-- Imagen del producto -->
          <img
            :src="item.product.images[0]"
            alt="Producto"
            class="w-16 h-16 rounded-xl object-cover border-2 border-pink-300/50"
          />

          <!-- Detalles del producto -->
          <div class="flex-1 ml-4">
            <h2 class="text-lg font-semibold text-pink-700">
              {{ item.product.name }}
            </h2>
            <p class="text-pink-500">Cantidad: {{ item.quantity }}</p>
          </div>

          <!-- Controles de cantidad -->
          <div class="flex items-center space-x-2">
            <Button
              icon="pi pi-minus"
              class="p-button-rounded pastel-btn"
              @click="updateQuantity(item, -1)"
              :disabled="item.quantity <= 1 || updating == item.product.id"
            />
            <span class="text-lg font-semibold text-pink-700">
              {{ item.quantity }}
            </span>
            <Button
              icon="pi pi-plus"
              class="p-button-rounded pastel-btn"
              @click="updateQuantity(item, 1)"
              :disabled="updating == item.product.id"
            />
            <!-- Botón para eliminar -->
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-danger p-button-text pastel-btn"
              @click="removeItem(item)"
              :disabled="updating == item.product.id"
            />
          </div>
        </div>

        <!-- Precio total -->
        <div class="text-right text-xl font-semibold mt-4 text-pink-700">
          Total: €{{ cart.total_price }}
        </div>

        <!-- Botón para vaciar carrito -->
        <Button
          label="Vaciar Carrito"
          class="p-button-danger pastel-btn w-full mt-4"
          @click="clearCart"
        />
      </div>

      <p v-else class="text-center text-pink-500">
        Tu carrito está vacío. ¡Agrega algo lindo! ✨
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCartStore } from "@/stores/cartStore";
import Button from "primevue/button";
import Skeleton from "primevue/skeleton";

const store = useCartStore();
const cart = ref(null);
const loading = ref(true);
const updating = ref(null);

onMounted(async () => {
  const resp = await store.getMyCart();
  cart.value = resp?.data || null;
  loading.value = false;
});

// Actualizar cantidad de un producto
const updateQuantity = async (item, change) => {
  updating.value = item.product.id;
  const resp = await store.updateProductQuantity(item.product.id, change);
  if (resp) {
    updating.value = null;
    cart.value.total_price += change * item.product.price;
    if (change + item.quantity <= 0) {
      cart.value.cart_items =
        cart.value =
        cart.value.cart_items =
          cart.value.cart_items.filter((i) => i.product.id !== item.product.id);
    } else {
      cart.value.cart_items = cart.value.cart_items.map((_item) => {
        if (_item.product.id === item.product.id) {
          return { ..._item, quantity: item.quantity + change };
        }
        return _item;
      });
    }
  }
};

// Eliminar un producto
const removeItem = async (item) => {
  updateQuantity(item, -1 * item.quantity);
};

// Vaciar carrito
const clearCart = async () => {
  await store.clearCart();
  cart.value = null;
};
</script>

<style scoped>
/* Estilo pastel con opacidad baja */
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
