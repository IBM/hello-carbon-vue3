<script setup>
import { RouterView } from "vue-router";
import TheHeader from "./components/TheHeader.vue";
import { useTheme } from "@/composables/useTheme.js";

// watch for theme changes and set the body tag with any changes
useTheme();
</script>

<template>
  <div>
    <TheHeader />
    <RouterView />
  </div>
</template>
