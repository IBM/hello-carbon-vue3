<template>
  <div :class="`${theme}`">
    <the-header />
    <router-view />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import TheHeader from "./components/TheHeader.vue";
import { useStorage } from "@vueuse/core";

const theme = useStorage("theme", "g90-theme");
</script>
