/**
 * Types for Animal Crossing: New Horizons fish dataset.
 * Designed based on apps/hello-carbon-vue3/sample-data/fish.json
 */

import { LocalizedNameMap } from "./language";

export interface FishAvailability {
  /** e.g., "11-3", "3-6 & 9-10", or "" for all year */
  "month-northern": string;
  /** e.g., "5-9", "9-12 & 3-4", or "" for all year */
  "month-southern": string;
  /** e.g., "9am - 4pm", "4pm - 9am", or "" for all day */
  "time": string;
  "isAllDay": boolean;
  "isAllYear": boolean;
  /** e.g., "River", "Sea", "Pond", "Pier", "River (clifftop)", etc. */
  "location": string;
  /** e.g., "Common", "Uncommon", "Rare", etc. (free text in source) */
  "rarity": string;
  /** Array of month numbers 1-12 for Northern Hemisphere */
  "month-array-northern": number[];
  /** Array of month numbers 1-12 for Southern Hemisphere */
  "month-array-southern": number[];
  /** Array of hour values 0-23 where present */
  "time-array": number[];
}

export interface FishItem {
  "id": number;
  /** duplicate of the collection key; kept here for completeness */
  "file-name": string;
  "name": LocalizedNameMap;
  "availability": FishAvailability;
  /** e.g., "Small (2)", "Largest (6)", etc. */
  "shadow": string;
  /** standard sell price */
  "price": number;
  /** price when sold to CJ */
  "price-cj": number;
  /** e.g., "I caught a bitterling! ..." */
  "catch-phrase": string;
  /** Long museum description text */
  "museum-phrase": string;
  /** Full-size image URL */
  "image_uri": string;
  /** Icon URL */
  "icon_uri": string;
}

/**
 * The fish.json data is a map keyed by a slug (e.g., "bitterling")
 * to a FishItem payload.
 */
export type FishMap = Record<string, FishItem>;
