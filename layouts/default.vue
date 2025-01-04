<template>
  <div>
    <the-header />
    <main
      id="#main-content"
      style="margin-top: 3rem"
    >
      <slot />
    </main>
  </div>
</template>

<script setup>
defineOptions({
  name: 'DefaultLayout',
})
</script>

<style lang="scss">
</style>
