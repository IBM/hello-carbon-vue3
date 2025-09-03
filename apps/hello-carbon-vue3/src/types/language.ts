/**
 * Shared localized name language keys across ACNH datasets.
 */

export type NameLanguageKey =
  | "name-USen"
  | "name-EUen"
  | "name-EUde"
  | "name-EUes"
  | "name-USes"
  | "name-EUfr"
  | "name-USfr"
  | "name-EUit"
  | "name-EUnl"
  | "name-CNzh"
  | "name-TWzh"
  | "name-JPja"
  | "name-KRko"
  | "name-EUru";

/**
 * Generic localized map for names keyed by NameLanguageKey by default.
 * You can override T to support other key sets if necessary.
 */
export type LocalizedNameMap<T extends string = NameLanguageKey> = Record<T, string>;
