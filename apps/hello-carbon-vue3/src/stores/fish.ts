import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { shuffle } from "lodash";
import { FishItem, FishMap } from "@/types/fish.ts";

const FISH_URL = "/fish";

interface FishData extends FishItem {
  key: string;
  hidden: boolean;
}

export const useFishStore = defineStore("fish", () => {
  const fish: Ref<FishData[]> = ref([]);

  const someHidden = ref(false);

  /**
   * Load the fish data
   * @param force - reload even if already loaded
   */
  async function loadFish(force = false): Promise<void> {
    if (force || fish.value.length === 0) {
      const { fetchJsonCached } = await import("@/composables/useAnimalCrossingData.ts");
      const data = await fetchJsonCached(FISH_URL) as FishMap;
      const fishData = Object.values(data).map(item =>
        ({ key: item["file-name"], hidden: false, ...item }));
      fish.value = shuffle(fishData);
    }
  }

  /**
   * Hide (or show) a fish
   */
  function hideFish(key: string, hidden = true): void {
    const found = fish.value.find(fish => fish["file-name"] === key);
    if (found) found.hidden = hidden;
    if (hidden) someHidden.value = true;
    else someHidden.value = fish.value.some(fish => !!fish.hidden);
  }

  return { fish, someHidden, loadFish, hideFish };
});
