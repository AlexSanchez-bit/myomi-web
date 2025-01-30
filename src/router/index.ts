import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/AuthStore";
import { useSplashStore } from "@/stores/SplashScreen";
import DefaultLayout from "@/layouts/default.vue";

const router = createRouter({
  history: createWebHistory("#"),
  routes: [
    {
      path: "/",
      name: "home",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "home-view",
          component: () => import("@/pages/index.vue"),
        },
        {
          path: "category/:id",
          name: "category.details",
          component: () => import("@/pages/filters.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/pages/Auth/Login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/pages/Auth/Register.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      component: () => import("@/pages/404.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const { enable } = useSplashStore();
  enable();
  if (!authStore.authenticated && to.name != "login") {
    next("login");
  } else {
    next();
  }
});

router.afterEach((to, from) => {
  const { disable } = useSplashStore();
  disable();
});

export default router;
