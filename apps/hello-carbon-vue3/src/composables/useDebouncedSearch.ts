import { ref } from "vue";
import { refDebounced } from "@vueuse/core";

/**
 * Debounce a search ref. Default delay: 250ms
 */
export function useDebouncedSearch(source: ReturnType<typeof ref<string>>, ms = 250) {
  return refDebounced(source, ms);
}
