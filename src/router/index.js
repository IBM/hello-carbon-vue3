import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useErrorStore } from "@/stores/useErrorStore.js";

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
      path: "/build-a-bug",
      name: "build-a-bug",
      component: () => import("../views/BuildABugView.vue"),
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
    {
      path: "/error-demo",
      name: "error-demo",
      component: () => import("../views/ErrorDemo.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "ErrorView",
      component: () => import("../views/ErrorView.vue"),
      beforeEnter: (to, from, next) => {
        const errorStore = useErrorStore();
        if (!errorStore.err)
          errorStore.$patch({ info: "not found", error: new Error("not found") });
        next();
      },
    },
  ],
});

export default router;
