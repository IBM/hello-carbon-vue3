<script setup lang="ts">
import { RouterView } from "vue-router";
import TheHeader from "./components/TheHeader.vue";
import ThemeSwitcher from "@/components/Theme/Switcher.vue";
</script>

<template>
  <ThemeSwitcher />
  <TheHeader />
  <RouterView />
</template>
