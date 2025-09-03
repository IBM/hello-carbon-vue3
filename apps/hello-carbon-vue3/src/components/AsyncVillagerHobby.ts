import { defineAsyncComponent, h } from "vue";
import { CvSkeletonText } from "@carbon/vue/src/components/CvSkeletonText";

// Async wrapper for VillagerHobby with immediate skeleton placeholder
// For development, you can simulate a slow network by setting VITE_ASYNC_DELAY_MS
// Example: VITE_ASYNC_DELAY_MS=2000 npm run dev
const AsyncVillagerHobby = defineAsyncComponent({
  loader: () => {
    const importPromise = import("@/components/VillagerHobby.vue");

    // In dev, optionally delay resolving the loader so the skeleton is visible
    if (import.meta.env.DEV) {
      const env = import.meta.env as unknown as { VITE_ASYNC_DELAY_MS?: string };
      const raw = env.VITE_ASYNC_DELAY_MS;
      const ms = Number(raw ?? 1200);
      const delayMs = Number.isFinite(ms) ? ms : 1200;
      return new Promise((resolve: never) => {
        setTimeout(() => {
          importPromise.then(resolve);
        }, delayMs);
      });
    }

    // In prod, load immediately
    return importPromise;
  },
  loadingComponent: {
    setup() {
      return () => h(CvSkeletonText, { width: "100%", lineCount: 4, className: "mt-4!" });
    },
  },
  delay: 0,
});

export default AsyncVillagerHobby;
