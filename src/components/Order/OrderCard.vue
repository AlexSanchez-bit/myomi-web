<template>
  <div class="order-card">
    <div class="order-header">
      <h3>{{ $t("order.orderNumber") }}{{ order.id }}</h3>
      <span class="status">{{ getStatusText(order.status) }}</span>
    </div>

    <div class="order-info">
      <p>
        <strong>{{ $t("order.total") }}:</strong>
        {{ order.total * order.currency.change_value }}
        {{ order.currency?.name }}
        <i v-if="order.delivery_payment">
          +
          {{ order.currency.name }}
          {{ order.delivery_payment * order.delivery_currency?.change_value }}
          {{ order.delivery_currency?.name }}
        </i>
      </p>
      <p class="flex items-center gap-1 flex-row">
        <strong>{{ $t("order.paymentMethod") }}:</strong>
        <span class="flex items-center flex-row">
          <img
            v-if="order.payment_type?.icon"
            :src="order.payment_type.icon"
            class="payment-icon"
          />
          {{ order.payment_type?.name || $t("order.unknown") }}
        </span>
      </p>
      <p>
        <strong>{{ $t("order.date") }}:</strong>
        {{ formatDate(order.created_at) }}
      </p>
      <p>
        <strong>{{ $t("order.productsCount") }}:</strong> {{ totalProducts }}
      </p>
      <p>
        <strong>{{ $t("order.contactName") }}:</strong> {{ order.contact.name }}
      </p>
    </div>

    <div class="order-actions">
      <button @click="toggleDetails">
        {{ showDetails ? $t("order.hideDetails") : $t("order.viewDetails") }}
      </button>
      <button @click="generateInvoice">
        {{ $t("order.generateInvoice") }}
      </button>
    </div>

    <!-- Sección expandible con transición -->
    <transition name="fade">
      <div v-if="showDetails" class="order-details">
        <h4>{{ $t("order.productDetails") }}</h4>
        <ul>
          <li v-for="product in order.products" :key="product.id">
            <img :src="product.product.images?.[0]" class="product-image" />
            <p class="w-28">
              <strong>{{ product.product.name }}</strong>
            </p>
            <div class="grid grid-cols-2 gap-2">
              <p>
                <strong>{{ $t("order.price") }}:</strong>
                <span class="flex items-center gap-1 flex-row">
                  {{ product.price * order.currency.change_value }}
                  {{ order.currency?.name }}
                </span>
              </p>
              <p>
                <strong>{{ $t("order.quantity") }}:</strong>
                {{ product.quantity }}
              </p>
            </div>
          </li>
        </ul>

        <h4>{{ $t("order.contactDetails") }}</h4>
        <p>
          <strong>{{ $t("order.contactPhone") }}:</strong>
          {{ order.contact.phone_number }}
        </p>
        <p>
          <strong>{{ $t("order.contactAddress") }}:</strong>
          {{ order.contact.address }}
        </p>
        <p>
          <strong>{{ $t("order.contactCity") }}:</strong>
          {{ order.contact.municipality }}
        </p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
});

const showDetails = ref(false);

// Computed properties
const totalProducts = computed(() =>
  props.order.products.reduce((sum, p) => sum + p.quantity, 0),
);

// Formatear Fecha
const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

// Estado de la orden
const getStatusText = (status) => {
  const statusMap = {
    PAID: t("order.status.paid"),
    CREATED: t("order.status.created"),
    CANCELLED: t("order.status.cancelled"),
    DELIVERED: t("order.status.delivered"),
  };
  return statusMap[status] || t("order.unknown");
};

// Expandir / Contraer detalles
const toggleDetails = () => {
  showDetails.value = !showDetails.value;
};

// Generar Factura (Ejemplo)
const generateInvoice = () => {
  alert(`${t("order.generateInvoice")} ✅`);
};
</script>

<style scoped>
.order-card {
  background: #ffffff;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  max-width: 420px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  font-family: "Inter", sans-serif;
  transition: all 0.3s ease;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;
}

.status {
  font-size: 14px;
  background: #4caf50;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
}

.order-info p {
  margin: 8px 0;
  font-size: 14px;
}

.order-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
}

button {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: 0.3s;
}

button:hover {
  background: #0056b3;
}

/* Detalles de productos */
.order-details {
  margin-top: 12px;
  padding: 12px;
  background: white;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.order-details ul {
  list-style: none;
  padding: 0;
}

.order-details li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-bottom: 1px solid #eee;
  font-size: 13px;
}

.product-image {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  object-fit: cover;
}

.payment-icon {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

/* Animaciones */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
