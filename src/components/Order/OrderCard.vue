<template>
  <div class="order-card">
    <div class="order-header">
      <h3>{{ $t("order.orderNumber") }}{{ order.id }}</h3>
      <span
        class="status"
        :class="{
          'bg-green-400/60': order.status == 'PAID',
          'bg-red-400/60': order.status == 'CANCELLED',
          'bg-yellow-200/60': order.status == 'CREATED',
        }"
        >{{ getStatusText(order.status) }}</span
      >
    </div>

    <div class="order-info">
      <p>
        <strong>{{ $t("order.total") }}:</strong>
        {{ order.total * order.currency.change_value }}
        {{ order.currency?.name }}
        <i v-if="order.delivery_payment">
          +
          {{( order.delivery_payment * order.delivery_currency?.change_value ).toFixed(2)}}
          {{ order.delivery_currency?.name }} ({{ $t("delivery") }})
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
          {{ order.contact.municipality.name }}
        </p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

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

// Función para generar la factura
const generateInvoice = async () => {
  if (!props.order) return;

  const doc = new jsPDF();

  // Agregar logo
  const logoPath = "/logo/logo-pdf.PNG";
  const imgWidth = 50;
  const imgHeight = 50;

  try {
    const img = new Image();
    img.src = logoPath;
    await new Promise((resolve, reject) => {
      img.onload = () => {
        doc.addImage(img, "PNG", 140, 8, imgWidth, imgHeight);
        resolve();
      };
      img.onerror = reject;
    });
  } catch (error) {
    console.error("Error cargando el logo:", error);
  }

  // Variables de conversión
  const currencyName = props.order.currency?.name || "USD";
  const currencyRate = props.order.currency?.change_value || 1;

  // Información principal
  doc.setFontSize(18);
  doc.text(`Factura - Orden #${props.order.id}`, 14, 20);

  doc.setFontSize(12);
  doc.text(`Cliente: ${props.order.contact?.name || "No disponible"}`, 14, 30);
  doc.text(
    `Teléfono: ${props.order.contact?.phone_number || "No disponible"}`,
    14,
    38,
  );
  doc.text(
    `Dirección: ${props.order.contact?.address || "No disponible"}, ${props.order.contact?.municipality || ""}`,
    14,
    46,
  );
  doc.text(
    `Fecha: ${new Date(props.order.created_at).toLocaleDateString()}`,
    14,
    54,
  );
  doc.text(
    `Método de Pago: ${props.order.payment_type?.name || "No disponible"}`,
    14,
    62,
  );

  // Tabla de productos
  if (props.order.products?.length) {
    const productsData = props.order.products.map((product, index) => [
      product.product?.name || "Producto eliminado",
      `$${(product.price * currencyRate).toFixed(2)} ${currencyName}`,
      product.quantity || 1,
      `$${(product.price * product.quantity * currencyRate).toFixed(2)} ${currencyName}`,
    ]);

    autoTable(doc, {
      startY: 70,
      head: [["Producto", "Precio Unit.", "Cantidad", "Subtotal"]],
      headStyles: {
        fillColor: [255, 238, 169],
        textColor: [0, 0, 0],
      },
      body: productsData,
    });

    let finalY = doc.lastAutoTable.finalY || 80;

    // Total
    doc.setFontSize(14);
    doc.text(
      `Total: $${(props.order.total * currencyRate).toFixed(2)} ${currencyName}`,
      14,
      finalY + 10,
    );
    finalY += 10;

    // Pago de envío si existe
    if (
      props.order.delivery_payment !== null &&
      props.order.delivery_currency
    ) {
      const deliveryTotal = (
        props.order.delivery_payment *
        props.order.delivery_currency.change_value
      ).toFixed(2);
      doc.text(
        `Pago de Envío: $${deliveryTotal} ${props.order.delivery_currency.name}`,
        14,
        finalY + 10,
      );
    }
  } else {
    doc.text("No hay productos en esta orden.", 14, 80);
  }

  // Guardar el PDF
  doc.save(`Factura_Orden_${props.order.id || "sin_id"}.pdf`);
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
  @apply text-black;
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
  background-color: rgba(68, 156, 168, 0.2) !important;
  color: black;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: 0.3s;
}

button:hover {
  background-color: rgba(68, 156, 168, 0.4) !important;
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
