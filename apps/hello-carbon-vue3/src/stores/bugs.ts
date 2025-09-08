import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { shuffle } from "lodash";
import { BugItem, BugsMap } from "@/types/bugs";

const BUGS_URL = "/bugs";

export const useBugsStore = defineStore("bugs", () => {
  const bugs: Ref<BugItem[]> = ref([]);

  /**
   * Load the bugs data
   * @param force - reload even if already loaded
   */
  async function loadBugs(force = false): Promise<void> {
    if (force || bugs.value.length === 0) {
      const { fetchJsonCached } = await import("@/composables/useAnimalCrossingData");
      const data = await fetchJsonCached(BUGS_URL) as BugsMap;
      bugs.value = shuffle(Object.values(data));
    }
  }

  return { bugs, loadBugs };
});
