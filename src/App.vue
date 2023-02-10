<template>
  <the-header />
  <RouterView />
</template>

<script setup>
import { RouterView } from "vue-router";
import TheHeader from "./components/TheHeader.vue";
</script>

<style lang="scss">
@import "./styles/carbon";
#app > .cv-grid {
  margin-left: 3rem;
  margin-top: 4rem;
}
</style>
