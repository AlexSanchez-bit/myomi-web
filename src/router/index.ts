import { createRouter, createWebHistory } from "vue-router";
import { useSplashStore } from "@/stores/SplashScreen";
import { productRoutes } from "./modules/shop/product";
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
          component: () => import("@/pages/category/[id].vue"),
        },
        ...productRoutes,
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
  const { enable } = useSplashStore();
  enable();
  next();
});

router.afterEach((to, from) => {
  const { disable } = useSplashStore();
  disable();
});

export default router;
