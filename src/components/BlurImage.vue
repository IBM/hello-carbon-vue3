<script setup>
import { UseElementVisibility } from "@vueuse/components";

defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: "" },
  srcPlaceholder: { type: String, required: true },
});
</script>
<template>
  <UseElementVisibility v-slot="{ isVisible }">
    <img
      :src="isVisible ? src : srcPlaceholder"
      :alt="alt"
      class="size-full transition duration-1000"
      :class="{ 'blur-0': isVisible, 'blur-sm': !isVisible }"
    >
  </UseElementVisibility>
</template>
