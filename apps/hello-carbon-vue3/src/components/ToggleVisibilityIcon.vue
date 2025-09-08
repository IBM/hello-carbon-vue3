<script setup lang="ts">
import { View20 as ShowAllIcon, ViewOff20 as HideIcon } from "@carbon/icons-vue";

const props = defineProps<{ visible: boolean }>();
</script>

<template>
  <component :is="props.visible ? HideIcon : ShowAllIcon">
    <slot />
  </component>
</template>

<style scoped></style>
