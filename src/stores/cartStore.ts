import { CartService } from "@/services/Cart/Cart.service";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useToastStorage } from "./ToasterStorage";
import { useI18n } from "vue-i18n";

export const useCartStore = defineStore("cart-store", () => {
  const cartService = new CartService();
  const quantity = ref(0);
  const loading = ref(false);

  const cart_id = ref("");

  const getMyCart = async () => {
    const { t } = useI18n();
    loading.value = true;

    const { data, error } = await cartService.getMyCart();

    if (error) {
      const { data: cart_data, error: cart_error } =
        await cartService.createCart();
      if (cart_error) {
        useToastStorage().notify(
          "danger",
          t("error"),
          t("cart_creation_error"),
          3000,
        );
      } else {
        cart_id.value = cart_data.id;
      }
      console.log(data);
      return { data: cart_data, error: cart_error };
    }

    loading.value = false;
    if (data) {
      cart_id.value = data.id;
      quantity.value = data.cart_count;
    }
    return { data, error };
  };

  const updateProductQuantity = async (product_id: string, ammount: number) => {
    const resp = await cartService.addProductToCart(
      product_id,
      cart_id.value,
      ammount,
    );
    if (resp) {
      quantity.value += ammount;
    }
    return resp;
  };

  return {
    quantity,
    loading,
    getMyCart,
    updateProductQuantity,
  };
});
