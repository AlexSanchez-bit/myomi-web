export const brandRoutes = [
  {
    path: "brand/:id",
    name: "brand.details",
    component: () => import("@/pages/category/[id].vue"),
    props: (route) => {
      return { brand_id: route.params.id };
    },
  },
];
