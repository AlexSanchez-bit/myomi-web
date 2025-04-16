<template>
  <div class="p-4 md:p-6 max-w-4xl mx-auto bg-white rounded-2xl my-4">
    <h1
      class="text-2xl md:text-3xl lg:text-3xl font-bold text-pink-600 mb-6 text-center"
    >
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
            <router-link
              :to="{ name: 'product.details', params: { id: item.product.id } }"
            >
              <Img
                v-if="item.product?.images && item.product?.images.length > 0"
                :src="item.product?.images[0]"
                alt="Producto"
                imageClass="w-12 md:w-20 md:h-20 rounded-xl object-cover border-2 border-pink-300/50"
                class="w-12 md:w-20 md:h-20 rounded-xl object-cover border-2 border-pink-300/50 overflow-hidden"
              />
            </router-link>
            <!-- Detalles del producto -->
            <div class="ml-4">
              <h2
                class="text-md md:text-lg font-semibold line-clamp-1 md:line-clamp-2"
              >
                {{ item.product.name }}
              </h2>
              <p class="text-xs flex flex-row items-center my-1">
                {{ $t("price") }}:
                <!-- <img class="w-3 h-3" :src="selected_currency?.icon" alt="" /> -->
                {{
                  (
                    item.product.price * selected_currency?.change_value
                  ).toFixed(2)
                }}
                {{ selected_currency?.name }}
              </p>
              <p class="text-xs text-pink-500 flex flex-row items-center">
                {{ $t("subtotal") }}:
                <!-- <img class="w-3 h-3" :src="selected_currency?.icon" alt="" /> -->
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
          <div class="flex items-center space-x-2 mt-4 md:mt-0 relative">
            <Button
              icon="pi pi-minus"
              class="p-button-rounded pastel-btn"
              @click="updateQuantity(item, -1)"
              :disabled="
                processing || item.quantity <= 1 || updating == item.product.id
              "
            />
            <span
              class="text-lg font-semibold text-pink-700"
              :class="{ 'text-red-500': item.product.stock < item.quantity }"
            >
              {{ item.quantity }}
            </span>
            <Button
              icon="pi pi-plus"
              class="p-button-rounded pastel-btn"
              @click="updateQuantity(item, 1)"
              :disabled="
                processing ||
                updating == item.product.id ||
                item.quantity >= item.product.stock
              "
            />
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-danger p-button-text pastel-btn"
              @click="removeItem(item)"
              :disabled="processing || updating == item.product.id"
            />
            <small
              v-if="item.product.stock < item.quantity"
              class="text-gray-500/60 text-xs -bottom-8 absolute w-full text-center hidden md:block"
              >{{ $t("reduce_to_buy") }}</small
            >
          </div>
          <small
            v-if="item.product.stock < item.quantity"
            class="text-gray-500/60 text-xs -bottom-8 w-full text-center md:hidden"
            >{{ $t("reduce_to_buy") }}</small
          >
        </div>

        <!-- Selector de método de pago con RadioButton (vertical y con estilo en el propio botón) -->
        <div class="flex flex-col items-center justify-between p-4">
          <label class="text-lg font-semibold text-pink-700 mb-4 w-full">
            {{ $t("payment_method") }}:
          </label>
          <div class="flex flex-col items-center w-full">
            <div
              v-for="payment in payment_types"
              :key="payment.id"
              class="flex flex-col items-start mb-2 w-full p-2 rounded"
            >
              <div class="flex items-center">
                <RadioButton
                  v-model="selected_payment_type"
                  :value="payment"
                  :disabled="processing"
                  class="mr-2 pastel-btn"
                />
                <span class="text-md medium text-pink-700">
                  <img
                    class="w-5 h-5 inline-block"
                    :src="payment?.icon"
                    alt=""
                  />
                  {{ payment.name }}
                </span>
              </div>

              <small
                v-if="payment.external && payment.fee > 0"
                class="text-gray-600/80 text-xs"
                >{{ t("extra_charges_may_be_applied") }}</small
              >
            </div>
          </div>
        </div>

        <!---Selector de moneda de pago------>

        <div
          class="flex flex-col md:flex-row items-center justify-between p-4 border rounded-lg shadow-md bg-pink-100/30 backdrop-blur-md"
        >
          <label class="text-lg font-semibold text-pink-700 mb-2 md:mb-0">
            {{ $t("currency_to_pay") }}:
          </label>
          <Dropdown
            v-model="selected_currency"
            :options="currency_types"
            optionLabel="name"
            :placeholder="$t('select_currency_type')"
            :disabled="processing"
            :loading="processing"
            class="w-full md:w-auto"
          >
            <template #option="slotProps">
              <div class="flex flex-row items-center">
                <!-- <img class="w-3 h-3" :src="slotProps.option?.icon" alt="" /> -->
                {{ slotProps.option.name }}
              </div>
            </template>
            <!-- <template #selectedOption="slotProps"> -->
            <!--   <div class="flex flex-row items-center"> -->
            <!--     {{ slotProps.option.name }} -->
            <!-- <img class="w-3 h-3" :src="slotProps.option?.icon" alt="" />  -->
            <!--   </div> -->
            <!-- </template> -->
          </Dropdown>
        </div>

        <!-- Selector de lugar de envío -->
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
            :loading="processing"
            class="w-full md:w-auto"
          >
            <template #option="slotProps">
              <div
                class="flex flex-row items-center"
                v-if="selected_payment_type.delivery_included"
              >
                {{ slotProps.option.name }}
                ({{ $t("cost") }}:
                <!-- <img class="w-3 h-3" :src="selected_currency?.icon" alt="" /> -->
                {{
                  (
                    slotProps.option.delivery_price *
                    selected_currency?.change_value
                  ).toFixed(2)
                }}
                {{ selected_currency?.name }})
              </div>
              <div
                class="flex flex-row items-center"
                v-if="!selected_payment_type.delivery_included"
              >
                {{ slotProps.option.name }}
                ({{ $t("cost") }}:
                <!-- <img -->
                <!--   class="w-3 h-3" -->
                <!--   :src="selected_payment_type.delivery_currency?.icon" -->
                <!--   alt="" -->
                <!-- /> -->
                {{
                  (
                    slotProps.option.delivery_price *
                    selected_payment_type.delivery_currency?.change_value
                  ).toFixed(2)
                }}
                {{ selected_payment_type.delivery_currency?.name }})
              </div>
            </template>
            <!--

            <template #selectedOption="slotProps">
              <div
                class="flex flex-row items-center"
                v-if="selected_payment_type.delivery_included"
              >
                {{ slotProps.option.name }}
                ({{ $t("cost") }}:
                {{
                  (
                    slotProps.option.delivery_price *
                    selected_currency?.change_value
                  ).toFixed(2)
                }}
                {{ selected_currency?.name }})
              </div>

              <div
                class="flex flex-row items-center"
                v-if="!selected_payment_type.delivery_included"
              >
                {{ slotProps.option.name }}
                ({{ $t("cost") }}:
                {{
                  (
                    slotProps.option.delivery_price *
                    selected_payment_type.delivery_currency?.change_value
                  ).toFixed(2)
                }}
                {{ selected_payment_type.delivery_currency?.name }})
              </div>
            </template>
--->
          </Dropdown>
        </div>

        <!-- Total del carrito (incluyendo envío) -->
        <div
          class="text-right text-xl font-semibold text-pink-700 flex flex-row items-center justify-end"
          v-if="selected_payment_type?.delivery_included"
        >
          {{ $t("total") }}:
          <!-- <img class="w-5 h-5" :src="selected_currency?.icon" alt="" /> -->
          {{ (computedTotal * selected_currency?.change_value).toFixed(2) }}
          {{ selected_currency?.name }}
        </div>
        <div
          v-else
          class="text-right text-xl font-semibold text-pink-700 flex flex-row items-center justify-end"
        >
          {{ $t("total") }}:
          <span class="flex flex-row items-center gap-1">
            <!-- <img class="w-5 h-5" :src="selected_currency?.icon" alt="" /> -->
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
            <!--   class="w-5 h-5" -->
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
        </div>

        <!-- Acciones del carrito -->
        <div class="flex flex-col md:flex-row gap-4 mt-4">
          <Button
            :label="$t('clean_cart')"
            class="p-button-danger pastel-btn w-full"
            @click="clearCart"
            :disabled="processing"
            :loading="processing"
          />
          <Button
            :label="$t('pay')"
            class="p-button-success pastel-btn w-full"
            @click="handlePurchase"
            :disabled="processing || !delivery_location || invalid_cart"
            :loading="processing"
          />
          <Button
            :label="$t('keep_shopping')"
            class="p-button-info pastel-btn w-full"
            @click="continueShopping"
            :disabled="processing"
            :loading="processing"
          />
        </div>
      </div>

      <!-- Mensaje si el carrito está vacío -->
      <p v-else class="text-center text-pink-500 mb-auto">
        {{ $t("empty_cart") }}
      </p>
    </div>

    <!-- Sliders -->
    <Sliders
      class="!scale-50 !mb-8 !py-3"
      v-if="cart && cart.cart_items && cart.cart_items.length > 0"
      :breakpoints="breakpoints"
      :service="productService"
      :filters="[
        {
          field: 'id',
          matchMode: 'NOT_IN',
          value: cart?.cart_items.map((item) => item.product.id),
        },
      ]"
      :orders="[
        {
          field: 'stock',
          order: 0,
        },
      ]"
    >
      <template #header>
        <div class="my-6">
          <h6
            class="text-2xl text-center decoration-black text-black uppercase my"
          >
            {{ $t("you_may_be_interested") }}
          </h6>
          <div class="text-center flex flex-row justify-center w-full mb-2">
            <router-link to="/product">
              {{ $t("see_all") }}
            </router-link>
          </div>
        </div>
      </template>
      <template #item="{ item }">
        <ProductItem class="!mx-auto !w-full !h-[26rem]" :product="item" />
      </template>
    </Sliders>
    <Sliders
      v-else
      class="!scale-50 !mb-8 my-auto"
      :service="productService"
      :breakpoints="breakpoints"
      :filters="[
        {
          field: 'id',
          matchMode: FilterMatchMode.NOT_EQUALS,
          value: cart?.cart_items?.map((item) => item.product_id),
        },
      ]"
      :orders="[
        {
          field: 'stock',
          order: 0,
        },
      ]"
    >
      <template #header>
        <div class="my-6">
          <h6
            class="text-2xl text-center decoration-black text-black uppercase my"
          >
            {{ $t("you_may_be_interested") }}
          </h6>
          <div class="text-center flex flex-row justify-center w-full mb-2">
            <router-link to="/product">
              {{ $t("see_all") }}
            </router-link>
          </div>
        </div>
      </template>
      <template #item="{ item }">
        <ProductItem class="!mx-auto !w-full !h-[26rem]" :product="item" />
      </template>
    </Sliders>
  </div>
</template>

<script setup lang="ts">
import Sliders from "@/components/Sliders.vue";
import ProductItem from "@/components/Product/ProductItem.vue";
import { FilterMatchMode } from "@primevue/core/api";
import { ref, onMounted, computed, watch } from "vue";
import { useCartStore } from "@/stores/cartStore";
import Button from "primevue/button";
import Skeleton from "primevue/skeleton";
import Dropdown from "primevue/dropdown";
import RadioButton from "primevue/radiobutton";
import { useRouter } from "vue-router";
import { useLocationService } from "@/composables/Location/useLocationService";
import type { ILocation } from "@/services/Location/LocationService";
import { Pagination } from "@/utils/entities/Pagination";
import type { IPaymentType } from "@/services/PaymentMethods/PaymentMethods.service";
import { useCurrencyStore } from "@/stores/currency";
import { storeToRefs } from "pinia";
import { useProductService } from "@/composables/Shop/Product/useProductService";
import { useI18n } from "vue-i18n";
import { useToastStorage } from "../stores/ToasterStorage";
import { usePaymentTypeService } from "@/composables/PaymentTypes/usePaymentTypes";

const { notify } = useToastStorage();
const { t } = useI18n();

const productService = useProductService();
const selected_currency = ref(useCurrencyStore().selected_currency);
const store = useCartStore();
const cart = ref<any>(null);
const loading = ref(true);
const updating = ref(null);
const processing = ref(false);
const invalid_cart = ref(false);
const router = useRouter();
const locations = ref<ILocation[]>([]);
const payment_types = ref<IPaymentType[]>([]);
const delivery_location = ref<number | null>(null);
const selected_payment_type = ref<IPaymentType | null>(null);

const locationService = useLocationService();
const paymentTypeService = usePaymentTypeService();
const { quantity } = storeToRefs(store);

watch(quantity, () => {
  loadCart();
});

watch(selected_payment_type, () => {
  selected_currency.value =
    selected_payment_type.value.allowed_currencies[0].currency;
});

const currency_types = computed(() => {
  return selected_payment_type.value?.allowed_currencies?.map(
    (currency) => currency.currency,
  );
});

const loadCart = async () => {
  processing.value = true;
  const resp = await store.getMyCart();
  cart.value = resp?.data || null;

  if (cart.value?.cart_items?.some((ci) => ci.product.stock < ci.quantity)) {
    invalid_cart.value = true;
  }

  const locResp = await locationService.getAll([], new Pagination(0, 100), []);
  locations.value = locResp || [];
  processing.value = false;
  loading.value = false;

  processing.value = true;
  const paymentResp = await paymentTypeService.getAll(
    [],
    new Pagination(0, 100),
    [],
  );
  processing.value = false;
  payment_types.value = paymentResp || [];
  if (payment_types.value.length > 0) {
    selected_payment_type.value = payment_types.value[0];
  }
};

onMounted(loadCart);

const selected_location = computed(() => {
  if (delivery_location.value) {
    const selected = locations.value.find(
      (loc) => loc.id === delivery_location.value,
    );
    return selected;
  }
  return null;
});

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

const updateQuantity = async (item: any, change: number) => {
  processing.value = true;
  updating.value = item.product.id;
  //optimistic update
  cart.value.cart_items = cart.value.cart_items.map((i: any) => {
    if (i.product.id === item.product.id) {
      return { ...i, quantity: item.quantity + change };
    }
    return i;
  });

  const resp: any = await store.updateProductQuantity(item.product.id, change);
  if (resp && !resp.error) {
    updating.value = null;
    cart.value.total_price += change * item.product.price;

    if (change + item.quantity <= 0) {
      cart.value.cart_items = cart.value.cart_items.filter(
        (i: any) => i.product.id !== item.product.id,
      );
    }
  } else if ((resp as any).message) {
    //optimistic action rollback
    cart.value.cart_items = cart.value.cart_items.map((i: any) => {
      if (i.product.id === item.product.id) {
        return { ...i, quantity: item.quantity + change };
      }
      return i;
    });

    notify("error", t("stock_not_enought"), "", 4000);
  }
  processing.value = false;
};

const removeItem = async (item: any) => {
  await updateQuantity(item, -1 * item.quantity);
};

const clearCart = async () => {
  processing.value = true;
  await store.clearCart();
  cart.value = null;
  processing.value = false;
};

const handlePurchase = () => {
  router.push({
    name: "pay-cart",
    query: {
      payment_type_id: selected_payment_type.value.id,
      pay_currency: selected_currency.value.id,
      location_id: selected_location.value.id,
    } as any,
  });
};

const continueShopping = () => {
  router.push("/product");
};

const breakpoints = {
  0: { slidesPerView: 1, spaceBetween: 0 },
  859: { slidesPerView: 2.5, spaceBetween: 1 },
  1050: { slidesPerView: 3, spaceBetween: 1 },
  1200: { slidesPerView: 2, spaceBetween: 1 },
  1400: { slidesPerView: 2.5, spaceBetween: 1 },
  1700: { slidesPerView: 3.5, spaceBetween: 1 },
  2000: { slidesPerView: 3, spaceBetween: 1 },
};
</script>

<style scoped>
/* Estilo para el RadioButton con colores pastel */
.pastel-btn {
  background-color: rgba(68, 156, 168, 0.2) !important;
  border: none !important;
  color: black !important;
  transition: all 0.3s ease-in-out;
}
.pastel-btn:hover {
  background-color: rgba(68, 156, 168, 0.4) !important;
}

/* Personalización del Skeleton */
:deep(.p-skeleton) {
  background-color: rgba(68, 156, 168, 0.2) !important;
}
::v-deep .p-radiobutton-checked .p-radiobutton-box {
  background-color: #449ca8 !important;
  border-color: #449ca8 !important;
}

.button {
  background-color: #449ca8 !important;
}
</style>
