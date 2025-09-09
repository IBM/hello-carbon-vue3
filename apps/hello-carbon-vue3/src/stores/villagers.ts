import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { VillagerItem, VillagersMap } from "@/types/villagers";

interface VillagerData extends VillagerItem {
  key: string;
}
const VILLAGERS_URL = "/villagers";

export const useVillagersStore = defineStore("villagers", () => {
  const villagers: Ref<VillagerData[]> = ref([]);

  /**
   * Load the villagers data
   * @param force - reload even if already loaded
   */
  async function loadVillagers(force = false): Promise<void> {
    if (force || villagers.value.length === 0) {
      const { fetchJsonCached } = await import("@/composables/useAnimalCrossingData");
      const data = await fetchJsonCached(VILLAGERS_URL) as VillagersMap;
      villagers.value = Object.values(data).map(item =>
        ({ key: item["file-name"], ...item }));
    }
  }

  return { villagers, loadVillagers };
});
