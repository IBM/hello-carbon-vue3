import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { shuffle } from "lodash";
import { SongItem, SongsMap } from "@/types/songs";

const SONGS_URL = "/songs";

export interface ACName {
  [k: string]: string;
}
export interface SongData {
  id?: number;
  ["buy-price"]?: number | null;
  ["file-name"]?: string;
  ["image_uri"]?: string;
  isOrderable?: boolean;
  ["music_uri"]?: string;
  name?: ACName;
  ["sell-price"]?: number;
  [k: string]: unknown;
}

export const useSongStore = defineStore("songs", () => {
  const songs: Ref<SongItem[]> = ref([]);

  /**
   * Load the songs data
   * @param force - reload even if already loaded
   */
  async function loadSongs(force = false): Promise<void> {
    if (force || songs.value.length === 0) {
      const { fetchJsonCached } = await import("@/composables/useAnimalCrossingData");
      const data = await fetchJsonCached(SONGS_URL) as SongsMap;
      songs.value = shuffle(Object.values(data));
    }
  }

  return { songs, loadSongs };
});
