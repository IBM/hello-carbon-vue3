/**
 * Types for Animal Crossing: New Horizons villagers dataset.
 * Designed based on apps/hello-carbon-vue3/sample-data/villagers.json
 */

import { LocalizedNameMap } from "./language";

export type CatchTranslationKey
  = | "catch-USen"
    | "catch-EUen"
    | "catch-EUde"
    | "catch-EUes"
    | "catch-USes"
    | "catch-EUfr"
    | "catch-USfr"
    | "catch-EUit"
    | "catch-EUnl"
    | "catch-CNzh"
    | "catch-TWzh"
    | "catch-JPja"
    | "catch-KRko"
    | "catch-EUru";

export type CatchTranslationsMap = Record<CatchTranslationKey, string>;

export interface VillagerItem {
  /** numeric id */
  "id": number;
  /** duplicate of the collection key; kept here for completeness */
  "file-name": string;
  /** localized names by region/language keys */
  "name": LocalizedNameMap;
  /** e.g., "Cranky", "Jock", "Peppy", "Snooty", etc. */
  "personality": string;
  /** e.g., "March 9th" */
  "birthday-string": string;
  /** e.g., "9/3" (day/month) */
  "birthday": string;
  /** e.g., "Anteater", "Cat", ... */
  "species": string;
  /** "Male" | "Female" as seen in dataset */
  "gender": string;
  /** subtype letter like "A" | "B" */
  "subtype": string;
  /** e.g., "Education", "Fitness", "Fashion", etc. */
  "hobby": string;
  /** the short catch phrase shown in dialogue */
  "catch-phrase": string;
  /** icon image URL */
  "icon_uri": string;
  /** full image URL */
  "image_uri": string;
  /** the villager's saying/quote */
  "saying": string;
  /** speech bubble color hex */
  "bubble-color": string;
  /** dialogue text color hex */
  "text-color": string;
  /** localized translations of the catch-phrase */
  "catch-translations": CatchTranslationsMap;
}

/**
 * The villagers.json data is a map keyed by a slug (e.g., "ant00")
 * to a VillagerItem payload.
 */
export type VillagersMap = Record<string, VillagerItem>;
