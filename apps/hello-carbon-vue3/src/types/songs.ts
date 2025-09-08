/**
 * Types for Animal Crossing: New Horizons songs dataset.
 * Designed based on apps/hello-carbon-vue3/sample-data/songs.json
 */

import { LocalizedNameMap } from "./language";

export interface SongItem {
  /** numeric id (1..95 in ACNH) */
  "id": number;
  /** duplicate of the collection key; kept here for completeness */
  "file-name": string;
  /** localized names by region/language keys */
  "name": LocalizedNameMap;
  /** price to buy from Nook Shopping; null for special/unorderable tracks */
  "buy-price": number | null;
  /** sell price at Nook's Cranny */
  "sell-price": number;
  /** whether the song can be ordered from the catalog */
  "isOrderable": boolean;
  /** direct URL to the music audio */
  "music_uri": string;
  /** Artwork image URL (jacket) */
  "image_uri": string;
}

/**
 * The songs.json data is a map keyed by a slug (e.g., "mjk_Keiji")
 * to a SongItem payload.
 */
export type SongsMap = Record<string, SongItem>;
