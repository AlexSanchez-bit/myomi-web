<template>
  <div>
    <slot name="content" :add="addProductToCart" :loading="loading">
      <Button
        icon="pi pi-cart-arrow-down"
        @click="addProductToCart()"
        :loading="loading"
        class="ml-2 !bg-[#449ca8]"
      />
    </slot>
  </div>
</template>
<script setup lang="ts">
import { useToastStorage } from "@/stores/ToasterStorage";
import { useCartStore } from "@/stores/cartStore";
import Button from "primevue/button";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { notify } = useToastStorage();
const { updateProductQuantity } = useCartStore();
const props = defineProps<{
  product_id: string;
}>();

const loading = ref(false);

const addProductToCart = async (quantity: number = 1) => {
  loading.value = true;
  const resp: any = await updateProductQuantity(props.product_id, quantity);
  loading.value = false;
  if (resp && !resp.message) {
    notify(
      "success",
      t("product_added"),
      t("product_successfully_added"),
      3000,
    );
  } else {
    console.log(resp);
    notify("error", t("product_not_added"), t(resp.message), 3000);
  }
};
</script>
