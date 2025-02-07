export const materialRoutes = [
  {
    path: "material/:id",
    name: "material.details",
    component: () => import("@/pages/material/[id].vue"),
    props: (route) => {
      return { material_id: route.params.id };
    },
  },
];
