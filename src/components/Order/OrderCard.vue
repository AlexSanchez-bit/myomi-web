<template>
  <div class="order-card">
    <div class="order-header">
      <h3>{{ $t("order.orderNumber") }}{{ order.id }}</h3>
      <span class="status" :class="{
        'bg-green-400/60': order.status == 'PAID',
        'bg-red-400/60': order.status == 'CANCELLED',
        'bg-yellow-200/60': order.status == 'CREATED',
      }">{{ getStatusText(order.status) }}</span>
    </div>

    <div class="order-info">
      <p>
        <strong>{{ $t("order.total") }}:</strong>
        {{ order.total * order.currency.change_value }}
        {{ order.currency?.name }}
        <i v-if="order.delivery_payment">
          +
          {{ (order.delivery_payment * order.delivery_currency?.change_value).toFixed(2) }}
          {{ order.delivery_currency?.name }} ({{ $t("delivery") }})
        </i>
      </p>
      <p class="flex items-center gap-1 flex-row">
        <strong>{{ $t("order.paymentMethod") }}:</strong>
        <span class="flex items-center flex-row">
          <img v-if="order.payment_type?.icon" :src="order.payment_type.icon" class="payment-icon" />
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
      <Button @click="generateInvoice" :loading="loading">
        {{ $t("order.generateInvoice") }}
      </Button>
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
import { usePaymentTypeService } from "@/composables/PaymentTypes/usePaymentTypes";
import { useCurrencyService } from "@/composables/Currency/useCurrencyService";
import { Pagination } from "@/utils/entities/Pagination";
import { useGeneralConfigService } from "@/composables/GeneralConfigs/useGeneralConfigService";
import Button from 'primevue/button'

const { t } = useI18n();

const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
});

const paymetTypeService = usePaymentTypeService()
const currencyService = useCurrencyService()
const generalConfigService = useGeneralConfigService()

const showDetails = ref(false);

// Computed properties
const totalProducts = computed(() =>
  props.order.products.reduce((sum, p) => sum + p.quantity, 0),
);

// Formatear Fecha
const formatDate = (dateString) => new Date(dateString).toLocaleDateString();
const loading = ref(false)

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
  loading.value = true
  const order = props?.order || {};

  const doc = new jsPDF();
  const pageHeight = doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.getWidth();

  const lightYellow = "#fbea84";
  const defaultTextColor = "#000000";
  const lightGray = "#CCCCCC";

  let currentY = 10;

  // 1. Logo (Top-Left)
  const logoPath = "/logo/logo_invoice.png"; // As in your original code
  const logoImgWidth = 40;
  const logoImgHeight = 35;
  const logoX = 15;
  const logoY = 15;

  try {
    const img = new Image(); // Browser environment Image object
    img.src = logoPath;
    await new Promise((resolve, reject) => {
      img.onload = () => {
        doc.addImage(img, "PNG", logoX, logoY, logoImgWidth - 1, logoImgHeight);
        resolve();
      };
      img.onerror = (err) => {
        console.error("Error loading logo, drawing placeholder:", err);
        // Fallback: Draw a placeholder styled like the logo if image fails
        doc.setFillColor("#FDB813"); // Orange color from image logo
        doc.ellipse(logoX + logoImgWidth / 2, logoY + logoImgHeight / 2, logoImgWidth / 2, logoImgHeight / 2.2, 'F'); // Oval shape
        doc.setTextColor("#FFFFFF"); // White text
        doc.setFontSize(6);
        doc.setFont("helvetica", "bold");
        doc.text("MYOM:I", logoX + logoImgWidth / 2, logoY + logoImgHeight / 2 - 1.5, { align: 'center' });
        doc.setFontSize(4.5);
        doc.setFont("helvetica", "normal");
        doc.text("Cosmetico Coreano", logoX + logoImgWidth / 2, logoY + logoImgHeight / 2 + 2, { align: 'center' });
        resolve(); // Resolve even if placeholder is drawn
      };
    });
  } catch (error) {
    console.error("Exception during logo processing:", error);
    // Fallback placeholder code again, just in case promise setup itself fails
    doc.setFillColor("#FDB813");
    doc.ellipse(logoX + logoImgWidth / 2, logoY + logoImgHeight / 2, logoImgWidth / 2, logoImgHeight / 2.2, 'F');
    doc.setTextColor("#FFFFFF");
    doc.setFontSize(6);
    doc.setFont("helvetica", "bold");
    doc.text("MYOM:I", logoX + logoImgWidth / 2, logoY + logoImgHeight / 2 - 1.5, { align: 'center' });
    doc.setFontSize(4.5);
    doc.setFont("helvetica", "normal");
    doc.text("Cosmetico Coreano", logoX + logoImgWidth / 2, logoY + logoImgHeight / 2 + 2, { align: 'center' });
  }
  currentY = logoY + logoImgHeight + 10;

  // 2. "FACTURA" title, NÚMERO, FECHA (Top-Right)
  const facturaTitleX = pageWidth - 75; // X position for "FACTURA"
  doc.setFontSize(28);
  doc.setFont("helvetica", "normal"); // The image font isn't extremely bold here
  doc.setTextColor(defaultTextColor);
  doc.text("FACTURA", facturaTitleX, 30);

  doc.setFontSize(10);
  const numeroLabel = "NÚMERO :";
  const fechaLabel = "FECHA :";
  // Using static data from image, replace with order.id / order.created_at as needed
  const invoiceNum = order.id.toString();
  const invoiceDateStr = new Date(order.created_at).toLocaleDateString('en-GB'); // 'en-GB' for dd/mm/yyyy

  const labelX = pageWidth - 70; // X for labels "NÚMERO:", "FECHA:"
  const valueX = pageWidth - 45; // X for actual number and date

  doc.text(numeroLabel, labelX, 40);
  doc.text(invoiceNum, valueX, 40);
  doc.text(fechaLabel, labelX, 46); // Increased spacing
  doc.text(invoiceDateStr, valueX, 46);

  currentY = Math.max(currentY, 46 + 15);

  // 3. "Datos de Cliente"
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(defaultTextColor);
  doc.text("Datos de Cliente", 15, currentY);
  currentY += 7;

  const clientData = [
    { label: "Nombre y Apellido :", value: order.contact?.name },
    { label: "Número de telefono :", value: order.contact?.phone_number },
    { label: "Dirección actual :", value: `${order.contact?.address}, ${order.contact.municipality.name}` },
  ];

  const dataLabelX = 15;
  const dataValueBgX = 60;
  const dataValueX = dataValueBgX + 2; // Text start with padding
  const dataValueBgWidth = pageWidth - 30;
  const clientDataLineHeight = 7;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  clientData.forEach(item => {
    const valueMaxWidth = dataValueBgWidth / 2; // Resta un margen interior
    const valueLines = doc.splitTextToSize(item.value, valueMaxWidth);

    // Calcular la altura total necesaria en función de la línea más larga
    const linesCount = valueLines.length
    const blockHeight = (linesCount) * (linesCount > 1 ? 5 : clientDataLineHeight);

    // Fondo
    doc.setFillColor(lightYellow);
    doc.rect(15, currentY, dataValueBgWidth, blockHeight, "F");

    // Texto
    doc.setFont("helvetica", "bold");
    doc.setTextColor(defaultTextColor);
    doc.text(item.label, dataLabelX + 3, currentY + clientDataLineHeight * 0.65);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(defaultTextColor);
    doc.text(valueLines, dataValueX + 3, currentY + clientDataLineHeight * 0.65, { maxWidth: valueMaxWidth });

    currentY += blockHeight + 1.5; // Espaciado
  });
  currentY += 5;

  // 4. Products Table
  const currencyName = order.currency?.name;
  const currencyRate = order.currency?.change_value;

  const products = order.products

  const tableData = products.map(p => {
    const price = p.price || 0;
    const quantity = p.quantity || 1;
    return [
      p.product?.name || "Producto no disponible",
      `$ ${(price * currencyRate).toFixed(2)}`,
      quantity,
      `${(price * quantity * currencyRate).toFixed(2)} ${currencyName}`
    ];
  });

  const subtotalAmount = products.reduce((sum, p) => {
    const price = p.price || 0;
    const quantity = p.quantity || 1;
    return sum + (price * quantity * currencyRate);
  }, 0);

  autoTable(doc, {
    startY: currentY,
    head: [["PRODUCTO", "PRECIO", "CANT.", "TOTAL"]],
    body: tableData,
    foot: [
      [{ content: 'SUBTOTAL', colSpan: 3, styles: { halign: 'center', fontStyle: 'bold', cellPadding: { right: 2, top: 2 } } },
      { content: `${subtotalAmount.toFixed(2)} ${currencyName}`, styles: { halign: 'right', fontStyle: 'bold' } }]
    ],
    theme: 'grid', // 'grid' for visible lines like image
    headStyles: {
      fillColor: [255, 255, 255], // White background
      textColor: defaultTextColor,
      fontStyle: 'bold',
      lineWidth: 0.1,
      lineColor: [180, 180, 180], // Lighter gray lines for header
      halign: 'center'
    },
    bodyStyles: {
      lineWidth: 0.1,
      lineColor: [180, 180, 180], // Lighter gray lines for body
      textColor: defaultTextColor,
      cellPadding: { top: 1.5, right: 2, bottom: 1.5, left: 2 }
    },
    footStyles: {
      fillColor: [255, 255, 255],
      lineWidth: 0.1,
      lineColor: [180, 180, 180],
      textColor: defaultTextColor,
      fontStyle: 'bold',
    },
    columnStyles: {
      0: { halign: 'left', cellWidth: 'auto' }, // PRODUCTO
      1: { halign: 'right', cellWidth: 30 },    // PRECIO
      2: { halign: 'center', cellWidth: 20 },   // CANT.
      3: { halign: 'right', cellWidth: 35 }     // TOTAL
    },
    margin: { left: 15, right: 15 },
    tableLineWidth: 0.1,
    tableLineColor: [180, 180, 180],
  });

  currentY = (doc).lastAutoTable.finalY + 10;

  // 5. "PROMOCIÓN" and "DOMICILIO/SUBTOTAL/CAMBIO" Section
  const promoX = 15;
  const DscX = pageWidth / 2 + 15; // Domicilio/Subtotal/Cambio X

  doc.setFontSize(9); // Smaller font for these sections as per image
  let promoColY = currentY;

  doc.setFont("helvetica", "bold");
  doc.text("Tipo de pago", promoX, promoColY);
  promoColY += 5;
  doc.setFont("helvetica", "normal");
  const paymentTypes = await paymetTypeService.getAll([], new Pagination(0, 100), [])
  const promotions = [ // Replace with dynamic data if available
    ...paymentTypes.map(pt => ({ label: pt.name, checked: pt.id === order.payment_type?.id })),
  ];

  promotions.forEach(promo => {
    doc.setLineWidth(0.2);
    doc.setDrawColor(defaultTextColor);
    doc.rect(promoX, promoColY - 2.5, 2.5, 2.5, "S"); // Checkbox square
    if (promo.checked) {
      doc.setFont("helvetica", "bold");
      doc.text("x", promoX + 0.6, promoColY - 0.5); // 'x' inside checkbox
      doc.setFont("helvetica", "normal");
    }
    doc.text(promo.label, promoX + 4, promoColY - 0.5);
    promoColY += 5;
  });

  let DscColY = currentY;
  doc.setFont("helvetica", "bold");
  doc.text("DOMICILIO", DscX, DscColY);
  const delivery_text = `${(order.delivery_payment * order.delivery_currency.change_value).toFixed(2)} ${order.delivery_currency.name}`
  doc.text(delivery_text, DscX + 35, DscColY);
  DscColY += 5;

  doc.text("SUBTOTAL", DscX, DscColY);
  const subtotalText = `${subtotalAmount.toFixed(2)} ${currencyName} ${order.payment_type?.delivery_included ? '' : '+ ' + delivery_text}`;
  const subtotalValueX = DscX + 35; // Position for the subtotal value
  const subtotalYellowBoxWidth = subtotalText.length * 2; // Width of yellow box for subtotal

  doc.setFillColor(lightYellow);
  doc.rect(subtotalValueX - 2, DscColY - 3.5, subtotalYellowBoxWidth, 5, "F");
  doc.setFont("helvetica", "normal");
  doc.setTextColor(defaultTextColor);
  doc.text(subtotalText, subtotalValueX, DscColY);
  DscColY += 5;

  doc.setFont("helvetica", "bold");
  doc.text("CAMBIO", DscX, DscColY);
  doc.text(`${order.change_value ?? ''} ${order.change_value ? order.currency.name : ''}`, subtotalValueX, DscColY - 0.5);

  currentY = Math.max(promoColY, DscColY) + 7;

  // Line separator
  doc.setDrawColor(lightGray);
  doc.setLineWidth(0.3);
  doc.line(15, currentY, pageWidth - 15, currentY);
  currentY += 7;

  // 6. "MONEDA DE PAGO" and Bank Details
  let monedaPagoColY = currentY;
  doc.setFont("helvetica", "bold");
  doc.text("MONEDA DE PAGO", promoX, monedaPagoColY);
  monedaPagoColY += 5;
  doc.setFont("helvetica", "normal");

  // Determine selected payment method (e.g., from order.payment_type.name or default to USD)
  const selectedcurrency = (order.currency?.name || "USD").toUpperCase();
  const currencies = await currencyService.getAll([], new Pagination(0, 20), [])
  const paymentMethods = currencies.map(c => ({ label: c.name, checked: selectedcurrency == c.name }));

  paymentMethods.forEach(method => {
    doc.setLineWidth(0.2);
    doc.setDrawColor(defaultTextColor);
    doc.rect(promoX, monedaPagoColY - 2.5, 2.5, 2.5, "S");
    if (method.checked) {
      doc.setFont("helvetica", "bold");
      doc.text("x", promoX + 0.6, monedaPagoColY - 0.5);
      doc.setFont("helvetica", "normal");
    }
    doc.text(method.label, promoX + 4, monedaPagoColY - 0.5);
    monedaPagoColY += 5;
  });

  // Bank Details (MYOM:I COSMETICO COREANO)
  let bankDetailsColY = currentY;
  const bankBoxX = DscX; // Align with DOMICILIO column
  const bankBoxWidth = pageWidth - bankBoxX - 15;
  const bankBoxCellHeight = 6;
  const bankTextVPadding = bankBoxCellHeight * 0.7;

  doc.setLineWidth(0.1);
  doc.setDrawColor(defaultTextColor);

  doc.rect(bankBoxX, bankDetailsColY, bankBoxWidth, bankBoxCellHeight, "S");
  doc.setFont("helvetica", "bold");
  doc.text("MYOM:I COSMETICO COREANO", bankBoxX + bankBoxWidth / 2, bankDetailsColY + bankTextVPadding, { align: 'center' });
  bankDetailsColY += bankBoxCellHeight;

  doc.setFont("helvetica", "normal");
  const bankDetailsTextX = bankBoxX + 2;
  const bankDetailsValueX = bankBoxX + 23; // X for the account numbers etc.

  const [{ transfermovil_card_number, transfermovil_check_number }] = await generalConfigService.getAll([], new Pagination(0, 1), [])
  console.log(transfermovil_card_number, transfermovil_check_number)

  doc.rect(bankBoxX, bankDetailsColY, bankBoxWidth, bankBoxCellHeight, "S");
  doc.text("Cuenta CUP:", bankDetailsTextX, bankDetailsColY + bankTextVPadding);
  doc.text(transfermovil_card_number, bankDetailsValueX, bankDetailsColY + bankTextVPadding);
  bankDetailsColY += bankBoxCellHeight;

  doc.rect(bankBoxX, bankDetailsColY, bankBoxWidth, bankBoxCellHeight, "S");
  doc.text("Confirmación:", bankDetailsTextX, bankDetailsColY + bankTextVPadding);
  doc.text(transfermovil_check_number, bankDetailsValueX, bankDetailsColY + bankTextVPadding);

  currentY = Math.max(monedaPagoColY, bankDetailsColY) + 15;

  // 7. "GRACIAS POR SU COMPRA" Footer
  const graciasText = "GRACIAS POR SU COMPRA";
  doc.setFontSize(14); // Slightly smaller than FACTURA title but prominent
  doc.setFont("roboto", "bold");
  const graciasRectHeight = 9;

  // Position near bottom or after content.
  // If fixed at bottom and there's not enough space, add new page or adjust.
  if (currentY + graciasRectHeight + 5 > pageHeight - 10) { // 10 for bottom margin
    // If content is too close to bottom, move gracias to new page or adjust Y
    // For simplicity, let's ensure it's not too low, or it might be on next page if content is long
    if (pageHeight - currentY < 25) { // Not much space left
      doc.addPage();
      currentY = 15; // Reset Y for new page
    }
  }


  doc.setFillColor(lightYellow);
  doc.rect(15, currentY, pageWidth - 30, graciasRectHeight, "F");

  doc.setTextColor(defaultTextColor);
  doc.text(graciasText, pageWidth / 2, currentY + graciasRectHeight * 0.7, { align: 'center' });

  // Save the PDF
  const fileName = `Factura_MYOM_${order.id || "preview"}.pdf`;
  doc.save(fileName);
  loading.value = false
  console.log(`${fileName} generated.`);
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
  width: 100%;
  gap: 3rem;
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
