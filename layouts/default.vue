<template>
  <div>
    <the-header />
    <main id="#main-content" style="margin-top: 3rem">
      <slot />
    </main>
  </div>
</template>

<script setup>
// import "@/assets/css/carbon-gray-10.css";
import "@/assets/css/carbon-gray-90.css";
defineOptions({
  name: "DefaultLayout",
});
</script>

<style lang="scss">
</style>
