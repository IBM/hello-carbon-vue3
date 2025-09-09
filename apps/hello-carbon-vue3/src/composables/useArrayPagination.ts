import { reactive } from "vue";
import type { TablePagination } from "@/types/ui";

interface Options {
  length?: number;
}

/**
 * Simple array pagination state machine.
 * Usage:
 *  const { state, pageSlice, set } = useArrayPagination({ length: 7 })
 *  const pageItems = computed(() => pageSlice(items.value))
 */
export function useArrayPagination(opts: Options = {}) {
  const state = reactive<TablePagination>({ start: 1, length: opts.length ?? 7, page: 1 });

  const set = (next: Partial<TablePagination>) => {
    Object.assign(state, next);
  };

  const pageSlice = <T>(arr: readonly T[]) => {
    const startIdx = Math.max(0, (state.start ?? 1) - 1);
    const endIdx = startIdx + (state.length ?? 0);
    return arr.slice(startIdx, endIdx);
  };

  return { state, pageSlice, set };
}
