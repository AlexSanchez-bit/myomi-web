import { createRouter, createWebHistory } from "vue-router";
import { useSplashStore } from "@/stores/SplashScreen";
import { productRoutes } from "./modules/shop/product";
import DefaultLayout from "@/layouts/default.vue";
import { materialRoutes } from "./modules/material";
import { brandRoutes } from "./modules/brand";
import { cartRoutes } from "./modules/shop/cart";
import { userRoutes } from "./modules/user";
import { historyRoutes } from "./modules/history";

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
          props: (route) => {
            return { category_id: route.params.id };
          },
        },
        ...productRoutes,
        ...materialRoutes,
        ...cartRoutes,
        ...brandRoutes,
        ...userRoutes,
        ...historyRoutes,
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
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  disable();
});

export default router;
