import type { Rarity } from "@/types/ui";

/**
 * Unify rarity mapping for bugs and fish.
 * - bugTagKind: maps rarity to Carbon tag kinds
 * - fishStars: maps rarity to a star count (1..4) and a text color class
 */
export function useRarity() {
  const bugTagKind = (rarity?: Rarity | null) => {
    const r = (rarity || "Common").toString();
    if (r === "Uncommon") return "green" as const;
    if (r === "Rare") return "purple" as const;
    if (r === "Ultra-rare") return "magenta" as const;
    return "gray" as const;
  };

  const fishStars = (rarity?: Rarity | null) => {
    const r = (rarity || "Common").toString();
    let count: number;
    if (r === "Uncommon") count = 2;
    else if (r === "Rare") count = 3;
    else if (r === "Ultra-rare") count = 4;
    else if (r === "Common") count = 1;
    else count = 1; // default to 1 star
    return count;
  };

  return { bugTagKind, fishStars };
}
