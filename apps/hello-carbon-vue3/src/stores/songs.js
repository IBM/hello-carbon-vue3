import { defineStore } from "pinia";
import { ref } from "vue";
import { shuffle } from "lodash";

const BASE_URL
  = "https://s3.us-east.cloud-object-storage.appdomain.cloud/archaeopteryx-eusthenopteron/v2";
const SONGS_URL = BASE_URL + "/songs";
/**
 * Name object data
 * @typedef {Object} ACName
 * @property {string} name-CNzh "K.K.灵魂乐"
 * @property {string} name-EUde "K.K. Soul"
 * @property {string} name-EUen "K.K. Soul"
 * @property {string} name-EUes "Tota-soul"
 * @property {string} name-EUfr "Soul de Kéké"
 * @property {string} name-EUit "K.K. Soul"
 * @property {string} name-EUnl "K.K. Soul"
 * @property {string} name-EUru "Соул К. К."
 * @property {string} name-JPja "けけソウル"
 * @property {string} name-KRko "K.K.소울"
 * @property {string} name-TWzh "K.K.靈魂樂"
 * @property {string} name-USen "K.K. Soul"
 * @property {string} name-USes "Tota-soul"
 * @property {string} name-USfr "Soul de Kéké"
 */

/**
 * Song data
 * @typedef {Object} SongData
 * @property {number} id
 * @property {number|null} buy-price
 * @property {string} file-name
 * @property {URL} image_uri
 * @property {boolean} isOrderable
 * @property {URL} music_uri
 * @property {ACName} name
 * @property {number} sell-price
 */

export const useSongStore = defineStore("songs", () => {
  const songs = ref([]);

  /**
   * Load the songs data
   * @param {boolean} force - reload even if already loaded
   * @returns {Promise<void>}
   */
  async function loadSongs(force = false) {
    if (force || songs.value.length === 0) {
      const data = await fetch(SONGS_URL).then(response => response.json());
      songs.value = shuffle(data);
    }
  }

  return { songs, loadSongs };
});
