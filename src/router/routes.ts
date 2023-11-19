import { defineAsyncComponent } from "vue";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: defineAsyncComponent(() => import("../views/Home.vue")),
  },
  {
    path: "/profile",
    name: "Profile",
    component: defineAsyncComponent(() => import("../views/Profile.vue")),
  },
  {
    path: "/series/:title",
    name: "Series",
    component: defineAsyncComponent(() => import("../views/Series.vue")),
  },
  {
    path: "/search",
    name: "Search",
    component: defineAsyncComponent(() => import("../views/Search.vue")),
  },
  {
    path: "/latest",
    name: "Latest Anime",
    component: defineAsyncComponent(() => import("../views/Latest.vue")),
  },
  {
    path: "/genres/:id/:name",
    name: "Latest Anime",
    component: defineAsyncComponent(() => import("../views/Genres.vue")),
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: defineAsyncComponent(() => import("../views/NotFound.vue")),
  },
];
export default routes;
