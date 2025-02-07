<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Carrito de Compras</h1>

    <!-- Skeletons mientras carga -->
    <div v-if="loading" class="space-y-4">
      <Skeleton class="!h-24 w-full" v-for="i in 3" :key="i" />
    </div>

    <!-- Contenido del carrito -->
    <div v-else>
      <div v-if="cart" class="space-y-4">
        <div
          v-for="item in cart.cart_items"
          :key="item.product.id"
          class="flex items-center justify-between p-4 border rounded-lg shadow-md"
        >
          <!-- Imagen del producto -->
          <img
            :src="item.product.images[0]"
            alt="Producto"
            class="w-16 h-16 rounded-md object-cover"
          />

          <!-- Detalles del producto -->
          <div class="flex-1 ml-4">
            <h2 class="text-lg font-semibold">{{ item.product.name }}</h2>
            <p class="text-gray-500">Cantidad: {{ item.quantity }}</p>
          </div>

          <!-- Controles de cantidad -->
          <div class="flex items-center space-x-2">
            <Button
              icon="pi pi-minus"
              class="p-button-rounded p-button-text"
              @click="updateQuantity(item, -1)"
              :disabled="item.quantity <= 1 || updating == item.product.id"
            />
            <span class="text-lg font-semibold">{{ item.quantity }}</span>
            <Button
              icon="pi pi-plus"
              class="p-button-rounded p-button-text"
              @click="updateQuantity(item, 1)"
              :disabled="updating == item.product.id"
            />
            <!-- Botón para eliminar -->
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-danger p-button-text"
              @click="removeItem(item)"
              :disabled="updating == item.product.id"
            />
          </div>
        </div>

        <!-- Precio total -->
        <div class="text-right text-xl font-semibold mt-4">
          Total: €{{ cart.total_price }}
        </div>

        <!-- Botón para vaciar carrito -->
        <Button
          label="Vaciar Carrito"
          class="p-button-danger w-full mt-4"
          @click="clearCart"
        />
      </div>

      <p v-else class="text-center text-gray-500">El carrito está vacío.</p>
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
/* Estilos adicionales si los necesitas */
</style>
