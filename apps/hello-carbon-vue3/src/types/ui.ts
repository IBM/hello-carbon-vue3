// UI-related shared types for the Hello Carbon Vue3 app

export interface TablePagination {
  start: number;
  length: number;
  page: number;
}

export type SortOrder = "none" | "ascending" | "descending";

export interface SortKeys {
  index: string; // column index provided by cv-data-table (stringified)
  order: SortOrder;
  // known names in our tables; allow string for forwards-compat
  name: "name" | "price" | "price-cj" | string | null;
}

// Shared unions that reflect dataset vocabulary but allow unknown strings for safety
export type Rarity = "Common" | "Uncommon" | "Rare" | "Ultra-rare" | string;
export type Location = "Pond" | "River" | "Sea" | "Pier" | string;
