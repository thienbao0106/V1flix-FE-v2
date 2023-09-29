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
];
export default routes;
