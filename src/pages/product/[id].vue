<template>
  <div class="min-h-screen max-w-4xl mx-auto p-4">
    <h2
      v-if="product"
      class="text-2xl text-center w-full underline my-12 font-bold"
      :style="{ color: primaryColor }"
    >
      {{ product.name }}
    </h2>
    <div v-if="product" class="flex flex-col md:flex-row gap-6">
      <!-- Galería de imágenes -->

      <div class="w-full md:w-1/2">
        <!-- Imagen principal -->
        <div class="border rounded-lg overflow-hidden shadow">
          <img
            :src="selectedImage ?? '/noimage.webp'"
            alt="Product"
            class="w-full h-72 object-cover"
            @error="(e) => (e.target.src = '/noimage.webp')"
          />
        </div>
        <!-- Miniaturas -->
        <div class="flex gap-2 mt-2">
          <img
            v-for="(img, index) in product.images"
            :key="index"
            :src="img ?? '/noimage.webp'"
            class="w-16 h-16 rounded cursor-pointer border hover:border-blue-500"
            :class="{ 'border-blue-500': img === selectedImage }"
            @click="selectedImage = img"
            @error="(e) => (e.target.src = '/noimage.webp')"
          />
        </div>
      </div>

      <!-- Detalles del producto -->
      <div class="w-full md:w-1/2 flex flex-col justify-between">
        <div>
          <!-- Nombre y precio -->
          <span
            class="text-2xl font-semibold mt-2 flex flex-row items-center"
            :style="{ color: primaryColor }"
          >
            <picture class="w-6 h-6 hidden bg-darkblue">
              <img
                :src="selected_currency?.icon"
                alt=""
                class="w-6 h-6 bg-white mix"
              />
            </picture>
            {{ (product?.price * selected_currency?.change_value).toFixed(2) }}
            {{ selected_currency?.name }}
          </span>

          <!-- Descripción larga truncada -->
          <div class="mt-4" v-if="product.long_description">
            <div
              class="prose"
              :class="{ 'line-clamp-3': !descriptionExpanded }"
              v-html="product.long_description"
            ></div>
            <button
              v-if="!descriptionExpanded"
              @click="descriptionExpanded = true"
              class="text-sm text-blue-600 mt-1 focus:outline-none"
            >
              {{ $t("show_more") }}
            </button>
            <button
              v-else
              @click="descriptionExpanded = false"
              class="text-sm text-blue-600 mt-1 focus:outline-none"
            >
              {{ $t("show_less") }}
            </button>
          </div>
        </div>

        <CartAddButton :product_id="route.params.id as string">
          <template #content="{ add, loading }">
            <!-- Selector de cantidad y botón para agregar al carrito -->
            <div class="mt-6 flex items-center gap-4">
              <!-- Stepper de cantidad -->
              <div class="flex items-center border border-gray-300 rounded">
                <button
                  @click="quantity = quantity - 1"
                  class="px-2 py-1 focus:outline-none"
                >
                  -
                </button>
                <input
                  type="number"
                  class="w-16 text-center outline-none bg-gray-50"
                  v-model.number="quantity"
                  min="0"
                  :max="product?.stock"
                  @update:modelValue="quantity = $event"
                />
                <button
                  @click="incrementQuantity"
                  class="px-2 py-1 focus:outline-none"
                >
                  +
                </button>
              </div>
              <!-- Botón agregar al carrito -->
              <Button
                unstyled
                class="bg-[#449ca8] text-white px-4 py-2 rounded-lg focus:outline-none"
                :class="{
                  'cursor-not-allowed opacity-80': quantity == 0,
                }"
                @click="add(quantity)"
                :loading="loading"
              >
                <span v-if="!loading">
                  {{ $t("add_to_cart") }}
                </span>
                <i
                  v-else
                  class="pi pi-spin pi-spinner mx-10"
                  style="font-size: 1rem"
                ></i>
              </Button>
            </div>
          </template>
        </CartAddButton>
        <!-- Materiales, si existen -->
        <div v-if="product.materials && product.materials.length" class="mt-4">
          <h3 class="text-lg font-semibold" :style="{ color: primaryColor }">
            {{ $t("materials") }}
          </h3>
          <ul class="list-disc pl-5 text-darkblue opacity-90">
            <li
              v-for="material in productMateriasl"
              :key="material.id"
              class="cursor-pointer"
            >
              <router-link
                :to="{ name: 'material.details', params: { id: material.id } }"
              >
                {{ material.name }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Skeleton de carga mientras no se haya obtenido el producto -->
    <div v-else class="animate-pulse">
      <div class="h-72 bg-gray-200 rounded"></div>
      <div class="mt-2 flex gap-2">
        <div class="w-16 h-16 bg-gray-200 rounded"></div>
        <div class="w-16 h-16 bg-gray-200 rounded"></div>
        <div class="w-16 h-16 bg-gray-200 rounded"></div>
      </div>
      <div class="mt-4">
        <div class="h-8 bg-gray-200 rounded w-1/2"></div>
        <div class="mt-2 h-6 bg-gray-200 rounded"></div>
        <div class="mt-2 h-4 bg-gray-200 rounded"></div>
        <div class="mt-2 h-4 bg-gray-200 rounded"></div>
        <div class="mt-2 h-4 bg-gray-200 rounded"></div>
      </div>
      <div class="mt-6 h-10 bg-gray-200 rounded w-1/3"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useProductService } from "@/composables/Shop/Product/useProductService";
import { useRoute } from "vue-router";
import type { IProduct } from "@/services/Shops/Products/Products.service";
import { useCurrencyStore } from "@/stores/currency";
import { storeToRefs } from "pinia";
import CartAddButton from "@/components/Cart/CartAddButton.vue";
import Button from "primevue/button";

const product = ref<IProduct | null>(null);
const selectedImage = ref<string>("");
const descriptionExpanded = ref<boolean>(false);
const primaryColor = "#449ca8";

const route = useRoute();
const productService = useProductService();
const productMateriasl = ref<{ name: string; id: number }[]>([]);

const { selected_currency } = storeToRefs(useCurrencyStore());

const cart_quantity = ref<number>(0);

const quantity = computed({
  get: () => cart_quantity.value,
  set: (value: number) => {
    console.log(value);
    if ((value >= 0 && value <= product?.value?.stock) ?? 0) {
      cart_quantity.value = value;
    }
  },
});

onMounted(async () => {
  const { data, error } = await productService.getDetails(
    route.params.id as string,
  );
  if (!error && data) {
    product.value = data;
    if (data.images && data.images.length > 0) {
      selectedImage.value = data.images[0];
    }
  }

  const { data: materials, error: materialsError } =
    await productService.getMaterials(route.params.id as string);
  if (!materialsError && materials) {
    productMateriasl.value = materials || [];
  }
});

function incrementQuantity() {
  quantity.value++;
}

function decrementQuantity() {
  quantity.value--;
}

function addToCart() {
  if (quantity.value == 0) return;
  // Aquí debes implementar la lógica para agregar el producto al carrito
  console.log(
    `Adding product "${product.value?.name}" with quantity ${quantity.value} to cart.`,
  );
}
</script>

<style scoped>
/* Si no cuentas con el plugin line-clamp de Tailwind, puedes definir esta clase: */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
