<script setup>
// NuxtImg did not work well for me. It's meant for static images but most images from this app come
// from the API.
defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
})
const imgLoaded = ref(false)
function onImageLoaded() {
  imgLoaded.value = true
}
</script>

<template>
  <div>
    <img
      :src="src"
      :alt="alt"
      class="opacity-0 blur-lg transition-all duration-500"
      :class="[{ 'opacity-100 blur-none ': imgLoaded }, $attrs['class']]"
      @load="onImageLoaded"
    >
    <!-- Show a placeholder while loading -->
    <cv-skeleton-text
      v-if="!imgLoaded"
    />
  </div>
</template>

<style scoped lang="scss">

</style>
