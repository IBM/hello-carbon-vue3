<script setup>
/**
 * @typedef ComicImage
 * @property {string} path
 * @property {string} extension
 */

/**
 * @typedef ComicTile
 * @property {string} id
 * @property {string} name
 * @property {boolean|undefined} error
 * @property {ComicImage} thumbnail
 */

defineProps({
  comic: { type: /** @type ComicTile */ Object, required: true },
})
</script>

<template>
  <cv-tile
    v-if="comic"
    kind="clickable"
    class="m-4 h-96"
  >
    <external-image
      :src="`${comic?.thumbnail?.path}.${comic?.thumbnail?.extension}`"
      :alt="comic?.name"
      class="size-full object-left"
    />
    <div v-if="comic?.error">
      Error loading data
    </div>
  </cv-tile>
</template>

<style scoped lang="scss">

</style>
