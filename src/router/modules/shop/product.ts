export const productRoutes = [
  {
    path: "product/:id",
    name: "product.details",
    component: () => import("@/pages/product/[id].vue"),
  },
];
