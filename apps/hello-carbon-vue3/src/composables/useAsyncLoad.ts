import { ref, type Ref } from "vue";

/**
 * Simple composable to standardize async loading and error handling.
 *
 * Usage:
 *   const { loading, loadError, run } = useAsyncLoad(() => store.loadX())
 *   onMounted(() => run())
 */
export function useAsyncLoad<T = unknown>(fn: () => Promise<T>) {
  const loading: Ref<boolean> = ref(false);
  const loadError: Ref<string | null> = ref(null);

  async function run(): Promise<T | undefined> {
    loading.value = true;
    loadError.value = null;
    try {
      return await fn();
    }
    catch (e: unknown) {
      const msg = (e as { message?: string })?.message ?? String(e);
      console.error("async load error", msg);
      loadError.value = msg || "Failed to load";
    }
    finally {
      loading.value = false;
    }
  }

  return { loading, loadError, run } as const;
}
