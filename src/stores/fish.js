import { defineStore } from "pinia";
import superagent from "superagent";
import { ref } from "vue";
import { shuffle } from "lodash";

const BASE_URL = "http://acnhapi.com";
const FISH_URL = BASE_URL + "/v1/fish";

/**
 * Fish Availability
 * @typedef {Object} FishAvailability
 * @property {boolean} isAllDay
 * @property {boolean} isAllYear
 * @property {string} location
 * @property {Array<number>} month-array-northern
 * @property {Array<number>} month-array-southern
 * @property {string} month-northern
 * @property {string} month-southern
 * @property {string} rarity - Common, Uncommon, Rare, Ultra-rare
 * @property {string} time
 * @property {Array<number>} time-array
 */
/**
 * Fish data
 * @typedef {Object} FishData
 * @property {FishAvailability} availability
 * @property {string} catch-phrase
 * @property {string} file-name
 * @property {boolean|undefined} hidden
 * @property {string} icon_uri
 * @property {number} id
 * @property {string} image_uri
 * @property {string} key
 * @property {string} museum-phrase
 * @property {Object} name
 * @property {number} price
 * @property {number} price-cj
 * @property {string} shadow
 */

export const useFishStore = defineStore("songs", () => {
  /**
   * @type {Ref<UnwrapRef<Array<FishData>>>}
   */
  const fish = ref([]);

  const someHidden = ref(false);

  /**
   * Load the fish data
   * @param {boolean} force - reload even if already loaded
   * @returns {Promise<void>}
   */
  async function loadFish(force = false) {
    if (force || fish.value.length === 0) {
      const data = await superagent.get(FISH_URL);
      const fishKeys = Object.keys(data.body);
      const fishData = [];
      for (let i = 0; i < fishKeys.length; i++) {
        const key = fishKeys[i];
        fishData.push({ key, hidden: false, ...data.body[key] });
      }
      fish.value = shuffle(fishData);
    }
  }

  /**
   * Hide (or show) a fish
   * @param {string} key
   * @param {boolean} hidden
   */
  function hideFish(key, hidden = true) {
    /**
     * @type {FishData}
     */
    const found = fish.value.find((fish) => fish.key === key);
    if (found) found.hidden = hidden;
    if (hidden) someHidden.value = true;
    else someHidden.value = fish.value.some((fish) => fish.hidden);
  }

  return { fish, someHidden, loadFish, hideFish };
});
