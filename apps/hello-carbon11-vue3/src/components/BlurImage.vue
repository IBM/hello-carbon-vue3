<script setup lang="ts">
import VLazyImage from "v-lazy-image";
defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: "" },
  srcPlaceholder: { type: String, required: true },
});
</script>
<template>
  <VLazyImage
    :src="src"
    :src-placeholder="srcPlaceholder"
    :alt="alt"
  />
</template>
<style scoped>
.v-lazy-image {
  filter: blur(5px);
  transition: filter 1.6s;
  will-change: filter;
}
.v-lazy-image-loaded {
  filter: blur(0);
}
</style>
