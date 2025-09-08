<script setup lang="ts">
import {
  CircleFilled16 as DefaultLocationIcon,
  EarthEuropeAfricaFilled16 as PondIcon,
  EarthFilled16 as RiverIcon,
  EarthAmericasFilled16 as SeaIcon,
  EarthSoutheastAsiaFilled16 as PierIcon,
} from "@carbon/icons-vue";
import type { Location } from "@/types/ui";

const props = defineProps<{
  locationText?: string | null;
  title?: string | null;
  alt?: string | null;
  class?: string | undefined;
}>();

function normalized(loc?: string | null): Location {
  const s = (loc || "Pond").trim().toLowerCase();
  if (s.startsWith("pond")) return "Pond";
  if (s.startsWith("river")) return "River";
  if (s.startsWith("sea")) return "Sea";
  if (s.startsWith("pier")) return "Pier";
  return "";
}
function whichIcon() {
  switch (normalized(props.locationText)) {
    case "Pond":
      return PondIcon;
    case "River":
      return RiverIcon;
    case "Sea":
      return SeaIcon;
    case "Pier":
      return PierIcon;
    default:
      return DefaultLocationIcon;
  }
}
</script>

<template>
  <component
    :is="whichIcon()"
    :title="title ?? props.locationText ?? undefined"
    :alt="alt ?? props.locationText ?? undefined"
    :class="[
        normalized(props.locationText) === 'Pond'
          ? 'fill-carbon-blue-40'
          : normalized(props.locationText) === 'River'
          ? 'fill-carbon-blue-60'
          : normalized(props.locationText) === 'Sea'
          ? 'fill-carbon-teal-30'
          : normalized(props.locationText) === 'Pier'
          ? 'fill-carbon-green-20'
          : 'fill-carbon-yellow-40',
        props.class
      ].join(' ')"
  />
</template>

<style scoped></style>
