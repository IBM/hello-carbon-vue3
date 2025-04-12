<script setup>
import { RouterView } from "vue-router";
import TheHeader from "./components/TheHeader.vue";
import { useStorage } from "@vueuse/core";

const theme = useStorage("theme", "cds--g90");
</script>

<template>
  <div :class="`${theme}`">
    <the-header />
    <router-view />
  </div>
</template>
