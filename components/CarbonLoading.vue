<template>
  <cv-loading
    id="page-loading"
    :active="isActive"
    :overlay="true"
    @loading-end="onLoadingEnd"
  />
</template>

<script setup>
const nuxtApp = useNuxtApp()
const loading = ref(false)
const isActive = ref(false)

nuxtApp.hook('page:start', () => {
  loading.value = true
  isActive.value = true
})
nuxtApp.hook('page:finish', () => {
  isActive.value = false
})
function onLoadingEnd() {
  loading.value = false
}
</script>
