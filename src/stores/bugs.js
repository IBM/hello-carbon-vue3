import { defineStore } from "pinia";
import superagent from "superagent";
import { ref } from "vue";
import { shuffle } from "lodash";

const BASE_URL = "http://acnhapi.com";
const BUGS_URL = BASE_URL + "/v1/bugs";
/**
 * Fish Availability
 * @typedef {Object} BugAvailability
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
 * Bug data
 * @typedef {Object} BugData
 * @property {number} id
 * @property {string} key
 * @property {BugAvailability} availability
 * @property {string} catch-phrase
 * @property {string} file-name
 * @property {URL} icon_uri
 * @property {URL} image_uri
 * @property {string} museum-phrase
 * @property {Object} name
 * @property {number} price
 * @property {number} price-flick
 */

export const useBugsStore = defineStore("bugs", () => {
  const bugs = ref([]);

  /**
   * Load the bugs data
   * @param {boolean} force - reload even if already loaded
   * @returns {Promise<void>}
   */
  async function loadBugs(force = false) {
    if (force || bugs.value.length === 0) {
      const data = await superagent.get(BUGS_URL);
      const bugsKeys = Object.keys(data.body);
      const bugsData = [];
      for (let i = 0; i < bugsKeys.length; i++) {
        const key = bugsKeys[i];
        bugsData.push({ key, hidden: false, ...data.body[key] });
      }
      bugs.value = shuffle(bugsData);
    }
  }

  return { bugs, loadBugs };
});
