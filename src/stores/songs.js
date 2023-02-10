import { defineStore } from "pinia";
import superagent from "superagent";
import { ref } from "vue";
import { shuffle } from "lodash";

const BASE_URL = "http://acnhapi.com";
const SONGS_URL = BASE_URL + "/v1/songs";

export const useSongStore = defineStore("songs", () => {
  const songs = ref([]);

  /**
   * Load the songs data
   * @param {boolean} force - reload even if already loaded
   * @returns {Promise<void>}
   */
  async function loadSongs(force = false) {
    if (force || songs.value.length === 0) {
      const data = await superagent.get(SONGS_URL);
      songs.value = shuffle(data.body);
    }
  }

  return { songs, loadSongs };
});
