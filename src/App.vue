<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Toast from "primevue/toast";
import ConfirmDialog from "primevue/confirmdialog";
import { useToastStorage } from "./stores/ToasterStorage";
import { useToast } from "primevue/usetoast";
import { useAuthStore } from "./stores/AuthStore";
import { onMounted } from "vue";
import { supabase } from "./setup";
import { useCartStore } from "./stores/cartStore";
const toastStorage = useToastStorage();
const toast = useToast();
toastStorage.addtoaster(toast);

const { authenticated, autenticate, userData } = useAuthStore();
const { getMyCart } = useCartStore();
onMounted(async () => {
  const { data } = await supabase.auth.getSession();
  const session = data.session; // Si hay sesión, se almacena aquí

  if (session) {
    console.log("✅ Sesión activa:", session);
  } else {
    console.log("❌ No hay sesión activa");
    const { data, error } = await supabase.auth.signInAnonymously();
    if (!error) {
      autenticate(data.user);
    }
  }
  getMyCart();
});
</script>

<template>
  <RouterView />
  <Toast />
  <ConfirmDialog></ConfirmDialog>
</template>
