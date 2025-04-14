<template>
  <div class="flex items-center justify-center h-full">
    <div class="mx-auto min-w-96" ref="paypalButton"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { supabase } from "@/setup";
import { useRouter } from "vue-router";

const props = defineProps<{
  contact: any;
  currency_id: string;
  payment_type_id: string;
  change: number;
  location_id: string;
  currency_name: string;
  total: number;
}>();

const emit = defineEmits(["created_payment", "error_on_payment"]);
const paypalButton = ref(null);

const router = useRouter();

onMounted(() => {
  const paypal = (window as any).paypal as any;
  if (typeof paypal === "undefined") {
    emit("error_on_payment", "Paypal no está instalado");
    return;
  }

  paypal
    .Buttons({
      style: {
        layout: "vertical",
        color: "white",
        shape: "pill",
        label: "pay",
        height: 45,
      },
      // 1) Crear la orden en Supabase
      createOrder: async () => {
        const resp = await supabase.functions.invoke("create-payment-intent", {
          method: "POST",
          body: { ...props },
        });
        if (!resp.data.id) {
          emit("error_on_payment", resp.data.error);
        }
        return resp.data.id;
      },
      onApprove: async (data) => {
        const { data: paid, error } = await supabase.functions.invoke(
          "paypal_payment",
          {
            method: "POST",
            body: JSON.stringify({ orderID: data.orderID, ...props }),
          },
        );
        if (error || !paid?.success) {
          emit("error_on_payment");
          router.replace("/");
        } else {
          emit("created_payment");
        }
      },

      onCancel: (err) => {
        console.log(err);
      },
      onError: (err) => {
        console.log(err);
        emit("error_on_payment", "Error al procesar el pedido");
      },
    })
    .render(paypalButton.value);
});
</script>
