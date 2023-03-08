import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/fish",
      name: "fish",
      // route level code-splitting
      // this generates a separate chunk (Fish.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/FishView.vue"),
    },
    {
      path: "/bugs",
      name: "bugs",
      component: () => import("../views/BugsView.vue"),
    },
    {
      path: "/villagers",
      name: "villagers",
      component: () => import("../views/VillagersView.vue"),
    },
  ],
});

export default router;
