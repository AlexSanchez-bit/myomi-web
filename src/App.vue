<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Toast from "primevue/toast";
import ConfirmDialog from "primevue/confirmdialog";
import { useToastStorage } from "./stores/ToasterStorage";
import { useToast } from "primevue/usetoast";
import { useSplashStore } from "@/stores/SplashScreen";
import SplashScreen from "./components/SplashScreen.vue";
import { useAuthStore } from "./stores/AuthStore";
import { onMounted } from "vue";
import { supabase } from "./setup";
import { useCartStore } from "./stores/cartStore";
const toastStorage = useToastStorage();
const toast = useToast();
toastStorage.addtoaster(toast);
const { active } = useSplashStore();

const { authenticated, autenticate, userData } = useAuthStore();
const { getMyCart } = useCartStore();
onMounted(async () => {
  if (!authenticated) {
    const { data, error } = await supabase.auth.signInAnonymously();
    console.log(data, error);
    if (!error) {
      autenticate(data.user);
    }
  }
  getMyCart();
});
</script>

<template>
  <!-- <SplashScreen v-if="active" /> -->
  <RouterView />
  <Toast />
  <ConfirmDialog></ConfirmDialog>
</template>
