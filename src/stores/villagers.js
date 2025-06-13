import { defineStore } from "pinia";
import { ref } from "vue";

const BASE_URL
  = "https://s3.us-east.cloud-object-storage.appdomain.cloud/archaeopteryx-eusthenopteron/v2";
const VILLAGERS_URL = BASE_URL + "/villagers";
/**
 * Bug data
 * @typedef {Object} VillagerData
 * @property {number} id
 * @property {string} key
 * @property {Object} name
 * @property {string} personality
 * @property {string} birthday-string
 * @property {string} birthday
 * @property {string} species
 * @property {string} gender
 * @property {string} subtype
 * @property {string} hobby
 * @property {string} catch-phrase
 * @property {URL} icon_uri
 * @property {URL} image_uri
 * @property {string} bubble-color
 * @property {string} text-color
 * @property {string} saying
 * @property {Object} catch-translations
 */

export const useVillagersStore = defineStore("villagers", () => {
  const villagers = ref([]);

  /**
   * Load the villagers data
   * @param {boolean} force - reload even if already loaded
   * @returns {Promise<void>}
   */
  async function loadVillagers(force = false) {
    if (force || villagers.value.length === 0) {
      const data = await fetch(VILLAGERS_URL).then(response => response.json());
      const villagersKeys = Object.keys(data);
      for (let i = 0; i < villagersKeys.length; i++) {
        const key = villagersKeys[i];
        villagers.value.push({ key, ...data[key] });
      }
    }
  }

  return { villagers, loadVillagers };
});
