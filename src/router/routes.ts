import { defineAsyncComponent } from "vue";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: defineAsyncComponent(() => import("../views/Home.vue")),
  },
  {
    path: "/profile/:username",
    name: "Profile",
    component: defineAsyncComponent(() => import("../views/Profile.vue")),
  },
  {
    path: "/watch/:title",
    name: "Series",
    component: defineAsyncComponent(() => import("../views/Series.vue")),
  },
  {
    path: "/series/:title",
    name: "DetailSeries",
    component: defineAsyncComponent(() => import("../views/DetailSeries.vue")),
  },
  {
    path: "/series",
    name: "ListSeries",
    component: defineAsyncComponent(() => import("../views/ListSeries.vue")),
  },
  {
    path: "/search",
    name: "Search",
    component: defineAsyncComponent(() => import("../views/Search.vue")),
  },
  {
    path: "/latest",
    name: "Latest",
    component: defineAsyncComponent(() => import("../views/Latest.vue")),
  },
  {
    path: "/genres/:id/:name",
    name: "Genres",
    component: defineAsyncComponent(() => import("../views/Genres.vue")),
  },
  {
    path: "/login",
    name: "Login",
    component: defineAsyncComponent(() => import("../views/Login.vue")),
  },
  {
    path: "/register",
    name: "Register",
    component: defineAsyncComponent(() => import("../views/Register.vue")),
  },
  {
    path: "/users",
    name: "Users",
    component: defineAsyncComponent(() => import("../views/Users.vue")),
  },
  {
    path: "/settings",
    name: "Settings",
    component: defineAsyncComponent(() => import("../views/UserSettings.vue")),
  },
  {
    path: "/history",
    name: "History",
    component: defineAsyncComponent(() => import("../views/History.vue")),
  },
  {
    path: "/tag/:id/:name",
    name: "Tag",
    component: defineAsyncComponent(() => import("../views/Tag.vue")),
  },
  {
    path: "/room/:roomId",
    name: "Room",
    component: defineAsyncComponent(() => import("../views/Room.vue")),
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: defineAsyncComponent(() => import("../views/NotFound.vue")),
  },
];
export default routes;
