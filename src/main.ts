import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import "primevue/resources/themes/aura-light-green/theme.css";
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";
import PrimeVue from "primevue/config";
import Tooltip from "primevue/tooltip";

import App from "./App.vue";
import router from "./router";

import { i18n } from "./setup";

const app = createApp(App);
app.use(ConfirmationService);

app.use(ToastService);
app.use(router);
app.use(i18n);
app.use(PrimeVue);
app.use(ConfirmationService);
app.directive("tooltip", Tooltip);

app.use(createPinia());
app.mount("#app");
