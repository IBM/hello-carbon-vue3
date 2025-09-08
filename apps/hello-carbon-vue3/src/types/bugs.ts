/**
 * Types for Animal Crossing: New Horizons bugs dataset.
 * Designed based on apps/hello-carbon-vue3/sample-data/bugs.json
 */

import { LocalizedNameMap } from "./language";

export interface BugAvailability {
  /** e.g., "3-9", "3-6 & 9-10", or "" for all year */
  "month-northern": string;
  /** e.g., "9-3", "9-12 & 3-4", or "" for all year */
  "month-southern": string;
  /** e.g., "4am - 7pm", "", etc. */
  "time": string;
  "isAllDay": boolean;
  "isAllYear": boolean;
  /** e.g., "Flying", "On trees (hardwood, cedar)", "On the ground", etc. */
  "location": string;
  /** e.g., "Common", "Uncommon", "Rare", "Ultra-rare" (free text in source) */
  "rarity": string;
  /** Array of month numbers 1-12 for Northern Hemisphere */
  "month-array-northern": number[];
  /** Array of month numbers 1-12 for Southern Hemisphere */
  "month-array-southern": number[];
  /** Array of hour values 0-23 where present */
  "time-array": number[];
}

export interface BugNameBlock {
  /** internal slug-like id (same as key in the collection), e.g., "common_butterfly" */
  "file-name": string;
  /** localized names by region/language keys */
  "name": LocalizedNameMap;
}

export interface BugItem {
  "id": number;
  /** duplicate of the collection key; kept here for completeness */
  "file-name": string;
  "name": LocalizedNameMap;
  "availability": BugAvailability;
  /** standard sell price */
  "price": number;
  /** price when sold to Flick */
  "price-flick": number;
  /** e.g., "I caught a common butterfly! They often flutter by!" */
  "catch-phrase": string;
  /** Long museum description text */
  "museum-phrase": string;
  /** Full-size image URL */
  "image_uri": string;
  /** Icon URL */
  "icon_uri": string;
}

/**
 * The bugs.json data is a map keyed by a slug (e.g., "common_butterfly")
 * to a BugItem payload.
 */
export type BugsMap = Record<string, BugItem>;
