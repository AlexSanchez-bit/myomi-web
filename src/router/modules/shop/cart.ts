export const cartRoutes = [
  {
    path: "cart",
    name: "cart",
    component: () => import("@/pages/cart.vue"),
  },
  {
    path: "pay-cart",
    name: "pay-cart",
    component: () => import("@/pages/pay-cart.vue"),
  },
];
