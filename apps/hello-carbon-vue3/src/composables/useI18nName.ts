import { computed } from "vue";
import { useLanguageStore } from "@/stores/language";
import type { LocalizedNameMap } from "@/types/language";

/**
 * Returns a computed localized name from a LocalizedNameMap, falling back to a provided string.
 *
 * Example:
 *   const fishName = useI18nName(() => fish.name, fish.key)
 */
export function useI18nName(getMap: () => LocalizedNameMap | undefined | null, fallback: string) {
  const lang = useLanguageStore();
  return computed(() => {
    const key = "name-" + lang.languageObject.api;
    const map = getMap?.();
    const name = map?.[key as keyof LocalizedNameMap];
    return name || fallback;
  });
}
