import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/fish",
    name: "fish",
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
    path: "/error",
    name: "error",
    component: () => import("../views/ErrorView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("../views/NotFoundView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Router-level error handler (e.g., chunk load, navigation guards)
router.onError((error: unknown) => {
  const current = router.currentRoute?.value;
  const alreadyOnError = current && current.name === "error";
  try {
    console.error("Router error:", error);
  }
  catch {
    // ignore logging failure
  }
  if (!alreadyOnError) {
    const message
      = "Router error: " + ((typeof error === "object" && error && "message" in error) ? (error as Error).message : String(error ?? ""))
        || "Navigation error";
    router.replace({ name: "error", query: { code: "500", message } }).catch(() => {});
  }
});

export default router;
