const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "homes", component: () => import("pages/Homes.vue") },
      { path: "homes/:id", component: () => import("pages/HomeDetails.vue") },
      {
        path: "homes/:id/report",
        component: () => import("pages/HomeReport.vue")
      },
      { path: "report", component: () => import("pages/report.vue") },
      { path: "activities", component: () => import("pages/Activities.vue") },
      { path: "residents", component: () => import("pages/Residents.vue") },
      { path: "login", component: () => import("pages/login.vue") }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
