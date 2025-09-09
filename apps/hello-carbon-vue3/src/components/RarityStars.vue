<script setup lang="ts">
import { computed } from "vue";
import { StarFilled16 as RareIcon } from "@carbon/icons-vue";

const props = defineProps<{ count: number }>();

const cls = computed(() => {
  if (props.count === 1) return "text-carbon-purple-30";
  if (props.count === 2) return "text-carbon-purple-40";
  if (props.count === 3) return "text-carbon-purple-50";
  if (props.count === 4) return "text-carbon-purple-60";
  return "text-carbon-magenta-30"; // fallback/unknown
});
</script>

<template>
  <div class="flex" :class="cls">
    <RareIcon v-if="props.count >= 1" />
    <RareIcon v-if="props.count >= 2" />
    <RareIcon v-if="props.count >= 3" />
    <RareIcon v-if="props.count >= 4" />
  </div>
</template>

<style scoped></style>
