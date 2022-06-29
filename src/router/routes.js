const routes = [
  {
    path: "/",
    component: () => import("layouts/NotLoggedInLayout.vue"),
    children: [
      {
        path: "",
        name: "homePage",
        component: () => import("pages/LoginPage.vue"),
      },
      {
        path: "register",
        name: "registerPage",
        component: () => import("pages/RegisterPage.vue"),
      },
      {
        path: "login",
        name: "loginPage",
        component: () => import("pages/LoginPage.vue"),
      },
    ],
  },

  {
    path: "/protected",
    component: () => import("layouts/LoggedInLayout.vue"),
    children: [
      {
        path: "",
        name: "protectedPage",
        component: () => import("pages/ProtectedHomePage.vue"),
        meta: { isRequireAuth: true },
      },
      {
        path: "/myRentedFilms",
        name: "myRentedFilmsPage",
        component: () => import("pages/ProtectedMyRentedFilmsListPage"),
        meta: { isRequireAuth: true }
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
